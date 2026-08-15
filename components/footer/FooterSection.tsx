"use client";

import { footer, navLinks, socialLinks, siteMeta } from "@/lib/content/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { IconGithub, IconLinkedin, IconTwitter } from "@/components/ui/SocialIcons";

const iconMap: Record<string, React.ReactNode> = {
  github: <IconGithub size={18} />,
  linkedin: <IconLinkedin size={18} />,
  twitter: <IconTwitter size={18} />,
  mail: <Mail size={18} />,
};

export default function FooterSection() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-[8%] border-t border-white/5" style={{ background: "#1A1025" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-copper flex items-center justify-center text-white font-bold">P</div>
              <span className="font-orbitron text-white font-bold">{siteMeta.name}</span>
            </div>
            <p className="text-zinc-500 text-sm mt-4 italic">&ldquo;{footer.quote}&rdquo;</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-zinc-400 text-sm hover:text-saffron transition-colors">{link.name}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-saffron transition-colors">
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/5 gap-4">
          <p className="text-zinc-500 text-sm">{footer.copyright}</p>
          <button type="button" onClick={scrollTop} className="flex items-center gap-2 text-zinc-400 hover:text-saffron text-sm transition-colors">
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
