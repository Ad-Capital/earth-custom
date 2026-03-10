'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ArtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtModal: React.FC<ArtModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Own an Art Piece
          </h2>
          <p className="text-gray-600 text-sm">
            Choose how you'd like to acquire your artwork
          </p>
        </div>
        
        {/* Options */}
        <div className="space-y-4">
          <Link
            href="https://earthinc.bumpa.shop/"
            className="block w-full"
            onClick={onClose}
          >
            <button className="w-full bg-[#1E0734] text-white py-4 px-6 rounded-full font-semibold hover:bg-[#1E0734]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Buy an Original
            </button>
          </Link>
          
          <Link
            href="/custom-art"
            className="block w-full"
            onClick={onClose}
          >
            <button className="w-full border-2 border-[#1E0734] text-[#1E0734] py-4 px-6 rounded-full font-semibold hover:bg-[#1E0734] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Commission Custom Art
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtModal;