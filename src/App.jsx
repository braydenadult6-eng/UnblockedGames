/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowLeft,
  Trophy,
  Grid,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(gamesData.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="h-screen w-full bg-bg-deep flex flex-col text-zinc-300 font-sans overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-8 bg-bg-panel border-b border-border-subtle">
        <div className="flex items-center gap-12">
          <h1 
            className="text-2xl font-serif italic text-white tracking-widest uppercase cursor-pointer"
            onClick={() => setSelectedGame(null)}
          >
            Nocturn
          </h1>
          <nav className="hidden md:flex gap-8 text-[10px] font-semibold uppercase tracking-ultra">
            <button 
              onClick={() => setSelectedGame(null)}
              className={`pb-1 transition-all ${!selectedGame ? 'text-white border-b border-white' : 'hover:text-white'}`}
            >
              Library
            </button>
            <button className="hover:text-white transition-colors">Trending</button>
            <button className="hover:text-white transition-colors">Classic</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="bg-[#141414] border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-3 w-64">
            <Search className="w-3 h-3 text-zinc-500" />
            <input 
              type="text"
              placeholder="SEARCH GAMES"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest text-white w-full placeholder:text-zinc-600"
            />
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 bg-zinc-800 hidden sm:block"></div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!selectedGame && (
          <aside className="hidden lg:flex w-64 bg-bg-sidebar border-r border-border-subtle p-8 flex-col gap-10">
            <section>
              <h3 className="text-[10px] uppercase tracking-ultra text-zinc-500 mb-6 font-bold">Categories</h3>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className={`text-sm transition-colors ${activeCategory === cat ? 'text-white font-medium' : 'hover:text-white'}`}>
                      {cat}
                    </span>
                    {activeCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-ultra text-zinc-500 mb-6 font-bold">System Load</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-zinc-900 border border-border-subtle rounded flex items-center justify-center text-[10px] font-mono text-zinc-500">JP</div>
                  <div>
                    <div className="text-xs text-zinc-200">Jet Stream</div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-tighter italic">Low Latency</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-auto">
              <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center backdrop-blur-sm">
                <p className="text-[10px] leading-relaxed text-zinc-500 uppercase tracking-widest">Secure sandbox active</p>
              </div>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 max-w-6xl mx-auto w-full"
              >
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-5xl font-serif italic text-white leading-none tracking-tight">Recommended</h2>
                    <p className="text-zinc-500 mt-4 text-xs uppercase tracking-[0.3em] font-medium">Curated collection for desktop play</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {filteredGames.map((game, idx) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 overflow-hidden mb-5 relative transition-all group-hover:border-white/30 group-hover:scale-[1.02]">
                         <div className="absolute inset-0 flex items-center justify-center text-zinc-900/50 font-serif text-7xl select-none group-hover:text-zinc-800 transition-colors">
                           {String(idx + 1).padStart(2, '0')}
                         </div>
                         <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 text-[9px] text-zinc-500 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                           EXECUTE MODULE
                         </div>
                      </div>
                      <h4 className="font-serif text-xl text-white mb-2 group-hover:italic transition-all">{game.title}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{game.category}</span>
                        <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredGames.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-40 text-zinc-700">
                    <Grid className="w-16 h-16 mb-6 opacity-20" />
                    <p className="text-sm uppercase tracking-widest">No entries match your query</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full bg-black/40"
              >
                <div className="h-20 flex items-center justify-between px-10 border-b border-border-subtle bg-bg-panel/50 backdrop-blur-sm">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="p-3 border border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-zinc-400" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-serif italic text-white">{selectedGame.title}</h2>
                      <div className="text-[9px] uppercase tracking-ultra text-zinc-500 flex gap-4 mt-1">
                        <span>{selectedGame.category}</span>
                        <span>SESSION: STABLE</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-5 py-2 border border-white/10 hover:border-white/30 text-[10px] uppercase tracking-widest font-bold transition-all">
                      <Trophy className="w-3 h-3 text-amber-500" />
                      Save Metadata
                    </button>
                    <button className="p-3 border border-white/10 hover:bg-white/5 transition-colors">
                      <Monitor className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-black p-4 relative">
                  <div className="w-full h-full rounded-sm overflow-hidden  border border-white/5">
                    <iframe 
                      src={selectedGame.url}
                      className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                      allow="fullscreen; autoplay; encrypted-media"
                      title={selectedGame.title}
                    />
                  </div>
                </div>

                <footer className="h-12 border-t border-border-subtle bg-bg-panel flex items-center justify-between px-10">
                  <div className="flex gap-6">
                    <span className="text-[9px] uppercase tracking-ultra text-zinc-600">Secure Protocol: AES-256</span>
                    <span className="text-[9px] uppercase tracking-ultra text-zinc-600">Source: {new URL(selectedGame.url).hostname}</span>
                  </div>
                  <div className="text-[9px] text-zinc-700 font-mono tracking-tighter">0xCC_SYSTEM_LOAD_COMPLETE</div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Bottom Bar (Status) */}
      {!selectedGame && (
        <footer className="h-10 bg-bg-panel border-t border-border-subtle flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-8">
            <span className="text-[9px] uppercase tracking-ultra text-zinc-600 font-bold">System: Stable</span>
            <span className="text-[9px] uppercase tracking-ultra text-zinc-600 font-bold hidden sm:block">JSON: games.db.json (Connected)</span>
          </div>
          <div className="text-[9px] text-zinc-700 font-serif italic tracking-widest">© NOCTURN MULTIMEDIA HUB</div>
        </footer>
      )}
    </div>
  );
}
