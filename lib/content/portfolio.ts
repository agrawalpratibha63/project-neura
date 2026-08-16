export const siteMeta = {
  name: "Pratibha Agrawal",
  title: "Pratibha Agrawal | AI & ML Engineer",
  role: "AI / ML Engineer",
  tagline: "Building AI Solutions",
  email: "agrawalpratibha63@gmail.com",
  location: "India",
  resumeUrl: "/resume.pdf",
  searchQuery: "Pratibha Agrawal",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/agrawalpratibha63", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pratibha-agrawal-023005381", icon: "linkedin" },
  { name: "Twitter", url: "https://x.com/AgrawalPra91487", icon: "twitter" },
  { name: "Email", url: "mailto:agrawalpratibha63@gmail.com", icon: "mail" },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Graphics", href: "#graphics" },
  { name: "Contact", href: "#contact" },
];

export const hero = {
  greeting: "Hello, I'm",
  headline: ["Pratibha", "Agrawal"],
  role: "AI / ML Engineer",
  description: "Building AI solutions with a passion for web development and creative design.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Contact Me", href: "#contact" },
  floatingCards: [
    { title: "Artificial Intelligence", value: "AI" },
    { title: "Machine Learning", value: "ML" },
    { title: "Deep Learning", value: "DL" },
    { title: "Python", value: "Py" },
  ],
};

export const about = {
  badge: "ABOUT ME",
  heading: "Building",
  headingAccent: "AI Solutions",
  paragraphs: [
    "I'm Pratibha Agrawal — a B.Tech student passionate about building practical AI solutions.",
    "I'm also interested in web development and graphics designing, and I love turning ideas into clean, useful digital experiences.",
  ],
  cta: { label: "Download Resume", href: "/resume.pdf" },
  stats: [
    { label: "Projects", value: 5, suffix: "" },
    { label: "Certifications", value: 3, suffix: "" },
    { label: "Hackathons", value: 2, suffix: "" },
    { label: "Technologies", value: 10, suffix: "+" },
  ],
};

export const skills = [
  {
    name: "Python",
    category: "Programming",
    proficiency: 92,
    experience: "2+ years",
    level: "Advanced",
    summary: "Primary language for AI/ML, data work, and automation.",
    usedIn: ["ML models", "Data analysis", "Concepta", "Scripting"],
    tools: ["NumPy", "Pandas", "Matplotlib"],
  },
  {
    name: "C",
    category: "Programming",
    proficiency: 76,
    experience: "1+ year",
    level: "Intermediate",
    summary: "Strong fundamentals — memory, pointers, and DSA practice.",
    usedIn: ["University labs", "DSA problems", "System basics"],
    tools: ["GCC", "VS Code"],
  },
  {
    name: "Java",
    category: "Programming",
    proficiency: 80,
    experience: "1.5 years",
    level: "Intermediate",
    summary: "OOP, collections, and academic project development.",
    usedIn: ["College projects", "OOP assignments", "Backend basics"],
    tools: ["JDK", "IntelliJ"],
  },
  {
    name: "HTML",
    category: "Web",
    proficiency: 90,
    experience: "2+ years",
    level: "Advanced",
    summary: "Semantic, accessible markup for real-world layouts.",
    usedIn: ["Portfolio", "University site", "Landing pages"],
    tools: ["HTML5", "SEO basics"],
  },
  {
    name: "CSS",
    category: "Web",
    proficiency: 87,
    experience: "2+ years",
    level: "Advanced",
    summary: "Responsive layouts, animations, and modern UI styling.",
    usedIn: ["Portfolio", "Client designs", "Component styling"],
    tools: ["Flexbox", "Grid", "Animations"],
  },
  {
    name: "React",
    category: "Web",
    proficiency: 86,
    experience: "1+ year",
    level: "Intermediate",
    summary: "Component-based UIs with hooks and state management.",
    usedIn: ["Portfolio", "University website", "SPA projects"],
    tools: ["Hooks", "Framer Motion"],
  },
  {
    name: "Next.js",
    category: "Web",
    proficiency: 84,
    experience: "1+ year",
    level: "Intermediate",
    summary: "Full-stack React apps with App Router and deployment.",
    usedIn: ["This portfolio", "Concepta", "Production sites"],
    tools: ["App Router", "SSR", "Vercel"],
  },
  {
    name: "Tailwind CSS",
    category: "Web",
    proficiency: 88,
    experience: "1+ year",
    level: "Advanced",
    summary: "Rapid UI development with utility-first styling.",
    usedIn: ["Portfolio", "All web projects", "Design systems"],
    tools: ["Custom themes", "Responsive"],
  },
  {
    name: "SQL",
    category: "Database",
    proficiency: 79,
    experience: "1+ year",
    level: "Intermediate",
    summary: "Queries, joins, and data retrieval for analytics.",
    usedIn: ["PW Data Analytics cert", "University DBMS", "Projects"],
    tools: ["MySQL", "JOINs", "Aggregations"],
  },
  {
    name: "Graphics Designing",
    category: "Design",
    proficiency: 93,
    experience: "2+ years",
    level: "Advanced",
    summary: "Logos, banners, thumbnails, cards — client & personal work.",
    usedIn: ["12+ designs", "YouTube thumbnails", "Brand assets"],
    tools: ["Canva Pro", "Photoshop", "Figma"],
  },
];

