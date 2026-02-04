import type { Metadata } from "next";
import HomeLoader from "./home-loader";

export const metadata: Metadata = {
  title: "Publishing, Branding, Design & Digital",
  description:
    "Improved Solutions is a premium multidisciplinary studio delivering publishing, branding, design, web, print, and digital products with clarity and discipline.",
};

export default function Page() {
  return <HomeLoader />;
}
