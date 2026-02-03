"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

function SlidingBG({
  img,
  duration = 22,
  range = 6,
}: {
  img: string;
  duration?: number;
  range?: number;
}) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const finalRange = isMobile ? range * 0.6 : range;
  const finalDuration = isMobile ? duration * 1.15 : duration;

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

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-28 border-b border-white/10">
        <SlidingBG img="/images/services/service-main-background.png" />
        <div className="absolute inset-0 bg-black/75" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Let’s talk.
          </h1>

          <p className="text-white/80 max-w-2xl leading-relaxed">
            For general questions, partnerships, or clarifications, reach out
            directly. If you’re looking to start a project, please use the quote
            form instead.
          </p>

          <div className="mt-10 h-px w-20 bg-[#C9A24A]/80" />
        </motion.div>
      </section>

      {/* CONTACT METHODS */}
      <motion.section
        className="px-6 py-24"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Email */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10">
            <h2 className="text-2xl font-semibold mb-4">Email</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The best way to reach us for general communication.
            </p>

            <a
              href="mailto:jefinno73@gmail.com"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white hover:border-white/40 transition"
            >
              jefinno73@gmail.com
            </a>

            <div className="mt-4 text-sm text-white/45">
              Response time may vary depending on inquiry.
            </div>
          </div>

          {/* Project Direction */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-10">
            <h2 className="text-2xl font-semibold mb-4">Starting a project?</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              If you already know you want to engage our services, the quote
              form is the right place to begin.
            </p>

            <a
              href="/quote"
              className="inline-flex items-center rounded-full bg-[#C9A24A] px-6 py-3 text-black font-medium hover:bg-[#E6C46A] transition"
            >
              Request a Quote
            </a>

            <div className="mt-4 text-sm text-white/45">
              Scoped requests receive priority.
            </div>
          </div>
        </div>
      </motion.section>

      {/* CLOSING NOTE */}
      <motion.section
        className="px-6 py-20 border-t border-white/10"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-white/60 leading-relaxed max-w-3xl">
            Improved Solutions operates with clarity and intention. We value
            thoughtful communication and respond where alignment exists.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
