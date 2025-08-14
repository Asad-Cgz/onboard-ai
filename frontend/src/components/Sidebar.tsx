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
  Bot,
  Lock,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProject } from '@/contexts/ProjectContext'
import { getProjectData } from '@/data/projectData'

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  section?: string
  disabled?: boolean
}

export default function Sidebar({ activeItem = 'my-project', onItemClick }: SidebarProps) {
  const { selectedProjectId, selectedProjectName } = useProject()
  const projectData = getProjectData(selectedProjectId)
  
  // Get dynamic onboarding progress based on selected project
  const onboardingProgress = projectData?.onboarding.overallProgress || 0
  
  // Define navigation based on project selection status
  const hasSelectedProject = !!selectedProjectId

  // Full navigation sections
  const mainNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'onboarding-status', label: 'Onboarding Status', icon: UserCheck },
  ]

  const projectNavigation = [
    { id: 'my-project', label: 'My Project', icon: FolderOpen },
    { id: 'my-team', label: 'My Team', icon: Users },
  ]

  const toolsNavigation = [
    { id: 'tools-apps', label: 'Tools & Apps Request', icon: Wrench },
  ]

  const learningNavigation = [
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'ask-bot', label: 'Ask the Bot', icon: MessageCircle },
  ]

  const profileNavigation = [
    { id: 'my-skills', label: 'mySkills', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'my-account', label: 'My Account', icon: User },
  ]

  // Core navigation for when no project is selected
  const coreNavigation = [
    { id: 'my-project', label: 'My Project', icon: FolderOpen },
  ]

  const accountNavigation = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'my-account', label: 'My Account', icon: User },
  ]

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
            disabled={item.disabled}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
              activeItem === item.id
                ? "bg-blue-600 text-white shadow-sm"
                : item.disabled
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              activeItem === item.id 
                ? "text-white" 
                : item.disabled
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-white"
            )} />
            <span className="text-sm font-medium">{item.label}</span>
            {item.disabled && <Lock className="w-3 h-3 ml-auto text-gray-500" />}
          </button>
        ))}
      </div>
      {showDivider && <div className="border-t border-gray-800 mt-6"></div>}
    </div>
  )

  return (
    <div className="h-screen bg-gray-900 border-r border-gray-800 flex flex-col dynamic-font-family" style={{ width: 'var(--sidebar-width)' }}>
      {/* Header */}
      <div className="p-6 border-b border-gray-800 dynamic-font-size">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">ElevateHub</h2>
            <p className="text-gray-400 text-xs">Accelerating Talent Journeys</p>
          </div>
        </div>
        
        {/* Project Selection Status */}
        {hasSelectedProject && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Project Selected</span>
            </div>
            <p className="text-xs text-blue-300 mt-1 truncate">{selectedProjectName}</p>
          </div>
        )}
        
        {!hasSelectedProject && (
          <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-orange-400 font-medium">Select a Project</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Choose a project to access all features</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-3 overflow-y-auto">
        {hasSelectedProject ? (
          <>
            {renderNavSection(mainNavigation)}
            {renderNavSection(projectNavigation)}
            {renderNavSection(toolsNavigation)}
            {renderNavSection(learningNavigation, "INSIGHT")}
            {renderNavSection(profileNavigation, "OTHER", false)}
          </>
        ) : (
          <>
            {renderNavSection(coreNavigation, "START HERE")}
            {renderNavSection(accountNavigation, "ACCOUNT", false)}
          </>
        )}
      </div>

      {/* User Section */}
      <div className="border-t border-gray-800 p-4">
        {/* Progress - Only show when project is selected */}
        {hasSelectedProject && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Onboarding Progress</span>
              <span className="text-xs text-gray-400">{onboardingProgress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${onboardingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
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
