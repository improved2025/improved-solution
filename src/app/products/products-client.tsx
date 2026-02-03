"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SlidingBG({
  img,
  duration = 16,
  range = 7,
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

type Product = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  format: string; // e.g. PDF, ePub, Bundle
  price?: string; // optional until you decide
  cover?: string; // /images/products/...
  bullets: string[];
};

export default function ProductsClient() {
  const products = useMemo<Product[]>(
    () => [
      {
        id: "premium-ebook-1",
        title: "Premium eBook Title",
        subtitle: "A structured guide designed for real use",
        desc: "Clear, practical content packaged professionally. Built for readers who want direction, not noise.",
        format: "PDF",
        price: "Coming soon",
        cover: "", // add later: /images/products/cover-1.png
        bullets: ["Clean layout", "Immediate takeaways", "Designed to be referenced"],
      },
      {
        id: "resource-kit-1",
        title: "Resource Kit",
        subtitle: "Templates and frameworks you can reuse",
        desc: "A focused bundle of tools and structure — useful the same day you download it.",
        format: "Bundle",
        price: "Coming soon",
        cover: "",
        bullets: ["Reusable templates", "Simple structure", "Professional formatting"],
      },
      {
        id: "ebook-series-1",
        title: "Series / Collection",
        subtitle: "A set built around one clear outcome",
        desc: "A cohesive collection with consistent design and a deliberate learning flow.",
        format: "PDF + ePub",
        price: "Coming soon",
        cover: "",
        bullets: ["Consistent visual system", "Clear progression", "Built for depth"],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = products.find((p) => p.id === activeId) || null;

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
        <SlidingBG img="/images/services/service-main-background.png" duration={16} range={7} />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">eBooks & Digital Products</h1>
          <p className="text-white/80 max-w-3xl leading-relaxed">
            Professional digital products designed for immediate value and long-term use.
            Packaged with clarity, structure, and premium presentation.
          </p>
          <div className="mt-8 h-px w-20 bg-[#C9A24A]/80" />
        </motion.div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="relative px-6 py-24 overflow-hidden">
        <SlidingBG img="/images/services/service-main-background.png" duration={18} range={7} />
        <div className="absolute inset-0 bg-black/75" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Available soon</h2>
              <p className="text-white/60">
                This section is built to scale. Add covers, prices, and checkout when ready.
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
            {products.map((p) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className="group text-left rounded-2xl border border-white/10 bg-black/35 p-7 hover:border-white/25 transition focus:outline-none focus:ring-2 focus:ring-[#C9A24A]/60"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <div className="text-xs text-white/55 mb-2">{p.format}</div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-1">{p.title}</h3>
                    <p className="text-white/65 text-sm mb-4">{p.subtitle}</p>
                  </div>
                  <span className="text-white/35 group-hover:text-white/80 transition">→</span>
                </div>

                <p className="text-white/75 text-sm leading-relaxed mb-5">{p.desc}</p>

                <div className="space-y-2">
                  {p.bullets.slice(0, 3).map((b) => (
                    <div key={b} className="text-sm text-white/65">
                      • {b}
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-sm text-white/55">
                  {p.price ? p.price : "—"}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-black/80"
              onClick={() => setActiveId(null)}
            />

            <motion.div
              className="relative mx-auto w-full max-w-4xl px-6 py-10"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.32, ease: easeOut } }}
              exit={{ y: 10, opacity: 0, transition: { duration: 0.2, ease: easeOut } }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-white/80 hover:text-white hover:border-white/30 transition"
                >
                  ✕
                </button>

                <div className="p-10">
                  <div className="text-xs text-white/55 mb-2">{active.format}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">{active.title}</h3>
                  <p className="text-white/70 mb-6">{active.subtitle}</p>

                  <p className="text-white/80 leading-relaxed mb-8">{active.desc}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {active.bullets.map((b) => (
                      <div key={b} className="rounded-xl border border-white/10 bg-black/35 p-5 text-white/75">
                        {b}
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
                    <a
                      href="/services"
                      className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                    >
                      Explore Services
                    </a>
                  </div>

                  <div className="mt-6 text-xs text-white/45">
                    This page is ready for Stripe/Gumroad checkout whenever you decide.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA */}
      <motion.section
        className="px-6 py-24 border-t border-white/10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Want a digital product built professionally?
            </h3>
            <p className="text-white/70 leading-relaxed max-w-3xl mb-8">
              If you’re packaging knowledge, training, or resources, we can design the product system,
              layout, cover, and distribution assets so it feels premium and credible.
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
                href="/services#digital"
                className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
              >
                Digital Products Service
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
