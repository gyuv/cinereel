'use client';

import React, { useState, useEffect } from 'react';

interface AnimeItem {
  id: string;
  title: string;
  backdrop?: string; // Or 'poster' depending on your API
  overview?: string;
  genre?: string[];
}

const HeroCarousel = () => {
  const [contents, setContents] = useState<AnimeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch trending anime from your API
    fetch('/api/media?kind=anime')
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array and has images
        const mappedData = data.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          backdrop: item.backdrop_path || item.poster_path, // TMDB specific
          overview: item.overview,
          genre: item.genre_ids || [],
        }));
        setContents(mappedData);
      })
      .catch((err) => console.error("Hero fetch error:", err));
  }, []);

  useEffect(() => {
    if (contents.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === contents.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [contents]);

  const current = contents[currentIndex];

  if (!current) return <div className="w-full h-[300px] md:h-[450px] bg-ink-raised rounded-2xl animate-pulse" />;

  return (
    <div 
      className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl group"
    >
      <img 
        src={`https://image.tmdb.org/t/p/original${current.backdrop}`} 
        alt={current.title} 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-ink-DEFAULT via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-lg text-paper-DEFAULT">
          {current.title}
        </h1>
        <p className="text-sm md:text-base text-paper-dim line-clamp-2 mb-4 drop-shadow-md">
          {current.overview}
        </p>
        <div className="flex gap-2 mb-4">
          {current.genre?.slice(0, 3).map((g, i) => (
            <span key={i} className="px-2 py-0.5 text-xs bg-marquee-DEFAULT/80 rounded text-ink-DEFAULT">
              {g}
            </span>
          ))}
        </div>
        <button 
          onClick={() => window.location.href = `/anime/${current.id}`}
          className="px-6 py-2.5 bg-marquee-DEFAULT hover:bg-marquee-hot rounded-full font-bold transition-transform hover:scale-105 shadow-lg text-ink-DEFAULT"
        >
          Watch Now
        </button>
      </div>

      <div className="absolute bottom-4 right-6 flex gap-2">
        {contents.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-marquee-DEFAULT w-4' : 'bg-paper-dim'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
