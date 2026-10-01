import React from 'react';
import { ArrowUp, Radio } from 'lucide-react';
import { DJ_PROFILE } from '../data/djData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#05070b] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-extrabold text-white tracking-tight">
                DJ BEANO
              </span>
              <span className="text-xs font-mono text-emerald-400">/ LUKE WATKINS</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              UK Hardcore, Happy Hardcore & Powerstomp DJ & Producer based in Hereford, UK. Founder of Sound Intentionz and resident artist at The Rave Alliance.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Hereford · Wales & West Midlands · Global Rave Stages
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2">Navigation</div>
            <div><a href="#mixes" className="hover:text-emerald-400 transition-colors">Mix Station</a></div>
            <div><a href="#deck" className="hover:text-emerald-400 transition-colors">Virtual Deck & MPC</a></div>
            <div><a href="#calendar" className="hover:text-emerald-400 transition-colors">Interactive Gig Calendar</a></div>
            <div><a href="#gallery" className="hover:text-emerald-400 transition-colors">Photo & Video Gallery</a></div>
            <div><a href="#fanzone" className="hover:text-pink-400 transition-colors">Fan Zone & Track Requests</a></div>
            <div><a href="#gigs" className="hover:text-emerald-400 transition-colors">Rave Radar Archive</a></div>
            <div><a href="#releases" className="hover:text-emerald-400 transition-colors">Releases & Discography</a></div>
            <div><a href="#charity" className="hover:text-emerald-400 transition-colors">Charley's Beats (#ItsOkNotToBeOk)</a></div>
            <div><a href="#bookings" className="hover:text-emerald-400 transition-colors">Promoter Bookings</a></div>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-4 space-y-2 text-xs font-mono">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2">Connect & Stream</div>
            <div>
              <a
                href={DJ_PROFILE.socials.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>SoundCloud (Official Mixes)</span>
                <span>soundcloud.com/beanodj →</span>
              </a>
            </div>
            <div>
              <a
                href={DJ_PROFILE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Facebook Official Page</span>
                <span>facebook.com/beanodj →</span>
              </a>
            </div>
            <div>
              <a
                href={DJ_PROFILE.socials.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Twitch Live Broadcasts</span>
                <span>twitch.tv/beano_dj →</span>
              </a>
            </div>
            <div>
              <a
                href="mailto:djbeano90@gmail.com"
                className="hover:text-emerald-400 transition-colors flex items-center justify-between py-1"
              >
                <span>Direct Inquiries</span>
                <span>djbeano90@gmail.com →</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} DJ Beano (Luke Watkins). All rights reserved. Built for the UK Hardcore Scene.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
