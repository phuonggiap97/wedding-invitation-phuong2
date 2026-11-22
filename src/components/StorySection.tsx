import React from 'react';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { StoryMilestone } from '../types';

interface StorySectionProps {
  story: StoryMilestone[];
}

export const StorySection: React.FC<StorySectionProps> = ({ story }) => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#F4EFEA]/60 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none text-[20vw] font-script text-[#3E3228] whitespace-nowrap">
        Love Story
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Kỷ Niệm Ngọt Ngào
            </span>
            <span className="h-px w-8 bg-[#C4A48A]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
            Hành Trình Yêu Thương
          </h2>
          <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#6B5749] font-cormorant italic">
            "Mỗi khoảnh khắc bên nhau đều là một viên gạch quý giá xây đắp nên mái ấm tương lai."
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#D8C7B8]" />

          <div className="space-y-12 sm:space-y-16">
            {story.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  id={`story-item-${item.id}`}
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Photo Side */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group max-w-md w-full">
                      {/* Polaroid style container */}
                      <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-[#E8DDCF] transform transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                        <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#FAF7F2]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {item.quote && (
                          <div className="pt-3 px-1 text-center">
                            <p className="font-cormorant italic text-xs sm:text-sm text-[#7A6352]">
                              "{item.quote}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Node on Timeline (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF8F5] border-2 border-[#C4A48A] items-center justify-center shadow-md z-10">
                    <Heart className="w-4 h-4 text-[#A67C52] fill-[#A67C52]" />
                  </div>

                  {/* Text Description Side */}
                  <div className="w-full md:w-1/2 text-left">
                    <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-[#E8DDCF] shadow-sm max-w-md mx-auto md:mx-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE5DA] text-[#6E4E37] text-xs font-semibold tracking-wider uppercase mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Năm {item.year}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-[#2F2620] font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#635144] leading-relaxed font-sans-clean">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
