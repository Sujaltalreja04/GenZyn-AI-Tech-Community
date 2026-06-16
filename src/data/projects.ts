export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  stars: number;
  contributors: number;
  forks: number;
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "gz-engine",
    title: "GZ-Engine",
    category: "Open Source",
    description: "A lightweight, WebGL-based 3D rendering engine optimized for modern web applications. Used by 10+ startups.",
    longDescription: "GZ-Engine is the community's flagship open-source project. Built from the ground up with performance in mind, it offers a declarative API for building interactive 3D experiences on the web. Features include scene graph management, PBR materials, shadow mapping, and a plugin architecture.",
    tech: ["WebGL", "TypeScript", "Rust", "WASM"],
    stars: 1240,
    contributors: 34,
    forks: 189,
    link: "#",
    featured: true
  },
  {
    id: "auto-deployer",
    title: "Auto-Deployer",
    category: "DevOps",
    description: "Zero-config CI/CD pipeline generator for monorepos. Automatically detects your stack and creates optimal deployment workflows.",
    longDescription: "Auto-Deployer eliminates the boilerplate of setting up CI/CD. Point it at your repo and it analyzes your project structure, detects frameworks, databases, and services, then generates optimized GitHub Actions or GitLab CI pipelines.",
    tech: ["Go", "Docker", "GitHub Actions", "Terraform"],
    stars: 890,
    contributors: 18,
    forks: 112,
    link: "#"
  },
  {
    id: "genzyn-ai",
    title: "GenZyn AI Assistant",
    category: "AI/ML",
    description: "An open-source conversational AI specialized in code reviews and architectural advice, trained on our community's top projects.",
    longDescription: "Built on a fine-tuned open-source LLM, the GenZyn AI Assistant provides contextual code review, architecture suggestions, and best-practice recommendations. It integrates with VS Code, JetBrains, and GitHub PRs.",
    tech: ["Python", "PyTorch", "React", "FastAPI"],
    stars: 2100,
    contributors: 45,
    forks: 320,
    link: "#",
    featured: true
  },
  {
    id: "ui-glass",
    title: "UI-Glass",
    category: "Design",
    description: "A premium glassmorphism UI component library for React and Vue, with built-in accessibility and dark mode support.",
    longDescription: "UI-Glass provides 60+ beautifully crafted components with glassmorphism aesthetics. Every component is fully accessible (WCAG 2.1 AA), supports theming, and includes Storybook documentation. Used by 500+ projects worldwide.",
    tech: ["React", "Vue", "CSS", "Framer Motion"],
    stars: 3400,
    contributors: 52,
    forks: 410,
    link: "#",
    featured: true
  },
  {
    id: "web3-auth",
    title: "Web3 Auth Gateway",
    category: "Blockchain",
    description: "Seamless wallet authentication and session management for Next.js applications.",
    longDescription: "Web3 Auth Gateway provides a drop-in authentication solution for Web3 apps. Supports MetaMask, WalletConnect, Coinbase Wallet, and more. Includes session management, role-based access, and multi-chain support.",
    tech: ["Solidity", "Next.js", "Ethers.js", "SIWE"],
    stars: 450,
    contributors: 12,
    forks: 67,
    link: "#"
  },
  {
    id: "datastream",
    title: "DataStream Analytics",
    category: "Data Science",
    description: "Real-time event processing and analytics dashboard for high-traffic platforms.",
    longDescription: "DataStream processes millions of events per second with sub-millisecond latency. Features include real-time dashboards, anomaly detection, custom alerting, and data export to multiple formats.",
    tech: ["Kafka", "ClickHouse", "Vue.js", "Go"],
    stars: 670,
    contributors: 15,
    forks: 89,
    link: "#"
  },
  {
    id: "neural-search",
    title: "NeuralSearch",
    category: "AI/ML",
    description: "Semantic search engine powered by transformer embeddings. Drop-in replacement for traditional full-text search.",
    longDescription: "NeuralSearch uses state-of-the-art sentence transformers to provide semantic search capabilities. It understands context and meaning, not just keywords. Supports hybrid search combining semantic and keyword matching.",
    tech: ["Python", "Rust", "ONNX", "Redis"],
    stars: 1850,
    contributors: 28,
    forks: 245,
    link: "#"
  },
  {
    id: "infra-monitor",
    title: "InfraMonitor",
    category: "DevOps",
    description: "Open-source infrastructure monitoring with AI-powered anomaly detection and auto-remediation.",
    longDescription: "InfraMonitor watches your servers, containers, and services in real-time. Its ML model learns normal behavior patterns and alerts you before incidents occur. Auto-remediation scripts can restart services, scale resources, or trigger runbooks.",
    tech: ["Go", "Prometheus", "Grafana", "TensorFlow"],
    stars: 780,
    contributors: 22,
    forks: 95,
    link: "#"
  },
  {
    id: "design-tokens",
    title: "TokenForge",
    category: "Design",
    description: "Design token management system that syncs Figma, code, and documentation in real-time.",
    longDescription: "TokenForge bridges the gap between designers and developers. Define tokens in Figma, and they auto-sync to CSS variables, Tailwind config, and Swift/Kotlin files. Includes version history and rollback support.",
    tech: ["TypeScript", "Figma API", "Node.js", "CSS"],
    stars: 540,
    contributors: 9,
    forks: 42,
    link: "#"
  },
  {
    id: "smart-contract-audit",
    title: "AuditChain",
    category: "Blockchain",
    description: "Automated smart contract security auditor with vulnerability detection and gas optimization suggestions.",
    longDescription: "AuditChain scans Solidity and Vyper contracts for 200+ known vulnerability patterns. It provides severity ratings, fix suggestions, gas optimization tips, and generates PDF audit reports.",
    tech: ["Solidity", "Python", "Slither", "Foundry"],
    stars: 920,
    contributors: 16,
    forks: 134,
    link: "#"
  },
  {
    id: "api-gateway-lite",
    title: "GatewayLite",
    category: "Open Source",
    description: "Ultra-lightweight API gateway with rate limiting, auth, and caching. Under 5MB binary.",
    longDescription: "GatewayLite is built for teams that need a simple, fast API gateway without the complexity of Kong or AWS API Gateway. Features include JWT validation, rate limiting, request/response transformation, and Redis caching.",
    tech: ["Rust", "Redis", "Docker", "OpenAPI"],
    stars: 1100,
    contributors: 20,
    forks: 156,
    link: "#"
  },
  {
    id: "collab-canvas",
    title: "CollabCanvas",
    category: "Open Source",
    description: "Real-time collaborative whiteboard with infinite canvas, sticky notes, and drawing tools.",
    longDescription: "CollabCanvas enables teams to brainstorm, plan, and design together in real-time. Built with CRDTs for conflict-free collaboration. Features infinite zoom, shape libraries, image embedding, and export to PNG/SVG.",
    tech: ["TypeScript", "Canvas API", "Y.js", "WebSocket"],
    stars: 1650,
    contributors: 31,
    forks: 198,
    link: "#"
  }
];

export const projectCategories = ["All", "AI/ML", "Open Source", "DevOps", "Design", "Blockchain", "Data Science"];
