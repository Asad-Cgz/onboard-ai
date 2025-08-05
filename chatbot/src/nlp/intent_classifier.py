"""
Intent Classification for understanding user queries
"""

import logging
import re
from typing import Dict, List, Tuple, Optional
from datetime import datetime

from ..config import INTENT_CATEGORIES

logger = logging.getLogger(__name__)


class IntentClassifier:
    """Classifies user messages into intents"""
    
    def __init__(self):
        self.intent_categories = INTENT_CATEGORIES
        self.last_confidence = 0.0
        self.classification_history = []
        
        # Pre-compile regex patterns for better performance
        self._compile_patterns()
    
    def _compile_patterns(self):
        """Compile regex patterns for each intent"""
        self.intent_patterns = {}
        
        for intent, config in self.intent_categories.items():
            patterns = []
            for keyword in config.get("keywords", []):
                # Create flexible patterns that match word boundaries
                pattern = rf"\b{re.escape(keyword)}\w*\b"
                patterns.append(pattern)
            
            self.intent_patterns[intent] = [
                re.compile(pattern, re.IGNORECASE) for pattern in patterns
            ]
    
    async def classify_intent(self, message: str, context: Optional[Dict] = None) -> str:
        """
        Classify user message intent
        
        Args:
            message: User message text
            context: Optional context information
            
        Returns:
            Intent name
        """
        try:
            # Clean message
            cleaned_message = self._preprocess_message(message)
            
            # Calculate scores for each intent
            intent_scores = {}
            
            for intent in self.intent_categories.keys():
                score = await self._calculate_intent_score(
                    cleaned_message, intent, context
                )
                intent_scores[intent] = score
            
            # Find best matching intent
            best_intent, confidence = self._get_best_intent(intent_scores)
            
            # Apply confidence threshold
            if confidence < 0.3:  # Low confidence threshold
                best_intent = "general_help"
                confidence = 0.5
            
            self.last_confidence = confidence
            
            # Store classification history
            self.classification_history.append({
                "message": message,
                "intent": best_intent,
                "confidence": confidence,
                "scores": intent_scores,
                "timestamp": datetime.utcnow().isoformat()
            })
            
            # Keep only last 100 classifications
            if len(self.classification_history) > 100:
                self.classification_history.pop(0)
            
            logger.info(f"Classified intent: {best_intent} (confidence: {confidence:.2f})")
            return best_intent
            
        except Exception as e:
            logger.error(f"Error classifying intent: {str(e)}")
            self.last_confidence = 0.1
            return "general_help"
    
    async def _calculate_intent_score(
        self, 
        message: str, 
        intent: str, 
        context: Optional[Dict] = None
    ) -> float:
        """Calculate score for a specific intent"""
        score = 0.0
        
        # Keyword matching score
        keyword_score = self._calculate_keyword_score(message, intent)
        score += keyword_score * 0.6  # 60% weight
        
        # Pattern matching score
        pattern_score = self._calculate_pattern_score(message, intent)
        score += pattern_score * 0.3  # 30% weight
        
        # Context score
        context_score = self._calculate_context_score(intent, context)
        score += context_score * 0.1  # 10% weight
        
        return min(score, 1.0)  # Cap at 1.0
    
    def _calculate_keyword_score(self, message: str, intent: str) -> float:
        """Calculate keyword matching score"""
        if intent not in self.intent_categories:
            return 0.0
        
        keywords = self.intent_categories[intent].get("keywords", [])
        if not keywords:
            return 0.0
        
        message_lower = message.lower()
        total_weight = 0.0
        matched_weight = 0.0
        
        for keyword in keywords:
            weight = len(keyword)  # Longer keywords get more weight
            total_weight += weight
            
            if keyword.lower() in message_lower:
                matched_weight += weight
        
        return matched_weight / total_weight if total_weight > 0 else 0.0
    
    def _calculate_pattern_score(self, message: str, intent: str) -> float:
        """Calculate pattern matching score"""
        if intent not in self.intent_patterns:
            return 0.0
        
        patterns = self.intent_patterns[intent]
        if not patterns:
            return 0.0
        
        matches = 0
        for pattern in patterns:
            if pattern.search(message):
                matches += 1
        
        return matches / len(patterns)
    
    def _calculate_context_score(self, intent: str, context: Optional[Dict]) -> float:
        """Calculate context-based score"""
        if not context:
            return 0.0
        
        score = 0.0
        
        # User onboarding phase context
        onboarding_phase = context.get("onboarding_phase", 0)
        if intent == "onboarding" and onboarding_phase < 6:
            score += 0.5
        
        # Current project context
        current_projects = context.get("current_projects", [])
        if intent == "project" and current_projects:
            score += 0.3
        
        # Recent activity context
        recent_intents = context.get("recent_intents", [])
        if intent in recent_intents:
            score += 0.2
        
        # Source context (quick action, etc.)
        source = context.get("source")
        if source == "quick_action":
            action_id = context.get("action_id", "")
            if intent in action_id:
                score += 0.7
        
        return min(score, 1.0)
    
    def _get_best_intent(self, intent_scores: Dict[str, float]) -> Tuple[str, float]:
        """Get the best matching intent and confidence"""
        if not intent_scores:
            return "general_help", 0.1
        
        # Sort by score
        sorted_intents = sorted(
            intent_scores.items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        best_intent, best_score = sorted_intents[0]
        
        # Calculate confidence based on score difference
        if len(sorted_intents) > 1:
            second_score = sorted_intents[1][1]
            score_difference = best_score - second_score
            confidence = min(best_score + score_difference * 0.5, 1.0)
        else:
            confidence = best_score
        
        return best_intent, confidence
    
    def _preprocess_message(self, message: str) -> str:
        """Preprocess message for classification"""
        # Convert to lowercase
        processed = message.lower()
        
        # Remove extra whitespace
        processed = " ".join(processed.split())
        
        # Remove punctuation but keep important chars
        processed = re.sub(r'[^\w\s\-\']', ' ', processed)
        
        # Handle common contractions
        contractions = {
            "can't": "cannot",
            "won't": "will not",
            "i'm": "i am",
            "i've": "i have",
            "i'll": "i will",
            "don't": "do not",
            "doesn't": "does not",
            "didn't": "did not",
            "haven't": "have not",
            "hasn't": "has not",
            "shouldn't": "should not",
            "wouldn't": "would not",
            "couldn't": "could not"
        }
        
        for contraction, expansion in contractions.items():
            processed = processed.replace(contraction, expansion)
        
        return processed.strip()
    
    def get_supported_intents(self) -> List[Dict[str, str]]:
        """Get list of supported intents with descriptions"""
        return [
            {
                "name": intent,
                "description": config.get("description", ""),
                "examples": config.get("examples", [])
            }
            for intent, config in self.intent_categories.items()
        ]
    
    def get_classification_history(self, limit: int = 10) -> List[Dict]:
        """Get recent classification history"""
        return self.classification_history[-limit:]
    
    def get_intent_confidence_stats(self) -> Dict[str, float]:
        """Get confidence statistics for recent classifications"""
        if not self.classification_history:
            return {}
        
        recent_classifications = self.classification_history[-50:]  # Last 50
        
        intent_confidences = {}
        for classification in recent_classifications:
            intent = classification["intent"]
            confidence = classification["confidence"]
            
            if intent not in intent_confidences:
                intent_confidences[intent] = []
            intent_confidences[intent].append(confidence)
        
        # Calculate average confidence per intent
        stats = {}
        for intent, confidences in intent_confidences.items():
            stats[intent] = {
                "avg_confidence": sum(confidences) / len(confidences),
                "min_confidence": min(confidences),
                "max_confidence": max(confidences),
                "count": len(confidences)
            }
        
        return stats
    
    async def load_models(self):
        """Load ML models (placeholder for future implementation)"""
        logger.info("Loading intent classification models...")
        # In the future, load pre-trained models here
        logger.info("Intent classifier ready")
    
    def update_intent_category(self, intent: str, keywords: List[str], examples: List[str]):
        """Update or add new intent category"""
        if intent not in self.intent_categories:
            self.intent_categories[intent] = {}
        
        self.intent_categories[intent].update({
            "keywords": keywords,
            "examples": examples,
            "description": f"Custom intent: {intent}"
        })
        
        # Recompile patterns
        self._compile_patterns()
        
        logger.info(f"Updated intent category: {intent}")
    
    def analyze_message_entities(self, message: str) -> Dict[str, List[str]]:
        """Extract entities from message (simplified implementation)"""
        entities = {
            "dates": [],
            "numbers": [],
            "emails": [],
            "urls": [],
            "technologies": [],
            "people": []
        }
        
        # Date patterns
        date_patterns = [
            r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',
            r'\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b',
            r'\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b'
        ]
        
        for pattern in date_patterns:
            matches = re.findall(pattern, message, re.IGNORECASE)
            entities["dates"].extend(matches)
        
        # Number patterns
        number_pattern = r'\b\d+(?:\.\d+)?(?:%|percent|hours?|days?|weeks?|months?|years?)?\b'
        entities["numbers"] = re.findall(number_pattern, message, re.IGNORECASE)
        
        # Email patterns
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        entities["emails"] = re.findall(email_pattern, message)
        
        # URL patterns
        url_pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
        entities["urls"] = re.findall(url_pattern, message)
        
        # Technology keywords
        tech_keywords = [
            "python", "javascript", "typescript", "react", "node.js", "sql",
            "postgres", "mongodb", "redis", "docker", "kubernetes", "aws",
            "azure", "git", "github", "jira", "salesforce", "api", "rest",
            "graphql", "json", "xml", "html", "css", "tailwind", "bootstrap"
        ]
        
        message_lower = message.lower()
        for tech in tech_keywords:
            if tech.lower() in message_lower:
                entities["technologies"].append(tech)
        
        return entities 