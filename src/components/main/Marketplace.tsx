import React from 'react';
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';

const Marketplace = () => {
  return (
    <div id="market" className='marketplaceGradient'>
      <div className="flex pt-[10px] p-[12px] flex-1 flex-col gap-[32px] justify-center md:justify-between md:pt-[112px] md:p-[48px] md:flex-row">
        <div className="w-[90%] p-[2px] mt-[80px] md:w-[40%]">
          <h2 className="text-[#1E0734] font-bold text-[16px] mb-[18px]">COMING SOON</h2>
          <h2 className="text-[#E1E1E1] text-[24px] font-medium mb-[16px] md:text-[36px]">Buy and sell authentic art works</h2>
          <p className="mb-[16px] text-[#E1E1E1] text-[14px] pb-[40px]">We are building a place where your art can thrive while cashing out on your talent and artistic skills. A place where buyers can find art they desire and can trust.</p>

          <div className='flex gap-2'>
            <Link href='/' passHref>
              <p className="underline text-[#1E0734] font-bold text-[16px]">
                Join the waiting list
              </p>
            </Link>
            <LuArrowUpRight className='text-[#1E0734]' />
          </div>
        </div>

        <div className="ml-[20%] justify-items-end w-fit md:ml-0 md:mt-[120px] lg:ml-0">
          <img src="/phones.svg" alt="phones" className='' />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
