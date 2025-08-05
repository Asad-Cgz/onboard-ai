"""
ElevateHub Chatbot Backend API
FastAPI-based chatbot service for onboarding assistance
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import json
import logging
import uuid
from datetime import datetime

from .config import settings
from .handlers.message_handler import MessageHandler
from .handlers.context_handler import ContextHandler
from .nlp.intent_classifier import IntentClassifier
from .nlp.response_generator import ResponseGenerator
from .integrations.knowledge_base import KnowledgeBase
from .models.chat_models import ChatMessage, ChatSession, ChatResponse
from .database.session_manager import SessionManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="ElevateHub Chatbot API",
    description="AI-powered chatbot for onboarding and project assistance",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Initialize components
message_handler = MessageHandler()
context_handler = ContextHandler()
intent_classifier = IntentClassifier()
response_generator = ResponseGenerator()
knowledge_base = KnowledgeBase()
session_manager = SessionManager()

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: str
    context: Optional[Dict[str, Any]] = None

class QuickActionRequest(BaseModel):
    action_id: str
    session_id: Optional[str] = None
    user_id: str

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting ElevateHub Chatbot API...")
    
    # Initialize knowledge base
    await knowledge_base.initialize()
    
    # Initialize ML models
    await intent_classifier.load_models()
    await response_generator.initialize()
    
    logger.info("Chatbot API startup complete")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down ElevateHub Chatbot API...")
    await session_manager.cleanup()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "ElevateHub Chatbot API",
        "status": "running",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "services": {
            "nlp": "active",
            "knowledge_base": "active",
            "database": "active"
        },
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, background_tasks: BackgroundTasks):
    """
    Main chat endpoint for processing user messages
    """
    try:
        # Create or get session
        session_id = request.session_id or str(uuid.uuid4())
        session = await session_manager.get_or_create_session(
            session_id, request.user_id
        )
        
        # Create chat message
        user_message = ChatMessage(
            id=str(uuid.uuid4()),
            content=request.message,
            sender="user",
            timestamp=datetime.utcnow(),
            session_id=session_id
        )
        
        # Store user message
        await session_manager.add_message(session_id, user_message)
        
        # Process message through NLP pipeline
        intent = await intent_classifier.classify_intent(request.message)
        context = await context_handler.build_context(
            session_id, request.context or {}
        )
        
        # Generate response
        bot_response_content = await response_generator.generate_response(
            message=request.message,
            intent=intent,
            context=context,
            session_history=session.messages
        )
        
        # Create bot message
        bot_message = ChatMessage(
            id=str(uuid.uuid4()),
            content=bot_response_content,
            sender="bot",
            timestamp=datetime.utcnow(),
            session_id=session_id,
            metadata={
                "intent": intent,
                "confidence": intent_classifier.last_confidence,
                "response_type": "generated"
            }
        )
        
        # Store bot message
        await session_manager.add_message(session_id, bot_message)
        
        # Update session context in background
        background_tasks.add_task(
            context_handler.update_context,
            session_id,
            intent,
            request.message,
            bot_response_content
        )
        
        return ChatResponse(
            message=bot_message,
            session_id=session_id,
            intent=intent,
            suggestions=await _get_suggestions(intent, context),
            confidence=intent_classifier.last_confidence
        )
        
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/chat/quick-action", response_model=ChatResponse)
async def quick_action(request: QuickActionRequest, background_tasks: BackgroundTasks):
    """
    Handle predefined quick actions
    """
    try:
        # Get quick action prompt
        prompt = await _get_quick_action_prompt(request.action_id)
        
        if not prompt:
            raise HTTPException(status_code=404, detail="Quick action not found")
        
        # Process as regular chat message
        chat_request = ChatRequest(
            message=prompt,
            session_id=request.session_id,
            user_id=request.user_id,
            context={"source": "quick_action", "action_id": request.action_id}
        )
        
        return await chat(chat_request, background_tasks)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing quick action: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/chat/sessions/{user_id}")
async def get_user_sessions(user_id: str, limit: int = 10):
    """
    Get chat sessions for a user
    """
    try:
        sessions = await session_manager.get_user_sessions(user_id, limit)
        return {"sessions": sessions}
    except Exception as e:
        logger.error(f"Error getting user sessions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/chat/sessions/{session_id}/history")
async def get_session_history(session_id: str):
    """
    Get message history for a session
    """
    try:
        session = await session_manager.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {
            "session_id": session_id,
            "messages": session.messages,
            "created_at": session.created_at,
            "updated_at": session.updated_at
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting session history: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/chat/sessions/{session_id}")
async def delete_session(session_id: str, user_id: str):
    """
    Delete a chat session
    """
    try:
        success = await session_manager.delete_session(session_id, user_id)
        if not success:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {"message": "Session deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting session: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/knowledge/search")
async def search_knowledge(query: str, category: Optional[str] = None, limit: int = 5):
    """
    Search knowledge base
    """
    try:
        results = await knowledge_base.search(query, category, limit)
        return {"results": results}
    except Exception as e:
        logger.error(f"Error searching knowledge base: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/intents")
async def get_supported_intents():
    """
    Get list of supported intents
    """
    return {
        "intents": intent_classifier.get_supported_intents()
    }

@app.get("/quick-actions")
async def get_quick_actions():
    """
    Get available quick actions
    """
    return {
        "actions": [
            {
                "id": "onboarding-help",
                "label": "Onboarding Help",
                "category": "onboarding",
                "description": "Get help with onboarding process"
            },
            {
                "id": "insurance-basics",
                "label": "Insurance Basics",
                "category": "domain",
                "description": "Learn insurance industry concepts"
            },
            {
                "id": "coding-standards",
                "label": "Coding Standards",
                "category": "technical",
                "description": "View coding standards and best practices"
            },
            {
                "id": "team-info",
                "label": "Team Information",
                "category": "team",
                "description": "Get team member information"
            },
            {
                "id": "tools-setup",
                "label": "Tools & Setup",
                "category": "tools",
                "description": "Help with tool installation and setup"
            },
            {
                "id": "project-overview",
                "label": "Project Overview",
                "category": "project",
                "description": "Learn about current projects"
            }
        ]
    }

async def _get_suggestions(intent: str, context: Dict[str, Any]) -> List[str]:
    """Generate follow-up suggestions based on intent and context"""
    suggestions_map = {
        "onboarding": [
            "What's my next onboarding milestone?",
            "Show me my onboarding progress",
            "Who should I contact for onboarding questions?"
        ],
        "technical": [
            "What coding standards should I follow?",
            "How do I set up my development environment?",
            "Where can I find technical documentation?"
        ],
        "domain": [
            "Tell me more about insurance concepts",
            "What are the main project requirements?",
            "Explain the business context"
        ],
        "team": [
            "Who is my project lead?",
            "How do I contact team members?",
            "What's the team structure?"
        ]
    }
    
    return suggestions_map.get(intent, [
        "Can you explain that in more detail?",
        "What should I do next?",
        "Where can I find more information?"
    ])

async def _get_quick_action_prompt(action_id: str) -> Optional[str]:
    """Get prompt text for quick action"""
    prompts = {
        "onboarding-help": "I need help with my onboarding process. Can you guide me through the next steps?",
        "insurance-basics": "Can you explain the basic concepts of the insurance industry that I need to know for this project?",
        "coding-standards": "What are the coding standards and best practices I should follow for this project?",
        "team-info": "Tell me about my team members and who I should contact for different types of questions.",
        "tools-setup": "What tools do I need to install and how should I set up my development environment?",
        "project-overview": "Give me an overview of the Insurance project - what are the main goals and my role?"
    }
    
    return prompts.get(action_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 