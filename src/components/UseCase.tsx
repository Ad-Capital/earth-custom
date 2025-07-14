"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoItem {
  id: number;
  gifSrc: string;
  title: string;
  description: string;
  videoSrc: string;
}

export default function UseCase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Updated items to use GIFs instead of emojis
  const artItems: VideoItem[] = [
    {
      id: 1,
      gifSrc: "/gifs/Art lover.gif",
      title: "A Masterpiece Tailored Just for You",
      description: "Imagine a piece of art that doesn't just hang on your wall; it tells your story. Unlike mass-produced prints, your custom masterpiece will be as unique as you are. Book your consultation today, and let us create something extraordinary for you.",
      videoSrc: "/videos/usecase/1.5.mp4",
    },
    {
      id: 2,
      gifSrc: "/gifs/gift.gif",
      title: "The Ultimate Meaningful Gift",
      description: "Custom art isn't just a gift, it's a memory, a feeling, a moment frozen in time. Whether it's a loved one, a pet, or a special place, it becomes a treasure they'll cherish for a lifetime. Because the best gifts aren't just given, they're felt.",
      videoSrc: "/videos/usecase/2.mp4",
    },
    {
      id: 3,
      gifSrc: "/gifs/Making art.gif",
      title: "Premium Quality & Expert Craftsmanship",
      description: "Every piece is created by skilled artists using only the finest materials. From hand-painted canvases to intricate digital illustrations and mixed-media masterpieces, our art is built to endure.",
      videoSrc: "/videos/usecase/3.mp4",
    },
    {
      id: 4,
      gifSrc: "/gifs/Writin.gif",
      title: "Elevate Your Space with Art That Speaks",
      description: "Your walls should tell your story. A custom art piece transforms any space into a conversation starter. Instead of generic prints found in every department store, you get a one-of-a-kind centerpiece that reflects your personality, passion, and artistic taste.",
      videoSrc: "/videos/usecase/4.mp4",
    },
  ];

  // Mark component as mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Setup GSAP animations after component has mounted
  useEffect(() => {
    if (!isClient) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create context to isolate GSAP animations
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll(".item");
      const videos = section.querySelectorAll(".main-video");
      const gifs = section.querySelectorAll(".gif-container");

      // Initialize - set all items except first to be 100% down
      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(item, { yPercent: 100 });
        }
      });

      // Play first video and gif initially
      if (videos[0]) {
        (videos[0] as HTMLVideoElement).play().catch(e => console.log("Auto-play prevented:", e));
      }
      
      // Set first GIF to visible
      if (gifs[0]) {
        gsap.set(gifs[0], { opacity: 1 });
      }

      // Create animation timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate which item is most visible
            const progress = self.progress;
            const itemIndex = Math.min(
              Math.floor(progress * items.length),
              items.length - 1
            );
            
            // Pause all videos
            videos.forEach((video: Element) => {
              (video as HTMLVideoElement).pause();
            });
            
            // Hide all GIFs
            gifs.forEach((gif) => {
              gsap.to(gif, { opacity: 0, duration: 0.3 });
            });
            
            // Play the current video
            if (videos[itemIndex]) {
              (videos[itemIndex] as HTMLVideoElement).play().catch(e => console.log("Auto-play prevented:", e));
            }
            
            // Show the current GIF
            if (gifs[itemIndex]) {
              gsap.to(gifs[itemIndex], { opacity: 1, duration: 0.3 });
            }
          }
        }
      });

      // Animate each item
      items.forEach((item, index) => {
        // Skip if we're at the last item
        if (index === items.length - 1) return;

        // Scale current item
        timeline.to(item, {
          scale: 0.9,
          borderRadius: "10px",
          duration: 1,
        });

        // Bring in next item
        timeline.to(
          items[index + 1],
          {
            yPercent: 0,
            duration: 1,
          },
          "<"
        );
      });
    }, sectionRef); // Scope GSAP context to our section

    // Clean up all animations when component unmounts
    return () => {
      ctx.revert(); // This properly cleans up all GSAP animations
    };
  }, [isClient]);

  return (
    <>
      {/* Hero section before scroller */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#1E0734] mb-[24px]">
          Why settle for Ordinary when you can get<span className="text-4xl font-dancing text-[#7B3FA9]">...?</span>
        </h1>
      </div>

      {/* Vertical scroll section */}
      <div
        ref={sectionRef}
        className="overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="h-screen sticky top-0 overflow-hidden">
          <div className="flex items-center justify-start h-full relative p-4">
            {artItems.map((item) => (
              <div
                key={item.id}
                className="item absolute inset-0 w-full h-full flex shadow-lg overflow-hidden bg-white rounded-none"
                style={{ willChange: "transform, border-radius" }}
              >
                <div className="md:w-1/2 w-full flex flex-col justify-between items-start p-4 md:px-12 md:py-4 relative bg-white">
                  <div className="top-8 md:top-12 left-8 md:left-12 flex items-center justify-center h-20 w-20 md:h-40 md:w-40 overflow-hidden">
                    <div className="gif-container w-full h-full flex items-center justify-center opacity-0">
                      <img 
                        src={item.gifSrc} 
                        alt={item.title}
                        className="w-20 h-20 md:w-32 md:h-32 object-cover flex z-0"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mt-16 mt-20 flex z-2">{item.title}</h2>
                  <p className="md:py-[63px] py-[40px]">{item.description}</p>
                </div>
                <div className="block md:w-1/2 h-full relative">
                  <div className="absolute inset-0">
                    <video
                      src={item.videoSrc}
                      className="main-video object-cover w-full h-full"
                      muted
                      playsInline
                      loop
                      preload="auto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}