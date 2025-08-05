'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  User,
  Clock,
  Check,
  CheckCheck,
  Lightbulb,
  Code,
  HelpCircle,
  BookOpen,
  Settings,
  Trash2,
  Copy,
  RefreshCw,
  Zap,
  Star,
  MessageSquare,
  FileText,
  Shield,
  Globe
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
  type?: 'text' | 'code' | 'suggestion'
  metadata?: {
    category?: string
    helpful?: boolean
    source?: string
  }
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  prompt: string
  category: string
}

const quickActions: QuickAction[] = [
  {
    id: 'onboarding-help',
    label: 'Onboarding Help',
    icon: <BookOpen className="w-4 h-4" />,
    prompt: 'I need help with my onboarding process. Can you guide me through the next steps?',
    category: 'onboarding'
  },
  {
    id: 'insurance-basics',
    label: 'Insurance Basics',
    icon: <Shield className="w-4 h-4" />,
    prompt: 'Can you explain the basic concepts of the insurance industry that I need to know for this project?',
    category: 'domain'
  },
  {
    id: 'coding-standards',
    label: 'Coding Standards',
    icon: <Code className="w-4 h-4" />,
    prompt: 'What are the coding standards and best practices I should follow for this project?',
    category: 'technical'
  },
  {
    id: 'team-info',
    label: 'Team Information',
    icon: <User className="w-4 h-4" />,
    prompt: 'Tell me about my team members and who I should contact for different types of questions.',
    category: 'team'
  },
  {
    id: 'tools-setup',
    label: 'Tools & Setup',
    icon: <Settings className="w-4 h-4" />,
    prompt: 'What tools do I need to install and how should I set up my development environment?',
    category: 'tools'
  },
  {
    id: 'project-overview',
    label: 'Project Overview',
    icon: <FileText className="w-4 h-4" />,
    prompt: 'Give me an overview of the Insurance project - what are the main goals and my role?',
    category: 'project'
  }
]

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your ElevateHub AI assistant. I\'m here to help you with your onboarding journey, answer questions about the Insurance project, provide coding guidance, and assist with any challenges you might face. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 5000),
    status: 'delivered',
    metadata: {
      category: 'greeting'
    }
  }
]

