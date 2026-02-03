"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const marquee =
  "Publishing • Branding • Design • Web • Print • Digital Products • ";

const services = [
  {
    title: "Publishing",
    desc: "Book editing, cover and interior design, ISBN guidance, and publishing support.",
  },
  {
    title: "Branding & Documentation",
    desc: "Brand identity, company profiles, proposals, and registration support.",
  },
  {
    title: "Graphic & Logo Design",
    desc: "Logos and visual systems designed to communicate authority and trust.",
  },
  {
    title: "Website & App Design",
    desc: "Clean, responsive digital experiences built for credibility and conversion.",
  },
  {
    title: "Printing",
    desc: "Premium flyers, brochures, banners, magazines, and branded materials.",
  },
  {
    title: "Digital Products",
    desc: "Professional eBooks and resources available for immediate purchase.",
  },
];

const sectionFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  }),
};

function PillLink({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "ghost";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 34px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    borderRadius: 999,
    textDecoration: "none",
    userSelect: "none",
    transition: "filter 200ms ease",
  };

  const primary: React.CSSProperties = {
    ...base,
    background: "#C9A24A",
    color: "#0B0F14",
  };

  const ghost: React.CSSProperties = {
    ...base,
    border: "1px solid rgba(255,255,255,0.22)",
    color: "rgba(255,255,255,0.92)",
    background: "rgba(255,255,255,0.02)",
  };

  const style = variant === "primary" ? primary : ghost;

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.28, ease }}>
      <Link href={href} style={style}>
        {children}
      </Link>
    </motion.div>
  );
}

function ExternalPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.28, ease }}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 34px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          borderRadius: 999,
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "rgba(255,255,255,0.92)",
          background: "rgba(14,107,107,0.18)",
        }}
      >
        {children}
      </a>
    </motion.div>
  );
}

/**
 * ImagePanel (alive):
 * - visible luxury drift + mouse parallax
 */
