import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface RaveLaserShowProps {
  active: boolean;
  onDeactivate: () => void;
}

export const RaveLaserShow: React.FC<RaveLaserShowProps> = ({ active, onDeactivate }) => {
  useEffect(() => {
    if (active) {
      // Fire celebratory confetti on activation
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { y: 0.2 },
        colors: ['#10b981', '#06b6d4', '#ec4899', '#facc15', '#a855f7']
      });
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Top Left Laser Beam */}
      <div 
        className="absolute top-0 left-0 w-[120vw] h-1 origin-top-left bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent shadow-[0_0_20px_#10b981]"
        style={{
          animation: 'laser-sweep 3s ease-in-out infinite'
        }}
      ></div>

      {/* Top Right Laser Beam */}
      <div 
        className="absolute top-0 right-0 w-[120vw] h-1 origin-top-right bg-gradient-to-l from-pink-500 via-purple-400 to-transparent shadow-[0_0_20px_#ec4899]"
        style={{
          animation: 'laser-sweep 3.5s ease-in-out infinite reverse'
        }}
      ></div>

      {/* Center Cyan Beam */}
      <div 
        className="absolute top-0 left-1/2 w-[100vw] h-1 -translate-x-1/2 origin-top bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#06b6d4] opacity-75"
        style={{
          animation: 'laser-sweep 4s ease-in-out infinite'
        }}
      ></div>

      {/* Ambient Strobe Overlay */}
      <div className="absolute inset-0 bg-emerald-500/5 mix-blend-screen animate-pulse pointer-events-none"></div>

      {/* Fixed Floating Rave Indicator (Clickable to Turn Off) */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={onDeactivate}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 border border-emerald-400 text-emerald-300 font-mono text-xs shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-black transition-transform active:scale-95"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>⚡ RAVE MODE ACTIVE (CLICK TO EXIT)</span>
        </button>
      </div>
    </div>
  );
};
