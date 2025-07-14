import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface InteractiveSectionProps {
  title: string;
  content?: string;
  isActive: boolean;
  onClick: (title: string) => void;
  position: number | string;
  activePosition: number | string;
}

const InteractiveSection: FC<InteractiveSectionProps> = ({
  title,
  content,
  isActive,
  onClick,
  position,
  activePosition,
}) => {
  const isClicked = isActive && position === activePosition;

  const handleClick = () => {
    onClick(title);
  };

  return (
    <div
      className={`interactive-section ${isActive ? 'active' : ''} ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      <h2
        className="text-5xl font-medium leading-[72px] text-left"
      >
        {title}
      </h2>
      {/* Section content */}
    </div>
  );
};

export default InteractiveSection;