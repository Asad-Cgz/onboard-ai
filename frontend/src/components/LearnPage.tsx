'use client'

import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { getProjectData } from '@/data/projectData'
import { 
  Play, 
  FileText, 
  BookOpen, 
  Monitor, 
  Users, 
  Clock, 
  CheckCircle, 
  Star, 
  Download, 
  ExternalLink,
  PlayCircle,
  PauseCircle,
  Award,
  TrendingUp,
  Target,
  Plus,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  Code,
  Database,
  Globe,
  Shield,
  Volume2,
  Gamepad2,
  Trophy,
  Zap,
  Headphones,
  Mic
} from 'lucide-react'

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState<'project' | 'self'>('project')
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'video' | 'document' | 'interactive'>('all')

  // Project Assigned Learning Data
  const projectLearningPaths = [
    {
      id: 'system-setup',
      title: 'System & Application Setup',
      description: 'Learn to set up all required systems and applications for your project',
      category: 'Technical Setup',
      totalModules: 8,
      completedModules: 3,
      estimatedTime: '4 hours',
      difficulty: 'Beginner',
      modules: [
        {
          id: 'docker-setup',
          title: 'Docker Installation & Configuration',
          type: 'video',
          duration: '25 min',
          completed: true,
          resources: [
            { type: 'video', title: 'Docker Setup Walkthrough', url: '#', duration: '25 min' },
            { type: 'document', title: 'Docker Configuration Guide', url: '#', pages: 12 },
            { type: 'document', title: 'Troubleshooting Common Issues', url: '#', pages: 8 }
          ]
        },
        {
          id: 'nodejs-env',
          title: 'Node.js Environment Setup',
          type: 'video',
          duration: '20 min',
          completed: true,
          resources: [
            { type: 'video', title: 'Node.js Installation Guide', url: '#', duration: '20 min' },
            { type: 'document', title: 'Environment Variables Setup', url: '#', pages: 6 }
          ]
        },
        {
          id: 'database-config',
          title: 'Database Configuration (PostgreSQL)',
          type: 'interactive',
          duration: '35 min',
          completed: true,
          resources: [
            { type: 'video', title: 'PostgreSQL Setup Tutorial', url: '#', duration: '30 min' },
            { type: 'interactive', title: 'Database Connection Lab', url: '#', duration: '35 min' },
            { type: 'document', title: 'SQL Quick Reference', url: '#', pages: 15 }
          ]
        },
        {
          id: 'api-tools',
          title: 'API Development Tools',
          type: 'video',
          duration: '30 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Postman & Thunder Client Setup', url: '#', duration: '25 min' },
            { type: 'document', title: 'API Testing Best Practices', url: '#', pages: 10 }
          ]
        }
      ]
    },
    {
      id: 'insurance-domain',
      title: 'Insurance Domain Knowledge',
      description: 'Comprehensive understanding of insurance industry and client requirements',
      category: 'Domain Knowledge',
      totalModules: 6,
      completedModules: 1,
      estimatedTime: '6 hours',
      difficulty: 'Intermediate',
      modules: [
        {
          id: 'insurance-basics',
          title: 'Insurance Industry Overview',
          type: 'video',
          duration: '45 min',
          completed: true,
          resources: [
            { type: 'video', title: 'Insurance Fundamentals', url: '#', duration: '45 min' },
            { type: 'document', title: 'Industry Terminology Guide', url: '#', pages: 25 },
            { type: 'document', title: 'Market Analysis Report', url: '#', pages: 18 }
          ]
        },
        {
          id: 'claims-processing',
          title: 'Claims Processing Workflow',
          type: 'interactive',
          duration: '60 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Claims Lifecycle Explained', url: '#', duration: '35 min' },
            { type: 'interactive', title: 'Claims Processing Simulation', url: '#', duration: '60 min' },
            { type: 'document', title: 'Claims Processing Manual', url: '#', pages: 32 }
          ]
        }
      ]
    },
    {
      id: 'client-specific',
      title: 'Client Project Requirements',
      description: 'Specific requirements and guidelines for the current insurance client project',
      category: 'Project Context',
      totalModules: 4,
      completedModules: 0,
      estimatedTime: '4 hours',
      difficulty: 'Advanced',
      modules: [
        {
          id: 'client-overview',
          title: 'Client Company Overview',
          type: 'document',
          duration: '30 min',
          completed: false,
          resources: [
            { type: 'document', title: 'Client Profile & History', url: '#', pages: 20 },
            { type: 'document', title: 'Organizational Structure', url: '#', pages: 8 }
          ]
        },
        {
          id: 'project-requirements',
          title: 'Project Specifications & Requirements',
          type: 'document',
          duration: '90 min',
          completed: false,
          resources: [
            { type: 'document', title: 'Technical Requirements Document', url: '#', pages: 45 },
            { type: 'document', title: 'Business Requirements', url: '#', pages: 28 },
            { type: 'video', title: 'Requirements Walkthrough', url: '#', duration: '40 min' }
          ]
        },
        {
          id: 'compliance-standards',
          title: 'Compliance & Security Standards',
          type: 'video',
          duration: '45 min',
          completed: false,
          resources: [
            { type: 'video', title: 'GDPR & Data Protection Overview', url: '#', duration: '25 min' },
            { type: 'video', title: 'PCI DSS Compliance Requirements', url: '#', duration: '20 min' },
            { type: 'document', title: 'Security Protocols Handbook', url: '#', pages: 35 }
          ]
        },
        {
          id: 'project-timeline',
          title: 'Project Timeline & Milestones',
          type: 'interactive',
          duration: '30 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'Project Timeline Interactive', url: '#', duration: '30 min' },
            { type: 'document', title: 'Sprint Planning Guide', url: '#', pages: 12 }
          ]
        }
      ]
    },
    {
      id: 'role-responsibilities',
      title: 'Role & Job Responsibilities',
      description: 'Understand your specific role, responsibilities, and expectations as a team member',
      category: 'Professional Development',
      totalModules: 5,
      completedModules: 0,
      estimatedTime: '4 hours',
      difficulty: 'Intermediate',
      modules: [
        {
          id: 'job-description',
          title: 'Job Description & Core Responsibilities',
          type: 'document',
          duration: '45 min',
          completed: false,
          resources: [
            { type: 'document', title: 'Senior Software Engineer - Job Description', url: '#', pages: 8 },
            { type: 'document', title: 'Role Expectations & KPIs', url: '#', pages: 6 },
            { type: 'video', title: 'Role Overview Discussion', url: '#', duration: '30 min' }
          ]
        },
        {
          id: 'team-structure',
          title: 'Team Structure & Reporting Lines',
          type: 'video',
          duration: '30 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Team Organization & Hierarchy', url: '#', duration: '20 min' },
            { type: 'document', title: 'Team Directory & Contact List', url: '#', pages: 4 },
            { type: 'interactive', title: 'Team Org Chart Explorer', url: '#', duration: '15 min' }
          ]
        },
        {
          id: 'daily-workflows',
          title: 'Daily Workflows & Processes',
          type: 'interactive',
          duration: '60 min',
          completed: false,
          resources: [
            { type: 'video', title: 'A Day in the Life - Senior Engineer', url: '#', duration: '35 min' },
            { type: 'interactive', title: 'Workflow Simulation', url: '#', duration: '45 min' },
            { type: 'document', title: 'Standard Operating Procedures', url: '#', pages: 18 }
          ]
        },
        {
          id: 'performance-metrics',
          title: 'Performance Metrics & Career Growth',
          type: 'video',
          duration: '40 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Performance Review Process', url: '#', duration: '25 min' },
            { type: 'document', title: 'Career Progression Framework', url: '#', pages: 15 },
            { type: 'document', title: 'Goal Setting Templates', url: '#', pages: 8 }
          ]
        },
        {
          id: 'collaboration-tools',
          title: 'Collaboration & Communication Tools',
          type: 'interactive',
          duration: '50 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Slack, Teams & Email Best Practices', url: '#', duration: '20 min' },
            { type: 'interactive', title: 'Communication Tools Lab', url: '#', duration: '30 min' },
            { type: 'document', title: 'Meeting Etiquette Guide', url: '#', pages: 6 }
          ]
        }
      ]
    },
    {
      id: 'systems-technology',
      title: 'Systems & Technology Stack',
      description: 'Master the systems, tools, and technologies you will be working with daily',
      category: 'Technical Systems',
      totalModules: 7,
      completedModules: 0,
      estimatedTime: '8 hours',
      difficulty: 'Advanced',
      modules: [
        {
          id: 'core-tech-stack',
          title: 'Core Technology Stack Overview',
          type: 'video',
          duration: '45 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Technology Architecture Overview', url: '#', duration: '35 min' },
            { type: 'document', title: 'Tech Stack Documentation', url: '#', pages: 22 },
            { type: 'interactive', title: 'Architecture Diagram Explorer', url: '#', duration: '25 min' }
          ]
        },
        {
          id: 'backend-systems',
          title: 'Backend Systems (Java Spring Boot)',
          type: 'interactive',
          duration: '90 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Spring Boot Application Overview', url: '#', duration: '50 min' },
            { type: 'interactive', title: 'Backend Code Exploration Lab', url: '#', duration: '75 min' },
            { type: 'document', title: 'API Documentation', url: '#', pages: 40 }
          ]
        },
        {
          id: 'frontend-systems',
          title: 'Frontend Systems (React/Angular)',
          type: 'interactive',
          duration: '80 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Frontend Application Walkthrough', url: '#', duration: '45 min' },
            { type: 'interactive', title: 'UI Components Deep Dive', url: '#', duration: '60 min' },
            { type: 'document', title: 'Frontend Style Guide', url: '#', pages: 25 }
          ]
        },
        {
          id: 'database-systems',
          title: 'Database Systems & Data Management',
          type: 'interactive',
          duration: '70 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Database Schema Overview', url: '#', duration: '30 min' },
            { type: 'interactive', title: 'Database Query Practice Lab', url: '#', duration: '60 min' },
            { type: 'document', title: 'Data Model Documentation', url: '#', pages: 32 }
          ]
        },
        {
          id: 'integration-apis',
          title: 'Third-Party Integrations & APIs',
          type: 'video',
          duration: '55 min',
          completed: false,
          resources: [
            { type: 'video', title: 'External API Integrations', url: '#', duration: '40 min' },
            { type: 'document', title: 'Integration Specifications', url: '#', pages: 18 },
            { type: 'interactive', title: 'API Testing Workshop', url: '#', duration: '45 min' }
          ]
        },
        {
          id: 'monitoring-logging',
          title: 'Monitoring & Logging Systems',
          type: 'video',
          duration: '40 min',
          completed: false,
          resources: [
            { type: 'video', title: 'Application Monitoring Setup', url: '#', duration: '25 min' },
            { type: 'video', title: 'Log Analysis & Debugging', url: '#', duration: '30 min' },
            { type: 'document', title: 'Monitoring Best Practices', url: '#', pages: 14 }
          ]
        },
        {
          id: 'deployment-cicd',
          title: 'Deployment & CI/CD Pipelines',
          type: 'interactive',
          duration: '85 min',
          completed: false,
          resources: [
            { type: 'video', title: 'CI/CD Pipeline Overview', url: '#', duration: '35 min' },
            { type: 'interactive', title: 'Deployment Process Simulation', url: '#', duration: '60 min' },
            { type: 'document', title: 'Deployment Runbook', url: '#', pages: 20 }
          ]
        }
      ]
    },
    {
      id: 'practical-exercises',
      title: 'Practical Exercises & Mock Tickets',
      description: 'Hands-on practice with realistic tickets and scenarios to demonstrate your understanding',
      category: 'Practical Application',
      totalModules: 6,
      completedModules: 0,
      estimatedTime: '10 hours',
      difficulty: 'Advanced',
      modules: [
        {
          id: 'ticket-system-intro',
          title: 'Ticket System & Workflow Introduction',
          type: 'video',
          duration: '30 min',
          completed: false,
          resources: [
            { type: 'video', title: 'JIRA Workflow Overview', url: '#', duration: '25 min' },
            { type: 'document', title: 'Ticket Management Guidelines', url: '#', pages: 12 },
            { type: 'interactive', title: 'JIRA Navigation Lab', url: '#', duration: '20 min' }
          ]
        },
        {
          id: 'bug-fix-practice',
          title: 'Practice Ticket: Bug Fix (Critical)',
          type: 'interactive',
          duration: '120 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'Mock Bug Investigation & Fix', url: '#', duration: '90 min' },
            { type: 'document', title: 'Bug Report: Payment Processing Error', url: '#', pages: 6 },
            { type: 'video', title: 'Debugging Techniques Walkthrough', url: '#', duration: '30 min' },
            { type: 'document', title: 'Solution Review Template', url: '#', pages: 4 }
          ]
        },
        {
          id: 'feature-development',
          title: 'Practice Ticket: New Feature Development',
          type: 'interactive',
          duration: '180 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'Feature Development Simulation', url: '#', duration: '150 min' },
            { type: 'document', title: 'Feature Request: Claims Auto-Approval', url: '#', pages: 8 },
            { type: 'video', title: 'Feature Planning & Design Session', url: '#', duration: '45 min' },
            { type: 'document', title: 'Code Review Checklist', url: '#', pages: 5 }
          ]
        },
        {
          id: 'performance-optimization',
          title: 'Practice Ticket: Performance Optimization',
          type: 'interactive',
          duration: '150 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'Performance Analysis & Optimization Lab', url: '#', duration: '120 min' },
            { type: 'document', title: 'Performance Issue Report', url: '#', pages: 10 },
            { type: 'video', title: 'Profiling Tools & Techniques', url: '#', duration: '40 min' }
          ]
        },
        {
          id: 'integration-ticket',
          title: 'Practice Ticket: Third-Party Integration',
          type: 'interactive',
          duration: '200 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'API Integration Challenge', url: '#', duration: '180 min' },
            { type: 'document', title: 'Integration Requirements: MVR Database', url: '#', pages: 15 },
            { type: 'video', title: 'Integration Best Practices', url: '#', duration: '35 min' },
            { type: 'document', title: 'Testing Strategy Guide', url: '#', pages: 8 }
          ]
        },
        {
          id: 'final-assessment',
          title: 'Final Assessment: Complex Multi-System Ticket',
          type: 'interactive',
          duration: '240 min',
          completed: false,
          resources: [
            { type: 'interactive', title: 'Comprehensive System Integration Challenge', url: '#', duration: '210 min' },
            { type: 'document', title: 'Assessment Brief: Claims Processing Enhancement', url: '#', pages: 20 },
            { type: 'video', title: 'Assessment Guidelines & Expectations', url: '#', duration: '25 min' },
            { type: 'document', title: 'Self-Evaluation Rubric', url: '#', pages: 6 }
          ]
        }
      ]
    }
  ]

  // Self Assigned Learning Data
  const selfLearningPaths = [
    {
      id: 'react-advanced',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and design patterns',
      category: 'Frontend Development',
      totalModules: 12,
      completedModules: 8,
      estimatedTime: '15 hours',
      difficulty: 'Advanced',
      priority: 'High',
      deadline: '2024-12-31'
    },
    {
      id: 'microservices',
      title: 'Microservices Architecture',
      description: 'Learn to design and implement microservices-based systems',
      category: 'Backend Development',
      totalModules: 10,
      completedModules: 3,
      estimatedTime: '20 hours',
      difficulty: 'Advanced',
      priority: 'Medium',
      deadline: '2025-01-15'
    },
    {
      id: 'leadership',
      title: 'Technical Leadership Skills',
      description: 'Develop leadership and team management capabilities',
      category: 'Soft Skills',
      totalModules: 8,
      completedModules: 2,
      estimatedTime: '12 hours',
      difficulty: 'Intermediate',
      priority: 'High',
      deadline: '2024-11-30'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4 text-red-500" />
      case 'document': return <FileText className="w-4 h-4 text-blue-500" />
      case 'interactive': return <Monitor className="w-4 h-4 text-green-500" />
      default: return <BookOpen className="w-4 h-4 text-gray-500" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getResourceIcon = (resource: any) => {
    if (resource.title.includes('Game') || resource.title.includes('Interactive') || resource.title.includes('Quiz') || resource.title.includes('Simulation')) {
      return <Gamepad2 className="w-4 h-4 text-purple-400" />
    }
    if (resource.title.includes('Audio') || resource.title.includes('Podcast') || resource.title.includes('Rap') || resource.title.includes('Anthem')) {
      return <Headphones className="w-4 h-4 text-green-400" />
    }
    if (resource.title.includes('Video') || resource.title.includes('Documentary') || resource.title.includes('Interview')) {
      return <PlayCircle className="w-4 h-4 text-blue-400" />
    }
    if (resource.type === 'interactive') {
      return <Zap className="w-4 h-4 text-yellow-400" />
    }
    if (resource.type === 'video') {
      return <Play className="w-4 h-4 text-red-400" />
    }
    return <FileText className="w-4 h-4 text-gray-400" />
  }

  const getGamifiedBadge = (title: string) => {
    if (title.includes('🎮') || title.includes('Game') || title.includes('Adventure')) {
      return <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
        <Gamepad2 className="w-3 h-3" />
        <span>Interactive Game</span>
      </div>
    }
    if (title.includes('🎯') || title.includes('Quiz') || title.includes('Challenge') || title.includes('Championship')) {
      return <div className="flex items-center space-x-1 bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-xs">
        <Trophy className="w-3 h-3" />
        <span>Quiz Challenge</span>
      </div>
    }
    if (title.includes('🎬') || title.includes('🎵') || title.includes('Video') || title.includes('Audio')) {
      return <div className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
        <Volume2 className="w-3 h-3" />
        <span>Audio/Video</span>
      </div>
    }
    return null
  }

  const { selectedProjectId, selectedProjectName } = useProject()
  const projectData = getProjectData(selectedProjectId)
  
  // Use project-specific learning data or fallback to default data
  const currentProjectPaths = projectData?.learning.projectPaths || projectLearningPaths
  const currentSelfPaths = projectData?.learning.selfPaths || selfLearningPaths

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderProjectLearning = () => (
    <div className="space-y-8">
      {/* Learning Paths Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Learning Paths</p>
              <p className="text-2xl font-bold">{projectLearningPaths.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed Modules</p>
              <p className="text-2xl font-bold">
                {projectLearningPaths.reduce((acc, path) => acc + path.completedModules, 0)}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Hours</p>
              <p className="text-2xl font-bold">29h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-y-6">
        {currentProjectPaths.map((path) => (
          <div key={path.id} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{path.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{path.completedModules}/{path.totalModules} modules</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.estimatedTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{path.category}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                  className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className={`w-5 h-5 transform transition-transform ${expandedPath === path.id ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((path.completedModules / path.totalModules) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(path.completedModules / path.totalModules) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Expanded Modules */}
              {expandedPath === path.id && (
                <div className="border-t border-slate-700 pt-6 space-y-4">
                  {path.modules.map((module) => (
                    <div key={module.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {module.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                          )}
                          <div className="flex flex-col">
                            <h4 className="font-medium text-white">{module.title}</h4>
                            {getGamifiedBadge(module.title) && (
                              <div className="mt-1">{getGamifiedBadge(module.title)}</div>
                            )}
                          </div>
                          {getTypeIcon(module.type)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-400">{module.duration}</span>
                          {!module.completed && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                              Start
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Module Resources */}
                      <div className="grid gap-3">
                        {module.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between bg-slate-600 rounded-md p-3">
                            <div className="flex items-center space-x-3">
                              {getResourceIcon(resource)}
                              <span className="text-white text-sm">{resource.title}</span>
                              <span className="text-xs text-gray-400">
                                {resource.duration && `${resource.duration}`}
                                {resource.pages && `${resource.pages} pages`}
                              </span>
                            </div>
                            <button className="text-blue-400 hover:text-blue-300 p-1 rounded">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSelfLearning = () => (
    <div className="space-y-8">
      {/* Self Learning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Active Paths</p>
              <p className="text-2xl font-bold">{selfLearningPaths.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold">72%</p>
            </div>
            <Award className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">High Priority</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <Star className="w-8 h-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Hours</p>
              <p className="text-2xl font-bold">47h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Add New Learning Path */}
      <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Add New Learning Path</h3>
        <p className="text-gray-400 mb-4">Create a custom learning path based on your career goals</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
          Create Learning Path
        </button>
      </div>

      {/* Self Learning Paths */}
      <div className="grid gap-6">
        {currentSelfPaths.map((path) => (
          <div key={path.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {path.category}
                  </span>
                </div>
                <p className="text-gray-400 mb-3">{path.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{path.completedModules}/{path.totalModules} modules</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.estimatedTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{path.totalModules} modules</span>
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Continue
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round((path.completedModules / path.totalModules) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(path.completedModules / path.totalModules) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{path.category}</span>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-white p-1 rounded">
                  <Star className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white p-1 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900 px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Learn
              {selectedProjectName && (
                <span className="text-blue-400 text-xl ml-3 font-normal">
                  - {selectedProjectName}
                </span>
              )}
            </h1>
            <p className="text-gray-400">
              {projectData 
                ? `Learn skills and concepts for ${projectData.dashboard.projectSpecific.name}` 
                : 'Enhance your skills with project and self-directed learning paths'
              }
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search learning content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-8 mb-8">
        <div className="bg-slate-800 rounded-lg p-1">
          <div className="flex">
            <button
              onClick={() => setActiveTab('project')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all rounded-md flex-1 justify-center ${
                activeTab === 'project'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Project Assigned</span>
            </button>
            <button
              onClick={() => setActiveTab('self')}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all rounded-md flex-1 justify-center ${
                activeTab === 'self'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Self Assigned</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 pb-8">
        {activeTab === 'project' ? renderProjectLearning() : renderSelfLearning()}
      </div>
    </div>
  )
}

export default LearnPage 