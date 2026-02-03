"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer";
};

export default function MotionReveal({ children, as = "div" }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {children}
    </Comp>
  );
}
