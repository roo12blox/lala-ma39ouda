import { useState } from 'react';
import { BUSY_HOURS, Language } from '../data/menuData';

interface BusyHoursChartProps {
  lang: Language;
}

export function BusyHoursChart({ lang }: BusyHoursChartProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(4); // Default 20h peak
  const selected = BUSY_HOURS[selectedIndex];

  return (
    <div className="bg-[#1F2227] border border-white/10 rounded-xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {lang === 'fr' ? "Horaires d'affluence" : 'أوقات الازدحام'}
          </h3>
          <p className="text-xs text-[#A3A7B0] mt-0.5">
            {lang === 'fr'
              ? 'Meknès · Tous les jours 09:00 – 23:30'
              : 'مكناس · مفتوح يومياً 09:00 – 23:30'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-[#FF5900] tabular-nums">
            {selected.hour} · {selected.label[lang]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 items-end h-32 pt-4 border-b border-white/10 pb-2">
        {BUSY_HOURS.map((slot, idx) => {
          const isSelected = idx === selectedIndex;
          const isPeak = slot.level >= 75;
          return (
            <button
              key={slot.hour}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`${slot.hour}: ${slot.label[lang]} (${slot.level}%)`}
              className="group flex flex-col items-center justify-end h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5900] rounded-md"
            >
              <div className="w-full flex items-end justify-center h-24 px-1">
                <div
                  style={{ height: `${slot.level}%` }}
                  className={`w-full max-w-[34px] rounded-t-md transition-all duration-150 ${
                    isSelected
                      ? isPeak
                        ? 'bg-[#FF5900]'
                        : 'bg-white'
                      : isPeak
                      ? 'bg-[#FF5900]/45 group-hover:bg-[#FF5900]/80'
                      : 'bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-6 gap-3 pt-2 text-center">
        {BUSY_HOURS.map((slot, idx) => (
          <span
            key={slot.hour}
            className={`text-xs tabular-nums ${
              idx === selectedIndex ? 'font-bold text-white' : 'text-[#A3A7B0]'
            }`}
          >
            {slot.hour}
          </span>
        ))}
      </div>

      <p className="text-xs text-[#A3A7B0] mt-4">
        {selected.level >= 75
          ? lang === 'fr'
            ? 'Créneau très demandé : commandez sur Glovo ou à emporter pour éviter l’attente.'
            : 'وقت عامر بزاف: من الأحسن تطلب عبر كلوفو باش متسناش.'
          : lang === 'fr'
          ? 'Service rapide sur place et préparation immédiate (8–12 min).'
          : 'الخدمة سريعة في المحل و الطلب كيتوجد دغيا.'}
      </p>
    </div>
  );
}
