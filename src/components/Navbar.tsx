import React, { useState, useEffect } from 'react';
import { Heart, Music, VolumeX, SlidersHorizontal, Menu, X, Calendar, MapPin, Image, Gift, MessageSquareHeart } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface NavbarProps {
  groomName: string;
  brideName: string;
  onOpenCustomizer: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  groomName,
  brideName,
  onOpenCustomizer,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cặp Đôi', href: '#couple', icon: Heart },
    { name: 'Chuyện Tình', href: '#story', icon: Heart },
    { name: 'Sự Kiện', href: '#events', icon: Calendar },
    { name: 'Album Ảnh', href: '#gallery', icon: Image },
    { name: 'Dress Code', href: '#dresscode', icon: MapPin },
    { name: 'Mừng Cưới', href: '#gift', icon: Gift },
    { name: 'Xác Nhận (RSVP)', href: '#rsvp', icon: Calendar },
    { name: 'Sổ Lưu Bút', href: '#wishes', icon: MessageSquareHeart },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="wedding-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm border-b border-[#E8DDCF] py-3'
            : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent text-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Couple monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group cursor-pointer"
            id="nav-brand-logo"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              scrolled ? 'border-[#C4A48A] text-[#8C6D58] bg-[#F4EDE4]' : 'border-white/80 text-white bg-white/10 backdrop-blur-sm'
            }`}>
              <Heart className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
            </div>
            <span className={`font-script text-2xl sm:text-3xl tracking-wide ${
              scrolled ? 'text-[#3E3228]' : 'text-white drop-shadow-sm'
            }`}>
              {groomName} & {brideName}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors py-1 relative group ${
                  scrolled
                    ? 'text-[#5C4D41] hover:text-[#B8860B]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-[#B8860B]' : 'bg-white'
                }`} />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Music Toggle */}
            <button
              id="nav-music-toggle-btn"
              onClick={onToggleAudio}
              title={isAudioPlaying ? "Tắt nhạc nền" : "Bật nhạc nền lãng mạn"}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                isAudioPlaying
                  ? scrolled
                    ? 'bg-[#EBD8C5] text-[#6E4B30] border border-[#D5BEA6] animate-pulse'
                    : 'bg-white/30 text-white backdrop-blur-sm border border-white/50 animate-pulse'
                  : scrolled
                    ? 'bg-[#F2ECE4] text-[#7A6A5E] hover:bg-[#E8DDD0]'
                    : 'bg-black/30 text-white/80 hover:bg-black/50 backdrop-blur-sm'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Music className="w-3.5 h-3.5 text-rose-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="hidden sm:inline font-sans-clean">Nhạc đang phát</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-sans-clean">Bật nhạc</span>
                </>
              )}
            </button>

            {/* Customizer / Settings button */}
            <button
              id="nav-customizer-btn"
              onClick={onOpenCustomizer}
              title="Tùy chỉnh thông tin thiệp cưới"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-sans-clean flex items-center gap-1.5 transition-all ${
                scrolled
                  ? 'bg-[#3E3228] text-[#FAF8F5] hover:bg-[#5C4D41]'
                  : 'bg-white text-[#3E3228] hover:bg-[#F2ECE4] shadow-md'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chỉnh sửa thiệp</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-[#3E3228] hover:bg-[#EBD8C5]/50' : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDCF]">
                <div>
                  <h3 className="font-script text-2xl text-[#3E3228]">
                    {groomName} & {brideName}
                  </h3>
                  <p className="text-xs text-[#8C7665] font-cormorant italic">Thiệp Cưới Trực Tuyến</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#6E5A4C] hover:bg-[#EBD8C5] rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#4A3B30] hover:bg-[#EFE5DA] transition-colors text-sm font-medium"
                    >
                      <Icon className="w-4 h-4 text-[#A67C52]" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DDCF] flex flex-col gap-3">
              <button
                onClick={() => {
                  onToggleAudio();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#EFE5DA] text-[#4A3B30] text-sm flex items-center justify-center gap-2 font-medium"
              >
                <Music className="w-4 h-4 text-rose-600" />
                <span>{isAudioPlaying ? 'Đang phát nhạc nền' : 'Bật nhạc nền'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#3E3228] text-white text-sm flex items-center justify-center gap-2 font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Chỉnh sửa thông tin thiệp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
