"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
};

function SlidingBG({
  img,
  duration = 18,
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

const SERVICES = [
  "Publishing",
  "Branding & Documentation",
  "Graphic & Logo Design",
  "Website & App Design",
  "Printing",
  "Digital Products",
];

export default function QuotePage() {
  const serviceOptions = useMemo(() => SERVICES, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(serviceOptions[0] || "Publishing");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const canSend =
    fullName.trim().length >= 2 &&
    email.trim().includes("@") &&
    message.trim().length >= 10 &&
    status !== "sending";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!canSend) {
      setStatus("error");
      setErrorMsg(
        "Please complete all fields (message should be at least 10 characters)."
      );
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          service,
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24 border-b border-white/10">
        <SlidingBG img="/images/quote-background.png" duration={20} range={6} />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left: Copy */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-semibold">
              Request a Quote
            </h1>
            <p className="text-white/80 leading-relaxed max-w-xl">
              Share what you need, choose the service category, and send your
              request. We respond by email with next steps if it’s a strong fit.
            </p>

            <div className="mt-6 h-px w-20 bg-[#C9A24A]/80" />

            <div className="pt-4 text-sm text-white/55 space-y-2">
              <div>Response channel: email only</div>
              <div className="text-white/40">
                Tip: include context, deadline, and any existing assets.
              </div>
            </div>
          </motion.div>

          {/* Right: Form / Success */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-black/45 p-8 md:p-10"
          >
            {status === "sent" ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="text-2xl font-semibold">Inquiry received.</div>
                  <p className="text-white/70 leading-relaxed">
                    You’re good. Your request has been sent successfully.
                    If it matches our scope, you’ll receive a reply by email with
                    next steps.
                  </p>
                  <p className="text-white/55 text-sm">
                    While you wait, you can explore our services to see the full
                    scope of what we deliver.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/services"
                    className="inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium hover:bg-[#E6C46A] transition"
                  >
                    Explore Services
                  </a>

                  <a
                    href="/"
                    className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                  >
                    Back to Home
                  </a>
                </div>

                <div className="text-xs text-white/45 pt-2">
                  Reply comes by email only.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Full name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/35 transition"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/35 transition"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/35 transition"
                  >
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-black">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Project details</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-[140px] rounded-xl bg-black/50 border border-white/15 px-4 py-3 text-white outline-none focus:border-white/35 transition"
                    placeholder="What are you trying to produce? What do you already have? What’s the deadline?"
                  />
                  <div className="text-xs text-white/40">
                    Minimum 10 characters.
                  </div>
                </div>

                {status === "error" && (
                  <div className="text-sm text-red-300">{errorMsg}</div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="relative inline-flex justify-center items-center rounded-full bg-[#C9A24A] px-8 py-3 text-black font-medium overflow-hidden hover:bg-[#E6C46A] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Send Request"}
                    <motion.span
                      aria-hidden
                      className="absolute top-0 bottom-0 w-24 bg-white/25 blur-sm"
                      initial={{ x: "-140%" }}
                      animate={{ x: "240%" }}
                      transition={{
                        duration: 3.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1.1,
                      }}
                      style={{ transform: "skewX(-20deg)" }}
                    />
                  </button>

                  <a
                    href="mailto:jefinno73@gmail.com"
                    className="inline-flex justify-center items-center rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition"
                  >
                    Email Directly
                  </a>
                </div>

                <div className="text-xs text-white/45 pt-2">
                  You’ll receive a reply only by email.
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <motion.section
        className="px-6 py-20 border-b border-white/10"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["Clear scope", "We define deliverables before execution."],
            ["Disciplined delivery", "You get finished work, not experiments."],
            ["Professional output", "Files are ready for print, web, or distribution."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-black/40 p-8"
            >
              <div className="text-lg font-medium mb-2">{t}</div>
              <div className="text-white/70 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
