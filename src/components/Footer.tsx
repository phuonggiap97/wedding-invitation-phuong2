import React, { useState } from 'react';
import { Heart, ArrowUp, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';

interface FooterProps {
  data: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText(data.weddingHashtag);
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2500);
  };

  return (
    <footer id="wedding-footer" className="bg-[#241A14] text-white pt-20 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle top wave */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        {/* Monogram Icon */}
        <div className="w-14 h-14 rounded-full border border-[#E8C5A5]/40 mx-auto flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-xl">
          <Heart className="w-6 h-6 text-[#E8C5A5] fill-[#E8C5A5]" />
        </div>

        {/* Thank You Note */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E8C5A5] font-sans-clean font-semibold">
            Thank You For Being Part Of Our Journey
          </p>
          <h2 className="font-script text-4xl sm:text-6xl text-white">
            {data.couple.groom.shortName} & {data.couple.bride.shortName}
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3B5] font-cormorant italic max-w-lg mx-auto leading-relaxed">
            "Sự hiện diện, những lời chúc phúc và tình cảm yêu thương của quý vị là món quà vô giá nhất đối với chúng tôi."
          </p>
        </div>

        {/* Hashtag & Share Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopyHashtag}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-mono transition-all flex items-center gap-2"
            title="Sao chép hashtag"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2C94C]" />
            <span>{data.weddingHashtag}</span>
            {copiedHashtag ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white/60" />}
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm transition-all flex items-center gap-2"
            title="Sao chép liên kết trang thiệp cưới"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E8C5A5]" />
            <span>{copiedLink ? 'Đã sao chép link!' : 'Chia sẻ thiệp cưới'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/15 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8B7C]">
          <p>
            © {new Date().getFullYear()} {data.couple.groom.shortName} & {data.couple.bride.shortName} Wedding Invitation.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
