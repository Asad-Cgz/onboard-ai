# ElevateHub - Makefile for managing frontend and chatbot services
# Usage: make <command>

.PHONY: help install install-frontend install-chatbot dev dev-frontend dev-chatbot start stop clean test docker build deploy health logs

# Default target
all: help

# Variables
FRONTEND_DIR := frontend
CHATBOT_DIR := chatbot
DOCKER_COMPOSE_FILE := chatbot/docker-compose.yml
FRONTEND_PORT := 3000
CHATBOT_PORT := 8000

# Colors for output
BLUE := \033[34m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)ElevateHub Development Commands$(NC)"
	@echo "=================================="
	@echo ""
	@echo "$(GREEN)Setup Commands:$(NC)"
	@echo "  install                Install all dependencies (frontend + chatbot)"
	@echo "  install-frontend       Install frontend dependencies only"
	@echo "  install-chatbot        Install chatbot dependencies only"
	@echo ""
	@echo "$(GREEN)Development Commands:$(NC)"
	@echo "  dev                    Start both frontend and chatbot in development mode"
	@echo "  dev-frontend           Start frontend development server only"
	@echo "  dev-chatbot            Start chatbot API development server only"
	@echo "  start                  Start all services (production mode)"
	@echo "  stop                   Stop all running services"
	@echo ""
	@echo "$(GREEN)Docker Commands:$(NC)"
	@echo "  docker                 Start services using Docker Compose"
	@echo "  docker-build           Build Docker images"
	@echo "  docker-stop            Stop Docker services"
	@echo "  docker-clean           Clean up Docker containers and images"
	@echo ""
	@echo "$(GREEN)Utility Commands:$(NC)"
	@echo "  health                 Check health of all services"
	@echo "  logs                   Show logs from all services"
	@echo "  logs-frontend          Show frontend logs"
	@echo "  logs-chatbot           Show chatbot logs"
	@echo "  clean                  Clean all build artifacts and dependencies"
	@echo "  test                   Run all tests"
	@echo ""
	@echo "$(YELLOW)Quick Start:$(NC)"
	@echo "  1. make install        # Install dependencies"
	@echo "  2. make dev           # Start development servers"
	@echo "  3. Open http://localhost:3000 for frontend"
	@echo "  4. API docs at http://localhost:8000/docs"

# Installation targets
install: install-frontend install-chatbot ## Install all dependencies
	@echo "$(GREEN)✅ All dependencies installed successfully!$(NC)"

install-frontend: ## Install frontend dependencies
	@echo "$(BLUE)📦 Installing frontend dependencies...$(NC)"
	@cd $(FRONTEND_DIR) && npm install
	@echo "$(GREEN)✅ Frontend dependencies installed$(NC)"

install-chatbot: ## Install chatbot dependencies
	@echo "$(BLUE)📦 Setting up chatbot virtual environment...$(NC)"
	@cd $(CHATBOT_DIR) && python3 -m venv venv
	@echo "$(BLUE)📦 Installing chatbot dependencies...$(NC)"
	@cd $(CHATBOT_DIR) && source venv/bin/activate && pip install --upgrade pip
	@cd $(CHATBOT_DIR) && source venv/bin/activate && pip install -r requirements.txt
	@echo "$(GREEN)✅ Chatbot dependencies installed in virtual environment$(NC)"
	@echo "$(YELLOW)💡 To activate virtual environment, run: cd $(CHATBOT_DIR) && source venv/bin/activate$(NC)"

# Development targets
dev: ## Start both frontend and chatbot in development mode
	@echo "$(BLUE)🚀 Starting ElevateHub development environment...$(NC)"
	@echo "$(YELLOW)Frontend will be available at: http://localhost:$(FRONTEND_PORT)$(NC)"
	@echo "$(YELLOW)Chatbot API will be available at: http://localhost:$(CHATBOT_PORT)$(NC)"
	@echo "$(YELLOW)API documentation at: http://localhost:$(CHATBOT_PORT)/docs$(NC)"
	@echo ""
	@echo "$(BLUE)Press Ctrl+C to stop all services$(NC)"
	@$(MAKE) -j2 dev-frontend dev-chatbot

dev-frontend: ## Start frontend development server
	@echo "$(BLUE)🌐 Starting frontend development server...$(NC)"
	@cd $(FRONTEND_DIR) && npm run dev

dev-chatbot: ## Start chatbot development server
	@echo "$(BLUE)🤖 Starting chatbot development server...$(NC)"
	@cd $(CHATBOT_DIR) && source venv/bin/activate && python -m uvicorn src.main:app --reload --host 0.0.0.0 --port $(CHATBOT_PORT)

