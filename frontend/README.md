# ElevateHub Frontend

**Accelerating Talent Journeys - Seamless, Smart, Cognizant**

A modern, gamified dashboard UI for developer onboarding and team management built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Dashboard** - Interactive metrics and analytics for onboarding progress
- **Team Management** - Comprehensive team directory with detailed member profiles
- **Gamified Experience** - Progress tracking, achievements, and engagement metrics
- **Responsive Design** - Optimized for desktop and mobile devices
- **Dark Theme** - Professional dark UI with colorful accents
- **Real-time Interactions** - Live notifications and messaging
- **Bot Integration** - AI-powered assistant for onboarding support

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)

## 🚀 Quick Start

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Creates an optimized production build |
| `npm start` | Starts the production server (requires build first) |
| `npm run lint` | Runs ESLint to check code quality |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles and Tailwind
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── CircularProgress.tsx # Progress wheel component
│   │   ├── Dashboard.tsx       # Main dashboard layout
│   │   ├── MetricCard.tsx      # Metric display cards
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── TeamPage.tsx        # Team directory page
│   │   └── TrendChart.tsx      # Analytics charts
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Common utilities
│   ├── assets/                 # Static assets
│   ├── store/                  # State management
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Additional utilities
│   └── views/                  # Page views
├── public/                     # Static files
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── README.md                  # This file
```

## 🎨 Key Components

### Dashboard
- **Metric Cards**: To-Do, Learning Progress, Growth Alignment, Bot Interactions
- **Analytics Charts**: Learning & engagement trends
- **Progress Tracking**: Circular progress indicators
- **Quick Actions**: Recent activities and recommended tasks

### Team Page
- **Hero Section**: Floating team member avatars with animations
- **Department Breakdown**: Organized by Cognizant and Client teams
- **Member Profiles**: Detailed modal views with skills and contact info
- **Interactive Elements**: Hover effects and smooth transitions

### Sidebar Navigation
- **Brand Identity**: ElevateHub logo and tagline
- **Navigation Sections**: Dashboard, Projects, Learning, Tools
- **Progress Indicator**: Onboarding completion percentage
- **User Profile**: Current user information and status

## 🎯 Getting Started with Development

### 1. Component Development
Components are located in `src/components/`. Each component is self-contained with TypeScript interfaces.

### 2. Styling
- Uses Tailwind CSS utility classes
- Custom colors defined in `tailwind.config.js`
- Global styles in `src/app/globals.css`

### 3. Adding New Pages
Create new pages in the `src/app/` directory following Next.js App Router conventions.

### 4. State Management
Utilize React hooks for local state or extend the `src/store/` directory for global state.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or run on different port
npm run dev -- -p 3001
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new components
3. Ensure responsive design with Tailwind CSS
4. Test components across different screen sizes
5. Update documentation as needed

## 📞 Support

For questions or issues, please contact the development team or create an issue in the project repository.

---

**ElevateHub** - Transforming the onboarding experience with modern, intuitive design and seamless user interactions. 