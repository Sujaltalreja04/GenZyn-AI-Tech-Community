export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  image: string;
  imageAlt: string;
  imageSource: "Unsplash" | "Pexels" | "Pixabay";
  imageSourceUrl: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "genzyn-manifesto",
    title: "The GenZyn Manifesto: Building the Next Internet",
    excerpt: "Why we started this community, our core values, and our vision for how decentralized, open-source collaboration will shape the software of tomorrow.",
    author: "Founder Team",
    date: "Jan 01, 2026",
    readTime: "20 min read",
    category: "Community",
    gradient: "linear-gradient(135deg, #E10600 0%, #ff6b00 100%)",
    image: "https://images.unsplash.com/photo-1732210038505-34a70d3b45a0?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    imageAlt: "Developers collaborating in front of a computer",
    imageSource: "Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/two-men-sitting-in-front-of-a-computer-screen-VTZ4PVhLFFg",
    featured: true
  },
  {
    id: "webgpu-vs-webgl",
    title: "The Future of Web Rendering: WebGPU vs WebGL",
    excerpt: "Deep dive into the performance benefits of WebGPU and how GenZyn is migrating our core graphics engine to leverage the new API for 10x rendering performance.",
    author: "Alex Rivera",
    date: "Jun 12, 2026",
    readTime: "8 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
    image: "https://images.pexels.com/photos/34212896/pexels-photo-34212896.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Modern workstation with code displayed across multiple screens",
    imageSource: "Pexels",
    imageSourceUrl: "https://www.pexels.com/photo/modern-workspace-with-coding-screens-and-keyboard-34212896/"
  },
  {
    id: "scalable-ai",
    title: "Building Scalable AI Architectures for Startups",
    excerpt: "How to architect your ML infrastructure when you have zero users vs when you have a million. Lessons learned from top GenZyn founders who've scaled to millions.",
    author: "Samantha Chen",
    date: "Jun 05, 2026",
    readTime: "12 min read",
    category: "AI/ML",
    gradient: "linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)",
    image: "https://cdn.pixabay.com/photo/2026/03/12/21/43/haruudu-artificial-intelligence-10170641_1280.jpg",
    imageAlt: "Glowing neural network visualization representing AI infrastructure",
    imageSource: "Pixabay",
    imageSourceUrl: "https://pixabay.com/photos/artificial-intelligence-technology-10170641/"
  },
  {
    id: "design-engineers",
    title: "Why Design Engineers are the New Unicorns",
    excerpt: "The gap between design and engineering is closing. Explore why the ability to prototype in code is the most sought-after skill in 2026 and how to develop it.",
    author: "Jordan Smith",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Career",
    gradient: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
    image: "https://images.unsplash.com/photo-1744555270794-6d378b9e7cd3?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    imageAlt: "Design engineer working across multiple monitors",
    imageSource: "Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/a-person-works-on-computer-with-multiple-monitors-WbLJd4M88I8"
  },
  {
    id: "hackathon-recap",
    title: "GenZyn Hackathon 2026: Winners Announced!",
    excerpt: "Recap of the most incredible 48 hours. See the top 10 projects that blew the judges away and the teams behind them. Plus exclusive interviews with winners.",
    author: "GenZyn Team",
    date: "May 20, 2026",
    readTime: "5 min read",
    category: "Community",
    gradient: "linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)",
    image: "https://images.pexels.com/photos/34774358/pexels-photo-34774358.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Team collaborating on laptops during a build session",
    imageSource: "Pexels",
    imageSourceUrl: "https://www.pexels.com/photo/focused-team-collaborating-on-laptops-in-office-setting-34774358/"
  },
  {
    id: "state-management",
    title: "State Management in 2026: Do We Still Need Redux?",
    excerpt: "With React 19 and new primitives, we explore the landscape of state management and when to use what. Zustand, Jotai, Signals, or native React — we break it down.",
    author: "Chris Walker",
    date: "May 15, 2026",
    readTime: "10 min read",
    category: "Frontend",
    gradient: "linear-gradient(135deg, #FCCB90 0%, #D57EEB 100%)",
    image: "https://cdn.pixabay.com/photo/2022/01/29/13/08/programming-6977450_1280.jpg",
    imageAlt: "Software state and application code on a developer screen",
    imageSource: "Pixabay",
    imageSourceUrl: "https://pixabay.com/photos/programming-coding-6977450/"
  },
  {
    id: "smart-contracts",
    title: "Securing Smart Contracts: A Practical Guide",
    excerpt: "Common vulnerabilities in Solidity and how to avoid them using automated analysis tools developed by our community. Includes real-world case studies.",
    author: "Elena Rostova",
    date: "May 02, 2026",
    readTime: "15 min read",
    category: "Web3",
    gradient: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
    image: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    imageAlt: "Combination lock resting on a computer keyboard",
    imageSource: "Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/a-combination-lock-rests-on-a-computer-keyboard-WUJmdr8pNwk"
  },
  {
    id: "rust-web",
    title: "Rust for Web Developers: A Practical Introduction",
    excerpt: "Why Rust is becoming essential for web performance. We build a high-performance API server and compare it against Node.js and Go benchmarks.",
    author: "Michael Torres",
    date: "Apr 25, 2026",
    readTime: "14 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
    image: "https://images.pexels.com/photos/6424584/pexels-photo-6424584.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Systems programming code displayed on a dark monitor",
    imageSource: "Pexels",
    imageSourceUrl: "https://www.pexels.com/photo/programming-code-on-screen-6424584/"
  },
  {
    id: "remote-culture",
    title: "Building Remote-First Engineering Culture",
    excerpt: "How GenZyn manages a fully distributed team across 15 time zones. Our tools, rituals, and the mistakes we made along the way.",
    author: "Sarah Jenkins",
    date: "Apr 18, 2026",
    readTime: "7 min read",
    category: "Career",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: "https://cdn.pixabay.com/photo/2026/03/06/15/05/pixelwanderer-video-call-10159489_1280.jpg",
    imageAlt: "Remote team connecting through a video call",
    imageSource: "Pixabay",
    imageSourceUrl: "https://pixabay.com/photos/video-call-remote-work-10159489/"
  },
  {
    id: "llm-fine-tuning",
    title: "Fine-Tuning LLMs on Custom Data: A Step-by-Step Guide",
    excerpt: "From data preparation to deployment. We walk through fine-tuning Llama 3 on GenZyn's codebase and share our results, costs, and lessons learned.",
    author: "David Kumar",
    date: "Apr 10, 2026",
    readTime: "18 min read",
    category: "AI/ML",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    image: "https://images.unsplash.com/photo-1763568258143-497992aa73da?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    imageAlt: "Laptop displaying machine learning code beside a coffee mug",
    imageSource: "Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/laptop-screen-displaying-code-with-coffee-mug-nwfWXz-JSWA"
  },
  {
    id: "css-architecture",
    title: "Modern CSS Architecture for Large-Scale Applications",
    excerpt: "CSS Modules, CSS-in-JS, or Vanilla CSS? We break down the pros and cons with real performance data from production applications serving millions of users.",
    author: "Emily Zhang",
    date: "Mar 28, 2026",
    readTime: "9 min read",
    category: "Frontend",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    image: "https://images.pexels.com/photos/7107487/pexels-photo-7107487.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "CSS and HTML code displayed on a computer monitor",
    imageSource: "Pexels",
    imageSourceUrl: "https://www.pexels.com/photo/close-up-shot-of-a-computer-monitor-7107487/"
  },
  {
    id: "open-source-business",
    title: "Making Money with Open Source: Business Models That Work",
    excerpt: "From freemium to dual licensing. We analyze 10 successful open-source companies and extract actionable strategies for maintainers and founders.",
    author: "James Park",
    date: "Mar 20, 2026",
    readTime: "11 min read",
    category: "Community",
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    image: "https://cdn.pixabay.com/photo/2020/01/22/09/38/meeting-4784909_1280.jpg",
    imageAlt: "Open source contributors discussing a sustainable business plan",
    imageSource: "Pixabay",
    imageSourceUrl: "https://pixabay.com/photos/meeting-adults-business-people-4784909/"
  },
  {
    id: "kubernetes-zero",
    title: "Kubernetes from Zero to Production in 30 Minutes",
    excerpt: "A hands-on guide that takes you from knowing nothing about K8s to deploying a production-ready application with monitoring, logging, and auto-scaling.",
    author: "Lucas Weber",
    date: "Mar 12, 2026",
    readTime: "13 min read",
    category: "Engineering",
    gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    imageAlt: "Rows of server racks inside a data center",
    imageSource: "Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/server-racks-in-data-center-klWUhr-wPJ8"
  },
  {
    id: "web3-identity",
    title: "Decentralized Identity: The Future of Authentication",
    excerpt: "How DID and verifiable credentials are replacing passwords and OAuth. A practical guide to implementing decentralized identity in your applications.",
    author: "Omar Hassan",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    category: "Web3",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    image: "https://images.pexels.com/photos/17155842/pexels-photo-17155842/free-photo-of-finger-scan.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Person using a fingerprint scanner for secure identity verification",
    imageSource: "Pexels",
    imageSourceUrl: "https://www.pexels.com/photo/finger-scan-17155842/"
  },
  {
    id: "interview-prep",
    title: "The GenZyn Guide to Acing Technical Interviews",
    excerpt: "Compiled from 200+ community members who landed jobs at FAANG companies. Data structures, system design, behavioral — we cover it all with practice problems.",
    author: "Zara Ali",
    date: "Feb 15, 2026",
    readTime: "16 min read",
    category: "Career",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    image: "https://cdn.pixabay.com/photo/2020/02/10/02/36/interview-4835116_1280.jpg",
    imageAlt: "Interviewers and a candidate concluding a professional meeting",
    imageSource: "Pixabay",
    imageSourceUrl: "https://pixabay.com/photos/interview-deal-business-handshake-4835116/"
  },
];

export const blogCategories = ["All", "Engineering", "AI/ML", "Career", "Community", "Web3", "Frontend"];
