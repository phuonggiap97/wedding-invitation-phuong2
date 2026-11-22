import React, { useState, useEffect } from 'react';
import { Heart, Calendar, ChevronDown, Sparkles, BellRing } from 'lucide-react';
import { WeddingData } from '../types';


interface HeroSectionProps {
  data: WeddingData;
  onOpenRsvp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onOpenRsvp }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(data.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.weddingDate]);

  // Format date for display (e.g. 28 . 11 . 2026)
  const weddingObj = new Date(data.weddingDate);
  const day = weddingObj.getDate().toString().padStart(2, '0');
  const month = (weddingObj.getMonth() + 1).toString().padStart(2, '0');
  const year = weddingObj.getFullYear();

  const handleScrollToNext = () => {
    const coupleSection = document.getElementById('couple');
    if (coupleSection) {
      coupleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Đám Cưới ${data.couple.groom.shortName} & ${data.couple.bride.shortName}`);
    const details = encodeURIComponent(data.invitationMessage);
    const location = encodeURIComponent(data.events[1]?.venueName || data.events[0]?.venueName || "GEM Center");
    
    // Format YYYYMMDDTHHmmssZ
    const startDate = new Date(data.weddingDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(new Date(data.weddingDate).getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden pt-20 pb-16"
    >
      {/* Background Image with elegant overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.heroImageUrl}
          alt="Wedding Couple"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60" />
        <div className="absolute inset-0 bg-[#2A1D15]/20 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center justify-center text-white space-y-6 sm:space-y-8 animate-fade-in">
        {/* Save The Date Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs sm:text-sm tracking-widest uppercase font-cormorant font-semibold text-[#F6EBDD] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C94C]" />
          <span>{data.subtitle} • {data.title}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F2C94C]" />
        </div>

        {/* Couple Names */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wide drop-shadow-md leading-tight">
            {data.couple.groom.shortName}
            <span className="inline-block mx-3 sm:mx-6 font-cormorant italic text-3xl sm:text-5xl md:text-6xl text-[#E8C5A5]">
              &
            </span>
            {data.couple.bride.shortName}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#F5EFEB]/90 font-cormorant italic max-w-xl mx-auto px-4 tracking-wider">
            "Chúng ta tìm thấy nhau giữa hàng triệu người, và chọn gắn kết cả cuộc đời."
          </p>
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-center gap-4 text-[#FBF7F2] font-cormorant text-xl sm:text-2xl md:text-3xl tracking-widest border-y border-white/30 py-3 px-8 backdrop-blur-sm bg-white/5">
          <span className="font-semibold">{day}</span>
          <span className="text-[#E8C5A5]">•</span>
          <span className="font-semibold">{month}</span>
          <span className="text-[#E8C5A5]">•</span>
          <span className="font-semibold">{year}</span>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-md sm:max-w-lg mt-2">
          <p className="text-xs uppercase tracking-widest text-[#E8C5A5] font-sans-clean font-medium mb-3">
            {timeLeft.isPast ? "Hôn lễ đã diễn ra ngập tràn hạnh phúc" : "Đếm ngược đến thời khắc thiêng liêng"}
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/20 shadow-xl">
              <span className="block text-2xl sm:text-4xl font-serif font-bold text-white">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#D8C7B8] font-sans-clean">
                Ngày
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/20 shadow-xl">
              <span className="block text-2xl sm:text-4xl font-serif font-bold text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#D8C7B8] font-sans-clean">
                Giờ
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/20 shadow-xl">
              <span className="block text-2xl sm:text-4xl font-serif font-bold text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#D8C7B8] font-sans-clean">
                Phút
              </span>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/20 shadow-xl">
              <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#F2C94C]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#D8C7B8] font-sans-clean">
                Giây
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            id="hero-rsvp-btn"
            onClick={onOpenRsvp}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#A37B50] hover:from-[#B58A5C] hover:to-[#916B40] text-white text-sm sm:text-base font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-[#E8C5A5]/40"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Xác Nhận Tham Dự</span>
          </button>

          <button
            id="hero-calendar-btn"
            onClick={handleAddToCalendar}
            className="px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm sm:text-base font-medium transition-all flex items-center gap-2 cursor-pointer border border-white/40 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span>Thêm Vào Lịch</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollToNext}
          className="pt-4 flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer group"
          aria-label="Cuộn xuống"
        >
          <span className="text-xs font-cormorant tracking-widest mb-1 text-[#E8C5A5]">Khám phá thiệp cưới</span>
          <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-white" />
        </button>
      </div>
    </section>
  );
};
