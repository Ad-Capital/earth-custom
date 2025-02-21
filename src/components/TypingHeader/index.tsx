import React, { useState, useEffect } from 'react';

const TypingHeader = () => {
  const sentences = [
    "Turn ideas into art!",
    "Your Imagination, Our Canvas"
  ];
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenSentences = 2000;

    const timeout = setTimeout(() => {
      const currentSentence = sentences[currentIndex];

      if (!isDeleting) {
        if (currentText.length < currentSentence.length) {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenSentences);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-[56.89px] font-bold text-[#1E0734] leading-tight relative">
      {currentText}
      {/* <div className="inline-block w-0.5 h-[1em] ml-1 bg-[#1E0734] animate-pulse align-middle absolute"></div> */}
    </h1>
  );
};

export default TypingHeader;