import { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Language, MenuItem } from '../data/menuData';
import { DishImage } from './DishImage';

interface DishModalProps {
  item: MenuItem | null;
  lang: Language;
  onClose: () => void;
  onAdd: (item: MenuItem, sauce: string, quantity: number) => void;
}

export function DishModal({ item, lang, onClose, onAdd }: DishModalProps) {
  const [selectedSauce, setSelectedSauce] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (item) {
      setSelectedSauce(item.sauces[0] || 'Standard');
      setQuantity(1);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const total = item.price * quantity;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#1F2227] border border-white/15 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 text-[#F5F5F4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-[#16181B] overflow-hidden">
          <DishImage
            src={item.image}
            alt={item.name[lang]}
            focus={item.imageFocus}
          />
        </div>

        <div className="p-6 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#FF5900]">
                {item.categoryLabel[lang]} · {item.prepTime}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label={lang === 'fr' ? 'Fermer' : 'إغلاق'}
                className="p-1.5 -m-1.5 rounded-lg text-[#A3A7B0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3
              id="dish-modal-title"
              className="font-display text-2xl font-bold text-white mt-1.5"
            >
              {item.name[lang]}
            </h3>
            <p className="text-sm text-[#B0B4BC] mt-2 leading-relaxed">
              {item.description[lang]}
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold text-white mb-2.5">
                {lang === 'fr' ? 'Sauce / Accompagnement' : 'الصوص المرافق'}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.sauces.map((sauce) => {
                  const active = selectedSauce === sauce;
                  return (
                    <button
                      key={sauce}
                      type="button"
                      onClick={() => setSelectedSauce(sauce)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#FF5900] text-white border-[#FF5900]'
                          : 'bg-[#16181B] text-[#D1D5DB] border-white/12 hover:border-white/30'
                      }`}
                    >
                      {sauce}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="inline-flex items-center border border-white/15 rounded-lg bg-[#16181B]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={lang === 'fr' ? 'Diminuer la quantité' : 'نقص الكمية'}
                className="p-2.5 text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-semibold tabular-nums text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label={lang === 'fr' ? 'Augmenter la quantité' : 'زيد الكمية'}
                className="p-2.5 text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onAdd(item, selectedSauce, quantity);
                onClose();
              }}
              className="flex-1 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#FF5900] text-white text-sm font-semibold hover:bg-[#E04E00] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer tabular-nums"
            >
              {lang === 'fr' ? `Ajouter · ${total} MAD` : `أضف · ${total} درهم`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
