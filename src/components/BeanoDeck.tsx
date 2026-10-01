import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Sliders, Volume2, Sparkles, RefreshCw, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface PadConfig {
  id: string;
  label: string;
  sub: string;
  key: string;
  color: string;
  action: () => void;
}

export const BeanoDeck: React.FC = () => {
  const [bpm, setBpm] = useState(170);
  const [filterCutoff, setFilterCutoff] = useState(18000);
  const [isLooping, setIsLooping] = useState(false);
  const [activePad, setActivePad] = useState<string | null>(null);
  const [pitchOffset, setPitchOffset] = useState(0); // +/- percentage
  const [deckActive, setDeckActive] = useState<'A' | 'B'>('A');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Trigger individual sounds
  const triggerKick = useCallback(() => {
    soundEngine.playHardcoreKick();
    setActivePad('kick');
    setTimeout(() => setActivePad(null), 120);
  }, []);

  const triggerBass = useCallback(() => {
    soundEngine.playOffbeatBass();
    setActivePad('bass');
    setTimeout(() => setActivePad(null), 120);
  }, []);

  const triggerPiano = useCallback(() => {
    soundEngine.playRavePiano();
    setActivePad('piano');
    setTimeout(() => setActivePad(null), 150);
  }, []);

  const triggerLaser = useCallback(() => {
    soundEngine.playLaserSweep();
    setActivePad('laser');
    setTimeout(() => setActivePad(null), 150);
  }, []);

  const triggerAirhorn = useCallback(() => {
    soundEngine.playAirhorn();
    setActivePad('airhorn');
    setTimeout(() => setActivePad(null), 200);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#facc15', '#ec4899', '#10b981']
    });
  }, []);

  const triggerRewind = useCallback(() => {
    soundEngine.playRewind();
    setActivePad('rewind');
    setTimeout(() => setActivePad(null), 250);
  }, []);

  const triggerMcOiOi = useCallback(() => {
    soundEngine.playMcShout("Oi oi! Hereford having it!");
    setActivePad('mcoi');
    setTimeout(() => setActivePad(null), 200);
  }, []);

  const triggerMcBrand = useCallback(() => {
    soundEngine.playMcShout("Sound Intentionz, diverse audio!");
    setActivePad('mcbrand');
    setTimeout(() => setActivePad(null), 200);
  }, []);

  // Performance Pads definition
  const pads: PadConfig[] = [
    { id: 'kick', label: '909 HARDCORE KICK', sub: 'Gabber Punch', key: 'K', color: 'from-emerald-500 to-teal-700', action: triggerKick },
    { id: 'bass', label: 'OFFBEAT SUB BASS', sub: 'Reverse Donk', key: 'B', color: 'from-cyan-500 to-blue-700', action: triggerBass },
    { id: 'piano', label: '90s RAVE PIANO', sub: 'M1 Minor Stab', key: 'P', color: 'from-purple-500 to-indigo-700', action: triggerPiano },
    { id: 'laser', label: 'LASER SWEEP', sub: 'Resonant Drop', key: 'L', color: 'from-pink-500 to-rose-700', action: triggerLaser },
    { id: 'airhorn', label: 'RAVE AIRHORN', sub: 'Triple Dissonance', key: 'H', color: 'from-amber-400 to-orange-600', action: triggerAirhorn },
    { id: 'rewind', label: 'WHEEL UP REWIND', sub: 'Vinyl Scratch', key: 'R', color: 'from-red-500 to-orange-700', action: triggerRewind },
    { id: 'mcoi', label: 'MC: "OI OI!"', sub: 'Hereford Crowd', key: '1', color: 'from-yellow-400 to-lime-600', action: triggerMcOiOi },
    { id: 'mcbrand', label: 'MC: "SOUND INTENTIONZ"', sub: 'Diverse Audio', key: '2', color: 'from-teal-400 to-emerald-600', action: triggerMcBrand },
  ];

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      switch (key) {
        case 'K': triggerKick(); break;
        case 'B': triggerBass(); break;
        case 'P': triggerPiano(); break;
        case 'L': triggerLaser(); break;
        case 'H': triggerAirhorn(); break;
        case 'R': triggerRewind(); break;
        case '1': triggerMcOiOi(); break;
        case '2': triggerMcBrand(); break;
        case ' ':
          e.preventDefault();
          toggleLoop();
          break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKick, triggerBass, triggerPiano, triggerLaser, triggerAirhorn, triggerRewind, triggerMcOiOi, triggerMcBrand]);

  const toggleLoop = () => {
    if (isLooping) {
      soundEngine.stopLoop();
      setIsLooping(false);
    } else {
      soundEngine.startLoop();
      setIsLooping(true);
    }
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value, 10);
    setBpm(newBpm);
    soundEngine.setBpm(newBpm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setFilterCutoff(val);
    soundEngine.setFilterCutoff(val);
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const offset = parseFloat(e.target.value);
    setPitchOffset(offset);
    const calculatedBpm = Math.round(170 * (1 + offset / 100));
    setBpm(calculatedBpm);
    soundEngine.setBpm(calculatedBpm);
  };

  // Realtime Audio Canvas Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = soundEngine.getAnalyser();
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Gradient color for bars: emerald to cyan
        const r = Math.min(255, 16 + (dataArray[i] * 0.8));
        const g = Math.min(255, 185 + (dataArray[i] * 0.2));
        const b = Math.min(255, 129 + (dataArray[i] * 0.5));

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        // Peak line
        ctx.fillStyle = '#ec4899';
        ctx.fillRect(x, canvas.height - barHeight - 2, barWidth - 1, 2);

        x += barWidth;
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="deck" className="py-16 lg:py-24 border-b border-white/10 relative overflow-hidden bg-[#090d16]">
      {/* Laser glow lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Hardware & Live Synthesizer</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Zero Plugins Needed</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The Beano Virtual Deck & MPC
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Real-time browser synthesizer built with Web Audio API. Tap the pads, play with the pitch fader, or launch the automated 170 BPM UK Hardcore loop.
            </p>
          </div>

          {/* Quick Deck Switcher & Status */}
          <div className="flex items-center gap-3">
            <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setDeckActive('A')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  deckActive === 'A' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                DECK A (170 BPM)
              </button>
              <button
                onClick={() => setDeckActive('B')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  deckActive === 'B' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                DECK B (175 BPM)
              </button>
            </div>
          </div>
        </div>

        {/* Main DJ Console Unit */}
        <div className="rounded-2xl border border-white/15 bg-[#0b101c] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-5 sm:p-7">
          
          {/* Top Panel: Display, Waveform & Master Knobs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-white/10">
            
            {/* Visualizer Display Unit */}
            <div className="lg:col-span-6 rounded-xl bg-black/80 border border-emerald-500/30 p-3.5 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  MASTER WAVEFORM // FFT
                </span>
                <span className="text-pink-400 font-bold">{bpm} BPM</span>
              </div>
              
              {/* Canvas visualizer */}
              <canvas
                ref={canvasRef}
                width={500}
                height={70}
                className="w-full h-16 rounded bg-[#03060c] block"
              />

              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>FILTER: {filterCutoff}Hz</span>
                <span className={isLooping ? "text-emerald-400 font-bold animate-pulse" : "text-slate-500"}>
                  {isLooping ? "LIVE LOOP ACTIVE" : "LOOP STANDBY"}
                </span>
                <span>PITCH: {pitchOffset > 0 ? `+${pitchOffset}%` : `${pitchOffset}%`}</span>
              </div>
            </div>

            {/* Mixer & Sequencer Controls */}
            <div className="lg:col-span-6 flex flex-wrap items-center justify-between gap-4">
              
              {/* Loop Sequencer Play Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleLoop}
                  className={`flex items-center gap-2.5 px-6 py-4 rounded-xl font-display font-extrabold text-sm transition-all active:scale-95 shadow-lg ${
                    isLooping
                      ? 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)]'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                  }`}
                >
                  {isLooping ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-black" />}
                  <span>{isLooping ? 'STOP 170BPM LOOP' : 'START 170BPM LOOP'}</span>
                </button>

                <button
                  onClick={() => {
                    setPitchOffset(0);
                    setBpm(170);
                    soundEngine.setBpm(170);
                    setFilterCutoff(18000);
                    soundEngine.setFilterCutoff(18000);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Reset Pitch & Filter"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {/* Pitch Fader Slider */}
              <div className="flex-1 min-w-[200px] space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Sliders className="h-3 w-3 text-cyan-400" />
                    TEMPO FADER
                  </span>
                  <span className="font-bold text-cyan-400">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="0.5"
                  value={pitchOffset}
                  onChange={handlePitchChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>-8% (156)</span>
                  <span>0% (170)</span>
                  <span>+8% (184)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Lower Section: Spinning Virtual Vinyl Platters + 8-Pad MPC Sampler */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-7 items-center">
            
            {/* Spinning Virtual Vinyl Deck Visualizer */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="relative flex items-center justify-center h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-slate-950 border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                
                {/* Vinyl Grooves concentric rings */}
                <div className="absolute inset-2 rounded-full border border-slate-800/80"></div>
                <div className="absolute inset-5 rounded-full border border-slate-800/60"></div>
                <div className="absolute inset-9 rounded-full border border-slate-800/40"></div>
                <div className="absolute inset-14 rounded-full border border-slate-800/30"></div>
                
                {/* Rotating Vinyl Center Label */}
                <div 
                  className={`relative flex items-center justify-center h-20 w-20 rounded-full border-2 border-emerald-400/80 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 shadow-md ${
                    isLooping ? 'animate-vinyl' : 'animate-vinyl-paused'
                  }`}
                >
                  <div className="h-4 w-4 rounded-full bg-black border border-white/50"></div>
                  <div className="absolute -top-1 font-mono text-[8px] font-bold text-black tracking-tighter">BEANO</div>
                  <div className="absolute -bottom-1 font-mono text-[8px] font-bold text-black tracking-tighter">170 BPM</div>
                </div>

                {/* Tone arm needle visual */}
                <div className="absolute top-2 right-4 h-24 w-1 bg-gradient-to-b from-slate-400 to-slate-200 transform rotate-25 origin-top shadow-lg pointer-events-none"></div>
              </div>

              {/* Deck info */}
              <div className="mt-4 text-center">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  TECHNICS 1200 MK2 DIGITAL EMULATION
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Direct drive quartz lock · Sound Intentionz Hereford
                </div>
              </div>
            </div>

            {/* 8-Pad Performance Soundboard */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  PERFORMANCE SOUND PADS (CLICK OR PRESS KEYS)
                </span>
                <span className="hidden sm:inline text-slate-500">HOTKEYS: [K] [B] [P] [L] [H] [R] [1] [2]</span>
              </div>

              {/* 8 Pads Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pads.map((pad) => {
                  const isActive = activePad === pad.id;
                  return (
                    <button
                      key={pad.id}
                      onClick={pad.action}
                      className={`relative flex flex-col items-start justify-between p-3.5 h-24 rounded-xl border transition-all active:scale-95 text-left overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-br ${pad.color} border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-[0.98]`
                          : 'bg-slate-900/80 hover:bg-slate-800 border-white/10 hover:border-emerald-500/50 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-black/40 text-emerald-400 border border-white/10">
                          {pad.key}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80 animate-ping opacity-0 group-hover:opacity-100"></span>
                      </div>

                      <div>
                        <div className="font-display font-bold text-xs sm:text-sm tracking-tight text-white leading-tight">
                          {pad.label}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {pad.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Lowpass Filter Sweep Slider */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 shrink-0">
                  <Volume2 className="h-4 w-4 text-emerald-400" />
                  <span>LOWPASS FILTER CUTOFF:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{filterCutoff} Hz</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="19000"
                  step="200"
                  value={filterCutoff}
                  onChange={handleFilterChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
