'use client'

import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { getProjectData } from '@/data/projectData'
import { 
  Code2, 
  Brain, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Star,
  Award,
  BookOpen,
  Lightbulb,
  Shield,
  Database,
  Globe,
  MessageSquare,
  BarChart3,
  Settings,
  Zap,
  Eye,
  Heart,
  Plus,
  ArrowRight,
  Calendar,
  Filter
} from 'lucide-react'

type SkillLevel = 'strong' | 'okay' | 'needs-improvement'

interface Skill {
  id: string
  name: string
  level: SkillLevel
  proficiency: number // 0-100
  projectRelevance: 'high' | 'medium' | 'low'
  growthPotential: 'high' | 'medium' | 'low'
  lastAssessed: string
  description: string
  developmentActions?: string[]
  icon: React.ReactNode
}

interface SkillSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

const skillSections: SkillSection[] = [
  {
    id: 'technical',
    title: 'Technical Skills',
    description: 'Programming languages, frameworks, and technical tools',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
    skills: [
      {
        id: 'javascript',
        name: 'JavaScript/TypeScript',
        level: 'strong',
        proficiency: 85,
        projectRelevance: 'high',
        growthPotential: 'medium',
        lastAssessed: '2024-01-15',
        description: 'Advanced knowledge of modern JavaScript and TypeScript development',
        icon: <Code2 className="w-5 h-5" />
      },
      {
        id: 'react',
        name: 'React/Next.js',
        level: 'strong',
        proficiency: 80,
        projectRelevance: 'high',
        growthPotential: 'high',
        lastAssessed: '2024-01-15',
        description: 'Proficient in building modern React applications with Next.js',
        icon: <Globe className="w-5 h-5" />
      },
      {
        id: 'python',
        name: 'Python',
        level: 'okay',
        proficiency: 65,
        projectRelevance: 'medium',
        growthPotential: 'high',
        lastAssessed: '2024-01-10',
        description: 'Good understanding of Python for backend development and automation',
        developmentActions: ['Complete advanced Python course', 'Build a Python microservice'],
        icon: <Code2 className="w-5 h-5" />
      },
      {
        id: 'aws',
        name: 'AWS Cloud Services',
        level: 'needs-improvement',
        proficiency: 35,
        projectRelevance: 'high',
        growthPotential: 'high',
        lastAssessed: '2024-01-08',
        description: 'Basic knowledge of AWS services, needs improvement for project requirements',
        developmentActions: ['AWS Solutions Architect certification', 'Hands-on AWS projects', 'AWS training workshops'],
        icon: <Database className="w-5 h-5" />
      },
      {
        id: 'docker',
        name: 'Docker & Containerization',
        level: 'okay',
        proficiency: 55,
        projectRelevance: 'high',
        growthPotential: 'medium',
        lastAssessed: '2024-01-12',
        description: 'Working knowledge of Docker and container orchestration',
        developmentActions: ['Docker certification', 'Kubernetes fundamentals'],
        icon: <Settings className="w-5 h-5" />
      }
    ]
  },
  {
    id: 'domain',
    title: 'Domain Skills',
    description: 'Industry and business domain expertise',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    skills: [
      {
        id: 'insurance',
        name: 'Insurance Industry',
        level: 'needs-improvement',
        proficiency: 25,
        projectRelevance: 'high',
        growthPotential: 'high',
        lastAssessed: '2024-01-05',
        description: 'Learning insurance domain for current project requirements',
        developmentActions: ['Insurance fundamentals course', 'Shadow domain expert', 'Industry certification'],
        icon: <Shield className="w-5 h-5" />
      },
      {
        id: 'fintech',
        name: 'Financial Technology',
        level: 'okay',
        proficiency: 60,
        projectRelevance: 'medium',
        growthPotential: 'medium',
        lastAssessed: '2024-01-12',
        description: 'Previous experience with banking and financial systems',
        icon: <BarChart3 className="w-5 h-5" />
      },
      {
        id: 'regulatory',
        name: 'Compliance & Regulatory',
        level: 'needs-improvement',
        proficiency: 30,
        projectRelevance: 'high',
        growthPotential: 'high',
        lastAssessed: '2024-01-08',
        description: 'Understanding of regulatory requirements in insurance sector',
        developmentActions: ['Compliance training', 'Regulatory frameworks study', 'Legal requirements workshop'],
        icon: <BookOpen className="w-5 h-5" />
      }
    ]
  },
  {
    id: 'functional',
    title: 'Functional Skills',
    description: 'Core job function and process skills',
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    skills: [
      {
        id: 'project-management',
        name: 'Project Management',
        level: 'strong',
        proficiency: 78,
        projectRelevance: 'high',
        growthPotential: 'medium',
        lastAssessed: '2024-01-14',
        description: 'Strong project planning and execution capabilities',
        icon: <Calendar className="w-5 h-5" />
      },
      {
        id: 'agile',
        name: 'Agile Methodologies',
        level: 'strong',
        proficiency: 82,
        projectRelevance: 'high',
        growthPotential: 'low',
        lastAssessed: '2024-01-15',
        description: 'Experienced with Scrum, Kanban, and agile practices',
        icon: <Zap className="w-5 h-5" />
      },
      {
        id: 'testing',
        name: 'Quality Assurance',
        level: 'okay',
        proficiency: 58,
        projectRelevance: 'medium',
        growthPotential: 'medium',
        lastAssessed: '2024-01-10',
        description: 'Good understanding of testing methodologies and practices',
        developmentActions: ['Advanced testing frameworks', 'Test automation tools'],
        icon: <CheckCircle2 className="w-5 h-5" />
      },
      {
        id: 'documentation',
        name: 'Technical Documentation',
        level: 'okay',
        proficiency: 70,
        projectRelevance: 'medium',
        growthPotential: 'low',
        lastAssessed: '2024-01-12',
        description: 'Capable of creating clear technical documentation',
        icon: <BookOpen className="w-5 h-5" />
      }
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership Skills',
    description: 'Team leadership and management capabilities',
    icon: <Users className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    skills: [
      {
        id: 'team-leadership',
        name: 'Team Leadership',
        level: 'okay',
        proficiency: 62,
        projectRelevance: 'medium',
        growthPotential: 'high',
        lastAssessed: '2024-01-13',
        description: 'Developing leadership skills for team management',
        developmentActions: ['Leadership training program', 'Mentoring junior developers', 'Lead a project team'],
        icon: <Users className="w-5 h-5" />
      },
      {
        id: 'communication',
        name: 'Communication',
        level: 'strong',
        proficiency: 75,
        projectRelevance: 'high',
        growthPotential: 'medium',
        lastAssessed: '2024-01-15',
        description: 'Strong verbal and written communication skills',
        icon: <MessageSquare className="w-5 h-5" />
      },
      {
        id: 'mentoring',
        name: 'Mentoring & Coaching',
        level: 'needs-improvement',
        proficiency: 38,
        projectRelevance: 'medium',
        growthPotential: 'high',
        lastAssessed: '2024-01-08',
        description: 'Learning to mentor and guide team members effectively',
        developmentActions: ['Mentoring certification', 'Coach junior team members', 'Feedback training'],
        icon: <Heart className="w-5 h-5" />
      },
      {
        id: 'strategic-thinking',
        name: 'Strategic Thinking',
        level: 'okay',
        proficiency: 55,
        projectRelevance: 'high',
        growthPotential: 'high',
        lastAssessed: '2024-01-10',
        description: 'Developing strategic planning and decision-making skills',
        developmentActions: ['Business strategy course', 'Strategic planning workshops'],
        icon: <Lightbulb className="w-5 h-5" />
      }
    ]
  }
]

export default function MySkillsPage() {
  const [selectedSection, setSelectedSection] = useState<string>('technical')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [filter, setFilter] = useState<'all' | SkillLevel>('all')
  const { selectedProjectId, selectedProjectName } = useProject()
  const projectData = getProjectData(selectedProjectId)

  // Transform project skills data to match component format
  const getProjectSkillSections = () => {
    if (!projectData) return skillSections

    const transformSkills = (skills: any[], sectionTitle: string, iconComponent: React.ReactNode) => {
      return skills.map((skill, index) => ({
        id: `${sectionTitle.toLowerCase()}-${index}`,
        name: skill.skill,
        level: skill.level as SkillLevel,
        proficiency: skill.level === 'strong' ? 85 : skill.level === 'okay' ? 65 : 45,
        projectRelevance: skill.priority as 'high' | 'medium' | 'low',
        growthPotential: skill.priority as 'high' | 'medium' | 'low',
        lastAssessed: '2024-02-01',
        description: skill.projectRelevance,
        developmentActions: skill.level === 'needs-work' ? 
          [`Improve ${skill.skill} through project work`, 'Complete relevant training modules'] : 
          [`Maintain ${skill.skill} expertise`, 'Share knowledge with team'],
        icon: iconComponent
      }))
    }

         return [
       {
         id: 'technical',
         title: 'Technical Skills',
         subtitle: selectedProjectName ? `Core technical skills for ${selectedProjectName}` : 'Programming languages, frameworks, and technical expertise',
         description: selectedProjectName ? `Essential technical capabilities required for ${selectedProjectName} development` : 'Core technical competencies for software development',
         icon: <Code2 className="w-6 h-6" />,
         color: 'from-blue-600 to-cyan-600',
         skills: transformSkills(projectData.skills.technical, 'technical', <Code2 className="w-5 h-5" />)
       },
       {
         id: 'domain',
         title: 'Domain Skills',
         subtitle: selectedProjectName ? `Domain expertise relevant to ${selectedProjectName}` : 'Industry-specific knowledge and domain expertise',
         description: selectedProjectName ? `Business domain knowledge specific to ${selectedProjectName}` : 'Industry and business domain expertise',
         icon: <Brain className="w-6 h-6" />,
         color: 'from-purple-600 to-pink-600',
         skills: transformSkills(projectData.skills.domain, 'domain', <Brain className="w-5 h-5" />)
       },
       {
         id: 'functional',
         title: 'Functional Skills',
         subtitle: selectedProjectName ? `Functional capabilities for ${selectedProjectName}` : 'Process, methodology, and operational skills',
         description: selectedProjectName ? `Operational and process skills for ${selectedProjectName} delivery` : 'Process and methodological capabilities',
         icon: <Settings className="w-6 h-6" />,
         color: 'from-green-600 to-emerald-600',
         skills: transformSkills(projectData.skills.functional, 'functional', <Settings className="w-5 h-5" />)
       },
       {
         id: 'leadership',
         title: 'Leadership Skills',
         subtitle: selectedProjectName ? `Leadership skills for ${selectedProjectName} success` : 'Team leadership, communication, and soft skills',
         description: selectedProjectName ? `Leadership and interpersonal skills for ${selectedProjectName} team dynamics` : 'Leadership and soft skill competencies',
         icon: <Users className="w-6 h-6" />,
         color: 'from-orange-600 to-red-600',
         skills: transformSkills(projectData.skills.leadership, 'leadership', <Users className="w-5 h-5" />)
       }
     ]
  }

  const currentSkillSections = getProjectSkillSections()

  const getSkillLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'strong':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'okay':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'needs-improvement':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
    }
  }

  const getSkillLevelIcon = (level: SkillLevel) => {
    switch (level) {
      case 'strong':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'okay':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'needs-improvement':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
    }
  }

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
    }
  }

  const getGrowthIcon = (potential: string) => {
    switch (potential) {
      case 'high':
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-yellow-400" />
      case 'low':
        return <TrendingDown className="w-4 h-4 text-gray-400" />
    }
  }

  const currentSection = currentSkillSections.find(section => section.id === selectedSection)
  const filteredSkills = currentSection?.skills.filter(skill => 
    filter === 'all' || skill.level === filter
  ) || []

  // Calculate overall stats
  const allSkills = currentSkillSections.flatMap(section => section.skills)
  const strongSkills = allSkills.filter(skill => skill.level === 'strong').length
  const okaySkills = allSkills.filter(skill => skill.level === 'okay').length
  const improvementSkills = allSkills.filter(skill => skill.level === 'needs-improvement').length
  const highRelevanceSkills = allSkills.filter(skill => skill.projectRelevance === 'high').length

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              My Skills
              {selectedProjectName && (
                <span className="text-blue-400 text-xl ml-3 font-normal">
                  - {selectedProjectName}
                </span>
              )}
            </h1>
            <p className="text-gray-400">
              {projectData 
                ? `Skills relevant to ${projectData.dashboard.projectSpecific.name} project requirements` 
                : 'Track your skill development and alignment with project growth areas'
              }
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{strongSkills}</div>
              <div className="text-sm text-gray-400">Strong Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{okaySkills}</div>
              <div className="text-sm text-gray-400">Developing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{improvementSkills}</div>
              <div className="text-sm text-gray-400">Focus Areas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Skills Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentSkillSections.map((section) => {
            const sectionSkills = section.skills
            const avgProficiency = Math.round(
              sectionSkills.reduce((sum, skill) => sum + skill.proficiency, 0) / sectionSkills.length
            )
            const strongCount = sectionSkills.filter(skill => skill.level === 'strong').length
            
            return (
              <div
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`cursor-pointer rounded-xl p-6 border transition-all duration-300 ${
                  selectedSection === section.id
                    ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{section.title}</h3>
                    <p className="text-gray-400 text-sm">{sectionSkills.length} skills</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Average Proficiency</span>
                    <span className="text-sm font-medium text-white">{avgProficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${section.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${avgProficiency}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-green-400">
                    <Star className="w-3 h-3" />
                    <span>{strongCount} strong</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Section Details */}
        {currentSection && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${currentSection.color} flex items-center justify-center`}>
                  {currentSection.icon}
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{currentSection.title}</h2>
                  <p className="text-gray-400">{currentSection.description}</p>
                </div>
              </div>
              
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Skills</option>
                  <option value="strong">Strong</option>
                  <option value="okay">Developing</option>
                  <option value="needs-improvement">Needs Improvement</option>
                </select>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{skill.name}</h3>
                        <p className="text-gray-400 text-sm">Last assessed: {skill.lastAssessed}</p>
                      </div>
                    </div>
                    {getSkillLevelIcon(skill.level)}
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{skill.description}</p>

                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="text-sm font-medium text-white">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          skill.level === 'strong' ? 'bg-green-500' :
                          skill.level === 'okay' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Skill Metadata */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-xs font-medium ${getRelevanceColor(skill.projectRelevance)}`}>
                        {skill.projectRelevance.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500">Project Relevance</div>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      {getGrowthIcon(skill.growthPotential)}
                      <div className="text-xs text-gray-500">Growth Potential</div>
                    </div>
                    <div className="text-center">
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getSkillLevelColor(skill.level)}`}>
                        {skill.level.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Development Actions Preview */}
                  {skill.developmentActions && skill.developmentActions.length > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm text-gray-400 mb-2">Development Actions:</div>
                      <div className="text-sm text-gray-300">
                        {skill.developmentActions[0]}
                        {skill.developmentActions.length > 1 && (
                          <span className="text-gray-500"> +{skill.developmentActions.length - 1} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{selectedSkill.name}</h2>
                  <p className="text-gray-300 mt-1">{selectedSkill.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-400 transform rotate-45" />
              </button>
            </div>

            {/* Skill Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Proficiency Level</label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{selectedSkill.proficiency}%</span>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getSkillLevelColor(selectedSkill.level)}`}>
                        {selectedSkill.level.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          selectedSkill.level === 'strong' ? 'bg-green-500' :
                          selectedSkill.level === 'okay' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedSkill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Project Relevance</label>
                  <div className={`mt-1 font-medium ${getRelevanceColor(selectedSkill.projectRelevance)}`}>
                    {selectedSkill.projectRelevance.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Growth Potential</label>
                  <div className="mt-1 flex items-center space-x-2">
                    {getGrowthIcon(selectedSkill.growthPotential)}
                    <span className="text-white font-medium capitalize">{selectedSkill.growthPotential}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Last Assessed</label>
                  <div className="mt-1 text-white">{selectedSkill.lastAssessed}</div>
                </div>
              </div>
            </div>

            {/* Development Actions */}
            {selectedSkill.developmentActions && selectedSkill.developmentActions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Development Action Plan
                </h3>
                <div className="space-y-3">
                  {selectedSkill.developmentActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-200">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Focus on high project relevance skills for immediate impact
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Start Development</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 