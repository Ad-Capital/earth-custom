'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import TypingHeader from "@/components/TypingHeader";
import Rounded from "@/constants/RoundedButtons";
import OrderForm from "@/components/OrderForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";


export default function Home() {
  const artworks = [
    {
      id: 1,
      src: "Frame 1.png",
      alt: "Colorful abstract art with yellow, red, and turquoise paint strokes",
    },
    {
      id: 2,
      src: "Frame 2.png",
      alt: "Dark blue and purple fluid art pattern",
    },
    {
      id: 3,
      src: "Frame 3.png",
      alt: "Minimalist black and white photograph of hands",
    },
    {
      id: 4,
      src: "Frame 1.png",
      alt: "Modern art composition",
    },
    {
      id: 5,
      src: "Frame 3.png",
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
      <Navbar />
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
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        {/* First Row - Portrait with Text */}
        <div className="grid md:grid-cols-2 lg:gap-12 gap-6 lg:mb-[-280px] md:mb-[-150px]">
          <div className="relative lg:h-[520px]">
            <div className="bg-transparent inline-block">
              <img
                src="piece1.png"
                alt="Portrait artwork"
                className="lg:h-[520px] object-fill"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E0734] mb-[24px] text-right">Create Unique, Personalized Art in Just a Few Steps</h2>
            <p className="text-[#757575] font-semibold text-right">
              Our Custom Art Feature allows you to commission original artwork tailored to your vision. Whether you're looking for digital paintings, prints, or framed masterpieces, we bring your ideas to life with professional craftsmanship.
            </p>
          </div>
        </div>

        {/* Second Row - Text with Abstract Art */}
        <div className="flex md:flex-row lg:gap-12 gap-6 items-end flex-col-reverse">
          <div className="lg:w-[533.33px] md:w-[350px] mb-[24px]">
            <h2 className="text-2xl font-bold text-[#1E0734] mb-[24px]">Your Imagination, Our Canvas</h2>
            <p className="text-[#757575] font-semibold">
              Every masterpiece begins with an idea. Our Custom Art Feature brings your vision to life – Perfect for your home, a gift, or your creative collection.
            </p>
          </div>

          <div className="relative lg:h-[497px] pt-16 lg:pt-0">
            <div className="bg-transparent inline-block">
              <img
                src="piece2.png"
                alt="Abstract artwork"
                className="lg:h-[497px] md:h-[350px] object-fill"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="howitworks" className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex justify-between lg:gap-[50.67px] md:gap-[30px] items-center md:flex-row flex-col">
          <div className="relative lg:w-[437px]">
            <div className="bg-transparent inline-block">
              <img
                src="howitworks.png"
                alt="Portrait artwork"
                className="lg:w-[437px] object-fill"
              />
            </div>
          </div>

          <div className="space-y-4 w-full lg:w-[686.22px] md:w-[500px]">
            <h2 className="text-2xl font-bold text-[#1E0734] mb-[24px]">How it works:</h2>

            <div className="space-y-3">
              <div>
                <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Share Your Idea</h4>
                <p className="text-[14px] text-[#757575]">Describe your concept and style preferences.</p>
              </div>

              <div>
                <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Our Artists get to Work</h4>
                <p className="text-[14px] text-[#757575]">Skilled creators bring your vision to life.</p>
              </div>

              <div>
                <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Receive, Unwrap and Relish</h4>
                <p className="text-[14px] text-[#757575]">Approve your artwork and download or order a framed print.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="container mx-auto px-4 pt-16 pb-10 max-w-6xl">
        <h2 className="text-2xl font-bold text-[#1E0734]">Order Form</h2>
      </div>
      <OrderForm /> */}
      <section id="faqs">
        <FAQSection />
      </section>
      <section style={{ background: "linear-gradient(180deg, #1E0734 0%, rgba(30, 7, 52, 0) 100%)" }} className="w-full py-16 relative">
        <div className="flex flex-col items-center pt-[200px] px-4">
          <div className="contactCurve">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" preserveAspectRatio="none">
              <path d="M0,0V27.23C0,245.52,268.63,422.77,600,422.77S1200,245.52,1200,27.23V0Z" className="shape-fill"></path>
            </svg>
          </div>
          <div className='lg:pt-64 w-full lg:w-[640px]'>
            <h1 className="text-[32px] font-[600] text-left text-[#1E0734]">Did someone say fun mail?</h1>
            <p className="my-[16px] text-[14px] font-400 text-left text-[#1E0734]">Sign up now to receive exclusive updates, artist features, exciting events, and special offers straight to your inbox.</p>
            <div className="flex flex-col items-start">
              <div className="w-full pb-[16px]">
                <label>
                  <input type='text' id='firstName' name='firstName' required placeholder='First name' className="w-full pl-[32px] py-[16px] rounded-full" />
                </label>
              </div>
              <div className="w-full pb-[16px]">
                <label>
                  <input type='text' id='email' name='email' required placeholder='Email' className="w-full pl-[32px] py-[16px] rounded-full" />
                </label>

              </div>
              <div>
                <Link href="">
                  <Rounded>
                    <p>Submit</p>
                  </Rounded>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Copyright />

      </section>
    </main>
  );
}