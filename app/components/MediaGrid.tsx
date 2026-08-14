'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MediaGridProps {
  kind: 'movie' | 'tv' | 'anime';
}

const MediaGrid = ({ kind }: MediaGridProps) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/media?kind=${kind}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Grid fetch error:", err));
  }, [kind]);

  if (items.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-ink-raised rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item: any, index: number) => (
        <Link 
          key={index} 
          href={`/${kind}/${item.id}`}
          className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-ink-raised"
        >
          <img 
            src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} 
            alt={item.title || item.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-marquee-DEFAULT rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
               <svg className="w-5 h-5 text-ink-DEFAULT" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.843A1.5 1.5 0 017.957 4v11.314a1.5 1.5 0 01-1.657 1.157l-4-2A1.5 1.5 0 011.5 14V6.993a1.5 1.5 0 01.793-1.157l4-2z" />
               </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-ink-DEFAULT to-transparent">
            <h3 className="text-xs md:text-sm font-semibold truncate text-paper-DEFAULT">
              {item.title || item.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MediaGrid;
