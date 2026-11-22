import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, Volume2, Heart, Disc3 } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const currentTrack = weddingAudio.getCurrentTrack();

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.nextTrack();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      {/* Floating Vinyl Disc Button */}
      <div className="relative group">
        <button
          id="floating-music-player-btn"
          onClick={() => {
            if (!expanded) {
              setExpanded(true);
            }
            onToggle();
          }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 ${
            isPlaying
              ? 'bg-[#2F2620] border-[#E8C5A5] text-[#E8C5A5] scale-105'
              : 'bg-white border-[#D9C8B9] text-[#7A6A5E] hover:scale-105'
          }`}
          title={isPlaying ? 'Tạm dừng nhạc cưới' : 'Phát nhạc cưới du dương'}
          aria-label="Music player"
        >
          <Disc3
            className={`w-6 h-6 sm:w-7 sm:h-7 ${
              isPlaying ? 'animate-spin text-[#E8C5A5]' : 'text-[#7A6A5E]'
            }`}
            style={{ animationDuration: '3s' }}
          />

          {/* Mini pulse ring */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#C4A48A] animate-ping pointer-events-none opacity-40" />
          )}
        </button>

        {/* Small Toggle widget dropdown when hovered or expanded */}
        <div
          className={`absolute bottom-16 left-0 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-[#EADBCC] min-w-[240px] transition-all duration-300 transform origin-bottom-left ${
            expanded
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F0E6DC]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3E3228]">
              <Music className="w-3.5 h-3.5 text-[#C4A48A]" />
              <span>Nhạc Lễ Cưới Du Dương</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="text-[10px] text-[#8C7665] hover:text-[#2F2620]"
            >
              ✕
            </button>
          </div>

          <div className="py-2">
            <p className="text-xs font-bold text-[#2F2620] truncate">
              {currentTrack.title}
            </p>
            <p className="text-[10px] text-[#8C7665] truncate font-cormorant italic">
              {currentTrack.composer}
            </p>
          </div>

          {/* Equalizer waves */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-1 py-1">
              <span className="w-1 h-3 bg-[#C4A48A] rounded-full animate-pulse" />
              <span className="w-1 h-5 bg-[#A67C52] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-2 bg-[#8C6D58] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="w-1 h-4 bg-[#C4A48A] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F0E6DC]">
            <button
              onClick={onToggle}
              className="py-1 px-3 rounded-lg bg-[#3E3228] text-white text-xs font-medium flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Tạm dừng' : 'Phát tiếp'}</span>
            </button>

            <button
              onClick={handleNextTrack}
              className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#5C4A3E] hover:bg-[#EFE5DA] text-xs transition-colors flex items-center gap-1"
              title="Đổi giai điệu tiếp theo"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
