import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeanoDeck } from './components/BeanoDeck';
import { MixStation } from './components/MixStation';
import { GigCalendar } from './components/GigCalendar';
import { MediaGallery } from './components/MediaGallery';
import { FanZone } from './components/FanZone';
import { GigRadar } from './components/GigRadar';
import { ReleasesSection } from './components/ReleasesSection';
import { CharitySection } from './components/CharitySection';
import { BookingRider } from './components/BookingRider';
import { RaveLaserShow } from './components/RaveLaserShow';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/audioEngine';

export default function App() {
  const [raveMode, setRaveMode] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const toggleRaveMode = () => {
    setRaveMode((prev) => {
      const next = !prev;
      if (next) {
        soundEngine.playAirhorn();
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      soundEngine.setMasterVolume(next ? 0 : 0.75);
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#07090e] text-slate-100 relative ${raveMode ? 'overflow-x-hidden' : ''}`}>
      {/* Laser & Visual Strobe Overlay when Rave Mode is toggled */}
      <RaveLaserShow 
        active={raveMode} 
        onDeactivate={() => setRaveMode(false)} 
      />

      {/* Top Bar Navigation (3-Zone Contract) */}
      <Navbar
        raveMode={raveMode}
        onToggleRaveMode={toggleRaveMode}
        isAudioMuted={isAudioMuted}
        onToggleMute={toggleMute}
        onNavigateToBooking={() => scrollToSection('bookings')}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenDeck={() => scrollToSection('deck')}
          onOpenMixes={() => scrollToSection('mixes')}
          onBookNow={() => scrollToSection('bookings')}
        />

        {/* Interactive Virtual DJ Deck & 8-Pad Sampler */}
        <BeanoDeck />

        {/* Audio Mix Station */}
        <MixStation />

        {/* Interactive Gig Calendar with RSVP & Tickets */}
        <GigCalendar />

        {/* Photo and Video Gallery */}
        <MediaGallery />

        {/* Fan Zone Message Board & Track Requests */}
        <FanZone />

        {/* Tour & Rave Radar Archive */}
        <GigRadar />

        {/* Official Releases & Beatport Discography */}
        <ReleasesSection />

        {/* Charley's Beats & Mental Health Legacy */}
        <CharitySection />

        {/* Promoter Bookings & Technical Rider Generator */}
        <BookingRider />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
