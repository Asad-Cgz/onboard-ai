'use client'

import React from 'react'
import { 
  BarChart3, 
  FolderOpen, 
  Users, 
  UserCheck, 
  Wrench, 
  GraduationCap, 
  MessageCircle, 
  Award, 
  User, 
  Settings,
  Bot
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  section?: string
}

const navigationSections = {
  main: [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'onboarding-status', label: 'Onboarding Status', icon: UserCheck },
  ],
  project: [
    { id: 'my-project', label: 'My Project', icon: FolderOpen },
    { id: 'my-team', label: 'My Team', icon: Users },
  ],
  tools: [
    { id: 'tools-apps', label: 'Tools & Apps Request', icon: Wrench },
  ],
  learning: [
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'ask-bot', label: 'Ask the Bot', icon: MessageCircle },
  ],
  profile: [
    { id: 'my-skills', label: 'mySkills', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'my-account', label: 'My Account', icon: User },
  ]
}

export default function Sidebar({ activeItem = 'dashboard', onItemClick }: SidebarProps) {
  const renderNavSection = (items: NavItem[], sectionTitle?: string, showDivider = true) => (
    <div className="mb-6">
      {sectionTitle && (
        <div className="px-3 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {sectionTitle}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
              activeItem === item.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              activeItem === item.id ? "text-white" : "text-gray-400 group-hover:text-white"
            )} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      {showDivider && <div className="border-t border-gray-800 mt-6"></div>}
    </div>
  )

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">ElevateHub</h2>
            <p className="text-gray-400 text-xs">Accelerating Talent Journeys</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-3 overflow-y-auto">
        {renderNavSection(navigationSections.main)}
        {renderNavSection(navigationSections.project)}
        {renderNavSection(navigationSections.tools)}
        {renderNavSection(navigationSections.learning, "INSIGHT")}
        {renderNavSection(navigationSections.profile, "OTHER", false)}
      </div>

      {/* User Section */}
      <div className="border-t border-gray-800 p-4">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Onboarding Progress</span>
            <span className="text-xs text-gray-400">33%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: '33%' }}
            ></div>
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">Jane Smith</h3>
            <p className="text-gray-400 text-xs truncate">Sr. Manager • MKTG Europe & ME</p>
          </div>
        </div>
      </div>
    </div>
  )
} 