export type Reaction = {
  emoji: string;
  label: string;
  count: number;
  active: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  description: string;
  specs: string[];
  category: string;
  group: string;
  images: string[];
  seller: string;
  sellerAvatar: string;
  badge?: string;
  badgeColor?: string;
  reactions: Reaction[];
  time: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Кроссовки Urban Runner",
    price: "12 990 ₽",
    oldPrice: "18 500 ₽",
    description: "Лёгкие беговые кроссовки с амортизирующей подошвой и дышащим верхом из сетки. Идеальны для городских пробежек и активного отдыха.",
    specs: ["Материал: сетка + TPU", "Подошва: EVA пена", "Вес: 280 г", "Размеры: 36–46"],
    category: "Обувь",
    group: "Спорт",
    images: [
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/52eb7ea8-56b7-4828-b9c0-b2fc0232cea6.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/96e5024c-3ea9-4b89-8459-860b6b1065bc.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/9ea34575-56dd-4eaf-bd84-e28aaa9c3ce8.jpg",
    ],
    seller: "SportPro",
    sellerAvatar: "SP",
    badge: "−30%",
    badgeColor: "from-pink-500 to-rose-500",
    reactions: [
      { emoji: "🔥", label: "Огонь", count: 142, active: false },
      { emoji: "❤️", label: "Люблю", count: 89, active: true },
      { emoji: "😍", label: "Восторг", count: 34, active: false },
      { emoji: "🤩", label: "Вау", count: 21, active: false },
    ],
    time: "2 мин назад",
  },
  {
    id: 2,
    name: "Наушники NeonSound Pro",
    price: "8 490 ₽",
    description: "Беспроводные наушники с активным шумоподавлением, 30 часами работы и фирменным звуком NEON. Премиальный Hi-Fi с низкими частотами.",
    specs: ["Bluetooth 5.3", "ANC — до 35 дБ", "Батарея: 30 ч", "Зарядка: USB-C 1 ч"],
    category: "Электроника",
    group: "Техника",
    images: [
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/96e5024c-3ea9-4b89-8459-860b6b1065bc.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/52eb7ea8-56b7-4828-b9c0-b2fc0232cea6.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/ce803796-4810-4767-b20f-50da6a7fd571.jpg",
    ],
    seller: "TechHub",
    sellerAvatar: "TH",
    badge: "Хит",
    badgeColor: "from-violet-500 to-purple-500",
    reactions: [
      { emoji: "🔥", label: "Огонь", count: 98, active: false },
      { emoji: "❤️", label: "Люблю", count: 67, active: false },
      { emoji: "😍", label: "Восторг", count: 45, active: false },
      { emoji: "🤩", label: "Вау", count: 12, active: false },
    ],
    time: "15 мин назад",
  },
  {
    id: 3,
    name: "Часы Luxe Edition",
    price: "34 900 ₽",
    oldPrice: "42 000 ₽",
    description: "Механические часы в корпусе из нержавеющей стали с сапфировым стеклом. Лимитированный выпуск — только 500 экземпляров по всему миру.",
    specs: ["Корпус: сталь 316L", "Стекло: сапфир", "Водозащита: 50 м", "Ремешок: кожа"],
    category: "Аксессуары",
    group: "Люкс",
    images: [
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/be745b87-f47a-45eb-b767-0dcb8f53b082.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/ce803796-4810-4767-b20f-50da6a7fd571.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/52eb7ea8-56b7-4828-b9c0-b2fc0232cea6.jpg",
    ],
    seller: "LuxeStore",
    sellerAvatar: "LS",
    badge: "Эксклюзив",
    badgeColor: "from-amber-500 to-orange-500",
    reactions: [
      { emoji: "🔥", label: "Огонь", count: 201, active: false },
      { emoji: "❤️", label: "Люблю", count: 156, active: false },
      { emoji: "😍", label: "Восторг", count: 88, active: false },
      { emoji: "🤩", label: "Вау", count: 63, active: false },
    ],
    time: "1 час назад",
  },
  {
    id: 4,
    name: "Рюкзак Explorer",
    price: "6 799 ₽",
    description: "Вместительный городской рюкзак из натуральной кожи с антивандальными молниями. Отделение для ноутбука 15\", скрытый карман.",
    specs: ["Материал: кожа + нейлон", "Объём: 25 л", "Ноутбук: до 15\"", "Вес: 850 г"],
    category: "Сумки",
    group: "Стиль",
    images: [
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/9ea34575-56dd-4eaf-bd84-e28aaa9c3ce8.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/be745b87-f47a-45eb-b767-0dcb8f53b082.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/96e5024c-3ea9-4b89-8459-860b6b1065bc.jpg",
    ],
    seller: "StyleCo",
    sellerAvatar: "SC",
    reactions: [
      { emoji: "🔥", label: "Огонь", count: 55, active: false },
      { emoji: "❤️", label: "Люблю", count: 43, active: false },
      { emoji: "😍", label: "Восторг", count: 18, active: false },
      { emoji: "🤩", label: "Вау", count: 7, active: false },
    ],
    time: "3 часа назад",
  },
  {
    id: 5,
    name: "Парфюм Crystal Noir",
    price: "9 200 ₽",
    oldPrice: "11 500 ₽",
    description: "Восточно-цветочный аромат с нотами пачули, ванили и мускуса. Стойкость — до 10 часов. Флакон ручной работы из богемского хрусталя.",
    specs: ["Объём: 50 мл", "Концентрация: EDP", "Стойкость: 8–10 ч", "Шлейф: 4–6 ч"],
    category: "Красота",
    group: "Люкс",
    images: [
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/ce803796-4810-4767-b20f-50da6a7fd571.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/be745b87-f47a-45eb-b767-0dcb8f53b082.jpg",
      "https://cdn.poehali.dev/projects/bda4db10-39f5-4159-a4db-b633d6e12c4f/files/9ea34575-56dd-4eaf-bd84-e28aaa9c3ce8.jpg",
    ],
    seller: "BeautyWorld",
    sellerAvatar: "BW",
    badge: "−20%",
    badgeColor: "from-emerald-500 to-teal-500",
    reactions: [
      { emoji: "🔥", label: "Огонь", count: 73, active: false },
      { emoji: "❤️", label: "Люблю", count: 91, active: false },
      { emoji: "😍", label: "Восторг", count: 52, active: false },
      { emoji: "🤩", label: "Вау", count: 29, active: false },
    ],
    time: "5 часов назад",
  },
];

export const CATEGORIES = ["Все", "Обувь", "Электроника", "Аксессуары", "Сумки", "Красота"];
export const GROUPS = [
  { id: "sport", name: "Спорт", icon: "⚡", count: 234, color: "from-orange-500 to-amber-500", desc: "Одежда и инвентарь для активных" },
  { id: "tech", name: "Техника", icon: "💻", count: 189, color: "from-blue-500 to-cyan-500", desc: "Гаджеты, электроника и аксессуары" },
  { id: "lux", name: "Люкс", icon: "✨", count: 97, color: "from-amber-400 to-yellow-500", desc: "Премиум бренды и эксклюзивы" },
  { id: "style", name: "Стиль", icon: "👜", count: 312, color: "from-pink-500 to-rose-500", desc: "Одежда, сумки, украшения" },
  { id: "home", name: "Дом", icon: "🏠", count: 156, color: "from-emerald-500 to-green-500", desc: "Мебель, декор, текстиль" },
  { id: "beauty", name: "Красота", icon: "💄", count: 278, color: "from-violet-500 to-purple-500", desc: "Косметика, парфюм, уход" },
];
