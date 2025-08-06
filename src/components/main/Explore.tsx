import Link from "next/link";
import Rounded from "@/constants/RoundedButtons";
import { FC } from "react";

const Explore: FC = () => (
  <section className="px-1 pt-5 sm:px-6 md:px-[60px]">
    <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-[60px] w-full bg-gradient-to-r from-[#AB54FD] to-[#260742] rounded-[10px_10px_200px_200px] sm:rounded-[10px_10px_300px_300px] md:rounded-[10px_10px_500px_500px] py-12 sm:py-16 md:py-12">
      <div className="w-full px-1 sm:px-4 md:px-8">
        <div className="font-semibold text-left text-[#FAF9FF] pt-6 sm:pt-8 md:pt-[32px] px-4">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-tight">
            Why become
          </h1>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-tight text-left pl-10 sm:pl-24">
            an Earthling?
          </h1>
        </div>
      </div>
      
      <div className="w-full pt-4 sm:pt-8 md:pt-5 flex justify-center items-center px-0 sm:px-4 md:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 pb-6 sm:pb-8 md:pb-10 w-full max-w-none sm:max-w-6xl px-4">
          <div className="w-full relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card1.svg" 
              alt="Card 1" 
              className="object-contain w-full sm:max-w-[340px] md:max-w-md transition-transform duration-300 ease-in-out hover:scale-95 sm:hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card2.svg" 
              alt="Card 2" 
              className="object-contain w-full sm:max-w-[340px] md:max-w-md transition-transform duration-300 ease-in-out hover:scale-95 sm:hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card3.svg" 
              alt="Card 3" 
              className="object-contain w-full sm:max-w-[340px] md:max-w-md transition-transform duration-300 ease-in-out hover:scale-95 sm:hover:scale-90"
            />
          </div>
          <div className="relative overflow-hidden flex justify-center items-center">
            <img 
              src="Card4.svg" 
              alt="Card 4" 
              className="object-contain w-full sm:max-w-[340px] md:max-w-md transition-transform duration-300 ease-in-out hover:scale-95 sm:hover:scale-90"
            />
          </div>
        </div>
      </div>
      
      <Link href="" className="flex justify-center items-center pt-2 pb-8 sm:pt-4 sm:pb-16 md:pt-0 md:pb-32">
        <Rounded>
          <p className="font-bold text-white text-sm sm:text-base">Join community</p>
        </Rounded>
      </Link>
    </div>
  </section>
);

export default Explore;