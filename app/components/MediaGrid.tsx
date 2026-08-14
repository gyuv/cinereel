import React from 'react';

interface MediaItem {
  id: number;
  title: string;
  posterUrl: string;
  year?: string;
  rating?: number;
}

interface MediaGridProps {
  items: MediaItem[];
  loading?: boolean;
}

export default function MediaGrid({ items, loading }: MediaGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2" />
            <div className="h-4 bg-gray-800 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <div key={item.id} className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-gray-900">
          <img
            src={item.posterUrl || "/placeholder.jpg"}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold">PLAY</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-sm font-semibold truncate text-white">{item.title}</h3>
            {item.year && <span className="text-xs text-gray-400">{item.year}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
