# ElevateHub Chatbot Backend

**AI-Powered Onboarding Assistant for ElevateHub Platform**

An intelligent chatbot backend service built with FastAPI, providing contextual assistance for employee onboarding, project guidance, and technical support.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   FastAPI       │    │   AI Services   │
│   (Next.js)     │◄──►│   Backend       │◄──►│   (OpenAI)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────▼────────┐
                       │   Data Layer    │
                       │                 │
                       │ ┌─────────────┐ │
                       │ │ PostgreSQL  │ │
                       │ │ (Sessions)  │ │
                       │ └─────────────┘ │
                       │                 │
                       │ ┌─────────────┐ │
                       │ │   Redis     │ │
                       │ │ (Caching)   │ │
                       │ └─────────────┘ │
                       │                 │
                       │ ┌─────────────┐ │
                       │ │  ChromaDB   │ │
                       │ │(Vector DB)  │ │
                       │ └─────────────┘ │
                       └─────────────────┘
```

## 🚀 Tech Stack

### Core Framework
- **FastAPI** - Modern, high-performance web framework for Python
- **Uvicorn** - ASGI server for FastAPI applications
- **Pydantic** - Data validation and settings management

### AI & ML
- **OpenAI GPT-3.5/4** - Large Language Model for response generation
- **LangChain** - LLM application development framework
- **ChromaDB** - Vector database for semantic search
- **Sentence Transformers** - Text embeddings for similarity search

### Data Storage
- **PostgreSQL** - Primary database for sessions and user data
- **Redis** - Caching and session management
- **SQLAlchemy** - ORM for database operations

### Additional Libraries
- **Motor** - Async MongoDB driver (optional)
- **Celery** - Background task processing
- **python-jose** - JWT token handling
- **httpx** - Async HTTP client for external APIs

## 📋 Features

### 🤖 AI-Powered Conversations
- **Intent Classification** - Understands user queries and categorizes them
- **Context-Aware Responses** - Maintains conversation context across sessions
- **Onboarding Guidance** - Specialized knowledge about ElevateHub onboarding
- **Technical Support** - Coding standards, tools, and development help

### 📚 Knowledge Management
- **Vector Search** - Semantic search through knowledge base
- **Multi-Category Support** - Onboarding, technical, domain, team information
- **Real-time Updates** - Dynamic knowledge base refresh
- **Relevance Scoring** - Ranked search results

### 🔧 Session Management
- **User Sessions** - Persistent conversation history
- **Context Tracking** - User progress and preferences
- **Multi-Session Support** - Handle multiple concurrent conversations
- **Session Analytics** - Usage patterns and insights

### 🌐 Integration Ready
- **RESTful APIs** - Clean, documented endpoints
- **CORS Support** - Frontend integration ready
- **Webhook Support** - External system notifications
- **Rate Limiting** - API protection and fair usage

## 🛠️ Setup & Installation

### Prerequisites

- **Python 3.11+**
- **PostgreSQL 13+**
- **Redis 6+**
- **OpenAI API Key**

### Local Development

1. **Clone and Navigate**
   ```bash
   cd onboard-ai/chatbot
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   ```bash
   cp config.env.example .env
   # Edit .env with your configuration values
   ```

5. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb elevatehub_chatbot
   
   # Run migrations (when available)
   alembic upgrade head
   ```

6. **Start Services**
   ```bash
   # Start Redis (if not running)
   redis-server
   
   # Start the chatbot API
   python -m uvicorn src.main:app --reload --port 8000
   ```

7. **Verify Installation**
   ```bash
   curl http://localhost:8000/health
   ```

### Docker Deployment

1. **Build Image**
   ```bash
   docker build -t elevatehub-chatbot .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     --name elevatehub-chatbot \
     -p 8000:8000 \
     --env-file .env \
     elevatehub-chatbot
   ```

3. **Docker Compose** (Recommended)
   ```yaml
   version: '3.8'
   services:
     chatbot:
       build: .
       ports:
         - "8000:8000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/elevatehub_chatbot
         - REDIS_URL=redis://redis:6379/0
       depends_on:
         - db
         - redis
     
     db:
       image: postgres:15
       environment:
         POSTGRES_DB: elevatehub_chatbot
         POSTGRES_PASSWORD: password
       volumes:
         - postgres_data:/var/lib/postgresql/data
     
     redis:
       image: redis:7-alpine
       volumes:
         - redis_data:/data
   
   volumes:
     postgres_data:
     redis_data:
   ```

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for LLM | `sk-...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |

### Optional Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `API_PORT` | `8000` | Server port |
| `LOG_LEVEL` | `INFO` | Logging level |
| `SESSION_TIMEOUT` | `1800` | Session timeout (seconds) |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | OpenAI model to use |

## 📡 API Endpoints

### Chat Operations
- `POST /chat` - Send message and get response
- `POST /chat/quick-action` - Execute predefined actions
- `GET /chat/sessions/{user_id}` - Get user's chat sessions
- `GET /chat/sessions/{session_id}/history` - Get session history
- `DELETE /chat/sessions/{session_id}` - Delete chat session

### Knowledge Base
- `GET /knowledge/search` - Search knowledge base
- `GET /intents` - Get supported intents
- `GET /quick-actions` - Get available quick actions

### System
- `GET /` - API status
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

### Example Request
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I start my onboarding?",
    "user_id": "user123",
    "session_id": "session456"
  }'
