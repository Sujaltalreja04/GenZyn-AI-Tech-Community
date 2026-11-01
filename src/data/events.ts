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

const eventList: Event[] = [
  // Community event archive imported from the GenZyn WhatsApp announcements.
  // Repeated promotional messages are represented by one canonical event entry.
  {
    id: "hackfront-india-2026",
    title: "HackFront India 2026",
    date: "Event date TBA; submissions closed October 31, 2026",
    startDate: "2026-10-31T18:29:00.000Z",
    description: "A 30-hour offline hackathon at IIIT Delhi with a ₹1 crore overall prize pool, ₹5 lakh cash prize, and up to ₹50 lakh in funding support. The source announcement did not include the final event date.",
    type: "Hackathon",
    tags: ["IIIT Delhi", "Offline", "Innovation", "Funding"],
    link: "https://whereuelevate.com/drills/hackfrontindia-2026?w_ref=QUXJA3",
    highlights: "30-hour build, ₹5 lakh cash prize, startup funding support",
    isPast: true
  },
  {
    id: "catalyst-hack-2026",
    title: "Catalyst Hack 2026",
    date: "October 24-25, 2026",
    startDate: "2026-10-24T00:00:00.000Z",
    description: "A virtual team hackathon from Catalyst Crew Dev Community and Posterwa focused on solving real-world problems, building, and deploying impactful solutions.",
    type: "Hackathon",
    tags: ["Virtual", "Teams of 4-5", "₹20k Prizes", "AWS"],
    link: "https://unstop.com/p/catalyst-hack-2026-catalyst-crew-dev-community-1760000",
    highlights: "Online team challenge with mentors, judges, and prizes",
    isPast: true
  },
  {
    id: "ahgv-buildverse-2026",
    title: "AHGV Buildverse 2026",
    date: "October 4, 2026",
    startDate: "2026-10-04T00:00:00.000Z",
    description: "An eight-hour hackathon presented by Avaroite and HackGyanVerse, bringing teams together for focused coding, creativity, problem-solving, and innovation.",
    type: "Hackathon",
    tags: ["8 Hours", "Teams of 2-4", "Innovation"],
    link: "https://unstop.com/o/Mz70soJ?lb=HI7GPlGM",
    highlights: "Eight-hour team build focused on practical problem-solving",
    isPast: true
  },
  {
    id: "grand-hack-ipec-2026",
    title: "Grand Hack IPEC 2026",
    date: "September 26-27, 2026",
    startDate: "2026-09-26T00:00:00.000Z",
    description: "A national-level 24-hour offline hackathon at Inderprastha Engineering College covering AI, cybersecurity, Web3, IoT, AR/VR, smart cities, and open innovation.",
    type: "Hackathon",
    tags: ["IPEC Ghaziabad", "24 Hours", "Offline", "National"],
    link: "https://unstop.com/hackathons/grand-hack-ipec-hackshastra-1704703",
    highlights: "Industry mentorship, certificates, prizes, and internship opportunities",
    isPast: true
  },
  {
    id: "devhack-2026",
    title: "DevHack 2026",
    date: "September 18-19, 2026",
    startDate: "2026-09-18T00:00:00.000Z",
    description: "Tech4Hack and GDG IIMT's hybrid open-innovation hackathon, with no predefined problem statements and freedom for teams to build around ideas they care about.",
    type: "Hackathon",
    tags: ["IIMT Meerut", "Hybrid", "Open Innovation"],
    link: "https://unstop.com/hackathons/devhack-2026-gdg-on-campus-iimt-meerut-1750208",
    highlights: "Open-ended building with collaboration and industry feedback",
    isPast: true
  },
  {
    id: "code-vibes-hack-1",
    title: "The Code Vibes Hack 1.0",
    date: "Event date not provided; registration closed September 15, 2026",
    startDate: "2026-09-15T18:29:00.000Z",
    description: "A free community hackathon for solo builders and teams working across AI/ML, web development, app development, cybersecurity, and open innovation.",
    type: "Hackathon",
    tags: ["Free", "Teams of 1-4", "Open Innovation"],
    link: "https://forms.gle/JDMoEFFiMW6E2rqM7",
    highlights: "Project showcase, certificates, recognition, and developer networking",
    isPast: true
  },
  {
    id: "kickr-code-mania-2026",
    title: "KICKR Code Mania 2026",
    date: "September 7-9, 2026",
    startDate: "2026-09-07T00:00:00.000Z",
    description: "A three-day national-level AI and gaming hackathon at Sharda University with mentorship, pitching, accommodation, food, goodies, and certificates provided.",
    type: "Hackathon",
    tags: ["Sharda University", "AI", "Gaming", "₹2.5L Prizes"],
    link: "https://www.kickrcodemania.com",
    highlights: "Three days of building, mentoring, pitching, and networking",
    isPast: true
  },
  {
    id: "techtribe-ai-speaker-session",
    title: "TechTribe AI Speaker Session",
    date: "September 5, 2026",
    startDate: "2026-09-05T00:00:00.000Z",
    description: "A free in-person AI speaker session at Thoughtworks with industry insights, career guidance, networking, refreshments, and attendee goodies.",
    type: "Conference",
    tags: ["AI", "Thoughtworks", "In-Person", "Free"],
    link: "https://luma.com/thk0hw89?tk=0VMarN",
    highlights: "Expert talks, career guidance, community networking, and refreshments",
    isPast: true
  },
  {
    id: "codefusion-2k26",
    title: "CodeFusion 2K26",
    date: "August 21-22, 2026",
    startDate: "2026-08-21T00:00:00.000Z",
    description: "A 36-hour national-level offline hackathon organized by CODEVERSE at Echelon Institute of Technology, covering AI, Web3, blockchain, cybersecurity, and open innovation.",
    type: "Hackathon",
    tags: ["Faridabad", "36 Hours", "Microsoft", "₹2L+ Prizes"],
    link: "https://unstop.com/o/FfsKV06/?ref=DHRL2oBc",
    highlights: "Workshops, mentorship, real-world problem statements, and a ₹2 lakh+ prize pool",
    isPast: true
  },
  {
    id: "ai-forward-deployed-engineer-masterclass",
    title: "AI Forward Deployed Engineer Masterclass",
    date: "August 8, 2026, 8:00-9:30 PM IST",
    startDate: "2026-08-08T14:30:00.000Z",
    description: "A live online masterclass with Salesforce engineer Shresth Sahai covering backend systems, GenAI, APIs, agents, deployment, career opportunities, and the FDE roadmap.",
    type: "Workshop",
    tags: ["Online", "GenAI", "Career", "Certificate"],
    link: "https://vm.ltd/CDGBLK/ix9Lju",
    highlights: "Live expert session, career roadmap, and Q&A",
    isPast: true
  },
  {
    id: "tech4hack-buildathon-2026",
    title: "Buildathon 2026 by Tech4Hack × GenZyn Tech",
    date: "August 1, 2026, 10:00 AM-5:00 PM",
    startDate: "2026-08-01T04:30:00.000Z",
    description: "A student-focused buildathon at Thoughtworks Technology, Gurugram, featuring mentors, real-world projects, networking, certificates, participant T-shirts, and internships for the top teams.",
    type: "Hackathon",
    tags: ["Gurugram", "In-Person", "Mentorship", "Internships"],
    link: "https://luma.com/9lsgmkt8?tk=QdVu6x",
    highlights: "Certificates and T-shirts for participants, internships for the top three teams",
    isPast: true
  },
  {
    id: "manthan-x-2026",
    title: "Manthan X 2026",
    date: "June 26, 2026",
    startDate: "2026-06-26T00:00:00.000Z",
    description: "Chhattisgarh's startup and innovation summit at BIT Auditorium, Durg, with live pitching, mentorship, investor networking, incubation support, and an equity-free grant.",
    type: "Conference",
    tags: ["Durg", "Hybrid", "Startups", "₹1L Grant"],
    link: "https://manthanxfounders.edgeone.app/",
    highlights: "Live startup pitches, investor access, incubation support, and a ₹1 lakh equity-free grant",
    isPast: true
  },
  {
    id: "vibe2ship-2026",
    title: "Vibe2Ship National Vibe Coding Hackathon",
    date: "Event date not provided; registration closed June 23, 2026",
    startDate: "2026-06-23T04:30:00.000Z",
    description: "A national-level AI coding hackathon from Coding Ninjas 10X Club and Google for Developers, with solo participation, Google AI mentorship, and certificates for participants who submitted a solution.",
    type: "Hackathon",
    tags: ["AI", "National", "Solo", "₹3L Prizes"],
    link: "https://tinyurl.com/4dkthd9n",
    highlights: "₹3 lakh prize pool, Google AI mentorship, and participation certificates",
    isPast: true
  },
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

export const events: Event[] = [...eventList].sort(
  (a, b) => Date.parse(b.startDate) - Date.parse(a.startDate),
);

export const eventTypes = ["All", "Hackathon", "Workshop", "Conference", "Networking", "Bootcamp"];

export const bootcamps = [
  { title: "Full-Stack React & Node", duration: "8 Weeks", level: "Beginner", spots: 30, enrolled: 24, description: "Build production-grade web apps from zero to deployment." },
  { title: "Advanced Machine Learning", duration: "12 Weeks", level: "Advanced", spots: 20, enrolled: 18, description: "Deep learning, NLP, computer vision with real research projects." },
  { title: "DevOps & Infrastructure", duration: "6 Weeks", level: "Intermediate", spots: 25, enrolled: 19, description: "Docker, Kubernetes, Terraform, CI/CD — the complete stack." },
  { title: "Mobile App Development", duration: "10 Weeks", level: "Beginner", spots: 30, enrolled: 27, description: "Build cross-platform apps with React Native and Expo." },
  { title: "System Design Mastery", duration: "8 Weeks", level: "Advanced", spots: 15, enrolled: 15, description: "Design scalable systems. Perfect for senior engineer interviews." },
  { title: "Cybersecurity Fundamentals", duration: "6 Weeks", level: "Beginner", spots: 25, enrolled: 12, description: "Network security, ethical hacking, and incident response basics." },
];
