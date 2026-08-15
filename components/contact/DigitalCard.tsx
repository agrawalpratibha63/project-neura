"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteMeta, socialLinks } from "@/lib/content/portfolio";
import { IconGithub, IconLinkedin, IconTwitter } from "@/components/ui/SocialIcons";
import { Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <IconGithub size={18} />,
  linkedin: <IconLinkedin size={18} />,
  twitter: <IconTwitter size={18} />,
  mail: <Mail size={18} />,
};

export default function DigitalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(6,18,38,0.98) 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(232,168,56,0.08)",
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-saffron via-copper to-saffron" />

        <div className="p-8">
          {/* Photo + identity */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-copper/30 shrink-0">
              <Image
                src="/images/profile.jpeg"
                alt={siteMeta.name}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl leading-tight">{siteMeta.name}</h3>
              <p className="text-saffron text-sm font-medium mt-1">AI / ML Student</p>
              <p className="text-zinc-500 text-xs mt-1">B.Tech · GLA University</p>
            </div>
          </div>

          <div className="my-6 h-px bg-white/10" />

          {/* Contact row */}
          <div className="space-y-2 text-sm">
            <p className="text-zinc-400">
              <span className="text-zinc-600 text-xs uppercase tracking-wider mr-2">Email</span>
              <a href={`mailto:${siteMeta.email}`} className="text-zinc-300 hover:text-saffron no-underline transition-colors">
                {siteMeta.email}
              </a>
            </p>
            <p className="text-zinc-400">
              <span className="text-zinc-600 text-xs uppercase tracking-wider mr-2">Location</span>
              <span className="text-zinc-300">India</span>
            </p>
          </div>

          <div className="my-6 h-px bg-white/10" />

          {/* Social links */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-saffron hover:border-copper/30 hover:bg-saffron/5 transition-all text-xs no-underline"
              >
                {iconMap[link.icon]}
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-8 py-3 bg-white/[0.03] border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Digital Card</span>
          <a
            href={siteMeta.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-saffron/80 hover:text-saffron uppercase tracking-wider no-underline transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </div>
    </motion.div>
  );
}
