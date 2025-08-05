# ElevateHub - Integrated Onboarding Platform

**Accelerating Talent Journeys - Seamless, Smart, Cognizant**

ElevateHub is a comprehensive employee onboarding platform featuring an AI-powered chatbot assistant, project management tools, team collaboration features, and skills development tracking.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      ElevateHub Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js + TypeScript + Tailwind CSS)               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │ Dashboard   │ My Projects │ Team Info   │ Ask the Bot     │  │
│  │             │             │             │                 │  │
│  │ Onboarding  │ My Skills   │ Tools &     │ Settings        │  │
│  │ Status      │             │ Apps        │                 │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                     API Integration Layer                       │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  HTTP Requests (REST API) ↔ WebSocket (Real-time updates)  │ │
│  └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  Chatbot Backend (FastAPI + Python)                           │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │ Intent      │ Response    │ Knowledge   │ Session         │  │
│  │ Classifier  │ Generator   │ Base        │ Manager         │  │
│  │             │             │             │                 │  │
│  │ Context     │ Message     │ Analytics   │ External APIs   │  │
│  │ Handler     │ Processor   │             │                 │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        Data Layer                              │
│  ┌─────────────┬─────────────┬─────────────┬─────────────────┐  │
│  │ PostgreSQL  │ Redis       │ ChromaDB    │ File Storage    │  │
│  │ (Sessions)  │ (Cache)     │ (Vectors)   │ (Knowledge)     │  │
│  └─────────────┴─────────────┴─────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Custom animations** - Float, glow, and transition effects

### Backend (Chatbot API)
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation and serialization
- **OpenAI GPT** - Large Language Model integration
- **LangChain** - LLM application framework
- **ChromaDB** - Vector database for semantic search
- **PostgreSQL** - Primary database for sessions
- **Redis** - Caching and session management

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy (production)
- **Prometheus & Grafana** - Monitoring (optional)

## ✨ Key Features

### 🎯 Dashboard & Analytics
- **Interactive metrics** - Real-time onboarding progress, project status
- **Visual progress tracking** - Completion percentages and milestones
- **Quick navigation** - Clickable metric cards linking to relevant pages
- **Responsive design** - Mobile-first approach

### 🤖 AI-Powered Chatbot
- **Intent classification** - Understands context and user needs
- **Contextual responses** - Maintains conversation history
- **Quick actions** - Pre-defined shortcuts for common queries
- **Smart suggestions** - AI-generated follow-up questions
- **Multi-category support** - Onboarding, technical, domain, team, project, tools
- **Real-time connectivity** - Online/offline status indicators
- **Fallback handling** - Graceful degradation when API is unavailable

### 👥 Team Management
- **Team directory** - Complete team member information
- **Department organization** - Cognizant Leadership, Dev Leaders, Testing, BA/Scrum, Client Side
- **Contact information** - Direct access to team member details
- **Avatar system** - Human-friendly emoji representations
- **Interactive profiles** - Detailed information on demand

### 📋 Project Management
- **Multi-project support** - Track multiple concurrent projects
- **Timeline visualization** - Start dates, end dates, milestones
- **Hours tracking** - Required vs logged hours
- **Team composition** - Project leads and team members
- **Technology stacks** - Track technologies used per project
- **Progress monitoring** - Visual progress indicators
- **Project history** - Previous project archives

### 🎓 Skills & Learning
- **Skill categories** - Technical, Domain, Functional, Leadership
- **Competency levels** - Strong, Okay, Needs Work indicators
- **Growth tracking** - Skill development over time
- **Learning alignment** - Connect skills to growth areas

### 🛠️ Tools & Configuration
- **Tool management** - Track required and installed tools
- **Environment setup** - Development environment configuration
- **Settings management** - Theme, language, notification preferences
- **Tool offloading** - Remove tools from completed projects

### 📊 Onboarding Tracking
- **6-phase process** - Structured onboarding journey
- **Progress visualization** - Interactive roadmap display
- **Milestone tracking** - Clear completion indicators
- **Personalized guidance** - AI-assisted onboarding support

## 🔗 Frontend-Backend Integration

### API Connectivity
The frontend seamlessly connects to the chatbot backend through RESTful APIs:

