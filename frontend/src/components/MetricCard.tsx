'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendType?: 'positive' | 'negative'
  color: 'blue' | 'green' | 'orange' | 'purple'
  className?: string
  onClick?: () => void
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-500/20',
    icon: 'text-blue-400',
    border: 'border-blue-500/30',
    trend: 'text-blue-400'
  },
  green: {
    bg: 'bg-green-500/20',
    icon: 'text-green-400',
    border: 'border-green-500/30',
    trend: 'text-green-400'
  },
  orange: {
    bg: 'bg-orange-500/20',
    icon: 'text-orange-400',
    border: 'border-orange-500/30',
    trend: 'text-orange-400'
  },
  purple: {
    bg: 'bg-purple-500/20',
    icon: 'text-purple-400',
    border: 'border-purple-500/30',
    trend: 'text-purple-400'
  }
}

export default function MetricCard({
  title,
  value,
  icon,
  trend,
  trendType = 'positive',
  color,
  className,
  onClick
}: MetricCardProps) {
  const colors = colorVariants[color]
  
  return (
    <div 
      className={cn(
        "glass-effect rounded-xl p-6 hover-glow transition-all duration-300",
        colors.bg,
        colors.border,
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", colors.bg)}>
            <div className={cn("w-6 h-6", colors.icon)}>
              {icon}
            </div>
          </div>
          <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
          <div className="flex items-end space-x-2">
            <span className="text-white text-3xl font-bold">{value}</span>
            {trend && (
              <span className={cn(
                "text-sm font-medium flex items-center",
                trendType === 'positive' ? colors.trend : 'text-red-400'
              )}>
                {trendType === 'positive' ? '↗' : '↘'} {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 