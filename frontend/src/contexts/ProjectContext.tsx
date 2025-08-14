'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface ProjectContextType {
  selectedProjectId: string | null
  selectedProjectName: string | null
  setSelectedProject: (projectId: string, projectName: string) => void
  clearSelectedProject: () => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

interface ProjectProviderProps {
  children: ReactNode
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null)

  const setSelectedProject = (projectId: string, projectName: string) => {
    setSelectedProjectId(projectId)
    setSelectedProjectName(projectName)
  }

  const clearSelectedProject = () => {
    setSelectedProjectId(null)
    setSelectedProjectName(null)
  }

  return (
    <ProjectContext.Provider value={{
      selectedProjectId,
      selectedProjectName,
      setSelectedProject,
      clearSelectedProject
    }}>
      {children}
    </ProjectContext.Provider>
  )
} 