import React from "react";
import Layout from "./ValueParallax/Layout";
import MobileCarousel from "./ValueParallax/MobileCarousel";

const Values: React.FC = () => {
  return (
    <section className="pt-24">
      <div className="flex flex-col justify-center items-center bg-[#F3F3F3] rounded-t-[600px] h-auto py-64 px-16 w-full sm:px-3 sm:py-40 md:pt-[300px] md:pb-[100px]">
        <Layout />
        <div className="w-full">
          <div className="mt-8 flex justify-start items-start md:mt-2.5">
            <h1 className="mb-6 ml-8 text-[48px] font-medium">
              We value
            </h1>
          </div>
        </div>
        <MobileCarousel />
      </div>
    </section>
  );
};

export default Values;