"use client";

import Footer from "@/app/components/Footer";
import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutProducts from "./components/AboutProducts";
import AboutFeatures from "./components/AboutFeatures";
import AboutWhy from "./components/AboutWhy";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{
        background:
          "linear-gradient(to bottom, var(--section-bg) 0%, #232329 100%)",
      }}
    >
      <AboutHero />
      <AboutStory />
      <AboutProducts />
      <AboutFeatures />
      <AboutWhy />
      <AboutCTA />
      <Footer />
    </div>
  );
}
