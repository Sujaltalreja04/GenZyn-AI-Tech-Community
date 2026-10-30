export interface Event {
  id: string;
  title: string;
  date: string;
  startDate: string;
  description: string;
  type: "Hackathon" | "Workshop" | "Conference" | "Networking" | "Bootcamp";
  tags: string[];
  link: string;
  attendees?: number;
  highlights?: string;
  isPast?: boolean;
  isFeatured?: boolean;
}

export const events: Event[] = [
  // Featured
  {
    id: "hack-2026",
    title: "GenZyn Hack 2026",
    date: "August 15-17, 2026",
    startDate: "2026-08-15T09:00:00.000Z",
    description: "Our annual 48-hour hackathon. Build the future, win from a $50,000 prize pool, and get hired by our top sponsors. Featuring keynote speakers from OpenAI, Vercel, and Stripe.",
    type: "Hackathon",
    tags: ["Global", "Hybrid", "$50k Prizes"],
    link: "#",
    isFeatured: true,
    isPast: true
  },
  // Upcoming
  {
    id: "ai-summit",
    title: "AI Builders Summit",
    date: "September 10, 2026",
    startDate: "2026-09-10T09:00:00.000Z",
    description: "A 1-day virtual summit focusing on LLMs, generative agents, and the future of AI. Featuring speakers from DeepMind, Anthropic, and Meta AI.",
    type: "Conference",
    tags: ["AI", "Virtual", "Free"],
    link: "#",
    isPast: true
  },
  {
    id: "oss-october",
    title: "Open Source October",
    date: "October 1-31, 2026",
    startDate: "2026-10-01T09:00:00.000Z",
    description: "A month-long sprint to contribute to open-source projects. Exclusive swag for top contributors, mentorship from maintainers.",
    type: "Workshop",
    tags: ["Open Source", "Global", "Swag"],
    link: "#",
    isPast: true
  },
  {
    id: "founders-pitch",
    title: "Founders Pitch Night",
    date: "November 5, 2026",
    startDate: "2026-11-05T18:00:00.000Z",
    description: "Pitch your startup to top VCs in the GenZyn network. 3-minute pitches, live feedback, and networking with investors.",
    type: "Networking",
    tags: ["Startups", "Funding", "Virtual"],
    link: "#"
  },
  {
    id: "devops-deep-dive",
    title: "DevOps Deep Dive",
    date: "September 25, 2026",
    startDate: "2026-09-25T09:00:00.000Z",
    description: "Hands-on workshop covering Kubernetes, Terraform, and CI/CD best practices. Build a production-grade pipeline from scratch.",
    type: "Workshop",
    tags: ["DevOps", "Hands-on", "Intermediate"],
    link: "#",
    isPast: true
  },
  {
    id: "design-eng",
    title: "Design Engineering Meetup",
    date: "October 15, 2026",
    startDate: "2026-10-15T18:00:00.000Z",
    description: "Exploring the intersection of design and code. Learn Framer Motion, CSS animations, and how to think like a design engineer.",
    type: "Networking",
    tags: ["Design", "Frontend", "In-Person"],
    link: "#",
    isPast: true
  },
  {
    id: "security-ctf",
    title: "CyberSec CTF Challenge",
    date: "November 20, 2026",
    startDate: "2026-11-20T09:00:00.000Z",
    description: "Capture-the-flag competition testing your cybersecurity skills. Challenges range from beginner web exploits to advanced binary exploitation.",
    type: "Hackathon",
    tags: ["Security", "Competition", "Prizes"],
    link: "#"
  },
  {
    id: "web3-workshop",
    title: "Web3 Smart Contract Workshop",
    date: "December 5, 2026",
    startDate: "2026-12-05T09:00:00.000Z",
    description: "Build, test, and deploy your first smart contract on Ethereum. Covers Solidity basics, Hardhat, and frontend integration.",
    type: "Workshop",
    tags: ["Web3", "Beginner", "Hands-on"],
    link: "#"
  },
  // Past Events
  {
    id: "web3-unleashed",
    title: "Web3 Unleashed",
    date: "March 2026",
    startDate: "2026-03-01T09:00:00.000Z",
    description: "A deep-dive into the decentralized web.",
    type: "Conference",
    tags: ["Web3"],
    link: "#",
    attendees: 500,
    highlights: "12 speakers, $10k in grants distributed",
    isPast: true
  },
  {
    id: "cloud-bootcamp",
    title: "Cloud Native Bootcamp",
    date: "January 2026",
    startDate: "2026-01-01T09:00:00.000Z",
    description: "Intensive hands-on Kubernetes certification prep.",
    type: "Bootcamp",
    tags: ["Cloud", "DevOps"],
    link: "#",
    attendees: 1200,
    highlights: "Kubernetes CKA certification prep",
    isPast: true
  },
  {
    id: "launchpad-2025",
    title: "GenZyn Launchpad 2025",
    date: "December 2025",
    startDate: "2025-12-01T09:00:00.000Z",
    description: "Annual startup showcase and pitch competition.",
    type: "Networking",
    tags: ["Startups"],
    link: "#",
    attendees: 850,
    highlights: "30+ teams pitched, 5 funded",
    isPast: true
  },
  {
    id: "ai-bootcamp",
    title: "AI/ML Bootcamp",
    date: "October 2025",
    startDate: "2025-10-01T09:00:00.000Z",
    description: "8-week intensive machine learning program.",
    type: "Bootcamp",
    tags: ["AI", "ML"],
    link: "#",
    attendees: 600,
    highlights: "92% completion rate, 40% job placement",
    isPast: true
  },
  {
    id: "hack-2025",
    title: "GenZyn Hack 2025",
    date: "August 2025",
    startDate: "2025-08-01T09:00:00.000Z",
    description: "The inaugural GenZyn hackathon.",
    type: "Hackathon",
    tags: ["Global"],
    link: "#",
    attendees: 3200,
    highlights: "$25k prize pool, 120 teams",
    isPast: true
  },
  {
    id: "frontend-conf",
    title: "Frontend Frontiers",
    date: "June 2025",
    startDate: "2025-06-01T09:00:00.000Z",
    description: "Two-day conference on the future of frontend development.",
    type: "Conference",
    tags: ["Frontend"],
    link: "#",
    attendees: 400,
    highlights: "React 19 workshop, 8 speakers",
    isPast: true
  },
  {
    id: "oss-sprint-2025",
    title: "Open Source Sprint 2025",
    date: "April 2025",
    startDate: "2025-04-01T09:00:00.000Z",
    description: "Weekend-long open source contribution marathon.",
    type: "Workshop",
    tags: ["Open Source"],
    link: "#",
    attendees: 300,
    highlights: "450 PRs merged across 30 repos",
    isPast: true
  },
  {
    id: "first-meetup",
    title: "GenZyn First Meetup",
    date: "February 2025",
    startDate: "2025-02-01T09:00:00.000Z",
    description: "The very first GenZyn community meetup.",
    type: "Networking",
    tags: ["Community"],
    link: "#",
    attendees: 50,
    highlights: "Where it all started",
    isPast: true
  },
];

export const eventTypes = ["All", "Hackathon", "Workshop", "Conference", "Networking", "Bootcamp"];

export const bootcamps = [
  { title: "Full-Stack React & Node", duration: "8 Weeks", level: "Beginner", spots: 30, enrolled: 24, description: "Build production-grade web apps from zero to deployment." },
  { title: "Advanced Machine Learning", duration: "12 Weeks", level: "Advanced", spots: 20, enrolled: 18, description: "Deep learning, NLP, computer vision with real research projects." },
  { title: "DevOps & Infrastructure", duration: "6 Weeks", level: "Intermediate", spots: 25, enrolled: 19, description: "Docker, Kubernetes, Terraform, CI/CD — the complete stack." },
  { title: "Mobile App Development", duration: "10 Weeks", level: "Beginner", spots: 30, enrolled: 27, description: "Build cross-platform apps with React Native and Expo." },
  { title: "System Design Mastery", duration: "8 Weeks", level: "Advanced", spots: 15, enrolled: 15, description: "Design scalable systems. Perfect for senior engineer interviews." },
  { title: "Cybersecurity Fundamentals", duration: "6 Weeks", level: "Beginner", spots: 25, enrolled: 12, description: "Network security, ethical hacking, and incident response basics." },
];
