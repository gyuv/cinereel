'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react'; // Assuming you use lucide-react, else use SVGs

// Mock Data for Search
const searchResults = [
  { id: 1, title: "Jujutsu Kaisen", image: "https://images.unsplash.com/photo-1578632767115-3515977f39f7?q=80&w=150&auto=format&fit=crop", type: "TV Series" },
  { id: 2, title: "Jujutsu Kaisen: Shibuya", image: "https://images.unsplash.com/photo-1613372408539-5b264313e991?q=80&w=150&auto=format&fit=crop", type: "Movie" },
  { id: 3, title: "Chainsaw Man", image: "https://images.unsplash.com/photo-1618336756725-247621920032?q=80&w=150&auto=format&fit=crop", type: "TV Series" },
];

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-3xl bg-ink-raised border border-ink-line rounded-xl shadow-2xl overflow-hidden animate-slide-down"
      >
        
        {/* Input Area */}
        <div className="flex items-center p-4 border-b border-ink-line">
          <Search className="w-5 h-5 text-paper-dim mr-3" />
          <input 
            type="text" 
            placeholder="Search anime, movies..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg text-paper placeholder:text-paper-dim focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-2 hover:bg-ink-line rounded-full transition text-paper-dim hover:text-paper">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
          {query ? (
            searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3 rounded-lg hover:bg-ink-line/50 transition cursor-pointer group"
                  >
                    <div className="w-16 h-24 bg-ink-line rounded overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h3 className="text-paper font-medium group-hover:text-marquee transition">{item.title}</h3>
                      <span className="text-xs text-paper-dim">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-paper-dim">
                <p>No results found for "{query}"</p>
              </div>
            )
          ) : (
            // Trending/Recent Suggestions when empty
            <div>
              <h4 className="text-sm font-bold text-paper mb-3 uppercase tracking-wider">Trending Now</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {searchResults.slice(0, 3).map((item) => (
                  <div key={item.id} className="aspect-[2/3] rounded-md overflow-hidden relative cursor-pointer group">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold">Watch</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer / Keyboard Hint */}
        <div className="p-3 bg-ink border-t border-ink-line flex justify-between text-xs text-paper-dim">
          <span>Press <kbd className="px-1 bg-ink-raised rounded">ESC</kbd> to close</span>
          <span>Powered by AniList API</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
