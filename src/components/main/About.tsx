import React from 'react';
import Link from "next/link";
import Rounded from "@/constants/RoundedButtons";
import StylizedText from "./StylizedText"

const About = () => {
  // About text content - defined once to avoid duplication
  const aboutParagraphs = [
    "Here at Earth, we believe in the power of art to move, to inspire, and to connect. We're on a mission to break down barriers and make art more accessible to all. Whether you're a seasoned collector or a budding artist, you'll find a place to belong in our diverse and dynamic community.",
    "Our curated collections showcase the best and brightest talents from around the globe, spanning every style, medium, and genre imaginable. From bold brushstrokes to intricate sculptures, there's something here to capture every heart and imagination.",
    "But Earth is more than just a platform—it's a movement. It's a rallying cry for all those who believe in the transformative power of art. It's a celebration of creativity, diversity, and the human spirit. And it's a promise to support and uplift artists at every stage of their journey.",
    "So join us on Earth and be part of something extraordinary. Whether you're here to discover, to create, or simply to be inspired, you'll find a warm welcome and a world of possibility waiting for you."
  ];

  // Read More functionality for mobile
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <section className="py-8 px-4 md:p-16" id="about">
      <div className="pt-24 flex flex-col items-center h-auto bg-[#F3F3F3] rounded-[600px_600px_10px_10px]">
        {/* Heading image */}
        <StylizedText/>        
        {/* Desktop Version - Hidden on small screens */}
        <div className="hidden md:block text-lg font-normal leading-8 tracking-wider text-left w-4/5 lg:w-3/5 pt-12">
          {aboutParagraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {index < aboutParagraphs.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile Version - Visible only on small screens */}
        <div className="md:hidden text-base font-normal leading-7 tracking-wider text-left px-6 pt-4 pb-8">
          {expanded ? (
            // Show all paragraphs when expanded
            aboutParagraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                {index < aboutParagraphs.length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            // Show only first paragraph when collapsed
            <>
              <p>{aboutParagraphs[0]}</p>
              <button 
                onClick={toggleExpanded}
                className="text-blue-600 font-medium mt-4 flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </>
          )}
          
          {expanded && (
            <button 
              onClick={toggleExpanded}
              className="text-blue-600 font-medium mt-4 flex items-center"
            >
              Read Less
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* CTA Button */}
        <Link href="" className="py-20">
          <Rounded>
            <p className="font-bold text-white">Join our discord community</p>
          </Rounded>
        </Link>
      </div>
    </section>
  );
};

export default About;