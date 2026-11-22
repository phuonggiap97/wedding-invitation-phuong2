import { WeddingData, GuestWish } from '../types';

export const initialWeddingData: WeddingData = {
  title: "Lễ Thành Hôn",
  subtitle: "Save The Date",
  invitationMessage: "Tình yêu không phải là tìm kiếm một người hoàn hảo, mà là học cách nhìn nhận một người không hoàn hảo theo cách hoàn hảo nhất. Chúng tôi rất vinh hạnh được đón tiếp bạn trong ngày trọng đại nhất của cuộc đời mình.",
  weddingDate: "2026-11-28T18:00:00",
  heroImageUrl: "https://i.postimg.cc/DyPxVfd9/anh-bia.jpg",
  coverBannerUrl: "https://i.postimg.cc/DyPxVfd9/anh-bia.jpg",
  weddingHashtag: "#QuanQuynhWedding2026",
  couple: {
    groom: {
      fullName: "Giáp Văn Phương",
      shortName: "Văn Phương",
      role: "Chú Rể",
      fatherName: "Giáp Văn Tân",
      motherName: "Đoàn Thị Luyến",
      orderInFamily: "Trưởng nam",
      avatarUrl: "https://i.postimg.cc/GhXvJ4xM/nam.jpg",
      bio: "Một chàng trai luôn trân trọng từng khoảnh khắc bình yên và tìm thấy niềm hạnh phúc trọn vẹn nhất mỗi khi ở bên cạnh Thúy Quỳnh.",
      phone: "0901234567",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com"
    },
    bride: {
      fullName: "Lê Mộng Giao",
      shortName: "Thúy Quỳnh",
      role: "Cô Dâu",
      fatherName: "Lê Quốc Dũng",
      motherName: "Phạm Thị Hương",
      orderInFamily: "Ái nữ",
      avatarUrl: "https://i.postimg.cc/MHx1tR48/EDIT.png",
      bio: "Cô gái yêu hoa và âm nhạc lofi, luôn tràn đầy năng lượng tích cực và tin rằng tình yêu đích thực là điểm tựa vững chãi nhất cho tương lai.",
      phone: "0987654321",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com"
    }
  },
  story: [
    {
      id: "1",
      year: "2021",
      title: "Lần đầu gặp gỡ tại quán cà phê sách",
      description: "Một chiều mưa tháng 10 tại Sài Gòn, chúng mình tình cờ cùng chọn một cuốn sách nghệ thuật. Ánh nhìn đầu tiên vụng về nhưng ấm áp đã bắt đầu cho tất cả.",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      quote: "Đôi khi khoảnh khắc thay đổi cả cuộc đời lại bắt đầu từ một cái chạm tay nhẹ nhàng."
    },
    {
      id: "2",
      year: "2022",
      title: "Lời tỏ tình dưới bầu trời Đà Lạt",
      description: "Giữa đồi thông lộng gió và làn sương se lạnh của Đà Lạt, Quân đã can đảm ngỏ lời cùng Vy. Cả hai cùng hẹn ước sẽ luôn đồng hành trên mọi cung đường tương lai.",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      quote: "Cảm ơn vì em đã bước vào thế giới của anh và biến mọi điều bình dị thành điều kỳ diệu."
    },
    {
      id: "3",
      year: "2024",
      title: "Chuyến đi xuyên Việt đầu tiên",
      description: "Cùng nhau ngắm bình minh trên biển Nha Trang, dạo bước phố cổ Hội An và thưởng thức những bữa cơm đầm ấm bên nhau. Từng kỷ niệm là một viên gạch đắp xây tình yêu.",
      imageUrl: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
      quote: "Đi đâu không quan trọng, quan trọng là đi cùng ai."
    },
    {
      id: "4",
      year: "2026",
      title: "She Said YES! - Lời cầu hôn ngọt ngào",
      description: "Bên bờ biển lúc hoàng hôn buông xuống, Quân quỳ gối trao chiếc nhẫn ước hẹn. Trong sự vỡ òa của hạnh phúc và tiếng sóng vỗ, Vy mỉm cười đồng ý.",
      imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      quote: "Từ hôm nay, câu chuyện của 'anh' và 'em' chính thức trở thành câu chuyện của 'chúng ta'."
    }
  ],
  events: [
    {
      id: "event-1",
      type: "ceremony",
      title: "LỄ VU QUY & THÀNH HÔN (TƯ GIA)",
      side: "Cả Hai",
      date: "2026-11-28",
      time: "08:30",
      lunarDate: "Ngày 20 tháng 10 năm Bính Ngọ (Âm Lịch)",
      venueName: "Tư Gia Nhà Gái & Nhà Trai",
      address: "128 Đường Nguyễn Văn Trỗi, Phường 8, Quận Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://www.google.com/maps/place/Trung+T%C3%A2m+H%E1%BB%99i+Ngh%E1%BB%8B+%26+Ti%E1%BB%87c+C%C6%B0%E1%BB%9Bi+THE+ADORA+PREMIUM/@10.7301095,106.7140607,16z/data=!4m10!1m2!2m1!1zbmjDoCBow6BuZyB0aeG7h2MgY8aw4bubaQ!3m6!1s0x31752fa074235087:0xfbe9e0b6a542076a!8m2!3d10.7301095!4d106.7197256!15sChluaMOgIGjDoG5nIHRp4buHYyBjxrDhu5tpWhsiGW5ow6AgaMOgbmcgdGnhu4djIGPGsOG7m2mSARFjb25mZXJlbmNlX2NlbnRlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuVFVSSk5UWk1OVzFuUlJBQuABAPoBBAgAEEI!16s%2Fg%2F11j7yxbl0b?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      calendarTitle: "Lễ Vu Quy & Thành Hôn - Minh Quân & Thảo Vy",
      schedule: [
        { time: "08:00", activity: "Nhà trai xuất phát sang nhà gái làm lễ rước dâu" },
        { time: "08:30", activity: "Lễ Vu Quy tại tư gia nhà gái" },
        { time: "10:00", activity: "Lễ Thành Hôn & Báo cáo gia tiên tại tư gia nhà trai" },
        { time: "11:00", activity: "Tiệc thân mật cùng gia đình nội ngoại" }
      ]
    },
    {
      id: "event-2",
      type: "reception",
      title: "TIỆC CƯỚI CHÍNH (WEDDING RECEPTION)",
      side: "Cả Hai",
      date: "2026-11-28",
      time: "18:00",
      lunarDate: "Ngày 20 tháng 10 năm Bính Ngọ (Âm Lịch)",
      venueName: "Trung Tâm Hội Nghị Tiệc Cưới GEM Center - Sảnh Castor",
      address: "08 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=GEM+Center+08+Nguyen+Binh+Khiem+Quan+1+Ho+Chi+Minh",
      calendarTitle: "Tiệc Cưới Minh Quân & Thảo Vy @ GEM Center",
      schedule: [
        { time: "17:30", activity: "Đón tiếp khách quý & Chụp hình kỷ niệm tại photobooth" },
        { time: "18:30", activity: "Nghi thức Lễ Thành Hôn, rót rượu mừng & cắt bánh cưới" },
        { time: "19:00", activity: "Khai tiệc chiêu đãi & Âm nhạc du dương" },
        { time: "20:00", activity: "Giao lưu minigame, tung hoa cưới & tiệc After Party" }
      ]
    }
  ],
  gallery: [
    {
      id: "g1",
      url: "https://i.postimg.cc/FNNrLhn4/chef-de-cuisine.jpg",
      caption: "Khoảnh khắc trao nhẫn ước hẹn ngập tràn cảm xúc",
      category: "ceremony",
      featured: true
    },
    {
      id: "g2",
      url: "https://i.postimg.cc/LRz45JvX/dau-bep-au-la-gi-lam-the-nao-de-tro-thanh-dau-bep-au-chuyen-nghiep-6.jpg",
      caption: "Nụ cười rạng rỡ ngày chung đôi",
      category: "pre-wedding",
      featured: true
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Ánh nhìn ngọt ngào bên khung cửa sổ cổ điển",
      category: "pre-wedding"
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
      caption: "Hòa mình giữa thiên nhiên Đà Lạt thơ mộng",
      category: "moments"
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      caption: "Bó hoa cưới trắng tinh khôi dành riêng cho nàng dâu",
      category: "moments"
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      caption: "Dạo bước bên nhau dưới ánh hoàng hôn biển êm đềm",
      category: "pre-wedding"
    },
    {
      id: "g7",
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      caption: "Những cử chỉ quan tâm ấm áp hàng ngày",
      category: "moments"
    },
    {
      id: "g8",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      caption: "Hạnh phúc giản đơn là luôn có em bên cạnh",
      category: "ceremony"
    }
  ],
  bankAccounts: [
    {
      id: "bank-groom",
      bankName: "Vietcombank (Ngân hàng Ngoại Thương)",
      accountNumber: "1029384756",
      accountHolder: "NGUYEN MINH QUAN",
      branch: "Chi nhánh TP. Hồ Chí Minh",
      qrCodeUrl: "https://api.vietqr.io/image/970436-1029384756-compact2.png?accountName=NGUYEN%20MINH%20QUAN&amount=0&addInfo=Mung%20cuoi%20Quan%20Vy",
      ownerType: "groom",
      ownerTitle: "Mừng Cưới Chú Rể (Nhà Trai)"
    },
    {
      id: "bank-bride",
      bankName: "Techcombank (Ngân hàng Kỹ Thương)",
      accountNumber: "19038475620019",
      accountHolder: "LE THAO VY",
      branch: "Chi nhánh Sài Gòn",
      qrCodeUrl: "https://api.vietqr.io/image/970407-19038475620019-compact2.png?accountName=LE%20THAO%20VY&amount=0&addInfo=Mung%20cuoi%20Quan%20Vy",
      ownerType: "bride",
      ownerTitle: "Mừng Cưới Cô Dâu (Nhà Gái)"
    }
  ],
  dressCode: {
    title: "Trang Phục Gợi Ý (Dress Code)",
    description: "Để những bức hình kỷ niệm thêm phần hài hòa và trang nhã, cô dâu & chú rể khuyến khích quý khách ưu tiên các gam màu sau:",
    colors: [
      { name: "Beige & Champagne", hex: "#EAD7C5" },
      { name: "Dusty Rose (Hồng Pastel)", hex: "#D4A5A5" },
      { name: "Sage Green (Xanh Xô Thơm)", hex: "#9EAA94" },
      { name: "Warm White / Kem", hex: "#F5EFEB" },
      { name: "Navy / Đen Lịch Lãm", hex: "#2C3E50" }
    ],
    notes: [
      "Quý khách vui lòng hạn chế mặc trang phục thuần màu đỏ rực hoặc trang phục phong cách thể thao.",
      "Không gian sảnh tiệc có điều hòa mát mẻ, trang phục lịch sự sang trọng.",
      "Địa điểm có bãi giữ xe ô tô và xe máy rộng rãi, có nhân viên hướng dẫn tận tình."
    ]
  }
};

