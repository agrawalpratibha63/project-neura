"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteMeta } from "@/lib/content/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-[9999] border-b border-white/8"
      style={{
        background: "rgba(26,16,37,.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 5px 30px rgba(0,0,0,.25)",
      }}
    >
      <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:h-[80px] sm:px-6 lg:h-[90px] lg:px-[70px]">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.03 }}
          className="flex min-w-0 items-center gap-3 cursor-pointer no-underline sm:gap-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black text-white sm:h-12 sm:w-12 sm:text-xl lg:h-14 lg:w-14 lg:text-2xl"
            style={{
              background: "linear-gradient(135deg,#E8A838,#C87941)",
              boxShadow: "0 0 25px rgba(232,168,56,.35)",
            }}
          >
            P
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-white sm:text-lg lg:text-xl">{siteMeta.name.split(" ")[0]}</div>
            <div className="hidden truncate text-[9px] tracking-[2px] text-[#E8C4A0] sm:block lg:text-xs lg:tracking-[3px]">{siteMeta.role.toUpperCase()}</div>
          </div>
        </motion.a>

        <nav className="hidden items-center gap-12 lg:flex">
          {navLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ color: "#E8A838", y: -2 }}
              transition={{ duration: 0.25 }}
              className="text-base font-medium text-white no-underline"
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            href={siteMeta.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-white no-underline sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm lg:px-8 lg:py-3 lg:text-base"
            style={{
              background: "linear-gradient(135deg,#C87941,#E8A838)",
              boxShadow: "0 0 25px rgba(232,168,56,.25)",
            }}
          >
            Resume
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#1A1025]/95 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center text-sm text-zinc-200 transition hover:border-copper/30 hover:text-saffron"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
