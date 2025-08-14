'use client'

import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { 
  FolderOpen, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Pause,
  MoreVertical,
  ExternalLink,
  Target,
  BarChart3,
  FileText,
  MessageSquare,
  Star,
  Award,
  Building2,
  MapPin,
  Briefcase,
  Timer,
  DollarSign,
  Calendar as CalendarIcon,
  Activity,
  Filter,
  Search,
  Plus
} from 'lucide-react'

type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'planning'
type ProjectPriority = 'high' | 'medium' | 'low'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email?: string
}

interface Project {
  id: string
  name: string
  client: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  startDate: string
  endDate: string
  currentDate?: string
  requiredHours: number
  loggedHours: number
  progressPercentage: number
  projectLead: TeamMember
  teamMembers: TeamMember[]
  technologies: string[]
  budget?: number
  milestones: {
    name: string
    date: string
    completed: boolean
  }[]
  recentActivity: {
    action: string
    date: string
    user: string
  }[]
  color: string
}

const currentProjects: Project[] = [
  {
    id: 'insurance-2024',
    name: 'Insurance Digital Platform',
    client: 'Global Insurance Corp',
    description: 'Modernizing legacy insurance systems with digital-first approach, including policy management, claims processing, and customer portal.',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-08-30',
    currentDate: '2024-02-05',
    requiredHours: 320,
    loggedHours: 45,
    progressPercentage: 35,
    projectLead: {
      id: 'sarin',
      name: 'Sarin',
      role: 'Technical Director',
      avatar: '👨🏽‍💼',
      email: 'sarin@cognizant.com'
    },
    teamMembers: [
      { id: 'raja', name: 'Raja', role: 'Engineering Manager', avatar: '👨🏽' },
      { id: 'asad', name: 'Asad', role: 'Lead Developer', avatar: '👨🏻‍💻' },
      { id: 'maya', name: 'Maya', role: 'QA Engineer', avatar: '👩🏽‍💻' },
      { id: 'sam', name: 'Sam', role: 'Senior Developer', avatar: '👨🏽‍💻' },
      { id: 'anjana', name: 'Anjana', role: 'QA Lead', avatar: '👩🏽‍💼' }
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Salesforce', 'PostgreSQL'],
    budget: 450000,
    milestones: [
      { name: 'Requirements Analysis', date: '2024-02-01', completed: true },
      { name: 'System Architecture', date: '2024-02-15', completed: true },
      { name: 'UI/UX Design', date: '2024-03-01', completed: false },
      { name: 'Backend Development', date: '2024-04-15', completed: false },
      { name: 'Integration Testing', date: '2024-06-01', completed: false },
      { name: 'Production Deployment', date: '2024-08-15', completed: false }
    ],
    recentActivity: [
      { action: 'Updated requirements document', date: '2024-02-04', user: 'Favour' },
      { action: 'Completed API design review', date: '2024-02-03', user: 'Asad' },
      { action: 'Stakeholder presentation delivered', date: '2024-02-02', user: 'Sarin' }
    ],
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'fintech-2024',
    name: 'FinTech Payment Gateway',
    client: 'NextGen Financial',
    description: 'Building a secure, scalable payment processing system with real-time fraud detection and multi-currency support.',
    status: 'active',
    priority: 'medium',
    startDate: '2024-01-20',
    endDate: '2024-06-15',
    currentDate: '2024-02-05',
    requiredHours: 180,
    loggedHours: 28,
    progressPercentage: 22,
    projectLead: {
      id: 'dipankar',
      name: 'Dipankar',
      role: 'Solution Architect',
      avatar: '👨🏽‍💻',
      email: 'dipankar@cognizant.com'
    },
    teamMembers: [
      { id: 'mayank', name: 'Mayank', role: 'Frontend Developer', avatar: '👨🏻' },
      { id: 'sangeetha', name: 'Sangeetha', role: 'Full Stack Developer', avatar: '👩🏽‍💻' },
      { id: 'shreyshi', name: 'Shreyshi', role: 'Backend Developer', avatar: '👩🏻‍💻' }
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'MongoDB'],
    budget: 150000,
    milestones: [
      { name: 'Technical Specification', date: '2024-01-30', completed: true },
      { name: 'Mobile App Prototype', date: '2024-02-20', completed: false },
      { name: 'Security Implementation', date: '2024-03-15', completed: false },
      { name: 'Beta Testing', date: '2024-05-01', completed: false },
      { name: 'App Store Launch', date: '2024-06-10', completed: false }
    ],
    recentActivity: [
      { action: 'Mobile UI components completed', date: '2024-02-04', user: 'Mayank' },
      { action: 'Authentication API deployed', date: '2024-02-01', user: 'Shreyshi' }
    ],
    color: 'from-green-500 to-emerald-600'
  }
]

const previousProjects: Project[] = [
  {
    id: 'banking-legacy-2023',
    name: 'Banking System Migration',
    client: 'First National Bank',
    description: 'Migration of legacy banking systems to modern cloud-based architecture with enhanced security and performance.',
    status: 'completed',
    priority: 'high',
    startDate: '2023-03-01',
    endDate: '2023-12-15',
    requiredHours: 480,
    loggedHours: 485,
    progressPercentage: 100,
    projectLead: {
      id: 'former-lead',
      name: 'Michael Chen',
      role: 'Project Director',
      avatar: '👨🏻‍💼',
      email: 'michael.chen@cognizant.com'
    },
    teamMembers: [
      { id: 'jane-prev', name: 'Jane Smith', role: 'Sr. Manager', avatar: '👩🏼‍💼' },
      { id: 'john-prev', name: 'John Doe', role: 'Lead Developer', avatar: '👨🏼‍💻' }
    ],
    technologies: ['Java', 'Spring Boot', 'Oracle', 'AWS', 'Docker', 'Kubernetes'],
    budget: 400000,
    milestones: [
      { name: 'Legacy System Analysis', date: '2023-04-01', completed: true },
      { name: 'Data Migration Strategy', date: '2023-06-01', completed: true },
      { name: 'Core Banking Module', date: '2023-09-01', completed: true },
      { name: 'Security Audit', date: '2023-11-01', completed: true },
      { name: 'Go-Live', date: '2023-12-10', completed: true }
    ],
    recentActivity: [
      { action: 'Project successfully completed', date: '2023-12-15', user: 'Michael Chen' },
      { action: 'Final deliverables approved', date: '2023-12-10', user: 'Jane Smith' }
    ],
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'ecommerce-2023',
    name: 'E-commerce Platform',
    client: 'Retail Innovators Inc',
    description: 'Full-stack e-commerce platform with advanced analytics, inventory management, and customer experience optimization.',
    status: 'completed',
    priority: 'medium',
    startDate: '2023-01-10',
    endDate: '2023-08-30',
    requiredHours: 280,
    loggedHours: 275,
    progressPercentage: 100,
    projectLead: {
      id: 'sarah-lead',
      name: 'Sarah Johnson',
      role: 'Technical Lead',
      avatar: '👩🏼‍💻',
      email: 'sarah.johnson@cognizant.com'
    },
    teamMembers: [
      { id: 'alex-prev', name: 'Alex Kumar', role: 'Full Stack Developer', avatar: '👨🏽‍💻' },
      { id: 'lisa-prev', name: 'Lisa Wang', role: 'UI/UX Designer', avatar: '👩🏻‍🎨' }
    ],
    technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Redis', 'Stripe API'],
    budget: 180000,
    milestones: [
      { name: 'User Research & Design', date: '2023-02-15', completed: true },
      { name: 'Frontend Development', date: '2023-05-01', completed: true },
      { name: 'Payment Integration', date: '2023-06-15', completed: true },
      { name: 'Performance Optimization', date: '2023-08-01', completed: true },
      { name: 'Production Launch', date: '2023-08-25', completed: true }
    ],
    recentActivity: [
      { action: 'Platform launched successfully', date: '2023-08-30', user: 'Sarah Johnson' },
      { action: 'Performance metrics exceeded targets', date: '2023-08-25', user: 'Alex Kumar' }
    ],
    color: 'from-purple-500 to-violet-600'
  }
]

interface MyProjectPageProps {
  onNavigate?: (page: string) => void
}

export default function MyProjectPage({ onNavigate }: MyProjectPageProps) {
  const [selectedTab, setSelectedTab] = useState<'current' | 'previous'>('current')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | ProjectStatus>('all')
  const { setSelectedProject } = useProject()

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'on-hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'planning':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />
      case 'on-hold':
        return <Pause className="w-4 h-4" />
      case 'planning':
        return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: ProjectPriority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
    }
  }

  const calculateProjectDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const projects = selectedTab === 'current' ? currentProjects : previousProjects
  const filteredProjects = projects.filter(project => 
    (filterStatus === 'all' || project.status === filterStatus) &&
    (searchTerm === '' || project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.client.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">My Projects</h1>
            <p className="text-gray-400">Track your current and previous project assignments</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{currentProjects.length}</div>
              <div className="text-sm text-gray-400">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{previousProjects.length}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {currentProjects.reduce((sum, p) => sum + p.loggedHours, 0)}h
              </div>
              <div className="text-sm text-gray-400">Total Hours</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6 bg-gray-800/50 rounded-lg p-1">
          {[
            { id: 'current', label: 'Current Projects', count: currentProjects.length },
            { id: 'previous', label: 'Previous Projects', count: previousProjects.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="planning">Planning</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project.id, project.name)
                onNavigate?.('dashboard')
              }}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{project.client}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(project.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status}</span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`}></div>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-white text-sm font-medium">
                        {project.loggedHours}h / {project.requiredHours}h
                      </div>
                      <div className="text-gray-400 text-xs">Hours Logged</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-white text-sm font-medium">
                        {calculateProjectDays(project.startDate, project.endDate)} days
                      </div>
                      <div className="text-gray-400 text-xs">Total Duration</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-white text-sm font-medium">{project.projectLead.name}</div>
                      <div className="text-gray-400 text-xs">{project.projectLead.role}</div>
                    </div>
                  </div>
                  {project.status === 'active' && (
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-white text-sm font-medium">
                          {calculateRemainingDays(project.endDate)} days left
                        </div>
                        <div className="text-gray-400 text-xs">Until Deadline</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Project Progress</span>
                  <span className="text-sm font-medium text-white">{project.progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${project.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 4).map((member, index) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-gray-700 border-2 border-slate-900 flex items-center justify-center text-sm"
                        title={member.name}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    {project.teamMembers.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-slate-900 flex items-center justify-center text-xs text-white">
                        +{project.teamMembers.length - 4}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">{project.teamMembers.length} members</span>
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(project.startDate).toLocaleDateString("en-US")} - {new Date(project.endDate).toLocaleDateString("en-US")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 