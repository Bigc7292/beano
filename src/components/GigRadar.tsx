import React, { useState } from 'react';
import { MapPin, Calendar, Users, ExternalLink, Ticket, Radio, X, Sparkles } from 'lucide-react';
import { GIG_EVENTS, GigEvent } from '../data/djData';

export const GigRadar: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [activeModalGig, setActiveModalGig] = useState<GigEvent | null>(null);

  const filterOptions = ['All', 'Headline & B2B', 'Festival', 'Club Night', 'Charity Stream'];

  const filteredGigs = GIG_EVENTS.filter((gig) => {
    if (filterType === 'All') return true;
    return gig.type === filterType;
  });

  return (
    <section id="gigs" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#090d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Tour History & Rave Radar</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>From Hereford to Corfu</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Rave Radar: Appearances & Sets
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              From local Hereford territory (Babylon Lounge, The Kerry, The Plough) to international festivals in Kavos and legendary UK clubs like Beaver Works Leeds.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterType === opt
                    ? 'bg-emerald-400 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Gigs Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              onClick={() => setActiveModalGig(gig)}
              className="group cursor-pointer rounded-xl border border-white/10 bg-[#0c1220] hover:bg-[#101728] hover:border-emerald-500/40 p-5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Date & Type Row */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {gig.date}, {gig.year}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    {gig.type}
                  </span>
                </div>

                {/* Gig Title */}
                <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {gig.title}
                </h3>

                {/* Venue & Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>{gig.venue} · {gig.location}</span>
                </div>

                {/* Highlight banner if any */}
                {gig.highlight && (
                  <div className="mt-3 py-1 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                    ★ {gig.highlight}
                  </div>
                )}

                {/* Description snippet */}
                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2">
                  {gig.description}
                </p>
              </div>

              {/* Lineup Snippet & CTA */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 truncate max-w-[180px]">
                  {gig.lineup.slice(0, 2).join(', ')}...
                </span>
                <span className="text-emerald-400 group-hover:underline flex items-center gap-1 shrink-0 font-semibold">
                  Event Brief →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Gig Detail Overlay */}
        {activeModalGig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#0d1322] p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalGig(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span>{activeModalGig.date}, {activeModalGig.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalGig.type}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {activeModalGig.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-cyan-400 font-mono mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{activeModalGig.venue} ({activeModalGig.location})</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <p>{activeModalGig.description}</p>
                {activeModalGig.highlight && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                    Highlight: {activeModalGig.highlight}
                  </div>
                )}
              </div>

              {/* Lineup Roster */}
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5 font-semibold">
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                  FULL STAGE ROSTER:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalGig.lineup.map((act, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-800 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ticket / Status Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  ADMISSION: <strong className="text-white">{activeModalGig.ticketPrice || 'Standard Event'}</strong>
                </span>
                <a
                  href="https://www.facebook.com/beanodj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-semibold"
                >
                  <span>View on Facebook</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