export default function AskBotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [sessionId, setSessionId] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check backend connection on mount
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      setIsOnline(response.ok)
    } catch (error) {
      setIsOnline(false)
    }
  }

  const useSuggestion = (suggestion: string) => {
    setInputMessage(suggestion)
    setSuggestions([])
    inputRef.current?.focus()
  }

  const generateBotResponse = (userMessage: string): string => {
    // Simulate bot responses based on keywords
    const message = userMessage.toLowerCase()
    
    if (message.includes('onboarding') || message.includes('start')) {
      return "Great! Let me help you with your onboarding. You're currently in Phase 3 of 6 - learning about the company and department. I recommend starting with the company overview game and then reviewing the Insurance project documentation. Would you like me to guide you through any specific area?"
    } else if (message.includes('insurance') || message.includes('domain')) {
      return "The Insurance project focuses on digital transformation of policy management systems. Key concepts you should understand include: Policy Lifecycle Management, Claims Processing, Regulatory Compliance (Solvency II), and Customer Risk Assessment. I can provide detailed explanations for any of these areas. What would you like to learn about first?"
    } else if (message.includes('team') || message.includes('contact')) {
      return "Your team structure includes: Sarin (Technical Director) for strategic decisions, Raja (Engineering Manager) for day-to-day development, Asad (Lead Developer) for technical guidance, and Favour (Business Analyst/Scrum Master) for requirements and process questions. For urgent issues, start with your immediate team lead. Need contact details for anyone specific?"
    } else if (message.includes('code') || message.includes('standards')) {
      return "Our coding standards include: TypeScript for type safety, React with functional components, Tailwind CSS for styling, ESLint/Prettier for code formatting, and Git workflow with feature branches. We follow clean code principles and require code reviews. Would you like me to explain any specific standard or set up your development environment?"
    } else if (message.includes('tools') || message.includes('setup')) {
      return "For the Insurance project, you'll need: Salesforce DevOps, Postman Enterprise for API testing, Security Scanner Pro, and Tableau Desktop for analytics. I can see some tools are still pending installation. Would you like me to help prioritize which tools to install first or guide you through the setup process?"
    } else if (message.includes('help') || message.includes('stuck')) {
      return "I'm here to help! Please describe the specific challenge you're facing, and I'll provide step-by-step guidance. Whether it's technical issues, project questions, or onboarding tasks, I can assist with detailed explanations and point you to the right resources or team members."
    } else {
      return "I understand your question about '" + userMessage + "'. Let me provide some guidance on that. Based on your current onboarding phase and project requirements, I recommend checking the relevant documentation in your learning modules. Would you like me to be more specific about any particular aspect?"
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage('')
    setIsTyping(true)
    setShowQuickActions(false)

    // Mark user message as sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      )
    }, 500)

    try {
      // Call chatbot backend API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          user_id: 'current-user', // In production, use actual user ID
          session_id: sessionId || undefined,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setIsOnline(true)
        
        // Update session ID
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id)
        }

        const botResponse: Message = {
          id: data.message.id,
          content: data.message.content,
          sender: 'bot',
          timestamp: new Date(data.message.timestamp),
          status: 'delivered',
          metadata: {
            category: data.intent || 'response',
            source: 'api'
          }
        }

        setMessages(prev => [...prev, botResponse])
        
        // Add suggestions if available
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions.slice(0, 3)) // Limit to 3 suggestions
        }
      } else {
        throw new Error('Backend API response not ok')
      }
    } catch (error) {
      console.error('Error connecting to chatbot API:', error)
      setIsOnline(false)
      
      // Fallback to local response generation
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(currentInput),
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered',
        metadata: {
          category: 'fallback',
          source: 'local'
        }
      }

      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const sendQuickAction = async (action: QuickAction) => {
    setShowQuickActions(false)
    setIsTyping(true)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: action.prompt,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      metadata: {
        category: action.category,
        source: 'quick_action'
      }
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // Call chatbot backend API for quick actions
      const response = await fetch('http://localhost:8000/chat/quick-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action_id: action.id,
          user_id: 'current-user',
          session_id: sessionId || undefined,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setIsOnline(true)
        
        // Update session ID
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id)
        }

        const botResponse: Message = {
          id: data.message.id,
          content: data.message.content,
          sender: 'bot',
          timestamp: new Date(data.message.timestamp),
          status: 'delivered',
          metadata: {
            category: data.intent || action.category,
            source: 'quick_action_api'
          }
        }

        setMessages(prev => [...prev, botResponse])
        
        // Add suggestions if available
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions.slice(0, 3))
        }
      } else {
        throw new Error('Backend API response not ok')
      }
    } catch (error) {
      console.error('Error with quick action API:', error)
      setIsOnline(false)
      
      // Fallback to local response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(action.prompt),
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered',
        metadata: {
          category: action.category,
          source: 'quick_action_local'
        }
      }

      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages(initialMessages)
    setShowQuickActions(true)
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-blue-400" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-green-400" />
      default:
        return null
    }
  }

  const categories = [
    { id: 'all', label: 'All Topics', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'onboarding', label: 'Onboarding', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical', icon: <Code className="w-4 h-4" /> },
    { id: 'domain', label: 'Insurance Domain', icon: <Shield className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <User className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Settings className="w-4 h-4" /> },
    { id: 'project', label: 'Project', icon: <FileText className="w-4 h-4" /> }
  ]

  const filteredQuickActions = selectedCategory === 'all' 
    ? quickActions 
    : quickActions.filter(action => action.category === selectedCategory)

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold mb-1">Ask the Bot</h1>
              <p className="text-gray-400">Your AI assistant for onboarding and project guidance</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm text-gray-400">
                {isOnline ? 'AI Connected' : 'Offline Mode'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Assistant Online</span>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Quick Actions Sidebar */}
        <div className="w-80 bg-gray-800/30 border-r border-gray-800 p-6 overflow-y-auto">
          <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
          
          {/* Category Filter */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-3">
            {filteredQuickActions.map(action => (
              <button
                key={action.id}
                onClick={() => sendQuickAction(action)}
                className="w-full p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-600/30 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    {action.icon}
                  </div>
                  <span className="text-white font-medium text-sm">{action.label}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {action.prompt.substring(0, 80)}...
                </p>
              </button>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Pro Tips</span>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Be specific about your questions</li>
              <li>• Mention your current task or challenge</li>
              <li>• Ask for step-by-step guidance</li>
              <li>• Request code examples when needed</li>
            </ul>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-2xl ${message.sender === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-800/50 text-gray-100 border border-gray-700/50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  
                  <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-400 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.sender === 'user' && getStatusIcon(message.status)}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800/50 text-gray-100 border border-gray-700/50 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Overlay (when no messages) */}
          {showQuickActions && messages.length <= 1 && (
            <div className="px-6 pb-4">
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Start Options
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.slice(0, 4).map(action => (
                    <button
                      key={action.id}
                      onClick={() => sendQuickAction(action)}
                      className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-600/30 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {action.icon}
                        <span className="text-white font-medium text-sm">{action.label}</span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {action.prompt.substring(0, 60)}...
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-800 bg-gray-800/30">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300 font-medium">AI Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => useSuggestion(suggestion)}
                    className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything about your onboarding, project, or technical questions..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <Smile className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              Press Enter to send • Ask anything about onboarding, technical help, or project guidance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 