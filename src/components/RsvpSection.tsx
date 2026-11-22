import React, { useState, useEffect } from 'react';
import { Heart, CheckCircle2, UserCheck, Users, MessageSquare, Send, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpResponse } from '../types';

export const RsvpSection: React.FC = () => {
  const [rsvpList, setRsvpList] = useState<RsvpResponse[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    guestSide: 'groom' as 'groom' | 'bride' | 'both',
    attending: 'yes' as 'yes' | 'no' | 'maybe',
    guestCount: 1,
    dietaryRequirement: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showRsvpListModal, setShowRsvpListModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_entries');
    if (saved) {
      try {
        setRsvpList(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    const newEntry: RsvpResponse = {
      id: 'rsvp-' + Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    const updated = [newEntry, ...rsvpList];
    setRsvpList(updated);
    localStorage.setItem('wedding_rsvp_entries', JSON.stringify(updated));

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      guestSide: 'groom',
      attending: 'yes',
      guestCount: 1,
      dietaryRequirement: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EADBCC] shadow-xl relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Xác Nhận Tham Dự
            </span>
            <span className="h-px w-8 bg-[#C4A48A]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2F2620] mb-3">
            Sự Hiện Diện Của Bạn
          </h2>
          <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#6B5749] leading-relaxed">
            Để giúp gia đình chuẩn bị chu đáo và đón tiếp nồng hậu nhất, xin vui lòng phản hồi trước ngày <strong>20/11/2026</strong>.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 px-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] animate-fade-in space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-[#2F2620] font-bold">
              Cảm ơn bạn đã phản hồi!
            </h3>
            <p className="text-sm text-[#6B5749] max-w-md mx-auto leading-relaxed">
              Thông tin xác nhận của <strong>{formData.fullName}</strong> đã được ghi nhận. Minh Quân & Thảo Vy rất mong được đón tiếp bạn trong ngày hạnh phúc!
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="py-2.5 px-5 rounded-xl bg-[#3E3228] text-white text-xs sm:text-sm font-medium hover:bg-[#5C4D41] transition-colors"
              >
                Gửi phản hồi khác
              </button>
              <button
                onClick={() => setShowRsvpListModal(true)}
                className="py-2.5 px-5 rounded-xl bg-[#F4EDE4] text-[#5C4332] text-xs sm:text-sm font-medium hover:bg-[#EBD8C5] transition-colors"
              >
                Xem danh sách ({rsvpList.length})
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                  Họ và tên của bạn <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                  Số điện thoại <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                />
              </div>
            </div>

            {/* Guest side selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                Bạn là khách mời của ai?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'groom', label: 'Nhà Trai (Chú rể)' },
                  { id: 'bride', label: 'Nhà Gái (Cô dâu)' },
                  { id: 'both', label: 'Bạn Chung Cả Hai' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFormData({ ...formData, guestSide: item.id as any })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      formData.guestSide === item.id
                        ? 'bg-[#3E3228] text-white border-[#3E3228] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#6B5749] border-[#D9C8B9] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Attending Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                Bạn sẽ tham dự chứ?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'yes', label: '🎉 Chắc chắn tham dự' },
                  { id: 'no', label: '🥺 Rất tiếc không thể đến' },
                  { id: 'maybe', label: '🤔 Chưa chắc chắn' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFormData({ ...formData, attending: item.id as any })}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all cursor-pointer ${
                      formData.attending === item.id
                        ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#6B5749] border-[#D9C8B9] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count & Dietary */}
            {formData.attending !== 'no' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                    Số lượng người tham dự
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                  >
                    <option value={1}>Đi 1 người (Một mình)</option>
                    <option value={2}>Đi 2 người (Cùng người thương/bạn)</option>
                    <option value={3}>Đi 3 người (Gia đình)</option>
                    <option value={4}>Đi 4 người (Cả gia đình)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                    Chế độ ẩm thực đặc biệt
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Dùng tiệc chay, dị ứng tôm/cua..."
                    value={formData.dietaryRequirement}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirement: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620]"
                  />
                </div>
              </div>
            )}

            {/* Message to couple */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4A3E] mb-2">
                Lời nhắn gửi đến Cô Dâu & Chú Rể
              </label>
              <textarea
                rows={3}
                placeholder="Gửi gắm điều gì đó ấm áp đến chúng mình nhé..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-sm text-[#2F2620] resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="rsvp-submit-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#3E3228] to-[#5C4A3E] hover:from-[#2F2620] hover:to-[#4A3B30] text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Xác Nhận Tham Dự</span>
              </button>
            </div>
          </form>
        )}

        {/* Bottom Link to check confirmed list */}
        {rsvpList.length > 0 && !submitted && (
          <div className="mt-8 pt-4 border-t border-[#EADBCC] text-center">
            <button
              onClick={() => setShowRsvpListModal(true)}
              className="text-xs text-[#8C6D58] hover:text-[#2F2620] font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Đã có <strong>{rsvpList.length}</strong> khách mời phản hồi</span>
            </button>
          </div>
        )}
      </div>

      {/* RSVP Attendees Modal */}
      {showRsvpListModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowRsvpListModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl border border-[#EADBCC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EADBCC]">
              <div>
                <h3 className="font-display text-xl text-[#2F2620] font-bold">
                  Danh Sách Khách Phản Hồi ({rsvpList.length})
                </h3>
                <p className="text-xs text-[#8C7665]">Thông tin xác nhận tham dự lễ cưới</p>
              </div>
              <button
                onClick={() => setShowRsvpListModal(false)}
                className="p-1.5 text-[#8C7665] hover:bg-[#FAF8F5] rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {rsvpList.length === 0 ? (
                <p className="text-sm text-center text-[#8C7665] py-8">Chưa có phản hồi nào.</p>
              ) : (
                rsvpList.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE7DD] text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-semibold text-[#2F2620]">
                      <span>{item.fullName}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                        item.attending === 'yes'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.attending === 'no'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.attending === 'yes' ? 'Tham dự' : item.attending === 'no' ? 'Không thể đến' : 'Chưa chắc chắn'}
                        {item.attending === 'yes' && ` (${item.guestCount} người)`}
                      </span>
                    </div>
                    <div className="text-[#8C7665] text-xs mt-1 flex items-center justify-between">
                      <span>Khách {item.guestSide === 'groom' ? 'Nhà Trai' : item.guestSide === 'bride' ? 'Nhà Gái' : 'Bạn Chung'}</span>
                      <span>{item.createdAt}</span>
                    </div>
                    {item.message && (
                      <p className="mt-2 text-xs italic text-[#5C4A3E] bg-white p-2 rounded-lg border border-[#F0E6DC]">
                        "{item.message}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#EADBCC] flex justify-end">
              <button
                onClick={() => setShowRsvpListModal(false)}
                className="py-2 px-4 rounded-xl bg-[#3E3228] text-white text-xs font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
