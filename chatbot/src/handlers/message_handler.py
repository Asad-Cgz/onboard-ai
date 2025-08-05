"""
Message Handler for processing and routing chat messages
"""

import logging
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class MessageHandler:
    """Handles message processing and routing"""
    
    def __init__(self):
        self.message_processors = {
            "text": self._process_text_message,
            "code": self._process_code_message,
            "suggestion": self._process_suggestion_message,
            "error": self._process_error_message
        }
    
    async def process_message(
        self, 
        message: str, 
        message_type: str = "text",
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Process incoming message based on type
        
        Args:
            message: The message content
            message_type: Type of message (text, code, suggestion, error)
            context: Additional context information
            
        Returns:
            Processed message data
        """
        try:
            processor = self.message_processors.get(message_type, self._process_text_message)
            return await processor(message, context or {})
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            return {
                "processed_message": message,
                "message_type": "error",
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def _process_text_message(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Process regular text messages"""
        # Clean and validate message
        cleaned_message = self._clean_message(message)
        
        # Extract metadata
        metadata = {
            "word_count": len(cleaned_message.split()),
            "character_count": len(cleaned_message),
            "contains_code": self._contains_code(cleaned_message),
            "contains_urls": self._contains_urls(cleaned_message),
            "language": self._detect_language(cleaned_message),
            "sentiment": self._analyze_sentiment(cleaned_message)
        }
        
        return {
            "processed_message": cleaned_message,
            "original_message": message,
            "message_type": "text",
            "metadata": metadata,
            "context": context,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def _process_code_message(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Process code-related messages"""
        # Extract code blocks
        code_blocks = self._extract_code_blocks(message)
        
        metadata = {
            "code_blocks": code_blocks,
            "programming_language": self._detect_programming_language(message),
            "has_syntax_errors": self._check_syntax_errors(code_blocks),
            "complexity_score": self._calculate_complexity(code_blocks)
        }
        
        return {
            "processed_message": message,
            "message_type": "code",
            "metadata": metadata,
            "context": context,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def _process_suggestion_message(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Process suggestion messages"""
        suggestions = self._parse_suggestions(message)
        
        metadata = {
            "suggestions": suggestions,
            "suggestion_count": len(suggestions),
            "categories": self._categorize_suggestions(suggestions)
        }
        
        return {
            "processed_message": message,
            "message_type": "suggestion",
            "metadata": metadata,
            "context": context,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def _process_error_message(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Process error messages"""
        error_info = self._parse_error(message)
        
        metadata = {
            "error_type": error_info.get("type", "unknown"),
            "error_code": error_info.get("code"),
            "severity": error_info.get("severity", "medium"),
            "stack_trace": error_info.get("stack_trace")
        }
        
        return {
            "processed_message": message,
            "message_type": "error",
            "metadata": metadata,
            "context": context,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def _clean_message(self, message: str) -> str:
        """Clean and sanitize message content"""
        # Remove excessive whitespace
        cleaned = " ".join(message.split())
        
        # Remove potentially harmful content
        # (In production, implement proper sanitization)
        
        return cleaned.strip()
    
    def _contains_code(self, message: str) -> bool:
        """Check if message contains code"""
        code_indicators = [
            "```", "def ", "function ", "class ", "import ", "from ",
            "if __name__", "console.log", "println", "{", "}", "[", "]"
        ]
        return any(indicator in message.lower() for indicator in code_indicators)
    
    def _contains_urls(self, message: str) -> bool:
        """Check if message contains URLs"""
        url_indicators = ["http://", "https://", "www.", ".com", ".org", ".net"]
        return any(indicator in message.lower() for indicator in url_indicators)
    
    def _detect_language(self, message: str) -> str:
        """Detect message language (simplified)"""
        # In production, use proper language detection library
        return "en"  # Default to English
    
    def _analyze_sentiment(self, message: str) -> str:
        """Analyze message sentiment (simplified)"""
        positive_words = ["good", "great", "excellent", "thanks", "helpful", "awesome"]
        negative_words = ["bad", "terrible", "awful", "hate", "problem", "error", "issue"]
        
        message_lower = message.lower()
        positive_count = sum(1 for word in positive_words if word in message_lower)
        negative_count = sum(1 for word in negative_words if word in message_lower)
        
        if positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"
    
    def _extract_code_blocks(self, message: str) -> list:
        """Extract code blocks from message"""
        code_blocks = []
        
        # Find triple backtick code blocks
        lines = message.split('\n')
        in_code_block = False
        current_block = []
        language = None
        
        for line in lines:
            if line.strip().startswith('```'):
                if in_code_block:
                    # End of code block
                    code_blocks.append({
                        "language": language,
                        "code": '\n'.join(current_block)
                    })
                    current_block = []
                    in_code_block = False
                    language = None
                else:
                    # Start of code block
                    in_code_block = True
                    language = line.strip()[3:].strip() or "unknown"
            elif in_code_block:
                current_block.append(line)
        
        return code_blocks
    
    def _detect_programming_language(self, message: str) -> Optional[str]:
        """Detect programming language in message"""
        language_indicators = {
            "python": ["def ", "import ", "from ", "print(", "__init__"],
            "javascript": ["function ", "const ", "let ", "var ", "console.log"],
            "typescript": ["interface ", "type ", "enum ", ": string", ": number"],
            "java": ["public class", "public static", "System.out.println"],
            "sql": ["SELECT ", "FROM ", "WHERE ", "INSERT ", "UPDATE "],
            "react": ["import React", "useState", "useEffect", "jsx", "tsx"]
        }
        
        message_lower = message.lower()
        for language, indicators in language_indicators.items():
            if any(indicator.lower() in message_lower for indicator in indicators):
                return language
        
        return None
    
    def _check_syntax_errors(self, code_blocks: list) -> bool:
        """Check for obvious syntax errors in code blocks"""
        # Simplified syntax checking
        for block in code_blocks:
            code = block.get("code", "")
            # Basic checks for common syntax issues
            if code.count("(") != code.count(")"):
                return True
            if code.count("{") != code.count("}"):
                return True
            if code.count("[") != code.count("]"):
                return True
        
        return False
    
    def _calculate_complexity(self, code_blocks: list) -> int:
        """Calculate code complexity score"""
        complexity = 0
        complexity_indicators = ["if ", "for ", "while ", "try ", "catch ", "function ", "class "]
        
        for block in code_blocks:
            code = block.get("code", "").lower()
            complexity += sum(code.count(indicator) for indicator in complexity_indicators)
        
        return complexity
    
    def _parse_suggestions(self, message: str) -> list:
        """Parse suggestions from message"""
        # Simple suggestion parsing
        suggestions = []
        lines = message.split('\n')
        
        for line in lines:
            line = line.strip()
            if line.startswith('-') or line.startswith('*') or line.startswith('•'):
                suggestions.append(line[1:].strip())
            elif line and not line.endswith('.') and not line.endswith('?'):
                suggestions.append(line)
        
        return suggestions
    
    def _categorize_suggestions(self, suggestions: list) -> list:
        """Categorize suggestions by topic"""
        categories = {
            "technical": ["code", "programming", "development", "bug", "fix"],
            "onboarding": ["onboarding", "start", "begin", "learn", "training"],
            "team": ["team", "contact", "meeting", "collaboration"],
            "project": ["project", "deadline", "milestone", "task", "assignment"]
        }
        
        suggestion_categories = []
        for suggestion in suggestions:
            suggestion_lower = suggestion.lower()
            for category, keywords in categories.items():
                if any(keyword in suggestion_lower for keyword in keywords):
                    suggestion_categories.append(category)
                    break
            else:
                suggestion_categories.append("general")
        
        return suggestion_categories
    
    def _parse_error(self, message: str) -> Dict[str, Any]:
        """Parse error information from message"""
        error_info = {
            "type": "unknown",
            "severity": "medium"
        }
        
        message_lower = message.lower()
        
        # Detect error type
        if "syntax" in message_lower:
            error_info["type"] = "syntax_error"
        elif "import" in message_lower or "module" in message_lower:
            error_info["type"] = "import_error"
        elif "permission" in message_lower or "access" in message_lower:
            error_info["type"] = "permission_error"
        elif "connection" in message_lower or "network" in message_lower:
            error_info["type"] = "connection_error"
        
        # Detect severity
        if any(word in message_lower for word in ["critical", "fatal", "crash"]):
            error_info["severity"] = "high"
        elif any(word in message_lower for word in ["warning", "minor"]):
            error_info["severity"] = "low"
        
        return error_info 