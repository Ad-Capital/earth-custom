'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

interface MobileCarouselProps {
  className?: string;
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ className = '' }) => {
  // Configure Swiper settings without navigation and scrollbar
  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 3, // Show all 3 images on large screens
    centeredSlides: false,
    loop: false,
    grabCursor: true, // Makes the swiper grabbable with cursor
    breakpoints: {
      // On small screens
      320: {
        slidesPerView: 1.2, // Show a bit of the next slide
        spaceBetween: 12,
      },
      // On medium screens
      640: {
        slidesPerView: 2.2, // Show 2 slides + a bit of the next one
        spaceBetween: 16,
      },
      // On large screens
      1024: {
        slidesPerView: 3, // Show all 3 slides
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className={`w-full max-w-full overflow-hidden ${className}`}>
      <div className="relative max-w-full px-4">
        <Swiper 
          {...swiperConfig} 
          className="mx-auto"
        >
          <SwiperSlide>
            <div className="h-[458px] max-w-full bg-transparent flex justify-center items-center">
              <img className="h-full w-auto max-h-full object-contain" src="artCard1.svg" alt="Art Card 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[458px] max-w-full bg-transparent flex justify-center items-center">
              <img className="h-full w-auto max-h-full object-contain rounded-md" src="artCard2.svg" alt="Art Card 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[458px] max-w-full bg-transparent flex justify-center items-center">
              <img className="h-full w-auto max-h-full object-contain" src="artCard3.svg" alt="Art Card 3" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MobileCarousel;