'use client'

import React, { useState } from 'react'
import { 
  Download, 
  Settings, 
  Building2, 
  User, 
  Code, 
  MessageSquare, 
  CheckCircle2, 
  Play,
  FileText,
  Gamepad2,
  Target,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react'

interface RoadmapPhase {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'completed' | 'current' | 'upcoming'
  items: string[]
  color: string
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "Software Setup",
    description: "Essential software downloads and initial setup checklist",
    icon: <Download className="w-6 h-6" />,
    status: 'completed',
    items: [
      "Download required development tools",
      "Install company applications",
      "Setup security software",
      "Configure VPN access"
    ],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 2,
    title: "System Configuration", 
    description: "System setup with guided video tutorials",
    icon: <Settings className="w-6 h-6" />,
    status: 'completed',
    items: [
      "Watch system setup videos",
      "Configure development environment",
      "Setup company accounts",
      "Test system connectivity"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Company & Department Overview",
    description: "Interactive learning about client, HQ, and your department",
    icon: <Building2 className="w-6 h-6" />,
    status: 'current',
    items: [
      "Complete company overview game",
      "Learn about client organization", 
      "Department structure Q&A",
      "Cultural orientation quiz"
    ],
    color: "from-purple-500 to-violet-600"
  },
  {
    id: 4,
    title: "Role & Responsibilities",
    description: "Detailed job description and role expectations",
    icon: <User className="w-6 h-6" />,
    status: 'upcoming',
    items: [
      "Review job description",
      "Understand role expectations",
      "Meet reporting managers",
      "Set initial goals"
    ],
    color: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    title: "Technical Systems",
    description: "Learn coding standards, systems, and development processes",
    icon: <Code className="w-6 h-6" />,
    status: 'upcoming',
    items: [
      "Coding standards training",
      "System architecture overview",
      "Development workflow",
      "Ticketing system tutorial"
    ],
    color: "from-teal-500 to-green-600"
  },
  {
    id: 6,
    title: "Project Support",
    description: "Ongoing support through AI chatbot and team assistance",
    icon: <MessageSquare className="w-6 h-6" />,
    status: 'upcoming',
    items: [
      "AI chatbot introduction",
      "Project-specific guidance",
      "Real-time question support",
      "Escalation procedures"
    ],
    color: "from-pink-500 to-purple-600"
  }
]

export default function OnboardingRoadmap() {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null)
  const [completedPhases] = useState(2) // Simulated progress

  const getStatusIcon = (status: string, phaseId: number) => {
    if (phaseId <= completedPhases) {
      return <CheckCircle2 className="w-5 h-5 text-green-400" />
    } else if (phaseId === completedPhases + 1) {
      return <Play className="w-5 h-5 text-blue-400" />
    } else {
      return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getPhaseStatus = (phaseId: number): 'completed' | 'current' | 'upcoming' => {
    if (phaseId <= completedPhases) return 'completed'
    if (phaseId === completedPhases + 1) return 'current'
    return 'upcoming'
  }

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Onboarding Roadmap</h1>
            <p className="text-gray-400">Your journey to smooth settlement - stress free onboarding</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{completedPhases}/6</div>
              <div className="text-sm text-gray-400">Phases Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{Math.round((completedPhases / 6) * 100)}%</div>
              <div className="text-sm text-gray-400">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-300">Overall Progress</span>
            <span className="text-sm text-gray-400">{completedPhases} of 6 phases completed</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedPhases / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Roadmap Phases */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-gray-600"></div>
          
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const status = getPhaseStatus(phase.id)
              const isActive = status === 'current'
              const isCompleted = status === 'completed'
              
              return (
                <div key={phase.id} className="relative">
                  {/* Phase Node */}
                  <div className="flex items-start space-x-6">
                    {/* Circle Node */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/25' 
                        : isActive 
                        ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/25 animate-pulse' 
                        : 'bg-gray-700 border-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : (
                        <div className="text-white font-bold text-lg">{phase.id}</div>
                      )}
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1">
                      <div 
                        className={`rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10' 
                            : isCompleted
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/30'
                        }`}
                        onClick={() => setSelectedPhase(phase)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${phase.color} flex items-center justify-center`}>
                              {phase.icon}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">Phase {phase.id}: {phase.title}</h3>
                              <p className="text-gray-400 text-sm">{phase.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(status, phase.id)}
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        {/* Quick Preview Items */}
                        <div className="grid grid-cols-2 gap-2">
                          {phase.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {phase.items.length > 2 && (
                          <div className="mt-2 text-sm text-gray-400">
                            +{phase.items.length - 2} more items
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Connector */}
                  {index < roadmapPhases.length - 1 && (
                    <div className="absolute left-12 -bottom-4 w-8 h-8 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-purple-400 transform rotate-90" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Success Banner */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30">
              <Star className="w-12 h-12 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Smooth Settlement</h3>
                <p className="text-gray-300">Stress-free onboarding completion</p>
              </div>
              <Target className="w-12 h-12 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal */}
      {selectedPhase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${selectedPhase.color} flex items-center justify-center`}>
                  {selectedPhase.icon}
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold">Phase {selectedPhase.id}: {selectedPhase.title}</h2>
                  <p className="text-gray-300 mt-1">{selectedPhase.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPhase(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-gray-400 transform rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg mb-4">Phase Requirements:</h3>
              {selectedPhase.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Status: <span className={`font-medium ${
                  getPhaseStatus(selectedPhase.id) === 'completed' ? 'text-green-400' :
                  getPhaseStatus(selectedPhase.id) === 'current' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {getPhaseStatus(selectedPhase.id).charAt(0).toUpperCase() + getPhaseStatus(selectedPhase.id).slice(1)}
                </span>
              </div>
              
              {getPhaseStatus(selectedPhase.id) === 'current' && (
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Continue Phase</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 