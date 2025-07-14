"use client";

import { AnimatePresence } from "framer-motion";
import React, { createContext, useState, useEffect } from "react";
import Cards from "@/components/main/Cards";
import Preloader from "@/components/Preloader";
import Navbar from "@/constants/Navbar";
import Hero from "@/components/main/Hero";
import About from "@/components/main/About";
import YoutubeVideo from "@/components/main/YoutubeVideo";
import Explore from "@/components/main/Explore";
import Values from "@/components/main/Values";
import Marketplace from "@/components/main/Marketplace";
import FAQ from "@/components/main/FAQ";
import NewsletterSection from "@/orderFormSections/Newsletter";
// import { Hero, YoutubeVideo, About, Explore, Values, Marketplace, FAQ } from "@/sections";
// import Contact from "@/sections/Contact/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <main>
      {/* <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence> */}
      <div className="bg-gradient-to-b from-[#7D2AE7] to-[rgba(250,249,255,0)]">
        <div className="bg-[#F3F3F3]">
          <Navbar />
          <Hero />
        </div>
        <Cards />
        <About />
      </div>

      <YoutubeVideo />
      <div className="Gradient">
        <Explore />
        <Values />
      </div>
      <Marketplace />
      <FAQ />
      <NewsletterSection />
    </main>
  );
}
