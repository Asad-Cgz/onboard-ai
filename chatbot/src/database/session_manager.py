"""
Session Manager for handling chat sessions and message persistence
"""

import logging
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import uuid

from ..models.chat_models import ChatSession, ChatMessage

logger = logging.getLogger(__name__)


class SessionManager:
    """Manages chat sessions and message persistence"""
    
    def __init__(self):
        # In-memory storage for development (use database in production)
        self.sessions: Dict[str, ChatSession] = {}
        self.user_sessions: Dict[str, List[str]] = {}  # user_id -> [session_ids]
    
    async def get_or_create_session(self, session_id: str, user_id: str) -> ChatSession:
        """Get existing session or create new one"""
        if session_id in self.sessions:
            session = self.sessions[session_id]
            session.updated_at = datetime.utcnow()
            return session
        
        # Create new session
        session = ChatSession(
            id=session_id,
            user_id=user_id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.sessions[session_id] = session
        
        # Track user sessions
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = []
        self.user_sessions[user_id].append(session_id)
        
        logger.info(f"Created new session {session_id} for user {user_id}")
        return session
    
    async def get_session(self, session_id: str) -> Optional[ChatSession]:
        """Get session by ID"""
        return self.sessions.get(session_id)
    
    async def add_message(self, session_id: str, message: ChatMessage):
        """Add message to session"""
        if session_id in self.sessions:
            self.sessions[session_id].messages.append(message)
            self.sessions[session_id].updated_at = datetime.utcnow()
    
    async def get_user_sessions(self, user_id: str, limit: int = 10) -> List[ChatSession]:
        """Get user's recent sessions"""
        session_ids = self.user_sessions.get(user_id, [])
        sessions = [self.sessions[sid] for sid in session_ids if sid in self.sessions]
        
        # Sort by updated time
        sessions.sort(key=lambda s: s.updated_at, reverse=True)
        
        return sessions[:limit]
    
    async def delete_session(self, session_id: str, user_id: str) -> bool:
        """Delete a session"""
        if session_id in self.sessions and self.sessions[session_id].user_id == user_id:
            del self.sessions[session_id]
            
            # Remove from user sessions
            if user_id in self.user_sessions:
                self.user_sessions[user_id] = [
                    sid for sid in self.user_sessions[user_id] if sid != session_id
                ]
            
            logger.info(f"Deleted session {session_id} for user {user_id}")
            return True
        
        return False
    
    async def cleanup(self):
        """Cleanup old sessions"""
        cutoff_time = datetime.utcnow() - timedelta(hours=24)  # 24 hours
        
        expired_sessions = [
            sid for sid, session in self.sessions.items()
            if session.updated_at < cutoff_time
        ]
        
        for session_id in expired_sessions:
            session = self.sessions[session_id]
            user_id = session.user_id
            
            del self.sessions[session_id]
            
            if user_id in self.user_sessions:
                self.user_sessions[user_id] = [
                    sid for sid in self.user_sessions[user_id] if sid != session_id
                ]
        
        if expired_sessions:
            logger.info(f"Cleaned up {len(expired_sessions)} expired sessions") 