```

### Example Response
```json
{
  "message": {
    "id": "msg789",
    "content": "I can help you with your onboarding process...",
    "sender": "bot",
    "timestamp": "2024-02-05T10:30:00Z",
    "session_id": "session456"
  },
  "session_id": "session456",
  "intent": "onboarding",
  "confidence": 0.95,
  "suggestions": [
    "What's my next onboarding milestone?",
    "Show me my onboarding progress"
  ]
}
```

## 🧠 AI Components

### Intent Classification
The chatbot uses a multi-layer intent classification system:

1. **Keyword Matching** - Fast initial classification
2. **Semantic Analysis** - Context-aware intent detection
3. **Confidence Scoring** - Reliability assessment
4. **Fallback Handling** - Graceful degradation

**Supported Intents:**
- `onboarding` - Onboarding process questions
- `technical` - Coding and development help
- `domain` - Insurance industry knowledge
- `team` - Team member information
- `project` - Project-related queries
- `tools` - Software and tool assistance
- `general_help` - Fallback category

### Response Generation
Multi-stage response generation pipeline:

1. **Context Building** - Gather relevant session history
2. **Knowledge Retrieval** - Search knowledge base
3. **Template Selection** - Choose appropriate response template
4. **LLM Generation** - Generate contextual response
5. **Post-processing** - Format and validate output

### Knowledge Base
Vector-based knowledge storage and retrieval:

- **Embedding Model** - `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Database** - ChromaDB for similarity search
- **Categories** - Organized by topic and intent
- **Real-time Updates** - Dynamic knowledge refresh

## 🔐 Security

### Authentication & Authorization
- **JWT Tokens** - Secure session management
- **API Key Support** - External service authentication
- **Rate Limiting** - DDoS protection
- **CORS Configuration** - Cross-origin security

### Data Protection
- **Input Validation** - Pydantic model validation
- **SQL Injection Prevention** - ORM-based queries
- **XSS Protection** - Output sanitization
- **Logging Controls** - PII data handling

## 📊 Monitoring & Analytics

### Health Checks
- **Service Status** - API, database, cache availability
- **Performance Metrics** - Response times, error rates
- **Resource Usage** - Memory, CPU, disk utilization

### Analytics
- **Conversation Metrics** - Message count, session duration
- **Intent Distribution** - Popular query categories
- **User Satisfaction** - Feedback and ratings
- **System Performance** - API response times

## 🚧 Development

### Project Structure
```
chatbot/
├── src/
│   ├── main.py                 # FastAPI application
│   ├── config.py              # Configuration settings
│   ├── models/
│   │   └── chat_models.py     # Pydantic models
│   ├── handlers/
│   │   ├── message_handler.py # Message processing
│   │   └── context_handler.py # Context management
│   ├── nlp/
│   │   ├── intent_classifier.py # Intent classification
│   │   └── response_generator.py # Response generation
│   ├── integrations/
│   │   └── knowledge_base.py  # Knowledge base integration
│   └── database/
│       └── session_manager.py # Session management
├── requirements.txt           # Python dependencies
├── Dockerfile                # Container configuration
├── config.env.example       # Environment variables
└── README.md                # This file
```

### Adding New Features

1. **Intent Categories** - Update `config.py` INTENT_CATEGORIES
2. **Response Templates** - Add to RESPONSE_TEMPLATES
3. **API Endpoints** - Extend `main.py` with new routes
4. **Data Models** - Add Pydantic models in `models/`

### Testing
```bash
# Run tests
pytest

# With coverage
pytest --cov=src

# Specific test file
pytest tests/test_chat_endpoints.py
```

## 🤝 Frontend Integration

### Connect to Next.js Frontend
The chatbot is designed to integrate seamlessly with the ElevateHub frontend:

```typescript
// Frontend API call example
const sendMessage = async (message: string, sessionId?: string) => {
  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      user_id: currentUser.id,
      session_id: sessionId,
    }),
  });
  
  return response.json();
};
```

### Environment Configuration
Update frontend environment variables:
```bash
# .env.local in frontend
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### Common Issues

**1. OpenAI API Errors**
```bash
# Check API key configuration
echo $OPENAI_API_KEY

# Test API access
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

**2. Database Connection Issues**
```bash
# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT version();"

# Check Redis connection
redis-cli ping
```

**3. Import Errors**
```bash
# Ensure PYTHONPATH is set
export PYTHONPATH=/path/to/chatbot

# Install in development mode
pip install -e .
```

### Logging
```bash
# Check application logs
tail -f logs/chatbot.log

# Enable debug logging
export LOG_LEVEL=DEBUG
```

## 📈 Performance Optimization

### Caching Strategy
- **Redis Caching** - Session data and frequent queries
- **Response Caching** - Common question-answer pairs
- **Knowledge Base Caching** - Vector search results

### Database Optimization
- **Connection Pooling** - Efficient database connections
- **Query Optimization** - Indexed searches and joins
- **Session Cleanup** - Automatic old session removal

## 🔮 Future Enhancements

### Planned Features
- **Multi-language Support** - Internationalization
- **Voice Integration** - Speech-to-text capabilities
- **Advanced Analytics** - ML-powered insights
- **Custom Training** - Organization-specific model fine-tuning

### Integration Roadmap
- **Microsoft Teams** - Native bot integration
- **Slack** - Workspace bot deployment
- **Webhook Support** - Real-time notifications
- **SSO Integration** - Enterprise authentication

## 📞 Support

### Getting Help
- **Documentation** - Check this README and API docs
- **Issues** - Create GitHub issues for bugs
- **Discussions** - Use GitHub discussions for questions

### Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

**ElevateHub Chatbot** - Intelligent assistance for seamless onboarding experiences. Built with ❤️ for better developer productivity. 