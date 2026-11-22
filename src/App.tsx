/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/defaultWeddingData';
import { WeddingData } from './types';
import { weddingAudio } from './utils/audio';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { StorySection } from './components/StorySection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { RsvpSection } from './components/RsvpSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { CustomizerModal } from './components/CustomizerModal';
import { PetalsEffect } from './components/PetalsEffect';

export default function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('custom_wedding_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialWeddingData;
      }
    }
    return initialWeddingData;
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  useEffect(() => {
    weddingAudio.setListener((playing) => {
      setIsAudioPlaying(playing);
    });
  }, []);

  const handleToggleAudio = () => {
    weddingAudio.toggle();
  };

  const handleOpenRsvp = () => {
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveCustomData = (newData: WeddingData) => {
    setWeddingData(newData);
    try {
      localStorage.setItem('custom_wedding_data', JSON.stringify(newData));
    } catch {
      // If localStorage quota is exceeded due to many large embedded images, keep in memory
    }
  };

  const handleResetDefault = () => {
    localStorage.removeItem('custom_wedding_data');
    setWeddingData(initialWeddingData);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2725] relative font-sans-clean overflow-x-hidden selection:bg-[#E8D3C3] selection:text-[#3B2C24]">
      {/* Falling Flower Petals Canvas */}
      <PetalsEffect enabled={petalsEnabled} />

      {/* Top Floating Navigation Header */}
      <Navbar
        groomName={weddingData.couple.groom.shortName}
        brideName={weddingData.couple.bride.shortName}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      <main>
        {/* Hero Section & Countdown */}
        <HeroSection
          data={weddingData}
          onOpenRsvp={handleOpenRsvp}
        />

        {/* Groom & Bride Couple Profiles */}
        <CoupleSection
          couple={weddingData.couple}
          invitationMessage={weddingData.invitationMessage}
        />

        {/* Love Story Timeline */}
        <StorySection
          story={weddingData.story}
        />

        {/* Ceremony & Reception Events Schedule */}
        <EventsSection
          events={weddingData.events}
        />

        {/* Photo Gallery & Lightbox */}
        <GallerySection
          gallery={weddingData.gallery}
        />

        {/* Dress Code & Etiquette */}
        <DressCodeSection
          dressCode={weddingData.dressCode}
        />

        {/* Wedding Gift Box & VietQR */}
        <GiftBoxSection
          bankAccounts={weddingData.bankAccounts}
        />

        {/* RSVP Confirmation Form */}
        <RsvpSection />

        {/* Digital Guestbook & Wishes */}
        <WishesSection />
      </main>

      {/* Footer */}
      <Footer data={weddingData} />

      {/* Floating Bottom Music Player */}
      <MusicPlayer
        isPlaying={isAudioPlaying}
        onToggle={handleToggleAudio}
      />

      {/* Live Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={weddingData}
        onSave={handleSaveCustomData}
        onResetDefault={handleResetDefault}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
      />
    </div>
  );
}
