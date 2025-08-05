'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import TeamPage from '@/components/TeamPage'
import OnboardingRoadmap from '@/components/OnboardingRoadmap'
import ToolsPage from '@/components/ToolsPage'
import MySkillsPage from '@/components/MySkillsPage'
import SettingsPage from '@/components/SettingsPage'
import AskBotPage from '@/components/AskBotPage'
import MyProjectPage from '@/components/MyProjectPage'
import MyAccountPage from '@/components/MyAccountPage'
import LearnPage from '@/components/LearnPage'

export default function Home() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const renderContent = () => {
    switch (activeItem) {
      case 'my-team':
        return <TeamPage />
      case 'onboarding-status':
        return <OnboardingRoadmap />
      case 'tools-apps':
        return <ToolsPage />
      case 'my-skills':
        return <MySkillsPage />
      case 'settings':
        return <SettingsPage />
      case 'ask-bot':
        return <AskBotPage />
      case 'my-project':
        return <MyProjectPage />
      case 'my-account':
        return <MyAccountPage />
      case 'learn':
        return <LearnPage />
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setActiveItem} />
    }
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      {renderContent()}
    </div>
  )
} 