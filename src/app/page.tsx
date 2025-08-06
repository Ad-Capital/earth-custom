"use client";

import React from "react";
import { usePreloader } from "@/hooks/usePreloader";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import HeroSection from "@/components/layout/HeroSection";
import ContentSection from "@/components/layout/ContentSection";
import YoutubeVideo from "@/components/main/YoutubeVideo";
import Marketplace from "@/components/main/Marketplace";
import FAQ from "@/components/main/FAQ";
import NewsletterSection from "@/orderFormSections/Newsletter";

export default function Home() {
  const { isLoading, completeLoading } = usePreloader();
  
  useLocomotiveScroll(completeLoading);

  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <YoutubeVideo />
      <ContentSection />
      <Marketplace />
      <FAQ />
      <NewsletterSection />
    </main>
  );
}