export const projects = [
  {
    id: "proj-voyageriq",
    title: "VoyagerIQ",
    subtitle: "Travel Sales Intelligence",
    description:
      "A full-stack travel connectivity sales dashboard with Google OAuth, real-time Supabase analytics, sales leaderboards, revenue trends, anomaly detection, and an AI sandbox assistant for reps and managers.",
    tech: ["React", "Vite", "Supabase", "Tailwind CSS", "Recharts"],
    github: "https://github.com/agrawalpratibha63/voyageriq-dashboard",
    live: "https://voyageriq-dashboard.vercel.app",
    image: "/projects/voyageriq-preview.png",
    featured: true,
  },
  {
    id: "proj-graphics-studio",
    title: "Pratibha Graphics Studio",
    subtitle: "Cinematic Graphics Portfolio Vault",
    description:
      "A dedicated graphics portfolio vault for logos, LinkedIn banners, YouTube thumbnails, business cards, wedding invitations, and client work — with auth-gated access, owner admin, and a cinematic atelier experience.",
    tech: ["Expo", "React Native Web", "Supabase", "Reanimated", "Vercel"],
    github: "https://github.com/agrawalpratibha63/pratibha-graphics-studio",
    live: "https://pratibha-graphics-studio.vercel.app",
    image: "/graphics/studio-logo.png",
    featured: true,
  },
  {
    id: "proj-portfolio",
    title: "Personal Portfolio",
    subtitle: "This Website",
    description:
      "My personal portfolio showcasing projects, skills, and creative work — AI/ML engineer profile with gesture navigation, Three.js visuals, and a modern interactive UI.",
    tech: ["Next.js", "React", "Three.js", "Tailwind CSS"],
    github: "https://github.com/agrawalpratibha63/project-neura",
    live: "https://pratibha-agrawal.vercel.app",
    image: "/projects/portfolio-preview.png",
  },
  {
    id: "proj-university",
    title: "ABC University ERP",
    subtitle: "University Management Portal",
    description:
      "Full-stack university ERP with role-based admin, student & faculty dashboards, live analytics, AI chatbot, and glassmorphism UI. Built with Flask, MySQL, Chart.js, and Bootstrap.",
    tech: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/agrawalpratibha63/ABC-UNIVERSITY-PROJECT",
    live: "https://abc-university-project.vercel.app",
    image: "/projects/university-preview.png",
  },
  {
    id: "proj-concepta",
    title: "Concepta",
    subtitle: "AI-Powered Smart Learning Platform",
    description:
      "A full-stack student learning platform with AI-generated roadmaps, subject-focused learning flows, saved learning resources, progress management, AI tutor support, and PDF-based study assistance designed to make learning more structured and practical.",
    tech: ["Next.js", "React", "AI", "Firebase", "Framer Motion"],
    github: "https://github.com/agrawalpratibha63/concepta",
    live: "https://concepta-sable.vercel.app/",
    image: "",
    featured: true,
  },
];

