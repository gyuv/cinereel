'use client';

import React, { useState, useEffect } from 'react';

// Mock data for the carousel
const HERO_CONTENTS = [
  {
    id: 1,
    title: 'Solo Leveling',
    desc: 'The weakest hunter becomes the strongest through a mysterious system.',
    image: 'https://image.tmdb.org/t/p/original/9Xw5aTHz0xj9uMqB1sYJ7q1Y1p0.jpg', 
    // Note: Replace with real TMDB image URLs in your actual app
    genre: ['Action', 'Fantasy'],
    link: '/anime/solo-leveling'
  },
  {
    id: 2,
    title: 'Jujutsu Kaisen',
    desc: 'A boy swallows a cursed talisman and becomes host to a powerful curse.',
    image: 'https://image.tmdb.org/t/p/original/9Xw5aTHz0xj9uMqB1sYJ7q1Y1p0.jpg',
    genre: ['Action', 'Supernatural'],
    link: '/anime/jujutsu-kaisen'
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === HERO_CONTENTS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = HERO_CONTENTS[currentIndex];

  return (
    <div 
      className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Fade Effect */}
      <img 
        src={current.image} 
        alt={current.title} 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-lg">{current.title}</h1>
        <p className="text-sm md:text-base text-gray-200 line-clamp-2 mb-4 drop-shadow-md">
          {current.desc}
        </p>
        <div className="flex gap-2 mb-4">
          {current.genre.map((g, i) => (
            <span key={i} className="px-2 py-0.5 text-xs bg-blue-600/80 rounded text-white">
              {g}
            </span>
          ))}
        </div>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
          Watch Now
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 right-6 flex gap-2">
        {HERO_CONTENTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-blue-500 w-4' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
