/**
 * Content Checkpoints — structured questionnaire defaults.
 * Each section was populated with plan-aligned defaults from existing codebase content.
 * Edit lib/content/portfolio.ts to finalize any value.
 */

export const contentCheckpoints = {
  hero: {
    status: "locked",
    questions: [
      { id: "tagline", chosen: "Building Intelligent AI Experiences", options: ["Building Intelligent AI Experiences", "Engineering the Future with AI", "AI-Powered Digital Innovation"] },
      { id: "ctaPrimary", chosen: "View Projects", options: ["View Projects", "See My Work", "Explore Portfolio"] },
      { id: "orbitSkills", chosen: 8, note: "Python, TensorFlow, PyTorch, React, Next.js, OpenCV, Node.js, Docker" },
    ],
  },
  about: {
    status: "locked",
    questions: [
      { id: "university", chosen: "University of Technology" },
      { id: "degree", chosen: "B.Tech Computer Science" },
      { id: "stats", chosen: "25+ projects, 3+ years, 12 certs, 30+ tech" },
    ],
  },
  experience: {
    status: "locked",
    note: "4 timeline entries: Internship, Project Neura, Leadership, Research",
  },
  projects: {
    status: "locked",
    note: "5 projects with placeholder screenshots — replace images in public/projects/",
  },
  contact: {
    status: "locked",
    questions: [
      { id: "formProvider", chosen: "formspree", options: ["formspree", "resend", "emailjs"] },
    ],
  },
} as const;
