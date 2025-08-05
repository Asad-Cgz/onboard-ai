"""
Configuration settings for ElevateHub Chatbot API
"""

import os
from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings and configuration"""
    
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_WORKERS: int = 1
    DEBUG: bool = False
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",  # Next.js frontend
        "http://localhost:3001",
        "https://elevatehub.app",
        "https://*.elevatehub.app"
    ]
    
    # Database Configuration
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/elevatehub_chatbot"
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 30
    
    # Redis Configuration (for caching and sessions)
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_PASSWORD: str = ""
    REDIS_TTL: int = 3600  # 1 hour
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-3.5-turbo"
    OPENAI_MAX_TOKENS: int = 1000
    OPENAI_TEMPERATURE: float = 0.7
    
    # LangChain Configuration
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = "ElevateHub-Chatbot"
    
    # ChromaDB Configuration (Vector Database)
    CHROMA_PERSIST_DIRECTORY: str = "./data/chroma"
    CHROMA_COLLECTION_NAME: str = "elevatehub_knowledge"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    
    # Knowledge Base Configuration
    KNOWLEDGE_BASE_PATH: str = "./data/knowledge"
    KNOWLEDGE_REFRESH_INTERVAL: int = 3600  # 1 hour
    
    # Intent Classification
    INTENT_MODEL_PATH: str = "./models/intent_classifier"
    INTENT_CONFIDENCE_THRESHOLD: float = 0.7
    FALLBACK_INTENT: str = "general_help"
    
    # Response Generation
    RESPONSE_MAX_LENGTH: int = 500
    RESPONSE_TEMPERATURE: float = 0.7
    CONTEXT_WINDOW_SIZE: int = 10  # Number of previous messages to consider
    
    # Session Management
    SESSION_TIMEOUT: int = 1800  # 30 minutes
    MAX_SESSIONS_PER_USER: int = 10
    
    # Logging Configuration
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    LOG_FILE: str = "./logs/chatbot.log"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 3600  # 1 hour
    
    # Monitoring and Analytics
    ENABLE_ANALYTICS: bool = True
    ANALYTICS_ENDPOINT: str = ""
    
    # External Services
    COGNIZANT_API_BASE_URL: str = ""
    COGNIZANT_API_KEY: str = ""
    
    # Insurance Domain Configuration
    INSURANCE_API_URL: str = ""
    INSURANCE_API_KEY: str = ""
    
    # Team Directory Integration
    TEAM_DIRECTORY_URL: str = ""
    TEAM_DIRECTORY_API_KEY: str = ""
    
    # Project Management Integration
    PROJECT_MANAGEMENT_URL: str = ""
    PROJECT_MANAGEMENT_API_KEY: str = ""
    
    # Learning Management System
    LMS_API_URL: str = ""
    LMS_API_KEY: str = ""
    
    @field_validator("ALLOWED_ORIGINS", mode='before')
    @classmethod
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    @field_validator("OPENAI_API_KEY")
    @classmethod
    def validate_openai_key(cls, v):
        if not v and os.getenv("OPENAI_API_KEY"):
            return os.getenv("OPENAI_API_KEY")
        return v
    
    @field_validator("SECRET_KEY")
    @classmethod
    def validate_secret_key(cls, v):
        if v == "your-secret-key-change-this-in-production":
            import secrets
            return secrets.token_urlsafe(32)
        return v
    
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True
    }


# Global settings instance
settings = Settings()

# Intent Categories
INTENT_CATEGORIES = {
    "onboarding": {
        "description": "Questions about onboarding process and progress",
        "keywords": ["onboarding", "start", "begin", "progress", "milestone", "phase"],
        "examples": [
            "How do I start my onboarding?",
            "What's my next onboarding step?",
            "Show me my onboarding progress"
        ]
    },
    "technical": {
        "description": "Technical questions about coding, tools, and development",
        "keywords": ["code", "coding", "development", "technical", "programming", "tools"],
        "examples": [
            "What coding standards should I follow?",
            "How do I set up my development environment?",
            "What tools do I need to install?"
        ]
    },
    "domain": {
        "description": "Questions about insurance industry and business domain",
        "keywords": ["insurance", "domain", "business", "industry", "policy", "claims"],
        "examples": [
            "Explain insurance concepts",
            "What is policy management?",
            "How does claims processing work?"
        ]
    },
    "team": {
        "description": "Questions about team members and organizational structure",
        "keywords": ["team", "members", "contact", "who", "manager", "lead"],
        "examples": [
            "Who is my project lead?",
            "How do I contact team members?",
            "What's the team structure?"
        ]
    },
    "project": {
        "description": "Questions about current projects and assignments",
        "keywords": ["project", "assignment", "task", "deadline", "milestone"],
        "examples": [
            "What's my current project?",
            "What are my project deadlines?",
            "Show me project details"
        ]
    },
    "tools": {
        "description": "Questions about tools, software, and system setup",
        "keywords": ["tools", "software", "install", "setup", "configuration"],
        "examples": [
            "What tools do I need?",
            "How do I install Salesforce?",
            "Help me set up my environment"
        ]
    },
    "general_help": {
        "description": "General questions and fallback category",
        "keywords": ["help", "support", "question", "how", "what", "why"],
        "examples": [
            "Can you help me?",
            "I need assistance",
            "What can you do?"
        ]
    }
}

# Response Templates
RESPONSE_TEMPLATES = {
    "greeting": [
        "Hello! I'm your ElevateHub AI assistant. How can I help you today?",
        "Hi there! I'm here to help with your onboarding and project questions.",
        "Welcome! What would you like to know about your onboarding or project?"
    ],
    "onboarding": [
        "I can help you with your onboarding process. You're currently in Phase {phase} of 6.",
        "Your onboarding progress is at {progress}%. Let me guide you through the next steps.",
        "Based on your current phase, I recommend focusing on {recommendation}."
    ],
    "technical": [
        "For technical questions, I can help with coding standards, tools, and development practices.",
        "Our technical stack includes {technologies}. What specific area would you like to explore?",
        "I can provide guidance on development setup, coding standards, and best practices."
    ],
    "domain": [
        "The insurance industry involves several key concepts including {concepts}.",
        "For this project, you'll need to understand {domain_topics}.",
        "Let me explain the insurance domain concepts relevant to your role."
    ],
    "team": [
        "Your team structure includes {team_info}. Who would you like to learn more about?",
        "For different types of questions, here are your key contacts: {contacts}.",
        "Your project lead is {lead_name} ({lead_role}). You can reach them at {lead_contact}."
    ],
    "fallback": [
        "I understand you're asking about '{topic}'. Let me provide some guidance on that.",
        "I'm here to help! Could you please provide more details about what you'd like to know?",
        "I'd be happy to assist. Can you rephrase your question or be more specific?"
    ]
}

# Knowledge Base Categories
KNOWLEDGE_CATEGORIES = [
    "onboarding_process",
    "technical_standards",
    "insurance_domain",
    "team_directory",
    "project_information",
    "tools_and_setup",
    "company_policies",
    "training_materials"
] 