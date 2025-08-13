// Project-specific data for Insurance Digital Platform and FinTech Payment Gateway

export interface ProjectDashboardData {
  metrics: {
    todos: { value: string; trend: string }
    learningProgress: { value: string; trend: string }
    growthAlignment: { value: string; trend: string }
    botInteractions: { value: string; trend: string }
  }
  projectSpecific: {
    name: string
    description: string
    keyMetrics: Array<{
      title: string
      value: string
      trend: string
      color: string
    }>
  }
}

export interface ProjectTeamData {
  leadership: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email: string
    skills?: string[]
    bio: string
    avatar: string
  }>
  developers: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email?: string
    skills?: string[]
    bio?: string
    avatar: string
  }>
  design: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email?: string
    skills?: string[]
    bio?: string
    avatar: string
  }>
  security: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email?: string
    skills?: string[]
    bio?: string
    avatar: string
  }>
  business: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email?: string
    skills?: string[]
    bio?: string
    avatar: string
  }>
  client: Array<{
    id: string
    name: string
    role: string
    department: string
    location: string
    email?: string
    skills?: string[]
    bio?: string
    avatar: string
  }>
}

export interface ProjectSkillsData {
  technical: Array<{
    skill: string
    level: 'strong' | 'okay' | 'needs-work'
    priority: 'high' | 'medium' | 'low'
    projectRelevance: string
  }>
  domain: Array<{
    skill: string
    level: 'strong' | 'okay' | 'needs-work'
    priority: 'high' | 'medium' | 'low'
    projectRelevance: string
  }>
  functional: Array<{
    skill: string
    level: 'strong' | 'okay' | 'needs-work'
    priority: 'high' | 'medium' | 'low'
    projectRelevance: string
  }>
  leadership: Array<{
    skill: string
    level: 'strong' | 'okay' | 'needs-work'
    priority: 'high' | 'medium' | 'low'
    projectRelevance: string
  }>
}

export interface ProjectOnboardingData {
  phases: Array<{
    id: number
    title: string
    description: string
    status: 'completed' | 'current' | 'upcoming'
    duration: string
    tasks: Array<{
      id: string
      title: string
      completed: boolean
      description?: string
    }>
  }>
  overallProgress: number
}

export interface ProjectToolsData {
  currentTools: Array<{
    id: string
    name: string
    category: string
    version: string
    status: 'installed' | 'pending' | 'requested'
    description: string
    size: string
    installDate?: string
    lastUsed?: string
    required: boolean
    license: string
  }>
  recommendedTools: Array<{
    id: string
    name: string
    category: string
    version: string
    description: string
    size: string
    required: boolean
    license: string
  }>
  deprecatedTools: Array<{
    id: string
    name: string
    category: string
    version: string
    description: string
    size: string
    lastUsed?: string
    license: string
  }>
}

export interface ProjectLearningData {
  projectPaths: Array<{
    id: string
    title: string
    description: string
    category: string
    totalModules: number
    completedModules: number
    estimatedTime: string
    difficulty: string
    modules: Array<{
      id: string
      title: string
      type: 'video' | 'document' | 'interactive'
      duration: string
      completed: boolean
      resources: Array<{
        type: 'video' | 'document' | 'interactive'
        title: string
        url: string
        duration?: string
        pages?: number
      }>
    }>
  }>
  selfPaths: Array<{
    id: string
    title: string
    description: string
    category: string
    totalModules: number
    completedModules: number
    estimatedTime: string
    difficulty: string
  }>
}

export interface ProjectBotData {
  quickActions: Array<{
    id: string
    label: string
    prompt: string
    category: string
  }>
  projectContext: {
    name: string
    domain: string
    keyAreas: string[]
    commonQuestions: string[]
  }
  suggestions: string[]
}

