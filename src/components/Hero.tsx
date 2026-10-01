import React, { useState } from 'react';
import { Play, Disc, ArrowUpRight, Zap, Radio, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenDeck: () => void;
  onOpenMixes: () => void;
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDeck, onOpenMixes, onBookNow }) => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);

  const handlePlayTeaser = () => {
    soundEngine.playAirhorn();
    setTimeout(() => soundEngine.playHardcoreKick(), 250);
    setTimeout(() => soundEngine.playOffbeatBass(), 350);
    setTimeout(() => soundEngine.playRavePiano(), 450);
    setTimeout(() => soundEngine.playLaserSweep(), 600);
    
    setIsPlayingTeaser(true);
    setTimeout(() => setIsPlayingTeaser(false), 900);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#ec4899', '#facc15']
    });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:py-24 border-b border-white/10">
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-[130px]"></div>
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-pink-500/15 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typographic Identity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Scene Marker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Hereford, UK</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>UK Hardcore & Powerstomp</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-slate-400">160–175+ BPM</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              LUKE WATKINS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
                DJ BEANO
              </span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              From spinning vinyl on Technics 1200s in 2005 to headlining festival stages with Clubland at Hereford FC Stadium and rocking Corfu with MC Whizzkid. Founder of <strong className="text-white font-semibold">Sound Intentionz</strong> and resident at <strong className="text-white font-semibold">The Rave Alliance</strong>.
            </p>

            {/* Interactive Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handlePlayTeaser}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
              >
                <Zap className={`h-4 w-4 ${isPlayingTeaser ? 'animate-bounce text-pink-700' : 'text-black'}`} />
                <span>DROP RAVE SAMPLE</span>
              </button>

              <button
                onClick={onOpenDeck}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-sm font-semibold transition-all active:scale-95"
              >
                <Disc className="h-4 w-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Launch Virtual Decks</span>
              </button>

              <button
                onClick={onBookNow}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-medium transition-colors"
              >
                <span>Bookings & Rider</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {/* Real Stats & Milestones from Facebook profile */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
              <div>
                <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">2005</div>
                <div className="text-xs text-slate-400 mt-0.5">Technics 1200 Roots</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">175+</div>
                <div className="text-xs text-slate-400 mt-0.5">Peak BPM Energy</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-pink-400 tabular-nums">200k+</div>
                <div className="text-xs text-slate-400 mt-0.5">Charity Stream Reach</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-amber-400 tabular-nums">1st Pl.</div>
                <div className="text-xs text-slate-400 mt-0.5">Core Unity Nubreed</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Container & Deck Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="/src/assets/images/dj_beano_hero_rave_1790843080869.jpg"
                  alt="DJ Beano on stage at UK Hardcore Rave with lasers"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center"
                />

                {/* Dark gradient overlay scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent"></div>

                {/* Floating DJ Avatar in bottom left */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-1/332161603_6555635691121345_2499743577748610014_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=f907e8&_nc_ohc=rD5Zz4p-vaAQ7kNvwGW77k8&_nc_oc=AdrGD2wIYa2L_UQOlMQQTdsviu-Tl2o8ZwirSdGHYDtOfqq_rqDtEIKCjEVoQ7xqx8U&_nc_zt=24&_nc_ht=scontent-atl3-1.xx&_nc_gid=2vf8FZqIKsfVLCC1FS_pAA&_nc_ss=7d289&oh=00_AQPcjMUuOr_I_tz5MzgsP5wSyYkUfjRPJb91nqBbLUcHdw&oe=6AC3D372"
                      alt="DJ Beano official avatar"
                      className="h-12 w-12 rounded-lg object-cover border border-emerald-400/50 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                        DJ Beano
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">Sound Intentionz & TRA</div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenMixes}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-transform active:scale-95 shadow-md"
                    title="Play latest mixes"
                  >
                    <Play className="h-4 w-4 fill-black" />
                  </button>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <div className="absolute -top-3 -right-3 sm:-right-4 px-3 py-1.5 rounded-lg bg-[#0f1422] border border-emerald-500/40 text-emerald-400 font-mono text-xs shadow-lg flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span>SPUNKY TO STADIUMFEST</span>
              </div>

              {/* Floating Charity Badge Bottom Right */}
              <div className="absolute -bottom-3 -left-3 sm:-left-4 px-3 py-1.5 rounded-lg bg-[#0f1422] border border-pink-500/40 text-pink-400 font-mono text-xs shadow-lg flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-pink-400 fill-pink-400" />
                <span>#ItsOkNotToBeOk</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
