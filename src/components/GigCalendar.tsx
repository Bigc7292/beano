import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Ticket, Check, ShieldCheck, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { UPCOMING_CALENDAR_GIGS, CalendarGig } from '../data/calendarData';
import confetti from 'canvas-confetti';

export const GigCalendar: React.FC = () => {
  // Current month state (October 2026 = year 2026, month 9 in 0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = October
  const [selectedGig, setSelectedGig] = useState<CalendarGig | null>(null);
  const [rsvpList, setRsvpList] = useState<string[]>(() => {
    const saved = localStorage.getItem('beano_rsvps');
    return saved ? JSON.parse(saved) : [];
  });
  const [ticketCheckoutGig, setTicketCheckoutGig] = useState<CalendarGig | null>(null);
  const [ticketCount, setTicketCount] = useState(2);
  const [selectedTier, setSelectedTier] = useState('standard');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calendar Math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  // Days array
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDayIndex }, (_, i) => i);

  // Find gigs for current month
  const getGigsForDay = (day: number): CalendarGig[] => {
    const monthPadded = String(currentMonth + 1).padStart(2, '0');
    const dayPadded = String(day).padStart(2, '0');
    const matchStr = `${currentYear}-${monthPadded}-${dayPadded}`;
    return UPCOMING_CALENDAR_GIGS.filter(g => g.dateStr === matchStr);
  };

  const handleToggleRsvp = (gig: CalendarGig) => {
    const isAlreadyRsvpd = rsvpList.includes(gig.id);
    let updated: string[];
    if (isAlreadyRsvpd) {
      updated = rsvpList.filter(id => id !== gig.id);
    } else {
      updated = [...rsvpList, gig.id];
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#facc15']
      });
    }
    setRsvpList(updated);
    localStorage.setItem('beano_rsvps', JSON.stringify(updated));
  };

  const handleCompleteTicketPurchase = () => {
    setBookingConfirmed(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#facc15', '#ec4899']
    });
    setTimeout(() => {
      setBookingConfirmed(false);
      setTicketCheckoutGig(null);
    }, 3500);
  };

  return (
    <section id="calendar" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#090d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Interactive Gig Calendar</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Tour Dates & Club Bookings</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Live Dates & Event Calendar
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Check out DJ Beano's upcoming tour dates. Click any highlighted date to inspect set times, sound systems, lineup info, and RSVP or grab tickets.
            </p>
          </div>

          {/* Month Navigation Controls */}
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-1 rounded-xl">
            <button
              onClick={handlePrevMonth}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-display text-sm font-bold text-white px-3 min-w-[130px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-4 sm:p-6 shadow-xl mb-8">
          
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-mono font-bold text-slate-400 border-b border-white/5 pb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div className="text-emerald-400">FRI</div>
            <div className="text-cyan-400">SAT</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Blank leading days */}
            {blankDays.map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[72px] sm:min-h-[96px] rounded-lg bg-black/20 p-1 opacity-25"></div>
            ))}

            {/* Days in Month */}
            {daysArray.map((day) => {
              const gigs = getGigsForDay(day);
              const hasGigs = gigs.length > 0;
              const isWeekend = (firstDayIndex + day - 1) % 7 === 5 || (firstDayIndex + day - 1) % 7 === 6;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => hasGigs && setSelectedGig(gigs[0])}
                  className={`min-h-[72px] sm:min-h-[96px] rounded-lg p-2 flex flex-col justify-between border transition-all ${
                    hasGigs
                      ? 'cursor-pointer bg-[#101b33] border-emerald-500/40 hover:border-emerald-400 hover:bg-[#142342] shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : isWeekend
                      ? 'bg-black/30 border-white/5 hover:border-white/10'
                      : 'bg-black/15 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-semibold ${
                      hasGigs ? 'text-emerald-400 font-bold' : 'text-slate-400'
                    }`}>
                      {day}
                    </span>
                    {hasGigs && (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                  </div>

                  {hasGigs ? (
                    <div className="space-y-1 mt-1">
                      {gigs.map((g) => (
                        <div
                          key={g.id}
                          className="text-[10px] sm:text-[11px] font-display font-bold text-white bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 truncate"
                        >
                          {g.title}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-700">Open Date</span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Featured Upcoming Events List for Quick Scanning */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
            <span>UPCOMING SCHEDULED RAVES & CLUB DATES</span>
            <span className="text-emerald-400 font-bold">CLICK EVENT FOR FULL BRIEF</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_CALENDAR_GIGS.slice(0, 4).map((gig) => {
              const isRsvpd = rsvpList.includes(gig.id);
              return (
                <div
                  key={gig.id}
                  className="rounded-xl border border-white/10 bg-[#0c1220] hover:border-emerald-500/30 p-4 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                        <CalendarIcon className="h-3 w-3" />
                        {gig.displayDate}
                      </span>
                      <span className="text-[11px] font-mono text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                        Set: {gig.setTime}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-white mb-1">
                      {gig.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono mb-2">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{gig.venue} · {gig.city}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {gig.description}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                    <button
                      onClick={() => handleToggleRsvp(gig)}
                      className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-semibold ${
                        isRsvpd
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-emerald-500/40'
                      }`}
                    >
                      {isRsvpd ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Users className="h-3.5 w-3.5" />}
                      <span>{isRsvpd ? 'RSVP Confirmed' : `RSVP (${gig.attendeesCount + (isRsvpd ? 1 : 0)})`}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedGig(gig)}
                        className="text-slate-400 hover:text-white underline text-[11px]"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => setTicketCheckoutGig(gig)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                      >
                        <Ticket className="h-3.5 w-3.5" />
                        <span>Get Tickets</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal: Full Event Details */}
        {selectedGig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#0d1322] p-6 sm:p-8 shadow-2xl space-y-5">
              
              <button
                onClick={() => setSelectedGig(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span>{selectedGig.displayDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedGig.type}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedGig.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedGig.venue} ({selectedGig.city})</span>
                </div>
              </div>

              {/* Schedule grid */}
              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-center">
                <div>
                  <div className="text-slate-500">DOORS</div>
                  <div className="text-white font-bold">{selectedGig.doorTime}</div>
                </div>
                <div>
                  <div className="text-emerald-400">BEANO SET</div>
                  <div className="text-emerald-300 font-bold">{selectedGig.setTime}</div>
                </div>
                <div>
                  <div className="text-slate-500">CURFEW</div>
                  <div className="text-white font-bold">{selectedGig.curfew}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <p>{selectedGig.description}</p>
                <div className="text-xs font-mono text-slate-400">
                  <strong className="text-slate-200">Sound Spec:</strong> {selectedGig.soundSystem}
                </div>
              </div>

              {/* Lineup */}
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2 font-semibold">STAGE LINEUP:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGig.lineup.map((act, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 border border-white/10 text-xs font-mono text-slate-200">
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleRsvp(selectedGig)}
                  className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                    rsvpList.includes(selectedGig.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-emerald-500/40'
                  }`}
                >
                  {rsvpList.includes(selectedGig.id) ? <Check className="h-4 w-4 text-emerald-400" /> : <Users className="h-4 w-4" />}
                  <span>{rsvpList.includes(selectedGig.id) ? 'Guestlist Confirmed' : 'RSVP to Event'}</span>
                </button>

                <button
                  onClick={() => {
                    const g = selectedGig;
                    setSelectedGig(null);
                    setTicketCheckoutGig(g);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  <Ticket className="h-4 w-4" />
                  <span>GET TICKETS ({selectedGig.ticketPrice})</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Modal: Interactive Ticket Checkout */}
        {ticketCheckoutGig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#0d1322] p-6 sm:p-8 shadow-2xl space-y-5">
              
              <button
                onClick={() => setTicketCheckoutGig(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Ticket className="h-4 w-4" />
                <span>OFFICIAL TICKET PORTAL</span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {ticketCheckoutGig.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {ticketCheckoutGig.venue} · {ticketCheckoutGig.displayDate}
                </div>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 font-semibold">SELECT TICKET TIER:</div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => setSelectedTier('early')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-mono transition-all ${
                      selectedTier === 'early' ? 'bg-emerald-500/15 border-emerald-400 text-white' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200">Early Raver Tier</div>
                      <div className="text-[11px] text-slate-500">Includes free soundboard lanyard pass</div>
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">£8.00</div>
                  </div>

                  <div
                    onClick={() => setSelectedTier('standard')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-mono transition-all ${
                      selectedTier === 'standard' ? 'bg-emerald-500/15 border-emerald-400 text-white' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200">Standard Rave Admission</div>
                      <div className="text-[11px] text-slate-500">General admission to all arenas</div>
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">£10.00</div>
                  </div>

                  <div
                    onClick={() => setSelectedTier('vip')}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-mono transition-all ${
                      selectedTier === 'vip' ? 'bg-emerald-500/15 border-emerald-400 text-white' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200">VIP Sound Intentionz Pass</div>
                      <div className="text-[11px] text-slate-500">DJ Booth access & complimentary drink</div>
                    </div>
                    <div className="font-bold text-emerald-400 text-sm">£15.00</div>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <span className="text-slate-300">Ticket Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="h-7 w-7 rounded bg-slate-800 text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-white text-sm">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                    className="h-7 w-7 rounded bg-slate-800 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-2 flex items-center justify-between font-mono">
                <span className="text-xs text-slate-400">Total Price:</span>
                <span className="text-xl font-bold text-emerald-400">
                  £{(ticketCount * (selectedTier === 'early' ? 8 : selectedTier === 'standard' ? 10 : 15)).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCompleteTicketPurchase}
                className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-extrabold text-xs tracking-wider transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>CONFIRM TICKET RESERVATION</span>
              </button>

              {bookingConfirmed && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-bounce">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Success! Your tickets have been reserved and sent to your email. See you on the dancefloor!</span>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
