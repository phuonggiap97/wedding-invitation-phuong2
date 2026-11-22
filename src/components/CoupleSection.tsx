import React from 'react';
import { Phone, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { CoupleInfo } from '../types';

interface CoupleSectionProps {
  couple: CoupleInfo;
  invitationMessage: string;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ couple, invitationMessage }) => {
  return (
    <section id="couple" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-8 bg-[#C4A48A]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
            Tân Lang & Tân Nương
          </span>
          <span className="h-px w-8 bg-[#C4A48A]" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
          Cô Dâu & Chú Rể
        </h2>
        <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
        <p className="text-base sm:text-lg text-[#6B5749] font-cormorant italic leading-relaxed px-4">
          "{invitationMessage}"
        </p>
      </div>

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto items-stretch">
        {/* Groom Card */}
        <div
          id="groom-profile-card"
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#EADBCC] flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Subtle Corner Decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F7F2EB] rounded-bl-[80px] -z-0 pointer-events-none group-hover:bg-[#F2E8DC] transition-colors" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar Frame */}
            <div className="relative mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#D4B59D] shadow-inner bg-[#FAF7F2]">
                <img
                  src={couple.groom.avatarUrl}
                  alt={couple.groom.fullName}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-1 right-2 bg-[#8C6D58] text-white p-2 rounded-full shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Groom Info */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#F4EDE4] text-[#7A5B45] text-xs font-semibold uppercase tracking-wider mb-2">
              {couple.groom.role} • {couple.groom.orderInFamily}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#2F2620] font-bold mb-1">
              {couple.groom.fullName}
            </h3>
            <p className="font-script text-2xl text-[#A67C52] mb-4">
              ({couple.groom.shortName})
            </p>

            {/* Family Info */}
            <div className="w-full bg-[#FAF7F2] rounded-2xl p-4 mb-4 border border-[#EFE5DA] text-sm text-[#5C4A3E]">
              <p className="font-semibold text-[#3D2E25] mb-1 font-sans-clean text-xs uppercase tracking-wider">
                Nhà Trai
              </p>
              <p>Thân phụ: <span className="font-medium text-[#2F2620]">{couple.groom.fatherName}</span></p>
              <p>Thân mẫu: <span className="font-medium text-[#2F2620]">{couple.groom.motherName}</span></p>
            </div>

            {/* Bio */}
            <p className="text-[#6B5749] text-sm leading-relaxed mb-6 font-sans-clean">
              {couple.groom.bio}
            </p>
          </div>

          {/* Contact Actions */}
          <div className="relative z-10 pt-4 border-t border-[#EADBCC] flex items-center justify-center gap-3">
            <a
              href={`tel:${couple.groom.phone}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#F4EDE4] hover:bg-[#EBD8C5] text-[#5C4332] text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi: {couple.groom.phone}</span>
            </a>
          </div>
        </div>

        {/* Bride Card */}
        <div
          id="bride-profile-card"
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#EADBCC] flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Corner Decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FBF1F1] rounded-bl-[80px] -z-0 pointer-events-none group-hover:bg-[#F8E3E3] transition-colors" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar Frame */}
            <div className="relative mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#E5B5B5] shadow-inner bg-[#FDF9F9]">
                <img
                  src={couple.bride.avatarUrl}
                  alt={couple.bride.fullName}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-1 right-2 bg-[#C87575] text-white p-2 rounded-full shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Bride Info */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#FAECEC] text-[#9E4C4C] text-xs font-semibold uppercase tracking-wider mb-2">
              {couple.bride.role} • {couple.bride.orderInFamily}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#2F2620] font-bold mb-1">
              {couple.bride.fullName}
            </h3>
            <p className="font-script text-2xl text-[#C87575] mb-4">
              ({couple.bride.shortName})
            </p>

            {/* Family Info */}
            <div className="w-full bg-[#FDF8F8] rounded-2xl p-4 mb-4 border border-[#F5DFDF] text-sm text-[#5C4A3E]">
              <p className="font-semibold text-[#3D2E25] mb-1 font-sans-clean text-xs uppercase tracking-wider">
                Nhà Gái
              </p>
              <p>Thân phụ: <span className="font-medium text-[#2F2620]">{couple.bride.fatherName}</span></p>
              <p>Thân mẫu: <span className="font-medium text-[#2F2620]">{couple.bride.motherName}</span></p>
            </div>

            {/* Bio */}
            <p className="text-[#6B5749] text-sm leading-relaxed mb-6 font-sans-clean">
              {couple.bride.bio}
            </p>
          </div>

          {/* Contact Actions */}
          <div className="relative z-10 pt-4 border-t border-[#EADBCC] flex items-center justify-center gap-3">
            <a
              href={`tel:${couple.bride.phone}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAECEC] hover:bg-[#F5DFDF] text-[#8C3E3E] text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi: {couple.bride.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
