import React from 'react'
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';


const YoutubeVideo = () => {
  return (
    <div className="bg-cover bg-center flex flex-col items-center w-full gap-[5px] h-auto lg:flex-row lg:p-8 lg:h-screen overflow-x-hidden">
      <div className="w-full flex justify-center px-4 lg:px-0">
        <iframe 
          className="w-full max-w-[350px] h-[200px] pt-[10px] sm:max-w-[500px] sm:h-[280px] md:max-w-[700px] md:h-[400px] lg:h-[500px]" 
          src="https://www.youtube.com/embed/T6DEe8XUzbc?si=qVAZdpoQqzAau9Ls" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        />
      </div>
      <div className="w-[90%] p-4 pt-5 pb-5 lg:w-[30%] lg:p-8">
        <p className="text-[18px] sm:text-[20px] text-[#1E0734]">All New Seasons</p>
        <h2 className="mb-4 text-[#1E0734] text-[22px] font-bold sm:text-[24px] md:text-[36px]">Meet the mind</h2>
        <p className="mb-[16px] text-[#1E0734] text-[14px] pb-[20px] sm:pb-[40px]">Experience our captivating video series, 'Meet the Mind', which delves into the world of art through the lens of various visual artists. </p>

        <div className='flex gap-2'>
          <Link href='/' passHref>
            <p className="underline text-[#1E0734] font-semibold text-[16px]">
              Watch all new seasons!
            </p>
          </Link>
          <LuArrowUpRight className='text-[#1E0734]' />
        </div>
      </div>
    </div>
  )
}

export default YoutubeVideo;