import React from 'react';

interface SectionData {
  title: string;
  content: string;
}

interface TextBoxProps {
  activeSection: string;
}

const sections: Record<string, SectionData> = {
  Community: {
    title: 'Experience Community Spirit',
    content:
      "Experience the warmth and camaraderie of our tight-knit community. From virtual exhibitions to collaborative projects, there's always something exciting happening at Earth",
  },
  Partnerships: {
    title:
      "We're actively seeking collaborations and partnerships with individuals and organizations who share our passion for the arts.",
    content:
      "Whether you're an artist, gallery owner, technology provider, or industry enthusiast, we invite you to Reach out to us today to explore partnership opportunities and be part of our journey towards innovation and excellence.",
  },
  Marketplace: {
    title: 'Coming soon',
    content:
      "Stay tuned for our upcoming launch, where you'll have access to a curated selection of artworks from talented artists around the globe.",
  },
  Events: {
    title: 'Artistry in Motion: Events & Exhibitions',
    content:
      'Engage with upcoming exhibitions, workshops, and artist talks. Stay in the loop with all our artistic gatherings.',
  },
  Blog: {
    title: 'Art & Culture Chronicles',
    content:
      'Explore our latest insights, stories, and updates in the world of art and culture. Dive into thought-provoking articles, behind-the-scenes features, and much more. Stay informed and inspired by visiting our blog regularly.',
  },
};

const TextBox: React.FC<TextBoxProps> = ({ activeSection }) => {
  const sectionData = sections[activeSection] || { title: '', content: '' };

  return (
    <div className="text-box h-full">
      <div className="p-10 h-full flex flex-col">
        <h2 className="text-3xl font-bold leading-9 text-left mb-6">
          {sectionData.title}
        </h2>
        <p className="text-2xl font-normal leading-8 text-left text-[#7668FD] mt-2.5">
          {sectionData.content}
        </p>
      </div>
    </div>
  );
};

export default TextBox;