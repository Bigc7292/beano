import React from 'react';
import { Heart, Users, Radio, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { CHARITY_INITIATIVES } from '../data/djData';

export const CharitySection: React.FC = () => {
  return (
    <section id="charity" className="py-16 lg:py-24 border-b border-white/10 relative overflow-hidden bg-[#090d16]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-pink-500/10 blur-[140px] pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-[#120d1c] via-[#0d101a] to-[#0c1322] p-8 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400">
                <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400 animate-pulse" />
                <span>Raving For A Cause</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span>Mental Health Awareness</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {CHARITY_INITIATIVES.title}
              </h2>

              <p className="text-sm font-mono text-emerald-400 font-semibold tracking-wide">
                {CHARITY_INITIATIVES.motto}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {CHARITY_INITIATIVES.story}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-pink-400" />
                  MIND Mental Health Support
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Users className="h-4 w-4 text-emerald-400" />
                  Sean Day Memorial Fund
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Radio className="h-4 w-4 text-cyan-400" />
                  Charley's Army Broadcasts
                </span>
              </div>
            </div>

            {/* Right Metric Cards */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
              {CHARITY_INITIATIVES.stats.map((st, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-black/50 p-4 text-center backdrop-blur-sm"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-pink-400 tabular-nums">
                    {st.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-tight">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
