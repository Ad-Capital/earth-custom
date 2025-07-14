import React from 'react';
import Link from 'next/link';
import RoundedButton from '@/constants/RoundedButtons';

export default function CallToActionSection() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="md:text-3xl text-xl font-bold text-[#1E0734] mb-[24px]">
        elevate your <span className="text-3xl font-dancing text-[#7B3FA9]">space</span> with meaningful <span className="text-4xl font-dancing text-[#7B3FA9]">Art.</span>
      </h1>

      <p className="text-[#757575] text-lg font-semibold pb-[63px]">Fill your walls with more than just decor. Fill them with your Story, your Memories, Your Art.</p>
      <Link href='/orderform'>
        <RoundedButton>
          <p>Create your Custom Art</p>
        </RoundedButton>
      </Link>
    </section>
  );
}