"""
Knowledge Base integration for semantic search and information retrieval
"""

import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)


class KnowledgeBase:
    """Manages knowledge base for contextual information retrieval"""
    
    def __init__(self):
        self.knowledge_entries = []
        self.initialized = False
    
    async def initialize(self):
        """Initialize knowledge base with sample data"""
        logger.info("Initializing knowledge base...")
        
        # Sample knowledge entries
        self.knowledge_entries = [
            {
                "id": "onboarding-basics",
                "title": "ElevateHub Onboarding Process",
                "content": "The onboarding process consists of 6 phases: Account Setup, Team Introduction, Project Assignment, Technical Training, Domain Knowledge, and Final Assessment.",
                "category": "onboarding_process",
                "tags": ["onboarding", "process", "phases"]
            },
            {
                "id": "insurance-concepts",
                "title": "Insurance Industry Fundamentals",
                "content": "Key insurance concepts include policy management, claims processing, underwriting, risk assessment, and regulatory compliance.",
                "category": "insurance_domain",
                "tags": ["insurance", "domain", "concepts"]
            },
            {
                "id": "tech-stack",
                "title": "Technical Stack Overview",
                "content": "Our technology stack includes React, TypeScript, Node.js, PostgreSQL, AWS services, and Salesforce integration.",
                "category": "technical_standards",
                "tags": ["technology", "stack", "tools"]
            }
        ]
        
        self.initialized = True
        logger.info("Knowledge base initialized with sample data")
    
    async def search(self, query: str, category: Optional[str] = None, limit: int = 5) -> List[Dict[str, Any]]:
        """Search knowledge base for relevant information"""
        if not self.initialized:
            await self.initialize()
        
        results = []
        query_lower = query.lower()
        
        for entry in self.knowledge_entries:
            # Simple keyword matching
            content_match = query_lower in entry["content"].lower()
            title_match = query_lower in entry["title"].lower()
            tag_match = any(query_lower in tag.lower() for tag in entry["tags"])
            
            if content_match or title_match or tag_match:
                # Calculate simple relevance score
                score = 0.0
                if title_match:
                    score += 0.5
                if content_match:
                    score += 0.3
                if tag_match:
                    score += 0.2
                
                results.append({
                    "entry": entry,
                    "relevance_score": score,
                    "snippet": entry["content"][:200] + "..." if len(entry["content"]) > 200 else entry["content"]
                })
        
        # Sort by relevance score
        results.sort(key=lambda x: x["relevance_score"], reverse=True)
        
        return results[:limit] 