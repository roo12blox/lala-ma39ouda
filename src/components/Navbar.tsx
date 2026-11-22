import { ShoppingBag } from 'lucide-react';
import { BRAND_LOGO_URL, Language } from '../data/menuData';

interface NavbarProps {
  lang: Language;
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ lang, cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#16181B]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#presentation"
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5900] rounded-sm"
        >
          <span className="w-10 h-10 rounded-full overflow-hidden border border-[#FF5900]/70 bg-[#1B1D21] shrink-0">
            <img
              src={BRAND_LOGO_URL}
              alt="Logo Lalla ma39ouda"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-[1.32]"
            />
          </span>
          <span>Lalla ma39ouda</span>
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B0B4BC]"
        >
          <a
            href="#presentation"
            className="hover:text-white hover:underline decoration-[#FF5900] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Présentation' : 'تقديم'}
          </a>
          <a
            href="#menu"
            className="hover:text-white hover:underline decoration-[#FF5900] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Menu' : 'المينيو'}
          </a>
          <a
            href="#glovo"
            className="hover:text-white hover:underline decoration-[#FF5900] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Livraison Glovo' : 'توصيل كلوفو'}
          </a>
          <a
            href="#infos"
            className="hover:text-white hover:underline decoration-[#FF5900] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'Horaires & Accès' : 'الموقع و الأوقات'}
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#FF5900] text-white text-sm font-semibold hover:bg-[#E04E00] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              {lang === 'fr' ? 'Panier' : 'الطلبية'}
              {cartCount > 0 ? ` (${cartCount})` : ''}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
