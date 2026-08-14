"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MediaSummary } from "../../lib/types";

export default function AnimePage() {
  const [trending, setTrending] = useState<MediaSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`/api/media?kind=anime`);
        const data = await res.json();
        setTrending(data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  // Filter genres based on common anime genres
  const genres = ["Action", "Adventure", "Fantasy", "Sci-Fi", "Drama", "Romance", "Mystery", "Supernatural"];

  const filteredAnime = selectedGenre
    ? trending.filter((item) => item.genreIds.includes(getGenreId(selectedGenre)))
    : trending;

  return (
    <div className="min-h-screen bg-[#0f1014] text-white">
      {/* Hero Section */}
      {trending.length > 0 && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={trending[0].backdropUrl || trending[0].posterUrl || "/placeholder.jpg"}
            alt={trending[0].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {trending[0].title}
            </h1>
            <p className="text-gray-300 mb-6 line-clamp-3">
              {trending[0].overview}
            </p>
            <Link
              href={`/watch/${trending[0].id}`}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition"
            >
              Watch Now
            </Link>
          </div>
        </div>
      )}

      {/* Genre Filter */}
      <div className="px-4 md:px-12 py-6 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              !selectedGenre
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-[#1a1c23] border-gray-700 text-gray-400 hover:bg-gray-800"
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedGenre === genre
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-[#1a1c23] border-gray-700 text-gray-400 hover:bg-gray-800"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Anime Grid */}
      <div className="px-4 md:px-12 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-[#1a1c23] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAnime.map((anime) => (
              <Link
                key={anime.id}
                href={`/watch/${anime.id}`}
                className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1c23]"
              >
                <Image
                  src={anime.posterUrl || "/placeholder.jpg"}
                  alt={anime.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-sm font-bold truncate">{anime.title}</h3>
                  <p className="text-xs text-gray-300">{anime.year}</p>
                </div>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500/90 rounded text-[10px] font-bold text-black">
                  {anime.rating.toFixed(1)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to map string genre name to TMDB ID (simplified)
function getGenreId(genreName: string): number {
  // You should populate this map with actual TMDB Genre IDs
  const genreMap: Record<string, number> = {
    Action: 28,
    Adventure: 12,
    Fantasy: 14,
    "Sci-Fi": 878,
    Drama: 18,
    Romance: 10749,
    Mystery: 9648,
    Supernatural: 37,
  };
  return genreMap[genreName] || 0;
}
