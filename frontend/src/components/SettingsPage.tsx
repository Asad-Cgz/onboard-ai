'use client'

import React, { useState } from 'react'
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
  MessageSquare
} from 'lucide-react'

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
        step: 2,
        description: 'Roundness of corners and buttons'
      }
    ]
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Font settings and text display preferences',
    icon: <Type className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
    settings: [
      {
        id: 'fontSize',
        label: 'Font Size',
        value: 'medium',
        type: 'radio',
        description: 'Base font size for the interface',
        options: [
          { value: 'small', label: 'Small (14px)' },
          { value: 'medium', label: 'Medium (16px)' },
          { value: 'large', label: 'Large (18px)' },
          { value: 'xl', label: 'Extra Large (20px)' }
        ]
      },
      {
        id: 'fontFamily',
        label: 'Font Family',
        value: 'inter',
        type: 'select',
        description: 'Choose your preferred font family',
        options: [
          { value: 'inter', label: 'Inter (Default)' },
          { value: 'roboto', label: 'Roboto' },
          { value: 'openSans', label: 'Open Sans' },
          { value: 'poppins', label: 'Poppins' },
          { value: 'system', label: 'System Font' }
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
      },
      {
        id: 'fontWeight',
        label: 'Font Weight',
        value: 'normal',
        type: 'select',
        description: 'Default text weight',
        options: [
          { value: 'light', label: 'Light' },
          { value: 'normal', label: 'Normal' },
          { value: 'medium', label: 'Medium' },
          { value: 'semibold', label: 'Semi Bold' }
        ]
      }
    ]
  },
  {
    id: 'language',
    title: 'Language & Region',
    description: 'Language, date format, and regional settings',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
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
          { value: 'ja', label: '日本語' },
          { value: 'ko', label: '한국어' },
          { value: 'ar', label: 'العربية' }
        ]
      },
      {
        id: 'dateFormat',
        label: 'Date Format',
        value: 'MM/DD/YYYY',
        type: 'select',
        description: 'How dates are displayed',
        options: [
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK)' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
          { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (German)' }
        ]
      },
      {
        id: 'timeFormat',
        label: 'Time Format',
        value: '12h',
        type: 'radio',
        description: 'How time is displayed',
        options: [
          { value: '12h', label: '12 Hour (AM/PM)' },
          { value: '24h', label: '24 Hour' }
        ]
      },
      {
        id: 'timezone',
        label: 'Timezone',
        value: 'UTC',
        type: 'select',
        description: 'Your local timezone',
        options: [
          { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
          { value: 'EST', label: 'EST (Eastern Standard Time)' },
          { value: 'PST', label: 'PST (Pacific Standard Time)' },
          { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
          { value: 'CET', label: 'CET (Central European Time)' },
          { value: 'JST', label: 'JST (Japan Standard Time)' }
        ]
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Options to improve usability and accessibility',
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
        id: 'focusIndicator',
        label: 'Enhanced Focus Indicators',
        value: true,
        type: 'toggle',
        description: 'More visible focus outlines for keyboard navigation'
      },
      {
        id: 'screenReader',
        label: 'Screen Reader Optimized',
        value: false,
        type: 'toggle',
        description: 'Optimize interface for screen readers'
      },
      {
        id: 'colorBlindSupport',
        label: 'Color Blind Support',
        value: 'none',
        type: 'select',
        description: 'Adjust colors for color vision deficiency',
        options: [
          { value: 'none', label: 'None' },
          { value: 'protanopia', label: 'Protanopia' },
          { value: 'deuteranopia', label: 'Deuteranopia' },
          { value: 'tritanopia', label: 'Tritanopia' }
        ]
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control how and when you receive notifications',
    icon: <Bell className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-600',
    settings: [
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        value: true,
        type: 'toggle',
        description: 'Receive notifications via email'
      },
      {
        id: 'pushNotifications',
        label: 'Push Notifications',
        value: true,
        type: 'toggle',
        description: 'Browser push notifications'
      },
      {
        id: 'soundEnabled',
        label: 'Notification Sounds',
        value: true,
        type: 'toggle',
        description: 'Play sound for notifications'
      },
      {
        id: 'notificationFrequency',
        label: 'Frequency',
        value: 'normal',
        type: 'select',
        description: 'How often to receive notifications',
        options: [
          { value: 'high', label: 'High (Immediate)' },
          { value: 'normal', label: 'Normal (Every 15 min)' },
          { value: 'low', label: 'Low (Hourly)' },
          { value: 'minimal', label: 'Minimal (Daily digest)' }
        ]
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Privacy settings and security preferences',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-500 to-pink-600',
    settings: [
      {
        id: 'dataCollection',
        label: 'Analytics Data Collection',
        value: true,
        type: 'toggle',
        description: 'Allow collection of usage analytics to improve the product'
      },
      {
        id: 'sessionTimeout',
        label: 'Session Timeout',
        value: '8h',
        type: 'select',
        description: 'Automatically log out after inactivity',
        options: [
          { value: '1h', label: '1 Hour' },
          { value: '4h', label: '4 Hours' },
          { value: '8h', label: '8 Hours' },
          { value: '24h', label: '24 Hours' },
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
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (sectionId: string, settingId: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [`${sectionId}.${settingId}`]: value
    }))
    setHasChanges(true)
  }

  const getCurrentValue = (sectionId: string, settingId: string, defaultValue: any) => {
    return settings[`${sectionId}.${settingId}`] ?? defaultValue
  }

  const saveSettings = () => {
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', settings)
    setHasChanges(false)
    // Show success message
  }

  const resetSettings = () => {
    setSettings({})
    setHasChanges(false)
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
              onChange={(e) => updateSetting(section.id, setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        )

      case 'select':
        return (
          <select
            value={currentValue}
            onChange={(e) => updateSetting(section.id, setting.id, e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
                  onChange={(e) => updateSetting(section.id, setting.id, e.target.value)}
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
              onChange={(e) => updateSetting(section.id, setting.id, parseFloat(e.target.value))}
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
              onChange={(e) => updateSetting(section.id, setting.id, e.target.value)}
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
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <>
                <button
                  onClick={resetSettings}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={saveSettings}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex px-8 pb-8 gap-8">
        {/* Settings Navigation */}
        <div className="w-80 space-y-2">
          {settingSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                selectedSection === section.id
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-700/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{section.title}</h3>
                  <p className="text-gray-400 text-sm">{section.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {currentSection && (
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-800">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${currentSection.color} flex items-center justify-center`}>
                  {currentSection.icon}
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{currentSection.title}</h2>
                  <p className="text-gray-400">{currentSection.description}</p>
                </div>
              </div>

              {/* Settings List */}
              <div className="space-y-6">
                {currentSection.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{setting.label}</h3>
                        {setting.description && (
                          <p className="text-gray-400 text-sm">{setting.description}</p>
                        )}
                      </div>
                      <div className="ml-6">
                        {renderSettingControl(currentSection, setting)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Section for Appearance */}
              {selectedSection === 'appearance' && (
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-white font-semibold text-lg mb-4">Preview</h3>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                    <div className="mb-3">
                      <div className="w-16 h-3 bg-blue-500 rounded mb-2"></div>
                      <div className="w-24 h-2 bg-gray-500 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-gray-500 rounded"></div>
                      <div className="w-3/4 h-2 bg-gray-500 rounded"></div>
                      <div className="w-1/2 h-2 bg-gray-500 rounded"></div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <div className="px-3 py-1 bg-blue-500 text-white text-xs rounded">Button</div>
                      <div className="px-3 py-1 bg-gray-600 text-white text-xs rounded">Secondary</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 