```typescript
// Example API integration
const sendMessage = async (message: string, sessionId?: string) => {
  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      user_id: 'current-user',
      session_id: sessionId,
    }),
  });
  return response.json();
};
```

### Real-time Features
- **Connection status monitoring** - Visual indicators for API availability
- **Session persistence** - Conversation history maintained across sessions
- **Automatic fallback** - Local responses when backend is unavailable
- **Smart suggestions** - Backend-generated conversation suggestions
- **Context awareness** - User state and preferences tracked

### Data Flow
1. **User Interaction** → Frontend captures user input
2. **API Request** → Sent to chatbot backend with context
3. **AI Processing** → Intent classification and response generation
4. **Knowledge Retrieval** → Semantic search through knowledge base
5. **Response Delivery** → Contextualized response with suggestions
6. **UI Update** → Frontend displays response with visual enhancements

## 🛠️ Development Setup

### Prerequisites
- **Node.js 18+** - For frontend development
- **Python 3.11+** - For chatbot backend
- **PostgreSQL 13+** - Primary database
- **Redis 6+** - Caching and sessions
- **Git** - Version control

### Quick Start with Makefile

```bash
# 1. Clone and setup
git clone <repository-url>
cd onboard-ai

# 2. Install all dependencies
make install

# 3. Setup development environment
make setup-dev

# 4. Start both services
make dev
```

### Quick Start with Script

```bash
# Make script executable (first time only)
chmod +x start.sh

# Start both frontend and backend
./start.sh

# Or start individual services
./start.sh frontend  # Frontend only
./start.sh chatbot   # Backend only
```

### Manual Setup

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup
```bash
cd chatbot
pip install -r requirements.txt
cp config.env.example .env
# Configure .env with your API keys
python -m uvicorn src.main:app --reload --port 8000
```

## 📡 API Endpoints

### Chat Operations
- `POST /chat` - Send message and get AI response
- `POST /chat/quick-action` - Execute predefined quick actions
- `GET /chat/sessions/{user_id}` - Get user chat sessions
- `GET /chat/sessions/{session_id}/history` - Get session history
- `DELETE /chat/sessions/{session_id}` - Delete chat session

### Knowledge & Utilities
- `GET /knowledge/search` - Search knowledge base
- `GET /intents` - Get supported intent categories
- `GET /quick-actions` - Get available quick actions
- `GET /health` - API health check
- `GET /docs` - Interactive API documentation

### Example Usage
```bash
# Test the chatbot API
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I start my onboarding?",
    "user_id": "user123"
  }'
```

## 🔧 Available Commands

### Makefile Commands
```bash
# Development
make dev                 # Start both services
make dev-frontend        # Start frontend only
make dev-chatbot        # Start backend only

# Setup
make install            # Install all dependencies
make setup-dev          # Complete environment setup

# Management
make health             # Check service health
make status             # Show complete status
make logs               # View logs
make stop               # Stop all services
make clean              # Clean build artifacts

# Docker
make docker             # Start with Docker Compose
make docker-build       # Build Docker images
make docker-stop        # Stop Docker services
```

### Script Commands
```bash
./start.sh              # Start everything
./start.sh frontend     # Frontend only
./start.sh chatbot      # Backend only
./start.sh help         # Show help
```

## 🌐 Access URLs

Once running, access the application at:

- **🌐 Frontend**: http://localhost:3000
- **🤖 Chatbot API**: http://localhost:8000
- **📚 API Documentation**: http://localhost:8000/docs
- **🔍 Health Check**: http://localhost:8000/health

## 🎨 UI Features

### Design System
- **Dark theme** - Modern slate/gray color palette
- **Gradient accents** - Blue to purple gradients for highlights
- **Glass effects** - Subtle transparency and backdrop blur
- **Smooth animations** - Float, glow, and transition effects
- **Responsive layout** - Mobile-first design approach

### Interactive Elements
- **Metric cards** - Clickable dashboard metrics with navigation
- **Progress bars** - Animated completion indicators
- **Status badges** - Color-coded status indicators
- **Hover effects** - Smooth transitions and visual feedback
- **Loading states** - Skeleton loaders and typing indicators

