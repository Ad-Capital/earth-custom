import React, { useState, useEffect } from 'react';

interface Artwork {
  id: number;
  src: string;
  alt: string;
}

interface ArtworkSliderProps {
  artworks: Artwork[];
  autoRotate?: boolean;
  rotationInterval?: number;
}

export default function ArtworkSlider({ 
  artworks, 
  autoRotate = true, 
  rotationInterval = 3000 
}: ArtworkSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [artworks.length, autoRotate, rotationInterval]);

  interface SlideStyles {
    transform: string;
    opacity: string;
    zIndex: number;
    right?: string;
  }

  const getSlideStyles = (index: number): SlideStyles => {
    const positions: Record<string, SlideStyles> = {
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
    <div className="relative flex justify-end">
      <div className="relative lg:h-[500px] h-[350px] overflow-hidden w-full">
        <div className="flex justify-end items-center h-full">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="absolute lg:w-[262.5px] lg:h-[466.2px] md:w-[35%] md:h-[100%] w-[47%] transition-all duration-[1500ms] ease-in-out lg:mr-[300px] md:mr-[180px]"
              style={{
                ...getSlideStyles(index),
                right: '0',
              }}
            >
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="w-full h-full object-fill rounded-lg transition-transform duration-[1500ms] hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}