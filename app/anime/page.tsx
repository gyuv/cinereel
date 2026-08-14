import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import GenreFilter from '../components/GenreFilter';
import MediaGrid from '../components/MediaGrid';

const AnimePage = () => {
  return (
    <div className="min-h-screen bg-ink-DEFAULT text-paper-DEFAULT">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <HeroCarousel />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        <GenreFilter />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-marquee-DEFAULT pl-3 text-paper-DEFAULT">
            Trending Anime
          </h2>
          <MediaGrid kind="anime" />
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
