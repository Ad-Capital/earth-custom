import React from 'react';
import UseCaseItem from './UseCaseItem';

interface Item {
  id: number;
  title: string;
  description: string;
  perfectfor: string;
  imageSrc: string;
}

export default function UseCase() {
  const items: Item[] = [
    {
      id: 1,
      title: "Made Just for You",
      description: "Your art, your way. No mass-produced prints, no generic designs, just a piece that's crafted to match your vision. Whether it's a portrait, a memory, or something totally unique, our artists bring it to life with care and creativity. You get a one-of-a-kind masterpiece that actually means something.",
      perfectfor: "💡 Perfect for adding a personal touch to your space or turning ideas into reality.",
      imageSrc: "/images/portfolio/1.jpg"
    },
    {
      id: 2,
      title: "A Gift They'll Never Forget",
      description: "Forget basic store-bought gifts, this is something special. Custom art isn't just another item; it's thoughtful, personal, and meaningful. Imagine gifting a hand-painted portrait of a loved one or a custom piece that reflects their style. It's the kind of present that makes people feel truly seen and appreciated.",
      perfectfor: "💡 Perfect for Birthdays, anniversaries, weddings, or just because.",
      imageSrc: "/images/portfolio/2.jpg"
    },
    {
      id: 3,
      title: "High-Quality, Made to Last",
      description: "This isn't some cheap print that fades over time. Our artists use top-tier materials to create art that stays vibrant and beautiful for years. Whether it's a hand-painted canvas or a digital illustration, you're getting quality that stands out, the kind that turns heads and starts conversations.",
      perfectfor: "💡 Perfect for Art lovers, home decor, and anyone who values craftsmanship.",
      imageSrc: "/images/portfolio/3.jpg"
    },
    {
      id: 4,
      title: "Make Your Space One-of-a-Kind",
      description: "Your walls should reflect you. A custom art piece isn't just decor—it's a statement. Whether it's the centerpiece of your living room, a bold touch in your office, or a meaningful piece in your bedroom, custom art adds personality and character like nothing else.",
      perfectfor: "💡 Perfect for Homeowners, creative spaces, and anyone who wants to stand out.",
      imageSrc: "/images/portfolio/4.jpg"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(item => (
          <UseCaseItem 
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            perfectfor={item.perfectfor}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}