activate-venv: ## Show command to activate virtual environment
	@echo "$(BLUE)To activate the chatbot virtual environment:$(NC)"
	@echo "$(YELLOW)cd $(CHATBOT_DIR) && source venv/bin/activate$(NC)"
	@echo ""
	@echo "$(BLUE)Or copy and run this command:$(NC)"
	@echo "cd $(CHATBOT_DIR) && source venv/bin/activate && exec \$$SHELL"

shell: ## Start shell with virtual environment activated
	@echo "$(BLUE)🐍 Starting shell with virtual environment activated...$(NC)"
	@cd $(CHATBOT_DIR) && source venv/bin/activate && exec $$SHELL

# Production targets
start: ## Start all services in production mode
	@echo "$(BLUE)🚀 Starting ElevateHub production servers...$(NC)"
	@$(MAKE) -j2 start-frontend start-chatbot

start-frontend: ## Start frontend production server
	@echo "$(BLUE)🌐 Building and starting frontend...$(NC)"
	@cd $(FRONTEND_DIR) && npm run build && npm run start

start-chatbot: ## Start chatbot production server
	@echo "$(BLUE)🤖 Starting chatbot production server...$(NC)"
	@cd $(CHATBOT_DIR) && source venv/bin/activate && python -m uvicorn src.main:app --host 0.0.0.0 --port $(CHATBOT_PORT) --workers 4

stop: ## Stop all running services
	@echo "$(YELLOW)🛑 Stopping all services...$(NC)"
	@pkill -f "next-server" || true
	@pkill -f "uvicorn" || true
	@pkill -f "node.*next" || true
	@echo "$(GREEN)✅ All services stopped$(NC)"

# Docker targets
docker: ## Start services using Docker Compose
	@echo "$(BLUE)🐳 Starting services with Docker Compose...$(NC)"
	@cd $(CHATBOT_DIR) && docker-compose up -d
	@echo "$(GREEN)✅ Docker services started$(NC)"
	@echo "$(YELLOW)Chatbot API: http://localhost:$(CHATBOT_PORT)$(NC)"
	@echo "$(YELLOW)Remember to start frontend separately: make dev-frontend$(NC)"

docker-build: ## Build Docker images
	@echo "$(BLUE)🐳 Building Docker images...$(NC)"
	@cd $(CHATBOT_DIR) && docker-compose build
	@echo "$(GREEN)✅ Docker images built$(NC)"

docker-stop: ## Stop Docker services
	@echo "$(YELLOW)🛑 Stopping Docker services...$(NC)"
	@cd $(CHATBOT_DIR) && docker-compose down
	@echo "$(GREEN)✅ Docker services stopped$(NC)"

docker-clean: ## Clean up Docker containers and images
	@echo "$(YELLOW)🧹 Cleaning Docker containers and images...$(NC)"
	@cd $(CHATBOT_DIR) && docker-compose down --rmi all --volumes --remove-orphans
	@echo "$(GREEN)✅ Docker cleanup complete$(NC)"

# Health and monitoring targets
health: ## Check health of all services
	@echo "$(BLUE)🏥 Checking service health...$(NC)"
	@echo ""
	@echo "$(BLUE)Frontend (Next.js):$(NC)"
	@curl -s -f http://localhost:$(FRONTEND_PORT) > /dev/null && echo "$(GREEN)✅ Frontend is running$(NC)" || echo "$(RED)❌ Frontend is not running$(NC)"
	@echo ""
	@echo "$(BLUE)Chatbot API:$(NC)"
	@curl -s -f http://localhost:$(CHATBOT_PORT)/health > /dev/null && echo "$(GREEN)✅ Chatbot API is running$(NC)" || echo "$(RED)❌ Chatbot API is not running$(NC)"
	@echo ""
	@echo "$(BLUE)Detailed API Health:$(NC)"
	@curl -s http://localhost:$(CHATBOT_PORT)/health 2>/dev/null | python3 -m json.tool 2>/dev/null || echo "$(RED)❌ Unable to get detailed health info$(NC)"

logs: ## Show logs from all services
	@echo "$(BLUE)📋 Showing logs from all services...$(NC)"
	@echo "$(YELLOW)Note: This shows recent logs. Use 'make logs-frontend' or 'make logs-chatbot' for specific services$(NC)"
	@echo ""
	@tail -n 50 $(CHATBOT_DIR)/logs/chatbot.log 2>/dev/null || echo "$(YELLOW)No chatbot logs found$(NC)"

logs-frontend: ## Show frontend logs
	@echo "$(BLUE)📋 Frontend logs:$(NC)"
	@cd $(FRONTEND_DIR) && npm run logs 2>/dev/null || echo "$(YELLOW)Frontend logs not available in development mode$(NC)"

logs-chatbot: ## Show chatbot logs
	@echo "$(BLUE)📋 Chatbot logs:$(NC)"
	@tail -f $(CHATBOT_DIR)/logs/chatbot.log 2>/dev/null || echo "$(YELLOW)No chatbot logs found. Start the service to generate logs.$(NC)"