function ImagePanel({
  src,
  alt,
  priority,
  overlay = true,
  aspect = "landscape",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  overlay?: boolean;
  aspect?: "landscape" | "portrait";
}) {
  const h = aspect === "portrait" ? 520 : 460;
  const [xy, setXy] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setXy({ x: px, y: py });
      }}
      onMouseLeave={() => setXy({ x: 0, y: 0 })}
      style={{
        position: "relative",
        width: "100%",
        height: h,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <motion.div
        animate={{
          scale: [1.03, 1.09, 1.03],
          x: [0, -24, 0],
          y: [0, 16, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, willChange: "transform" }}
      >
        <motion.div
          animate={{ x: xy.x * 34, y: xy.y * 34 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </motion.div>

      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,20,0.45) 0%, rgba(11,15,20,0.70) 60%, rgba(11,15,20,0.82) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/**
 * NEW: CraftCarousel (middle slideshow)
 * - auto advance
 * - drag/swipe
 * - dots
 * - premium motion (crossfade + slight slide)
 */
function CraftCarousel({
  items,
}: {
  items: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, 4200);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const next = () => setActive((v) => (v + 1) % items.length);
  const prev = () => setActive((v) => (v - 1 + items.length) % items.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", zIndex: 2 }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 18, scale: 0.995 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -18, scale: 0.995 }}
            transition={{ duration: 0.85, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              const offset = info.offset.x;
              if (offset < -60) next();
              if (offset > 60) prev();
            }}
            style={{ position: "relative" }}
          >
            <ImagePanel
              src={items[active].src}
              alt={items[active].alt}
              overlay={false}
              aspect="landscape"
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          animate={{ x: ["-30%", "140%"] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "40%",
            background:
              "linear-gradient(90deg, transparent, rgba(201,162,74,0.08), transparent)",
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {items.map((_, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              style={{
                width: on ? 26 : 10,
                height: 10,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: on ? "#C9A24A" : "rgba(255,255,255,0.18)",
                transition: "all 220ms ease",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        Craft in motion
      </div>
    </div>
  );
}

/**
 * NEW: ServicesShowcase (lower rotation)
 * - one featured service at a time
 * - auto-cycles
 * - hover pauses
 * - click list to jump
 */
function ServicesShowcase({
  items,
  accent = "#C9A24A",
  quoteHref = "/quote",
}: {
  items: { title: string; desc: string }[];
  accent?: string;
  quoteHref?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cycleMs = 4200;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, cycleMs);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        marginTop: 44,
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: 34,
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
        }}
      >
        {items.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "16px 16px",
                border: "none",
                background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                color: "rgba(255,255,255,0.92)",
                cursor: "pointer",
                display: "flex",
                gap: 12,
                alignItems: "center",
                borderTop:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  background: isActive ? accent : "rgba(255,255,255,0.18)",
                  boxShadow: isActive ? `0 0 22px ${accent}55` : "none",
                  flex: "0 0 auto",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    opacity: isActive ? 1 : 0.82,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 6,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {isActive ? "In focus" : "Tap to view"}
                </div>
              </div>
              <span
                style={{
                  color: isActive ? accent : "rgba(255,255,255,0.22)",
                }}
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.10)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
          overflow: "hidden",
          padding: 22,
        }}
      >
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-30%", "140%"] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(201,162,74,0.08), transparent)",
            filter: "blur(12px)",
            pointerEvents: "none",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Featured service
            </div>

            <h3
              style={{
                marginTop: 12,
                marginBottom: 12,
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {items[active].title}
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 520,
              }}
            >
              {items[active].desc}
            </p>

            <div style={{ marginTop: 18 }}>
              <Link
                href={quoteHref}
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                  color: accent,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Request a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          style={{
            marginTop: 18,
            height: 2,
            background: "rgba(255,255,255,0.10)",
            borderRadius: 99,
            overflow: "hidden",
            opacity: paused ? 0.35 : 1,
          }}
        >
          <motion.div
            key={`${active}-${paused ? "p" : "r"}`}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{ duration: cycleMs / 1000, ease: "linear" }}
            style={{
              height: "100%",
              background: accent,
              opacity: 0.75,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "rgba(255,255,255,0.50)",
          }}
        >
          {paused ? "Paused (hover)" : "Auto-rotating"}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const lines = useMemo(
    () => [
      "Built with clarity and restraint.",
      "Designed to communicate authority.",
      "Crafted for serious work.",
    ],
    []
  );

  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  // ✅ FIX: hooks MUST be declared before any conditional return
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const i = setInterval(() => {
      setIndex((v) => (v + 1) % lines.length);
    }, 5200);
    return () => clearInterval(i);
  }, [mounted, lines.length]);

  if (!mounted) return null;

  const craftSlides = [
    { src: "/images/publishing-open-book.webp", alt: "Publishing craft" },
    { src: "/images/branding-corporate-materials.webp", alt: "Branding materials" },
    { src: "/images/printing-premium-paper.webp", alt: "Premium print materials" },
  ];

  return (
    <main
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "56px 24px 180px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient breathing light */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.05, 1], opacity: [0.18, 0.22, 0.18] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -240,
          left: "50%",
          width: 900,
          height: 900,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, rgba(201,162,74,0.55), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <motion.header
        variants={sectionFadeUp}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 36,
          position: "relative",
          zIndex: 2,
        }}
      >
      <Link
  href="/"
  style={{
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  }}
>
  <Image
    src="/images/logo-icon2.png"
    alt="Improved Solutions"
    width={420}
    height={104}
    priority
    style={{
      height: 76,
      width: "auto",
      display: "block",
    }}
  />
</Link>
             
        <nav
          style={{
            display: "flex",
            gap: 40,
            fontSize: 14,
            color: "rgba(255,255,255,0.86)",
          }}
        >
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Work</Link>
          <Link href="/products">eBooks</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </motion.header>

      {/* Marquee band */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          overflow: "hidden",
          marginBottom: 22,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontSize: 12,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            padding: "12px 0",
          }}
        >
          <span>{marquee.repeat(10)}</span>
        </motion.div>
      </div>

      {/* HERO */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 42,
          alignItems: "center",
          marginTop: 26,
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 640 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease }}
            style={{
              fontSize: 64,
              lineHeight: 1.03,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              marginBottom: 18,
            }}
          >
            Excellence that
            <br />
            moves with intention.
          </motion.h1>

          <div style={{ height: 34, marginBottom: 26 }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                {lines[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.74)",
              marginBottom: 34,
            }}
          >
            Improved Solutions is a multidisciplinary studio delivering publishing,
            branding, documentation, digital experiences, and premium print —
            executed with discipline, clarity, and restraint.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <PillLink href="/quote" variant="primary">
              Begin a Project
            </PillLink>

            <ExternalPill href="https://wa.me/14705692120">WhatsApp</ExternalPill>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.28, ease }}>
              <a
                href="mailto:contact@improvedsolution.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 34px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  borderRadius: 999,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                Email
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <motion.div style={{ y: heroY, scale: heroScale }}>
            <ImagePanel
              src="/images/hero-abstract-digital.webp"
              alt="Abstract digital workspace"
              priority
              overlay
              aspect="portrait"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <motion.div
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        style={{
          margin: "120px 0 84px",
          height: 1,
          background: "rgba(255,255,255,0.10)",
        }}
      />

      {/* MIDDLE: Craft slideshow */}
      <motion.section
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <CraftCarousel items={craftSlides} />
      </motion.section>

      {/* LOWER: Services rotation */}
      <motion.section
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        style={{ marginTop: 92, position: "relative", zIndex: 2 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 22 }}>
          <div style={{ maxWidth: 520 }}>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 14,
              }}
            >
              What we deliver
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              A full studio, built for execution.
            </h2>
            <p style={{ marginTop: 14, color: "rgba(255,255,255,0.70)", lineHeight: 1.75 }}>
              From publishing to production, we deliver work that feels deliberate and finished —
              with speed, clarity, and premium presentation.
            </p>
          </div>

          <div style={{ width: 360, display: "none" as const }} />
        </div>

        <ServicesShowcase items={services} />
      </motion.section>

      {/* Digital section */}
      <motion.section
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        style={{
          marginTop: 110,
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          gap: 34,
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <ImagePanel
          src="/images/digital-motion-lines.webp"
          alt="Digital motion lines"
          overlay
          aspect="portrait"
        />

        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 14,
            }}
          >
            Digital experience
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Interactive by design, not by noise.
          </h2>
          <p style={{ marginTop: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.75 }}>
            We build websites and app experiences that feel modern, responsive, and alive —
            with motion that guides attention and increases trust.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <PillLink href="/portfolio" variant="ghost">
              View Work
            </PillLink>
            <PillLink href="/quote" variant="primary">
              Start a Build
            </PillLink>
          </div>
        </div>
      </motion.section>

      {/* Trust / closing */}
      <motion.section
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        style={{
          marginTop: 120,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative" }}>
          <ImagePanel
            src="/images/trust-modern-interior.webp"
            alt="Modern interior space"
            overlay
            aspect="landscape"
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              padding: 28,
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                Improve the presentation. Improve the outcome.
              </p>
              <p
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                If you want work that looks premium, feels intentional, and delivers with clarity,
                begin a project with Improved Solutions.
              </p>

              <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <PillLink href="/quote" variant="primary">
                  Get a Quote
                </PillLink>
                <ExternalPill href="https://wa.me/14705692120">WhatsApp</ExternalPill>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
          }}
        >
          <div>© {new Date().getFullYear()} Improved Solutions</div>
          <div>
            <a href="mailto:contact@improvedsolution.com" style={{ color: "rgba(255,255,255,0.82)" }}>
              contact@improvedsolution.com
            </a>{" "}
            ·{" "}
            <a
              href="https://wa.me/14705692120"
              target="_blank"
              rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              +1 470-569-2120
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
