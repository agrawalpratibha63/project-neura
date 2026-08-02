/**
 * Meridian Forge — unified brand system
 * Saffron Meridian (warm identity) + Copper Forge (premium craft)
 */
export const brand = {
  name: "Meridian Forge",

  colors: {
    // Backgrounds — plum base with warm copper undertones
    bg: {
      primary: "#1A1025",
      secondary: "#1F1528",
      tertiary: "#241530",
      warm: "#141210",
      surface: "#2A1F1A",
      surfaceAlt: "#241530",
    },

    // Accents
    saffron: "#E8A838",
    saffronLight: "#F0C060",
    saffronDark: "#C48A20",
    copper: "#C87941",
    copperLight: "#E8C4A0",
    copperDark: "#A06030",
    ember: "#D4622A",

    // Text
    text: {
      primary: "#FAF7F2",
      secondary: "#E8E0D8",
      muted: "#A89BB0",
      warm: "#9A8F85",
    },

    // Semantic
    border: "rgba(200, 121, 65, 0.25)",
    borderLight: "rgba(232, 168, 56, 0.2)",
    glass: "rgba(255, 255, 255, 0.04)",
    glassBorder: "rgba(200, 121, 65, 0.15)",

    // Glows
    glowSaffron: "rgba(232, 168, 56, 0.45)",
    glowCopper: "rgba(200, 121, 65, 0.35)",
    glowCream: "rgba(232, 196, 160, 0.25)",
  },

  gradients: {
    hero: "linear-gradient(180deg, #1A1025 0%, #1F1528 50%, #141210 100%)",
    section: "linear-gradient(180deg, #1A1025 0%, #241530 100%)",
    sectionWarm: "linear-gradient(180deg, #141210 0%, #2A1F1A 100%)",
    cta: "linear-gradient(135deg, #E8A838 0%, #C87941 100%)",
    glow: "radial-gradient(circle, rgba(232,168,56,0.18) 0%, transparent 70%)",
    glowCopper: "radial-gradient(circle, rgba(200,121,65,0.12) 0%, transparent 70%)",
  },

  /** Section-specific accent assignment for visual variety within one brand */
  sections: {
    hero: { primary: "#E8A838", secondary: "#C87941" },
    about: { primary: "#C87941", secondary: "#E8C4A0" },
    skills: { primary: "#E8A838", secondary: "#D4622A" },
    projects: { primary: "#C87941", secondary: "#E8A838" },
    certificates: { primary: "#E8A838", secondary: "#E8C4A0" },
    hackathons: { primary: "#D4622A", secondary: "#E8A838" },
    education: { primary: "#C87941", secondary: "#A89BB0" },
    services: { primary: "#E8A838", secondary: "#C87941" },
    graphics: { primary: "#E8C4A0", secondary: "#C87941" },
    contact: { primary: "#C87941", secondary: "#E8A838" },
  },
} as const;

export type BrandSection = keyof typeof brand.sections;
