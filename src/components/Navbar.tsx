import React from 'react';
import { Volume2, VolumeX, Sparkles, Calendar } from 'lucide-react';

interface NavbarProps {
  raveMode: boolean;
  onToggleRaveMode: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  onNavigateToBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  raveMode,
  onToggleRaveMode,
  isAudioMuted,
  onToggleMute,
  onNavigateToBooking
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090e]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-display font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            B
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            DJ BEANO
          </span>
        </a>

        {/* Zone 2: Clean Typography Navigation (4-6 text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#mixes" className="hover:text-emerald-400 transition-colors">
            Mixes
          </a>
          <a href="#deck" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Virtual Deck
          </a>
          <a href="#calendar" className="hover:text-emerald-400 transition-colors">
            Gig Calendar
          </a>
          <a href="#gallery" className="hover:text-emerald-400 transition-colors">
            Gallery
          </a>
          <a href="#fanzone" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-pink-400 hover:text-pink-300">
            Fan Zone
          </a>
          <a href="#releases" className="hover:text-emerald-400 transition-colors">
            Releases
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio Mute toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isAudioMuted ? "Unmute sound" : "Mute sound"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/40 hover:text-white transition-colors"
            title={isAudioMuted ? "Sound Muted (Click to Unmute)" : "Sound Active"}
          >
            {isAudioMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          </button>

          {/* Rave Mode Interactive Toggle */}
          <button
            onClick={onToggleRaveMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              raveMode
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse'
                : 'bg-white/5 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">{raveMode ? 'RAVE ACTIVE' : 'RAVE MODE'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onNavigateToBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book Artist
          </button>
        </div>
      </div>
    </header>
  );
};
