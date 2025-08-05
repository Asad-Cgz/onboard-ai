'use client'

import React, { useState } from 'react'
import { Eye, CheckCircle, Trophy, MessageSquare, Download, Bell, Mail, ClipboardList, BookOpen, TrendingUp, Bot } from 'lucide-react'
import MetricCard from './MetricCard'
import TrendChart from './TrendChart'
import CircularProgress from './CircularProgress'

const sampleData = [
  { day: 'Jan 18', value: 70 },
  { day: 'Jan 19', value: 68 },
  { day: 'Jan 20', value: 72 },
  { day: 'Jan 21', value: 74 },
  { day: 'Jan 22', value: 76 },
  { day: 'Jan 23', value: 78 },
  { day: 'Jan 24', value: 75 },
]

interface DashboardProps {
  onNavigate?: (item: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'visibility' | 'mentions'>('visibility')
  
  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900 px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your onboarding progress and skill development journey</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Messages</span>
          </button>
        </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="To-Do"
          value="3"
          icon={<ClipboardList className="w-6 h-6" />}
          trend="Tasks Remaining"
          trendType="positive"
          color="blue"
          onClick={() => onNavigate?.('my-project')}
        />
        <MetricCard
          title="Learning Progress"
          value="75%"
          icon={<BookOpen className="w-6 h-6" />}
          trend="Complete"
          trendType="positive"
          color="green"
          onClick={() => onNavigate?.('learn')}
        />
        <MetricCard
          title="Growth Alignment"
          value="4.6/5"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="High Alignment"
          trendType="positive"
          color="orange"
          onClick={() => onNavigate?.('my-skills')}
        />
        <MetricCard
          title="Bot Interactions"
          value="12"
          icon={<Bot className="w-6 h-6" />}
          trend="Confidence: 4.8/5"
          trendType="positive"
          color="purple"
          onClick={() => onNavigate?.('ask-bot')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2">
          <TrendChart
            title="Learning & Engagement Trends"
            subtitle="Track your onboarding progress and engagement over the last 7 days"
            data={sampleData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Circular Progress */}
        <div className="lg:col-span-1">
          <CircularProgress
            title="Onboarding Completion"
            subtitle="Overall progress through onboarding flow"
            percentage={74}
          />
        </div>
      </div>

      {/* Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Activity */}
        <div className="glass-effect rounded-xl p-6 hover-glow">
          <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Security Training Completed', time: '2 hours ago', status: 'success' },
              { action: 'Profile Setup in Progress', time: '4 hours ago', status: 'pending' },
              { action: 'Welcome Kit Received', time: '1 day ago', status: 'info' },
              { action: 'Account Access Granted', time: '2 days ago', status: 'success' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'success' ? 'bg-green-500' :
                    item.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-white text-sm">{item.action}</span>
                </div>
                <span className="text-gray-400 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-effect rounded-xl p-6 hover-glow">
          <h3 className="text-white text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Complete Training', icon: '📚', color: 'bg-blue-500' },
              { label: 'Meet Your Team', icon: '👥', color: 'bg-green-500' },
              { label: 'Ask the Bot', icon: '🤖', color: 'bg-purple-500' },
              { label: 'View Progress', icon: '📈', color: 'bg-orange-500' },
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                  <span className="text-lg">{action.icon}</span>
                </div>
                <span className="text-white text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
} 