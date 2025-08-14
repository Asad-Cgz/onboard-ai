'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle, X, Info, AlertTriangle, XCircle } from 'lucide-react'

interface NotificationToastProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  onClose?: () => void
}

export default function NotificationToast({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/20 border-green-500/30',
          text: 'text-green-400',
          icon: <CheckCircle className="w-5 h-5" />
        }
      case 'warning':
        return {
          bg: 'bg-yellow-500/20 border-yellow-500/30',
          text: 'text-yellow-400',
          icon: <AlertTriangle className="w-5 h-5" />
        }
      case 'error':
        return {
          bg: 'bg-red-500/20 border-red-500/30',
          text: 'text-red-400',
          icon: <XCircle className="w-5 h-5" />
        }
      default:
        return {
          bg: 'bg-blue-500/20 border-blue-500/30',
          text: 'text-blue-400',
          icon: <Info className="w-5 h-5" />
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      ${styles.bg} border backdrop-blur-sm rounded-lg p-4 
      transition-all duration-300 transform
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      min-w-[300px] max-w-[400px]
      shadow-lg
    `}>
      <div className="flex items-start space-x-3">
        <div className={styles.text}>
          {styles.icon}
        </div>
        <div className="flex-1">
          <p className={`${styles.text} font-medium text-sm`}>
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className={`${styles.text} hover:opacity-70 transition-opacity p-1`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 