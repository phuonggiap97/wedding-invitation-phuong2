import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Check,
  SlidersHorizontal,
  Heart,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Star,
  Sparkles,
} from 'lucide-react';
import { WeddingData, GalleryPhoto } from '../types';
import { initialWeddingData } from '../data/defaultWeddingData';
import { ImageUploadHelper, compressImageFile } from './ImageUploadHelper';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
  onResetDefault: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onResetDefault,
  petalsEnabled,
  onTogglePetals,
}) => {
  const [formData, setFormData] = useState<WeddingData>(data);
  const [activeTab, setActiveTab] = useState<'photos' | 'general' | 'couple' | 'events' | 'bank'>('photos');
  const [savedToast, setSavedToast] = useState(false);
  const [isMultiUploading, setIsMultiUploading] = useState(false);
  const multiFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(data);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: {
    groomName: string;
    groomShort: string;
    brideName: string;
    brideShort: string;
  }) => {
    setFormData({
      ...formData,
      couple: {
        ...formData.couple,
        groom: {
          ...formData.couple.groom,
          fullName: preset.groomName,
          shortName: preset.groomShort,
        },
        bride: {
          ...formData.couple.bride,
          fullName: preset.brideName,
          shortName: preset.brideShort,
        },
      },
    });
  };

  const handleAddGalleryPhotoByLink = () => {
    const newPhoto: GalleryPhoto = {
      id: 'gallery-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'Khoảnh khắc ngọt ngào mới',
      category: 'pre-wedding',
      featured: false,
    };
    setFormData((prev) => ({
      ...prev,
      gallery: [newPhoto, ...prev.gallery],
    }));
  };

  const handleMultiGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setIsMultiUploading(true);
    try {
      const uploadedPhotos: GalleryPhoto[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const compressedUrl = await compressImageFile(file, 1200, 0.8);
        uploadedPhotos.push({
          id: `gallery-${Date.now()}-${i}`,
          url: compressedUrl,
          caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Khoảnh khắc hạnh phúc',
          category: 'pre-wedding',
          featured: false,
        });
      }
      if (uploadedPhotos.length > 0) {
        setFormData((prev) => ({
          ...prev,
          gallery: [...uploadedPhotos, ...prev.gallery],
        }));
      }
    } finally {
      setIsMultiUploading(false);
      e.target.value = '';
    }
  };

  const handleUpdateGalleryPhoto = (index: number, patch: Partial<GalleryPhoto>) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((photo, idx) => (idx === index ? { ...photo, ...patch } : photo)),
    }));
  };

  const handleMoveGalleryPhoto = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.gallery.length) return;
    setFormData((prev) => {
      const next = [...prev.gallery];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return { ...prev, gallery: next };
    });
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 700);
  };

  const handleReset = () => {
    onResetDefault();
    setFormData(initialWeddingData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="customizer-modal"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#EADBCC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#EADBCC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#3E3228] text-[#FAF8F5] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl text-[#2F2620] font-bold">
                Tùy Chỉnh Thiệp Cưới & Hình Ảnh
              </h3>
              <p className="text-xs text-[#8C7665]">
                Tải ảnh trực tiếp từ máy hoặc dán link ảnh, chỉnh sửa thông tin nhanh chóng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C7665] hover:bg-[#EFE5DA] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Navigation */}
        <div className="flex border-b border-[#EADBCC] px-4 sm:px-6 bg-[#FAF8F5] gap-1 sm:gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'photos', label: '📸 Thay Hình Ảnh', icon: ImageIcon },
            { id: 'general', label: 'Cơ Bản & Thời Gian' },
            { id: 'couple', label: 'Cô Dâu & Chú Rể' },
            { id: 'events', label: 'Địa Điểm & Lịch Trình' },
            { id: 'bank', label: 'Tài Khoản Mừng Cưới' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#3E3228] text-[#2F2620] font-bold bg-white/60 rounded-t-lg'
                  : 'border-transparent text-[#7A6A5E] hover:text-[#2F2620]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* TAB: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-7">
              <div className="p-3.5 bg-[#FFF9F3] rounded-2xl border border-[#F2DECD] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#7A5B45]">
                <div className="flex items-start sm:items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    <strong>Mẹo:</strong> Nhấn trực tiếp vào khung ảnh, kéo thả file từ máy tính, hoặc dán <strong>Direct link</strong> (đuôi .jpg/.png) rồi bấm <strong>"Lưu & Xem Thiệp"</strong>.
                  </span>
                </div>
              </div>

              {/* 1. Hero & Cover Banners */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#2F2620] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3E3228] text-white text-[11px] flex items-center justify-center">
                    1
                  </span>
                  <span>Ảnh Bìa Thiệp Cưới</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploadHelper
                    label="Ảnh Bìa Chính (Đầu Trang)"
                    currentUrl={formData.heroImageUrl}
                    defaultUrl={initialWeddingData.heroImageUrl}
                    onChangeUrl={(url) => setFormData({ ...formData, heroImageUrl: url })}
                    aspectRatio="landscape"
                    helpText="Ảnh ngang rõ nét"
                  />
                  <ImageUploadHelper
                    label="Ảnh Bìa Phụ (Banner)"
                    currentUrl={formData.coverBannerUrl}
                    defaultUrl={initialWeddingData.coverBannerUrl}
                    onChangeUrl={(url) => setFormData({ ...formData, coverBannerUrl: url })}
                    aspectRatio="landscape"
                    helpText="Ảnh phụ dự phòng"
                  />
                </div>
              </div>

              {/* 2. Couple Avatars */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#2F2620] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3E3228] text-white text-[11px] flex items-center justify-center">
                    2
                  </span>
                  <span>Ảnh Chân Dung Chú Rể & Cô Dâu</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImageUploadHelper
                    label={`Chú Rể (${formData.couple.groom.shortName})`}
                    currentUrl={formData.couple.groom.avatarUrl}
                    defaultUrl={initialWeddingData.couple.groom.avatarUrl}
                    onChangeUrl={(url) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, avatarUrl: url },
                        },
                      })
                    }
                    aspectRatio="square"
                  />
                  <ImageUploadHelper
                    label={`Cô Dâu (${formData.couple.bride.shortName})`}
                    currentUrl={formData.couple.bride.avatarUrl}
                    defaultUrl={initialWeddingData.couple.bride.avatarUrl}
                    onChangeUrl={(url) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, avatarUrl: url },
                        },
                      })
                    }
                    aspectRatio="square"
                  />
                </div>
              </div>

              {/* 3. Photo Gallery Management */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#2F2620] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#3E3228] text-white text-[11px] flex items-center justify-center">
                      3
                    </span>
                    <span>Album Ảnh Kỷ Niệm ({formData.gallery.length} ảnh)</span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={multiFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleMultiGalleryUpload}
                    />
                    <button
                      type="button"
                      disabled={isMultiUploading}
                      onClick={() => multiFileInputRef.current?.click()}
                      className="py-1.5 px-3 rounded-xl bg-[#3E3228] hover:bg-[#5C4D41] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#E8C5A5]" />
                      <span>{isMultiUploading ? 'Đang tải...' : 'Tải nhiều ảnh từ máy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddGalleryPhotoByLink}
                      className="py-1.5 px-3 rounded-xl border border-[#D9C8B9] bg-[#FAF7F2] hover:bg-[#EFE5DA] text-[#3E3228] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm bằng link</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.gallery.map((photo, pIdx) => (
                    <div
                      key={photo.id || pIdx}
                      className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#8C6D58] uppercase">
                          Ảnh #{pIdx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateGalleryPhoto(pIdx, { featured: !photo.featured })
                            }
                            className={`px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                              photo.featured
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-white text-[#7A6A5E] border border-[#EADBCC] hover:bg-[#EFE5DA]'
                            }`}
                            title="Hiển thị khung lớn nổi bật trong Album"
                          >
                            <Star
                              className={`w-3 h-3 ${photo.featured ? 'fill-amber-500 text-amber-500' : ''}`}
                            />
                            <span>Nổi bật</span>
                          </button>
                          <button
                            type="button"
                            disabled={pIdx === 0}
                            onClick={() => handleMoveGalleryPhoto(pIdx, -1)}
                            className="p-1.5 rounded-lg bg-white border border-[#EADBCC] text-[#5C4332] hover:bg-[#EFE5DA] disabled:opacity-35 cursor-pointer"
                            title="Đưa lên trước"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={pIdx === formData.gallery.length - 1}
                            onClick={() => handleMoveGalleryPhoto(pIdx, 1)}
                            className="p-1.5 rounded-lg bg-white border border-[#EADBCC] text-[#5C4332] hover:bg-[#EFE5DA] disabled:opacity-35 cursor-pointer"
                            title="Đưa xuống sau"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryPhoto(pIdx)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                        <ImageUploadHelper
                          label="Chọn hoặc dán link ảnh"
                          currentUrl={photo.url}
                          onChangeUrl={(url) => handleUpdateGalleryPhoto(pIdx, { url })}
                          aspectRatio="square"
                        />
                        <div className="space-y-2.5">
                          <div>
                            <label className="text-[11px] font-semibold text-[#5C4A3E] block mb-1">
                              Chú thích bức ảnh
                            </label>
                            <input
                              type="text"
                              placeholder="Nhập chú thích kỷ niệm..."
                              value={photo.caption}
                              onChange={(e) =>
                                handleUpdateGalleryPhoto(pIdx, { caption: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-[#5C4A3E] block mb-1">
                              Danh mục Album
                            </label>
                            <select
                              value={photo.category}
                              onChange={(e) =>
                                handleUpdateGalleryPhoto(pIdx, {
                                  category: e.target.value as GalleryPhoto['category'],
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white text-xs"
                            >
                              <option value="pre-wedding">Ảnh Pre-Wedding</option>
                              <option value="ceremony">Khoảnh Khắc Hôn Lễ</option>
                              <option value="moments">Kỷ Niệm Ngọt Ngào</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Love Story Photos */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#2F2620] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#3E3228] text-white text-[11px] flex items-center justify-center">
                    4
                  </span>
                  <span>Ảnh Cột Mốc Chuyện Tình</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.story.map((item, sIdx) => (
                    <ImageUploadHelper
                      key={item.id}
                      label={`Năm ${item.year}: ${item.title}`}
                      currentUrl={item.imageUrl}
                      defaultUrl={initialWeddingData.story[sIdx]?.imageUrl}
                      onChangeUrl={(url) => {
                        setFormData((prev) => ({
                          ...prev,
                          story: prev.story.map((st, idx) =>
                            idx === sIdx ? { ...st, imageUrl: url } : st
                          ),
                        }));
                      }}
                      aspectRatio="landscape"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Quick Presets */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC]">
                <span className="block text-[11px] font-bold text-[#8C6D58] uppercase mb-2">
                  ✨ Chọn nhanh mẫu tên cặp đôi:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      groomName: 'Giáp Văn Phương',
                      groomShort: 'Văn Phương',
                      brideName: 'Lê Mộng Giao',
                      brideShort: 'Thúy Quỳnh',
                    },
                    {
                      groomName: 'Nguyễn Minh Quân',
                      groomShort: 'Minh Quân',
                      brideName: 'Lê Thảo Vy',
                      brideShort: 'Thảo Vy',
                    },
                    {
                      groomName: 'Trần Đức Anh',
                      groomShort: 'Đức Anh',
                      brideName: 'Vũ Mai Phương',
                      brideShort: 'Mai Phương',
                    },
                  ].map((p, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#D9C8B9] hover:bg-[#EFE5DA] text-xs text-[#4A3B30] font-medium transition-all cursor-pointer"
                    >
                      {p.groomShort} & {p.brideShort}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3E3228] mb-1">
                  Ngày Giờ Tổ Chức Lễ Cưới (Đếm ngược)
                </label>
                <input
                  type="datetime-local"
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3E3228] mb-1">
                  Lời Mở Đầu / Thư Ngỏ
                </label>
                <textarea
                  rows={3}
                  value={formData.invitationMessage}
                  onChange={(e) => setFormData({ ...formData, invitationMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5] resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3E3228] mb-1">
                  Hashtag Đám Cưới
                </label>
                <input
                  type="text"
                  value={formData.weddingHashtag}
                  onChange={(e) => setFormData({ ...formData, weddingHashtag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C8B9] bg-[#FAF8F5]"
                />
              </div>

              {/* Petal animation toggle */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EADBCC]">
                <div>
                  <span className="font-semibold text-[#3E3228] block">
                    Hiệu ứng cánh hoa rơi lãng mạn
                  </span>
                  <span className="text-xs text-[#8C7665]">Cánh hoa hồng nhẹ nhàng bay trong nền</span>
                </div>
                <button
                  type="button"
                  onClick={onTogglePetals}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    petalsEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {petalsEnabled ? 'Đang bật' : 'Đã tắt'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: COUPLE */}
          {activeTab === 'couple' && (
            <div className="space-y-6">
              {/* Groom */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] space-y-3">
                <h4 className="font-bold text-[#3E3228] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#A67C52]" />
                  <span>Thông Tin Chú Rể (Nhà Trai)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      value={formData.couple.groom.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            groom: { ...formData.couple.groom, fullName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Tên thường gọi (hiển thị trên bìa)</label>
                    <input
                      type="text"
                      value={formData.couple.groom.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            groom: { ...formData.couple.groom, shortName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Thân phụ (Bố)</label>
                    <input
                      type="text"
                      value={formData.couple.groom.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            groom: { ...formData.couple.groom, fatherName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Thân mẫu (Mẹ)</label>
                    <input
                      type="text"
                      value={formData.couple.groom.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            groom: { ...formData.couple.groom, motherName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Bride */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] space-y-3">
                <h4 className="font-bold text-[#3E3228] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C87575]" />
                  <span>Thông Tin Cô Dâu (Nhà Gái)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      value={formData.couple.bride.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            bride: { ...formData.couple.bride, fullName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Tên thường gọi (hiển thị trên bìa)</label>
                    <input
                      type="text"
                      value={formData.couple.bride.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            bride: { ...formData.couple.bride, shortName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Thân phụ (Bố)</label>
                    <input
                      type="text"
                      value={formData.couple.bride.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            bride: { ...formData.couple.bride, fatherName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Thân mẫu (Mẹ)</label>
                    <input
                      type="text"
                      value={formData.couple.bride.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          couple: {
                            ...formData.couple,
                            bride: { ...formData.couple.bride, motherName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              {formData.events.map((evt, idx) => (
                <div key={evt.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] space-y-3">
                  <h4 className="font-bold text-[#3E3228]">
                    Sự Kiện {idx + 1}: {evt.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#7A6A5E] block mb-1">Tên sảnh / Địa điểm</label>
                      <input
                        type="text"
                        value={evt.venueName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            events: prev.events.map((ev, eIdx) =>
                              eIdx === idx ? { ...ev, venueName: e.target.value } : ev
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#7A6A5E] block mb-1">Giờ diễn ra</label>
                      <input
                        type="text"
                        value={evt.time}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            events: prev.events.map((ev, eIdx) =>
                              eIdx === idx ? { ...ev, time: e.target.value } : ev
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Địa chỉ chi tiết</label>
                    <input
                      type="text"
                      value={evt.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          events: prev.events.map((ev, eIdx) =>
                            eIdx === idx ? { ...ev, address: e.target.value } : ev
                          ),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: BANK */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              {formData.bankAccounts.map((bank, bIdx) => (
                <div key={bank.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCC] space-y-3">
                  <h4 className="font-bold text-[#3E3228]">{bank.ownerTitle}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#7A6A5E] block mb-1">Ngân hàng</label>
                      <input
                        type="text"
                        value={bank.bankName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bankAccounts: prev.bankAccounts.map((bk, idx) =>
                              idx === bIdx ? { ...bk, bankName: e.target.value } : bk
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#7A6A5E] block mb-1">Số tài khoản</label>
                      <input
                        type="text"
                        value={bank.accountNumber}
                        onChange={(e) => {
                          const newAcc = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            bankAccounts: prev.bankAccounts.map((bk, idx) =>
                              idx === bIdx
                                ? {
                                    ...bk,
                                    accountNumber: newAcc,
                                    qrCodeUrl: `https://api.vietqr.io/image/970436-${newAcc}-compact2.png?accountName=${encodeURIComponent(
                                      bk.accountHolder
                                    )}&amount=0&addInfo=Mung%20cuoi`,
                                  }
                                : bk
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6A5E] block mb-1">Tên chủ tài khoản</label>
                    <input
                      type="text"
                      value={bank.accountHolder}
                      onChange={(e) => {
                        const newHolder = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          bankAccounts: prev.bankAccounts.map((bk, idx) =>
                            idx === bIdx
                              ? {
                                  ...bk,
                                  accountHolder: newHolder,
                                  qrCodeUrl: `https://api.vietqr.io/image/970436-${bk.accountNumber}-compact2.png?accountName=${encodeURIComponent(
                                    newHolder
                                  )}&amount=0&addInfo=Mung%20cuoi`,
                                }
                              : bk
                          ),
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9C8B9] bg-white uppercase"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#EADBCC] flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="py-2 px-3 rounded-xl border border-[#D9C8B9] bg-white hover:bg-[#EFE5DA] text-[#6B5749] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              title="Xóa bản lưu tạm trên trình duyệt và tải lại dữ liệu từ file mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>
            {savedToast && (
              <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                <Check className="w-4 h-4" /> Đã áp dụng!
              </span>
            )}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-[#D9C8B9] text-[#5C4332] text-xs font-semibold hover:bg-[#EFE5DA] cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="py-2.5 px-5 rounded-xl bg-[#3E3228] hover:bg-[#5C4D41] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu & Xem Thiệp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
