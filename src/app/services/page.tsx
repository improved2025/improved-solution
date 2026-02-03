"use client";

import React from "react";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
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
      initial={{ x: `-${range}%` }}
      animate={{ x: `${range}%` }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}

function Section({
  id,
  img,
  overlay = "bg-black/70",
  duration = 14,
  range = 8,
  children,
}: {
  id?: string;
  img: string;
  overlay?: string;
  duration?: number;
  range?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative px-6 py-24 border-t border-white/10 overflow-hidden scroll-mt-24"
    >
      <SlidingBG img={img} duration={duration} range={range} />
      <div className={`absolute inset-0 ${overlay}`} />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-black text-white">
      {/* HERO (unifier background) */}
      <section className="relative px-6 py-24 border-b border-white/10 overflow-hidden">
        <SlidingBG img="/images/services/service-main-background.png" duration={20} range={6} />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Services built for execution, not experimentation.
          </h1>
          <p className="text-white/80 max-w-3xl leading-relaxed">
            We deliver finished work — clearly scoped, professionally executed,
            and designed to perform in the real world.
          </p>
          <div className="mt-8 h-px w-20 bg-[#C9A24A]/80" />
        </motion.div>
      </section>

      {/* OVERVIEW GRID (unified background) */}
      <section className="relative px-6 py-24 overflow-hidden">
        <SlidingBG img="/images/services/service-main-background.png" duration={16} range={7} />
        <div className="absolute inset-0 bg-black/75" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ["Publishing", "#publishing", "Publishing, done with credibility."],
              ["Branding & Documentation", "#branding", "Structured clarity that earns trust."],
              ["Graphic & Logo Design", "#design", "Design that communicates, not decorates."],
              ["Website & App Design", "#web", "Calm, modern experiences that convert."],
              ["Printing", "#printing", "Print materials that feel premium."],
              ["Digital Products", "#digital", "Knowledge, packaged professionally."],
            ].map(([title, link, desc]) => (
              <motion.a
                key={title}
                href={link}
                className="group border border-white/10 rounded-xl p-6 bg-black/35 hover:border-white/30 transition"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{title}</h3>
                    <p className="text-white/60 text-sm">{desc}</p>
                  </div>
                  <span className="text-white/35 group-hover:text-white/80 transition">
                    →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PUBLISHING */}
      <Section
        id="publishing"
        img="/images/services/publishing-background.png"
        overlay="bg-black/70"
        duration={14}
        range={8}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Publishing</h2>
            <p className="text-white/80 text-lg">
              Publishing is not just production. It’s credibility.
            </p>
            <p className="text-white/70 leading-relaxed">
              We support authors, organizations, and institutions through the full publishing
              lifecycle — from manuscript readiness to finished, market-ready books.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>Manuscript review and structural editing</li>
                <li>Line editing and proofreading</li>
                <li>Interior layout and book formatting</li>
                <li>Cover design (print and digital)</li>
                <li>ISBN guidance and registration</li>
                <li>Publishing platform setup (Amazon KDP and others)</li>
                <li>Print-ready and distribution-ready files</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>First-time authors who want it done right</li>
                <li>Professionals publishing thought leadership</li>
                <li>Ministries and organizations producing official materials</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              A professionally published book that looks credible, reads cleanly, and represents you well.
            </p>
          </div>
        </div>
      </Section>

      {/* BRANDING */}
      <Section
        id="branding"
        img="/images/services/branding-background.png"
        overlay="bg-black/70"
        duration={15}
        range={8}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Branding & Documentation</h2>
            <p className="text-white/80 text-lg">
              Your brand should speak clearly even when you’re not in the room.
            </p>
            <p className="text-white/70 leading-relaxed">
              We build brand systems and documents that communicate authority, structure, and trust —
              especially in formal and professional settings.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>Brand identity development</li>
                <li>Company profiles</li>
                <li>Business proposals and pitch documents</li>
                <li>Organizational documentation</li>
                <li>Registration and formal brand materials</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>Startups and growing businesses</li>
                <li>Nonprofits and ministries</li>
                <li>Professionals dealing with institutions, investors, or partners</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              Clear, professional documentation that positions you as organized, legitimate, and prepared.
            </p>
          </div>
        </div>
      </Section>

      {/* DESIGN */}
      <Section
        id="design"
        img="/images/services/graphic-background.png"
        overlay="bg-black/70"
        duration={14}
        range={9}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Graphic & Logo Design</h2>
            <p className="text-white/80 text-lg">Design is not decoration. It’s communication.</p>
            <p className="text-white/70 leading-relaxed">
              We design visual systems that are intentional, restrained, and built to last — not trendy assets
              that expire in six months.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>Logo design and refinement</li>
                <li>Brand visual systems</li>
                <li>Marketing graphics</li>
                <li>Print-ready design assets</li>
                <li>Consistent visual language across platforms</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>Businesses that want credibility, not flash</li>
                <li>Brands ready to look established</li>
                <li>Organizations tired of inconsistent visuals</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              A visual identity that communicates confidence and consistency everywhere it appears.
            </p>
          </div>
        </div>
      </Section>

      {/* WEB */}
      <Section
        id="web"
        img="/images/services/web-background.png"
        overlay="bg-black/70"
        duration={15}
        range={8}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Website & App Design</h2>
            <p className="text-white/80 text-lg">
              Digital experiences should feel calm, clear, and alive.
            </p>
            <p className="text-white/70 leading-relaxed">
              We design and build responsive digital experiences with purpose-driven motion — not noise.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>Website design and development</li>
                <li>Responsive layouts (desktop, tablet, mobile)</li>
                <li>UX-focused structure</li>
                <li>Motion design that guides attention</li>
                <li>App interface design</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>Brands that want trust at first glance</li>
                <li>Professionals who need clarity, not clutter</li>
                <li>Organizations ready to modernize their presence</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              A digital experience that feels modern, intentional, and credible.
            </p>
          </div>
        </div>
      </Section>

      {/* PRINTING */}
      <Section
        id="printing"
        img="/images/services/printing-background.png"
        overlay="bg-black/70"
        duration={14}
        range={8}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Printing</h2>
            <p className="text-white/80 text-lg">Print still matters when it’s done well.</p>
            <p className="text-white/70 leading-relaxed">
              We produce premium printed materials that feel substantial, professional, and aligned with your brand.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>Flyers and brochures</li>
                <li>Banners and large-format prints</li>
                <li>Magazines and booklets</li>
                <li>Branded materials</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>Businesses attending events</li>
                <li>Organizations distributing official materials</li>
                <li>Brands that care about physical presentation</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              Print materials that feel premium — not disposable.
            </p>
          </div>
        </div>
      </Section>

      {/* DIGITAL */}
      <Section
        id="digital"
        img="/images/services/digital-background.png"
        overlay="bg-black/70"
        duration={15}
        range={8}
      >
        <div className="space-y-10">
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Digital Products</h2>
            <p className="text-white/80 text-lg">Knowledge, packaged professionally.</p>
            <p className="text-white/70 leading-relaxed">
              We create and distribute professional digital products designed for immediate value and long-term use.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Services Include</h3>
              <ul className="space-y-2 text-white/75">
                <li>eBooks</li>
                <li>Digital resources</li>
                <li>Structured content products</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm tracking-wide text-white/60 uppercase">Who This Is For</h3>
              <ul className="space-y-2 text-white/75">
                <li>Educators and professionals</li>
                <li>Organizations distributing knowledge</li>
                <li>Brands expanding beyond services</li>
              </ul>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-black/40">
            <h3 className="text-sm tracking-wide text-white/60 uppercase mb-2">Outcome</h3>
            <p className="text-white/80 leading-relaxed">
              Digital products that feel polished, useful, and credible.
            </p>
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <motion.section
        className="px-6 py-24 border-t border-white/10"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="text-3xl font-semibold">How we work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Clarify the objective",
              "Define scope and deliverables",
              "Execute with discipline",
              "Deliver finished work",
            ].map((step) => (
              <motion.div
                key={step}
                className="rounded-xl border border-white/10 bg-black/40 p-6"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <p className="text-white/80">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
              Serious work deserves a serious approach.
            </h3>
            <p className="text-white/70 leading-relaxed max-w-3xl mb-8">
              If you’re ready to move from ideas to finished execution, submit a brief.
              We’ll respond with next steps if there’s a strong fit.
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

              {/* Replace with your live WhatsApp URL */}
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