// Insurance Digital Platform Data
export const insuranceProjectData = {
  dashboard: {
    metrics: {
      todos: { value: "4", trend: "System Setup Tasks" },
      learningProgress: { value: "78%", trend: "Insurance Domain Learning" },
      growthAlignment: { value: "4.8/5", trend: "Excellent Fit" },
      botInteractions: { value: "18", trend: "Claims Processing Help" }
    },
    projectSpecific: {
      name: "Insurance Digital Platform",
      description: "Modernizing legacy insurance systems with digital-first approach",
      keyMetrics: [
        { title: "Claims Processed", value: "1,247", trend: "+12%", color: "blue" },
        { title: "Policy Renewals", value: "89%", trend: "+5%", color: "green" },
        { title: "Customer Satisfaction", value: "4.6/5", trend: "+0.3", color: "purple" },
        { title: "System Uptime", value: "99.8%", trend: "+0.1%", color: "orange" }
      ]
    }
  } as ProjectDashboardData,

  team: {
    leadership: [
      {
        id: 'sarin-insurance',
        name: 'Sarin',
        role: 'Technical Director',
        department: 'leadership',
        location: 'London, UK',
        email: 'sarin@cognizant.com',
        skills: ['Insurance Domain', 'Digital Transformation', 'Team Leadership'],
        bio: 'Leading digital transformation in insurance sector with 15+ years experience.',
        avatar: '👨🏽‍💼'
      },
      {
        id: 'raja-insurance',
        name: 'Raja',
        role: 'Engineering Manager',
        department: 'leadership',
        location: 'London, UK',
        email: 'raja@cognizant.com',
        skills: ['Claims Processing', 'Agile Methodologies', 'Team Management'],
        bio: 'Specialized in insurance claims automation and policy management systems.',
        avatar: '👨🏽'
      },
      {
        id: 'priya-pm',
        name: 'Priya Sharma',
        role: 'Project Manager',
        department: 'leadership',
        location: 'London, UK',
        email: 'priya.sharma@cognizant.com',
        skills: ['Project Management', 'Stakeholder Management', 'Risk Assessment'],
        bio: 'Managing large-scale insurance digital transformation projects with proven delivery track record.',
        avatar: '👩🏽‍💼'
      }
    ],
    developers: [
      {
        id: 'asad-insurance',
        name: 'Asad',
        role: 'Lead Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'asad@cognizant.com',
        skills: ['React', 'Node.js', 'Insurance APIs', 'PostgreSQL'],
        bio: 'Expert in building scalable insurance platforms and claim processing systems.',
        avatar: '👨🏻‍💻'
      },
      {
        id: 'maya-insurance',
        name: 'Maya',
        role: 'Senior QA Engineer',
        department: 'testing-team',
        location: 'London, UK',
        skills: ['Insurance Testing', 'Automation', 'Compliance Validation'],
        bio: 'Ensuring insurance systems meet regulatory requirements and quality standards.',
        avatar: '👩🏽‍💻'
      },
      {
        id: 'david-fullstack',
        name: 'David Chen',
        role: 'Full Stack Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'david.chen@cognizant.com',
        skills: ['TypeScript', 'React', 'Express.js', 'Insurance Domain'],
        bio: 'Building responsive web applications for insurance customer portals and agent dashboards.',
        avatar: '👨🏻‍💻'
      },
      {
        id: 'sophia-backend',
        name: 'Sophia Rodriguez',
        role: 'Backend Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'sophia.rodriguez@cognizant.com',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Insurance APIs'],
        bio: 'Developing robust backend services for claims processing and policy management.',
        avatar: '👩🏽‍💻'
      },
      {
        id: 'alex-devops',
        name: 'Alex Thompson',
        role: 'DevOps Engineer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'alex.thompson@cognizant.com',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        bio: 'Managing cloud infrastructure and deployment pipelines for insurance applications.',
        avatar: '👨🏼‍💻'
      },
      {
        id: 'lisa-qa',
        name: 'Lisa Park',
        role: 'QA Automation Engineer',
        department: 'testing-team',
        location: 'London, UK',
        email: 'lisa.park@cognizant.com',
        skills: ['Selenium', 'Jest', 'Insurance Testing', 'Performance Testing'],
        bio: 'Automating testing workflows for insurance claim processing and policy management.',
        avatar: '👩🏻‍💻'
      }
    ],
    design: [
      {
        id: 'emma-ux',
        name: 'Emma Wilson',
        role: 'Senior UX Designer',
        department: 'design-team',
        location: 'London, UK',
        email: 'emma.wilson@cognizant.com',
        skills: ['User Research', 'Insurance UX', 'Figma', 'Accessibility'],
        bio: 'Designing intuitive user experiences for insurance customers and agents.',
        avatar: '👩🏼‍🎨'
      },
      {
        id: 'james-ui',
        name: 'James Miller',
        role: 'UI Designer',
        department: 'design-team',
        location: 'London, UK',
        email: 'james.miller@cognizant.com',
        skills: ['Visual Design', 'Design Systems', 'Prototyping', 'Branding'],
        bio: 'Creating beautiful and consistent visual designs for insurance digital platforms.',
        avatar: '👨🏼‍🎨'
      }
    ],
    security: [
      {
        id: 'raj-security',
        name: 'Raj Patel',
        role: 'Security Architect',
        department: 'security-team',
        location: 'London, UK',
        email: 'raj.patel@cognizant.com',
        skills: ['Cybersecurity', 'Insurance Compliance', 'Data Protection', 'Penetration Testing'],
        bio: 'Ensuring insurance systems meet highest security standards and regulatory compliance.',
        avatar: '👨🏽‍💻'
      },
      {
        id: 'anna-compliance',
        name: 'Anna Johnson',
        role: 'Compliance Specialist',
        department: 'security-team',
        location: 'London, UK',
        email: 'anna.johnson@cognizant.com',
        skills: ['GDPR', 'SOX Compliance', 'Risk Management', 'Audit Preparation'],
        bio: 'Managing regulatory compliance and risk assessment for insurance digital transformation.',
        avatar: '👩🏻‍💼'
      }
    ],
    business: [
      {
        id: 'sarah-ba',
        name: 'Sarah Williams',
        role: 'Senior Business Analyst',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'sarah.williams@cognizant.com',
        skills: ['Insurance Domain', 'Requirements Analysis', 'Stakeholder Management'],
        bio: 'Bridging business needs with technical solutions in insurance domain.',
        avatar: '👩🏻‍💼'
      },
      {
        id: 'michael-ba',
        name: 'Michael Davis',
        role: 'Business Analyst',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'michael.davis@cognizant.com',
        skills: ['Process Mapping', 'User Stories', 'Insurance Workflows', 'Documentation'],
        bio: 'Analyzing and documenting insurance business processes for digital transformation.',
        avatar: '��🏻‍💼'
      },
      {
        id: 'rachel-scrum',
        name: 'Rachel Green',
        role: 'Scrum Master',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'rachel.green@cognizant.com',
        skills: ['Agile Coaching', 'Sprint Planning', 'Team Facilitation', 'Impediment Removal'],
        bio: 'Facilitating agile practices and ensuring smooth delivery of insurance platform features.',
        avatar: '👩🏼‍💼'
      }
    ],
    client: [
      {
        id: 'john-client',
        name: 'John Richardson',
        role: 'Insurance Product Manager',
        department: 'client-side',
        location: 'London, UK',
        email: 'john.richardson@globalinsurance.com',
        skills: ['Product Strategy', 'Insurance Products', 'Market Analysis'],
        bio: 'Product owner for digital transformation at Global Insurance Corp.',
        avatar: '👨🏻‍💼'
      },
      {
        id: 'emma-client',
        name: 'Emma Thompson',
        role: 'Claims Director',
        department: 'client-side',
        location: 'London, UK',
        email: 'emma.thompson@globalinsurance.com',
        skills: ['Claims Management', 'Process Optimization', 'Customer Experience'],
        bio: 'Overseeing claims processing modernization and automation initiatives.',
        avatar: '👩🏼‍💼'
      },
      {
        id: 'robert-cto',
        name: 'Robert Clarke',
        role: 'Chief Technology Officer',
        department: 'client-side',
        location: 'London, UK',
        email: 'robert.clarke@globalinsurance.com',
        skills: ['Technology Strategy', 'Digital Transformation', 'Innovation Leadership'],
        bio: 'Leading technology vision and digital innovation at Global Insurance Corp.',
        avatar: '👨🏼‍💼'
      },
      {
        id: 'jennifer-ops',
        name: 'Jennifer Brown',
        role: 'Operations Manager',
        department: 'client-side',
        location: 'London, UK',
        email: 'jennifer.brown@globalinsurance.com',
        skills: ['Operations Management', 'Process Improvement', 'Team Coordination'],
        bio: 'Managing day-to-day operations and ensuring smooth business processes.',
        avatar: '👩🏻‍💼'
      }
    ]
  } as ProjectTeamData,
  skills: {
    technical: [
      { skill: 'React Development', level: 'strong', priority: 'high', projectRelevance: 'Core for customer portals' },
      { skill: 'Node.js Backend', level: 'strong', priority: 'high', projectRelevance: 'API development for claims' },
      { skill: 'PostgreSQL', level: 'okay', priority: 'high', projectRelevance: 'Policy data management' },
      { skill: 'Insurance APIs', level: 'needs-work', priority: 'high', projectRelevance: 'Third-party integrations' },
      { skill: 'Docker/Kubernetes', level: 'okay', priority: 'medium', projectRelevance: 'Deployment & scaling' }
    ],
    domain: [
      { skill: 'Insurance Fundamentals', level: 'okay', priority: 'high', projectRelevance: 'Understanding business context' },
      { skill: 'Claims Processing', level: 'needs-work', priority: 'high', projectRelevance: 'Core business workflow' },
      { skill: 'Policy Management', level: 'needs-work', priority: 'high', projectRelevance: 'Customer lifecycle management' },
      { skill: 'Regulatory Compliance', level: 'needs-work', priority: 'medium', projectRelevance: 'GDPR, SOX compliance' }
    ],
    functional: [
      { skill: 'Agile Methodologies', level: 'strong', priority: 'medium', projectRelevance: 'Sprint planning & delivery' },
      { skill: 'Stakeholder Communication', level: 'okay', priority: 'high', projectRelevance: 'Client interaction' },
      { skill: 'Requirements Analysis', level: 'okay', priority: 'medium', projectRelevance: 'Understanding user needs' },
      { skill: 'Testing & QA', level: 'strong', priority: 'medium', projectRelevance: 'Ensuring system reliability' }
    ],
    leadership: [
      { skill: 'Team Collaboration', level: 'strong', priority: 'high', projectRelevance: 'Cross-functional teamwork' },
      { skill: 'Mentoring', level: 'okay', priority: 'medium', projectRelevance: 'Knowledge sharing' },
      { skill: 'Decision Making', level: 'okay', priority: 'medium', projectRelevance: 'Technical choices' }
    ]
  } as ProjectSkillsData,

  onboarding: {
    phases: [
      {
        id: 1,
        title: 'Insurance Domain Foundation',
        description: 'Understanding insurance fundamentals and business context',
        status: 'completed' as const,
        duration: '2 weeks',
        tasks: [
          { id: 'ins-1', title: 'Complete Insurance 101 Training', completed: true, description: 'Basic insurance concepts and terminology' },
          { id: 'ins-2', title: 'Study Claims Processing Workflow', completed: true, description: 'End-to-end claims handling process' },
          { id: 'ins-3', title: 'Review Policy Management System', completed: true, description: 'Current system capabilities and limitations' }
        ]
      },
      {
        id: 2,
        title: 'Technical Environment Setup',
        description: 'Setting up development environment and tools',
        status: 'current' as const,
        duration: '1 week',
        tasks: [
          { id: 'tech-1', title: 'Install Development Tools', completed: true, description: 'Node.js, Docker, PostgreSQL setup' },
          { id: 'tech-2', title: 'Access Insurance APIs', completed: false, description: 'Get credentials for third-party insurance APIs' },
          { id: 'tech-3', title: 'Run Local Insurance Platform', completed: false, description: 'Set up and run the insurance platform locally' }
        ]
      },
      {
        id: 3,
        title: 'Claims System Deep Dive',
        description: 'Understanding claims processing architecture',
        status: 'upcoming' as const,
        duration: '2 weeks',
        tasks: [
          { id: 'claims-1', title: 'Study Claims Data Model', completed: false, description: 'Database schema and relationships' },
          { id: 'claims-2', title: 'Review Claims API Endpoints', completed: false, description: 'REST API documentation and testing' },
          { id: 'claims-3', title: 'Practice Claims Workflow', completed: false, description: 'Handle sample claims end-to-end' }
        ]
      },
      {
        id: 4,
        title: 'Development & Contribution',
        description: 'Start contributing to the insurance platform',
        status: 'upcoming' as const,
        duration: '4 weeks',
        tasks: [
          { id: 'dev-1', title: 'Complete First Bug Fix', completed: false, description: 'Resolve an insurance-related bug' },
          { id: 'dev-2', title: 'Implement Small Feature', completed: false, description: 'Add new functionality to claims system' },
          { id: 'dev-3', title: 'Code Review Participation', completed: false, description: 'Review team members\' insurance-related code' }
        ]
      }
    ],
    overallProgress: 35
  } as ProjectOnboardingData,

  tools: {
    currentTools: [
      {
        id: 'salesforce',
        name: 'Salesforce DevOps',
        category: 'CRM',
        version: '2024.1',
        status: 'installed' as const,
        description: 'Customer relationship management platform for insurance clients',
        size: '2.3 GB',
        installDate: '2024-01-15',
        lastUsed: '2 hours ago',
        required: true,
        license: 'Enterprise'
      },
      {
        id: 'postman',
        name: 'Postman Enterprise',
        category: 'API Testing',
        version: '10.22.5',
        status: 'installed' as const,
        description: 'API development and testing environment',
        size: '485 MB',
        installDate: '2024-01-15',
        lastUsed: '1 day ago',
        required: true,
        license: 'Team'
      },
      {
        id: 'security-scanner',
        name: 'Security Scanner Pro',
        category: 'Security',
        version: '3.8.2',
        status: 'pending' as const,
        description: 'Advanced security scanning for insurance applications',
        size: '1.2 GB',
        required: true,
        license: 'Enterprise'
      }
    ],
    recommendedTools: [
      {
        id: 'tableau',
        name: 'Tableau Desktop',
        category: 'Analytics',
        version: '2024.1.2',
        description: 'Data visualization for insurance business intelligence',
        size: '1.8 GB',
        required: false,
        license: 'Professional'
      }
    ],
    deprecatedTools: [
      {
        id: 'legacy-insurance-db',
        name: 'Legacy Insurance Database Client',
        category: 'Database',
        version: '8.1.4',
        description: 'Old insurance database client no longer needed',
        size: '3.2 GB',
        lastUsed: '3 months ago',
        license: 'Legacy'
      }
    ]
  } as ProjectToolsData,

  learning: {
    projectPaths: [
      {
        id: 'insurance-fundamentals',
        title: 'Insurance Industry Fundamentals',
        description: 'Core concepts and domain knowledge for insurance projects',
        category: 'Domain Knowledge',
        totalModules: 6,
        completedModules: 2,
        estimatedTime: '8 hours',
        difficulty: 'Beginner',
        modules: [
          {
            id: 'insurance-basics',
            title: 'Insurance Basics & Types',
            type: 'video' as const,
            duration: '90 min',
            completed: true,
            resources: [
              { type: 'video', title: 'Introduction to Insurance', url: '#', duration: '45 min' },
              { type: 'document', title: 'Insurance Types Guide', url: '#', pages: 25 }
            ]
          },
          {
            id: 'claims-processing',
            title: 'Claims Processing Workflow',
            type: 'interactive' as const,
            duration: '120 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Claims Simulation', url: '#', duration: '60 min' },
              { type: 'document', title: 'Claims Process Manual', url: '#', pages: 40 }
            ]
          }
        ]
      },
      {
        id: 'company-adventure',
        title: '🏢 Global Insurance Corp - Company Adventure Quest',
        description: 'An immersive gamified journey through your new company!',
        category: 'Company Culture',
        totalModules: 8,
        completedModules: 4,
        estimatedTime: '6 hours',
        difficulty: 'Beginner',
        modules: [
          {
            id: 'company-intro-game',
            title: '🎮 Company Overview Adventure',
            type: 'interactive' as const,
            duration: '45 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Interactive Company Timeline Game', url: '#', duration: '30 min' },
              { type: 'video', title: '🎬 CEO Welcome Message with Audio Tour', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'department-maze',
            title: '🧩 Department Discovery Maze',
            type: 'interactive' as const,
            duration: '40 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Virtual Office Explorer Game', url: '#', duration: '25 min' },
              { type: 'video', title: '📹 Department Head Intro Videos', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'culture-quiz-challenge',
            title: '🎯 Company Culture Quiz Challenge',
            type: 'interactive' as const,
            duration: '30 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Fun Culture & Values Quiz Game', url: '#', duration: '20 min' },
              { type: 'video', title: '🎵 Company Values Rap Video', url: '#', duration: '10 min' }
            ]
          },
          {
            id: 'client-relationship-sim',
            title: '🤝 Client Relationship Simulator',
            type: 'interactive' as const,
            duration: '50 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Client Meeting Role-Play Game', url: '#', duration: '35 min' },
              { type: 'video', title: '📚 Client Success Stories Audio Documentary', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'office-survival-guide',
            title: '☕ Office Survival Guide Game',
            type: 'interactive' as const,
            duration: '35 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Coffee Machine & Printer Adventures', url: '#', duration: '20 min' },
              { type: 'video', title: '😄 Funny Office Tips & Tricks Video', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'innovation-lab',
            title: '💡 Innovation Lab Challenge',
            type: 'interactive' as const,
            duration: '60 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Product Innovation Brainstorm Game', url: '#', duration: '40 min' },
              { type: 'video', title: '🚀 Innovation Success Stories Podcast', url: '#', duration: '20 min' }
            ]
          },
          {
            id: 'leadership-spotlight',
            title: '⭐ Leadership Spotlight Series',
            type: 'video' as const,
            duration: '45 min',
            completed: false,
            resources: [
              { type: 'video', title: '🎤 Executive Leadership Interview Series', url: '#', duration: '30 min' },
              { type: 'interactive', title: 'Leadership Style Quiz', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'company-trivia-master',
            title: '🏆 Company Trivia Master Championship',
            type: 'interactive' as const,
            duration: '40 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Ultimate Company Knowledge Quiz', url: '#', duration: '25 min' },
              { type: 'video', title: '🎉 Winner Celebration & Company Facts', url: '#', duration: '15 min' }
            ]
          }
        ]
      },
      {
        id: 'salesforce-training',
        title: 'Salesforce for Insurance',
        description: 'Platform-specific training for insurance CRM',
        category: 'Technical Training',
        totalModules: 4,
        completedModules: 0,
        estimatedTime: '6 hours',
        difficulty: 'Intermediate',
        modules: [
          {
            id: 'salesforce-basics',
            title: 'Salesforce Navigation & Setup',
            type: 'video' as const,
            duration: '60 min',
            completed: false,
            resources: [
              { type: 'video', title: 'Salesforce Overview', url: '#', duration: '30 min' }
            ]
          }
        ]
      }
    ],
    selfPaths: [
      {
        id: 'advanced-java',
        title: 'Advanced Java for Enterprise',
        description: 'Advanced Java concepts for large-scale applications',
        category: 'Technical Skills',
        totalModules: 8,
        completedModules: 3,
        estimatedTime: '12 hours',
        difficulty: 'Advanced'
      }
    ]
  } as ProjectLearningData,

  bot: {
    quickActions: [
      {
        id: 'insurance-basics',
        label: 'Insurance Basics',
        prompt: 'Can you explain the basic concepts of the insurance industry that I need to know for this project?',
        category: 'domain'
      },
      {
        id: 'claims-help',
        label: 'Claims Processing',
        prompt: 'How does the claims processing system work in our insurance platform?',
        category: 'technical'
      },
      {
        id: 'salesforce-help',
        label: 'Salesforce Guidance',
        prompt: 'I need help with Salesforce configuration for insurance workflows.',
        category: 'tools'
      },
      {
        id: 'compliance-questions',
        label: 'Compliance & Security',
        prompt: 'What are the key compliance requirements for insurance applications?',
        category: 'domain'
      }
    ],
    projectContext: {
      name: 'Insurance Digital Platform',
      domain: 'Insurance & Financial Services',
      keyAreas: ['Claims Processing', 'Policy Management', 'Customer Service', 'Compliance'],
      commonQuestions: [
        'How do I process a new insurance claim?',
        'What are the different types of insurance policies?',
        'How does underwriting work?',
        'What compliance standards do we follow?'
      ]
    },
    suggestions: [
      'Ask about claims processing workflow',
      'Learn about insurance regulations',
      'Get help with Salesforce setup'
    ]
  } as ProjectBotData
}

