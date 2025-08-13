'use client'

import React, { useState } from 'react'
import { Users, MapPin, Mail, Phone, Linkedin, Github, X, Calendar, Award, Target } from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { getProjectData } from '@/data/projectData'

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  location?: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  skills?: string[]
  bio?: string
  avatar: string
}

const teamData: TeamMember[] = [
  // Cognizant Leadership
  {
    id: '1',
    name: 'Sarin',
    role: 'Technical Director',
    department: 'leadership',
    location: 'London, UK',
    email: 'sarin@cognizant.com',
    skills: ['Strategic Planning', 'Team Leadership', 'Digital Transformation'],
    bio: 'Experienced technical leader with 15+ years in enterprise solutions and digital transformation.',
    avatar: '👨🏽‍💼'
  },
  {
    id: '2',
    name: 'Raja',
    role: 'Engineering Manager',
    department: 'leadership',
    location: 'London, UK',
    email: 'raja@cognizant.com',
    skills: ['Engineering Excellence', 'Agile Methodologies', 'Team Management'],
    bio: 'Passionate about building high-performing engineering teams and delivering innovative solutions.',
    avatar: '👨🏽'
  },
  {
    id: '3',
    name: 'Dipankar',
    role: 'Solution Architect',
    department: 'leadership',
    location: 'London, UK',
    email: 'dipankar@cognizant.com',
    skills: ['Solution Architecture', 'Cloud Technologies', 'System Design'],
    bio: 'Expert in designing scalable solutions and modern cloud architectures.',
    avatar: '👨🏽‍💻'
  },
  // Development Team
  {
    id: '4',
    name: 'Asad',
    role: 'Lead Developer',
    department: 'development',
    location: 'London, UK',
    email: 'asad@cognizant.com',
    skills: ['React', 'Node.js', 'TypeScript', 'Team Leadership'],
    bio: 'Full-stack developer with expertise in modern web technologies and team mentorship.',
    avatar: '👨🏻‍💻'
  },
  {
    id: '5',
    name: 'Sam',
    role: 'Senior Developer',
    department: 'development',
    location: 'London, UK',
    email: 'sam@cognizant.com',
    skills: ['Python', 'Django', 'PostgreSQL', 'API Development'],
    bio: 'Backend specialist focused on building robust and scalable server-side solutions.',
    avatar: '👨🏽‍💻'
  },
  {
    id: '6',
    name: 'Mayank',
    role: 'Frontend Developer',
    department: 'development',
    location: 'London, UK',
    email: 'mayank@cognizant.com',
    skills: ['React', 'Vue.js', 'Tailwind CSS', 'UI/UX'],
    bio: 'Creative frontend developer passionate about user experience and modern design.',
    avatar: '👨🏻'
  },
  {
    id: '7',
    name: 'Sangeetha',
    role: 'Full Stack Developer',
    department: 'development',
    location: 'London, UK',
    email: 'sangeetha@cognizant.com',
    skills: ['JavaScript', 'React', 'Express.js', 'MongoDB'],
    bio: 'Versatile developer with experience across the entire technology stack.',
    avatar: '👩🏽‍💻'
  },
  {
    id: '8',
    name: 'Shreyshi',
    role: 'Backend Developer',
    department: 'development',
    location: 'London, UK',
    email: 'shreyshi@cognizant.com',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    bio: 'Java expert specializing in microservices architecture and cloud deployment.',
    avatar: '👩🏻‍💻'
  },
  {
    id: '9',
    name: 'Anooj',
    role: 'DevOps Engineer',
    department: 'development',
    location: 'London, UK',
    email: 'anooj@cognizant.com',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    bio: 'DevOps specialist focused on automation, containerization, and cloud infrastructure.',
    avatar: '👨🏽‍💻'
  },
  // Testing Team
  {
    id: '10',
    name: 'Anjana',
    role: 'QA Lead',
    department: 'testing',
    location: 'London, UK',
    email: 'anjana@cognizant.com',
    skills: ['Test Automation', 'Selenium', 'API Testing', 'Quality Assurance'],
    bio: 'Quality assurance expert with extensive experience in automated testing frameworks.',
    avatar: '👩🏽‍💼'
  },
  {
    id: '11',
    name: 'Sunitha',
    role: 'Test Engineer',
    department: 'testing',
    location: 'London, UK',
    email: 'sunitha@cognizant.com',
    skills: ['Manual Testing', 'Test Planning', 'Bug Tracking', 'Mobile Testing'],
    bio: 'Detail-oriented tester ensuring high-quality deliverables through comprehensive testing.',
    avatar: '👩🏽'
  },
  // Business Analyst
  {
    id: '12',
    name: 'Favour',
    role: 'Business Analyst / Scrum Master',
    department: 'business',
    location: 'London, UK',
    email: 'favour@cognizant.com',
    skills: ['Agile Methodologies', 'Requirements Analysis', 'Stakeholder Management', 'Scrum'],
    bio: 'Experienced business analyst and scrum master bridging business needs with technical solutions.',
    avatar: '👨🏿‍💼'
  },
  // Client Side
  {
    id: '13',
    name: 'Jane',
    role: 'Project Manager',
    department: 'client',
    location: 'London, UK',
    email: 'jane@client.com',
    skills: ['Project Management', 'Strategic Planning', 'Team Coordination', 'Stakeholder Management'],
    bio: 'Senior project manager with expertise in leading cross-functional teams and delivering complex projects.',
    avatar: '👩🏼‍💼'
  },
  {
    id: '14',
    name: 'Mally',
    role: 'Product Owner',
    department: 'client',
    location: 'London, UK',
    email: 'mally@client.com',
    skills: ['Product Strategy', 'User Experience', 'Market Analysis', 'Agile Product Management'],
    bio: 'Product strategist focused on delivering user-centric solutions that drive business value.',
    avatar: '👩🏼'
  }
]

