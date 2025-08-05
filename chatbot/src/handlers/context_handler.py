"""
Context Handler for managing conversation context and user state
"""

import logging
from typing import Dict, Any, Optional, List
from datetime import datetime

logger = logging.getLogger(__name__)


class ContextHandler:
    """Manages conversation context and user state"""
    
    def __init__(self):
        self.session_contexts = {}
    
    async def build_context(self, session_id: str, additional_context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Build context for current conversation"""
        base_context = {
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat(),
            "user_preferences": {},
            "conversation_state": "active"
        }
        
        if additional_context:
            base_context.update(additional_context)
        
        return base_context
    
    async def update_context(self, session_id: str, intent: str, message: str, response: str):
        """Update context after each interaction"""
        if session_id not in self.session_contexts:
            self.session_contexts[session_id] = []
        
        self.session_contexts[session_id].append({
            "intent": intent,
            "message": message,
            "response": response,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Keep only last 20 interactions
        if len(self.session_contexts[session_id]) > 20:
            self.session_contexts[session_id].pop(0) 