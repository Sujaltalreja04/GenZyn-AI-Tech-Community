export interface Resource {
  title: string;
  type: string;
  duration: string;
  tag: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  downloads: number;
}

export interface ResourceCategory {
  category: string;
  icon: "map" | "tools" | "palette" | "clipboard" | "target" | "box";
  description: string;
  items: Resource[];
}

export const resourceCategories: ResourceCategory[] = [
  {
    category: "Learning Roadmaps",
    icon: "map",
    description: "Structured learning paths curated by industry experts",
    items: [
      { title: "Frontend Masterclass 2026", type: "Guide", duration: "12 Weeks", tag: "Beginner", description: "From HTML basics to advanced React patterns, animations, and performance optimization.", difficulty: "Beginner", downloads: 4200 },
      { title: "Fullstack Web3 Development", type: "Video Course", duration: "8 Weeks", tag: "Advanced", description: "Smart contracts, DeFi protocols, and frontend integration with ethers.js.", difficulty: "Advanced", downloads: 1800 },
      { title: "AI Engineering & LLMs", type: "Interactive", duration: "10 Weeks", tag: "Intermediate", description: "Build, fine-tune, and deploy large language models. Covers RAG, agents, and evaluation.", difficulty: "Intermediate", downloads: 5600 },
      { title: "System Design for Scale", type: "Articles", duration: "6 Weeks", tag: "Advanced", description: "Design distributed systems that handle millions of users. Real-world case studies.", difficulty: "Advanced", downloads: 3100 },
      { title: "Backend with Go", type: "Guide", duration: "8 Weeks", tag: "Intermediate", description: "Build high-performance APIs, microservices, and CLI tools with Go.", difficulty: "Intermediate", downloads: 2400 },
      { title: "Mobile Development with React Native", type: "Video Course", duration: "10 Weeks", tag: "Beginner", description: "Build cross-platform mobile apps from scratch. Covers navigation, state, and native modules.", difficulty: "Beginner", downloads: 3800 },
      { title: "Data Engineering Pipeline", type: "Interactive", duration: "8 Weeks", tag: "Advanced", description: "Design ETL pipelines, data lakes, and real-time streaming architectures.", difficulty: "Advanced", downloads: 1500 },
      { title: "DevOps Zero to Hero", type: "Guide", duration: "6 Weeks", tag: "Beginner", description: "Linux, Docker, CI/CD, Kubernetes — the complete DevOps learning path.", difficulty: "Beginner", downloads: 6200 },
    ]
  },
  {
    category: "Developer Tools",
    icon: "tools",
    description: "Boost your productivity with curated toolkits",
    items: [
      { title: "GenZyn Dev Environment", type: "Config", duration: "5 mins", tag: "Essential", description: "Our recommended development setup with dotfiles, shell config, and editor settings.", difficulty: "All Levels", downloads: 8900 },
      { title: "Ultimate VS Code Setup", type: "Extensions", duration: "10 mins", tag: "Productivity", description: "30+ curated extensions, keybindings, and snippets for maximum coding efficiency.", difficulty: "All Levels", downloads: 12000 },
      { title: "Terminal Mastery Toolkit", type: "CLI", duration: "2 Hours", tag: "Workflow", description: "Modern CLI tools: zoxide, fzf, ripgrep, bat, exa, and custom shell functions.", difficulty: "Intermediate", downloads: 4500 },
      { title: "Performance Profiling Kit", type: "Tool", duration: "Ongoing", tag: "Optimization", description: "Tools and techniques for profiling React, Node.js, and database performance.", difficulty: "Advanced", downloads: 2100 },
      { title: "Git Workflow Guide", type: "Guide", duration: "30 mins", tag: "Essential", description: "Branching strategies, commit conventions, PR templates, and advanced Git commands.", difficulty: "All Levels", downloads: 7600 },
      { title: "API Testing Toolkit", type: "Collection", duration: "15 mins", tag: "Testing", description: "Postman collections, Insomnia workspaces, and curl scripts for common API patterns.", difficulty: "Beginner", downloads: 3400 },
      { title: "Docker Compose Templates", type: "Templates", duration: "Instant", tag: "DevOps", description: "Ready-to-use Docker Compose files for common development stacks.", difficulty: "Intermediate", downloads: 5800 },
      { title: "Security Scanning Suite", type: "Tool", duration: "Ongoing", tag: "Security", description: "Automated vulnerability scanning, dependency auditing, and secret detection.", difficulty: "Intermediate", downloads: 1900 },
    ]
  },
  {
    category: "Design Assets",
    icon: "palette",
    description: "Premium design resources for developers",
    items: [
      { title: "Glass UI Figma Kit", type: "Design", duration: "Instant", tag: "UI/UX", description: "60+ glassmorphism components with dark mode variants and responsive layouts.", difficulty: "All Levels", downloads: 9200 },
      { title: "3D Icon Pack (Free)", type: "Assets", duration: "Instant", tag: "Graphics", description: "200+ hand-crafted 3D icons in PNG, SVG, and Lottie formats.", difficulty: "All Levels", downloads: 15000 },
      { title: "Color Palettes 2026", type: "Tokens", duration: "Instant", tag: "Branding", description: "50 curated color palettes with CSS variables, Tailwind config, and Figma tokens.", difficulty: "All Levels", downloads: 7800 },
      { title: "Animated Illustrations", type: "Lottie", duration: "Instant", tag: "Animations", description: "40+ smooth Lottie animations for empty states, loading, success, and error screens.", difficulty: "All Levels", downloads: 6100 },
      { title: "Typography Scale Generator", type: "Tool", duration: "Instant", tag: "Typography", description: "Generate responsive type scales with custom base size, ratio, and font pairing.", difficulty: "All Levels", downloads: 3200 },
      { title: "Landing Page Templates", type: "Templates", duration: "Instant", tag: "Web Design", description: "12 high-converting landing page designs in Figma with React source code.", difficulty: "Beginner", downloads: 8500 },
      { title: "Micro-Animation Library", type: "Code", duration: "Instant", tag: "Motion", description: "CSS and Framer Motion snippets for 100+ micro-interactions and transitions.", difficulty: "Intermediate", downloads: 4700 },
      { title: "Dashboard UI Kit", type: "Design", duration: "Instant", tag: "UI/UX", description: "Complete admin dashboard design system with charts, tables, forms, and nav patterns.", difficulty: "All Levels", downloads: 5400 },
    ]
  },
  {
    category: "Cheat Sheets",
    icon: "clipboard",
    description: "Quick reference guides for popular technologies",
    items: [
      { title: "React Hooks Cheat Sheet", type: "PDF", duration: "Instant", tag: "React", description: "Every React hook explained with examples, gotchas, and best practices.", difficulty: "All Levels", downloads: 18000 },
      { title: "TypeScript Advanced Types", type: "PDF", duration: "Instant", tag: "TypeScript", description: "Utility types, conditional types, mapped types, and template literal types.", difficulty: "Advanced", downloads: 11000 },
      { title: "SQL Query Optimization", type: "PDF", duration: "Instant", tag: "Database", description: "Index strategies, query plans, JOIN optimization, and common anti-patterns.", difficulty: "Intermediate", downloads: 5200 },
      { title: "Regex Patterns Collection", type: "Interactive", duration: "Instant", tag: "Fundamentals", description: "200+ tested regex patterns for emails, URLs, dates, passwords, and more.", difficulty: "All Levels", downloads: 9800 },
      { title: "Linux Commands Bible", type: "PDF", duration: "Instant", tag: "DevOps", description: "500+ essential Linux commands organized by category with real-world examples.", difficulty: "All Levels", downloads: 14000 },
      { title: "CSS Grid & Flexbox Visual Guide", type: "Interactive", duration: "Instant", tag: "CSS", description: "Visual playground for CSS Grid and Flexbox with copy-paste code snippets.", difficulty: "Beginner", downloads: 12500 },
      { title: "Python Data Science Quick Ref", type: "PDF", duration: "Instant", tag: "Python", description: "NumPy, Pandas, Matplotlib, and Scikit-learn — the essential methods at a glance.", difficulty: "Intermediate", downloads: 8700 },
      { title: "Kubernetes Commands Map", type: "PDF", duration: "Instant", tag: "DevOps", description: "kubectl commands, resource types, debugging, and cluster management cheat sheet.", difficulty: "Intermediate", downloads: 6300 },
    ]
  },
  {
    category: "Interview Prep",
    icon: "target",
    description: "Crack your next technical interview",
    items: [
      { title: "DSA Problem Set (200+)", type: "Interactive", duration: "Ongoing", tag: "Algorithms", description: "Curated problems organized by pattern: sliding window, two pointers, DFS/BFS, DP.", difficulty: "All Levels", downloads: 22000 },
      { title: "System Design Template", type: "Guide", duration: "2 Hours", tag: "Architecture", description: "Step-by-step framework for tackling any system design interview question.", difficulty: "Advanced", downloads: 15000 },
      { title: "Behavioral Interview Scripts", type: "Guide", duration: "1 Hour", tag: "Soft Skills", description: "STAR method templates, 50+ common questions, and company-specific tips.", difficulty: "All Levels", downloads: 9500 },
      { title: "Frontend Interview Handbook", type: "Guide", duration: "4 Hours", tag: "Frontend", description: "DOM, browser APIs, performance, accessibility, and framework-specific questions.", difficulty: "Intermediate", downloads: 13000 },
      { title: "Mock Interview Recordings", type: "Video", duration: "6 Hours", tag: "Practice", description: "Watch real mock interviews with FAANG engineers. Includes feedback and analysis.", difficulty: "All Levels", downloads: 7200 },
      { title: "Salary Negotiation Playbook", type: "Guide", duration: "30 mins", tag: "Career", description: "Data-driven strategies for negotiating offers. Includes compensation data by role and location.", difficulty: "All Levels", downloads: 11000 },
      { title: "Take-Home Project Templates", type: "Code", duration: "Instant", tag: "Projects", description: "Boilerplate templates for common take-home assignments with best practices baked in.", difficulty: "Intermediate", downloads: 4800 },
      { title: "Company Culture Guide", type: "Guide", duration: "45 mins", tag: "Research", description: "Inside look at engineering culture at 30+ top tech companies. Interview tips for each.", difficulty: "All Levels", downloads: 6100 },
    ]
  },
  {
    category: "Community Templates",
    icon: "box",
    description: "Ready-to-use project starters and boilerplates",
    items: [
      { title: "Next.js SaaS Starter", type: "Boilerplate", duration: "Instant", tag: "Full Stack", description: "Auth, payments, dashboard, blog — everything you need to launch a SaaS product.", difficulty: "Intermediate", downloads: 19000 },
      { title: "AI Chat App Template", type: "Boilerplate", duration: "Instant", tag: "AI", description: "OpenAI-powered chat application with streaming, history, and multi-model support.", difficulty: "Intermediate", downloads: 14500 },
      { title: "E-Commerce Storefront", type: "Boilerplate", duration: "Instant", tag: "Commerce", description: "Complete e-commerce frontend with cart, checkout, and payment integration.", difficulty: "Intermediate", downloads: 8900 },
      { title: "Portfolio Website Kit", type: "Template", duration: "Instant", tag: "Personal", description: "Beautiful portfolio template with projects, blog, and contact form.", difficulty: "Beginner", downloads: 21000 },
      { title: "REST API Boilerplate (Node)", type: "Boilerplate", duration: "Instant", tag: "Backend", description: "Express + TypeScript + Prisma + JWT auth + tests. Production-ready API starter.", difficulty: "Intermediate", downloads: 10200 },
      { title: "CLI Tool Starter (Rust)", type: "Boilerplate", duration: "Instant", tag: "CLI", description: "Clap, colored output, config management, and cross-platform release workflow.", difficulty: "Advanced", downloads: 3100 },
      { title: "Chrome Extension Starter", type: "Template", duration: "Instant", tag: "Browser", description: "Manifest v3, React popup, content scripts, and storage API — all pre-configured.", difficulty: "Beginner", downloads: 7800 },
      { title: "Monorepo Workspace Setup", type: "Config", duration: "Instant", tag: "DevOps", description: "Turborepo + pnpm workspaces with shared packages, ESLint, and CI/CD.", difficulty: "Advanced", downloads: 5600 },
    ]
  }
];

export const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];
