"use client";

import React from 'react'
import OrderForm from '@/components/OrderForm'
import Link from 'next/link';

const page = () => {
  return (
    <main className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <Link href="/" className="w-full lg:py-6">
        <img src="logo.svg" alt="Logo" />
      </Link>
      <div className="text-center">
        <h1 className='text-4xl font-bold text-[#1E0634] my-4'>OrderForm</h1>
        <p className="text-lg mb-8">Describe your vision, and we’ll match you with an artist who can bring it to life.</p>
      </div>
      <OrderForm />
    </main>
  )
}

export default page