'use client'

import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { getProjectData } from '@/data/projectData'
import { 
  Package, 
  Download, 
  Trash2, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Settings,
  Database,
  Code,
  Shield,
  Monitor,
  Briefcase,
  X,
  User,
  Calendar,
  Tag,
  Filter
} from 'lucide-react'

interface Tool {
  id: string
  name: string
  category: string
  project: string
  version: string
  status: 'installed' | 'pending' | 'requested' | 'available' | 'deprecated'
  description: string
  size: string
  installDate?: string
  lastUsed?: string
  icon: React.ReactNode
  required: boolean
  license: string
}

interface ProjectSection {
  id: string
  name: string
  color: string
  icon: React.ReactNode
  tools: Tool[]
}

const projectSections: ProjectSection[] = [
  {
    id: 'insurance',
    name: 'Insurance Project',
    color: 'from-blue-500 to-cyan-600',
    icon: <Briefcase className="w-6 h-6" />,
    tools: [
      {
        id: 'salesforce',
        name: 'Salesforce DevOps',
        category: 'CRM',
        project: 'Insurance Project',
        version: '2024.1',
        status: 'installed',
        description: 'Customer relationship management platform for insurance clients',
        size: '2.3 GB',
        installDate: '2024-01-15',
        lastUsed: '2 hours ago',
        icon: <Database className="w-5 h-5" />,
        required: true,
        license: 'Enterprise'
      },
      {
        id: 'postman',
        name: 'Postman Enterprise',
        category: 'API Testing',
        project: 'Insurance Project',
        version: '10.22.5',
        status: 'installed',
        description: 'API development and testing environment',
        size: '485 MB',
        installDate: '2024-01-15',
        lastUsed: '1 day ago',
        icon: <Code className="w-5 h-5" />,
        required: true,
        license: 'Team'
      },
      {
        id: 'security-scanner',
        name: 'Security Scanner Pro',
        category: 'Security',
        project: 'Insurance Project',
        version: '3.8.2',
        status: 'pending',
        description: 'Advanced security scanning for insurance applications',
        size: '1.2 GB',
        icon: <Shield className="w-5 h-5" />,
        required: true,
        license: 'Enterprise'
      },
      {
        id: 'tableau',
        name: 'Tableau Desktop',
        category: 'Analytics',
        project: 'Insurance Project',
        version: '2024.1.2',
        status: 'requested',
        description: 'Data visualization and business intelligence',
        size: '1.8 GB',
        icon: <Monitor className="w-5 h-5" />,
        required: false,
        license: 'Professional'
      }
    ]
  }
]

const previousProjectTools: Tool[] = [
  {
    id: 'legacy-db',
    name: 'Legacy Database Client',
    category: 'Database',
    project: 'Banking Project',
    version: '8.1.4',
    status: 'deprecated',
    description: 'Old database client no longer needed',
    size: '3.2 GB',
    installDate: '2023-08-10',
    lastUsed: '3 months ago',
    icon: <Database className="w-5 h-5" />,
    required: false,
    license: 'Legacy'
  },
  {
    id: 'old-monitoring',
    name: 'Legacy Monitoring Tool',
    category: 'Monitoring',
    project: 'Banking Project',
    version: '2.4.1',
    status: 'deprecated',
    description: 'Replaced by new monitoring solution',
    size: '856 MB',
    installDate: '2023-09-15',
    lastUsed: '2 months ago',
    icon: <Monitor className="w-5 h-5" />,
    required: false,
    license: 'Basic'
  },
  {
    id: 'outdated-sdk',
    name: 'Outdated API SDK',
    category: 'Development',
    project: 'Banking Project',
    version: '1.2.3',
    status: 'deprecated',
    description: 'Legacy SDK no longer supported',
    size: '245 MB',
    installDate: '2023-07-20',
    lastUsed: '4 months ago',
    icon: <Code className="w-5 h-5" />,
    required: false,
    license: 'Open Source'
  }
]

const availableTools: Tool[] = [
  {
    id: 'docker-desktop',
    name: 'Docker Desktop',
    category: 'Development',
    project: 'General',
    version: '4.27.2',
    status: 'available',
    description: 'Containerization platform for development',
    size: '684 MB',
    icon: <Package className="w-5 h-5" />,
    required: false,
    license: 'Free'
  },
  {
    id: 'jenkins',
    name: 'Jenkins CI/CD',
    category: 'DevOps',
    project: 'General',
    version: '2.440.1',
    status: 'available',
    description: 'Continuous integration and deployment',
    size: '92 MB',
    icon: <Settings className="w-5 h-5" />,
    required: false,
    license: 'Open Source'
  }
]

