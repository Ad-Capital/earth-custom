'use client';

import React, { useState } from 'react';
import { TriviaQuestion } from '@/constants';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface Trivia {
  question: string;
  answer: string;
  headingID: string;
  answerID: string;
}

const FAQ: React.FC = () => {
  const [isClicked, setIsClicked] = useState<number | null>(null);

  const revealAnswer = (index: number) => {
    if (index === isClicked) {
      return setIsClicked(null);
    }
    setIsClicked(index);
  };

  const toggleBtn = (index: number) => {
    if (index === isClicked) {
      return <AiOutlineMinus />;
    } else {
      return <AiOutlinePlus />;
    }
  };

  const screenReaderInstructions = (trivia: Trivia, index: number): string => {
    if (index === TriviaQuestion.length - 2 && index === isClicked) {
      return trivia.answer + '';
    } else if (index === isClicked) {
      return trivia.answer + '';
    } else {
      return trivia.question + '';
    }
  };

  const accordionClosed = 'hidden rounded-2xl overflow-y-hidden max-w-6xl leading-snug opacity-0';
  const accordionOpen = 'block max-h-[400px] overflow-y-visible opacity-100 mr-auto';

  return (
    <>
      <section id="FAQ" className="pl-[40px] pr-[40px] pt-[40px] bg-[#F3F3F3] md:pl-[20px] md:pr-[20px]">
        <h2 className="text-[36px] pb-[32px] text-[#1E0734] font-medium flex">FAQs</h2>
        {TriviaQuestion.map((trivia: Trivia, index: number) => (
          <div key={trivia.question} className="flex flex-col items-center pl-[40px] pr-[40px] mt-[4px] rounded-[2px] bg-[#EDDBFE] sm:pl-[14px] sm:pr-[14px]">
            <div className="flex items-center justify-between w-full pt-[20px] pb-[20px] cursor-pointer">
              <h3>
                <button
                  className="leading-[1.625] w-full text-left pr-[20px] text-[18px] font-bold tracking-[0em] text-[#1E0734] flex flex-row sm:text-[16px]"
                  id={trivia.headingID}
                  aria-label={screenReaderInstructions(trivia, index)}
                  aria-expanded={isClicked === index ? 'true' : 'false'}
                  aria-controls={trivia.answerID}
                  onClick={() => revealAnswer(index)}
                >
                  {trivia.question}
                </button>
              </h3>
              <span onClick={() => revealAnswer(index)} className="flex justify-self-end align-self-end">{toggleBtn(index)}</span>
            </div>

            <section
              id={trivia.answerID}
              aria-labelledby={trivia.headingID}
              className={isClicked === index ? accordionOpen : accordionClosed}
            >
              <p className="font-normal pb-[24px] md:w-[70%]">{trivia.answer}</p>
            </section>
          </div>
        ))}
      </section>
    </>
  );
};

export default FAQ;
