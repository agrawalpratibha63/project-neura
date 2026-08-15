"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  LayoutTemplate,
  ServerCog,
  Sparkles,
  TerminalSquare,
  Wrench,
} from "lucide-react";

const groups = [
  {
    title: "Programming",
    subtitle: "Core languages",
    icon: Braces,
    items: ["Python", "Java", "C", "SQL"],
  },
  {
    title: "Frontend",
    subtitle: "Interfaces & experiences",
    icon: LayoutTemplate,
    items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    subtitle: "APIs & application logic",
    icon: ServerCog,
    items: ["Python", "Flask", "Node.js", "REST APIs"],
  },
  {
    title: "Databases",
    subtitle: "Data storage & querying",
    icon: Database,
    items: ["MySQL", "Supabase", "SQL"],
  },
  {
    title: "Cloud & Deployment",
    subtitle: "Platforms & hosting",
    icon: Cloud,
    items: ["Microsoft Azure", "Vercel", "Supabase"],
  },
  {
    title: "Developer Tools",
    subtitle: "Daily workflow",
    icon: Wrench,
    items: ["VS Code", "IntelliJ IDEA", "Git", "GitHub", "Postman"],
  },
  {
    title: "AI Builder & Creative Tools",
    subtitle: "15+ tools explored in real workflows",
    icon: Sparkles,
    items: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Rocket",
      "Lovable",
      "Replit",
      "Figma",
      "Canva",
      "Gamma",
      "Bolt",
      "Wan AI",
      "Flow",
      "Veo",
      "Nano Banana",
    ],
  },
];

const codingProfiles = [
  { name: "GitHub", meta: "Projects & source code", href: "https://github.com/agrawalpratibha63", icon: Code2 },
  { name: "LeetCode", meta: "DSA practice", href: "https://leetcode.com/u/PratibhaAgrawal/", icon: Code2 },
  { name: "HackerRank", meta: "Problem solving", href: "", icon: TerminalSquare },
  { name: "CodeChef", meta: "Competitive coding", href: "", icon: Braces },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-[8%]"
      style={{ background: "linear-gradient(180deg, #1A1025 0%, #1F1528 50%, #1A1025 100%)" }}
    >
      <div className="pointer-events-none absolute left-[-8%] top-1/3 h-80 w-80 rounded-full bg-copper/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-4%] top-24 h-72 w-72 rounded-full bg-saffron/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 md:flex md:items-end md:justify-between md:gap-10 md:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.26em] text-saffron sm:text-sm">Tech Stack & Tools</span>
            <h2 className="mt-3 font-orbitron text-3xl font-bold text-white md:text-4xl">What I Build With</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Technologies organized by how I use them — from engineering and deployment to AI-assisted building, design, and creative workflows.
            </p>
          </div>
          <div className="mt-6 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-400 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Actively learning & building
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38, delay: Math.min(index * 0.035, 0.18) }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-copper/35 hover:bg-white/[0.05] sm:p-6 ${
                  group.title === "AI Builder & Creative Tools" ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-saffron/[0.04] blur-2xl transition group-hover:bg-saffron/[0.08]" />
                <div className="relative">
                  {group.title === "AI Builder & Creative Tools" && (
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-saffron sm:text-xs">
                      <span className="rounded-full border border-saffron/20 bg-saffron/10 px-3 py-1.5">Worked with 15+ AI tools</span>
                      <span className="text-zinc-500">Build · Research · Design · Video</span>
                    </div>
                  )}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-saffron/20 bg-saffron/10 text-saffron">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{group.title}</h3>
                      <p className="mt-0.5 text-xs text-zinc-500">{group.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-xs text-zinc-300 transition group-hover:border-white/10 sm:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.025] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.22em] text-saffron">Coding Profiles</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Practice, projects & problem solving</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                A compact place for recruiters to jump directly to source code and competitive programming profiles.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto lg:min-w-[520px]">
              {codingProfiles.map((profile) => {
                const Icon = profile.icon;
                const hasLink = Boolean(profile.href);
                const content = (
                  <>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-cream">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white">{profile.name}</p>
                      <p className="truncate text-[11px] text-zinc-500">{hasLink ? profile.meta : `${profile.meta} · link to be added`}</p>
                    </div>
                    {hasLink && <ExternalLink size={14} className="ml-auto shrink-0 text-zinc-600" />}
                  </>
                );

                return hasLink ? (
                  <a
                    key={profile.name}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.08] bg-black/15 p-3 transition hover:border-copper/35 hover:bg-copper/[0.06]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={profile.name} className="flex min-w-0 items-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-black/10 p-3 opacity-80">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
