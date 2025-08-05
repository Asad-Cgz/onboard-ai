'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TrendChartProps {
  title: string
  subtitle: string
  data: Array<{ day: string; value: number }>
  activeTab?: 'visibility' | 'mentions'
  onTabChange?: (tab: 'visibility' | 'mentions') => void
  className?: string
}

export default function TrendChart({
  title,
  subtitle,
  data,
  activeTab = 'visibility',
  onTabChange,
  className
}: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className={cn(
      "glass-effect rounded-xl p-6 hover-glow",
      className
    )}>
      <div className="mb-6">
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => onTabChange?.('visibility')}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
            activeTab === 'visibility'
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Learning Progress
        </button>
        <button
          onClick={() => onTabChange?.('mentions')}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
            activeTab === 'mentions'
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          Bot Engagement
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <svg className="w-full h-full">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80].map((value) => (
            <g key={value}>
              <line
                x1="50"
                y1={`${90 - (value / 80) * 70}%`}
                x2="100%"
                y2={`${90 - (value / 80) * 70}%`}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x="10"
                y={`${94 - (value / 80) * 70}%`}
                fill="#9CA3AF"
                fontSize="12"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Data lines */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            points={data.map((point, index) => 
              `${50 + (index / (data.length - 1)) * 85},${90 - (point.value / maxValue) * 70}`
            ).join(' ')}
          />
          
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            points={data.map((point, index) => 
              `${50 + (index / (data.length - 1)) * 85},${90 - ((point.value * 0.1) / maxValue) * 70}`
            ).join(' ')}
          />

          {/* Data points */}
          {data.map((point, index) => (
            <g key={index}>
              <circle
                cx={50 + (index / (data.length - 1)) * 85}
                cy={90 - (point.value / maxValue) * 70}
                r="4"
                fill="#10B981"
                className="hover:r-6 transition-all cursor-pointer"
              />
              <circle
                cx={50 + (index / (data.length - 1)) * 85}
                cy={90 - ((point.value * 0.1) / maxValue) * 70}
                r="4"
                fill="#3B82F6"
                className="hover:r-6 transition-all cursor-pointer"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={index}
              x={50 + (index / (data.length - 1)) * 85}
              y="95%"
              fill="#9CA3AF"
              fontSize="12"
              textAnchor="middle"
            >
              {point.day}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Learning Progress %</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Engagement Score</span>
        </div>
      </div>
    </div>
  )
} 