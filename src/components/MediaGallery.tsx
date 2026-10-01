import React, { useState } from 'react';
import { Play, Camera, Video, ExternalLink, X, Maximize2, Sparkles, MapPin, Calendar, Clock, Eye } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { soundEngine } from '../utils/audioEngine';

export const MediaGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'photo') return item.type === 'photo';
    if (activeFilter === 'video') return item.type === 'video';
    return true;
  });

  const handleOpenItem = (item: GalleryItem) => {
    setSelectedItem(item);
    if (item.type === 'video') {
      soundEngine.playLaserSweep();
    }
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#07090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Visual Vault & Performance Archive</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Live Stage Moments</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Photo & Video Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Authentic snapshots and video footage capturing DJ Beano live in the mix across UK warehouse raves, stadium festival stages, and late-night studio sessions.
            </p>
          </div>

          {/* Gallery Filters */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeFilter === 'all' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Media ({GALLERY_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveFilter('photo')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeFilter === 'photo' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="h-3 w-3" />
              Photos ({GALLERY_ITEMS.filter(i => i.type === 'photo').length})
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeFilter === 'video' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="h-3 w-3" />
              Videos ({GALLERY_ITEMS.filter(i => i.type === 'video').length})
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="group cursor-pointer rounded-xl border border-white/10 bg-[#0b101c] hover:border-emerald-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Type Badge & Duration */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase backdrop-blur-md border ${
                    item.type === 'video'
                      ? 'bg-pink-500/80 text-white border-pink-400/40'
                      : 'bg-black/70 text-emerald-400 border-white/10'
                  }`}>
                    {item.type}
                  </span>
                  {item.duration && (
                    <span className="px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-slate-300 backdrop-blur-md">
                      {item.duration}
                    </span>
                  )}
                </div>

                {item.bpm && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-cyan-400 font-bold backdrop-blur-md">
                    {item.bpm} BPM
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95">
                    {item.type === 'video' ? <Play className="h-5 w-5 fill-black ml-0.5" /> : <Maximize2 className="h-5 w-5 text-black" />}
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-mono font-semibold">{item.category}</span>
                  <span className="font-mono text-slate-500">{item.date}</span>
                </div>

                <h3 className="font-display text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>{item.venue} · {item.location}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                {item.highlight && (
                  <div className="pt-2 text-[11px] font-mono text-pink-400 border-t border-white/5 flex items-center justify-between">
                    <span>★ {item.highlight}</span>
                    {item.views && <span className="text-slate-500">{item.views}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Media Lightbox / Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-3xl rounded-2xl border border-white/20 bg-[#0d1322] p-6 shadow-2xl overflow-hidden space-y-5">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Media Display Area */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                <img
                  src={selectedItem.thumbnailUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {selectedItem.type === 'video' && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] mb-3 animate-pulse">
                      <Play className="h-7 w-7 fill-black ml-1" />
                    </div>
                    <div className="font-display text-lg font-bold text-white mb-1">
                      {selectedItem.title}
                    </div>
                    <p className="text-xs text-slate-300 max-w-md mb-3 font-sans">
                      Performance clip recorded live at {selectedItem.venue}. View the high-definition original footage on DJ Beano's video archive:
                    </p>
                    <a
                      href={selectedItem.mediaUrl || "https://www.facebook.com/beanodj"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      <span>Watch Full Live Clip</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Details Meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span>{selectedItem.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedItem.category}</span>
                  {selectedItem.bpm && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">{selectedItem.bpm} BPM</span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedItem.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{selectedItem.venue} ({selectedItem.location})</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
                  {selectedItem.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Official DJ Beano Media Archive</span>
                <a
                  href="https://www.facebook.com/beanodj/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>More Videos on Facebook</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