export default function ToolsPage() {
  const [selectedTab, setSelectedTab] = useState<'current' | 'offload' | 'request'>('current')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [showRequestModal, setShowRequestModal] = useState(false)

  const { selectedProjectId, selectedProjectName } = useProject()
  const projectData = getProjectData(selectedProjectId)
  
  // Use project-specific tools data or fallback to default data
  const currentProjectTools = projectData?.tools.currentTools || projectSections[0]?.tools || []
  const recommendedTools = projectData?.tools.recommendedTools || availableTools
  const deprecatedTools = projectData?.tools.deprecatedTools || previousProjectTools

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'installed':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'requested':
        return <AlertCircle className="w-4 h-4 text-blue-400" />
      case 'deprecated':
        return <Trash2 className="w-4 h-4 text-red-400" />
      default:
        return <Package className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'installed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'requested':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'deprecated':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const handleToolSelect = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const categories = ['all', 'CRM', 'API Testing', 'Security', 'Analytics', 'Database', 'Development', 'DevOps', 'Monitoring']

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Tools & Apps Management
              {selectedProjectName && (
                <span className="text-blue-400 text-xl ml-3 font-normal">
                  - {selectedProjectName}
                </span>
              )}
            </h1>
            <p className="text-gray-400">
              {projectData 
                ? `Manage tools and applications for ${projectData.dashboard.projectSpecific.name}` 
                : 'Manage project-specific tools, requests, and offloading'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowRequestModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Request Tool</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6 bg-gray-800/50 rounded-lg p-1">
          {[
            { id: 'current', label: 'Current Project Tools', count: currentProjectTools.length },
            { id: 'offload', label: 'Tools to Offload', count: deprecatedTools.length },
            { id: 'request', label: 'Available Tools', count: recommendedTools.length }
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
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === 'current' && (
          <div className="space-y-8">
            <div className="space-y-6">
                {/* Project Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-bold">
                      {selectedProjectName || 'Current Project Tools'}
                    </h2>
                    <p className="text-gray-400">Required and optional tools for this project</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm text-gray-400">
                      {currentProjectTools.filter(t => t.status === 'installed').length} of {currentProjectTools.length} installed
                    </div>
                    <div className="w-32 bg-gray-800 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${currentProjectTools.length > 0 ? (currentProjectTools.filter(t => t.status === 'installed').length / currentProjectTools.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProjectTools
                    .filter(tool => 
                      (selectedCategory === 'all' || tool.category === selectedCategory) &&
                      (searchTerm === '' || tool.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((tool) => (
                    <div key={tool.id} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{tool.name}</h3>
                            <p className="text-gray-400 text-sm">{tool.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(tool.status)}
                          {tool.required && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
                              Required
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-4">{tool.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="text-gray-300 ml-1">{tool.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">License:</span>
                          <span className="text-gray-300 ml-1">{tool.license}</span>
                        </div>
                        {tool.installDate && (
                          <div>
                            <span className="text-gray-500">Installed:</span>
                            <span className="text-gray-300 ml-1">{tool.installDate}</span>
                          </div>
                        )}
                        {tool.lastUsed && (
                          <div>
                            <span className="text-gray-500">Last Used:</span>
                            <span className="text-gray-300 ml-1">{tool.lastUsed}</span>
                          </div>
                        )}
                      </div>

                      <div className={`px-3 py-2 rounded-lg border text-sm font-medium ${getStatusColor(tool.status)}`}>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(tool.status)}
                          <span className="capitalize">{tool.status}</span>
                        </div>
                      </div>

                      {tool.status === 'available' && (
                        <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Install</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

        {selectedTab === 'offload' && (
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
                <h2 className="text-white text-xl font-bold">Tools from Previous Projects</h2>
              </div>
              <p className="text-gray-300 mb-4">
                These tools were used in previous projects and can be safely removed to free up space and reduce security surface.
              </p>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSelectedTools([])}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
                <button 
                  disabled={selectedTools.length === 0}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove Selected ({selectedTools.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deprecatedTools
                .filter(tool => 
                  (selectedCategory === 'all' || tool.category === selectedCategory) &&
                  (searchTerm === '' || tool.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((tool) => (
                <div 
                  key={tool.id} 
                  className={`bg-gray-800/30 rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                    selectedTools.includes(tool.id) 
                      ? 'border-red-500/50 bg-red-500/10' 
                      : 'border-gray-700/50 hover:border-gray-600/50'
                  }`}
                  onClick={() => handleToolSelect(tool.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{tool.name}</h3>
                        <p className="text-gray-400 text-sm">{tool.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTools.includes(tool.id)}
                        onChange={() => handleToolSelect(tool.id)}
                        className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                      />
                      {getStatusIcon('deprecated')}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{tool.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-300 ml-1">{tool.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">License:</span>
                      <span className="text-gray-300 ml-1">{tool.license}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Used:</span>
                      <span className="text-gray-300 ml-1">{tool.lastUsed}</span>
                    </div>
                  </div>

                  <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Ready for Removal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'request' && (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Package className="w-6 h-6 text-blue-400" />
                <h2 className="text-white text-xl font-bold">Available Tools</h2>
              </div>
              <p className="text-gray-300">
                Browse and request additional tools for your current or upcoming projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTools
                .filter(tool => 
                  (selectedCategory === 'all' || tool.category === selectedCategory) &&
                  (searchTerm === '' || tool.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((tool) => (
                <div key={tool.id} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{tool.name}</h3>
                        <p className="text-gray-400 text-sm">{tool.version}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                      {tool.license}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{tool.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-300 ml-1">{tool.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-300 ml-1">{tool.category}</span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Request Tool</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Request Tool Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold">Request Custom Tool</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tool Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter tool name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option>Development</option>
                  <option>Security</option>
                  <option>Analytics</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Justification</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Explain why this tool is needed"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 