### Accessibility
- **Keyboard navigation** - Full keyboard support
- **Screen reader friendly** - Semantic HTML and ARIA labels
- **Color contrast** - WCAG compliant color combinations
- **Focus indicators** - Clear focus states for all interactive elements

## 🤖 Chatbot Capabilities

### Intent Categories
- **Onboarding** - Process guidance and milestone tracking
- **Technical** - Coding standards and development help
- **Domain** - Insurance industry knowledge and concepts
- **Team** - Team member information and contacts
- **Project** - Project details and assignments
- **Tools** - Software installation and configuration
- **General Help** - Fallback for unclassified queries

### AI Features
- **Context awareness** - Maintains conversation context
- **Smart routing** - Intelligent intent classification
- **Knowledge integration** - Semantic search through documentation
- **Personalization** - User-specific responses based on onboarding phase
- **Multi-turn conversations** - Coherent multi-message interactions

### Response Types
- **Informational** - Direct answers to questions
- **Procedural** - Step-by-step guidance
- **Navigational** - Directions to relevant resources
- **Suggestive** - Follow-up questions and recommendations

## 📊 Monitoring & Analytics

### Health Monitoring
```bash
# Check service health
make health

# View detailed status
make status

# Monitor logs
make logs
```

### Performance Metrics
- **Response times** - API and frontend performance
- **Success rates** - API reliability metrics
- **User engagement** - Chat interaction analytics
- **System resources** - Memory and CPU usage

## 🚀 Deployment

### Docker Deployment
```bash
# Build and start with Docker
make docker-build
make docker

# Or use Docker Compose directly
cd chatbot
docker-compose up -d
```

### Production Configuration
1. **Environment Variables** - Configure production settings
2. **Database Setup** - PostgreSQL and Redis configuration
3. **API Keys** - OpenAI and other service credentials
4. **SSL Certificates** - HTTPS configuration for production
5. **Monitoring** - Prometheus and Grafana setup

## 🔐 Security

### API Security
- **CORS configuration** - Controlled cross-origin access
- **Input validation** - Pydantic model validation
- **Rate limiting** - API protection against abuse
- **Session management** - Secure session handling

### Data Protection
- **Environment isolation** - Separate dev/prod configurations
- **Secret management** - Secure API key storage
- **Logging controls** - PII data protection
- **Database security** - Connection encryption and access controls

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd chatbot
python -m pytest tests/
```

### Integration Testing
```bash
# Test full stack integration
make test
```

## 📚 Documentation

### API Documentation
- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc (Alternative documentation)

### Code Documentation
- **Frontend**: TypeScript interfaces and component documentation
- **Backend**: Python docstrings and API schemas
- **README files**: Detailed setup and usage instructions

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** changes with tests
4. **Test** thoroughly using provided commands
5. **Submit** a pull request

### Code Standards
- **TypeScript** - Strict typing for frontend
- **Python** - PEP 8 compliance for backend
- **ESLint/Prettier** - Frontend code formatting
- **Black/Flake8** - Python code formatting

## 📞 Support & Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the ports
make ps

# Stop all services
make stop
```

#### Backend Connection Issues
```bash
# Check backend health
curl http://localhost:8000/health

# View backend logs
make logs-chatbot
```

#### Frontend Build Issues
```bash
# Clean and reinstall
make clean-frontend
make install-frontend
```

### Getting Help
- **Health Check**: `make health` - Quick status overview
- **Logs**: `make logs` - View application logs
- **Status**: `make status` - Comprehensive system status
- **Documentation**: Visit http://localhost:8000/docs for API docs

## 🔮 Roadmap

### Upcoming Features
- **Voice integration** - Speech-to-text chat capabilities
- **Multi-language support** - Internationalization
- **Advanced analytics** - ML-powered insights
- **Mobile app** - Native mobile applications
- **SSO integration** - Enterprise authentication
- **Webhook support** - Real-time notifications

### Technical Improvements
- **Model fine-tuning** - Organization-specific AI training
- **Performance optimization** - Caching and CDN integration
- **Scalability** - Kubernetes deployment support
- **Security enhancements** - Advanced authentication methods

---

**ElevateHub** - Built with ❤️ for seamless onboarding experiences.

*Accelerating Talent Journeys - Seamless, Smart, Cognizant*
