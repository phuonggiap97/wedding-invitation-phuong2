import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, Sparkles, UserCheck, MessageCircle, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestWish } from '../types';
import { initialWishes, wishTemplates } from '../data/defaultWeddingData';

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('Bạn bè');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_guestbook_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(initialWishes);
      }
    } else {
      setWishes(initialWishes);
    }
  }, []);

  const handleApplyTemplate = (template: string) => {
    setMessage(template);
    setSelectedTemplate(template);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) {
      alert('Vui lòng nhập Tên và Lời chúc của bạn!');
      return;
    }

    const colors = [
      'bg-rose-100 text-rose-700',
      'bg-amber-100 text-amber-700',
      'bg-emerald-100 text-emerald-700',
      'bg-indigo-100 text-indigo-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700'
    ];

    const newWish: GuestWish = {
      id: 'wish-' + Date.now(),
      name: authorName.trim(),
      relation: relation,
      message: message.trim(),
      createdAt: 'Vừa xong',
      avatarColor: colors[Math.floor(Math.random() * colors.length)]
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_guestbook_wishes', JSON.stringify(updated));

    // Reset form
    setAuthorName('');
    setMessage('');
    setSelectedTemplate(null);

    // Confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="wishes" className="py-20 sm:py-28 bg-[#FAF7F2] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Sổ Lưu Bút Kỷ Niệm
            </span>
            <span className="h-px w-8 bg-[#C4A48A]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
            Gửi Lời Chúc Phúc
          </h2>
          <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#6B5749] font-cormorant italic">
            "Những lời chúc tốt lành của quý vị là món quà tinh thần vô giá cho hành trình hạnh phúc của chúng tôi."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Side (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCC] shadow-lg">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#F0E6DC]">
              <MessageSquareHeart className="w-5 h-5 text-[#C4A48A]" />
              <h3 className="font-display text-xl text-[#2F2620] font-bold">
                Viết Lời Chúc Mừng
              </h3>
            </div>

            <form onSubmit={handleSendWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-1.5">
                  Tên của bạn <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Long, Chị Thảo..."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-1.5">
                  Mối quan hệ
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                >
                  <option value="Bạn thân">Bạn thân</option>
                  <option value="Bạn chú rể">Bạn chú rể</option>
                  <option value="Bạn cô dâu">Bạn cô dâu</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Người thân gia đình">Người thân gia đình</option>
                  <option value="Bạn bè">Bạn bè</option>
                </select>
              </div>

              {/* Template quick-select chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C6D58] mb-2">
                  ✨ Gợi ý lời chúc nhanh
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-[#FAF8F5] rounded-xl border border-[#EFE7DD]">
                  {wishTemplates.map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(template)}
                      className={`text-left text-xs p-2 rounded-lg transition-all line-clamp-1 border ${
                        selectedTemplate === template
                          ? 'bg-[#EBD8C5] text-[#5C4332] border-[#C4A48A]'
                          : 'bg-white text-[#6B5749] border-[#E8DDCF] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-1.5">
                  Nội dung lời chúc <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập lời chúc phúc ấm áp của bạn tại đây..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620] resize-none"
                />
              </div>

              <button
                type="submit"
                id="wish-submit-btn"
                className="w-full py-3 px-6 rounded-xl bg-[#3E3228] hover:bg-[#5C4D41] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Lời Chúc Mừng</span>
              </button>
            </form>
          </div>

          {/* Wishes List Side (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 max-h-[640px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58]">
                Tất cả lời chúc ({wishes.length})
              </span>
              <span className="text-xs text-[#8C7665] font-cormorant italic">
                Cập nhật mới nhất
              </span>
            </div>

            {wishes.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-[#8C7665] border border-[#EADBCC]">
                Hãy là người đầu tiên gửi lời chúc mừng đến cặp đôi!
              </div>
            ) : (
              wishes.map((wish) => {
                const initial = wish.name.charAt(0).toUpperCase();
                return (
                  <div
                    key={wish.id}
                    id={`wish-item-${wish.id}`}
                    className="bg-white rounded-2xl p-5 border border-[#EADBCC] shadow-sm hover:shadow-md transition-all flex items-start gap-4 animate-fade-in"
                  >
                    {/* Avatar initial circle */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-inner ${
                        wish.avatarColor || 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm sm:text-base text-[#2F2620]">
                            {wish.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C6D58] text-[10px] sm:text-xs font-medium">
                            {wish.relation}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#A69282] font-sans-clean shrink-0">
                          {wish.createdAt}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed mt-1 font-sans-clean">
                        {wish.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
