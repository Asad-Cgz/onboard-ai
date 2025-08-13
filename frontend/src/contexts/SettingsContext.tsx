'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface AppSettings {
  // Appearance
  theme: 'light' | 'dark' | 'auto'
  colorScheme: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal'
  accentColor: string
  borderRadius: number
  
  // Typography
  fontSize: number
  fontFamily: string
  lineHeight: number
  
  // Layout
  compactMode: boolean
  sidebarWidth: number
  
  // Accessibility
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  
  // Notifications
  desktopNotifications: boolean
  emailNotifications: boolean
  soundEnabled: boolean
  notificationFrequency: string
  
  // Language & Region
  language: string
  dateFormat: string
  timeFormat: string
  timezone: string
  
  // Privacy & Security
  analyticsEnabled: boolean
  sessionTimeout: string
  twoFactorAuth: boolean
  activityLogging: boolean
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  colorScheme: 'blue',
  accentColor: '#3B82F6',
  borderRadius: 8,
  fontSize: 16,
  fontFamily: 'Inter',
  lineHeight: 1.5,
  compactMode: false,
  sidebarWidth: 280,
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  desktopNotifications: true,
  emailNotifications: true,
  soundEnabled: true,
  notificationFrequency: 'realtime',
  language: 'en',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h',
  timezone: 'UTC',
  analyticsEnabled: true,
  sessionTimeout: '30m',
  twoFactorAuth: false,
  activityLogging: true
}

interface SettingsContextType {
  settings: AppSettings
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  resetSettings: () => void
  saveSettings: () => void
  hasUnsavedChanges: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const colorSchemes = {
  blue: {
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#1D4ED8',
    secondary: '#1E40AF',
    accent: '#06B6D4'
  },
  purple: {
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#6D28D9',
    secondary: '#7C3AED',
    accent: '#EC4899'
  },
  green: {
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#047857',
    secondary: '#059669',
    accent: '#F59E0B'
  },
  orange: {
    primary: '#F97316',
    primaryLight: '#FB923C',
    primaryDark: '#C2410C',
    secondary: '#EA580C',
    accent: '#EF4444'
  },
  red: {
    primary: '#EF4444',
    primaryLight: '#F87171',
    primaryDark: '#B91C1C',
    secondary: '#DC2626',
    accent: '#8B5CF6'
  },
  teal: {
    primary: '#14B8A6',
    primaryLight: '#2DD4BF',
    primaryDark: '#0F766E',
    secondary: '#0D9488',
    accent: '#6366F1'
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('elevateHub_settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [])

  // Apply settings to CSS custom properties
  useEffect(() => {
    const root = document.documentElement
    const colors = colorSchemes[settings.colorScheme]

    // Apply color scheme
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-primary-light', colors.primaryLight)
    root.style.setProperty('--color-primary-dark', colors.primaryDark)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-custom-accent', settings.accentColor)
    
    // Apply typography
    root.style.setProperty('--font-size-base', `${settings.fontSize}px`)
    root.style.setProperty('--font-family', settings.fontFamily)
    root.style.setProperty('--line-height', settings.lineHeight.toString())
    
    // Apply layout
    root.style.setProperty('--border-radius', `${settings.borderRadius}px`)
    root.style.setProperty('--sidebar-width', `${settings.sidebarWidth}px`)
    
    // Apply accessibility
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Apply theme
    if (settings.theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else if (settings.theme === 'dark') {
      root.classList.remove('light')
      root.classList.add('dark')
    } else {
      // Auto theme - use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
      root.classList.toggle('light', !prefersDark)
    }

    // Apply compact mode
    root.classList.toggle('compact-mode', settings.compactMode)
    
  }, [settings])

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem('elevateHub_settings', JSON.stringify(settings))
    setHasUnsavedChanges(false)
    
    // Show success notification
    const event = new CustomEvent('settingsSaved')
    window.dispatchEvent(event)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('elevateHub_settings')
    setHasUnsavedChanges(false)
  }

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      resetSettings,
      saveSettings,
      hasUnsavedChanges
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 