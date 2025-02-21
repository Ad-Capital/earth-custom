"use client";

import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RoundedButton from "@/constants/RoundedButtons"
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const ContactPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <main>
            <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="w-full px-4">
                    <img src="logo.svg" alt="Logo" />
                </Link>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-gray-600">
                            Get in touch with our team. We're here to help!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="h-5 w-5 text-blue-600" />
                                            <a href="mailto:isaacona2@gmail.com" className="text-gray-700 hover:text-blue-600">
                                                isaacona2@gmail.com
                                            </a>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Phone className="h-5 w-5 text-blue-600" />
                                            <a href="tel:+1234567890" className="text-gray-700 hover:text-blue-600">
                                                +234 (902) 945-8058
                                            </a>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <MessageCircle className="h-5 w-5 text-blue-600" />
                                            <a href="https://wa.me/2349029458058" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send us a message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center"
                                        >
                                            <RoundedButton><p>Send Message</p></RoundedButton>
                                        </button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default ContactPage;