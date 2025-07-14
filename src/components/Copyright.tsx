'use client';

import React from 'react';

const Copyright = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className='mx-auto px-4 py-16 max-w-6xl flex justify-between items-center'>
      <div className='text-[12px]'>© 2024 — Copyright</div>
      <div onClick={scrollToTop}><img src="scrollToTop.svg" alt="" /></div>
    </div>
  );
};

export default Copyright;