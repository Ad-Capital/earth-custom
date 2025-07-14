'use client';

import React, { useState } from 'react';

interface ReadMoreProps {
  text: string;
  maxLength: number;
  readMoreText?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ 
  text, 
  maxLength, 
  readMoreText = 'Read more...' 
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);

  const toggleTruncation = (): void => setIsTruncated(!isTruncated);

  if (!text) return null; // Handle missing text

  const getTextParts = (): string[] => {
    const textParts: string[] = [];
    let currentPart: string = '';
    const words: string[] = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word: string = words[i];
      currentPart += `${word} `;

      if ((currentPart.trim().length >= maxLength) || currentPart.trim().endsWith('ecosystem')) {
        textParts.push(currentPart.trim());
        currentPart = '';
      }
    }

    if (currentPart.trim()) {
      textParts.push(currentPart.trim());
    }

    return textParts;
  };

  const textParts: string[] = getTextParts();
  const truncatedParts: string[] = textParts.slice(0, isTruncated ? 1 : textParts.length); // Control truncation

  return (
    <div>
      {truncatedParts.map((part, index) => (
        <p key={index}>{part}</p>
      ))}
      {isTruncated && (
        <button onClick={toggleTruncation} style={{ color: '#9D5FED' }}>{readMoreText}</button>
      )}
      {!isTruncated && (
        <button onClick={toggleTruncation} style={{ color: '#9D5FED' }}>Show less</button>
      )}
    </div>
  );
};

export default ReadMore;