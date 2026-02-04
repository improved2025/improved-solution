"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Use the clean Gumroad URL (no tracking params)
const GUMROAD_LINK = "https://jefinno.gumroad.com/l/nijoo";

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
  format: string;
  priceLabel: string;
  cover: string;
  bullets: string[];
  gumroadUrl: string;
};

export default function ProductsClient() {
  // Update these fields to match your real eBook details
  const product: Product = {
    id: "nijoo",
    title: "NIJOO",
    subtitle: "A premium eBook, delivered instantly after purchase",
    desc:
      "A professionally packaged digital product designed for immediate value and long-term reference. Clean layout. Clear structure. No noise.",
    format: "PDF",
    priceLabel: "Paid download",
    cover: "/images/products/bounce-cover.png", 
    bullets: [
      "Professionally formatted for easy reading",
      "Designed for clarity and reuse",
      "Instant download after payment",
      "Secure delivery handled by Gumroad",
    ],
    gumroadUrl: GUMROAD_LINK,
  };

  const [open, setOpen] = useState(false);

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
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">eBooks</h1>
          <p className="text-white/80 max-w-3xl leading-relaxed">
            Digital products built with structure and premium presentation. Purchase securely and
            download instantly.
          </p>
          <div className="mt-8 h-px w-20 bg-[#C9A24A]/80" />
        </motion.div>
      </section>

      {/* PRODUCT */}
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
              <h2 className="text-3xl font-semibold mb-2">Available now</h2>
              <p className="text-white/60">One product live. We’ll expand this library next.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* COVER */}
            <div className="lg:col-span-5">
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-white/10"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${product.cover}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    willChange: "transform",
                  }}
                  animate={{ scale: [1.02, 1.06, 1.02] }}
                  transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 p-10 min-h-[360px] flex flex-col justify-end">
                  <div className="text-xs text-white/60 mb-2">
                    {product.format} • {product.priceLabel}
                  </div>
                  <div className="text-2xl font-semibold">{product.title}</div>
                  <div className="text-white/70 mt-2">{product.subtitle}</div>
                </div>
              </motion.div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-10">
                <div className="text-xs text-white/60 uppercase tracking-wide mb-3">
                  What you get
                </div>

                <p className="text-white/80 leading-relaxed mb-8">{product.desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {product.bullets.map((b) => (
                    <div
                      key={b}
                      className="rounded-xl border border-white/10 bg-black/35 p-5 text-white/75"
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={product.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium overflow-hidden hover:bg-[#E6C46A] transition"
                  >
                    <span className="relative z-10">Buy eBook</span>
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

                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                  >
                    Preview details
                  </button>
                </div>

                <div className="mt-6 text-sm text-white/50">
                  Checkout and delivery are securely handled by Gumroad.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MODAL (Preview details) */}
      <AnimatePresence>
        {open && (
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
              onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-white/80 hover:text-white hover:border-white/30 transition"
                >
                  ✕
                </button>

                <div className="p-10">
                  <div className="text-xs text-white/55 mb-2">
                    {product.format} • {product.priceLabel}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-white/70 mb-6">{product.subtitle}</p>

                  <p className="text-white/80 leading-relaxed mb-8">{product.desc}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {product.bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-white/10 bg-black/35 p-5 text-white/75"
                      >
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={product.gumroadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium hover:bg-[#E6C46A] transition"
                    >
                      Buy on Gumroad
                    </a>

                    <a
                      href="/services#digital"
                      className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                    >
                      Digital Products Service
                    </a>
                  </div>

                  <div className="mt-6 text-xs text-white/45">
                    Tip: Replace the placeholder cover path with your real eBook cover when ready.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
