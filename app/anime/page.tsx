import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import GenreFilter from '@/components/GenreFilter';
import MediaGrid from '@/components/MediaGrid';

const AnimePage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <HeroCarousel />
      </div>

      {/* Genre Filter & Content Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        <GenreFilter />
        
        {/* Grid Layout */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-600 pl-3">
            Trending Anime
          </h2>
          <MediaGrid kind="anime" />
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
