import Image from 'next/image';
import Link from 'next/link';

// Mock Data
const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", 
  "Supernatural", "Thriller"
];

const animeList = [
  { id: 1, title: "Jujutsu Kaisen", image: "https://images.unsplash.com/photo-1578632767115-3515977f39f7?q=80&w=400&auto=format&fit=crop", ep: "Ep 23", type: "TV" },
  { id: 2, title: "Chainsaw Man", image: "https://images.unsplash.com/photo-1618336756725-247621920032?q=80&w=400&auto=format&fit=crop", ep: "Ep 12", type: "TV" },
  { id: 3, title: "Spy x Family", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop", ep: "Ep 9", type: "TV" },
  { id: 4, title: "One Piece", image: "https://images.unsplash.com/photo-1560972590-7c7df73835df?q=80&w=400&auto=format&fit=crop", ep: "Ep 1090", type: "TV" },
  { id: 5, title: "Demon Slayer", image: "https://images.unsplash.com/photo-1531525645387-2f3aa214d7d4?q=80&w=400&auto=format&fit=crop", ep: "Ep 11", type: "TV" },
  { id: 6, title: "Attack on Titan", image: "https://images.unsplash.com/photo-1542204195-635d017c8b3d?q=80&w=400&auto=format&fit=crop", ep: "Ep 10", type: "TV" },
];

export default function AnimePage() {
  return (
    <div className="min-h-screen pb-12">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1578632767115-3515977f39f7?q=80&w=2070&auto=format&fit=crop" 
            alt="Featured Anime"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12 z-10">
          <span className="text-marquee font-bold tracking-wider mb-2 text-sm uppercase">Featured Anime</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg max-w-3xl text-paper">
            Jujutsu Kaisen Season 2
          </h1>
          <p className="text-paper-dim mb-6 max-w-2xl line-clamp-2 text-lg">
            The curse world is in turmoil as the conflict between the Jujutsu Sorcerers and the Special Grade Curse Ryomen Sukuna reaches its peak.
          </p>
          <div className="flex gap-4">
            <Link href="/watch" className="btn-marquee">
              ▶ Watch Now
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold bg-ink-raised text-paper transition-all hover:bg-ink-line border border-ink-line">
              + Add to List
            </button>
          </div>
        </div>
      </div>

      {/* 2. GENRE FILTER BAR */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4 border-b border-ink-line">
          <button className="px-5 py-2 bg-marquee rounded-full text-sm font-medium hover:bg-marquee-hot transition whitespace-nowrap text-ink">
            All Genres
          </button>
          {genres.map((genre) => (
            <button 
              key={genre} 
              className="px-5 py-2 bg-ink-raised hover:bg-ink-line rounded-full text-sm font-medium whitespace-nowrap transition text-paper border border-ink-line"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN LAYOUT (Grid + Sidebar) */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Anime Grid */}
        <div className="flex-1">
          <h2 className="section-heading text-2xl font-bold mb-6 text-paper">Latest Episodes</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime) => (
              <div key={anime.id} className="group relative aspect-[2/3] rounded-md overflow-hidden bg-ink-raised cursor-pointer glass-card">
                
                {/* Image with Poster Frame effects */}
                <div className="poster-frame w-full h-full">
                  <Image 
                    src={anime.image} 
                    alt={anime.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Badge */}
                <div className="absolute top-2 left-2 bg-ink/80 px-2 py-0.5 rounded text-xs font-bold text-paper z-10 backdrop-blur-sm">
                  {anime.ep}
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-marquee flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6 text-ink ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-ink/90 to-transparent">
                  <h3 className="text-sm font-semibold truncate text-paper">{anime.title}</h3>
                  <p className="text-xs text-paper-dim">{anime.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (Desktop Only) */}
        <div className="lg:w-80 hidden lg:block">
          <div className="glass-card p-4 sticky top-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-paper">
              <span className="w-2 h-2 bg-reel-rose rounded-full animate-marquee-pulse"></span>
              Recently Updated
            </h3>
            <div className="space-y-3">
              {animeList.slice(0, 5).map((anime) => (
                <div key={anime.id} className="flex gap-3 cursor-pointer group hover:bg-ink-line/30 p-2 rounded-lg transition">
                  <div className="w-16 h-20 bg-ink-line rounded-md overflow-hidden flex-shrink-0 relative">
                    <Image src={anime.image} fill className="object-cover" alt={anime.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium group-hover:text-marquee transition truncate text-paper">{anime.title}</h4>
                    <p className="text-xs text-paper-dim">{anime.ep}</p>
                    <p className="text-[10px] text-paper-dim mt-1">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
