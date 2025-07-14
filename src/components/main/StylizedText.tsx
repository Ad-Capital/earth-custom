import React from 'react';

const StylizedText = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-center font-sans text-[#1E0734] max-w-2xl">
        <div className="font-thin text-[90.26px] leading-tight">
          <span className='font-normal'>W</span><span className="text-[120.34px] font-bold">E</span> love 
          <span className='text-[90.26px] font-normal'> sh</span><span className="text-[90.26px] font-black">A</span><span className='text-[90.26px] font-normal'>re</span>
        </div>
        <div className="text-5xl md:text-6xl lg:text-7xl leading-tight mt-2">
          <span className='text-[34px]'>and</span> <span className='text-[90.26px] font-normal'> exp</span><span className="text-[90.26px] font-black">R</span><span className='text-[90.26px] font-normal'>ess </span>
          <span className="ml-2 text-[64px]">Ar<span className="text-5xl md:text-8xl lg:text-[64px] font-black">T</span></span> <span className='text-[45px] font-extralight'>in </span>
        </div>
        <div className="text-[90.26px] leading-tight mt-2 font-medium">
          <span className='text-[45px] font-extralight'>its </span>aut<span className="font-black">H</span><span className='font-extralight'>enti</span>city
        </div>
      </div>
    </div>
  );
};

export default StylizedText;