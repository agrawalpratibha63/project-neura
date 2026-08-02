"use client";

import PortfolioHero from "./portfolio/PortfolioHero";
import AboutSection from "./portfolio/About/AboutSection";
import SkillsSection from "./skills/SkillsSection";
import ProjectsSection from "./projects/ProjectsSection";
import CertificatesSection from "./certificates/CertificatesSection";
import HackathonsSection from "./hackathons/HackathonsSection";
import EducationSection from "./education/EducationSection";
import ServicesSection from "./services/ServicesSection";
import OtherInterestsSection from "./interests/GraphicsDesignSection";
import ContactSection from "./contact/ContactSection";
import FooterSection from "./footer/FooterSection";

export default function Portfolio() {
  return (
    <main className="bg-[#1A1025] text-white overflow-x-hidden">
      <PortfolioHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <HackathonsSection />
      <EducationSection />
      <ServicesSection />
      <OtherInterestsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
