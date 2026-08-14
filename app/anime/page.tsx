import Image from 'next/image';

export default function AnimePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Background Image with Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1578632767115-3515977f39f7?q=80&w=2070&auto=format&fit=crop" 
          alt="Featured Anime"
          fill
          className="object-cover"
          priority
        />
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <span className="text-blue-500 font-bold tracking-wider text-sm mb-2">TRENDING NOW</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Jujutsu Kaisen
          </h1>
          <p className="text-gray-300 max-w-2xl mb-6 text-lg">
            In a world where cursed spirits feed on unsuspecting humans, hidden agent of the Jujutsu Society Satoru Gojou and his student Yuji Itadori battle powerful curses.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2">
              ▶ Watch S1
            </button>
            <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition backdrop-blur-sm">
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* 2. GENRE FILTER BAR */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-800">
          {['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Isekai', 'Mecha', 'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural'].map((genre) => (
            <button 
              key={genre}
              className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium whitespace-nowrap transition border border-gray-700"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
