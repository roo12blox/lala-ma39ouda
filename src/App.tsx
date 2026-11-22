import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  Truck,
} from 'lucide-react';
import { BrandLogoLockup } from './components/BrandLogoLockup';
import { BusyHoursChart } from './components/BusyHoursChart';
import { CartDrawer, CartEntry } from './components/CartDrawer';
import { DishImage } from './components/DishImage';
import { DishModal } from './components/DishModal';
import { Navbar } from './components/Navbar';
import {
  BRAND_LOGO_URL,
  CustomerReview,
  GLOVO_ZONES,
  HERO_IMAGE,
  INITIAL_REVIEWS,
  Language,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from './data/menuData';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(GLOVO_ZONES[0].id);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const inName =
        item.name.fr.toLowerCase().includes(q) || item.name.dar.toLowerCase().includes(q);
      const inDesc =
        item.description.fr.toLowerCase().includes(q) ||
        item.description.dar.toLowerCase().includes(q);
      return matchesCat && (inName || inDesc);
    });
  }, [activeCategory, searchQuery]);

  const totalCartCount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries]
  );

  const selectedZone = useMemo(
    () => GLOVO_ZONES.find((z) => z.id === selectedZoneId) || GLOVO_ZONES[0],
    [selectedZoneId]
  );

  const handleAddToCart = (item: MenuItem, sauce: string, quantity = 1) => {
    const key = `${item.id}__${sauce}`;
    setCartEntries((prev) => {
      const existing = prev.find((e) => e.key === key);
      if (existing) {
        return prev.map((e) =>
          e.key === key ? { ...e, quantity: e.quantity + quantity } : e
        );
      }
      return [...prev, { key, item, sauce, quantity }];
    });

    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartEntries((prev) =>
      prev
        .map((e) => (e.key === key ? { ...e, quantity: e.quantity + delta } : e))
        .filter((e) => e.quantity > 0)
    );
  };

  const handleRemoveEntry = (key: string) => {
    setCartEntries((prev) => prev.filter((e) => e.key !== key));
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: lang === 'fr' ? "À l'instant" : 'دابا',
      comment: reviewComment.trim(),
      tag: lang === 'fr' ? 'Avis client' : 'رأي زبون',
    };
    setReviews((prev) => [newRev, ...prev]);
    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    window.setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div
      dir={lang === 'dar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#16181B] text-[#F5F5F4]"
    >
      <Navbar
        lang={lang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Hero & Storefront Sign Lockup */}
        <section id="presentation" className="border-b border-white/10 bg-[#1B1D21]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between gap-7">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <p className="text-xs font-medium text-[#B0B4BC]">
                      Meknès (VC5J+V7) · 1–50 MAD ·{' '}
                      {lang === 'fr' ? 'Ouvert dès 09:00' : 'مفتوح من 09:00'}
                    </p>
                    <div
                      className="inline-flex items-center p-0.5 rounded-lg bg-[#26292F] border border-white/10"
                      role="group"
                      aria-label="Choisir la langue"
                    >
                      <button
                        type="button"
                        onClick={() => setLang('fr')}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          lang === 'fr'
                            ? 'bg-[#FF5900] text-white'
                            : 'text-[#B0B4BC] hover:text-white'
                        }`}
                      >
                        FR
                      </button>
                      <button
                        type="button"
                        onClick={() => setLang('dar')}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer font-arabic ${
                          lang === 'dar'
                            ? 'bg-[#FF5900] text-white'
                            : 'text-[#B0B4BC] hover:text-white'
                        }`}
                      >
                        الدارجة
                      </button>
                    </div>
                  </div>

                  {/* Recreated Storefront Sign & Logo Lockup */}
                  <div className="mb-6">
                    <BrandLogoLockup />
                  </div>

                  <h1
                    className="font-display font-extrabold tracking-tight text-white leading-[1.06] max-w-2xl"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {lang === 'fr'
                      ? 'Ma39ouda dorée, Crispy Bowls & Street-Food à Meknès.'
                      : 'معقودة مقرمشة، تشيكن بول و أكلات سريعة في مكناس.'}
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-[#B8BCC4] leading-relaxed max-w-xl">
                    {lang === 'fr'
                      ? 'Galettes de Ma39ouda préparées minute, Crispy Fried Chicken Bowl, paninis grillés, pizzas et desserts Qechtouta. Sur place, à emporter ou livré chez vous via Glovo.'
                      : 'معقودة سخونة ومقرمشة، كريسبي تشيكن بول، بانيني، بيتزا و تحلية قشطوطة. فالمحل، أمبورتي أو توصيل سريع مع كلوفو.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#FF5900] text-white text-sm font-semibold hover:bg-[#E04E00] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>{lang === 'fr' ? 'Voir le Menu' : 'شوف المينيو'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#glovo"
                    className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#FFC244] text-[#141413] text-sm font-bold hover:bg-[#F5B731] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                  >
                    <Truck className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {lang === 'fr' ? 'Livraison Glovo' : 'التوصيل عبر كلوفو'}
                    </span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[280px] sm:min-h-[380px] rounded-2xl overflow-hidden bg-[#121417] border border-white/10">
                  <DishImage
                    src={HERO_IMAGE}
                    alt="Assortiment Lalla ma39ouda : Ma39ouda dorée, Crispy Fried Chicken Bowl et Panini grillé"
                    className="lg:h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-xs font-semibold text-[#FF5900] font-arabic">
                        لالة معقودة · أرى براع
                      </p>
                      <p className="font-display text-base sm:text-lg font-bold">
                        Ma39ouda · Crispy Bowl · Panini · Qechtouta
                      </p>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#FFC244] whitespace-nowrap shrink-0">
                      1–50 MAD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Storefront Info Strip */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-[#A3A7B0] font-medium">
                  {lang === 'fr' ? 'Budget moyen' : 'الثمن المتوسط'}
                </p>
                <p className="font-display text-lg font-bold text-white mt-1 tabular-nums">
                  1–50 MAD / pers.
                </p>
              </div>
              <div>
                <p className="text-xs text-[#A3A7B0] font-medium">
                  {lang === 'fr' ? 'Heures d’ouverture' : 'أوقات العمل'}
                </p>
                <p className="font-display text-lg font-bold text-white mt-1 tabular-nums">
                  09:00 – 23:30
                </p>
              </div>
              <div>
                <p className="text-xs text-[#A3A7B0] font-medium">
                  {lang === 'fr' ? 'Modes de service' : 'الخدمات'}
                </p>
                <p className="font-display text-base sm:text-lg font-bold text-white mt-1">
                  {lang === 'fr'
                    ? 'Sur place · Emporter · Glovo'
                    : 'فالمحل · أمبورتي · كلوفو'}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#A3A7B0] font-medium">
                  {lang === 'fr' ? 'Contact direct' : 'الهاتف المباشر'}
                </p>
                <a
                  href="tel:+212702847558"
                  className="inline-block font-display text-lg font-bold text-[#FF5900] hover:text-[#FF7A33] transition-colors mt-1 tabular-nums"
                >
                  07 02 84 75 58
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Menu Grid */}
        <section id="menu" className="py-14 lg:py-20 bg-[#16181B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5900]">
                  {lang === 'fr' ? 'La Carte · Restauration rapide' : 'المينيو · أكلات سريعة'}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1.5">
                  {lang === 'fr' ? 'Le Menu Lalla ma39ouda' : 'قائمة الأطباق'}
                </h2>
              </div>

              <div className="relative w-full md:w-72">
                <Search
                  className="w-4 h-4 text-[#A3A7B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Rechercher (Ma39ouda, Bowl, Panini...)'
                      : 'قلب على معقودة، بول، بانيني...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/12 bg-[#1F2227] text-sm text-white placeholder:text-[#7E838E] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-white/10">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 min-h-[40px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5900] text-white'
                        : 'bg-[#22252A] text-[#B8BCC4] hover:bg-[#2C3037] hover:text-white'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                );
              })}
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-[#1F2227] border border-white/10 rounded-2xl p-12 text-center">
                <p className="font-display text-lg font-bold text-white">
                  {lang === 'fr' ? 'Aucun plat trouvé' : 'ما لقينا حتى طبق'}
                </p>
                <p className="text-sm text-[#A3A7B0] mt-1">
                  {lang === 'fr'
                    ? 'Essayez une autre recherche ou réinitialisez le filtre.'
                    : 'بدل البحث أو رجع لكلشي.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#FF5900] text-white text-xs font-semibold cursor-pointer"
                >
                  {lang === 'fr' ? 'Afficher tout le menu' : 'عرض المينيو كامل'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredItems.map((item) => {
                  const isAdded = recentlyAddedId === item.id;
                  return (
                    <article
                      key={item.id}
                      className="group bg-[#1F2227] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF5900]/45"
                    >
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedDish(item)}
                          className="w-full block aspect-[4/3] bg-[#141619] overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5900]"
                        >
                          <div className="w-full h-full transition-transform duration-200 group-hover:scale-[1.03]">
                            <DishImage
                              src={item.image}
                              alt={item.name[lang]}
                              focus={item.imageFocus}
                            />
                          </div>
                        </button>

                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between gap-2 text-xs text-[#A3A7B0]">
                            <span className="uppercase tracking-wider font-medium">
                              {item.categoryLabel[lang]}
                            </span>
                            {item.tag && (
                              <span className="font-semibold text-[#FF5900]">
                                {item.tag[lang]}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedDish(item)}
                            className="text-left w-full mt-1.5 cursor-pointer"
                          >
                            <h3 className="font-display text-lg font-bold text-white group-hover:text-[#FF5900] transition-colors">
                              {item.name[lang]}
                            </h3>
                          </button>

                          <p className="text-sm text-[#B0B4BC] mt-1.5 leading-relaxed line-clamp-2">
                            {item.description[lang]}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-3 flex items-center justify-between gap-3 border-t border-white/[0.07] mt-2">
                        <div>
                          <span className="font-display text-lg font-bold text-[#FF5900] tabular-nums">
                            {item.price} MAD
                          </span>
                          <span className="text-xs text-[#A3A7B0] ml-2">
                            · {item.prepTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedDish(item)}
                            className="px-3 py-2 min-h-[40px] rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            {lang === 'fr' ? 'Options' : 'اختيارات'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(item, item.sauces[0] || 'Standard', 1)
                            }
                            className={`inline-flex items-center gap-1 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-[#00A082] text-white'
                                : 'bg-[#FF5900] text-white hover:bg-[#E04E00]'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>
                              {isAdded
                                ? lang === 'fr'
                                  ? 'Ajouté'
                                  : 'تزاد'
                                : lang === 'fr'
                                ? 'Ajouter'
                                : 'أضف'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Dedicated Glovo Delivery Integration */}
        <section id="glovo" className="bg-[#111315] border-y border-white/10 text-[#F5F5F4] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFC244]">
                  {lang === 'fr'
                    ? 'Partenaire Livraison · Meknès'
                    : 'التوصيل السريع · مكناس'}
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {lang === 'fr'
                    ? 'Livraison chaude chez vous avec Glovo.'
                    : 'الماكلة توصل سخونة لباب الدار مع كلوفو.'}
                </h2>
                <p className="text-sm sm:text-base text-[#B8BCC4] leading-relaxed max-w-xl">
                  {lang === 'fr'
                    ? 'Commandez vos Ma39ouda, Crispy Fried Chicken Bowls, Paninis et Qechtouta directement depuis notre carte ou sur l’application Glovo Meknès. Emballage thermique séparé pour garder les frites et la Ma39ouda croustillantes.'
                    : 'طلب المعقودة، تشيكن بول، بانيني و قشطوطة مباشرة من هنا أو عبر تطبيق كلوفو مكناس. تغليف محافظ على السخونية و القرمشة.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#1B1E22] border border-white/10 rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#FF5900]">01. Choix du menu</p>
                    <p className="text-xs text-[#B8BCC4] mt-1.5 leading-relaxed">
                      {lang === 'fr'
                        ? 'Sélectionnez vos plats et sauces maison ci-dessus.'
                        : 'اختار الأطباق والصوصات لي بغيتي من المينيو.'}
                    </p>
                  </div>
                  <div className="bg-[#1B1E22] border border-white/10 rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#FF5900]">02. Quartier Meknès</p>
                    <p className="text-xs text-[#B8BCC4] mt-1.5 leading-relaxed">
                      {lang === 'fr'
                        ? 'Hamria, Ville Nouvelle, Marjane, Médina ou Bassatine.'
                        : 'حمرية، المدينة الجديدة، مرجان، المدينة أو البساتين.'}
                    </p>
                  </div>
                  <div className="bg-[#1B1E22] border border-white/10 rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#FF5900]">03. Coursier Glovo</p>
                    <p className="text-xs text-[#B8BCC4] mt-1.5 leading-relaxed">
                      {lang === 'fr'
                        ? 'Paiement en espèces à la porte ou par carte.'
                        : 'الخلاص كاش عند التوصيل أو بالكارط.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#FFC244] text-[#141413] text-sm font-bold hover:bg-[#F5B731] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {lang === 'fr'
                        ? `Commander en livraison${totalCartCount > 0 ? ` (${totalCartCount})` : ''}`
                        : `أكد التوصيل عبر كلوفو${totalCartCount > 0 ? ` (${totalCartCount})` : ''}`}
                    </span>
                  </button>

                  <a
                    href="https://glovoapp.com/ma/fr/meknes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{lang === 'fr' ? 'Ouvrir Glovo Meknès' : 'افتح تطبيق كلوفو'}</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Interactive Meknes Zone Estimator */}
              <div className="lg:col-span-6 bg-[#1B1E22] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {lang === 'fr'
                        ? 'Zones de livraison Glovo à Meknès'
                        : 'مناطق التوصيل في مكناس'}
                    </h3>
                    <p className="text-xs text-[#A3A7B0] mt-1">
                      {lang === 'fr'
                        ? 'Départ : Lalla ma39ouda (VC5J+V7 Meknès)'
                        : 'الانطلاق : لالة معقودة مكناس'}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#00A082] whitespace-nowrap shrink-0">
                    Glovo Express
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GLOVO_ZONES.map((zone) => {
                    const active = zone.id === selectedZoneId;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#FFC244] text-[#141413] border-[#FFC244]'
                            : 'bg-[#141619] text-white border-white/10 hover:border-white/25'
                        }`}
                      >
                        <p className="text-sm font-bold truncate">{zone.name}</p>
                        <p
                          className={`text-xs mt-1 tabular-nums ${
                            active ? 'text-[#141413]/80 font-medium' : 'text-[#A3A7B0]'
                          }`}
                        >
                          {zone.eta} · {zone.fee} MAD
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#141619] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 border border-white/10">
                  <div>
                    <p className="text-xs text-[#A3A7B0]">
                      {lang === 'fr' ? 'Quartier sélectionné' : 'الحي المختار'}
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {selectedZone.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 tabular-nums">
                    <div>
                      <p className="text-xs text-[#A3A7B0]">
                        {lang === 'fr' ? 'Délai estimé' : 'الوقت'}
                      </p>
                      <p className="text-sm font-bold text-[#FFC244] mt-0.5">
                        {selectedZone.eta}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A7B0]">
                        {lang === 'fr' ? 'Frais Glovo' : 'التوصيل'}
                      </p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {selectedZone.fee} MAD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Localisation, Horaires d'Affluence & Avis */}
        <section id="infos" className="py-14 lg:py-20 bg-[#16181B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5900]">
                {lang === 'fr' ? 'À propos & Accès' : 'معلومات و الموقع'}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1.5">
                {lang === 'fr'
                  ? 'Nous trouver à Meknès'
                  : 'فين تلقانا في مكناس'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Location Details & Busy Hours */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#1F2227] border border-white/10 rounded-xl p-6 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#FF5900] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        Lalla ma39ouda · لالة معقودة
                      </p>
                      <p className="text-sm text-[#B0B4BC] mt-0.5">
                        Unnamed Road, Meknès · Plus Code : VC5J+V7 Meknès
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-white shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {lang === 'fr' ? 'Ouvert à 09:00' : 'مفتوح مع 09:00'}
                      </p>
                      <p className="text-sm text-[#B0B4BC] mt-0.5">
                        {lang === 'fr'
                          ? 'Tous les jours de 09:00 à 23:30 · Sur place, à emporter & livraison'
                          : 'كل يوم من 09:00 لـ 23:30 · فالمحل، أمبورتي و توصيل'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#FF5900] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-white tabular-nums">
                        07 02 84 75 58
                      </p>
                      <p className="text-sm text-[#B0B4BC] mt-0.5">
                        {lang === 'fr'
                          ? 'Commandes à emporter & suivi direct'
                          : 'لطلبات الاستلام من المحل'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=VC5J%2BV7+Meknes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg bg-[#FF5900] text-white text-xs font-semibold hover:bg-[#E04E00] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{lang === 'fr' ? 'Itinéraire Maps' : 'خريطة كوكل'}</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href="tel:+212702847558"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg border border-white/15 bg-[#16181B] text-white text-xs font-semibold hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{lang === 'fr' ? 'Appeler' : 'اتصل الآن'}</span>
                    </a>
                  </div>
                </div>

                <BusyHoursChart lang={lang} />
              </div>

              {/* Right: Customer Feedback & Leave a Review */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#1F2227] border border-white/10 rounded-xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {lang === 'fr' ? 'Avis & Retours Clients' : 'آراء الزبناء'}
                      </h3>
                      <p className="text-xs text-[#A3A7B0] mt-0.5">
                        {lang === 'fr'
                          ? 'Votre avis nous aide à améliorer la qualité et la rapidité de livraison.'
                          : 'رأيك كيعاوننا نحسنو الجودة و سرعة التوصيل.'}
                      </p>
                    </div>
                    <div className="text-right tabular-nums">
                      <span className="font-display text-xl font-bold text-[#FF5900]">
                        1–50 MAD
                      </span>
                      <p className="text-xs text-[#A3A7B0]">Meknès</p>
                    </div>
                  </div>

                  <div className="divide-y divide-white/[0.08]">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="py-4 first:pt-5 last:pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-white">{rev.author}</span>
                            <span className="text-[#A3A7B0]" aria-hidden="true">·</span>
                            <span className="text-xs text-[#A3A7B0]">{rev.tag}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? 'fill-[#FFC244] text-[#FFC244]' : 'text-white/15'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#B8BCC4] mt-1.5 leading-relaxed">
                          {rev.comment}
                        </p>
                        <p className="text-xs text-[#8D929C] mt-1">{rev.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write Review Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-[#1F2227] border border-white/10 rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-white">
                      {lang === 'fr' ? 'Rédiger un avis' : 'كتب رأيك'}
                    </h4>
                    <div className="flex items-center gap-1" role="group" aria-label="Note sur 5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          aria-label={`${star} étoiles`}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              star <= reviewRating
                                ? 'fill-[#FFC244] text-[#FFC244]'
                                : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder={lang === 'fr' ? 'Votre prénom' : 'الاسم ديالك'}
                      required
                      className="sm:col-span-1 rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white placeholder:text-[#7E838E] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                    />
                    <input
                      type="text"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={
                        lang === 'fr'
                          ? 'Partagez votre expérience (plat, service, Glovo)...'
                          : 'شاركنا تجربتك مع الأكل و التوصيل...'
                      }
                      required
                      className="sm:col-span-2 rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white placeholder:text-[#7E838E] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-[#00A082] font-medium">
                      {reviewSubmitted
                        ? lang === 'fr'
                          ? 'Merci ! Votre avis a été ajouté.'
                          : 'شكراً! تم نشر رأيك.'
                        : ''}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 min-h-[40px] rounded-lg bg-[#FF5900] text-white text-xs font-semibold hover:bg-[#E04E00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {lang === 'fr' ? 'Publier l’avis' : 'نشر الرأي'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#111315] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A3A7B0]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-9 h-9 rounded-full overflow-hidden border border-[#FF5900]/70 bg-[#1B1D21] shrink-0">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Lalla ma39ouda"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-[1.32]"
              />
            </span>
            <span className="font-display font-bold text-sm text-white">
              Lalla ma39ouda · <span className="text-[#FF5900] font-arabic">لالة معقودة</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Unnamed Road, Meknès (VC5J+V7)</span>
            <span aria-hidden="true">·</span>
            <a href="tel:+212702847558" className="hover:text-white tabular-nums">
              07 02 84 75 58
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#menu" className="hover:text-white whitespace-nowrap">
              {lang === 'fr' ? 'Menu' : 'المينيو'}
            </a>
            <a href="#glovo" className="hover:text-white whitespace-nowrap">
              {lang === 'fr' ? 'Livraison Glovo' : 'كلوفو'}
            </a>
            <a href="#infos" className="hover:text-white whitespace-nowrap">
              {lang === 'fr' ? 'Horaires' : 'الأوقات'}
            </a>
          </div>
        </div>
      </footer>

      <DishModal
        item={selectedDish}
        lang={lang}
        onClose={() => setSelectedDish(null)}
        onAdd={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        lang={lang}
        entries={cartEntries}
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveEntry}
        onClearCart={() => setCartEntries([])}
      />
    </div>
  );
}
