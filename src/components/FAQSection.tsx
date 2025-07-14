import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string[];
}

const faqs: FAQItem[] = [
    {
        question: "What if I'm not sure what I want?",
        answer: [
            "No worries! We understand that commissioning custom art can feel overwhelming. That’s why we’ve made it easy for you.",
            "Simply share your ideas, preferences, or even a rough sketch of what you’re envisioning, and our team will work with you to refine your concept.",
            "You’ll also be paired with an artist who specializes in your desired style, ensuring your vision comes to life exactly as you imagine - or even better!", 
        ]
    },
    {
        question: "How do I communicate with the artist?",
        answer: [
            "To ensure the best results and maintain a seamless process, all communication with artists is handled through us. Here's how it works:",
            "**1. Share Your Ideas:** After placing your order, you'll provide your initial ideas, preferences, and any reference materials (e.g., sketches, photos, or descriptions) through our platform.",
            "**2. We Relay Your Vision:** Our team will carefully review your request and share it with the artist, ensuring they fully understand your vision.",
            "**3. Feedback & Revisions:** If you have feedback or requests for changes, simply let us know, and we'll communicate them to the artist on your behalf. We'll also share updates from the artist, including progress photos or drafts, so you can stay involved in the process.",
            "This intermediary approach ensures quality control, protects your privacy, and allows the artist to focus entirely on creating your masterpiece. Rest assured, we're here to make the process smooth and enjoyable for you."
        ]
    },
    {
        question: "Can I cancel my request?",
        answer: [
            "Yes, you can cancel your request, but the timing matters to ensure fairness to both you and the artist.",
            "**1. Before the artist starts:** You can cancel your request for a full refund.",
            "**2. After the artist starts:** A partial refund may be issued depending on the progress of the artwork",
            "**3. After the artwork is completed:** Refunds are not available, but we’ll work with you to ensure you’re satisfied with the final product.",
            "We’ll always be transparent about the cancellation policy before you confirm your order."
        ]
    },
    {
        question: "How long does it take to receive my artwork?",
        answer: [
            "The timeline depends on the complexity of your request and the artist’s schedule. Once you place your order, we’ll provide an estimated delivery date based on your project details.",
            "On average, most artworks are completed within **7–14 days,** but we’ll keep you updated throughout the process.",
            " If you need your artwork by a specific date, let us know upfront, and we’ll do our best to accommodate your timeline."
        ]
    },
    {
        question: "Who are the artists creating these artworks?",
        answer: [
            "Our artists are carefully vetted professionals with proven expertise in various art styles, from traditional to digital art.",
            "While we don’t disclose their personal contact information to protect their privacy and our business model, you can view their portfolios on our platform to see examples of their work",
            "This ensures you’re matched with an artist whose style aligns with your vision. We take pride in working with some of the best talent in Nigeria, and we’re confident they’ll create something truly special for you."
        ]
    },
];

const formatText = (text: string) => {
    // Handle bold text wrapped in **
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="font-bold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <h1 className="text-2xl font-bold text-[#1E0734] mb-8">FAQ</h1>

            <div className="space-y-1">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-[#EDDBFE] rounded-[10px] overflow-hidden transition-all duration-200"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-4 text-left flex justify-between items-center hover:bg-purple-100 transition-colors"
                        >
                            <span className="font-medium text-[#1E0734]">{faq.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-[800px]' : 'max-h-0'
                                }`}
                        >
                            <div className="p-4 pt-0 text-[#1E0734] space-y-4">
                                {faq.answer.map((paragraph, pIndex) => (
                                    <p key={pIndex}>
                                        {formatText(paragraph)}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;