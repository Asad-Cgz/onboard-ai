"""
Pydantic models for chat functionality
"""

from datetime import datetime
from typing import Optional, List, Dict, Any, Literal
from pydantic import BaseModel, Field
import uuid


class ChatMessage(BaseModel):
    """Individual chat message model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: str = Field(..., min_length=1, max_length=5000)
    sender: Literal["user", "bot"] = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: str = Field(...)
    message_type: str = Field(default="text")  # text, code, suggestion, error
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ChatSession(BaseModel):
    """Chat session model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = Field(...)
    messages: List[ChatMessage] = Field(default_factory=list)
    context: Dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)
    session_type: str = Field(default="chat")  # chat, onboarding, support
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoints"""
    message: ChatMessage = Field(...)
    session_id: str = Field(...)
    intent: str = Field(...)
    confidence: float = Field(..., ge=0.0, le=1.0)
    suggestions: List[str] = Field(default_factory=list)
    context: Optional[Dict[str, Any]] = Field(default_factory=dict)
    response_time_ms: Optional[int] = Field(default=None)


class UserContext(BaseModel):
    """User context information"""
    user_id: str = Field(...)
    onboarding_phase: int = Field(default=1, ge=1, le=6)
    onboarding_progress: float = Field(default=0.0, ge=0.0, le=100.0)
    current_projects: List[str] = Field(default_factory=list)
    team_members: List[str] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    preferences: Dict[str, Any] = Field(default_factory=dict)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class Intent(BaseModel):
    """Intent classification result"""
    name: str = Field(...)
    confidence: float = Field(..., ge=0.0, le=1.0)
    category: str = Field(...)
    entities: Dict[str, Any] = Field(default_factory=dict)
    keywords: List[str] = Field(default_factory=list)


class KnowledgeEntry(BaseModel):
    """Knowledge base entry"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(...)
    content: str = Field(...)
    category: str = Field(...)
    tags: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    version: int = Field(default=1)
    is_active: bool = Field(default=True)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class SearchResult(BaseModel):
    """Search result from knowledge base"""
    entry: KnowledgeEntry = Field(...)
    relevance_score: float = Field(..., ge=0.0, le=1.0)
    snippet: str = Field(...)
    highlighted_terms: List[str] = Field(default_factory=list)


class TeamMember(BaseModel):
    """Team member information"""
    id: str = Field(...)
    name: str = Field(...)
    role: str = Field(...)
    email: str = Field(...)
    department: str = Field(...)
    avatar: Optional[str] = Field(default=None)
    skills: List[str] = Field(default_factory=list)
    contact_info: Dict[str, str] = Field(default_factory=dict)
    is_active: bool = Field(default=True)


class ProjectInfo(BaseModel):
    """Project information"""
    id: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    client: str = Field(...)
    status: str = Field(...)
    start_date: datetime = Field(...)
    end_date: datetime = Field(...)
    team_members: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    progress: float = Field(default=0.0, ge=0.0, le=100.0)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class OnboardingMilestone(BaseModel):
    """Onboarding milestone"""
    id: str = Field(...)
    phase: int = Field(..., ge=1, le=6)
    title: str = Field(...)
    description: str = Field(...)
    status: Literal["not_started", "in_progress", "completed"] = Field(default="not_started")
    due_date: Optional[datetime] = Field(default=None)
    completed_date: Optional[datetime] = Field(default=None)
    required: bool = Field(default=True)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ChatAnalytics(BaseModel):
    """Chat analytics data"""
    session_id: str = Field(...)
    user_id: str = Field(...)
    message_count: int = Field(default=0)
    session_duration: int = Field(default=0)  # seconds
    intents_triggered: List[str] = Field(default_factory=list)
    satisfaction_rating: Optional[int] = Field(default=None, ge=1, le=5)
    issues_resolved: int = Field(default=0)
    escalations: int = Field(default=0)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ApiResponse(BaseModel):
    """Generic API response wrapper"""
    success: bool = Field(...)
    message: str = Field(...)
    data: Optional[Any] = Field(default=None)
    error: Optional[str] = Field(default=None)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class HealthCheck(BaseModel):
    """Health check response"""
    status: Literal["healthy", "degraded", "unhealthy"] = Field(...)
    version: str = Field(...)
    services: Dict[str, str] = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    uptime: int = Field(...)  # seconds
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 