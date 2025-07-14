'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TypingHeader from "@/components/TypingHeader";
import Rounded from "@/constants/RoundedButtons";


export default function Home() {
  const artworks = [
    {
      id: 1,
      src: "/images/Frame1.png",
      alt: "Colorful abstract art with yellow, red, and turquoise paint strokes",
    },
    {
      id: 2,
      src: "/images/Frame2.png",
      alt: "Dark blue and purple fluid art pattern",
    },
    {
      id: 3,
      src: "/images/Frame3.png",
      alt: "Minimalist black and white photograph of hands",
    },
    {
      id: 4,
      src: "/images/Frame1.png",
      alt: "Modern art composition",
    },
    {
      id: 5,
      src: "/images/Frame3.png",
      alt: "Contemporary artwork",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [artworks.length]);

  const getSlideStyles = (index: number): React.CSSProperties => {
    const positions: Record<string, React.CSSProperties> = {
      previous: {
        transform: 'translateX(-100%) scale(0.8)',
        opacity: '1',
        zIndex: 10,
      },
      current: {
        transform: 'translateX(0) scale(1)',
        opacity: '1',
        zIndex: 20,
      },
      next: {
        transform: 'translateX(100%) scale(0.8)',
        opacity: '1',
        zIndex: 10,
      },
    };

    if (index === currentIndex) return positions.current;
    if (index === (currentIndex - 1 + artworks.length) % artworks.length) return positions.previous;
    if (index === (currentIndex + 1) % artworks.length) return positions.next;

    return {
      transform: 'translateX(100%) scale(0.8)',
      opacity: '0',
      zIndex: 0,
      right: '0',
    };
  };

  return (
    <main>
      <section id="home" className="w-full lg:min-h-screen bg-white md:px-0 lg:px-[60px] py-12 lg:mt-[120px] mt-[114px]">
        <div className="max-w-7xl mx-auto">
          <div className="gap-8 items-center">
            <div className="px-4 lg:px-0">
              <div className="h-10"><TypingHeader /></div>

              <div className="hidden lg:flex justify-between items-center pt-10">
                <Link href="/orderform">
                  <Rounded>
                    <p>Get Custom Art</p>
                  </Rounded>
                </Link>
                <p className="text-[#757575] text-lg font-semibold">
                  Commission a masterpiece from <br /> our talented artists in just a few steps.
                </p>
              </div>
            </div>

            {/* Right Images Section */}
            <div className="relative flex justify-end">
              <div className="relative lg:h-[500px] h-[350px] md:mt-[80px] lg:mt-0 overflow-hidden w-full">
                <div className="flex justify-end items-center h-full ">
                  {artworks.map((artwork, index) => (
                    <div
                      key={artwork.id}
                      className="absolute lg:w-[320px] lg:h-[420px] md:w-[35%] md:h-[100%] w-[47%] transition-all duration-[1500ms] ease-in-out lg:mr-[300px] md:mr-[180px]"
                      style={{
                        ...getSlideStyles(index),
                        right: '0',
                      }}
                    >
                      <img
                        src={artwork.src}
                        alt={artwork.alt}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-[1500ms] hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Scroll Text */}
              <div className="absolute lg:left-32 md:-left-[2%] -left-[8%] top-1/2 -translate-y-1/2 -rotate-90 text-gray-400 uppercase tracking-widest text-sm">
                Scroll Down
              </div>
            </div>
            <div className="lg:hidden flex flex-col justify-between pt-2 md:pt-10 px-4">
              <p className="text-[#757575] text-lg font-semibold text-right pb-[63px]">
                Commission a masterpiece from <br /> our talented artists in just a few steps.
              </p>
              <Rounded>
                <p>Get Custom Art</p>
              </Rounded>
            </div>
          </div>
        </div>
      </section>    
      
    </main>
  );
}