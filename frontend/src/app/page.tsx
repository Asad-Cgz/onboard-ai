'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import TeamPage from '@/components/TeamPage'

export default function Home() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const renderContent = () => {
    switch (activeItem) {
      case 'my-team':
        return <TeamPage />
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