import Link from "next/link";
import Rounded from "@/constants/RoundedButtons";
import { FC } from "react";

const Explore: FC = () => (
  <section className="px-4 pt-5 items-center sm:px-[60px]">
    <div className="flex flex-col items-center justify-center gap-[60px] w-full object-contain bg-gradient-to-r from-[#AB54FD] to-[#260742] rounded-[10px_10px_500px_500px] py-16 sm:py-12">
      <div className="w-full px-8 mb-16">
        <div className="font-semibold text-[36px] text-[#FAF9FF] w-[370px] h-[108px] pt-[80px] pl-[64px] sm:text-[48px] sm:w-[424px] sm:pt-[32px] sm:pl-[20px] sm:text-left">
          <h1>
            Why become
          </h1>
          <h1 className="flex justify-end items-end">
            an Earthling?
          </h1>
        </div>
      </div>
      
      <div className="w-full pt-16 flex justify-center items-center px-5 sm:pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-10">
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card1.svg" 
              alt="Card 1" 
              className="object-contain w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card2.svg" 
              alt="Card 2" 
              className="object-contain w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card3.svg" 
              alt="Card 3" 
              className="object-contain w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card4.svg" 
              alt="Card 4" 
              className="object-contain w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-90"
            />
          </div>
        </div>
      </div>
      
      <Link href="" className="flex justify-center items-center pt-0 pb-32 sm:pt-0">
        <Rounded>
          <p className="font-bold text-white">Join community</p>
        </Rounded>
      </Link>
    </div>
  </section>
);

export default Explore;