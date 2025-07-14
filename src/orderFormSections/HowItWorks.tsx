import React from 'react';

export default function HowItWorksSection() {
  return (
    <section id="howitworks" className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="flex justify-between lg:gap-[50.67px] md:gap-[30px] items-center md:flex-row flex-col">
        <div className="relative lg:w-[437px]">
          <div className="bg-transparent inline-block">
            <img
              src="howitworks.png"
              alt="Portrait artwork"
              className="lg:w-[437px] object-fill"
            />
          </div>
        </div>

        <div className="space-y-4 w-full lg:w-[686.22px] md:w-[500px]">
          <h2 className="text-3xl font-bold text-[#1E0734] mb-[24px]">How it works:</h2>

          <div className="space-y-3">
            <div>
              <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Share Your Idea</h4>
              <p className="text-[14px] text-[#757575]">Describe your concept and style preferences.</p>
            </div>

            <div>
              <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Our Artists get to Work</h4>
              <p className="text-[14px] text-[#757575]">Skilled creators bring your vision to life.</p>
            </div>

            <div>
              <h4 className="text-[#1E0734] lg:text-[17.78px] text-[14px] font-semibold">Receive, Unwrap and Relish</h4>
              <p className="text-[14px] text-[#757575]">Approve your artwork and download or order a framed print.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}