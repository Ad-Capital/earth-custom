import React from 'react'
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';


const YoutubeVideo = () => {
  return (
    <div className="bg-cover bg-center flex flex-col items-center w-full gap-[5px] h-auto lg:flex-row lg:p-8 lg:h-screen">
      <div>
        <iframe className="w-[100vw] h-[300px] pt-[10px] md:w-[700px] md:h-[500px] md:pl-[30px] max-[280px]:w-full" src="https://www.youtube.com/embed/T6DEe8XUzbc?si=qVAZdpoQqzAau9Ls" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <div className="w-[90%] p-1 pt-5 pb-5 lg:w-[30%] lg:p-8">
        <p className="text-[20px] text-[#1E0734]">All New Seasons</p>
        <h2 className="mb-4 text-[#1E0734] text-[24px] font-bold md:text-[36px]">Meet the mind</h2>
        <p className="mb-[16px] text-[#1E0734] text-[14px] pb-[40px]">Experience our captivating video series, 'Meet the Mind', which delves into the world of art through the lens of various visual artists. </p>

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