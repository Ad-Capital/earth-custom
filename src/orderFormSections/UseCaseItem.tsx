import React from 'react';

interface UseCaseItemProps {
  id: number;
  title: string;
  description: string;
  perfectfor: string;
  imageSrc: string;
}

export default function UseCaseItem({ title, description, perfectfor, imageSrc }: UseCaseItemProps) {
  return (
    <div className="mb-16 md:mb-0">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-xl font-semibold text-[#1E0734] mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-gray-700">{perfectfor}</p>
      </div>
    </div>
  );
}