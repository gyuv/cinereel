import React from 'react';

interface GenreFilterProps {
  genres: string[];
  selected: string;
  onSelect: (genre: string) => void;
}

export default function GenreFilter({ genres, selected, onSelect }: GenreFilterProps) {
  return (
    <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide mb-6 border-b border-gray-800">
      <button
        onClick={() => onSelect("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
          selected === "All"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
            selected === genre
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
