export const GRAPHICS_STUDIO_URL = "https://pratibha-graphics-studio.vercel.app";
export const GRAPHICS_STUDIO_LOGO = "/graphics/studio-logo.png";

export const graphicsSkills = [
  "Brand Identity",
  "Typography",
  "Layout Design",
  "Marketing Creatives",
  "Social Media",
  "Business Identity",
  "Presentation Design",
  "Print Design",
] as const;

export const designWorkflow = [
  { id: "idea", label: "AI Idea" },
  { id: "wireframe", label: "Wireframe" },
  { id: "identity", label: "Visual Identity" },
  { id: "graphics", label: "Graphics" },
  { id: "product", label: "Final Product" },
] as const;

export type ShowcaseWork = {
  id: string;
  label: string;
  ribbonLabel: string;
  image: string;
  aspect: "landscape" | "portrait" | "square" | "wide";
};

export const showcaseWorks: ShowcaseWork[] = [
  {
    id: "logo",
    label: "Logo Design",
    ribbonLabel: "Logo",
    image: "/graphics/logo-damini-arts.png",
    aspect: "square",
  },
  {
    id: "business-card",
    label: "Business Card",
    ribbonLabel: "Business Card",
    image: "/graphics/business-card-vijay-book-house.png",
    aspect: "landscape",
  },
  {
    id: "thumbnail",
    label: "YouTube Thumbnail",
    ribbonLabel: "YouTube Thumbnail",
    image: "/graphics/yt-first-order-janmashtami.png",
    aspect: "landscape",
  },
  {
    id: "poster",
    label: "Marketing Poster",
    ribbonLabel: "Poster",
    image: "/graphics/yt-diy-gift-hamper.png",
    aspect: "landscape",
  },
  {
    id: "linkedin",
    label: "LinkedIn Banner",
    ribbonLabel: "LinkedIn Banner",
    image: "/graphics/linkedin-banner-aastha.png",
    aspect: "wide",
  },
  {
    id: "invitation",
    label: "Wedding Invitation",
    ribbonLabel: "Wedding Invitation",
    image: "/graphics/wedding-invitation-shekhar-kajal.png",
    aspect: "portrait",
  },
  {
    id: "social",
    label: "Instagram Creative",
    ribbonLabel: "Instagram Creative",
    image: "/graphics/yt-mothers-day-tshirt.png",
    aspect: "landscape",
  },
  {
    id: "branding",
    label: "Branding Mockup",
    ribbonLabel: "Branding",
    image: "/graphics/yt-shiv-parvati-painting.png",
    aspect: "landscape",
  },
];

export const graphicsPortfolio = {
  title: "Visual Design Studio",
  subtitle: "Great AI products deserve great visual experiences.",
  description:
    "Alongside AI & Machine Learning, I design modern visual identities, branding assets and marketing creatives that make digital products feel intuitive and memorable. Open the live graphics studio directly from the featured preview.",
  studioUrl: GRAPHICS_STUDIO_URL,
  studioLogo: GRAPHICS_STUDIO_LOGO,
  studioTitle: "Pratibha Graphics Studio",
  ctaLabel: "Open Graphics Studio",
  toolkit: ["Canva Pro", "Adobe Photoshop", "Figma"],
};