// FinTech Payment Gateway Data
export const fintechProjectData = {
  dashboard: {
    metrics: {
      todos: { value: "6", trend: "Security Setup Tasks" },
      learningProgress: { value: "45%", trend: "FinTech Domain Learning" },
      growthAlignment: { value: "4.2/5", trend: "Strong Match" },
      botInteractions: { value: "23", trend: "Payment Security Help" }
    },
    projectSpecific: {
      name: "FinTech Payment Gateway",
      description: "Building secure, scalable payment processing system",
      keyMetrics: [
        { title: "Transactions/Sec", value: "2,500", trend: "+25%", color: "green" },
        { title: "Success Rate", value: "99.7%", trend: "+0.2%", color: "blue" },
        { title: "Fraud Detection", value: "0.02%", trend: "-0.01%", color: "red" },
        { title: "API Latency", value: "45ms", trend: "-5ms", color: "purple" }
      ]
    }
  } as ProjectDashboardData,

  team: {
    leadership: [
      {
        id: 'sarin-insurance',
        name: 'Sarin',
        role: 'Technical Director',
        department: 'leadership',
        location: 'London, UK',
        email: 'sarin@cognizant.com',
        skills: ['Insurance Domain', 'Digital Transformation', 'Team Leadership'],
        bio: 'Leading digital transformation in insurance sector with 15+ years experience.',
        avatar: '👨🏽‍💼'
      },
      {
        id: 'raja-insurance',
        name: 'Raja',
        role: 'Engineering Manager',
        department: 'leadership',
        location: 'London, UK',
        email: 'raja@cognizant.com',
        skills: ['Claims Processing', 'Agile Methodologies', 'Team Management'],
        bio: 'Specialized in insurance claims automation and policy management systems.',
        avatar: '👨🏽'
      },
      {
        id: 'priya-pm',
        name: 'Priya Sharma',
        role: 'Project Manager',
        department: 'leadership',
        location: 'London, UK',
        email: 'priya.sharma@cognizant.com',
        skills: ['Project Management', 'Stakeholder Management', 'Risk Assessment'],
        bio: 'Managing large-scale insurance digital transformation projects with proven delivery track record.',
        avatar: '👩🏽‍💼'
      }
    ],
    developers: [
      {
        id: 'asad-insurance',
        name: 'Asad',
        role: 'Lead Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'asad@cognizant.com',
        skills: ['React', 'Node.js', 'Insurance APIs', 'PostgreSQL'],
        bio: 'Expert in building scalable insurance platforms and claim processing systems.',
        avatar: '👨🏻‍💻'
      },
      {
        id: 'maya-insurance',
        name: 'Maya',
        role: 'Senior QA Engineer',
        department: 'testing-team',
        location: 'London, UK',
        skills: ['Insurance Testing', 'Automation', 'Compliance Validation'],
        bio: 'Ensuring insurance systems meet regulatory requirements and quality standards.',
        avatar: '👩🏽‍💻'
      },
      {
        id: 'david-fullstack',
        name: 'David Chen',
        role: 'Full Stack Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'david.chen@cognizant.com',
        skills: ['TypeScript', 'React', 'Express.js', 'Insurance Domain'],
        bio: 'Building responsive web applications for insurance customer portals and agent dashboards.',
        avatar: '👨🏻‍💻'
      },
      {
        id: 'sophia-backend',
        name: 'Sophia Rodriguez',
        role: 'Backend Developer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'sophia.rodriguez@cognizant.com',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Insurance APIs'],
        bio: 'Developing robust backend services for claims processing and policy management.',
        avatar: '👩🏽‍💻'
      },
      {
        id: 'alex-devops',
        name: 'Alex Thompson',
        role: 'DevOps Engineer',
        department: 'dev-team',
        location: 'London, UK',
        email: 'alex.thompson@cognizant.com',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        bio: 'Managing cloud infrastructure and deployment pipelines for insurance applications.',
        avatar: '👨🏼‍💻'
      },
      {
        id: 'lisa-qa',
        name: 'Lisa Park',
        role: 'QA Automation Engineer',
        department: 'testing-team',
        location: 'London, UK',
        email: 'lisa.park@cognizant.com',
        skills: ['Selenium', 'Jest', 'Insurance Testing', 'Performance Testing'],
        bio: 'Automating testing workflows for insurance claim processing and policy management.',
        avatar: '👩🏻‍💻'
      }
    ],
    design: [
      {
        id: 'emma-ux',
        name: 'Emma Wilson',
        role: 'Senior UX Designer',
        department: 'design-team',
        location: 'London, UK',
        email: 'emma.wilson@cognizant.com',
        skills: ['User Research', 'Insurance UX', 'Figma', 'Accessibility'],
        bio: 'Designing intuitive user experiences for insurance customers and agents.',
        avatar: '👩🏼‍🎨'
      },
      {
        id: 'james-ui',
        name: 'James Miller',
        role: 'UI Designer',
        department: 'design-team',
        location: 'London, UK',
        email: 'james.miller@cognizant.com',
        skills: ['Visual Design', 'Design Systems', 'Prototyping', 'Branding'],
        bio: 'Creating beautiful and consistent visual designs for insurance digital platforms.',
        avatar: '👨🏼‍🎨'
      }
    ],
    security: [
      {
        id: 'raj-security',
        name: 'Raj Patel',
        role: 'Security Architect',
        department: 'security-team',
        location: 'London, UK',
        email: 'raj.patel@cognizant.com',
        skills: ['Cybersecurity', 'Insurance Compliance', 'Data Protection', 'Penetration Testing'],
        bio: 'Ensuring insurance systems meet highest security standards and regulatory compliance.',
        avatar: '👨🏽‍💻'
      },
      {
        id: 'anna-compliance',
        name: 'Anna Johnson',
        role: 'Compliance Specialist',
        department: 'security-team',
        location: 'London, UK',
        email: 'anna.johnson@cognizant.com',
        skills: ['GDPR', 'SOX Compliance', 'Risk Management', 'Audit Preparation'],
        bio: 'Managing regulatory compliance and risk assessment for insurance digital transformation.',
        avatar: '👩🏻‍💼'
      }
    ],
    business: [
      {
        id: 'sarah-ba',
        name: 'Sarah Williams',
        role: 'Senior Business Analyst',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'sarah.williams@cognizant.com',
        skills: ['Insurance Domain', 'Requirements Analysis', 'Stakeholder Management'],
        bio: 'Bridging business needs with technical solutions in insurance domain.',
        avatar: '👩🏻‍💼'
      },
      {
        id: 'michael-ba',
        name: 'Michael Davis',
        role: 'Business Analyst',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'michael.davis@cognizant.com',
        skills: ['Process Mapping', 'User Stories', 'Insurance Workflows', 'Documentation'],
        bio: 'Analyzing and documenting insurance business processes for digital transformation.',
        avatar: '��🏻‍💼'
      },
      {
        id: 'rachel-scrum',
        name: 'Rachel Green',
        role: 'Scrum Master',
        department: 'business-analyst',
        location: 'London, UK',
        email: 'rachel.green@cognizant.com',
        skills: ['Agile Coaching', 'Sprint Planning', 'Team Facilitation', 'Impediment Removal'],
        bio: 'Facilitating agile practices and ensuring smooth delivery of insurance platform features.',
        avatar: '👩🏼‍💼'
      }
    ],
    client: [
      {
        id: 'john-client',
        name: 'John Richardson',
        role: 'Insurance Product Manager',
        department: 'client-side',
        location: 'London, UK',
        email: 'john.richardson@globalinsurance.com',
        skills: ['Product Strategy', 'Insurance Products', 'Market Analysis'],
        bio: 'Product owner for digital transformation at Global Insurance Corp.',
        avatar: '👨🏻‍💼'
      },
      {
        id: 'emma-client',
        name: 'Emma Thompson',
        role: 'Claims Director',
        department: 'client-side',
        location: 'London, UK',
        email: 'emma.thompson@globalinsurance.com',
        skills: ['Claims Management', 'Process Optimization', 'Customer Experience'],
        bio: 'Overseeing claims processing modernization and automation initiatives.',
        avatar: '👩🏼‍💼'
      },
      {
        id: 'robert-cto',
        name: 'Robert Clarke',
        role: 'Chief Technology Officer',
        department: 'client-side',
        location: 'London, UK',
        email: 'robert.clarke@globalinsurance.com',
        skills: ['Technology Strategy', 'Digital Transformation', 'Innovation Leadership'],
        bio: 'Leading technology vision and digital innovation at Global Insurance Corp.',
        avatar: '👨🏼‍💼'
      },
      {
        id: 'jennifer-ops',
        name: 'Jennifer Brown',
        role: 'Operations Manager',
        department: 'client-side',
        location: 'London, UK',
        email: 'jennifer.brown@globalinsurance.com',
        skills: ['Operations Management', 'Process Improvement', 'Team Coordination'],
        bio: 'Managing day-to-day operations and ensuring smooth business processes.',
        avatar: '👩🏻‍💼'
      }
    ]
  } as ProjectTeamData,
  skills: {
    technical: [
      { skill: 'Java Development', level: 'strong', priority: 'high', projectRelevance: 'Core backend language' },
      { skill: 'Spring Boot', level: 'okay', priority: 'high', projectRelevance: 'Microservices framework' },
      { skill: 'Payment APIs', level: 'needs-work', priority: 'high', projectRelevance: 'Stripe, PayPal integration' },
      { skill: 'Redis Caching', level: 'needs-work', priority: 'high', projectRelevance: 'High-performance caching' },
      { skill: 'Kafka Messaging', level: 'needs-work', priority: 'medium', projectRelevance: 'Event-driven architecture' },
      { skill: 'MongoDB', level: 'okay', priority: 'medium', projectRelevance: 'Transaction data storage' }
    ],
    domain: [
      { skill: 'Payment Processing', level: 'needs-work', priority: 'high', projectRelevance: 'Core business domain' },
      { skill: 'Financial Regulations', level: 'needs-work', priority: 'high', projectRelevance: 'Compliance requirements' },
      { skill: 'Fraud Detection', level: 'needs-work', priority: 'high', projectRelevance: 'Security & risk management' },
      { skill: 'PCI DSS Compliance', level: 'needs-work', priority: 'high', projectRelevance: 'Payment security standards' },
      { skill: 'Multi-Currency Support', level: 'needs-work', priority: 'medium', projectRelevance: 'Global payment processing' }
    ],
    functional: [
      { skill: 'Security Best Practices', level: 'okay', priority: 'high', projectRelevance: 'Financial data protection' },
      { skill: 'Performance Optimization', level: 'okay', priority: 'high', projectRelevance: 'High-throughput requirements' },
      { skill: 'API Design', level: 'strong', priority: 'medium', projectRelevance: 'Gateway interface design' },
      { skill: 'Load Testing', level: 'needs-work', priority: 'medium', projectRelevance: 'Ensuring system scalability' }
    ],
    leadership: [
      { skill: 'Risk Assessment', level: 'needs-work', priority: 'high', projectRelevance: 'Financial risk evaluation' },
      { skill: 'Cross-team Coordination', level: 'okay', priority: 'medium', projectRelevance: 'Security & development alignment' },
      { skill: 'Technical Documentation', level: 'strong', priority: 'medium', projectRelevance: 'API documentation' }
    ]
  } as ProjectSkillsData,

  onboarding: {
    phases: [
      {
        id: 1,
        title: 'FinTech & Payment Fundamentals',
        description: 'Understanding payment processing and financial technology',
        status: 'completed' as const,
        duration: '2 weeks',
        tasks: [
          { id: 'fin-1', title: 'Payment Systems Overview', completed: true, description: 'Understanding payment flows and stakeholders' },
          { id: 'fin-2', title: 'Security & Compliance Training', completed: true, description: 'PCI DSS, fraud prevention basics' }
        ]
      },
      {
        id: 2,
        title: 'Technical Architecture Setup',
        description: 'Setting up development environment for payment systems',
        status: 'current' as const,
        duration: '1.5 weeks',
        tasks: [
          { id: 'arch-1', title: 'Java & Spring Boot Setup', completed: true, description: 'Development environment configuration' },
          { id: 'arch-2', title: 'Payment Gateway APIs', completed: false, description: 'Test environment access for Stripe/PayPal' },
          { id: 'arch-3', title: 'Security Tools Setup', completed: false, description: 'Encryption libraries and security scanners' }
        ]
      },
      {
        id: 3,
        title: 'Payment Processing Deep Dive',
        description: 'Understanding core payment workflows',
        status: 'upcoming' as const,
        duration: '3 weeks',
        tasks: [
          { id: 'pay-1', title: 'Transaction Lifecycle', completed: false, description: 'From initiation to settlement' },
          { id: 'pay-2', title: 'Fraud Detection Systems', completed: false, description: 'Real-time fraud prevention' },
          { id: 'pay-3', title: 'Multi-Currency Processing', completed: false, description: 'Currency conversion and rates' }
        ]
      },
      {
        id: 4,
        title: 'Development & Security Implementation',
        description: 'Building secure payment features',
        status: 'upcoming' as const,
        duration: '4 weeks',
        tasks: [
          { id: 'dev-1', title: 'Implement Payment Endpoint', completed: false, description: 'Build secure payment processing API' },
          { id: 'dev-2', title: 'Add Fraud Detection', completed: false, description: 'Integrate fraud prevention mechanisms' },
          { id: 'dev-3', title: 'Security Testing', completed: false, description: 'Penetration testing and vulnerability assessment' }
        ]
      }
    ],
    overallProgress: 25
  } as ProjectOnboardingData,

  tools: {
    currentTools: [
      {
        id: 'stripe-sdk',
        name: 'Stripe Payment SDK',
        category: 'Payment Processing',
        version: '12.18.0',
        status: 'installed' as const,
        description: 'Comprehensive payment processing SDK',
        size: '156 MB',
        installDate: '2024-01-10',
        lastUsed: '3 hours ago',
        required: true,
        license: 'Commercial'
      },
      {
        id: 'redis-enterprise',
        name: 'Redis Enterprise',
        category: 'Database',
        version: '7.2.4',
        status: 'installed' as const,
        description: 'In-memory database for caching and sessions',
        size: '890 MB',
        installDate: '2024-01-10',
        lastUsed: '1 hour ago',
        required: true,
        license: 'Enterprise'
      },
      {
        id: 'fraud-detection',
        name: 'AI Fraud Detection Engine',
        category: 'Security',
        version: '4.1.2',
        status: 'pending' as const,
        description: 'Machine learning-based fraud prevention',
        size: '2.1 GB',
        required: true,
        license: 'Enterprise'
      }
    ],
    recommendedTools: [
      {
        id: 'grafana',
        name: 'Grafana Analytics',
        category: 'Monitoring',
        version: '10.2.3',
        description: 'Real-time payment analytics and monitoring',
        size: '245 MB',
        required: false,
        license: 'Open Source'
      }
    ],
    deprecatedTools: [
      {
        id: 'legacy-payment-lib',
        name: 'Legacy Payment Library',
        category: 'Payment Processing',
        version: '2.1.4',
        description: 'Old payment library replaced by Stripe',
        size: '890 MB',
        lastUsed: '2 months ago',
        license: 'Legacy'
      }
    ]
  } as ProjectToolsData,

  learning: {
    projectPaths: [
      {
        id: 'fintech-fundamentals',
        title: 'FinTech & Payment Systems',
        description: 'Core concepts in financial technology and payment processing',
        category: 'Domain Knowledge',
        totalModules: 5,
        completedModules: 1,
        estimatedTime: '7 hours',
        difficulty: 'Intermediate',
        modules: [
          {
            id: 'payment-basics',
            title: 'Payment Processing Fundamentals',
            type: 'video' as const,
            duration: '75 min',
            completed: true,
            resources: [
              { type: 'video', title: 'How Payment Systems Work', url: '#', duration: '45 min' },
              { type: 'document', title: 'Payment Rails Guide', url: '#', pages: 30 }
            ]
          },
          {
            id: 'fraud-prevention',
            title: 'Fraud Detection & Prevention',
            type: 'interactive' as const,
            duration: '90 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Fraud Scenarios Simulation', url: '#', duration: '60 min' },
              { type: 'document', title: 'Fraud Prevention Strategies', url: '#', pages: 35 }
            ]
          }
        ]
      },
      {
        id: 'fintech-company-quest',
        title: '🚀 FinTech Innovations Corp - Digital Adventure',
        description: 'Explore your cutting-edge FinTech company through interactive games!',
        category: 'Company Culture',
        totalModules: 8,
        completedModules: 3,
        estimatedTime: '5.5 hours',
        difficulty: 'Beginner',
        modules: [
          {
            id: 'fintech-intro-adventure',
            title: '💳 FinTech Company Journey',
            type: 'interactive' as const,
            duration: '40 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Payment Revolution Timeline Game', url: '#', duration: '25 min' },
              { type: 'video', title: '🎬 Founder Story: From Startup to Unicorn', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'tech-team-explorer',
            title: '👨‍💻 Tech Team Explorer Quest',
            type: 'interactive' as const,
            duration: '45 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Engineering Department Virtual Tour', url: '#', duration: '30 min' },
              { type: 'video', title: '🔧 Day in the Life: FinTech Developer', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'innovation-mindset-quiz',
            title: '🧠 Innovation Mindset Challenge',
            type: 'interactive' as const,
            duration: '35 min',
            completed: true,
            resources: [
              { type: 'interactive', title: 'Disruptive Thinking Quiz Game', url: '#', duration: '20 min' },
              { type: 'video', title: '🎵 FinTech Revolution Anthem', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'customer-experience-sim',
            title: '😊 Customer Experience Simulator',
            type: 'interactive' as const,
            duration: '50 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Customer Journey Mapping Game', url: '#', duration: '35 min' },
              { type: 'video', title: '📱 Customer Success Stories Podcast', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'startup-culture-game',
            title: '🌟 Startup Culture Adventure',
            type: 'interactive' as const,
            duration: '30 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Ping Pong & Pizza: Office Culture Game', url: '#', duration: '20 min' },
              { type: 'video', title: '🍕 Office Life Behind the Scenes', url: '#', duration: '10 min' }
            ]
          },
          {
            id: 'security-hero-training',
            title: '🛡️ Security Hero Training',
            type: 'interactive' as const,
            duration: '45 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Cybersecurity Defense Game', url: '#', duration: '30 min' },
              { type: 'video', title: '🦸‍♂️ Security Team Hero Stories', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'product-vision-quest',
            title: '🎯 Product Vision Quest',
            type: 'interactive' as const,
            duration: '55 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Future Product Brainstorm Game', url: '#', duration: '40 min' },
              { type: 'video', title: '🚀 Product Roadmap Vision Talk', url: '#', duration: '15 min' }
            ]
          },
          {
            id: 'fintech-trivia-championship',
            title: '🏅 FinTech Trivia Championship',
            type: 'interactive' as const,
            duration: '40 min',
            completed: false,
            resources: [
              { type: 'interactive', title: 'Ultimate FinTech Knowledge Battle', url: '#', duration: '25 min' },
              { type: 'video', title: '🎊 Championship Celebration & Fun Facts', url: '#', duration: '15 min' }
            ]
          }
        ]
      },
      {
        id: 'stripe-integration',
        title: 'Stripe Payment Integration',
        description: 'Implementing Stripe payments in web applications',
        category: 'Technical Training',
        totalModules: 6,
        completedModules: 0,
        estimatedTime: '8 hours',
        difficulty: 'Advanced',
        modules: [
          {
            id: 'stripe-setup',
            title: 'Stripe Account & API Setup',
            type: 'video' as const,
            duration: '45 min',
            completed: false,
            resources: [
              { type: 'video', title: 'Stripe Dashboard Overview', url: '#', duration: '25 min' }
            ]
          }
        ]
      }
    ],
    selfPaths: [
      {
        id: 'blockchain-basics',
        title: 'Blockchain & Cryptocurrency',
        description: 'Understanding distributed ledgers and crypto payments',
        category: 'Emerging Technology',
        totalModules: 10,
        completedModules: 2,
        estimatedTime: '15 hours',
        difficulty: 'Advanced'
      }
    ]
  } as ProjectLearningData,

  bot: {
    quickActions: [
      {
        id: 'payment-help',
        label: 'Payment Processing',
        prompt: 'How do I implement secure payment processing in our FinTech application?',
        category: 'technical'
      },
      {
        id: 'fraud-questions',
        label: 'Fraud Prevention',
        prompt: 'What are the best practices for fraud detection in payment systems?',
        category: 'domain'
      },
      {
        id: 'stripe-help',
        label: 'Stripe Integration',
        prompt: 'I need help integrating Stripe payment gateway into our system.',
        category: 'tools'
      },
      {
        id: 'compliance-fintech',
        label: 'Financial Compliance',
        prompt: 'What regulatory compliance requirements apply to our payment gateway?',
        category: 'domain'
      }
    ],
    projectContext: {
      name: 'FinTech Payment Gateway',
      domain: 'Financial Technology',
      keyAreas: ['Payment Processing', 'Fraud Detection', 'Security', 'Compliance'],
      commonQuestions: [
        'How do I process credit card payments securely?',
        'What is PCI DSS compliance?',
        'How does fraud detection work?',
        'What are payment rails and networks?'
      ]
    },
    suggestions: [
      'Ask about payment security best practices',
      'Learn about PCI DSS compliance',
      'Get help with Stripe webhooks'
    ]
  } as ProjectBotData
}

export const getProjectData = (projectId: string | null) => {
  switch (projectId) {
    case 'insurance-2024':
      return insuranceProjectData
    case 'fintech-2024':
      return fintechProjectData
    default:
      return null
  }
} 