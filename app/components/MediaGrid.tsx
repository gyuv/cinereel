'use client';

import React from 'react';
import Link from 'next/link';

// This component assumes you pass a `kind` prop ('movie', 'anime', or 'tv')
interface MediaGridProps {
  kind: 'movie' | 'tv' | 'anime';
}

const MediaGrid = ({ kind }: MediaGridProps) => {
  // Mock items for the grid
  const items = Array(12).fill({ title: 'Sample Anime', image: 'https://image.tmdb.org/t/p/w500/123.jpg' });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item, index) => (
        <Link 
          key={index} 
          href={`/${kind}/${index}`}
          className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-[#1a1a1a]"
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.843A1.5 1.5 0 017.957 4v11.314a1.5 1.5 0 01-1.657 1.157l-4-2A1.5 1.5 0 011.5 14V6.993a1.5 1.5 0 01.793-1.157l4-2z" />
               </svg>
            </div>
          </div>

          {/* Title on hover/bottom */}
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-xs md:text-sm font-semibold truncate">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MediaGrid;
