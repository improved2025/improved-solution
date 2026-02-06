"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="space-y-3">
            <div className="text-lg font-semibold">Improved Solutions</div>
            <p className="text-white/60 max-w-md leading-relaxed">
              Premium multidisciplinary studio delivering publishing, branding, design, web, print,
              and digital products with clarity and finished execution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Navigate</div>
              <ul className="space-y-2 text-white/75">
                <li><a className="hover:text-white transition" href="/services">Services</a></li>
                <li><a className="hover:text-white transition" href="/portfolio">Work</a></li>
                <li><a className="hover:text-white transition" href="/products">eBooks</a></li>
                <li><a className="hover:text-white transition" href="/contact">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Start</div>
              <ul className="space-y-2 text-white/75">
                <li><a className="hover:text-white transition" href="/quote">Request a Quote</a></li>
                <li><a className="hover:text-white transition" href="/services">Explore Services</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-white/60 uppercase tracking-wide">Email</div>
              <a
                className="text-white/75 hover:text-white transition"
                href="mailto:contact@improvedsolution.com"
              >
                contact@improvedsolution.com
              </a>
              <div className="pt-3">
                <motion.div
                  aria-hidden
                  className="h-px w-20 bg-[#C9A24A]/80"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 80, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white/45">
          <div>© {new Date().getFullYear()} Improved Solutions. All rights reserved.</div>
          <div className="text-white/35">
            Clarity over noise. Gold as accent. Motion with purpose.
          </div>
        </div>
      </div>
    </footer>
  );
}
