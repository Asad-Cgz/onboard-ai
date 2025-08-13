'use client'

import React, { useState, useEffect } from 'react'
import { 
  Palette, 
  Type, 
  Globe, 
  Monitor, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  User, 
  Volume2, 
  Eye, 
  Accessibility,
  Save,
  RotateCcw,
  Check,
  ChevronRight,
  Smartphone,
  Laptop,
  Tablet,
  Languages,
  Settings as SettingsIcon,
  Lock,
  Mail,
  MessageSquare,
  CheckCircle
} from 'lucide-react'
import { useSettings } from '@/contexts/SettingsContext'

interface SettingOption {
  id: string
  label: string
  value: string | number | boolean
  type: 'select' | 'toggle' | 'slider' | 'color' | 'radio'
  options?: { value: string | number, label: string, icon?: React.ReactNode }[]
  min?: number
  max?: number
  step?: number
  description?: string
}

interface SettingSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  settings: SettingOption[]
}

const settingSections: SettingSection[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel of your interface',
    icon: <Palette className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    settings: [
      {
        id: 'theme',
        label: 'Theme Mode',
        value: 'dark',
        type: 'radio',
        description: 'Choose your preferred color scheme',
        options: [
          { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
          { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
          { value: 'auto', label: 'System', icon: <Monitor className="w-4 h-4" /> }
        ]
      },
      {
        id: 'colorScheme',
        label: 'Color Scheme',
        value: 'blue',
        type: 'select',
        description: 'Primary color theme for the interface',
        options: [
          { value: 'blue', label: 'Ocean Blue' },
          { value: 'purple', label: 'Royal Purple' },
          { value: 'green', label: 'Forest Green' },
          { value: 'orange', label: 'Sunset Orange' },
          { value: 'red', label: 'Crimson Red' },
          { value: 'teal', label: 'Teal' }
        ]
      },
      {
        id: 'accentColor',
        label: 'Accent Color',
        value: '#3B82F6',
        type: 'color',
        description: 'Custom accent color for highlights and buttons'
      },
      {
        id: 'borderRadius',
        label: 'Border Radius',
        value: 8,
        type: 'slider',
        min: 0,
        max: 20,
        step: 1,
        description: 'Roundness of corners and elements'
      }
    ]
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Adjust text size, font, and readability settings',
    icon: <Type className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
    settings: [
      {
        id: 'fontSize',
        label: 'Font Size',
        value: 16,
        type: 'slider',
        min: 12,
        max: 24,
        step: 1,
        description: 'Base font size for the application'
      },
      {
        id: 'fontFamily',
        label: 'Font Family',
        value: 'Inter',
        type: 'select',
        description: 'Choose your preferred font',
        options: [
          { value: 'Inter', label: 'Inter (Default)' },
          { value: 'Roboto', label: 'Roboto' },
          { value: 'Open Sans', label: 'Open Sans' },
          { value: 'Lato', label: 'Lato' },
          { value: 'Source Sans Pro', label: 'Source Sans Pro' },
          { value: 'system-ui', label: 'System Font' }
        ]
      },
      {
        id: 'lineHeight',
        label: 'Line Height',
        value: 1.5,
        type: 'slider',
        min: 1.2,
        max: 2.0,
        step: 0.1,
        description: 'Spacing between lines of text'
      }
    ]
  },
  {
    id: 'layout',
    title: 'Layout & Interface',
    description: 'Control spacing, layout, and interface density',
    icon: <Monitor className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    settings: [
      {
        id: 'compactMode',
        label: 'Compact Mode',
        value: false,
        type: 'toggle',
        description: 'Reduce spacing and padding for more content density'
      },
      {
        id: 'sidebarWidth',
        label: 'Sidebar Width',
        value: 280,
        type: 'slider',
        min: 240,
        max: 400,
        step: 20,
        description: 'Width of the navigation sidebar'
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Improve usability and accessibility features',
    icon: <Accessibility className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    settings: [
      {
        id: 'highContrast',
        label: 'High Contrast Mode',
        value: false,
        type: 'toggle',
        description: 'Increase color contrast for better visibility'
      },
      {
        id: 'reducedMotion',
        label: 'Reduce Motion',
        value: false,
        type: 'toggle',
        description: 'Minimize animations and transitions'
      },
      {
        id: 'screenReader',
        label: 'Screen Reader Support',
        value: false,
        type: 'toggle',
        description: 'Enhanced compatibility with screen readers'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Manage how you receive alerts and updates',
    icon: <Bell className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-600',
    settings: [
      {
        id: 'desktopNotifications',
        label: 'Desktop Notifications',
        value: true,
        type: 'toggle',
        description: 'Show notifications on your desktop'
      },
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        value: true,
        type: 'toggle',
        description: 'Receive notifications via email'
      },
      {
        id: 'soundEnabled',
        label: 'Sound Effects',
        value: true,
        type: 'toggle',
        description: 'Play sound for notifications and interactions'
      },
      {
        id: 'notificationFrequency',
        label: 'Notification Frequency',
        value: 'realtime',
        type: 'select',
        description: 'How often to receive notifications',
        options: [
          { value: 'realtime', label: 'Real-time' },
          { value: 'hourly', label: 'Hourly Digest' },
          { value: 'daily', label: 'Daily Summary' },
          { value: 'weekly', label: 'Weekly Summary' }
        ]
      }
    ]
  },
  {
    id: 'language',
    title: 'Language & Region',
    description: 'Set your language, date, and time preferences',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-600',
    settings: [
      {
        id: 'language',
        label: 'Display Language',
        value: 'en',
        type: 'select',
        description: 'Choose your preferred language',
        options: [
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Español' },
          { value: 'fr', label: 'Français' },
          { value: 'de', label: 'Deutsch' },
          { value: 'it', label: 'Italiano' },
          { value: 'pt', label: 'Português' },
          { value: 'zh', label: '中文' },
          { value: 'ja', label: '日本語' }
        ]
      },
      {
        id: 'dateFormat',
        label: 'Date Format',
        value: 'MM/dd/yyyy',
        type: 'select',
        description: 'How dates are displayed',
        options: [
          { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY (US)' },
          { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY (UK)' },
          { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD (ISO)' },
          { value: 'dd.MM.yyyy', label: 'DD.MM.YYYY (EU)' }
        ]
      },
      {
        id: 'timeFormat',
        label: 'Time Format',
        value: '12h',
        type: 'radio',
        description: 'Choose between 12-hour or 24-hour time',
        options: [
          { value: '12h', label: '12-hour (AM/PM)', icon: <Smartphone className="w-4 h-4" /> },
          { value: '24h', label: '24-hour', icon: <Laptop className="w-4 h-4" /> }
        ]
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Control your privacy settings and security options',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-500 to-pink-600',
    settings: [
      {
        id: 'analyticsEnabled',
        label: 'Analytics & Telemetry',
        value: true,
        type: 'toggle',
        description: 'Help improve the app by sharing anonymous usage data'
      },
      {
        id: 'sessionTimeout',
        label: 'Session Timeout',
        value: '30m',
        type: 'select',
        description: 'Automatically log out after period of inactivity',
        options: [
          { value: '15m', label: '15 minutes' },
          { value: '30m', label: '30 minutes' },
          { value: '1h', label: '1 hour' },
          { value: '2h', label: '2 hours' },
          { value: '4h', label: '4 hours' },
          { value: 'never', label: 'Never' }
        ]
      },
      {
        id: 'twoFactorAuth',
        label: 'Two-Factor Authentication',
        value: false,
        type: 'toggle',
        description: 'Add an extra layer of security to your account'
      },
      {
        id: 'activityLogging',
        label: 'Activity Logging',
        value: true,
        type: 'toggle',
        description: 'Log account activity for security monitoring'
      }
    ]
  }
]

export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState('appearance')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { settings, updateSetting, saveSettings, resetSettings, hasUnsavedChanges } = useSettings()

  // Listen for settings saved event
  useEffect(() => {
    const handleSettingsSaved = () => {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }

    window.addEventListener('settingsSaved', handleSettingsSaved)
    return () => window.removeEventListener('settingsSaved', handleSettingsSaved)
  }, [])

  const getCurrentValue = (sectionId: string, settingId: string, defaultValue: any) => {
    return (settings as any)[settingId] ?? defaultValue
  }

  const handleUpdateSetting = (sectionId: string, settingId: string, value: any) => {
    updateSetting(settingId as any, value)
  }

  const currentSection = settingSections.find(section => section.id === selectedSection)

  const renderSettingControl = (section: SettingSection, setting: SettingOption) => {
    const currentValue = getCurrentValue(section.id, setting.id, setting.value)

    switch (setting.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentValue}
              onChange={(e) => handleUpdateSetting(section.id, setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        )

      case 'select':
        return (
          <select
            value={currentValue}
            onChange={(e) => handleUpdateSetting(section.id, setting.id, e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 min-w-[200px]"
          >
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {setting.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`${section.id}-${setting.id}`}
                  value={option.value}
                  checked={currentValue === option.value}
                  onChange={(e) => handleUpdateSetting(section.id, setting.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  {option.icon}
                  <span className="text-gray-300">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        )

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={currentValue}
              onChange={(e) => handleUpdateSetting(section.id, setting.id, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{setting.min}</span>
              <span className="text-white font-medium">{currentValue}</span>
              <span>{setting.max}</span>
            </div>
          </div>
        )

      case 'color':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={currentValue}
              onChange={(e) => handleUpdateSetting(section.id, setting.id, e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-600 bg-gray-700 cursor-pointer"
            />
            <span className="text-gray-300 font-mono text-sm">{currentValue}</span>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-400">Customize your ElevateHub experience</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Success message */}
            {showSuccessMessage && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Settings saved!</span>
              </div>
            )}
            
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetSettings}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={saveSettings}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 sticky top-32">
              <div className="p-6">
                <h2 className="text-white font-semibold mb-4">Categories</h2>
                <nav className="space-y-2">
                  {settingSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color}`}>
                          {section.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-xs opacity-75 truncate max-w-[140px]">
                            {section.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentSection && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-8">
                {/* Section Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${currentSection.color}`}>
                      {currentSection.icon}
                    </div>
                    <div>
                      <h2 className="text-white text-2xl font-bold">{currentSection.title}</h2>
                      <p className="text-gray-400">{currentSection.description}</p>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-8">
                  {currentSection.settings.map((setting) => (
                    <div key={setting.id} className="border-b border-gray-700/50 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-8">
                          <h3 className="text-white font-medium mb-1">{setting.label}</h3>
                          {setting.description && (
                            <p className="text-gray-400 text-sm">{setting.description}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {renderSettingControl(currentSection, setting)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 