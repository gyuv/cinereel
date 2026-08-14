import React from 'react';

interface HeroCarouselProps {
  title: string;
  description: string;
  imageUrl: string;
  onWatch?: () => void;
}

export default function HeroCarousel({ title, description, imageUrl, onWatch }: HeroCarouselProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8 group shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
          {title}
        </h1>
        <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
          {description}
        </p>
        <button 
          onClick={onWatch}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Watch Now
        </button>
      </div>
    </div>
  );
}
