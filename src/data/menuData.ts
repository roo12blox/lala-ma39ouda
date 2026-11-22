export type MenuCategory =
  | 'all'
  | 'maakouda'
  | 'bowls'
  | 'panini_pizza'
  | 'desserts'
  | 'boissons';

export type Language = 'fr' | 'dar';

export interface MenuItem {
  id: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: { fr: string; dar: string };
  name: { fr: string; dar: string };
  description: { fr: string; dar: string };
  price: number;
  image: string;
  imageFocus?: 'full' | 'panini' | 'pizza';
  tag?: { fr: string; dar: string };
  sauces: string[];
  prepTime: string;
  glovoPopular?: boolean;
}

export interface GlovoZone {
  id: string;
  name: string;
  eta: string;
  fee: number;
}

export interface BusyHourSlot {
  hour: string;
  level: number; // 0 to 100
  label: { fr: string; dar: string };
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  tag: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_maakouda_spread_1795319478097.jpg';
export const BRAND_LOGO_URL = '/src/assets/images/lalla_chef_emblem_1795320452506.jpg';

export const MENU_CATEGORIES: { id: MenuCategory; label: { fr: string; dar: string } }[] = [
  { id: 'all', label: { fr: 'Tout le Menu', dar: 'كلشي' } },
  { id: 'maakouda', label: { fr: 'Ma39ouda', dar: 'معقودة' } },
  { id: 'bowls', label: { fr: 'Chicken Bowls', dar: 'تشيكن بول' } },
  { id: 'panini_pizza', label: { fr: 'Panini & Pizza', dar: 'بانيني و بيتزا' } },
  { id: 'desserts', label: { fr: 'Qechtouta', dar: 'قشطوطة' } },
  { id: 'boissons', label: { fr: 'Frites & Boissons', dar: 'فريت و مشروبات' } },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'crispy-chicken-bowl',
    category: 'bowls',
    categoryLabel: { fr: 'Chicken Bowl', dar: 'تشيكن بول' },
    name: { fr: 'Crispy Fried Chicken Bowl', dar: 'كريسبي تشيكن بول' },
    description: {
      fr: 'Aiguillettes de poulet pané croustillant sur riz parfumé, frites dorées, chou croquant et sauce blanche maison.',
      dar: 'دجاج مقرمش فوق الروز المتبل، فريت مقرمش، سلاطة و صوص بلونش ديال الدار.',
    },
    price: 38,
    image: '/src/assets/images/dish_crispy_chicken_bowl_1795319478677.jpg',
    imageFocus: 'full',
    tag: { fr: 'Plat populaire', dar: 'الأكثر طلباً' },
    sauces: ['Sauce Blanche', 'Algérienne', 'Samouraï', 'Harissa Douce'],
    prepTime: '12 min',
    glovoPopular: true,
  },
  {
    id: 'maakouda-sandwich-classique',
    category: 'maakouda',
    categoryLabel: { fr: 'Spécialité Ma39ouda', dar: 'سندويتش معقودة' },
    name: { fr: 'Sandwich Ma39ouda Authentique', dar: 'سندويتش معقودة لالة' },
    description: {
      fr: 'Galettes de pommes de terre aux épices marocaines et persil, pain croustillant, salade, tomates et harissa maison.',
      dar: 'معقودة مقرمشة بالتوابل المغربية، خبز سخون، مطيشة، خص و هريسة حارة.',
    },
    price: 12,
    image: '/src/assets/images/dish_maakouda_classic_1795319478270.jpg',
    imageFocus: 'full',
    tag: { fr: 'Signature', dar: 'سبيسيال الدار' },
    sauces: ['Harissa Maison', 'Sauce Tomate Épicée', 'Mayonnaise', 'Sans sauce'],
    prepTime: '8 min',
    glovoPopular: true,
  },
  {
    id: 'maakouda-assiette-box',
    category: 'maakouda',
    categoryLabel: { fr: 'Spécialité Ma39ouda', dar: 'بوكس معقودة' },
    name: { fr: 'Box 6 Ma39ouda Dorées', dar: 'بوكس 6 حبات معقودة' },
    description: {
      fr: 'Six galettes de Ma39ouda frites à la commande, servies chaudes avec double sauce harissa et aïoli aux herbes.',
      dar: 'ستة حبات معقودة مقلية طرية، كتقدم سخونة مع صوص هريسة و صوص بالأعشاب.',
    },
    price: 15,
    image: '/src/assets/images/dish_maakouda_classic_1795319478270.jpg',
    imageFocus: 'full',
    sauces: ['Harissa + Aïoli', 'Algérienne', 'Ketchup & Mayo'],
    prepTime: '8 min',
  },
  {
    id: 'maakouda-fromage-thon',
    category: 'maakouda',
    categoryLabel: { fr: 'Spécialité Ma39ouda', dar: 'معقودة بالطون و الفرماج' },
    name: { fr: 'Sandwich Ma39ouda Thon & Fromage', dar: 'سندويتش معقودة طون و فرماج' },
    description: {
      fr: 'Notre Ma39ouda signature garnie de thon émietté, fromage fondant, œuf et sauce pimentée au choix.',
      dar: 'معقودة عامرة بالطون، فرماج دايب، بيض مسلوق و صوص على حساب الاختيار.',
    },
    price: 18,
    image: '/src/assets/images/dish_maakouda_classic_1795319478270.jpg',
    imageFocus: 'full',
    sauces: ['Harissa Maison', 'Algérienne', 'Andalouse'],
    prepTime: '10 min',
  },
  {
    id: 'panini-poulet-mozzarella',
    category: 'panini_pizza',
    categoryLabel: { fr: 'Panini Grillé', dar: 'بانيني' },
    name: { fr: 'Panini Poulet & Mozzarella', dar: 'بانيني دجاج و موزاريلا' },
    description: {
      fr: 'Émincé de poulet mariné grillé sur place, mozzarella fondante, basilic frais et pain pressé doré.',
      dar: 'دجاج مشوي متبل، موزاريلا دايبة، و خبز بانيني محمر مزيان.',
    },
    price: 25,
    image: '/src/assets/images/dish_panini_pizza_1795319479533.jpg',
    imageFocus: 'panini',
    tag: { fr: 'Fait minute', dar: 'كيطيب فالوقت' },
    sauces: ['Sauce Blanche', 'Algérienne', 'Biggy', 'Harissa'],
    prepTime: '10 min',
    glovoPopular: true,
  },
  {
    id: 'panini-mixte-viande',
    category: 'panini_pizza',
    categoryLabel: { fr: 'Panini Grillé', dar: 'بانيني ميكست' },
    name: { fr: 'Panini Mixte Kefta & Poulet', dar: 'بانيني ميكست كفتة و دجاج' },
    description: {
      fr: 'Double garniture généreuse viande hachée assaisonnée et poulet mariné, cheddar fondant et poivrons grillés.',
      dar: 'بانيني عامر بالكفتة و الدجاج المشوي، فرماج شيدار و فلفلة مشوية.',
    },
    price: 30,
    image: '/src/assets/images/dish_panini_pizza_1795319479533.jpg',
    imageFocus: 'panini',
    sauces: ['Algérienne', 'Samouraï', 'Sauce Fromagère'],
    prepTime: '12 min',
  },
  {
    id: 'pizza-margherita-artisanale',
    category: 'panini_pizza',
    categoryLabel: { fr: 'Pizza Fraîche', dar: 'بيتزا' },
    name: { fr: 'Pizza Margherita Mozzarella', dar: 'بيتزا مارغريتا موزاريلا' },
    description: {
      fr: 'Pâte pétrie chaque matin, sauce tomate aux herbes, vraie mozzarella fondante, origan et basilic frais.',
      dar: 'عجينة مخدومة كل صباح، صوص طوماط بالأعشاب، موزاريلا و زعيترة.',
    },
    price: 30,
    image: '/src/assets/images/dish_panini_pizza_1795319479533.jpg',
    imageFocus: 'pizza',
    sauces: ['Huile pimentée', 'Origan & Ail', 'Sans supplément'],
    prepTime: '15 min',
  },
  {
    id: 'pizza-poulet-creme',
    category: 'panini_pizza',
    categoryLabel: { fr: 'Pizza Fraîche', dar: 'بيتزا دجاج' },
    name: { fr: 'Pizza Poulet Sauce Blanche', dar: 'بيتزا دجاج صوص بلونش' },
    description: {
      fr: 'Base crème fraîche, dés de poulet rôti, champignons, oignons caramélisés et double mozzarella.',
      dar: 'كريمة طرية، طريفات الدجاج مشوي، شومبينيون، بصلة معسلة و موزاريلا.',
    },
    price: 42,
    image: '/src/assets/images/dish_panini_pizza_1795319479533.jpg',
    imageFocus: 'pizza',
    tag: { fr: 'Format Généreux', dar: 'حجم عائلي' },
    sauces: ['Huile pimentée', 'Sauce Blanche', 'Sans supplément'],
    prepTime: '16 min',
  },
  {
    id: 'qechtouta-fruits-caramel',
    category: 'desserts',
    categoryLabel: { fr: 'Dessert Qechtouta', dar: 'تحلية قشطوطة' },
    name: { fr: 'Qechtouta Mangue, Fraise & Caramel', dar: 'قشطوطة مانغا، فريز و كراميل' },
    description: {
      fr: 'Génoise moelleuse imbibée au lait vanillé, crème fouettée légère, mangue fraîche, fraises, caramel et crumble.',
      dar: 'كيكة مسقية بالحليب، كريمة خفيفة، مانغا و فريز طريين، كراميل و بسكوي مقرمش.',
    },
    price: 22,
    image: '/src/assets/images/dish_qechtouta_dessert_1795319479365.jpg',
    imageFocus: 'full',
    tag: { fr: 'Frais du jour', dar: 'طري كل نهار' },
    sauces: ['Caramel Beurre Salé', 'Chocolat Praliné', 'Miel & Amandes'],
    prepTime: '5 min',
    glovoPopular: true,
  },
  {
    id: 'qechtouta-lotus-pistache',
    category: 'desserts',
    categoryLabel: { fr: 'Dessert Qechtouta', dar: 'قشطوطة لوتس' },
    name: { fr: 'Qechtouta Spéciale Speculoos', dar: 'قشطوطة سبيسيال لوتس' },
    description: {
      fr: 'Version gourmande avec crème onctueuse, coulis de caramel spéculoos fondant et éclats de biscuits dorés.',
      dar: 'قشطوطة بالكريمة، صوص لوتس دايب و بسكوي مقرمش من الفوق.',
    },
    price: 25,
    image: '/src/assets/images/dish_qechtouta_dessert_1795319479365.jpg',
    imageFocus: 'full',
    sauces: ['Speculoos', 'Nutella', 'Caramel'],
    prepTime: '5 min',
  },
  {
    id: 'chicken-tenders-frites',
    category: 'bowls',
    categoryLabel: { fr: 'Crispy Chicken', dar: 'تندرز و فريت' },
    name: { fr: 'Crispy Chicken Tenders & Frites', dar: 'تندرز دجاج مقرمش و فريت' },
    description: {
      fr: '4 filets de poulet croustillants marinés aux épices douces, portion de frites fraîches et deux sauces.',
      dar: 'أربعة قطع دجاج مقرمش بالتوابل، فريت مقلي طري و جوج صوصات.',
    },
    price: 35,
    image: '/src/assets/images/dish_crispy_chicken_bowl_1795319478677.jpg',
    imageFocus: 'full',
    sauces: ['Honey Mustard', 'Sauce Blanche', 'Barbecue'],
    prepTime: '12 min',
  },
  {
    id: 'frites-epicees-boisson',
    category: 'boissons',
    categoryLabel: { fr: 'Frites & Boisson', dar: 'فريت و مشروب' },
    name: { fr: 'Grande Portion Frites + Soda Frais', dar: 'فريت كبير + مشروب بارد' },
    description: {
      fr: 'Frites dorées coupées sur place, assaisonnées aux herbes fines, accompagnées d’une boisson fraîche 33cl.',
      dar: 'فريت مقرمش بالأعشاب مع مشروب غازي بارد أو عصير.',
    },
    price: 16,
    image: '/src/assets/images/hero_maakouda_spread_1795319478097.jpg',
    imageFocus: 'full',
    sauces: ['Mayonnaise', 'Ketchup', 'Algérienne'],
    prepTime: '6 min',
  },
];

