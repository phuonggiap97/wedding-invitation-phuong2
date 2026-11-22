import React, { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GallerySectionProps {
  gallery: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Album' },
    { id: 'pre-wedding', label: 'Ảnh Pre-Wedding' },
    { id: 'ceremony', label: 'Khoảnh Khắc Hôn Lễ' },
    { id: 'moments', label: 'Kỷ Niệm Ngọt Ngào' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FAF7F2] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Album Kỷ Niệm
            </span>
            <span className="h-px w-8 bg-[#C4A48A]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
            Bộ Sưu Tập Ảnh Cưới
          </h2>
          <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#6B5749] font-cormorant italic">
            "Từng bức hình là một mảnh ghép thanh xuân mà chúng tôi cùng nhau lưu giữ."
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#3E3228] text-white shadow-md'
                    : 'bg-white text-[#6B5749] hover:bg-[#EFE5DA] border border-[#E8DDCF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-[#E8DDCF] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#F2C94C] font-semibold">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-cormorant italic line-clamp-2 text-white/95">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].url}
              alt={filteredPhotos[lightboxIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white px-4">
              <p className="text-sm sm:text-base font-cormorant italic text-[#E8C5A5]">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              <p className="text-xs text-white/50 mt-1 font-sans-clean">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
