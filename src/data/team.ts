export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface Ambassador {
  region: string;
  name: string;
  city: string;
  members: number;
}

export const leadership: TeamMember[] = [
  { name: "Alex Chen", role: "Founder & CEO", bio: "Full-stack engineer. Previously at Stripe and Vercel. Passionate about community building and developer experience.", twitter: "#", linkedin: "#", github: "#" },
  { name: "Sarah Jenkins", role: "Chief Community Officer", bio: "Building bridges between developers worldwide. Expert in DevRel and open-source growth strategies.", twitter: "#", linkedin: "#", github: "#" },
  { name: "David Kumar", role: "Head of AI Initiatives", bio: "AI researcher focusing on generative models and their real-world applications. PhD from Stanford.", twitter: "#", linkedin: "#", github: "#" },
  { name: "Maria Santos", role: "VP of Engineering", bio: "15+ years building scalable systems. Former Principal Engineer at AWS. Obsessed with performance.", twitter: "#", linkedin: "#", github: "#" },
  { name: "James Okafor", role: "Head of Partnerships", bio: "Strategic partnerships with Fortune 500 companies and startups. MBA from Wharton.", twitter: "#", linkedin: "#" }
];

export const engineering: TeamMember[] = [
  { name: "Emily Rodriguez", role: "Frontend Lead", bio: "Creating intuitive, beautiful interfaces that developers love to use. React ecosystem expert.", twitter: "#", github: "#" },
  { name: "Michael Chang", role: "Infrastructure Architect", bio: "Ensuring our platforms stay robust under heavy traffic. Kubernetes and cloud-native specialist.", github: "#", linkedin: "#" },
  { name: "Priya Patel", role: "Security Engineer", bio: "Keeping our data and users safe. Bug bounty program lead and ethical hacking advocate.", twitter: "#", github: "#" },
  { name: "Liam O'Brien", role: "Backend Lead", bio: "Building high-performance APIs and microservices. Rust and Go enthusiast.", github: "#", linkedin: "#" },
  { name: "Yuki Tanaka", role: "ML Engineer", bio: "Deploying ML models at scale. Specializes in recommendation systems and NLP.", github: "#", twitter: "#" },
  { name: "Omar Hassan", role: "DevOps Engineer", bio: "CI/CD pipelines and infrastructure automation. Everything-as-code philosophy.", github: "#" }
];

export const design: TeamMember[] = [
  { name: "Luna Park", role: "Design Lead", bio: "Bridging the gap between design and engineering. Creates pixel-perfect, accessible interfaces.", twitter: "#", linkedin: "#" },
  { name: "Carlos Rivera", role: "UX Researcher", bio: "Data-driven design decisions. Conducts user research across our global community.", linkedin: "#" },
  { name: "Aisha Mohammed", role: "Motion Designer", bio: "Bringing interfaces to life with thoughtful animations and micro-interactions.", twitter: "#" },
  { name: "Felix Weber", role: "Brand Designer", bio: "Crafting the visual identity of GenZyn across all touchpoints and platforms.", linkedin: "#", twitter: "#" }
];

export const community: TeamMember[] = [
  { name: "Zara Thompson", role: "Community Manager", bio: "Fostering engagement across Discord, forums, and social media. 24/7 community advocate.", twitter: "#", linkedin: "#" },
  { name: "Raj Mehta", role: "Content Lead", bio: "Creating educational content, tutorials, and blog posts that drive community growth.", twitter: "#", github: "#" },
  { name: "Sophie Liu", role: "Events Coordinator", bio: "Organizing 50+ events annually across 4 continents. Logistics wizard.", linkedin: "#" },
  { name: "Andre Williams", role: "Growth Lead", bio: "Scaling our community from 10K to 50K members. Data-driven growth strategies.", twitter: "#", linkedin: "#" }
];

export const ambassadors: Ambassador[] = [
  { region: "North America", name: "Jessica L.", city: "San Francisco", members: 8500 },
  { region: "Europe", name: "Marco V.", city: "Berlin", members: 7200 },
  { region: "South Asia", name: "Ananya S.", city: "Bangalore", members: 12000 },
  { region: "South America", name: "Carlos M.", city: "São Paulo", members: 4500 },
  { region: "East Asia", name: "Hiro T.", city: "Tokyo", members: 5800 },
  { region: "Middle East", name: "Fatima A.", city: "Dubai", members: 3200 },
  { region: "Africa", name: "Kwame O.", city: "Lagos", members: 6100 },
  { region: "Oceania", name: "Emma W.", city: "Sydney", members: 2700 }
];