export const initialWishes: GuestWish[] = [
  {
    id: "wish-1",
    name: "Hoàng Long & Minh Thư",
    relation: "Bạn thân Đại học",
    message: "Chúc mừng hai bạn thân yêu của mình! Nhìn hai bạn từ những ngày đầu bên nhau đến hôm nay thật sự xúc động. Chúc đôi bạn trăm năm hạnh phúc, sớm đón thiên thần nhỏ nhé!",
    createdAt: "Vừa xong",
    avatarColor: "bg-rose-100 text-rose-700"
  },
  {
    id: "wish-2",
    name: "Anh Tuấn & Chị Lan",
    relation: "Đồng nghiệp chú rể",
    message: "Chúc Quân và Vy một khởi đầu mới tràn ngập tiếng cười, tài lộc dồi dào và luôn giữ được ngọn lửa tình yêu nồng thắm như ngày đầu!",
    createdAt: "15 phút trước",
    avatarColor: "bg-amber-100 text-amber-700"
  },
  {
    id: "wish-3",
    name: "Huyền Trang",
    relation: "Bạn cô dâu",
    message: "Cô dâu của tớ hôm nay xinh đẹp tuyệt trần! Mong anh Quân sẽ luôn yêu thương, chiều chuộng và chăm sóc bạn thân của em thật chu đáo nhé. Hẹn gặp hai bạn tại GEM Center!",
    createdAt: "1 giờ trước",
    avatarColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "wish-4",
    name: "Bác Hùng & Bác Mai",
    relation: "Người thân gia đình",
    message: "Chúc hai cháu vạn sự như ý, răng long đầu bạc, thuận vợ thuận chồng tát biển đông cũng cạn!",
    createdAt: "3 giờ trước",
    avatarColor: "bg-indigo-100 text-indigo-700"
  }
];

export const wishTemplates: string[] = [
  "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long, mãi mãi thấu hiểu và yêu thương nhau như ngày đầu!",
  "Chúc mừng tân lang tân nương! Chúc hai bạn xây dựng một tổ ấm ngập tràn niềm vui, tiếng cười và may mắn!",
  "Chúc cô dâu chú rể sớm có quý tử/công chúa, công việc hanh thông, tài lộc dồi dào và vạn sự như ý!",
  "Thật hạnh phúc khi được chứng kiến ngày vui của hai bạn. Chúc tình yêu của hai bạn luôn ngọt ngào như thuở ban đầu!",
  "Gửi ngàn lời chúc phúc tốt đẹp nhất đến cặp đôi hoàn hảo nhất ngày hôm nay!"
];
