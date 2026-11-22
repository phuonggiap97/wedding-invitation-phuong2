import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, Download, Heart, Sparkles, Building2, User } from 'lucide-react';
import { BankAccount } from '../types';

interface GiftBoxSectionProps {
  bankAccounts: BankAccount[];
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({ bankAccounts }) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentAccount = bankAccounts.find((acc) => acc.ownerType === activeTab) || bankAccounts[0];

  const handleCopyAccount = (accountNumber: string, id: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="gift" className="py-20 sm:py-28 bg-[#F4EFEA]/70 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#C4A48A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
              Gửi Trao Yêu Thương
            </span>
            <span className="h-px w-8 bg-[#C4A48A]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
            Hộp Mừng Cưới
          </h2>
          <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#6B5749] leading-relaxed">
            Sự hiện diện chung vui của quý khách là món quà quý giá nhất đối với chúng tôi. Nếu quý khách ở xa hoặc muốn gửi gắm lời chúc mừng bằng quà mừng cưới, có thể sử dụng thông tin dưới đây:
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-[#E8DDCF] shadow-sm flex max-w-xs w-full">
            <button
              onClick={() => setActiveTab('groom')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'groom'
                  ? 'bg-[#3E3228] text-white shadow-md'
                  : 'text-[#6B5749] hover:text-[#2F2620]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Mừng Chú Rể</span>
            </button>
            <button
              onClick={() => setActiveTab('bride')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'bride'
                  ? 'bg-[#C87575] text-white shadow-md'
                  : 'text-[#6B5749] hover:text-[#2F2620]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Mừng Cô Dâu</span>
            </button>
          </div>
        </div>

        {/* Bank Details Card */}
        {currentAccount && (
          <div
            id={`bank-card-${currentAccount.id}`}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#EADBCC] transition-all animate-fade-in max-w-2xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* QR Code Container */}
              <div className="flex flex-col items-center shrink-0">
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border-2 border-[#EADBCC] shadow-inner text-center">
                  <img
                    src={currentAccount.qrCodeUrl}
                    alt={`QR Code ${currentAccount.accountHolder}`}
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[11px] text-[#8C7665] font-sans-clean mt-2 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" />
                  Quét mã VietQR tiện lợi
                </span>
              </div>

              {/* Bank Information */}
              <div className="flex-1 w-full space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#FAF0E6] text-[#7A5B45] text-xs font-semibold uppercase tracking-wider">
                  {currentAccount.ownerTitle}
                </div>

                <div className="space-y-3 text-left">
                  {/* Bank Name */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE7DD]">
                    <span className="text-[11px] text-[#8C7665] uppercase font-sans-clean font-semibold block">
                      Ngân hàng
                    </span>
                    <p className="text-sm font-bold text-[#2F2620] mt-0.5">
                      {currentAccount.bankName}
                    </p>
                    {currentAccount.branch && (
                      <p className="text-xs text-[#7A6A5E] mt-0.5">{currentAccount.branch}</p>
                    )}
                  </div>

                  {/* Account Number */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE7DD] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8C7665] uppercase font-sans-clean font-semibold block">
                        Số tài khoản
                      </span>
                      <p className="text-base sm:text-lg font-mono font-bold text-[#A67C52] tracking-wider mt-0.5">
                        {currentAccount.accountNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyAccount(currentAccount.accountNumber, currentAccount.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm ${
                        copiedId === currentAccount.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#3E3228] text-white hover:bg-[#5C4D41]'
                      }`}
                      title="Sao chép số tài khoản"
                    >
                      {copiedId === currentAccount.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép STK</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Holder */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE7DD]">
                    <span className="text-[11px] text-[#8C7665] uppercase font-sans-clean font-semibold block">
                      Chủ tài khoản
                    </span>
                    <p className="text-sm font-bold text-[#2F2620] uppercase mt-0.5">
                      {currentAccount.accountHolder}
                    </p>
                  </div>
                </div>

                {/* Transfer Memo Suggestion */}
                <div className="text-xs text-[#7A6A5E] bg-[#FFF9F3] p-2.5 rounded-lg border border-[#F5E5D5] italic">
                  💡 Gợi ý nội dung: <strong>Mung cuoi Quan Vy - [Ten cua ban]</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
