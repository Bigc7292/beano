import React, { useState, useEffect } from 'react';
import { Play, Pause, ExternalLink, Disc, Clock, Radio, ListMusic, Music } from 'lucide-react';
import { DJ_MIXES, TrackMix } from '../data/djData';
import { soundEngine } from '../utils/audioEngine';

export const MixStation: React.FC = () => {
  const [selectedMix, setSelectedMix] = useState<TrackMix>(DJ_MIXES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'classics' | '170' | '160'>('all');
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Playback timer simulation
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isPlaying]);

  const handlePlayToggle = (mix: TrackMix) => {
    if (selectedMix.id === mix.id) {
      if (isPlaying) {
        soundEngine.stopLoop();
        setIsPlaying(false);
      } else {
        soundEngine.setBpm(mix.bpm);
        soundEngine.playLaserSweep();
        soundEngine.startLoop();
        setIsPlaying(true);
      }
    } else {
      setSelectedMix(mix);
      soundEngine.setBpm(mix.bpm);
      soundEngine.playLaserSweep();
      soundEngine.startLoop();
      setIsPlaying(true);
      setPlaybackProgress(0);
    }
  };

  const filteredMixes = DJ_MIXES.filter((m) => {
    if (activeTab === 'classics') return m.genres.some(g => g.toLowerCase().includes('classic'));
    if (activeTab === '170') return m.bpm >= 170;
    if (activeTab === '160') return m.bpm <= 165;
    return true;
  });

  return (
    <section id="mixes" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#07090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              <span>SoundCloud & Live Archives</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Hereford Underground</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Spill The Beanz Mix Station
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Listen to DJ Beano's official mix releases, classic slammers, and live festival competition tapes recorded in the studio.
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'all' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tapes ({DJ_MIXES.length})
            </button>
            <button
              onClick={() => setActiveTab('170')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === '170' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              170+ BPM UKHC
            </button>
            <button
              onClick={() => setActiveTab('160')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === '160' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              160 BPM Bounce
            </button>
            <button
              onClick={() => setActiveTab('classics')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'classics' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Classics
            </button>
          </div>
        </div>

        {/* Featured Now-Playing Studio Deck Bar */}
        <div className="mb-10 rounded-2xl border border-white/15 bg-gradient-to-r from-[#0c1222] via-[#09101d] to-[#0c1222] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Mix Artwork */}
            <div className="lg:col-span-4 relative group">
              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-xl overflow-hidden border border-white/20 shadow-xl bg-slate-900">
                <img
                  src={selectedMix.artwork}
                  alt={selectedMix.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handlePlayToggle(selectedMix)}
                    className="h-14 w-14 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  >
                    {isPlaying && selectedMix.id === selectedMix.id ? (
                      <Pause className="h-6 w-6 fill-black" />
                    ) : (
                      <Play className="h-6 w-6 fill-black ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mix Information & Live Scrubbing Player */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-mono font-bold">{selectedMix.series}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedMix.year}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-cyan-400 font-bold">{selectedMix.bpm} BPM</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="h-3 w-3" />
                  {selectedMix.duration}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {selectedMix.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedMix.description}
              </p>

              {/* Progress Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${playbackProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>00:00 (Synth Preview)</span>
                  <span>{selectedMix.duration}</span>
                </div>
              </div>

              {/* Player Controls & SoundCloud Link */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handlePlayToggle(selectedMix)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-bold text-xs tracking-wider transition-all active:scale-95 shadow-md"
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
                  <span>{isPlaying ? 'PAUSE PREVIEW' : 'PLAY PREVIEW'}</span>
                </button>

                <a
                  href={selectedMix.soundcloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 font-mono text-xs font-semibold transition-colors"
                >
                  <span>Listen on SoundCloud</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {selectedMix.tracklist && (
                  <div className="text-xs text-slate-400 font-mono">
                    <span className="text-slate-300 font-semibold">{selectedMix.tracklist.length}</span> Tracks in Set
                  </div>
                )}
              </div>

              {/* Tracklist Preview Dropdown */}
              {selectedMix.tracklist && (
                <div className="mt-3 p-3 rounded-lg bg-black/40 border border-white/10 text-xs">
                  <div className="font-mono text-slate-400 flex items-center gap-1.5 mb-2 font-semibold">
                    <ListMusic className="h-3.5 w-3.5 text-emerald-400" />
                    SELECT CUE POINTS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
                    {selectedMix.tracklist.map((track, idx) => (
                      <div key={idx} className="flex items-center gap-2 truncate">
                        <span className="font-mono text-slate-500 text-[10px]">0{idx + 1}.</span>
                        <span className="truncate">{track}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mix Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMixes.map((mix) => {
            const isCurrent = selectedMix.id === mix.id;
            return (
              <div
                key={mix.id}
                onClick={() => setSelectedMix(mix)}
                className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200 bg-slate-900/60 hover:bg-slate-900 ${
                  isCurrent ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-3 bg-black">
                  <img
                    src={mix.artwork}
                    alt={mix.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[11px] text-cyan-400 font-bold backdrop-blur-sm">
                    {mix.bpm} BPM
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayToggle(mix);
                      }}
                      className="h-10 w-10 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-md active:scale-95"
                    >
                      {isPlaying && isCurrent ? (
                        <Pause className="h-4 w-4 fill-black" />
                      ) : (
                        <Play className="h-4 w-4 fill-black ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{mix.series}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{mix.duration}</span>
                </div>

                <h4 className="font-display text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {mix.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {mix.description}
                </p>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{mix.genres.slice(0, 2).join(' / ')}</span>
                  <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                    Select Tape →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