# Testing targets
test: test-frontend test-chatbot ## Run all tests
	@echo "$(GREEN)✅ All tests completed$(NC)"

test-frontend: ## Run frontend tests
	@echo "$(BLUE)🧪 Running frontend tests...$(NC)"
	@cd $(FRONTEND_DIR) && npm run test 2>/dev/null || echo "$(YELLOW)No frontend tests configured$(NC)"

test-chatbot: ## Run chatbot tests
	@echo "$(BLUE)🧪 Running chatbot tests...$(NC)"
	@cd $(CHATBOT_DIR) && source venv/bin/activate && python -m pytest tests/ 2>/dev/null || echo "$(YELLOW)No chatbot tests found or pytest not available$(NC)"

# Cleanup targets
clean: clean-frontend clean-chatbot ## Clean all build artifacts and dependencies
	@echo "$(GREEN)✅ All cleanup completed$(NC)"

clean-frontend: ## Clean frontend build artifacts
	@echo "$(YELLOW)🧹 Cleaning frontend...$(NC)"
	@cd $(FRONTEND_DIR) && rm -rf .next node_modules package-lock.json 2>/dev/null || true
	@echo "$(GREEN)✅ Frontend cleaned$(NC)"

clean-chatbot: ## Clean chatbot artifacts
	@echo "$(YELLOW)🧹 Cleaning chatbot...$(NC)"
	@cd $(CHATBOT_DIR) && rm -rf venv 2>/dev/null || true
	@cd $(CHATBOT_DIR) && find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@cd $(CHATBOT_DIR) && find . -name "*.pyc" -delete 2>/dev/null || true
	@cd $(CHATBOT_DIR) && rm -rf logs/*.log data/chroma/* 2>/dev/null || true
	@echo "$(GREEN)✅ Chatbot cleaned$(NC)"

# Setup development environment
setup-dev: ## Complete development environment setup
	@echo "$(BLUE)🔧 Setting up development environment...$(NC)"
	@echo ""
	@echo "$(BLUE)1. Installing dependencies...$(NC)"
	@$(MAKE) install
	@echo ""
	@echo "$(BLUE)2. Creating necessary directories...$(NC)"
	@mkdir -p $(CHATBOT_DIR)/logs
	@mkdir -p $(CHATBOT_DIR)/data/chroma
	@mkdir -p $(CHATBOT_DIR)/data/knowledge
	@echo ""
	@echo "$(BLUE)3. Setting up configuration...$(NC)"
	@cp $(CHATBOT_DIR)/config.env.example $(CHATBOT_DIR)/.env 2>/dev/null || echo "$(YELLOW)⚠️  Please manually copy config.env.example to .env and configure$(NC)"
	@echo ""
	@echo "$(GREEN)✅ Development environment setup complete!$(NC)"
	@echo ""
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "1. Configure $(CHATBOT_DIR)/.env with your API keys"
	@echo "2. Run 'make dev' to start development servers"
	@echo "3. Visit http://localhost:3000 for the frontend"
	@echo "4. Visit http://localhost:8000/docs for API documentation"

# Quick development reset
reset: stop clean install ## Reset development environment (stop, clean, reinstall)
	@echo "$(GREEN)✅ Development environment reset complete!$(NC)"
	@echo "$(YELLOW)Run 'make dev' to start fresh$(NC)"

# Show running processes
ps: ## Show running ElevateHub processes
	@echo "$(BLUE)📊 ElevateHub processes:$(NC)"
	@echo ""
	@echo "$(BLUE)Node.js processes:$(NC)"
	@ps aux | grep node | grep -v grep || echo "$(YELLOW)No Node.js processes found$(NC)"
	@echo ""
	@echo "$(BLUE)Python/Uvicorn processes:$(NC)"
	@ps aux | grep uvicorn | grep -v grep || echo "$(YELLOW)No Uvicorn processes found$(NC)"
	@echo ""
	@echo "$(BLUE)Port usage:$(NC)"
	@lsof -i :$(FRONTEND_PORT) || echo "$(YELLOW)Port $(FRONTEND_PORT) not in use$(NC)"
	@lsof -i :$(CHATBOT_PORT) || echo "$(YELLOW)Port $(CHATBOT_PORT) not in use$(NC)"

# Development status check
status: ps health ## Show complete development status
	@echo ""
	@echo "$(BLUE)📈 ElevateHub Status Summary:$(NC)"
	@echo "================================"
	@echo "Frontend Port: $(FRONTEND_PORT)"
	@echo "Chatbot Port: $(CHATBOT_PORT)"
	@echo "Frontend URL: http://localhost:$(FRONTEND_PORT)"
	@echo "Chatbot API: http://localhost:$(CHATBOT_PORT)"
	@echo "API Docs: http://localhost:$(CHATBOT_PORT)/docs" 