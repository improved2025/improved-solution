"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const images = {
  casePublishing: "/images/portfolio/case-publishing.png",
  caseBranding: "/images/portfolio/case-branding.png",
  caseWeb: "/images/portfolio/case-web.png",
  publishingProject: "/images/portfolio/publishing-project.png",
  brandingProject: "/images/portfolio/branding-project.png",
  graphicProject: "/images/portfolio/graphic-project.png",
  printingProject: "/images/portfolio/printing-project.png",
  digitalProject: "/images/portfolio/digital-project.png",
  webProject: "/images/portfolio/web-project.png",
};

function SlidingBG({
  img,
  duration = 14,
  range = 8,
}: {
  img: string;
  duration?: number;
  range?: number;
}) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const finalRange = isMobile ? range * 0.6 : range;
  const finalDuration = isMobile ? duration * 1.2 : duration;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `url('${img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform",
      }}
      initial={{ x: `-${finalRange}%` }}
      animate={{ x: `${finalRange}%` }}
      transition={{
        duration: finalDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}

type Project = {
  id: string;
  title: string;
  meta: string;
  desc: string;
  img: string;
  points: string[];
};

export default function PortfolioPage() {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "publishing",
        title: "Publishing",
        meta: "Editorial / Print",
        desc: "Book formatting + cover system",
        img: images.publishingProject,
        points: [
          "Manuscript readiness and refinement",
          "Interior formatting and layout system",
          "Cover direction aligned to audience expectations",
          "Export-ready print + digital files",
        ],
      },
      {
        id: "branding",
        title: "Branding",
        meta: "Brand / Docs",
        desc: "Identity + documentation suite",
        img: images.brandingProject,
        points: [
          "Identity direction and visual consistency",
          "Company profile and formal documentation",
          "Pitch and proposal structure",
          "Reusable templates for future use",
        ],
      },
      {
        id: "graphic",
        title: "Graphic Design",
        meta: "Design / Print",
        desc: "Campaign graphics + print assets",
        img: images.graphicProject,
        points: [
          "Consistent visual language across assets",
          "Print-ready campaign deliverables",
          "Hierarchy and clarity over decoration",
          "Deliverables packaged for reuse",
        ],
      },
      {
        id: "web",
        title: "Web Build",
        meta: "Web / UI",
        desc: "Studio site + structured UX",
        img: images.webProject,
        points: [
          "Responsive UX structure",
          "Purpose-driven motion cues",
          "Clean information architecture",
          "Clear inquiry and conversion flow",
        ],
      },
      {
        id: "printing",
        title: "Printing",
        meta: "Production",
        desc: "Premium collateral package",
        img: images.printingProject,
        points: [
          "Premium print collateral direction",
          "File preparation for production",
          "Consistent brand finishing",
          "Materials that feel substantial",
        ],
      },
      {
        id: "digital",
        title: "Digital Products",
        meta: "Digital",
        desc: "eBook + resource suite",
        img: images.digitalProject,
        points: [
          "Structured, useful content packaging",
          "Professional layout and presentation",
          "Clear product hierarchy and usage",
          "Polished export-ready files",
        ],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => projects.find((p) => p.id === activeId) || null,
    [projects, activeId]
  );

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    if (activeId) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
        <SlidingBG
          img="/images/services/service-main-background.png"
          duration={14}
          range={8}
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Work</h1>
          <p className="text-white/80 max-w-3xl leading-relaxed">
            Selected work across publishing, branding, design, web, print, and
            digital products. Built with clarity, restraint, and finished
            execution.
          </p>
          <div className="mt-8 h-px w-20 bg-[#C9A24A]/80" />
        </motion.div>
      </section>

      {/* GRID */}
      <section className="px-6 py-24">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Selected projects</h2>
              <p className="text-white/60">
                Focused, finished work across key categories.
              </p>
            </div>

            <a
              href="/quote"
              className="hidden sm:inline-flex rounded-full bg-[#C9A24A] px-6 py-2.5 text-black font-medium hover:bg-[#E6C46A] transition"
            >
              Request a Quote
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((card) => (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => setActiveId(card.id)}
                className="relative rounded-2xl overflow-hidden border border-white/10 text-left focus:outline-none focus:ring-2 focus:ring-[#C9A24A]/60"
                initial={false}
                whileHover="hover"
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                {/* Shared-element image */}
                <motion.div
                  className="absolute inset-0"
                  layoutId={`proj-img-${card.id}`}
                  style={{
                    backgroundImage: `url('${card.img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    willChange: "transform",
                  }}
                  variants={{
                    hover: { scale: 1.06 },
                  }}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/65"
                  variants={{
                    hover: { backgroundColor: "rgba(0,0,0,0.80)" },
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-64">
                  <div className="text-xs text-white/60 mb-1">{card.meta}</div>

                  {/* Shared title motion can be subtle */}
                  <motion.h3
                    className="text-lg font-medium mb-1"
                    variants={{ hover: { y: -8 } }}
                  >
                    {card.title}
                  </motion.h3>

                  <motion.p className="text-white/70 text-sm">
                    {card.desc}
                  </motion.p>

                  <motion.div
                    className="mt-4 text-sm text-white/55"
                    variants={{ hover: { opacity: 1, y: -2 } }}
                    initial={{ opacity: 0, y: 2 }}
                  >
                    View details ↑
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OPTION B: Shared-element modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-black/75"
              onClick={() => setActiveId(null)}
            />

            {/* Modal shell */}
            <motion.div
              className="relative mx-auto w-full max-w-5xl px-6 py-8 md:py-12"
              initial={{ y: 18, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.32, ease: easeOut },
              }}
              exit={{
                y: 12,
                opacity: 0,
                transition: { duration: 0.2, ease: easeOut },
              }}
            >
              <motion.div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-white/80 hover:text-white hover:border-white/30 transition"
                >
                  ✕
                </button>

                {/* Shared-element image expands into this */}
                <motion.div
                  layoutId={`proj-img-${active.id}`}
                  className="relative h-[260px] md:h-[360px]"
                  style={{
                    backgroundImage: `url('${active.img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-black/55" />
                  {/* subtle sweep */}
                  <motion.span
                    aria-hidden
                    className="absolute top-0 bottom-0 w-24 bg-white/18 blur-sm"
                    initial={{ x: "-140%" }}
                    animate={{ x: "240%" }}
                    transition={{
                      duration: 3.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.4,
                    }}
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>

                {/* Body */}
                <div className="p-8 md:p-10">
                  <div className="text-xs text-white/60 mb-2">{active.meta}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                    {active.title}
                  </h3>
                  <p className="text-white/75 leading-relaxed mb-8 max-w-3xl">
                    {active.desc}. Built with deliberate structure and finished execution —
                    designed to hold up in real use.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {active.points.map((p) => (
                      <div
                        key={p}
                        className="rounded-xl border border-white/10 bg-black/35 p-5 text-white/75"
                      >
                        {p}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/quote"
                      className="inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium hover:bg-[#E6C46A] transition"
                    >
                      Request a Quote
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveId(null)}
                      className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                    >
                      Back to projects
                    </button>
                  </div>

                  <div className="mt-6 text-xs text-white/45">
                    Tip: press ESC to close.
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CASE STUDIES */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.header
            className="space-y-2"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Case studies</h2>
            <p className="text-white/70">
              A closer look at finished execution — scoped, structured, delivered.
            </p>
          </motion.header>

          {[
            {
              title: "Publishing: from manuscript to market-ready",
              img: images.casePublishing,
              points: [
                "Manuscript readiness and refinement",
                "Interior formatting and layout system",
                "Cover design aligned to audience expectations",
                "Print + digital files prepared for distribution",
              ],
              duration: 14,
              range: 8,
            },
            {
              title: "Branding & documentation: clarity that earns trust",
              img: images.caseBranding,
              points: [
                "Identity direction and visual consistency",
                "Company profile and professional documentation",
                "Pitch and proposal structure",
                "Export-ready templates for reuse",
              ],
              duration: 15,
              range: 8,
            },
            {
              title: "Web: calm digital experience, built to convert",
              img: images.caseWeb,
              points: [
                "Responsive UX structure",
                "Purpose-driven motion",
                "Clean information architecture",
                "Clear inquiry and conversion flow",
              ],
              duration: 14,
              range: 9,
            },
          ].map((cs) => (
            <motion.div
              key={cs.title}
              className="relative rounded-2xl overflow-hidden border border-white/10"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <SlidingBG img={cs.img} duration={cs.duration} range={cs.range} />
              <div className="absolute inset-0 bg-black/70" />

              <div className="relative z-10 p-10 max-w-3xl">
                <h3 className="text-2xl font-semibold mb-4">{cs.title}</h3>
                <ul className="space-y-2 text-white/75">
                  {cs.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="px-6 py-24 border-t border-white/10"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to build something finished?
            </h3>
            <p className="text-white/70 leading-relaxed max-w-3xl mb-8">
              If your project deserves structured execution and a premium result,
              submit a brief. We’ll respond with next steps if it’s a strong fit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="relative inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium overflow-hidden hover:bg-[#E6C46A] transition"
              >
                <span className="relative z-10">Request a Quote</span>
                <motion.span
                  aria-hidden
                  className="absolute top-0 bottom-0 w-24 bg-white/25 blur-sm"
                  initial={{ x: "-140%" }}
                  animate={{ x: "240%" }}
                  transition={{
                    duration: 3.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                  style={{ transform: "skewX(-20deg)" }}
                />
              </a>

              <a
                href="#"
                className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-6 text-sm text-white/50">
              Prefer email? Use the inquiry form on the quote page.
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
