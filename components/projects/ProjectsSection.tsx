"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";
import { projects } from "@/lib/content/portfolio";

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const hasLiveLink = project.live && project.live !== "#";
  const hasImage = Boolean(project.image?.trim());
  const isSvgPreview = project.image?.endsWith(".svg");
  const isLogoPreview = project.image?.includes("studio-logo");

  const next = () => setActive((a) => (a + 1) % projects.length);
  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);

  return (
    <section
      id="projects"
      className="relative py-24 px-[8%]"
      style={{ background: "linear-gradient(180deg, #141210 0%, #2A1F1A 50%, #1A1025 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-saffron text-sm tracking-widest uppercase">Projects</span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">My Work</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div className="relative aspect-video rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-saffron/5 to-copper/5">
              {hasImage ? (
                <>
                  {isSvgPreview ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={isLogoPreview ? "object-contain p-6 md:p-10" : "object-cover"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {!isLogoPreview && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1025]/45 via-transparent to-transparent pointer-events-none" />
                  )}
                </>
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center m-4 rounded-xl border border-dashed border-white/10">
                  <div className="text-center p-6">
                    <p className="text-zinc-500 text-sm">Preview coming soon</p>
                    <p className="text-zinc-600 text-xs mt-1">Live link after deployment</p>
                  </div>
                </div>
              )}
              {"featured" in project && project.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-saffron/20 border border-saffron/40 text-saffron">
                  Featured
                </span>
              )}
            </div>

            <div>
              <p className="text-saffron text-sm">{project.subtitle}</p>
              <h3 className="font-orbitron text-2xl font-bold text-white mt-1">{project.title}</h3>
              <p className="text-zinc-300 mt-4 leading-relaxed text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-300 hover:text-saffron text-sm"
                  >
                    <IconGithub size={16} /> GitHub
                  </a>
                )}
                {hasLiveLink ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-saffron text-plum hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={16} /> Visit Live Site
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-500 text-sm cursor-not-allowed">
                    <ExternalLink size={16} /> Link coming soon
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button type="button" onClick={prev} className="w-10 h-10 rounded-full border border-white/10 text-white hover:border-copper/50">
            ←
          </button>
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              title={p.title}
              className={`h-2 rounded-full transition-all ${i === active ? "bg-saffron w-5" : "bg-white/20 w-2"}`}
            />
          ))}
          <button type="button" onClick={next} className="w-10 h-10 rounded-full border border-white/10 text-white hover:border-copper/50">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
