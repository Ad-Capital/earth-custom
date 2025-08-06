import React from 'react';
import Explore from '@/components/main/Explore';
import Values from '@/components/main/Values';

const ContentSection: React.FC = () => {
  return (
    <div className="Gradient w-full">
      <Explore />
      <Values />
    </div>
  );
};

export default ContentSection;