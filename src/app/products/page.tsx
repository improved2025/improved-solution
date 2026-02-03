import type { Metadata } from "next";
import ProductsClient from "./products-client";

export const metadata: Metadata = {
  title: "eBooks & Digital Products",
  description:
    "Professional digital products designed for immediate value and long-term use — built with clarity, structure, and premium presentation.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return <ProductsClient />;
}
