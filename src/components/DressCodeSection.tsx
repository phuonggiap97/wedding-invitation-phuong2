import React from 'react';
import { Sparkles, Info, Check, Car } from 'lucide-react';
import { WeddingData } from '../types';

interface DressCodeSectionProps {
  dressCode: WeddingData['dressCode'];
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ dressCode }) => {
  return (
    <section id="dresscode" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EADBCC] shadow-lg relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F4EE] rounded-bl-[100px] -z-0 pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Gợi Ý Trang Phục
            </span>
            <Sparkles className="w-4 h-4 text-[#C4A48A]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#2F2620] mb-3">
            {dressCode.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#C4A48A] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#6B5749] leading-relaxed">
            {dressCode.description}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
          {dressCode.colors.map((color, index) => (
            <div
              key={index}
              className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EFE7DD] flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-inner border-2 border-white mb-2.5 transition-transform"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-xs font-semibold text-[#3E3228] font-sans-clean">
                {color.name}
              </p>
              <span className="text-[10px] text-[#8C7665] font-mono mt-0.5">
                {color.hex}
              </span>
            </div>
          ))}
        </div>

        {/* Notes & Tips Box */}
        <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#EADBCC] space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#5C4332]">
            <Info className="w-4 h-4 text-[#A67C52]" />
            <span>Lưu Ý Cho Khách Quý</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#6B5749]">
            {dressCode.notes.map((note, nIdx) => (
              <li key={nIdx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
