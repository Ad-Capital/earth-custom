import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextBox from './TextBox';
import MobileLayout from './MobileLayout';

interface DrumComponentProps {}

// Define item types
type DrumItem = string;

const items: DrumItem[] = [
  'Community',
  'Marketplace',
  'Partnerships',
  'Events',
  'Blog',
];

const DrumComponent: React.FC<DrumComponentProps> = () => {
  const [centerIndex, setCenterIndex] = useState<number>(2);
  const [activeSection, setActiveSection] = useState<string>(items[2]);

  const handleClick = (index: number): void => {
    let offset = index - centerIndex;
    if (Math.abs(offset) > items.length / 2) {
      offset -= Math.sign(offset) * items.length;
    }
    const newIndex = (centerIndex + offset + items.length) % items.length;
    setCenterIndex(newIndex);
    setActiveSection(items[newIndex]);
  };

  const generateItems = () => {
    return items.map((item, index) => {
      let position = index - centerIndex;
      if (position < -Math.floor(items.length / 2)) {
        position += items.length;
      } else if (position > Math.floor(items.length / 2)) {
        position -= items.length;
      }

      return (
        <motion.div
          key={item}
          initial={{ y: 70 * position, opacity: 0 }}
          animate={{ y: 70 * position, opacity: 1 }}
          exit={{ y: 70 * position, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute flex justify-center items-center cursor-pointer rounded-full"
          style={{
            height: '70px',
            width: '346px',
            fontWeight: position === 0 ? 700 : 700,
            backgroundColor: position === 0 ? '#7D2AE7' : 'transparent',
            color: position === 0 ? 'white' : '#b3b3b3',
            fontSize: position === 0 ? '48px' : '40px',
            fontFamily: position === 0 ? "'Dancing Script'" : '',
            marginBottom:'26px'
          }}
          onClick={() => handleClick(index)}
        >
          {item}
        </motion.div>
      );
    });
  };

  return (
    <section>
      <div className="desktopLayout">
        <div className="flex flex-row space-x-12 items-center justify-center">
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ width: '346px', height: '600px' }}
          >
            <AnimatePresence>{generateItems()}</AnimatePresence>
          </div>
          <div className="" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <TextBox activeSection={activeSection} />
          </div>
        </div>
      </div>
      <div className="mobileLayout">
        <MobileLayout />
      </div>
    </section>
  );
};

export default DrumComponent;