export const certificates = [
  {
    id: "cert-azure",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    year: "2026",
    date: "May 18, 2026",
    verified: true,
    image: "/certificates/microsoft-azure-fundamentals.png",
  },
  {
    id: "cert-hp",
    title: "AI for Beginners",
    issuer: "HP LIFE",
    year: "2026",
    date: "March 27, 2026",
    verified: true,
    image: "/certificates/hp-life-ai-beginners.png",
  },
  {
    id: "cert-pw",
    title: "Basics of Data Analytics",
    issuer: "Physics Wallah × Microsoft",
    year: "2026",
    date: "April 27, 2026",
    verified: true,
    image: "/certificates/pw-data-analytics.png",
  },
];

export const hackathons = [
  {
    id: "hack-h4t",
    title: "Hack4Tech — 8 Hour Hackathon",
    event: "Hack4Tech × GLA University",
    year: "2026",
    date: "Online Participation",
    description: "Certificate of participation for actively joining the 8-hour hackathon organized by Hack4Tech and GLA University.",
    image: "/certificates/hack4tech-hackathon.png",
    verified: true,
  },
  {
    id: "hack-den",
    title: "Hack-The-Den 2026",
    event: "Coders Den × IEEE IPEC Student Branch",
    year: "2026",
    date: "June 12, 2026 · Coding Blocks Office",
    description: "Offline hackathon participation certificate — organized by Coders Den in collaboration with IEEE IPEC Student Branch.",
    image: "/certificates/hack-the-den-2026.png",
    verified: true,
  },
];

export const education = [
  {
    id: "edu-1",
    institution: "B.Tech — Computer Science / Engineering",
    degree: "First Year",
    period: "2025 – Present",
    cgpa: "8.77 CPI (Overall)",
    achievements: ["First Year"],
  },
  {
    id: "edu-2",
    institution: "Higher Secondary (PCM)",
    degree: "Class XII",
    period: "Completed",
    cgpa: "90%",
    achievements: ["PCM"],
  },
];

export const services = [
  { id: "svc-1", title: "Web Development", description: "Clean, responsive websites and web apps using modern tools like React and Next.js.", icon: "code" },
  { id: "svc-2", title: "UI/UX Design", description: "User-friendly interfaces with thoughtful layout, clarity, and visual polish.", icon: "palette" },
  { id: "svc-3", title: "Graphics Design", description: "Creative visuals, posters, and branding assets with a sharp, modern look.", icon: "brush" },
];

export const otherInterests = {
  title: "Graphics Designing",
  description: "I have a strong interest in graphics designing — creating posters, social media creatives, and visual branding. Below is a preview gallery of my work (more coming soon).",
  gallery: [
    "/graphics/work-1.jpg",
    "/graphics/work-2.jpg",
    "/graphics/work-3.jpg",
    "/graphics/work-4.jpg",
    "/graphics/work-5.jpg",
    "/graphics/work-6.jpg",
  ],
};

export const contact = {
  heading: "Let's Connect",
  subheading: "Open to collaborations, internships, and creative projects.",
  terminalPrompt: "agrawalpratibha63@gmail.com:~$ ",
  terminalMessages: [
    "Hi! Thanks for visiting.",
    "Feel free to reach out anytime.",
    "Let's build something together.",
  ],
  formEndpoint: "https://formspree.io/f/example",
};

export const footer = {
  quote: "Building useful things, one project at a time.",
  copyright: `© ${new Date().getFullYear()} Pratibha Agrawal. All rights reserved.`,
};

/** @deprecated Section removed from site — kept for unused component files */
export const achievements: { id: string; title: string; category: string; year: string; description: string }[] = [];
/** @deprecated Section removed from site — kept for unused component files */
export const experience: { id: string; type: string; role: string; company: string; period: string; description: string; tags: string[] }[] = [];
