import React from 'react';
import Link from 'next/link';
import Rounded from '@/constants/RoundedButtons';
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

interface NewsletterSectionProps {
  // Add any props here if needed in the future
}

const NewsletterSection: React.FC<NewsletterSectionProps> = () => {
  return (
    <section style={{ background: "linear-gradient(180deg, #1E0734 0%, rgba(30, 7, 52, 0) 100%)" }} className="w-full relative">
      {/* The contact curve */}
      <div className="contactCurve">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" preserveAspectRatio="none">
          <path d="M0,0V27.23C0,245.52,268.63,422.77,600,422.77S1200,245.52,1200,27.23V0Z" className="shape-fill"></path>
        </svg>
      </div>
      
      {/* Form content - now with proper spacing and z-index */}
      <div className="flex flex-col items-center z-10 relative px-4">
        <div className="w-full max-w-2xl mx-auto bg-transparent">
          <h1 className="text-3xl font-semibold text-left text-[#1E0734]">Did someone say fun mail?</h1>
          <p className="my-4 text-base font-normal text-left text-[#1E0734]">Sign up now to receive exclusive updates, artist features, exciting events, and special offers straight to your inbox.</p>
          <div className="flex flex-col items-start">
            <div className="w-full mb-4">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                required 
                placeholder="First name" 
                className="w-full px-8 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Email" 
                className="w-full px-8 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
            <div>
              <Link href="#subscribe" aria-label="Submit newsletter subscription">
                <Rounded>
                  <p>Submit</p>
                </Rounded>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with top margin to create separation */}
      <div className="mt-16">
        <Footer />
        <Copyright />
      </div>
    </section>
  );
};

export default NewsletterSection;