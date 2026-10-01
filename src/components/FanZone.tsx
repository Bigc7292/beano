import React, { useState } from 'react';
import { MessageSquare, Heart, Music2, ShieldAlert, Send, CheckCircle2, Sparkles, Filter, ThumbsUp, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FanMessage {
  id: string;
  author: string;
  location: string;
  type: 'feedback' | 'song_request';
  songDetails?: string;
  message: string;
  date: string;
  likes: number;
  isApproved: boolean;
  isUserSubmission?: boolean;
}

const INITIAL_MESSAGES: FanMessage[] = [
  {
    id: "msg-1",
    author: "Hypo-Tinx DJ",
    location: "Hereford, UK",
    type: "feedback",
    message: "What a set at Babylon Lounge bro! The vibes were high all night and that b2b went off! Let's get the Hereford massive together again soon!",
    date: "13 Dec 2025",
    likes: 24,
    isApproved: true
  },
  {
    id: "msg-2",
    author: "Joe Fox",
    location: "Newport, Wales",
    type: "song_request",
    songDetails: "Re-Con - Power of Love (Hardcore Edit)",
    message: "U deserve to play out at all these big events Beano, your sets are sick brother! Please drop Power of Love at the next Newport Atlantica night!",
    date: "28 Nov 2025",
    likes: 18,
    isApproved: true
  },
  {
    id: "msg-3",
    author: "Ben BenAddikt",
    location: "Midlands, UK",
    type: "feedback",
    message: "Killing it G! Pure energy every time you step up to the CDJs. Massive respect for always championing Charley's Beats and mental health awareness.",
    date: "14 Nov 2025",
    likes: 31,
    isApproved: true
  },
  {
    id: "msg-4",
    author: "Sadie Putson",
    location: "Leeds, UK",
    type: "song_request",
    songDetails: "Force & Styles - Heart of Gold (Classic VIP)",
    message: "Watching your journey from the early days to main stages has been legendary. True hardcore icon! Need that classic Heart of Gold drop at NYE!",
    date: "02 Nov 2025",
    likes: 19,
    isApproved: true
  },
  {
    id: "msg-5",
    author: "Rose Beardmore",
    location: "Hereford, UK",
    type: "feedback",
    message: "Miss the old Spunky days so much! Seeing you keep the local Hereford hardcore scene alive with The Rave Alliance means the world to the original crew.",
    date: "18 Oct 2025",
    likes: 15,
    isApproved: true
  },
  {
    id: "msg-6",
    author: "Dan Derrick",
    location: "Bristol, UK",
    type: "feedback",
    message: "The Sean Day memorial set still gives me goosebumps. Community pulling together like that is what UK rave culture is truly about. Big love Beano!",
    date: "04 Oct 2025",
    likes: 42,
    isApproved: true
  }
];

export const FanZone: React.FC = () => {
  const [messages, setMessages] = useState<FanMessage[]>(() => {
    const saved = localStorage.getItem('beano_fan_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'feedback' | 'song_request'>('all');
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [messageType, setMessageType] = useState<'feedback' | 'song_request'>('feedback');
  const [songDetails, setSongDetails] = useState('');
  const [commentText, setCommentText] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newMessage: FanMessage = {
      id: `user-${Date.now()}`,
      author: authorName.trim(),
      location: location.trim() || 'UK Raver',
      type: messageType,
      songDetails: messageType === 'song_request' ? songDetails.trim() : undefined,
      message: commentText.trim(),
      date: 'Just now',
      likes: 1,
      isApproved: true, // Visible locally with notice
      isUserSubmission: true
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('beano_fan_messages', JSON.stringify(updated));

    // Confetti celebration
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#ec4899']
    });

    setAuthorName('');
    setLocation('');
    setSongDetails('');
    setCommentText('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
  };

  const handleLike = (id: string) => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('beano_fan_messages', JSON.stringify(updated));
  };

  const filtered = messages.filter((m) => {
    if (activeFilter === 'feedback') return m.type === 'feedback';
    if (activeFilter === 'song_request') return m.type === 'song_request';
    return true;
  });

  return (
    <section id="fanzone" className="py-16 lg:py-24 border-b border-white/10 relative bg-[#090d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400 mb-2">
              <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
              <span>Community & Rave Family</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Hereford & Beyond</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              DJ Beano Fan Zone & Track Requests
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Leave positive feedback for Luke, send shoutouts to your rave crew, or request anthems for the next Sound Intentionz or TRA session.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeFilter === 'all' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Posts ({messages.length})
            </button>
            <button
              onClick={() => setActiveFilter('feedback')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeFilter === 'feedback' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Shoutouts
            </button>
            <button
              onClick={() => setActiveFilter('song_request')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeFilter === 'song_request' ? 'bg-white text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Track Requests
            </button>
          </div>
        </div>

        {/* Mandatory Moderation Disclaimer Notice */}
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-sm">
          <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
            <strong className="font-semibold text-amber-300">Moderation Disclaimer:</strong> All fan feedback, shoutouts, and song requests are reviewed and moderated by DJ Beano's management team prior to permanent public archival. We maintain a zero-tolerance policy for harassment, hate speech, or spam to keep the rave environment welcoming and positive for everyone.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submission Form Column */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0c1220] p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <h3 className="font-display text-lg font-bold text-white">Post to the Fan Board</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  YOUR NAME / RAVE ALIAS *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Liam / RaveGirl_99"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  HOMETOWN / VENUE CREW
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hereford / Newport / Leeds"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Message Type Toggle */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  SUBMISSION TYPE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMessageType('feedback')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                      messageType === 'feedback'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <Heart className="h-3 w-3" />
                    Positive Shoutout
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessageType('song_request')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                      messageType === 'song_request'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <Music2 className="h-3 w-3" />
                    Song Request
                  </button>
                </div>
              </div>

              {/* Song details input (if song request) */}
              {messageType === 'song_request' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                    REQUESTED TRACK TITLE & ARTIST *
                  </label>
                  <input
                    type="text"
                    required={messageType === 'song_request'}
                    value={songDetails}
                    onChange={(e) => setSongDetails(e.target.value)}
                    placeholder="e.g. Dougal & Gammer - Shoulder Lock"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  MESSAGE / DEDICATION *
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={
                    messageType === 'song_request'
                      ? "Tell Beano why this track needs to be dropped or who it's dedicated to..."
                      : "Drop some love, feedback on a past set, or love for the Hereford rave family..."
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-display font-bold text-xs tracking-wider transition-all active:scale-95 shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                <span>SUBMIT FOR MODERATION</span>
              </button>

              {justSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Your message was received and added to the board queue! Thank you for supporting DJ Beano.</span>
                </div>
              )}
            </form>
          </div>

          {/* Messages Feed Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pb-1">
              <span>SHOWING {filtered.length} COMMUNITY POSTS</span>
              <span className="text-emerald-400">STATUS: MODERATED & ACTIVE</span>
            </div>

            <div className="space-y-3.5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition-all duration-200 ${
                    item.isUserSubmission
                      ? 'bg-[#0f172a] border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'bg-[#0b101c] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-white">
                          {item.author}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          ({item.location})
                        </span>
                        {item.isUserSubmission && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Your Post
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {item.date} · {item.type === 'song_request' ? 'Track Request' : 'Feedback'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors"
                      title="Cheer this message"
                    >
                      <ThumbsUp className="h-3 w-3 text-emerald-400" />
                      <span>{item.likes}</span>
                    </button>
                  </div>

                  {item.songDetails && (
                    <div className="mb-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                      <Music2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-semibold">Requested:</span> {item.songDetails}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
