'use client';

import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: clamp(320px, 80vw, 900px);

  @media (max-width: 640px) {
    width: 100vw;
  }
`;

const CenterCard = styled.img`
  border-radius: 18px;
  width: clamp(150px, 22vw, 420px);
  height: auto;

  @media (max-width: 640px) {
    width: 65vw;
  }
`;

const LeftCard = styled.img`
  border-radius: 18px;
  width: clamp(120px, 18vw, 308px);
  height: auto;

  @media (max-width: 640px) {
    width: 50vw;
    transform: translateX(calc(-100% + 26vw));
  }
`;

const RightCard = styled.img`
  border-radius: 18px;
  width: clamp(120px, 18vw, 308px);
  height: auto;

  @media (max-width: 640px) {
    width: 50vw;
    transform: translateX(calc(100% - 26vw));
  }
`;

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = (): React.ReactElement => {
  return (
    <HeroContainer>
      <Inner>
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
          <CenterCard src="canyon.webp" alt="" loading="eager" />
        </div>
        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'start' }}>
          <LeftCard src="farmersMarket.webp" alt="" loading="eager" />
        </div>
        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'end' }}>
          <RightCard src="tower.webp" alt="" loading="eager" />
        </div>
      </Inner>
    </HeroContainer>
  );
};

export default HeroSection;
