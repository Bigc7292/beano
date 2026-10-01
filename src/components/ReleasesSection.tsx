import React from 'react';
import { ExternalLink, Play, Disc3, Radio } from 'lucide-react';
import { OFFICIAL_RELEASES, ReleaseTrack } from '../data/djData';
import { soundEngine } from '../utils/audioEngine';

export const ReleasesSection: React.FC = () => {
  const handlePlayTeaser = (track: ReleaseTrack) => {
    soundEngine.playHardcoreKick();
    setTimeout(() => soundEngine.playRavePiano(), 180);
    setTimeout(() => soundEngine.playOffbeatBass(), 300);
  };

  return (
    <section id="releases" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#07090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400"></span>
              <span>Beatport & Label Discography</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>TIOS Digital & Sound Intentionz</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Official Releases & Production
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Original 175 BPM club heaters and studio collaborations with DJ Pez released on the esteemed TIOS Digital imprint and Beatport.
            </p>
          </div>

          <a
            href="https://www.beatport.com/artist/dj-beano/857319"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 text-slate-200 text-xs font-mono font-semibold transition-colors"
          >
            <span>Beatport Catalog</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFICIAL_RELEASES.map((track) => (
            <div
              key={track.id}
              className="group rounded-xl border border-white/10 bg-[#0c111e] hover:bg-[#101726] hover:border-pink-500/40 p-4 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Artwork Thumbnail with Spin Hover */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4 bg-black border border-white/10 shadow-md">
                  <img
                    src={track.artworkUrl}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-pink-400 font-bold backdrop-blur-sm">
                    {track.bpm} BPM
                  </div>
                  
                  {/* Play snippet overlay button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handlePlayTeaser(track)}
                      className="h-11 w-11 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                      title="Sample track vibe"
                    >
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-1">
                  <span className="text-pink-400">{track.label}</span>
                  <span aria-hidden="true">·</span>
                  <span>{track.releaseDate}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                  {track.title}
                </h3>

                <div className="text-xs text-slate-300 font-mono mt-0.5">
                  {track.artists}
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {track.note}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handlePlayTeaser(track)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Disc3 className="h-3.5 w-3.5 text-pink-400" />
                  <span>Stab Sample</span>
                </button>

                {track.beatportUrl ? (
                  <a
                    href={track.beatportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Beatport</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <a
                    href={track.soundcloudUrl || 'https://soundcloud.com/beanodj'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>SoundCloud</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
