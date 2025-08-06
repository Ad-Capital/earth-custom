import React from 'react';

const StylizedText = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center font-sans text-[#1E0734] max-w-full px-2 sm:max-w-2xl">
        <div className="font-thin text-[45px] sm:text-[65px] md:text-[80px] lg:text-[90.26px] leading-tight">
          <span className='font-normal'>W</span><span className="text-[60px] sm:text-[85px] md:text-[105px] lg:text-[120.34px] font-bold">E</span> love 
          <span className='font-normal'> sh</span><span className="font-black">A</span><span className='font-normal'>re</span>
        </div>
        <div className="leading-tight mt-2">
          <span className='text-[20px] sm:text-[28px] md:text-[30px] lg:text-[34px]'>and</span> 
          <span className='text-[45px] sm:text-[65px] md:text-[80px] lg:text-[90.26px] font-normal'> exp</span>
          <span className="text-[45px] sm:text-[65px] md:text-[80px] lg:text-[90.26px] font-black">R</span>
          <span className='text-[45px] sm:text-[65px] md:text-[80px] lg:text-[90.26px] font-normal'>ess </span>
          <span className="ml-1 sm:ml-2 text-[40px] sm:text-[50px] md:text-[60px] lg:text-[64px]">
            Ar<span className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[64px] font-black">T</span>
          </span> 
          <span className='text-[28px] sm:text-[35px] md:text-[40px] lg:text-[45px] font-extralight'>in </span>
        </div>
        <div className="text-[45px] sm:text-[65px] md:text-[80px] lg:text-[90.26px] leading-tight mt-2 font-medium">
          <span className='text-[28px] sm:text-[35px] md:text-[40px] lg:text-[45px] font-extralight'>its </span>
          aut<span className="font-black">H</span><span className='font-extralight'>enti</span>city
        </div>
      </div>
    </div>
  );
};

export default StylizedText;