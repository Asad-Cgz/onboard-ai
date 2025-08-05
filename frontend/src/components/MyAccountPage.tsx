'use client'

import React, { useState } from 'react'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Users, 
  Globe, 
  CreditCard,
  Edit3,
  Building,
  Home,
  AlertCircle,
  Target,
  TrendingUp,
  Plus,
  Save,
  X,
  Check
} from 'lucide-react'

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editingExperience, setEditingExperience] = useState<string | null>(null)

  // Sample user data
  const [userData, setUserData] = useState({
    overview: {
      name: "Jane Smith",
      role: "Sr. Manager",
      domain: "MKTG Europe & ME",
      homeManager: "Robert Johnson",
      seniorManager: "Sarah Williams",
      profileImage: "👩‍💼"
    },
    personal: {
      firstName: "Jane",
      middleName: "Elizabeth",
      lastName: "Smith",
      gender: "Female",
      pronouns: "She/Her",
      maritalStatus: "Married",
      dateOfBirth: "March 15, 1985",
      placeOfBirth: "London, United Kingdom"
    },
    contact: {
      homeAddress: {
        street: "42 Maple Street",
        city: "London",
        postalCode: "SW1A 1AA",
        country: "United Kingdom"
      },
      workLocation: {
        office: "Cognizant London Office",
        address: "1 Kingdom Street, Paddington, London W2 6BD",
        workNumber: "+44 20 7946 0958"
      },
      contactDetails: {
        mobileNumber: "+44 7700 900123",
        homeNumber: "+44 20 7946 0001",
        workEmail: "jane.smith@cognizant.com",
        personalEmail: "jane.e.smith@gmail.com"
      },
      emergencyContact: {
        name: "Michael Smith",
        relationship: "Spouse",
        phone: "+44 7700 900456",
        email: "michael.smith@email.com"
      }
    },
    nationalId: {
      country: "United Kingdom",
      idType: "National Insurance Number",
      idNumber: "AB 12 34 56 C",
      passportNumber: "123456789",
      passportExpiry: "March 2030"
    },
    citizenship: [
      { country: "United Kingdom", type: "Citizen by Birth", since: "1985" },
      { country: "Ireland", type: "EU Passport", since: "2010" }
    ],
    education: {
      degrees: [
        {
          institution: "University of Oxford",
          degree: "Master of Business Administration (MBA)",
          field: "Marketing & Strategy",
          year: "2009-2011",
          grade: "Distinction"
        },
        {
          institution: "London School of Economics",
          degree: "Bachelor of Science (BSc)",
          field: "Economics & Management",
          year: "2003-2006",
          grade: "First Class Honours"
        }
      ],
      certifications: [
        {
          name: "Certified Digital Marketing Professional",
          issuer: "Digital Marketing Institute",
          year: "2020",
          expiry: "2025"
        },
        {
          name: "Project Management Professional (PMP)",
          issuer: "Project Management Institute",
          year: "2018",
          expiry: "2027"
        },
        {
          name: "Google Analytics Certified",
          issuer: "Google",
          year: "2022",
          expiry: "2024"
        }
      ],
      memberships: [
        {
          organization: "Chartered Institute of Marketing (CIM)",
          membershipType: "Fellow",
          since: "2015"
        },
        {
          organization: "Marketing Society",
          membershipType: "Full Member",
          since: "2012"
        }
      ]
    },
    experience: {
      cognizant: [
        {
          id: "cog1",
          role: "Sr. Manager - Marketing Strategy",
          domain: "MKTG Europe & ME",
          startDate: "January 2020",
          endDate: "Present",
          duration: "4 years 8 months",
          responsibilities: [
            "Lead marketing strategy for European and Middle Eastern markets",
            "Manage team of 12 marketing professionals",
            "Drive digital transformation initiatives",
            "Oversee $2M annual marketing budget"
          ]
        },
        {
          id: "cog2",
          role: "Manager - Digital Marketing",
          domain: "MKTG Europe",
          startDate: "March 2017",
          endDate: "December 2019",
          duration: "2 years 10 months",
          responsibilities: [
            "Developed digital marketing campaigns",
            "Managed social media presence",
            "Implemented marketing automation tools",
            "Increased lead generation by 150%"
          ]
        }
      ],
      external: [
        {
          id: "ext1",
          company: "Accenture",
          role: "Senior Consultant - Marketing Technology",
          startDate: "September 2011",
          endDate: "June 2014",
          duration: "2 years 10 months",
          responsibilities: [
            "Implemented marketing technology solutions",
            "Led client workshops and training sessions",
            "Managed technical project deliverables"
          ]
        }
      ]
    },
    goals: {
      skillsGoals: [
        {
          id: "sg1",
          skill: "Data Analytics & AI",
          currentLevel: "Intermediate",
          targetLevel: "Expert",
          deadline: "December 2024",
          progress: 65,
          actions: ["Complete Google Data Analytics Certificate", "Work on AI/ML project", "Attend advanced workshops"]
        },
        {
          id: "sg2",
          skill: "Leadership & Management",
          currentLevel: "Advanced",
          targetLevel: "Expert",
          deadline: "June 2025",
          progress: 80,
          actions: ["Complete Executive Leadership Program", "Mentor junior team members", "Lead cross-functional projects"]
        }
      ],
      projectGoals: [
        {
          id: "pg1",
          project: "Digital Transformation Initiative",
          objective: "Lead the implementation of new marketing automation platform across EMEA",
          deadline: "March 2025",
          progress: 45,
          milestones: ["Requirements gathering (Complete)", "Vendor selection (Complete)", "Implementation (In Progress)", "Training & rollout (Pending)"]
        },
        {
          id: "pg2",
          project: "Team Development Program",
          objective: "Develop and implement comprehensive training program for marketing team",
          deadline: "August 2024",
          progress: 75,
          milestones: ["Needs assessment (Complete)", "Curriculum design (Complete)", "Content creation (In Progress)", "Program launch (Pending)"]
        }
      ]
    }
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User, color: 'blue' },
    { id: 'personal', label: 'Personal Info', icon: User, color: 'green' },
    { id: 'contact', label: 'Contact Details', icon: Phone, color: 'purple' },
    { id: 'identity', label: 'Identity & Citizenship', icon: CreditCard, color: 'orange' },
    { id: 'education', label: 'Education & Certifications', icon: GraduationCap, color: 'indigo' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'pink' },
    { id: 'goals', label: 'Goals & Development', icon: Target, color: 'emerald' }
  ]

  const handleSaveExperience = (type: 'cognizant' | 'external', id: string, updatedData: any) => {
    setUserData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        [type]: prev.experience[type].map(exp => 
          exp.id === id ? { ...exp, ...updatedData } : exp
        )
      }
    }))
    setEditingExperience(null)
  }

  const handleAddGoal = (type: 'skillsGoals' | 'projectGoals') => {
    const newGoal = type === 'skillsGoals' 
      ? {
          id: `sg${Date.now()}`,
          skill: "New Skill",
          currentLevel: "Beginner",
          targetLevel: "Intermediate",
          deadline: "December 2024",
          progress: 0,
          actions: []
        }
      : {
          id: `pg${Date.now()}`,
          project: "New Project",
          objective: "Define project objective",
          deadline: "December 2024",
          progress: 0,
          milestones: []
        }

    setUserData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [type]: [...prev.goals[type], newGoal]
      }
    }))
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-8xl">{userData.overview.profileImage}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userData.overview.name}</h1>
              <p className="text-2xl opacity-90 mb-1">{userData.overview.role}</p>
              <p className="text-xl opacity-75">{userData.overview.domain}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-sm opacity-75">Employee ID</div>
              <div className="text-lg font-semibold">CTS789456</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Years at Cognizant</p>
              <p className="text-2xl font-bold text-gray-800">10+</p>
            </div>
            <Building className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Experience</p>
              <p className="text-2xl font-bold text-gray-800">18+</p>
            </div>
            <Briefcase className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Team Size</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <Users className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Goals</p>
              <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
            <Target className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Reporting Structure */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-blue-600" />
            Reporting Structure
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600 font-medium">Home Manager:</span>
              <span className="font-semibold text-gray-800">{userData.overview.homeManager}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Senior Manager:</span>
              <span className="font-semibold text-gray-800">{userData.overview.seniorManager}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
            Recent Achievements
          </h3>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-800 font-medium">Q3 2024 Excellence Award</p>
              <p className="text-xs text-green-600">Outstanding team leadership</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800 font-medium">Digital Transformation Lead</p>
              <p className="text-xs text-blue-600">Successfully launched automation platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGoals = () => (
    <div className="space-y-8">
      {/* Skills Goals */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <GraduationCap className="w-7 h-7 mr-3 text-blue-600" />
            Skills Development Goals
          </h3>
          <button 
            onClick={() => handleAddGoal('skillsGoals')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>
        
        <div className="grid gap-6">
          {userData.goals.skillsGoals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{goal.skill}</h4>
                  <p className="text-sm text-gray-600">{goal.currentLevel} → {goal.targetLevel}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Target: {goal.deadline}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Action Items:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {goal.actions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Goals */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            Project Goals
          </h3>
          <button 
            onClick={() => handleAddGoal('projectGoals')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>
        
        <div className="grid gap-6">
          {userData.goals.projectGoals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{goal.project}</h4>
                  <p className="text-gray-600 mt-1">{goal.objective}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Due: {goal.deadline}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Milestones:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {goal.milestones.map((milestone, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`w-4 h-4 rounded-full mr-2 mt-0.5 flex-shrink-0 ${
                        milestone.includes('Complete') ? 'bg-green-500' : 
                        milestone.includes('In Progress') ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}></div>
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPersonal = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
        <User className="w-7 h-7 mr-3 text-green-600" />
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {Object.entries(userData.personal).slice(0, 4).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <p className="text-lg text-gray-800 font-medium">{value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {Object.entries(userData.personal).slice(4).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <p className="text-lg text-gray-800 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Home className="w-6 h-6 mr-3 text-purple-600" />
            Home Address
          </h3>
          <div className="text-gray-800 space-y-2">
            <p className="text-lg">{userData.contact.homeAddress.street}</p>
            <p className="text-lg">{userData.contact.homeAddress.city}, {userData.contact.homeAddress.postalCode}</p>
            <p className="text-lg">{userData.contact.homeAddress.country}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Building className="w-6 h-6 mr-3 text-purple-600" />
            Work Location
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Office</label>
              <p className="text-lg text-gray-800 font-medium">{userData.contact.workLocation.office}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              <p className="text-gray-800">{userData.contact.workLocation.address}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Work Number</label>
              <p className="text-lg text-gray-800 font-medium">{userData.contact.workLocation.workNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-purple-600" />
            Contact Details
          </h3>
          <div className="space-y-4">
            {Object.entries(userData.contact.contactDetails).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <p className="text-lg text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
            Emergency Contact
          </h3>
          <div className="space-y-4">
            {Object.entries(userData.contact.emergencyContact).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key}</label>
                <p className="text-lg text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderIdentity = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <CreditCard className="w-7 h-7 mr-3 text-orange-600" />
          National Identification
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {Object.entries(userData.nationalId).slice(0, 3).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <p className="text-lg text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {Object.entries(userData.nationalId).slice(3).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <p className="text-lg text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Globe className="w-7 h-7 mr-3 text-orange-600" />
          Citizenship Details
        </h3>
        <div className="space-y-6">
          {userData.citizenship.map((citizenship, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xl font-medium text-gray-800">{citizenship.country}</p>
                  <p className="text-gray-600">{citizenship.type}</p>
                </div>
                <span className="text-gray-500">Since {citizenship.since}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEducation = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <GraduationCap className="w-7 h-7 mr-3 text-indigo-600" />
          Education
        </h3>
        <div className="space-y-6">
          {userData.education.degrees.map((degree, index) => (
            <div key={index} className="border-l-4 border-indigo-500 pl-6 py-4">
              <h4 className="text-xl font-medium text-gray-800">{degree.degree}</h4>
              <p className="text-lg text-gray-600">{degree.institution}</p>
              <p className="text-gray-500">{degree.field} • {degree.year} • {degree.grade}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-indigo-600" />
            Certifications
          </h3>
          <div className="space-y-4">
            {userData.education.certifications.map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800">{cert.name}</h4>
                <p className="text-gray-600 text-sm">{cert.issuer}</p>
                <p className="text-xs text-gray-500">Issued: {cert.year} • Expires: {cert.expiry}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-indigo-600" />
            Professional Memberships
          </h3>
          <div className="space-y-4">
            {userData.education.memberships.map((membership, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <p className="font-medium text-gray-800">{membership.organization}</p>
                <p className="text-sm text-gray-600">{membership.membershipType}</p>
                <span className="text-xs text-gray-500">Since {membership.since}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="space-y-8">
      {/* Cognizant Experience */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Building className="w-7 h-7 mr-3 text-blue-600" />
            Cognizant Experience
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {userData.experience.cognizant.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800">{exp.role}</h4>
                  <p className="text-lg text-gray-600">{exp.domain}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate} • {exp.duration}</p>
                </div>
                <button 
                  onClick={() => setEditingExperience(exp.id)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              {editingExperience === exp.id ? (
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={6}
                    defaultValue={exp.responsibilities.join('\n')}
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSaveExperience('cognizant', exp.id, exp)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button 
                      onClick={() => setEditingExperience(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="text-gray-600 space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* External Experience */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Briefcase className="w-7 h-7 mr-3 text-gray-600" />
            External Experience
          </h3>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {userData.experience.external.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800">{exp.role}</h4>
                  <p className="text-lg text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate} • {exp.duration}</p>
                </div>
                <button 
                  onClick={() => setEditingExperience(exp.id)}
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              {editingExperience === exp.id ? (
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={6}
                    defaultValue={exp.responsibilities.join('\n')}
                  />
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSaveExperience('external', exp.id, exp)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button 
                      onClick={() => setEditingExperience(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="text-gray-600 space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'personal': return renderPersonal()
      case 'contact': return renderContact()
      case 'identity': return renderIdentity()
      case 'education': return renderEducation()
      case 'experience': return renderExperience()
      case 'goals': return renderGoals()
      default: return renderOverview()
    }
  }

  return (
    <div className="flex-1 bg-slate-900 min-h-screen overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900 px-8 pt-8 pb-6 mb-8 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">My Account</h1>
            <p className="text-gray-400">Manage your personal and professional information</p>
          </div>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="px-8 mb-8">
        <div className="bg-slate-800 rounded-lg p-1">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 font-medium transition-all whitespace-nowrap rounded-md ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-600 text-white`
                      : 'text-gray-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 pb-8">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default MyAccountPage 