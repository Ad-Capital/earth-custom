import React from 'react';
import Navbar from '@/constants/Navbar';
import Hero from '@/components/main/Hero';
import Cards from '@/components/main/Cards';
import About from '@/components/main/About';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#7D2AE7] to-[rgba(250,249,255,0)] w-full">
      <div className="bg-[#F3F3F3] w-full">
        <Navbar />
        <Hero />
      </div>
      <Cards />
      <About />
    </div>
  );
};

export default HeroSection;