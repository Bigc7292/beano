import React, { useState } from 'react';
import { Mail, Check, Copy, Sliders, Calendar, Music, MapPin, Send } from 'lucide-react';
import { DJ_PROFILE } from '../data/djData';

export const BookingRider: React.FC = () => {
  const [promoterName, setPromoterName] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [setDuration, setSetDuration] = useState('60 Min Headline');
  const [selectedGenre, setSelectedGenre] = useState('UK Hardcore (170-175 BPM)');
  const [soundSystem, setSoundSystem] = useState('Funktion-One / High-Output Club Rig');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const riderText = `=== DJ BEANO (LUKE WATKINS) TECHNICAL & HOSPITALITY RIDER ===
Artist: DJ Beano (Luke Watkins) - Hereford, UK
Genres: ${selectedGenre}
Set Length: ${setDuration}
Sound System: ${soundSystem}

TECHNICAL REQUIREMENTS:
- 2x Pioneer CDJ-2000NXS2 or CDJ-3000 (Linked via Ethernet LAN Switch)
- 1x Pioneer DJM-900NXS2 or DJM-A9 Mixer
- 2x Active Booth Monitors (Independently controllable from booth output)
- 1x Shure SM58 or equivalent wireless microphone for host MC
- Stable USB Rekordbox connectivity

HOSPITALITY / BOOTH:
- Dedicated safe area for record bag / USB wallet
- Mineral water & soft drinks in DJ booth
- Safe venue parking / artist liaison contact

CONTACT & BOOKINGS:
Direct: djbeano90@gmail.com
Label & Management: tios@ravemail.com
SoundCloud: https://soundcloud.com/beanodj`;

  const handleCopyRider = () => {
    navigator.clipboard.writeText(riderText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking Inquiry: ${eventTitle || 'Hardcore Event'} - DJ Beano`);
    const body = encodeURIComponent(
      `Hello Luke / DJ Beano Management,\n\n` +
      `We would love to book DJ Beano for our upcoming event:\n\n` +
      `Promoter / Organization: ${promoterName || 'N/A'}\n` +
      `Event Title: ${eventTitle || 'N/A'}\n` +
      `Date: ${eventDate || 'N/A'}\n` +
      `Venue & City: ${venueLocation || 'N/A'}\n` +
      `Set Duration: ${setDuration}\n` +
      `Preferred Style: ${selectedGenre}\n` +
      `Sound System: ${soundSystem}\n` +
      `Contact Email: ${contactEmail || 'N/A'}\n\n` +
      `Please let us know availability and fee schedule.\n\n` +
      `Best regards,\n${promoterName || 'Event Promoter'}`
    );

    window.location.href = `mailto:djbeano90@gmail.com?cc=tios@ravemail.com&subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="bookings" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#07090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Promoter Enquiries & Technical Rider</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Book DJ Beano For Your Next Rave
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Available for Club Nights, Festival Arenas, B2B Special Sets, and Charity Events across the UK, Wales, and international destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Booking Calculator Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0c1220] p-6 sm:p-8 shadow-xl">
            <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-emerald-400" />
              Event Information & Dispatch
            </h3>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    PROMOTER / AGENCY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={promoterName}
                    onChange={(e) => setPromoterName(e.target.value)}
                    placeholder="e.g. Rave Anywhere / The Rave Alliance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    CONTACT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="promoter@raveevent.co.uk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    EVENT / NIGHT TITLE
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Hardcore Technology 11"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    VENUE & CITY / TOWN
                  </label>
                  <input
                    type="text"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    placeholder="e.g. Babylon Lounge, Hereford"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    TARGET DATE
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. Friday 24th Oct"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    SET DURATION
                  </label>
                  <select
                    value={setDuration}
                    onChange={(e) => setSetDuration(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="60 Min Headline">60 Min Headline</option>
                    <option value="75 Min Extended">75 Min Extended</option>
                    <option value="90 Min B2B Special">90 Min B2B Special</option>
                    <option value="2-Hour Marathon">2-Hour Marathon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    GENRE FOCUS
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="UK Hardcore (170-175 BPM)">UK Hardcore (170-175)</option>
                    <option value="160 BPM Bounce">160 BPM Bounce</option>
                    <option value="Happy Hardcore Classics">Classics Anthems</option>
                    <option value="Powerstomp & Gabber">Powerstomp</option>
                    <option value="Multi-Genre Rave">Multi-Genre Set</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  SOUND SYSTEM AT VENUE
                </label>
                <select
                  value={soundSystem}
                  onChange={(e) => setSoundSystem(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Funktion-One / High-Output Club Rig">Funktion-One / High-Output Club Rig</option>
                  <option value="Void Acoustics">Void Acoustics</option>
                  <option value="d&b Audiotechnik / Festival Line Array">d&b Audiotechnik / Festival Line Array</option>
                  <option value="Standard In-House Club System">Standard In-House Club System</option>
                </select>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-bold text-sm transition-all active:scale-95 shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>DISPATCH INQUIRY (EMAIL)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyRider}
                  className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono transition-colors"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{isCopied ? 'RIDER COPIED!' : 'COPY TECH RIDER'}</span>
                </button>
              </div>

              {isSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  ✓ Email client opened! Email directly dispatched to djbeano90@gmail.com and tios@ravemail.com.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Verified Technical Spec & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contacts Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 space-y-4">
              <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Direct Artist & Management Details
              </h4>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Direct Email:</span>
                  <a href="mailto:djbeano90@gmail.com" className="text-emerald-400 hover:underline font-bold">
                    djbeano90@gmail.com
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Agency / Label:</span>
                  <a href="mailto:tios@ravemail.com" className="text-cyan-400 hover:underline font-bold">
                    tios@ravemail.com
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Hometown:</span>
                  <span className="text-slate-200">Hereford, Herefordshire, UK</span>
                </div>
              </div>
            </div>

            {/* Stage Tech Rider Box */}
            <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-cyan-400" />
                  Standard Booth Rider
                </h4>
                <span className="text-[11px] font-mono text-emerald-400">VERIFIED SPEC</span>
              </div>

              <ul className="text-xs space-y-2 text-slate-300 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>2x Pioneer CDJ-2000NXS2 or CDJ-3000 linked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>1x Pioneer DJM-900NXS2 or DJM-A9 Mixer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>2x High-Output Active Booth Monitors (Independent level)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>1x Shure SM58 Wireless Microphone for MC</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
