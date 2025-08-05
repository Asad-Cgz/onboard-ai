#!/bin/bash

# ElevateHub Startup Script
# Simple script to start both frontend and chatbot services

set -e

# Colors for output
BLUE='\033[34m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_DIR="frontend"
CHATBOT_DIR="chatbot"
FRONTEND_PORT=3000
CHATBOT_PORT=8000

# Function to print colored output
print_info() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to start frontend
start_frontend() {
    print_info "🌐 Starting frontend development server..."
    
    if check_port $FRONTEND_PORT; then
        print_warning "⚠️  Port $FRONTEND_PORT is already in use. Frontend might already be running."
        return 1
    fi
    
    cd $FRONTEND_DIR
    if [ ! -d "node_modules" ]; then
        print_info "📦 Installing frontend dependencies..."
        npm install
    fi
    
    print_success "✅ Starting Next.js development server on port $FRONTEND_PORT"
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    return 0
}

# Function to start chatbot
start_chatbot() {
    print_info "🤖 Starting chatbot API server..."
    
    if check_port $CHATBOT_PORT; then
        print_warning "⚠️  Port $CHATBOT_PORT is already in use. Chatbot API might already be running."
        return 1
    fi
    
    cd $CHATBOT_DIR
    
    # Check if virtual environment exists
    if [ ! -f "requirements.txt" ]; then
        print_error "❌ requirements.txt not found in $CHATBOT_DIR"
        return 1
    fi
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_info "🐍 Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Install dependencies if needed
    print_info "📦 Checking chatbot dependencies..."
    source venv/bin/activate
    pip install -r requirements.txt --quiet
    
    # Create necessary directories
    mkdir -p logs data/chroma data/knowledge
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ] && [ -f "config.env.example" ]; then
        print_warning "⚠️  Creating .env from config.env.example"
        cp config.env.example .env
        print_warning "⚠️  Please configure your .env file with proper API keys"
    fi
    
    print_success "✅ Starting FastAPI server on port $CHATBOT_PORT"
    source venv/bin/activate && python -m uvicorn src.main:app --reload --host 0.0.0.0 --port $CHATBOT_PORT &
    CHATBOT_PID=$!
    cd ..
    
    return 0
}

# Function to cleanup processes on exit
cleanup() {
    print_warning "\n🛑 Shutting down services..."
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        print_info "Frontend server stopped"
    fi
    
    if [ ! -z "$CHATBOT_PID" ]; then
        kill $CHATBOT_PID 2>/dev/null || true
        print_info "Chatbot API stopped"
    fi
    
    # Kill any remaining processes
    pkill -f "next-server" 2>/dev/null || true
    pkill -f "uvicorn" 2>/dev/null || true
    
    print_success "✅ All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    print_info "🚀 Starting ElevateHub Development Environment"
    print_info "=============================================="
    echo ""
    
    # Check prerequisites
    if ! command -v node &> /dev/null; then
        print_error "❌ Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "❌ Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Start services
    print_info "Starting services..."
    echo ""
    
    # Start chatbot first (frontend depends on it)
    if start_chatbot; then
        print_success "✅ Chatbot API started successfully"
        sleep 2  # Give it a moment to start
    else
        print_error "❌ Failed to start chatbot API"
    fi
    
    # Start frontend
    if start_frontend; then
        print_success "✅ Frontend started successfully"
    else
        print_error "❌ Failed to start frontend"
    fi
    
    echo ""
    print_success "🎉 ElevateHub is now running!"
    print_info "================================"
    echo ""
    print_info "📱 Frontend: http://localhost:$FRONTEND_PORT"
    print_info "🤖 Chatbot API: http://localhost:$CHATBOT_PORT"
    print_info "📚 API Documentation: http://localhost:$CHATBOT_PORT/docs"
    echo ""
    print_warning "Press Ctrl+C to stop all services"
    echo ""
    
    # Wait for processes
    wait
}

# Show help
show_help() {
    echo "ElevateHub Startup Script"
    echo "========================"
    echo ""
    echo "Usage: ./start.sh [option]"
    echo ""
    echo "Options:"
    echo "  (no args)    Start both frontend and chatbot"
    echo "  frontend     Start only frontend"
    echo "  chatbot      Start only chatbot API"
    echo "  help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./start.sh              # Start everything"
    echo "  ./start.sh frontend     # Start only frontend"
    echo "  ./start.sh chatbot      # Start only chatbot"
    echo ""
    echo "Services:"
    echo "  Frontend: http://localhost:$FRONTEND_PORT"
    echo "  API: http://localhost:$CHATBOT_PORT"
    echo "  Docs: http://localhost:$CHATBOT_PORT/docs"
}

# Handle command line arguments
case "${1:-}" in
    "frontend")
        print_info "🌐 Starting frontend only..."
        if start_frontend; then
            print_success "✅ Frontend started at http://localhost:$FRONTEND_PORT"
            wait
        fi
        ;;
    "chatbot")
        print_info "🤖 Starting chatbot API only..."
        if start_chatbot; then
            print_success "✅ Chatbot API started at http://localhost:$CHATBOT_PORT"
            print_info "📚 Documentation: http://localhost:$CHATBOT_PORT/docs"
            wait
        fi
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    "")
        main
        ;;
    *)
        print_error "❌ Unknown option: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 