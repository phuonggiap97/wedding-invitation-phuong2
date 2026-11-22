export interface CoupleInfo {
  groom: {
    fullName: string;
    shortName: string;
    role: string;
    fatherName: string;
    motherName: string;
    orderInFamily: string; // e.g. "Trưởng nam"
    avatarUrl: string;
    bio: string;
    phone: string;
    facebookUrl?: string;
    instagramUrl?: string;
  };
  bride: {
    fullName: string;
    shortName: string;
    role: string;
    fatherName: string;
    motherName: string;
    orderInFamily: string; // e.g. "Út nữ"
    avatarUrl: string;
    bio: string;
    phone: string;
    facebookUrl?: string;
    instagramUrl?: string;
  };
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  quote?: string;
}

export interface WeddingEvent {
  id: string;
  type: 'engagement' | 'ceremony' | 'reception';
  title: string;
  side: 'Nhà Trai' | 'Nhà Gái' | 'Cả Hai';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  lunarDate: string; // e.g. "Ngày 16 tháng 09 năm Giáp Thìn"
  venueName: string;
  address: string;
  mapUrl: string;
  calendarTitle: string;
  schedule: {
    time: string;
    activity: string;
    icon?: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'all' | 'pre-wedding' | 'ceremony' | 'moments';
  featured?: boolean;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
  qrCodeUrl: string;
  ownerType: 'groom' | 'bride';
  ownerTitle: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string; // "Bạn chú rể", "Bạn cô dâu", "Đồng nghiệp", "Người thân"
  message: string;
  createdAt: string;
  avatarColor?: string;
}

export interface RsvpResponse {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  guestSide: 'groom' | 'bride' | 'both';
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  dietaryRequirement?: string;
  message?: string;
  createdAt: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string; // Hex or tailwind
  accentColor: string;
  bgLight: string;
  badge: string;
}

export interface WeddingData {
  title: string;
  subtitle: string;
  invitationMessage: string;
  weddingDate: string; // ISO format string
  heroImageUrl: string;
  coverBannerUrl: string;
  couple: CoupleInfo;
  story: StoryMilestone[];
  events: WeddingEvent[];
  gallery: GalleryPhoto[];
  bankAccounts: BankAccount[];
  dressCode: {
    title: string;
    description: string;
    colors: {
      name: string;
      hex: string;
    }[];
    notes: string[];
  };
  weddingHashtag: string;
}
