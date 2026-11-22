import { BRAND_LOGO_URL } from '../data/menuData';

export function BrandLogoLockup() {
  return (
    <div
      dir="rtl"
      className="inline-flex items-center justify-between gap-4 sm:gap-6 px-5 py-3.5 rounded-2xl bg-[#1B1D21] border border-white/12 shadow-xl max-w-full"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#1B1D21] shrink-0">
        <img
          src={BRAND_LOGO_URL}
          alt="Logo chef Lalla ma39ouda"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-[1.28]"
        />
      </div>

      <div className="flex flex-col items-start min-w-0">
        <span
          className="font-arabic font-extrabold text-[#FF5900] leading-none tracking-tight select-none"
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            textShadow: '0 3px 0 rgba(0, 0, 0, 0.85)',
          }}
        >
          لالة معقودة
        </span>
        <span
          className="font-arabic font-bold text-white text-sm sm:text-base mt-1.5 tracking-wide"
          style={{
            textShadow: '0 2px 0 rgba(0, 0, 0, 0.7)',
          }}
        >
          أرى بـــــــراع
        </span>
      </div>
    </div>
  );
}
