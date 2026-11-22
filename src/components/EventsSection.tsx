import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { WeddingEvent } from '../types';

interface EventsSectionProps {
  events: WeddingEvent[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [activeMapModal, setActiveMapModal] = useState<WeddingEvent | null>(null);

  const handleAddToCalendar = (event: WeddingEvent) => {
    const title = encodeURIComponent(event.calendarTitle);
    const details = encodeURIComponent(`Trân trọng kính mời quý khách tham dự ${event.title} tại ${event.venueName}. Địa chỉ: ${event.address}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);

    // Parse date & time
    const startDateTime = new Date(`${event.date}T${event.time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 3.5 * 60 * 60 * 1000);

    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatCalDate(startDateTime)}/${formatCalDate(endDateTime)}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section id="events" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-8 bg-[#C4A48A]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D58] font-sans-clean font-semibold">
            Thời Gian & Địa Điểm
          </span>
          <span className="h-px w-8 bg-[#C4A48A]" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2F2620] mb-4">
          Sự Kiện Hôn Lễ
        </h2>
        <div className="w-16 h-0.5 bg-[#C4A48A] mx-auto mb-6" />
        <p className="text-base sm:text-lg text-[#6B5749] font-cormorant italic">
          "Sự hiện diện và lời chúc phúc của quý khách là niềm vinh hạnh to lớn cho gia đình chúng tôi."
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div
              key={event.id}
              id={`event-card-${event.id}`}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#EADBCC] flex flex-col justify-between relative overflow-hidden"
            >
              {/* Event Header Banner */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-[#F0E6DC]">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#F4EDE4] text-[#7A5B45] text-xs font-semibold uppercase tracking-wider">
                    {event.side}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#8C6D58] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#2F2620] font-bold mb-2">
                  {event.title}
                </h3>

                {/* Date & Time Highlights */}
                <div className="bg-[#FAF7F2] rounded-2xl p-4 my-4 border border-[#EFE5DA] space-y-2">
                  <div className="flex items-start gap-2.5 text-sm text-[#4A3B30]">
                    <Calendar className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold capitalize text-[#2F2620]">{formattedDate}</p>
                      <p className="text-xs text-[#8C7665] font-cormorant italic mt-0.5">({event.lunarDate})</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-sm text-[#4A3B30]">
                    <MapPin className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2F2620]">{event.venueName}</p>
                      <p className="text-xs text-[#6B5749] mt-0.5">{event.address}</p>
                    </div>
                  </div>
                </div>

                {/* Schedule timeline */}
                <div className="mt-6 mb-6">
                  <h4 className="text-xs font-sans-clean font-bold uppercase tracking-wider text-[#8C6D58] mb-3">
                    Lịch Trình Chi Tiết
                  </h4>
                  <div className="space-y-2.5">
                    {event.schedule.map((item, sIndex) => (
                      <div
                        key={sIndex}
                        className="flex items-center gap-3 text-sm p-2 rounded-xl bg-[#FAF8F5] border border-[#F2ECE4]"
                      >
                        <span className="px-2 py-0.5 rounded-lg bg-[#EAE0D5] text-[#5C4332] text-xs font-mono font-semibold">
                          {item.time}
                        </span>
                        <span className="text-[#4A3B30] text-xs sm:text-sm font-medium">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F0E6DC] flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] py-2.5 px-3 rounded-xl bg-[#3E3228] hover:bg-[#59483B] text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E8C5A5]" />
                  <span>Chỉ Đường Google Maps</span>
                </a>

                <button
                  onClick={() => handleAddToCalendar(event)}
                  className="py-2.5 px-3 rounded-xl bg-[#F4EDE4] hover:bg-[#EBD8C5] text-[#5C4332] text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                  title="Thêm sự kiện vào Google Calendar"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Thêm Vào Lịch</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
