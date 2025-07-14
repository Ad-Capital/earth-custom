import React from 'react';

interface HeroProps {}

const Hero: React.FC<HeroProps> = (): React.ReactElement => (
    <section className="pt-[100px] md:pt-[100px]">
        <div className="">
            <div className="flex flex-col mx-auto p-[24px] w-auto sm:w-[320px] [@media(max-width:280px)]:w-[90%] lg:w-[800px]">
                <div className="text-[#1E0734] text-[36px] md:text-[72px] md:leading-[72px] text-left font-bold sm:pt-[40px]">
                    <h1 className="flex justify-start items-start">Join and Discover</h1>
                    <h1 className="flex justify-end items-end">Art You Love</h1>
                </div>
                <div className="pt-8 flex justify-center items-center">
                    <p className="text-[16px] font-normal leading-[22px] tracking-[0.055em] text-center sm:text-[18px] sm:leading-[28.8px] sm:tracking-[0.05em] sm:w-full sm:pb-[40px]">
                        Connect with fellow art enthusiasts and discover unique creations from 
                        talented artists. E<span className='text-[#7D2AE7]'>art</span>h bridges the gap between creators and collectors, 
                        fostering a dynamic community. Explore and be inspired!
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;