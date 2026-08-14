'use client';

import React from 'react';

const GENRES = [
  'All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 
  'Supernatural', 'Thriller', 'Isekai', 'Mecha'
];

const GenreFilter = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-4">
      <div className="flex gap-3 min-w-max px-1">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className="px-4 py-1.5 bg-[#1f1f1f] border border-gray-700 hover:border-blue-500 hover:bg-[#2a2a2a] rounded-full text-sm font-medium transition-colors whitespace-nowrap"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