export const GLOVO_ZONES: GlovoZone[] = [
  { id: 'hamria', name: 'Hamria · Centre Ville', eta: '20–25 min', fee: 8 },
  { id: 'ville-nouvelle', name: 'Ville Nouvelle · Place d’Armes', eta: '20–30 min', fee: 9 },
  { id: 'marjane', name: 'Marjane · Route de Fès', eta: '25–35 min', fee: 12 },
  { id: 'bassatine', name: 'Al Bassatine · Sidi Baba', eta: '20–28 min', fee: 8 },
  { id: 'zitoune', name: 'Zitoune · Ouislane', eta: '25–35 min', fee: 11 },
  { id: 'medina', name: 'Médina · Bab Mansour', eta: '18–25 min', fee: 7 },
];

export const BUSY_HOURS: BusyHourSlot[] = [
  { hour: '09h', level: 22, label: { fr: 'Calme · Petit-déj', dar: 'هادي' } },
  { hour: '12h', level: 74, label: { fr: 'Affluence déjeuner', dar: 'الازدحام د الغدا' } },
  { hour: '15h', level: 48, label: { fr: 'Service fluide', dar: 'خفيف' } },
  { hour: '18h', level: 68, label: { fr: 'Goûter & Ma39ouda', dar: 'وقت لكوتي' } },
  { hour: '20h', level: 92, label: { fr: 'Heure de pointe', dar: 'الذروة' } },
  { hour: '22h', level: 55, label: { fr: 'Soirée & Glovo', dar: 'الليل و كلوفو' } },
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Youssef E.',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Ma39ouda croustillante à souhait et le Crispy Fried Chicken Bowl est généreux. Livraison Glovo arrivée chaude à Hamria.',
    tag: 'Sur place & Glovo',
  },
  {
    id: 'rev-2',
    author: 'Salma B.',
    rating: 4,
    date: 'Il y a 3 semaines',
    comment: 'La Qechtouta mangue-fraise est vraiment fraîche, bon rapport qualité-prix pour 1–50 MAD à Meknès.',
    tag: 'Dessert Qechtouta',
  },
  {
    id: 'rev-3',
    author: 'Amine K.',
    rating: 4,
    date: 'Il y a 1 mois',
    comment: 'Bon snack pour un passage rapide près de VC5J+V7. Panini poulet mozzarella bien grillé quand on commande en dehors du rush de 20h.',
    tag: 'Vente à emporter',
  },
];
