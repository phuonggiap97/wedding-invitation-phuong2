import React, { useRef, useState, useEffect } from 'react';
import { Upload, Link as LinkIcon, RotateCcw, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadHelperProps {
  label: string;
  currentUrl: string;
  defaultUrl?: string;
  onChangeUrl: (url: string) => void;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  helpText?: string;
}

/**
 * Compresses an image File to a reasonable JPEG data URL so it fits smoothly in localStorage
 * while maintaining crisp display quality.
 */
export function compressImageFile(file: File, maxDimension = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh'));
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Dữ liệu ảnh trống'));
        return;
      }

      const img = new window.Image();
      img.onerror = () => resolve(dataUrl); // Fallback to raw data URL if browser can't decode into canvas
      img.onload = () => {
        let { width, height } = img;
        if (width <= maxDimension && height <= maxDimension && file.size < 350 * 1024) {
          resolve(dataUrl);
          return;
        }

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export const ImageUploadHelper: React.FC<ImageUploadHelperProps> = ({
  label,
  currentUrl,
  defaultUrl,
  onChangeUrl,
  aspectRatio = 'landscape',
  helpText,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loaded');

  useEffect(() => {
    if (!currentUrl) {
      setImgStatus('error');
    } else {
      setImgStatus('loading');
    }
  }, [currentUrl]);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsProcessing(true);
    try {
      const compressed = await compressImageFile(file);
      onChangeUrl(compressed);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const getAspectClass = () => {
    if (aspectRatio === 'square') return 'w-24 h-24 sm:w-28 sm:h-28';
    if (aspectRatio === 'portrait') return 'w-24 h-32 sm:w-28 sm:h-36';
    return 'w-full h-36 sm:h-40';
  };

  const isPageLinkNotDirect =
    currentUrl.includes('postimg.cc/') && !currentUrl.includes('i.postimg.cc/');

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`bg-white p-3.5 rounded-2xl border transition-all space-y-2.5 ${
        isDragging
          ? 'border-[#A67C52] ring-2 ring-[#A67C52]/30 bg-[#FFF9F2]'
          : 'border-[#EADBCC]'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-[#3E3228] uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {helpText && <span className="text-[10px] text-[#8C7665]">{helpText}</span>}
          {defaultUrl && currentUrl !== defaultUrl && (
            <button
              type="button"
              onClick={() => onChangeUrl(defaultUrl)}
              className="text-[11px] text-[#8C6D58] hover:text-[#3E3228] flex items-center gap-1 cursor-pointer"
              title="Khôi phục ảnh gốc"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Ảnh gốc</span>
            </button>
          )}
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-3 ${
          aspectRatio === 'landscape' ? 'sm:flex-col' : 'items-start'
        }`}
      >
        {/* Preview image with click-to-upload */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-xl overflow-hidden border border-[#D9C8B9] bg-[#FAF8F5] shrink-0 group cursor-pointer ${getAspectClass()}`}
          title="Nhấn hoặc kéo thả ảnh vào đây để thay đổi"
        >
          {currentUrl ? (
            <img
              src={currentUrl}
              alt={label}
              onLoad={() => setImgStatus('loaded')}
              onError={() => setImgStatus('error')}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#8C7665] text-xs gap-1">
              <ImageIcon className="w-6 h-6 opacity-50" />
              <span>Chưa có ảnh</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium gap-1 p-2 text-center">
            <Upload className="w-4 h-4 text-[#E8C5A5]" />
            <span>{isProcessing ? 'Đang xử lý...' : 'Chọn hoặc kéo thả ảnh'}</span>
          </div>

          {/* Load status badge */}
          {imgStatus === 'error' && currentUrl && (
            <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>Lỗi ảnh</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 w-full space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 px-3 rounded-xl bg-[#3E3228] hover:bg-[#5C4D41] disabled:opacity-60 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#E8C5A5]" />
            <span>{isProcessing ? 'Đang nén ảnh...' : 'Tải ảnh từ máy / điện thoại'}</span>
          </button>

          {/* Direct URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#8C7665]">
              <LinkIcon className="w-3 h-3" />
            </div>
            <input
              type="text"
              placeholder="Hoặc dán link ảnh trực tiếp (https://...)..."
              value={currentUrl.startsWith('data:') ? '' : currentUrl}
              onChange={(e) => onChangeUrl(e.target.value.trim())}
              className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-[#D9C8B9] bg-[#FAF8F5] text-xs text-[#2F2620] focus:outline-none focus:ring-1 focus:ring-[#A67C52]"
            />
            {currentUrl.startsWith('data:') && (
              <span className="block mt-1 text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Ảnh đã tải từ thiết bị (có thể dán link URL mới vào ô trên để thay)
              </span>
            )}
            {isPageLinkNotDirect && (
              <span className="block mt-1 text-[10px] text-amber-700 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                Đây là link trang web Postimg, hãy copy dòng "Direct link" (https://i.postimg.cc/...) để ảnh hiển thị!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
