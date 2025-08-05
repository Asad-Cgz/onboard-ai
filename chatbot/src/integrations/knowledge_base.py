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
            },
            # ADD YOUR PROJECT-SPECIFIC ENTRIES HERE:
            {
                "id": "project-specific-setup",
                "title": "Project Setup Guidelines",
                "content": "For the Insurance Claims Platform project: 1) Install Docker and Node.js 18+, 2) Clone the main repository, 3) Set up local PostgreSQL database, 4) Configure environment variables, 5) Run `npm install` and `docker-compose up`",
                "category": "technical_standards",
                "tags": ["setup", "installation", "docker", "database"]
            },
            {
                "id": "business-rules",
                "title": "Insurance Business Rules",
                "content": "Critical business rules: Claims must be processed within 48 hours, Premium calculations use age+location+vehicle factors, Policy renewals require 30-day notice, High-value claims (>$50K) need manager approval",
                "category": "insurance_domain",
                "tags": ["business-rules", "claims", "policy", "premium"]
            },
            {
                "id": "api-documentation",
                "title": "API Integration Guide",
                "content": "Main APIs: Customer API (REST), Policy Management API (GraphQL), Claims Processing API (REST), Payment Gateway (Stripe), External data from MVR/CLUE databases. All APIs use JWT authentication.",
                "category": "technical_standards",
                "tags": ["api", "integration", "authentication", "database"]
            },
            {
                "id": "compliance-requirements",
                "title": "Compliance and Security",
                "content": "Must comply with: GDPR for EU customers, CCPA for California residents, SOX for financial reporting, PCI DSS for payment processing. All customer data must be encrypted at rest and in transit.",
                "category": "compliance",
                "tags": ["compliance", "security", "gdpr", "encryption"]
            },
            {
                "id": "testing-procedures",
                "title": "Testing Standards",
                "content": "Testing requirements: 80% code coverage minimum, End-to-end tests for critical user flows, Load testing for 1000+ concurrent users, Security penetration testing quarterly",
                "category": "technical_standards",
                "tags": ["testing", "coverage", "security", "performance"]
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