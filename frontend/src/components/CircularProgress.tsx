'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CircularProgressProps {
  title: string
  subtitle: string
  percentage: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function CircularProgress({
  title,
  subtitle,
  percentage,
  size = 200,
  strokeWidth = 12,
  className
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn(
      "glass-effect rounded-xl p-6 hover-glow",
      className
    )}>
      <div className="mb-6">
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#374151"
              strokeWidth={strokeWidth}
            />
            
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#10B981"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{percentage}%</div>
              <div className="text-sm text-gray-400">Overall Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Items */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-white text-sm">Pending Tasks</span>
          </div>
          <span className="text-white font-medium">3</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-white text-sm">In Progress</span>
          </div>
          <span className="text-white font-medium">2</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-white text-sm">Completed</span>
          </div>
          <span className="text-white font-medium">18</span>
        </div>
      </div>

      {/* Action */}
      <div className="mt-6">
        <div className="text-sm text-gray-400 mb-2">Next Recommended Action</div>
        <div className="text-white text-sm">
          Complete security training module and schedule team introduction meeting
        </div>
        <button className="mt-4 text-blue-400 text-sm hover:text-blue-300 transition-colors">
          View All Tasks →
        </button>
      </div>
    </div>
  )
} 