const departmentConfig = {
  leadership: {
    title: 'Leadership Team',
    subtitle: 'Strategic direction and technical excellence',
    color: 'from-blue-500 to-purple-600'
  },
  'dev-team': {
    title: 'Development Team',
    subtitle: 'Building innovative solutions with cutting-edge technology',
    color: 'from-green-500 to-blue-500'
  },
  'testing-team': {
    title: 'Quality Assurance',
    subtitle: 'Ensuring excellence through comprehensive testing',
    color: 'from-orange-500 to-red-500'
  },
  'design-team': {
    title: 'Design & UX',
    subtitle: 'Creating beautiful and intuitive user experiences',
    color: 'from-pink-500 to-rose-500'
  },
  'security-team': {
    title: 'Security & Compliance',
    subtitle: 'Protecting systems and ensuring regulatory compliance',
    color: 'from-red-500 to-orange-500'
  },
  'business-analyst': {
    title: 'Business Analysis & Scrum',
    subtitle: 'Bridging business needs with technical solutions',
    color: 'from-purple-500 to-pink-500'
  },
  'client-side': {
    title: 'Client Team',
    subtitle: 'Strategic partnership and project leadership',
    color: 'from-cyan-500 to-blue-500'
  }
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const { selectedProjectId, selectedProjectName } = useProject()
  const projectData = getProjectData(selectedProjectId)
  
  // Use project-specific team data if available, otherwise fall back to default
  const currentTeamData = projectData ? 
    [...projectData.team.leadership, ...projectData.team.developers, ...(projectData.team.design || []), ...(projectData.team.security || []), ...projectData.team.business, ...projectData.team.client] :
    teamData

  const getDepartmentMembers = (dept: string) => {
    return currentTeamData.filter(member => member.department === dept)
  }

  const renderTeamSection = (department: string) => {
    const members = getDepartmentMembers(department)
    const config = departmentConfig[department as keyof typeof departmentConfig]
    
    if (members.length === 0) return null

    return (
      <section key={department} className="mb-16">
        <div className="mb-8">
          <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${config.color} text-white font-semibold mb-4`}>
            {config.title}
          </div>
          <p className="text-gray-400 text-lg">{config.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 border border-gray-700/50 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              {/* Avatar */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                  {member.avatar}
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center mb-4">
                <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                {member.location && (
                  <div className="flex items-center justify-center text-gray-400 text-xs mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {member.location}
                  </div>
                )}
              </div>

              {/* Skills */}
              {member.skills && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-md">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="flex justify-center space-x-3">
                {member.email && (
                  <button className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <button className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 px-8 py-20 overflow-hidden">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-white text-5xl font-bold mb-4">
            {selectedProjectName ? `${selectedProjectName} Team` : 'Our Team'}
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            {projectData 
              ? `Meet the dedicated team working on ${projectData.dashboard.projectSpecific.name}` 
              : 'Explore Our Success Stories and Innovative Projects'
            }
          </p>
        </div>

        {/* Team Members Hero Display */}
        <div className="relative max-w-6xl mx-auto">
          {/* Floating team member circles */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center">
            {teamData.slice(0, 8).map((member, index) => (
              <div
                key={member.id}
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-110 ${
                  index % 2 === 0 ? 'mt-8 hero-float' : 'mb-8 hero-float-delayed'
                }`}
                onClick={() => setSelectedMember(member)}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 glow">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl md:text-4xl overflow-hidden border-2 border-slate-700/50">
                    {member.avatar}
                  </div>
                </div>
                {/* Floating name tag */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700">
                    <p className="text-white text-xs font-medium whitespace-nowrap">{member.name}</p>
                    <p className="text-gray-400 text-xs">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show remaining members if more than 8 */}
          {teamData.length > 8 && (
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-3 bg-gray-800/50 rounded-full px-6 py-3 border border-gray-700">
                <div className="flex -space-x-2">
                  {teamData.slice(8, 11).map((member) => (
                    <div
                      key={member.id}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-sm border-2 border-slate-900"
                    >
                      {member.avatar}
                    </div>
                  ))}
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  +{teamData.length - 8} more team members
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        {/* Additional floating particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-80 animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Navigation Header - Moved Below Hero */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm px-8 py-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold mb-1">Team Directory</h2>
            <p className="text-gray-400">Detailed breakdown by departments and expertise</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">{teamData.length} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      <div className="px-8 pb-8">
        {/* Overview Cards */}
        <div className="mb-12">
          {/* Cognizant Side */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              Cognizant Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {['leadership', 'dev-team', 'testing-team', 'design-team', 'security-team', 'business-analyst'].map((dept) => {
                const config = departmentConfig[dept as keyof typeof departmentConfig]
                const memberCount = getDepartmentMembers(dept).length
                return (
                  <div
                    key={dept}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} mb-3 flex items-center justify-center`}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">{config.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">{memberCount} members</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Client Side */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
              Client Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 max-w-md">
              {['client-side'].map((dept) => {
                const config = departmentConfig[dept as keyof typeof departmentConfig]
                const memberCount = getDepartmentMembers(dept).length
                return (
                  <div
                    key={dept}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} mb-3 flex items-center justify-center`}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">{config.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">{memberCount} members</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Team Sections - Cognizant Side First, Client Side Last */}
        
        {/* Cognizant Side Teams */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="px-6 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
              <span className="text-blue-400 font-semibold text-sm">COGNIZANT TEAMS</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          {renderTeamSection('leadership')}
          {renderTeamSection('dev-team')}
          {renderTeamSection('testing-team')}
          {renderTeamSection('design-team')}
          {renderTeamSection('security-team')}
          {renderTeamSection('business-analyst')}
        </div>

        {/* Client Side Teams */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="px-6 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              <span className="text-cyan-400 font-semibold text-sm">CLIENT TEAM</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          </div>
          {renderTeamSection('client-side')}
        </div>
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  {selectedMember.avatar}
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{selectedMember.name}</h2>
                  <p className="text-blue-400 font-medium">{selectedMember.role}</p>
                  {selectedMember.location && (
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedMember.location}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Bio */}
            {selectedMember.bio && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-400" />
                  About
                </h3>
                <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
              </div>
            )}

            {/* Skills */}
            {selectedMember.skills && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-green-400" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm rounded-lg border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-400" />
                Contact Information
              </h3>
              <div className="space-y-3">
                {selectedMember.email && (
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{selectedMember.email}</span>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                      Send Email
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">LinkedIn Profile</span>
                  </div>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Department Info */}
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Department</h4>
                  <p className="text-gray-400 text-sm">
                    {departmentConfig[selectedMember.department as keyof typeof departmentConfig]?.title || 'Team Member'}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                  departmentConfig[selectedMember.department as keyof typeof departmentConfig]?.color || 'from-gray-500 to-gray-600'
                } flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 