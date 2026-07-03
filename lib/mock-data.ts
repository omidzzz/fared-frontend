// ─── Clothes ────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  slug: string
  name: string
  nameFA: string
  sizes: string[]
  colors: { name: string; nameFA: string; hex: string }[]
  material: string
  materialFA: string
  descriptionFA: string
  price: number
  image: string
  accentColor: string
}

export const CLOTHES_PRODUCTS: Product[] = [
  { id: 'cloth-1', slug: 'mystic-abaya', name: 'Mystic Abaya', nameFA: 'عبای میستیک', image: '/images/products/clothes/luna-meditation-robe.webp', price: 1200000, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: [{ name: 'Midnight Black', nameFA: 'مشکی شب', hex: '#0a0a14' }, { name: 'Deep Purple', nameFA: 'بنفش عمیق', hex: '#2d1b4e' }, { name: 'Cosmic Navy', nameFA: 'سرمه‌ای کیهانی', hex: '#0d1b3e' }], material: '100% Premium Silk', materialFA: '۱۰۰٪ ابریشم طبیعی', descriptionFA: 'عبای میستیک با پارچه ابریشم طبیعی، طراحی شده برای زنی که قدرت درونی خود را می‌داند. جزئیات دست‌دوزی با نخ طلایی در لبه‌ها.', accentColor: 'var(--chakra-crown)' },
  { id: 'cloth-2', slug: 'celestial-wrap', name: 'Celestial Wrap', nameFA: 'شال آسمانی', image: '/images/products/clothes/luna-meditation-robe.webp', price: 650000, sizes: ['S', 'M', 'L'], colors: [{ name: 'Starlight Gold', nameFA: 'طلایی ستاره', hex: '#c9a84c' }, { name: 'Moonlight Cream', nameFA: 'کرم مهتاب', hex: '#f0ebe3' }], material: 'Cashmere & Silk Blend', materialFA: 'ترکیب کشمیر و ابریشم', descriptionFA: 'شال آسمانی از ترکیب کشمیر و ابریشم، سبک و گرم. مناسب برای مدیتیشن، یوگا و پوشش روزمره.', accentColor: 'var(--gold-accent)' },
  { id: 'cloth-3', slug: 'sacred-tunic', name: 'Sacred Tunic', nameFA: 'تونیک مقدس', image: '/images/products/clothes/luna-meditation-robe.webp', price: 890000, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: [{ name: 'Earth Brown', nameFA: 'قهوه‌ای خاک', hex: '#3d2010' }, { name: 'Forest Green', nameFA: 'سبز جنگل', hex: '#1a3d1a' }, { name: 'Desert Sand', nameFA: 'شنی صحرا', hex: '#c4a882' }], material: 'Organic Cotton', materialFA: 'پنبه ارگانیک', descriptionFA: 'تونیک مقدس از پنبه ارگانیک، راحت و نفس‌کش. طراحی فضاگیر و آزاد برای حرکت آزاد در یوگا و مدیتیشن.', accentColor: 'var(--chakra-root)' },
]

export const MOCK_CLOTHES_PRODUCTS = [
  { id: 'luna-meditation-robe', name: 'Luna Meditation Robe', price: 8800000, image: 'luna-meditation-robe.webp', colors: ['#9B59B6', '#2980B9', '#95A5A6', '#E91E8C'] },
  { id: 'sol-yoga-top', name: 'Sol Yoga Top', price: 6400000, image: 'sol-yoga-top.webp', colors: ['#F5F0E8', '#27AE60', '#95A5A6'] },
  { id: 'gaia-flow-pants', name: 'Gaia Flow Pants', price: 7200000, image: 'gaia-flow-pants.webp', colors: ['#8B6347', '#6B4C3B', '#27AE60', '#556B2F'] },
  { id: 'nova-energy-shirt', name: 'Nova Energy Shirt', price: 6800000, image: 'nova-energy-shirt.webp', colors: ['#1A237E', '#37474F', '#546E7A'] },
  { id: 'aurora-wrap-dress', name: 'Aurora Wrap Dress', price: 9600000, image: 'luna-meditation-robe.webp', colors: ['#C0392B', '#8E44AD', '#F39C12'] },
  { id: 'zenith-linen-set', name: 'Zenith Linen Set', price: 12000000, image: 'sol-yoga-top.webp', colors: ['#F5F0E8', '#D4C5A9', '#A0856C'] },
  { id: 'lotus-kimono', name: 'Lotus Kimono', price: 11000000, image: 'gaia-flow-pants.webp', colors: ['#FECB7D', '#E8A87C', '#C9A84C'] },
  { id: 'solstice-pants', name: 'Solstice Pants', price: 7800000, image: 'nova-energy-shirt.webp', colors: ['#2C3E50', '#34495E', '#7F8C8D'] },
]

export interface ClothingItem {
  id: string
  name: string
  nameFA: string
  slug: string
  price: number
  image: string
  images: string[]
  colors: string[]
}

export const MOCK_CLOTHES: ClothingItem[] = [
  { id: 'cloth-001', name: 'Mystic Robe', nameFA: 'ردای عارفانه', slug: 'mystic-robe', price: 8900000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#4a1060','#1a0a2e','#2d1b6b'] },
  { id: 'cloth-002', name: 'Moon Dress', nameFA: 'لباس ماه', slug: 'moon-dress', price: 7600000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#c8a951','#f5f0e8','#2d1b6b'] },
  { id: 'cloth-003', name: 'Shadow Kimono', nameFA: 'کیمونوی سایه', slug: 'shadow-kimono', price: 9400000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#1a0a2e','#0d0520','#4a2580'] },
  { id: 'cloth-004', name: 'Crystal Wrap', nameFA: 'شال کریستال', slug: 'crystal-wrap', price: 5800000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#7fdccb','#b8a4e8','#f5f0e8'] },
  { id: 'cloth-005', name: 'Eclipse Coat', nameFA: 'کت اکلیپس', slug: 'eclipse-coat', price: 11200000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#0d0520','#1a0a2e','#c8a951'] },
  { id: 'cloth-006', name: 'Celestial Top', nameFA: 'تاپ آسمانی', slug: 'celestial-top', price: 4500000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#4a2580','#b8a4e8','#2d1b6b'] },
  { id: 'cloth-007', name: 'Ritual Pants', nameFA: 'شلوار مراسم', slug: 'ritual-pants', price: 6700000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#1a2e1a','#0a0f0a','#7fdccb'] },
  { id: 'cloth-008', name: 'Aura Vest', nameFA: 'جلیقه اورا', slug: 'aura-vest', price: 5200000, image: '/images/products/clothes/luna-meditation-robe.webp', images: [], colors: ['#c8a951','#4a1060','#1a0a2e'] },
]

export const SHOP_CATEGORIES = [
  { handle: 'clothes', label: 'Clothes', icon: 'robe', color: '#C0392B' },
  { handle: 'stones', label: 'Stones', icon: 'crystal', color: '#2980B9' },
  { handle: 'tours', label: 'Tours', icon: 'mountain', color: '#27AE60' },
  { handle: 'candles', label: 'Candles', icon: 'candle', color: '#E67E22' },
  { handle: 'courses', label: 'Courses', icon: 'book', color: '#8E44AD' },
  { handle: 'more', label: 'More', icon: 'dots', color: '#6B6A7A' },
]

// ─── Tours ───────────────────────────────────────────────────────────────────

export type Tour = {
  id: string
  slug: string
  titleFA: string
  descriptionFA: string
  longDescriptionFA: string
  image: string
  duration: string
  durationFA: string
  location: string
  locationFA: string
  groupSize: string
  groupSizeFA: string
  price: number
  accentColor: string
  tags: string[]
  includes: string[]
  includesFA: string[]
  itinerary: {
    id: string
    dayFA: string
    titleFA: string
    descriptionFA: string
  }[]
}

export const MOCK_TOURS: Tour[] = [
  {
    id: 'tour-1',
    slug: 'iran-spiritual-journey',
    titleFA: 'سفر معنوی ایران',
    descriptionFA: 'سفری عمیق به قلب معنویت ایران باستان',
    longDescriptionFA: 'در این تور منحصربه‌فرد، به مکان‌های مقدس و انرژتیک ایران سفر می‌کنیم. از معابد آتش زرتشتی تا باغ‌های صفوی اصفهان، هر مکان داستانی از حکمت و معنویت دارد. این سفر را با مدیتیشن صبحگاهی، کار با کریستال و آیین‌های سنتی همراه می‌کنیم.',
    image: '/images/hero-backgrounds/tours-hero.webp',
    duration: '7 days',
    durationFA: '۷ روز',
    location: 'Isfahan, Yazd, Shiraz',
    locationFA: 'اصفهان، یزد، شیراز',
    groupSize: '8-12 people',
    groupSizeFA: '۸ تا ۱۲ نفر',
    price: 12500000,
    accentColor: 'var(--chakra-heart)',
    tags: ['معنوی', 'ایران', 'گروهی', 'فرهنگی'],
    includes: ['Accommodation', 'Daily meditation sessions', 'Crystal healing workshop', 'Traditional ceremonies', 'Transportation', 'Breakfast and dinner'],
    includesFA: ['اقامت در هتل‌های بوتیک', 'جلسات مدیتیشن روزانه', 'کارگاه کریستال درمانی', 'آیین‌های سنتی', 'حمل و نقل', 'صبحانه و شام'],
    itinerary: [
      { id: 'day-1', dayFA: 'روز اول', titleFA: 'ورود به اصفهان — شهر نصف جهان', descriptionFA: 'پس از ورود، در هتل بوتیک تاریخی اقامت می‌کنیم. عصر به میدان نقش جهان می‌رویم و با انرژی این مکان مقدس آشنا می‌شویم. شب با مدیتیشن گروهی روز را به پایان می‌بریم.' },
      { id: 'day-2', dayFA: 'روز دوم', titleFA: 'مساجد و باغ‌های صفوی', descriptionFA: 'صبح با مدیتیشن طلوع آفتاب شروع می‌کنیم. بازدید از مسجد امام و مسجد شیخ لطف‌الله. بعدازظهر کارگاه کریستال درمانی در باغ فین کاشان.' },
      { id: 'day-3', dayFA: 'روز سوم', titleFA: 'یزد — شهر باد و خاک', descriptionFA: 'سفر به یزد، شهر بادگیرها و آتشکده‌های زرتشتی. بازدید از آتشکده آذرگشنسب و تجربه آیین‌های زرتشتی. مدیتیشن در دل کویر.' },
      { id: 'day-4', dayFA: 'روز چهارم', titleFA: 'کارگاه انرژی در دل کویر', descriptionFA: 'یک روز کامل در کویر مصر. کارگاه انرژی درمانی زیر آسمان پرستاره. آیین شب کویر با موسیقی سنتی و مدیتیشن گروهی.' },
      { id: 'day-5', dayFA: 'روز پنجم', titleFA: 'شیراز — شهر گل و بلبل', descriptionFA: 'بازدید از مقبره حافظ و سعدی. مدیتیشن شعر در باغ ارم. کارگاه شناخت اشعار معنوی فارسی.' },
      { id: 'day-6', dayFA: 'روز ششم', titleFA: 'تخت جمشید — انرژی ایران باستان', descriptionFA: 'سفر به تخت جمشید، مرکز انرژتیک ایران باستان. مدیتیشن خاص در میان ستون‌های هزاران ساله. بازگشت به شیراز و شام وداع.' },
      { id: 'day-7', dayFA: 'روز هفتم', titleFA: 'بازگشت — با قلبی پر از نور', descriptionFA: 'صبحانه مشترک و مراسم اختتامیه. تبادل کریستال‌های یادگاری. بازگشت به تهران با خاطرات و انرژی‌های نو.' },
    ],
  },
  {
    id: 'tour-2',
    slug: 'himalaya-energy-retreat',
    titleFA: 'ریتریت انرژی هیمالیا',
    descriptionFA: 'سفر به قلب هیمالیا برای تجربه‌ای فراموش نشدنی',
    longDescriptionFA: 'هیمالیا از دیرباز مرکز معنویت و انرژی جهان شناخته شده است. در این ریتریت ۱۰ روزه، در میان کوه‌های مقدس هیمالیا، عمیق‌ترین تجربه معنوی زندگی‌تان را خواهید داشت.',
    image: '/images/hero-backgrounds/tours-hero.webp',
    duration: '10 days',
    durationFA: '۱۰ روز',
    location: 'Nepal, Tibet',
    locationFA: 'نپال، تبت',
    groupSize: '6-10 people',
    groupSizeFA: '۶ تا ۱۰ نفر',
    price: 28000000,
    accentColor: 'var(--chakra-crown)',
    tags: ['هیمالیا', 'ریتریت', 'پیشرفته', 'بین‌المللی'],
    includes: ['International flights', 'Accommodation in monasteries', 'Daily yoga and meditation', 'Tibetan healing ceremonies', 'All meals', 'Expert spiritual guide'],
    includesFA: ['پروازهای بین‌المللی', 'اقامت در صومعه‌های تبتی', 'یوگا و مدیتیشن روزانه', 'آیین‌های شفابخشی تبتی', 'تمام وعده‌های غذایی', 'راهنمای معنوی متخصص'],
    itinerary: [
      { id: 'day-1', dayFA: 'روز اول', titleFA: 'ورود به کاتماندو', descriptionFA: 'ورود به کاتماندو و اقامت در هتل بوتیک. آشنایی با گروه و برنامه سفر. مدیتیشن آماده‌سازی برای سفر معنوی.' },
      { id: 'day-2', dayFA: 'روز دوم', titleFA: 'معابد پاتان', descriptionFA: 'بازدید از معابد مقدس پاتان. آشنایی با بودیسم تبتی. اولین کارگاه مانترا و مدیتیشن.' },
      { id: 'day-3', dayFA: 'روز سوم تا هفتم', titleFA: 'ریتریت در صومعه تبتی', descriptionFA: 'پنج روز اقامت در صومعه تبتی. روزانه ۳ جلسه مدیتیشن، یوگا و آیین‌های شفابخشی. سکوت اختیاری برای عمق بیشتر.' },
      { id: 'day-4', dayFA: 'روز هشتم', titleFA: 'سفر به اورست بیس کمپ', descriptionFA: 'سفر به پایگاه اورست. مدیتیشن در ارتفاع ۵۳۶۴ متری. تجربه‌ای که هرگز فراموش نخواهید کرد.' },
      { id: 'day-5', dayFA: 'روز نهم و دهم', titleFA: 'بازگشت و یکپارچه‌سازی', descriptionFA: 'بازگشت به کاتماندو. کارگاه یکپارچه‌سازی تجربیات. مراسم اختتامیه و بازگشت به ایران.' },
    ],
  },
  {
    id: 'tour-3',
    slug: 'egypt-mystery-tour',
    titleFA: 'تور اسرار مصر باستان',
    descriptionFA: 'کشف اسرار معنوی تمدن مصر باستان',
    longDescriptionFA: 'مصر باستان یکی از پیشرفته‌ترین تمدن‌های معنوی تاریخ بوده است. اهرام جیزه، معبد لوکسور و دره پادشاهان انرژی‌هایی را در خود نگه داشته‌اند که هنوز هم قابل احساس هستند.',
    image: '/images/hero-backgrounds/tours-hero.webp',
    duration: '8 days',
    durationFA: '۸ روز',
    location: 'Cairo, Luxor, Aswan',
    locationFA: 'قاهره، لوکسور، اسوان',
    groupSize: '8-15 people',
    groupSizeFA: '۸ تا ۱۵ نفر',
    price: 18500000,
    accentColor: 'var(--chakra-solar)',
    tags: ['مصر', 'اهرام', 'تاریخی', 'بین‌المللی'],
    includes: ['International flights', 'Luxury hotel accommodation', 'Private pyramid meditation', 'Expert Egyptologist guide', 'All entrance fees', 'Most meals'],
    includesFA: ['پروازهای بین‌المللی', 'هتل‌های لوکس', 'مدیتیشن خصوصی در اهرام', 'راهنمای متخصص مصرشناس', 'تمام هزینه‌های ورودی', 'اکثر وعده‌های غذایی'],
    itinerary: [
      { id: 'day-1', dayFA: 'روز اول', titleFA: 'ورود به قاهره', descriptionFA: 'ورود به قاهره و اقامت در هتل لوکس. آشنایی با گروه. شب‌نشینی با موسیقی مصری.' },
      { id: 'day-2', dayFA: 'روز دوم', titleFA: 'اهرام جیزه — قلب انرژی', descriptionFA: 'بازدید از اهرام جیزه. مدیتیشن خصوصی داخل هرم بزرگ. آشنایی با هندسه مقدس اهرام.' },
      { id: 'day-3', dayFA: 'روز سوم', titleFA: 'موزه مصر و انرژی فراعنه', descriptionFA: 'بازدید از موزه مصر باستان. مشاهده اشیاء مقدس و انرژتیک. کارگاه تاریخ معنوی مصر.' },
      { id: 'day-4', dayFA: 'روز چهارم تا ششم', titleFA: 'لوکسور و معابد مقدس', descriptionFA: 'سفر به لوکسور. بازدید از معبد کرنک و اقصر. مدیتیشن در دره پادشاهان.' },
      { id: 'day-5', dayFA: 'روز هفتم', titleFA: 'اسوان — انرژی نیل', descriptionFA: 'سفر به اسوان. گشت با قایق در رود نیل. مدیتیشن غروب آفتاب کنار نیل.' },
      { id: 'day-6', dayFA: 'روز هشتم', titleFA: 'بازگشت و اختتامیه', descriptionFA: 'مراسم اختتامیه و یکپارچه‌سازی تجربیات. تبادل هدایای یادگاری. بازگشت به ایران با انرژی مصر باستان.' },
    ],
  },
]

// ─── Crystals (legacy home section) ─────────────────────────────────────────

export type Crystal = {
  id: string
  name: string
  nameFA: string
  subtitle: string
  price: number
  currency: 'IRT'
  image: string
  chakraColor: string
}

export const MOCK_CRYSTALS: Crystal[] = [
  { id: 'c1', name: 'Amethyst', nameFA: 'آمتیست', subtitle: 'آرامش و خلوص و صحافت معنوی', price: 980000, currency: 'IRT', image: '/images/crystals/amethyst.webp', chakraColor: '--chakra-third' },
  { id: 'c2', name: 'Rose Quartz', nameFA: 'کوارتز صورتی', subtitle: 'عشق، شفقت و آرامش قلب', price: 860000, currency: 'IRT', image: '/images/crystals/rose-quartz.webp', chakraColor: '--chakra-heart' },
  { id: 'c3', name: 'Clear Quartz', nameFA: 'کوارتز شفاف', subtitle: 'پاکسازی انرژی و تقویت تمرکز', price: 1200000, currency: 'IRT', image: '/images/crystals/clear-quartz.webp', chakraColor: '--chakra-crown' },
  { id: 'c4', name: 'Labradorite', nameFA: 'لابرادوریت', subtitle: 'حفاظت از انرژی و شهود درونی', price: 1100000, currency: 'IRT', image: '/images/crystals/labradorite.webp', chakraColor: '--chakra-throat' },
]

// ─── Stones ──────────────────────────────────────────────────────────────────

export interface Stone {
  id: string
  slug: string
  name: string
  nameFA: string
  origin: string
  originFA: string
  hardness: string
  chakra: string
  chakraFA: string
  properties: string[]
  propertiesFA: string[]
  healingProperties: string[]
  healingBenefitsFA: string[]
  howToCleanseFA: string
  price: number
  image: string
  accentColor: string
}

export const MOCK_STONES: Stone[] = [
  { id: 'stone-1', slug: 'amethyst', name: 'Amethyst', nameFA: 'آمتیست', image: '/images/products/stones/amethyst.webp', price: 2400000, origin: 'Brazil', originFA: 'برزیل', hardness: '7', chakra: 'Crown', chakraFA: 'چاکرای تاج', properties: ['Calm', 'Intuition', 'Protection'], propertiesFA: ['آرامش', 'شهود', 'محافظت'], healingProperties: ['Calm', 'Intuition', 'Protection'], healingBenefitsFA: ['کاهش استرس و اضطراب', 'تقویت شهود و قدرت روحانی', 'بهبود کیفیت خواب', 'محافظت در برابر انرژی‌های منفی'], howToCleanseFA: 'زیر نور ماه کامل قرار دهید یا با دود سفید پاکسازی کنید. از قرار دادن زیر نور مستقیم آفتاب خودداری کنید.', accentColor: 'var(--chakra-crown)' },
  { id: 'stone-2', slug: 'rose-quartz', name: 'Rose Quartz', nameFA: 'کوارتز رز', image: '/images/products/stones/rose-quartz.webp', price: 2200000, origin: 'Madagascar', originFA: 'ماداگاسکار', hardness: '7', chakra: 'Heart', chakraFA: 'چاکرای قلب', properties: ['Love', 'Compassion', 'Heart Healing'], propertiesFA: ['عشق', 'همدلی', 'شفای قلب'], healingProperties: ['Love', 'Compassion', 'Heart'], healingBenefitsFA: ['جذب عشق و روابط سالم', 'بهبود اعتماد به نفس', 'التیام زخم‌های عاطفی', 'تقویت مهربانی با خود و دیگران'], howToCleanseFA: 'با آب جاری شستشو دهید یا زیر نور ماه قرار دهید.', accentColor: 'var(--chakra-heart)' },
  { id: 'stone-3', slug: 'black-tourmaline', name: 'Black Tourmaline', nameFA: 'تورمالین سیاه', image: '/images/products/stones/clear-quartz.webp', price: 2600000, origin: 'Africa', originFA: 'آفریقا', hardness: '7-7.5', chakra: 'Root', chakraFA: 'چاکرای ریشه', properties: ['Protection', 'Grounding', 'Shield'], propertiesFA: ['محافظت', 'زمین‌گیری', 'سپر انرژی'], healingProperties: ['Grounding', 'Protection', 'Cleansing'], healingBenefitsFA: ['محافظت قوی در برابر انرژی‌های منفی', 'زمین‌گیری و ثبات انرژتیک', 'کاهش ترس و پارانویا', 'ایجاد سپر محافظ دور بدن'], howToCleanseFA: 'دفن کردن در خاک به مدت ۲۴ ساعت یا استفاده از دود کندر.', accentColor: 'var(--chakra-root)' },
  { id: 'stone-4', slug: 'labradorite', name: 'Labradorite', nameFA: 'لابرادوریت', image: '/images/products/stones/labradorite.webp', price: 2800000, origin: 'Madagascar', originFA: 'ماداگاسکار', hardness: '6-6.5', chakra: 'Third Eye', chakraFA: 'چاکرای چشم سوم', properties: ['Magic', 'Transformation', 'Intuition'], propertiesFA: ['جادو', 'تحول', 'شهود'], healingProperties: ['Magic', 'Transformation', 'Intuition'], healingBenefitsFA: ['تقویت شهود و قدرت‌های درونی', 'محافظت در برابر انرژی‌های منفی', 'تحول شخصی و رشد روحانی', 'ارتباط با ابعاد بالاتر'], howToCleanseFA: 'با دود مریم گلی یا زیر نور ماه پاکسازی کنید.', accentColor: 'var(--chakra-third)' },
  { id: 'stone-5', slug: 'clear-quartz', name: 'Clear Quartz', nameFA: 'کوارتز شفاف', image: '/images/products/stones/clear-quartz.webp', price: 2000000, origin: 'Brazil', originFA: 'برزیل', hardness: '7', chakra: 'Crown', chakraFA: 'همه چاکراها', properties: ['Clarity', 'Amplify', 'Balance'], propertiesFA: ['شفافیت', 'تقویت', 'تعادل'], healingProperties: ['Clarity', 'Amplify', 'Balance'], healingBenefitsFA: ['افزایش شفافیت ذهنی', 'تقویت انرژی کریستال‌های دیگر', 'تعادل انرژی بدن', 'برنامه‌ریزی مجدد برای نیت‌های خاص'], howToCleanseFA: 'با آب سرد شستشو دهید یا در معرض نور خورشید قرار دهید.', accentColor: 'var(--gold-accent)' },
  { id: 'stone-6', slug: 'citrine', name: 'Citrine', nameFA: 'سیترین', image: '/images/products/stones/rose-quartz.webp', price: 2500000, origin: 'Brazil', originFA: 'برزیل', hardness: '7', chakra: 'Solar Plexus', chakraFA: 'چاکرای خورشیدی', properties: ['Abundance', 'Joy', 'Confidence'], propertiesFA: ['فراوانی', 'شادی', 'اعتماد'], healingProperties: ['Abundance', 'Joy', 'Confidence'], healingBenefitsFA: ['جذب فراوانی و ثروت', 'افزایش اعتماد به نفس', 'تقویت شادی و خوش‌بینی', 'انرژی بخش و روحیه دهنده'], howToCleanseFA: 'با آب گرم شستشو دهید و در نور غیر مستقیم خورشید قرار دهید.', accentColor: 'var(--chakra-solar)' },
]

// ─── Candles ─────────────────────────────────────────────────────────────────

export interface Candle {
  id: string
  slug: string
  name: string
  nameFA: string
  scent: string
  scentFA: string
  burnTime: string
  burnTimeFA: string
  waxType: string
  waxTypeFA: string
  ingredientsFA: string[]
  chakraAlignmentFA: string
  price: number
  image: string
  accentColor: string
  crystalKeywords: string[]
}

export const MOCK_CANDLES: Candle[] = [
  { id: 'candle-1', slug: 'amethyst-dream', name: 'Amethyst Dream', nameFA: 'رویای آمتیست', image: '/images/products/candles/abundance-candle.webp', price: 280000, scent: 'Lavender & Sage', scentFA: 'اسطوخودوس و مریم گلی', burnTime: '45-50 hours', burnTimeFA: '۴۵ تا ۵۰ ساعت', waxType: 'Soy Wax', waxTypeFA: 'موم سویا', ingredientsFA: ['موم سویا طبیعی', 'روغن اسانس اسطوخودوس', 'روغن مریم گلی', 'فتیله پنبه‌ای', 'رنگ طبیعی بنفش'], chakraAlignmentFA: 'چاکرای تاج و چشم سوم — تقویت شهود و آرامش عمیق', accentColor: 'var(--chakra-crown)', crystalKeywords: ['Calm', 'Sleep', 'Protection'] },
  { id: 'candle-2', slug: 'rose-quartz-love', name: 'Rose Quartz Love', nameFA: 'عشق کوارتز رز', image: '/images/products/candles/rose-intention-candle.webp', price: 260000, scent: 'Rose & Jasmine', scentFA: 'گل رز و یاسمن', burnTime: '40-45 hours', burnTimeFA: '۴۰ تا ۴۵ ساعت', waxType: 'Coconut Wax', waxTypeFA: 'موم نارگیل', ingredientsFA: ['موم نارگیل خالص', 'روغن اسانس گل رز', 'روغن یاسمن', 'فتیله پنبه‌ای', 'گلبرگ رز خشک'], chakraAlignmentFA: 'چاکرای قلب — جذب عشق و تقویت روابط عاطفی', accentColor: 'var(--chakra-heart)', crystalKeywords: ['Love', 'Compassion', 'Healing'] },
  { id: 'candle-3', slug: 'forest-emerald', name: 'Forest Emerald', nameFA: 'جنگل زمردین', image: '/images/products/candles/moon-ritual-candle.webp', price: 300000, scent: 'Cedar & Pine', scentFA: 'سدر و کاج', burnTime: '50-55 hours', burnTimeFA: '۵۰ تا ۵۵ ساعت', waxType: 'Beeswax', waxTypeFA: 'موم زنبور عسل', ingredientsFA: ['موم زنبور عسل طبیعی', 'روغن چوب سدر', 'روغن کاج', 'فتیله پنبه‌ای', 'رنگ طبیعی سبز'], chakraAlignmentFA: 'چاکرای قلب — ارتباط با طبیعت و آرامش درونی', accentColor: 'var(--chakra-heart)', crystalKeywords: ['Clarity', 'Balance', 'Focus'] },
  { id: 'candle-4', slug: 'citrine-energy', name: 'Citrine Energy', nameFA: 'انرژی سیترین', image: '/images/products/candles/chakra-cleanse-candle.webp', price: 260000, scent: 'Citrus & Cinnamon', scentFA: 'مرکبات و دارچین', burnTime: '40-45 hours', burnTimeFA: '۴۰ تا ۴۵ ساعت', waxType: 'Soy Wax', waxTypeFA: 'موم سویا', ingredientsFA: ['موم سویا طبیعی', 'روغن اسانس مرکبات', 'روغن دارچین', 'فتیله پنبه‌ای', 'رنگ طبیعی زرد'], chakraAlignmentFA: 'چاکرای خورشیدی — جذب فراوانی و اعتماد به نفس', accentColor: 'var(--chakra-solar)', crystalKeywords: ['Abundance', 'Joy', 'Success'] },
  { id: 'candle-5', slug: 'labradorite-magic', name: 'Labradorite Magic', nameFA: 'جادوی لابرادوریت', image: '/images/products/candles/protection-pillar.webp', price: 280000, scent: 'Cedarwood & Frankincense', scentFA: 'چوب سدر و کندر', burnTime: '45-50 hours', burnTimeFA: '۴۵ تا ۵۰ ساعت', waxType: 'Soy Wax', waxTypeFA: 'موم سویا', ingredientsFA: ['موم سویا طبیعی', 'روغن چوب سدر', 'روغن کندر', 'فتیله پنبه‌ای', 'رنگ طبیعی آبی'], chakraAlignmentFA: 'چاکرای گلو — تقویت شهود و تحول شخصی', accentColor: 'var(--chakra-throat)', crystalKeywords: ['Transformation', 'Intuition', 'Magic'] },
]

// ─── Accessories ──────────────────────────────────────────────────────────────

export interface Accessory {
  id: string
  slug: string
  name: string
  nameFA: string
  material: string
  materialFA: string
  descriptionFA: string
  price: number
  image: string
  accentColor: string
}

export const MOCK_ACCESSORIES: Accessory[] = [
  { id: 'acc-1', slug: 'crystal-bracelet', name: 'Crystal Bracelet', nameFA: 'دستبند کریستال', image: '/images/products/accessories/accessories-1.webp', price: 350000, material: 'Natural Crystal + Sterling Silver', materialFA: 'کریستال طبیعی + نقره استرلینگ', descriptionFA: 'دستبند کریستال با سنگ‌های طبیعی آمتیست و کوارتز رز، دست‌ساز با بند نقره استرلینگ. هر دستبند منحصربه‌فرد و با انرژی خاص خود است.', accentColor: 'var(--chakra-crown)' },
  { id: 'acc-2', slug: 'lapis-necklace', name: 'Lapis Lazuli Necklace', nameFA: 'گردنبند لاجورد', image: '/images/products/accessories/accessories-2.webp', price: 580000, material: 'Lapis Lazuli + Gold Plated', materialFA: 'لاجورد + آبکاری طلا', descriptionFA: 'گردنبند لاجورد با آبکاری طلا، طراحی شده برای تقویت چاکرای گلو و بیان حقیقت. سنگ لاجورد از معادن افغانستان.', accentColor: 'var(--chakra-throat)' },
  { id: 'acc-3', slug: 'selenite-wand', name: 'Selenite Wand', nameFA: 'عصای سلنیت', image: '/images/products/accessories/accessories-3.webp', price: 220000, material: 'Natural Selenite', materialFA: 'سلنیت طبیعی', descriptionFA: 'عصای سلنیت برای پاکسازی انرژی فضا و کریستال‌های دیگر. سلنیت یکی از معدود کریستال‌هایی است که نیاز به پاکسازی ندارد.', accentColor: 'var(--gold-accent)' },
  { id: 'acc-4', slug: 'chakra-pendant', name: 'Chakra Pendant', nameFA: 'آویز چاکرا', image: '/images/products/accessories/accessories-4.webp', price: 420000, material: '7-Gemstone + Gold Plated', materialFA: '۷ سنگ قیمتی + آبکاری طلا', descriptionFA: 'آویز هفت چاکرا با هفت سنگ قیمتی طبیعی. هر سنگ نماینده یک چاکرا است و به تعادل انرژی بدن کمک می‌کند.', accentColor: 'var(--chakra-crown)' },
  { id: 'acc-5', slug: 'obsidian-pyramid', name: 'Obsidian Pyramid', nameFA: 'هرم ابسیدین', image: '/images/products/accessories/accessories-1.webp', price: 180000, material: 'Black Obsidian', materialFA: 'ابسیدین سیاه', descriptionFA: 'هرم ابسیدین سیاه برای محافظت انرژی و دفع انرژی‌های منفی. مناسب برای قرار دادن روی میز کار یا کنار تخت.', accentColor: 'var(--chakra-root)' },
  { id: 'acc-6', slug: 'rose-quartz-palm', name: 'Rose Quartz Palm Stone', nameFA: 'سنگ کف‌دست رز کوارتز', image: '/images/products/accessories/accessories-2.webp', price: 150000, material: 'Rose Quartz', materialFA: 'رز کوارتز', descriptionFA: 'سنگ کف‌دست رز کوارتز برای مدیتیشن و تقویت عشق به خود. اندازه مناسب برای نگه داشتن در دست هنگام مراقبه.', accentColor: 'var(--chakra-heart)' },
  { id: 'acc-7', slug: 'tiger-eye-bracelet', name: 'Tiger Eye Bracelet', nameFA: 'دستبند چشم ببر', image: '/images/products/accessories/accessories-3.webp', price: 280000, material: 'Tiger Eye + Elastic', materialFA: 'چشم ببر + کشسان', descriptionFA: 'دستبند چشم ببر برای افزایش اعتماد به نفس و شجاعت. سنگ چشم ببر به تقویت اراده و تصمیم‌گیری کمک می‌کند.', accentColor: 'var(--chakra-solar)' },
  { id: 'acc-8', slug: 'amethyst-cluster', name: 'Amethyst Cluster', nameFA: 'کلاستر آمتیست', image: '/images/products/accessories/accessories-4.webp', price: 650000, material: 'Natural Amethyst', materialFA: 'آمتیست طبیعی', descriptionFA: 'کلاستر آمتیست طبیعی برای تصفیه انرژی محیط و تقویت شهود. مناسب برای فضاهای مدیتیشن و اتاق خواب.', accentColor: 'var(--chakra-third)' },
  { id: 'acc-9', slug: 'moonstone-ring', name: 'Moonstone Ring', nameFA: 'انگشتر سنگ ماه', image: '/images/products/accessories/accessories-1.webp', price: 380000, material: 'Moonstone + Sterling Silver', materialFA: 'سنگ ماه + نقره استرلینگ', descriptionFA: 'انگشتر سنگ ماه با طراحی مینیمال. سنگ ماه به تقویت شهود و ارتباط با انرژی زنانه کمک می‌کند.', accentColor: 'var(--chakra-crown)' },
  { id: 'acc-10', slug: 'citrine-point', name: 'Citrine Point', nameFA: 'کریستال سیترین', image: '/images/products/accessories/accessories-2.webp', price: 490000, material: 'Natural Citrine', materialFA: 'سیترین طبیعی', descriptionFA: 'کریستال سیترین طبیعی برای جذب فراوانی و انرژی مثبت. معروف به سنگ موفقیت و تجلی.', accentColor: 'var(--chakra-solar)' },
]

// ─── Courses ──────────────────────────────────────────────────────────────────

export type Course = {
  id: string
  slug: string
  titleFA: string
  descriptionFA: string
  longDescriptionFA: string
  image: string
  instructor: string
  instructorFA: string
  instructorAvatar: string
  instructorBioFA: string
  level: 'beginner' | 'intermediate' | 'advanced'
  levelFA: string
  duration: string
  durationFA: string
  price: number
  isFree: boolean
  accentColor: string
  tags: string[]
  curriculum: {
    id: string
    titleFA: string
    lessons: {
      id: string
      titleFA: string
      duration: string
      isFree: boolean
    }[]
  }[]
}

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'chakra-mastery',
    titleFA: 'تسلط بر چاکراها',
    descriptionFA: 'یادگیری کامل هفت چاکرای اصلی و روش‌های تعادل آن‌ها',
    longDescriptionFA: 'در این دوره جامع، با هفت چاکرای اصلی بدن آشنا می‌شوید و یاد می‌گیرید چگونه با استفاده از مدیتیشن، کریستال و تنفس، انرژی هر چاکرا را متعادل کنید. این دوره برای مبتدیانی که می‌خواهند سفر معنوی خود را شروع کنند طراحی شده است.',
    image: '/images/products/courses/courses-1.webp',
    instructor: 'Dr. Leila Hosseini',
    instructorFA: 'دکتر لیلا حسینی',
    instructorAvatar: '/images/products/stones/amethyst.webp',
    instructorBioFA: 'دکتر لیلا حسینی با بیش از ۱۵ سال تجربه در زمینه انرژی درمانی و چاکرا تراپی، یکی از برجسته‌ترین متخصصان این حوزه در ایران است.',
    level: 'beginner',
    levelFA: 'مبتدی',
    duration: '8 hours',
    durationFA: '۸ ساعت',
    price: 0,
    isFree: true,
    accentColor: 'var(--chakra-crown)',
    tags: ['چاکرا', 'انرژی', 'مدیتیشن', 'مبتدی'],
    curriculum: [
      {
        id: 'ch-1',
        titleFA: 'فصل اول: آشنایی با چاکراها',
        lessons: [
          { id: 'l-1', titleFA: 'چاکرا چیست؟', duration: '۱۵ دقیقه', isFree: true },
          { id: 'l-2', titleFA: 'تاریخچه و ریشه‌های چاکرا', duration: '۲۰ دقیقه', isFree: true },
          { id: 'l-3', titleFA: 'ارتباط چاکرا با بدن فیزیکی', duration: '۲۵ دقیقه', isFree: false },
        ],
      },
      {
        id: 'ch-2',
        titleFA: 'فصل دوم: چاکراهای پایینی',
        lessons: [
          { id: 'l-4', titleFA: 'چاکرای ریشه — امنیت و ثبات', duration: '۳۰ دقیقه', isFree: false },
          { id: 'l-5', titleFA: 'چاکرای ناف — خلاقیت و احساس', duration: '۳۰ دقیقه', isFree: false },
          { id: 'l-6', titleFA: 'چاکرای شمسی — قدرت و اراده', duration: '۳۵ دقیقه', isFree: false },
        ],
      },
      {
        id: 'ch-3',
        titleFA: 'فصل سوم: چاکراهای بالایی',
        lessons: [
          { id: 'l-7', titleFA: 'چاکرای قلب — عشق و همدلی', duration: '۳۰ دقیقه', isFree: false },
          { id: 'l-8', titleFA: 'چاکرای گلو — بیان و ارتباط', duration: '۲۵ دقیقه', isFree: false },
          { id: 'l-9', titleFA: 'چاکرای چشم سوم — شهود', duration: '۳۵ دقیقه', isFree: false },
          { id: 'l-10', titleFA: 'چاکرای تاج — آگاهی برتر', duration: '۴۰ دقیقه', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    slug: 'crystal-therapy-advanced',
    titleFA: 'کریستال درمانی پیشرفته',
    descriptionFA: 'تکنیک‌های پیشرفته کریستال درمانی برای متخصصان',
    longDescriptionFA: 'این دوره پیشرفته برای کسانی طراحی شده که با اصول پایه کریستال درمانی آشنا هستند و می‌خواهند مهارت‌های خود را به سطح بالاتری ارتقا دهند. شامل تکنیک‌های گریدگذاری، برنامه‌ریزی کریستال و درمان از راه دور است.',
    image: '/images/products/courses/courses-2.webp',
    instructor: 'Master Reza Karimi',
    instructorFA: 'استاد رضا کریمی',
    instructorAvatar: '/images/products/stones/rose-quartz.webp',
    instructorBioFA: 'استاد رضا کریمی با ۲۰ سال تجربه در کریستال درمانی و تراز انرژی، مدرک بین‌المللی از انستیتوی کریستال درمانی لندن دارد.',
    level: 'advanced',
    levelFA: 'پیشرفته',
    duration: '12 hours',
    durationFA: '۱۲ ساعت',
    price: 1200000,
    isFree: false,
    accentColor: 'var(--chakra-throat)',
    tags: ['کریستال', 'پیشرفته', 'درمان', 'تخصصی'],
    curriculum: [
      {
        id: 'ch-1',
        titleFA: 'فصل اول: گریدگذاری کریستال',
        lessons: [
          { id: 'l-1', titleFA: 'اصول گریدگذاری', duration: '۴۵ دقیقه', isFree: true },
          { id: 'l-2', titleFA: 'الگوهای هندسی مقدس', duration: '۵۰ دقیقه', isFree: false },
          { id: 'l-3', titleFA: 'گرید فیبوناچی', duration: '۴۰ دقیقه', isFree: false },
        ],
      },
      {
        id: 'ch-2',
        titleFA: 'فصل دوم: برنامه‌ریزی کریستال',
        lessons: [
          { id: 'l-4', titleFA: 'تنظیم قصد در کریستال', duration: '۳۵ دقیقه', isFree: false },
          { id: 'l-5', titleFA: 'فعال‌سازی انرژتیک', duration: '۴۵ دقیقه', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    slug: 'meditation-fundamentals',
    titleFA: 'مبانی مدیتیشن',
    descriptionFA: 'آموزش مدیتیشن از صفر تا صد برای مبتدیان',
    longDescriptionFA: 'اگر هیچ‌وقت مدیتیشن نکرده‌اید یا تجربه کمی دارید، این دوره جای شماست. در ۶ هفته یاد می‌گیرید چگونه ذهن خود را آرام کنید، تمرکز را تقویت کنید و با خود ارتباط عمیق‌تری برقرار کنید.',
    image: '/images/products/courses/courses-3.webp',
    instructor: 'Sara Ahmadi',
    instructorFA: 'سارا احمدی',
    instructorAvatar: '/images/products/stones/amethyst.webp',
    instructorBioFA: 'سارا احمدی مدرس مدیتیشن و ذهن‌آگاهی با گواهینامه بین‌المللی MBSR است و تاکنون بیش از ۵۰۰۰ نفر را آموزش داده است.',
    level: 'beginner',
    levelFA: 'مبتدی',
    duration: '6 hours',
    durationFA: '۶ ساعت',
    price: 0,
    isFree: true,
    accentColor: 'var(--chakra-third)',
    tags: ['مدیتیشن', 'آرامش', 'مبتدی', 'رایگان'],
    curriculum: [
      {
        id: 'ch-1',
        titleFA: 'هفته اول: شروع سفر',
        lessons: [
          { id: 'l-1', titleFA: 'چرا مدیتیشن؟', duration: '۱۰ دقیقه', isFree: true },
          { id: 'l-2', titleFA: 'آماده‌سازی محیط', duration: '۱۵ دقیقه', isFree: true },
          { id: 'l-3', titleFA: 'اولین تمرین تنفسی', duration: '۲۰ دقیقه', isFree: false },
        ],
      },
      {
        id: 'ch-2',
        titleFA: 'هفته دوم: تمرکز و آگاهی',
        lessons: [
          { id: 'l-4', titleFA: 'مدیتیشن اسکن بدن', duration: '۲۵ دقیقه', isFree: false },
          { id: 'l-5', titleFA: 'تمرکز روی یک نقطه', duration: '۲۰ دقیقه', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    slug: 'energy-healing-intermediate',
    titleFA: 'انرژی درمانی متوسطه',
    descriptionFA: 'ارتقای مهارت‌های انرژی درمانی به سطح متوسط',
    longDescriptionFA: 'این دوره برای کسانی طراحی شده که اصول پایه انرژی درمانی را می‌دانند و می‌خواهند مهارت‌های عملی خود را تقویت کنند. شامل تکنیک‌های ریکی، پرانا و درمان با رنگ است.',
    image: '/images/products/courses/courses-4.webp',
    instructor: 'Dr. Leila Hosseini',
    instructorFA: 'دکتر لیلا حسینی',
    instructorAvatar: '/images/products/stones/amethyst.webp',
    instructorBioFA: 'دکتر لیلا حسینی با بیش از ۱۵ سال تجربه در زمینه انرژی درمانی و چاکرا تراپی، یکی از برجسته‌ترین متخصصان این حوزه در ایران است.',
    level: 'intermediate',
    levelFA: 'متوسط',
    duration: '10 hours',
    durationFA: '۱۰ ساعت',
    price: 850000,
    isFree: false,
    accentColor: 'var(--chakra-heart)',
    tags: ['انرژی درمانی', 'ریکی', 'متوسط'],
    curriculum: [
      {
        id: 'ch-1',
        titleFA: 'فصل اول: مروری بر اصول پایه',
        lessons: [
          { id: 'l-1', titleFA: 'مرور میدان‌های انرژتیک', duration: '۳۰ دقیقه', isFree: true },
          { id: 'l-2', titleFA: 'ارزیابی انرژی بیمار', duration: '۴۰ دقیقه', isFree: false },
        ],
      },
      {
        id: 'ch-2',
        titleFA: 'فصل دوم: تکنیک‌های پیشرفته',
        lessons: [
          { id: 'l-3', titleFA: 'ریکی سطح دوم', duration: '۵۰ دقیقه', isFree: false },
          { id: 'l-4', titleFA: 'درمان با رنگ', duration: '۴۵ دقیقه', isFree: false },
          { id: 'l-5', titleFA: 'پرانا یاما پیشرفته', duration: '۵۵ دقیقه', isFree: false },
        ],
      },
    ],
  },
]

// ─── Mentors ──────────────────────────────────────────────────────────────────

export type Mentor = {
  id: string
  slug: string
  name: string
  nameFA: string
  title: string
  titleFA: string
  specialties: string[]
  specialtiesFA: string[]
  sessionPrice: number
  sessionDuration: string
  image: string
  bio: string
  bioFA: string
  rating: number
  reviewCount: number
}

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'mt1', slug: 'leila-ahmadi',
    name: 'Leila Ahmadi', nameFA: 'لیلا احمدی',
    title: 'Crystal Energy Healer', titleFA: 'شفادهنده انرژی کریستال',
    specialties: ['Crystal Healing', 'Chakra Balancing', 'Aura Reading'],
    specialtiesFA: ['شفای کریستال', 'تراز چاکرا', 'خواندن اورا'],
    sessionPrice: 8500000, sessionDuration: '60 min',
    image: '/images/products/stones/amethyst.webp',
    bio: 'With 12 years of practice in crystal energy healing, Leila guides seekers toward energetic wholeness.',
    bioFA: 'لیلا با ۱۲ سال تجربه در شفای کریستال، جویندگان را به سوی کمال انرژی هدایت می‌کند.',
    rating: 4.9, reviewCount: 127,
  },
  {
    id: 'mt2', slug: 'sara-moradi',
    name: 'Sara Moradi', nameFA: 'سارا مرادی',
    title: 'Spiritual Coach & Meditator', titleFA: 'مربی معنوی و مدیتیشن',
    specialties: ['Meditation', 'Inner Child Work', 'Spiritual Coaching'],
    specialtiesFA: ['مدیتیشن', 'کار با کودک درون', 'مربیگری معنوی'],
    sessionPrice: 7500000, sessionDuration: '60 min',
    image: '/images/products/stones/rose-quartz.webp',
    bio: 'Sara specializes in meditation-based healing and guiding students through transformational inner work.',
    bioFA: 'سارا در شفای مبتنی بر مدیتیشن و هدایت دانش‌آموزان در کار درونی تحول‌آفرین تخصص دارد.',
    rating: 4.8, reviewCount: 94,
  },
  {
    id: 'mt3', slug: 'arash-karimi',
    name: 'Arash Karimi', nameFA: 'آرش کریمی',
    title: 'Chakra & Sound Healing', titleFA: 'شفای چاکرا و صدا',
    specialties: ['Sound Healing', 'Chakra Work', 'Energy Clearing'],
    specialtiesFA: ['شفای صوتی', 'کار با چاکرا', 'پاکسازی انرژی'],
    sessionPrice: 9000000, sessionDuration: '75 min',
    image: '/images/products/stones/clear-quartz.webp',
    bio: 'Arash combines Tibetan sound healing with chakra alignment for deep energetic transformation.',
    bioFA: 'آرش شفای صوتی تبتی را با تراز چاکرا ترکیب می‌کند.',
    rating: 5.0, reviewCount: 61,
  },
]

// ─── MOCK_MENTORSHIP (legacy alias) ──────────────────────────────────────────
export const MOCK_MENTORSHIP = MOCK_MENTORS.map((m) => ({
  id: m.id,
  name: m.name,
  price: m.sessionPrice,
  image: m.image,
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProductById(id: string) {
  const stone = MOCK_STONES.find((p) => p.id === id)
  if (stone) return { ...stone, category: 'stones' as const }

  const candle = MOCK_CANDLES.find((p) => p.id === id)
  if (candle) return { ...candle, category: 'candles' as const }

  const accessory = MOCK_ACCESSORIES.find((p) => p.id === id)
  if (accessory) return { ...accessory, category: 'accessories' as const }

  const course = MOCK_COURSES.find((p) => p.id === id)
  if (course) return { ...course, category: 'courses' as const }

  const mentor = MOCK_MENTORS.find((p) => p.id === id)
  if (mentor) return { ...mentor, category: 'mentorship' as const }

  const clothes = MOCK_CLOTHES_PRODUCTS.find((p) => p.id === id)
  if (clothes) return { ...clothes, category: 'clothes' as const }

  const crystal = MOCK_CRYSTALS.find((p) => p.id === id)
  if (crystal) return { ...crystal, category: 'accessories' as const, description: crystal.subtitle, descriptionFA: crystal.subtitle, currency: crystal.currency, inStock: true }

  return null
}

// ─── Product Detail Helpers ─────────────────────────────────────────────────

export function getProductChakra(product: Stone | Candle | Accessory): string {
  return product.accentColor
}

export function getRelatedProducts(
  product: Stone | Candle | Accessory,
  count = 4
): (Stone | Candle | Accessory)[] {
  const all = [...MOCK_STONES, ...MOCK_CANDLES, ...MOCK_ACCESSORIES]
  return all.filter((p) => p.id !== product.id).slice(0, count)
}

// ═══════════════════════════════════════════════════════════════════════════════
// تحریریه — Editorial Mock Data
// ═══════════════════════════════════════════════════════════════════════════════

// ── Educational Content ────────────────────────────────────────────────────────

export type EducationalPost = {
  id: string; slug: string
  titleFA: string; title: string
  categoryFA: string; category: string
  excerptFA: string; bodyFA: string
  readMinutes: number
  image: string
  tags: string[]
}

export const MOCK_EDUCATIONAL: EducationalPost[] = [
  { id: 'ed1', slug: 'intro-to-chakras', titleFA: 'آشنایی با چاکراها', title: 'Intro to Chakras', categoryFA: 'انرژی', category: 'Energy', excerptFA: 'چاکراها مراکز انرژی در بدن انسان هستند که از هزاران سال پیش در سنت‌های معنوی شناخته شده‌اند.', bodyFA: 'چاکرا واژه‌ای سانسکریت به معنای چرخ است. در سنت‌های یوگا و طب آیورودا، هفت چاکرای اصلی وجود دارد که در امتداد ستون فقرات قرار گرفته‌اند. هر چاکرا با رنگ، عنصر و جنبه‌ای از تجربه انسانی مرتبط است. چاکرای اول در پایه ستون فقرات قرار دارد و با زمین و رنگ قرمز مرتبط است.', readMinutes: 5, image: '/images/tahririye/educational/chakras.webp', tags: ['چاکرا', 'انرژی', 'مدیتیشن'] },
  { id: 'ed2', slug: 'crystal-cleansing', titleFA: 'پاکسازی و شارژ کریستال‌ها', title: 'Crystal Cleansing', categoryFA: 'کریستال', category: 'Crystal', excerptFA: 'کریستال‌ها انرژی محیط اطراف را جذب می‌کنند. یاد بگیرید چطور آن‌ها را پاکسازی کنید.', bodyFA: 'پاکسازی کریستال‌ها یکی از مهم‌ترین مراحل کار با آن‌هاست. روش اول استفاده از نور ماه است. کریستال‌های خود را در شب ماه کامل زیر نور مهتاب بگذارید. روش دوم استفاده از دود مریم گلی است که انرژی‌های منفی را پاک می‌کند.', readMinutes: 7, image: '/images/tahririye/educational/crystal-cleansing.webp', tags: ['کریستال', 'پاکسازی', 'شارژ'] },
  { id: 'ed3', slug: 'meditation-basics', titleFA: 'مبانی مدیتیشن برای مبتدیان', title: 'Meditation Basics', categoryFA: 'مدیتیشن', category: 'Meditation', excerptFA: 'مدیتیشن یکی از قدیمی‌ترین روش‌های دستیابی به آرامش درونی است.', bodyFA: 'مدیتیشن نیاز به تجهیزات خاصی ندارد. جای آرامی پیدا کنید و بنشینید. پشتتان را صاف نگه دارید. چشمانتان را ببندید و روی نفس تمرکز کنید. هر بار که ذهنتان پرت شد، آرام به نفس برگردید.', readMinutes: 4, image: '/images/tahririye/educational/meditation.webp', tags: ['مدیتیشن', 'آرامش', 'تنفس'] },
  { id: 'ed4', slug: 'aura-colors', titleFA: 'رنگ‌های اورا و معنای آن‌ها', title: 'Aura Colors', categoryFA: 'اورا', category: 'Aura', excerptFA: 'هر فرد دارای میدان انرژی منحصربه‌فردی است که اورا نام دارد.', bodyFA: 'اورا میدان انرژی است که اطراف بدن هر موجود زنده وجود دارد. اورای آبی نشانه آرامش و توانایی بیان است. اورای زرد نشانه هوش و خلاقیت است. اورای سبز نشانه محبت و شفا است.', readMinutes: 6, image: '/images/tahririye/educational/aura.webp', tags: ['اورا', 'انرژی', 'رنگ'] },
  { id: 'ed5', slug: 'sacred-geometry', titleFA: 'هندسه مقدس و کاربرد آن', title: 'Sacred Geometry', categoryFA: 'هندسه مقدس', category: 'Geometry', excerptFA: 'هندسه مقدس زبان کیهان است. الگوهایی که در طبیعت تکرار می‌شوند.', bodyFA: 'هندسه مقدس مطالعه الگوهایی است که در طبیعت و کیهان تکرار می‌شوند. نسبت طلایی 1.618 در صدف‌های دریایی، گل‌های آفتابگردان و بدن انسان دیده می‌شود. این الگوها نشانه نظم پنهان کیهان هستند.', readMinutes: 8, image: '/images/tahririye/educational/geometry.webp', tags: ['هندسه', 'کیهان', 'الگو'] },
  { id: 'ed6', slug: 'energy-healing', titleFA: 'شفای انرژی: مقدمه‌ای جامع', title: 'Energy Healing', categoryFA: 'شفا', category: 'Healing', excerptFA: 'شفای انرژی رویکردی کل‌نگرانه به سلامتی است.', bodyFA: 'شفای انرژی مجموعه روش‌هایی است که هدف آن‌ها تعادل جریان انرژی در بدن است. ریکی، یکی از معروف‌ترین انواع، در ژاپن توسعه یافت. این روش‌ها بر این باور استوارند که بیماری از اختلال در انرژی حیاتی ناشی می‌شود.', readMinutes: 10, image: '/images/tahririye/educational/healing.webp', tags: ['شفا', 'انرژی', 'سلامت'] },
]

// ── Books ──────────────────────────────────────────────────────────────────────

export type Book = {
  id: string; slug: string
  titleFA: string; title: string
  authorFA: string; author: string
  descriptionFA: string
  categoryFA: string
  coverImage: string
  coverAlt: string
  year: number; pages: number; rating: number
}

export const MOCK_BOOKS: Book[] = [
  { id: 'bk1', slug: 'power-of-now', titleFA: 'قدرت حال', title: 'The Power of Now', authorFA: 'اکهارت تله', author: 'Eckhart Tolle', descriptionFA: 'راهنمای روشنگری معنوی. زندگی در لحظه حال راه رسیدن به آرامش عمیق است.', categoryFA: 'معنویت', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب قدرت حال', year: 1997, pages: 236, rating: 4.9 },
  { id: 'bk2', slug: 'alchemist', titleFA: 'کیمیاگر', title: 'The Alchemist', authorFA: 'پائولو کوئیلو', author: 'Paulo Coelho', descriptionFA: 'داستان پسری که به دنبال گنج خود می‌گردد و معنای واقعی زندگی را کشف می‌کند.', categoryFA: 'رمان معنوی', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب کیمیاگر', year: 1988, pages: 208, rating: 4.8 },
  { id: 'bk3', slug: 'crystal-bible', titleFA: 'انجیل کریستال', title: 'The Crystal Bible', authorFA: 'جودی هال', author: 'Judy Hall', descriptionFA: 'جامع‌ترین راهنمای کریستال‌های شفابخش با معرفی بیش از ۲۰۰ نوع سنگ.', categoryFA: 'کریستال', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب درمان با کریستال', year: 2003, pages: 400, rating: 4.7 },
  { id: 'bk4', slug: 'ask-and-given', titleFA: 'بخواه و داده خواهد شد', title: 'Ask and It Is Given', authorFA: 'اسثر و جری هیکس', author: 'Esther & Jerry Hicks', descriptionFA: 'آموزش‌های آبراهام درباره قانون جذب و خلق زندگی مطلوب.', categoryFA: 'قانون جذب', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب بخواه و داده خواهد شد', year: 2004, pages: 304, rating: 4.6 },
  { id: 'bk5', slug: 'seat-of-soul', titleFA: 'جایگاه روح', title: 'The Seat of the Soul', authorFA: 'گری زوکاو', author: 'Gary Zukav', descriptionFA: 'کتابی درباره تکامل روح انسانی و گذار به تراز درونی.', categoryFA: 'روح', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب جایگاه روح', year: 1989, pages: 288, rating: 4.5 },
  { id: 'bk6', slug: 'untethered-soul', titleFA: 'روح رها', title: 'The Untethered Soul', authorFA: 'مایکل سینگر', author: 'Michael A. Singer', descriptionFA: 'سفری به درون برای آزاد شدن از محدودیت‌های فکری و احساسی.', categoryFA: 'آگاهی', coverImage: '/images/tahririye/books-card.webp', coverAlt: 'جلد کتاب روح رها', year: 2007, pages: 200, rating: 4.8 },
]

// ── Articles ───────────────────────────────────────────────────────────────────

export type Article = {
  id: string; slug: string
  titleFA: string; excerptFA: string; bodyFA: string
  authorFA: string; categoryFA: string
  readMinutes: number; publishedDate: string
  image: string; featured: boolean
}

export const MOCK_ARTICLES: Article[] = [
  { id: 'ar1', slug: 'science-of-consciousness', titleFA: 'علم آگاهی: جایی که دانش و معنویت به هم می‌رسند', excerptFA: 'پژوهش‌های اخیر علوم اعصاب نشان می‌دهد که آگاهی انسانی پدیده‌ای پیچیده‌تر از تصور است.', bodyFA: 'در دهه‌های اخیر، علوم اعصاب و فیزیک کوانتومی به نتایجی رسیده‌اند که شباهت شگفتی به آموزه‌های معنوی کهن دارند. مفهوم درهم‌تنیدگی کوانتومی که اینشتین آن را عمل اشباح می‌نامید، امروز در آزمایشگاه‌ها ثابت شده است. ذرات می‌توانند صرف‌نظر از فاصله با هم مرتبط باشند.', authorFA: 'دکتر مریم احمدی', categoryFA: 'علم و معنویت', readMinutes: 12, publishedDate: '2026-04-15', image: '/images/tahririye/articles-card.webp', featured: true },
  { id: 'ar2', slug: 'philosophy-of-impermanence', titleFA: 'فلسفه ناپایداری: درسی از بودا و هراکلیتوس', excerptFA: 'هم بودا و هم هراکلیتوس به نتیجه مشابهی رسیدند: همه چیز در حال تغییر است.', bodyFA: 'هراکلیتوس گفت که نمی‌توان دوبار در یک رودخانه فرو رفت. بودا آموخت که چنگ زدن به ناپایدار منشأ رنج است. پذیرش ناپایداری نه تسلیم بلکه آزادی است.', authorFA: 'علیرضا کریمی', categoryFA: 'فلسفه', readMinutes: 9, publishedDate: '2026-03-28', image: '/images/tahririye/articles-card.webp', featured: false },
  { id: 'ar3', slug: 'sound-healing-research', titleFA: 'شفای صوتی: شواهد علمی و کاربردهای عملی', excerptFA: 'پژوهش‌ها نشان می‌دهند فرکانس‌های صوتی خاص اثرات درمانی دارند.', bodyFA: 'شفای صوتی به استفاده از ارتعاشات صوتی برای سلامت اطلاق می‌شود. تحقیقات نشان داده امواج با فرکانس ۴۳۲ هرتز ضربان قلب را کاهش می‌دهند. کاسه‌های تبتی از ابزارهای رایج در این حوزه هستند.', authorFA: 'سارا مرادی', categoryFA: 'علم', readMinutes: 11, publishedDate: '2026-03-10', image: '/images/tahririye/articles-card.webp', featured: true },
  { id: 'ar4', slug: 'jung-collective-unconscious', titleFA: 'ناخودآگاه جمعی یونگ و ارتباط آن با معنویت', excerptFA: 'یونگ معتقد بود انسان‌ها با ناخودآگاه جمعی به هم متصل هستند.', bodyFA: 'کارل یونگ مفهوم ناخودآگاه جمعی را مطرح کرد. این لایه از ذهن محتوای مشترک همه انسان‌ها را در بر می‌گیرد. کهن‌الگوها نمادهایی هستند که در تمام فرهنگ‌های بشری مشترک‌اند.', authorFA: 'دکتر نیلوفر رضایی', categoryFA: 'روانشناسی', readMinutes: 14, publishedDate: '2026-02-20', image: '/images/tahririye/articles-card.webp', featured: false },
]

// ── Poetry ─────────────────────────────────────────────────────────────────────

export type Poem = {
  id: string; slug: string
  titleFA: string
  poetFA: string; poet: string
  era: string
  eraFA: string
  category: string
  categoryFA: string
  linesFA: string[]
  theme: string[]
  backgroundGradient: string
}

export const MOCK_POEMS: Poem[] = [
  { id: 'pm1', slug: 'rumi-ney', titleFA: 'بشنو این نی', poetFA: 'مولانا جلال‌الدین رومی', poet: 'Rumi', era: 'قرن هفتم هجری', eraFA: 'قرن هفتم هجری', category: 'ghazal', categoryFA: 'غزل', linesFA: ['بشنو این نی چون شکایت می‌کند', 'از جدایی‌ها حکایت می‌کند', 'کز نیستان تا مرا ببریده‌اند', 'در نفیرم مرد و زن نالیده‌اند'], theme: ['عشق', 'عرفان', 'جدایی'], backgroundGradient: 'linear-gradient(135deg, rgba(88,42,107,0.80) 0%, rgba(40,20,70,0.95) 100%)' },
  { id: 'pm2', slug: 'hafez-sabaa', titleFA: 'الا یا ایها الساقی', poetFA: 'خواجه حافظ شیرازی', poet: 'Hafez', era: 'قرن هشتم هجری', eraFA: 'قرن هشتم هجری', category: 'ghazal', categoryFA: 'غزل', linesFA: ['الا یا ایها الساقی ادر کأساً وناولها', 'که عشق آسان نمود اول ولی افتاد مشکل‌ها', 'به بوی نافه‌ای کاخر صبا زان طره بگشاید', 'ز تاب جعد مشکینش چه خون افتاد در دل‌ها'], theme: ['عشق', 'می', 'عرفان'], backgroundGradient: 'linear-gradient(135deg, rgba(41,128,185,0.80) 0%, rgba(20,40,80,0.95) 100%)' },
  { id: 'pm3', slug: 'khayyam-rubai', titleFA: 'رباعی خیام', poetFA: 'عمر خیام نیشابوری', poet: 'Khayyam', era: 'قرن پنجم هجری', eraFA: 'قرن پنجم هجری', category: 'robaei', categoryFA: 'رباعی', linesFA: ['یک قطره آب بود با دریا شد', 'یک ذره خاک با زمین یکتا شد', 'آمد شدن تو در جهان چون بود', 'آمد مگسی پدید و ناپیدا شد'], theme: ['هستی', 'فلسفه', 'ناپایداری'], backgroundGradient: 'linear-gradient(135deg, rgba(192,57,43,0.75) 0%, rgba(60,20,20,0.95) 100%)' },
  { id: 'pm4', slug: 'saadi-golestan', titleFA: 'بنی آدم', poetFA: 'شیخ مصلح‌الدین سعدی', poet: 'Saadi', era: 'قرن هفتم هجری', eraFA: 'قرن هفتم هجری', category: 'ghazal', categoryFA: 'غزل', linesFA: ['بنی آدم اعضای یک پیکرند', 'که در آفرینش ز یک گوهرند', 'چو عضوی به درد آورد روزگار', 'دگر عضوها را نماند قرار'], theme: ['انسانیت', 'همدردی', 'اتحاد'], backgroundGradient: 'linear-gradient(135deg, rgba(39,174,96,0.75) 0%, rgba(10,40,20,0.95) 100%)' },
  { id: 'pm5', slug: 'forugh-tavalodi', titleFA: 'تولدی دیگر', poetFA: 'فروغ فرخزاد', poet: 'Forough', era: 'قرن چهاردهم', eraFA: 'قرن چهاردهم', category: 'modern', categoryFA: 'شعر نو', linesFA: ['من در زمانه‌ای تنها نشسته‌ام', 'که باغ‌های معصوم بهشت', 'به بار نشسته بودند', 'و من در این ویرانه نشسته‌ام'], theme: ['زن', 'آزادی', 'هستی'], backgroundGradient: 'linear-gradient(135deg, rgba(231,76,60,0.75) 0%, rgba(80,20,60,0.95) 100%)' },
  { id: 'pm6', slug: 'attar-manteq', titleFA: 'سیمرغ', poetFA: 'فریدالدین عطار', poet: 'Attar', era: 'قرن ششم هجری', eraFA: 'قرن ششم هجری', category: 'ghazal', categoryFA: 'غزل', linesFA: ['چون که سی مرغ با خود درنگریست', 'سیمرغ خود جز این سی مرغ نیست', 'آن که آمد در جهان چیزی نبود', 'رفت و هیچ از پی او چیزی نبود'], theme: ['عرفان', 'خودشناسی', 'سفر'], backgroundGradient: 'linear-gradient(135deg, rgba(241,196,15,0.70) 0%, rgba(80,60,10,0.95) 100%)' },
  {
    id: 'poem-4',
    slug: 'saadi-human',
    titleFA: 'بنی آدم',
    poetFA: 'سعدی شیرازی',
    poet: 'Saadi',
    era: 'Classical',
    eraFA: 'کلاسیک',
    category: 'ghazal',
    categoryFA: 'غزل',
    linesFA: [
      'بنی آدم اعضای یکدیگرند',
      'که در آفرینش ز یک گوهرند',
      'چو عضوی به درد آورد روزگار',
      'دگر عضوها را نماند قرار',
      'تو کز محنت دیگران بی‌غمی',
      'نشاید که نامت نهند آدمی',
    ],
    backgroundGradient: 'linear-gradient(135deg, #0d0d2b 0%, #1a0a2e 50%, #0d0d2b 100%)',
    theme: ['انسانیت', 'همدردی', 'اتحاد'],
  },
  {
    id: 'poem-5',
    slug: 'forugh-reborn',
    titleFA: 'تولدی دیگر',
    poetFA: 'فروغ فرخزاد',
    poet: 'Forough',
    era: 'Modern',
    eraFA: 'مدرن',
    category: 'modern',
    categoryFA: 'شعر نو',
    linesFA: [
      'در شب سرد زمستانی',
      'وقتی که ماه در پس ابر پنهان بود',
      'من در تاریکی به دنیا آمدم',
      'با چشمانی که آینه‌ی آفتاب بود',
    ],
    backgroundGradient: 'linear-gradient(135deg, #0a1a2e 0%, #0d2b1a 50%, #0a1a2e 100%)',
    theme: ['زن', 'آزادی', 'هستی'],
  },
  {
    id: 'poem-6',
    slug: 'shamlu-love',
    titleFA: 'در آستانه',
    poetFA: 'احمد شاملو',
    poet: 'Shamlu',
    era: 'Modern',
    eraFA: 'مدرن',
    category: 'modern',
    categoryFA: 'شعر نو',
    linesFA: [
      'من به باغ می‌آیم',
      'با دست‌های پر از گل',
      'تو را می‌خوانم',
      'از پس دیوارهای بلند',
      'و صدایم در باد گم می‌شود',
    ],
    backgroundGradient: 'linear-gradient(135deg, #1a0d1a 0%, #2d1a2d 50%, #1a0d1a 100%)',
    theme: ['عشق', 'جدایی', 'شعر نو'],
  },
]

export const POEM_CATEGORIES = [
  { id: 'all',    labelFA: 'همه',     slug: 'all' },
  { id: 'ghazal', labelFA: 'غزل',    slug: 'ghazal' },
  { id: 'robaei', labelFA: 'رباعی',  slug: 'robaei' },
  { id: 'modern', labelFA: 'شعر نو', slug: 'modern' },
]

// --- Profile Mock Data ---

export interface UserProfile {
  id: string
  name: string
  nameFA: string
  email: string
  phone: string
  avatar: string
  joinedDate: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  nameFA: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusFA: string
  items: OrderItem[]
  total: number
  address: string
}

export interface SavedAddress {
  id: string
  label: string
  labelFA: string
  fullAddress: string
  isDefault: boolean
}

export interface WishlistItem {
  id: string
  productId: string
  name: string
  nameFA: string
  image: string
  price: number
  category: string
  accentColor: string
}

export interface MentorshipReservation {
  id: string
  mentorName: string
  mentorNameFA: string
  mentorImage: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  statusFA: string
  topic: string
  topicFA: string
}

export interface CommunityActivity {
  id: string
  type: 'post' | 'comment' | 'like'
  typeFA: string
  title: string
  titleFA: string
  date: string
  href: string
}

export interface Notification {
  id: string
  type: 'order' | 'mentorship' | 'community' | 'system'
  message: string
  messageFA: string
  date: string
  isRead: boolean
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Sara Ahmadi',
  nameFA: 'سارا احمدی',
  email: 'sara@example.com',
  phone: '09121234567',
  avatar: '/images/products/stones/amethyst.webp',
  joinedDate: '۱۴۰۲/۰۶/۱۵',
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '۱۴۰۳/۰۲/۱۲',
    status: 'delivered',
    statusFA: 'تحویل داده شد',
    items: [
      {
        id: 'oi-1',
        productId: 'stone-1',
        name: 'Amethyst Cluster',
        nameFA: 'آمتیست کلاستر',
        image: '/images/products/stones/amethyst.webp',
        price: 480000,
        quantity: 1,
      },
      {
        id: 'oi-2',
        productId: 'candle-1',
        name: 'Amethyst Dream Candle',
        nameFA: 'شمع رویای آمتیست',
        image: '/images/products/candles/abundance-candle.webp',
        price: 280000,
        quantity: 2,
      },
    ],
    total: 1040000,
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
  },
  {
    id: 'ORD-002',
    date: '۱۴۰۳/۰۳/۰۵',
    status: 'processing',
    statusFA: 'در حال پردازش',
    items: [
      {
        id: 'oi-3',
        productId: 'acc-1',
        name: 'Crystal Bracelet',
        nameFA: 'دستبند کریستال',
        image: '/images/products/accessories/accessories-1.webp',
        price: 350000,
        quantity: 1,
      },
    ],
    total: 350000,
    address: 'تهران، خیابان شریعتی، پلاک ۴۵',
  },
]

export const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    labelFA: 'منزل',
    fullAddress: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۴',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work',
    labelFA: 'محل کار',
    fullAddress: 'تهران، خیابان آزادی، برج تجاری آریا، طبقه ۷',
    isDefault: false,
  },
]

export const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: 'wl-1',
    productId: 'stone-2',
    name: 'Rose Quartz',
    nameFA: 'کوارتز رز',
    image: '/images/products/stones/rose-quartz.webp',
    price: 320000,
    category: 'stones',
    accentColor: 'var(--chakra-throat)',
  },
  {
    id: 'wl-2',
    productId: 'candle-3',
    name: 'Sacred Rose Candle',
    nameFA: 'شمع گل رز مقدس',
    image: '/images/products/candles/rose-intention-candle.webp',
    price: 260000,
    category: 'candles',
    accentColor: 'var(--chakra-sacral)',
  },
  {
    id: 'wl-3',
    productId: 'acc-2',
    name: 'Lapis Lazuli Necklace',
    nameFA: 'گردنبند لاجورد',
    image: '/images/products/accessories/accessories-2.webp',
    price: 580000,
    category: 'accessories',
    accentColor: 'var(--chakra-solar)',
  },
]

export const MOCK_MENTORSHIP_RESERVATIONS: MentorshipReservation[] = [
  {
    id: 'res-1',
    mentorName: 'Dr. Leila Hosseini',
    mentorNameFA: 'دکتر لیلا حسینی',
    mentorImage: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۴/۱۵',
    time: '۱۶:۰۰',
    status: 'upcoming',
    statusFA: 'پیش رو',
    topic: 'Energy Healing',
    topicFA: 'درمان با انرژی',
  },
  {
    id: 'res-2',
    mentorName: 'Master Reza Karimi',
    mentorNameFA: 'استاد رضا کریمی',
    mentorImage: '/images/products/stones/rose-quartz.webp',
    date: '۱۴۰۳/۰۲/۲۰',
    time: '۱۴:۳۰',
    status: 'completed',
    statusFA: 'انجام شده',
    topic: 'Chakra Alignment',
    topicFA: 'تراز چاکراها',
  },
]

export const MOCK_COMMUNITY_ACTIVITY: CommunityActivity[] = [
  {
    id: 'ca-1',
    type: 'post',
    typeFA: 'پست',
    title: 'My experience with amethyst meditation',
    titleFA: 'تجربه من با مدیتیشن آمتیست',
    date: '۱۴۰۳/۰۳/۱۰',
    href: '/community/post/1',
  },
  {
    id: 'ca-2',
    type: 'comment',
    typeFA: 'نظر',
    title: 'Re: Best crystals for beginners',
    titleFA: 'در پاسخ به: بهترین کریستال برای مبتدیان',
    date: '۱۴۰۳/۰۳/۰۸',
    href: '/community/post/2',
  },
]

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    message: 'Your order ORD-001 has been delivered',
    messageFA: 'سفارش ORD-001 شما تحویل داده شد',
    date: '۱۴۰۳/۰۲/۱۵',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'mentorship',
    message: 'Reminder: Session with Dr. Leila tomorrow at 16:00',
    messageFA: 'یادآوری: جلسه با دکتر لیلا فردا ساعت ۱۶:۰۰',
    date: '۱۴۰۳/۰۴/۱۴',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'community',
    message: 'Someone liked your post',
    messageFA: 'کسی پست شما را لایک کرد',
    date: '۱۴۰۳/۰۳/۱۱',
    isRead: true,
  },
]

// --- API Hooks (connect when backend is ready) ---
// export async function fetchUserProfile(): Promise<UserProfile> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/store/customers/me`)
//   return res.json()
// }
// export async function fetchOrders(): Promise<Order[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/store/orders`)
//   return res.json()
// }
// export async function fetchWishlist(): Promise<WishlistItem[]> { ... }
// export async function fetchMentorshipReservations(): Promise<MentorshipReservation[]> { ... }
// export async function fetchNotifications(): Promise<Notification[]> { ... }

// --- تحریریه Mock Data ---

export interface TahririyeEducational {
  id: string
  slug: string
  titleFA: string
  description: string
  descriptionFA: string
  thumbnail: string
  videoUrl?: string
  lessons: {
    id: string
    titleFA: string
    duration: string
    contentFA: string
  }[]
  tags: string[]
}

export interface TahririyeBook {
  id: string
  slug: string
  titleFA: string
  authorFA: string
  cover: string
  summaryFA: string
  buyLink: string
  genre: string
  genreFA: string
  rating: number
}

export interface TahririyeArticle {
  id: string
  slug: string
  titleFA: string
  authorFA: string
  date: string
  thumbnail: string
  contentFA: string
  tags: string[]
  readTimeFA: string
}

export interface TahririyePoem {
  id: string
  slug: string
  titleFA: string
  poetFA: string
  era: string
  eraFA: string
  lines: string[]
  backgroundGradient: string
}

export const MOCK_TAHRIRIYE_EDUCATIONAL: TahririyeEducational[] = [
  {
    id: 'edu-1',
    slug: 'chakra-basics',
    titleFA: 'مبانی چاکراها',
    description: 'Introduction to the 7 chakras',
    descriptionFA: 'آشنایی با هفت چاکرای اصلی بدن و نقش آن‌ها در سلامت انرژی',
    thumbnail: '/images/tahririye/educational-card.webp',
    videoUrl: 'https://example.com/video/chakra-basics',
    lessons: [
      {
        id: 'l-1',
        titleFA: 'چاکرا چیست؟',
        duration: '۱۲ دقیقه',
        contentFA: 'چاکرا در سانسکریت به معنای "چرخ" است. این مراکز انرژی در طول ستون فقرات قرار دارند و هر کدام با جنبه‌ای از سلامت جسمی و روحی مرتبط هستند. هفت چاکرای اصلی از پایه ستون فقرات تا تاج سر امتداد دارند.',
      },
      {
        id: 'l-2',
        titleFA: 'چاکرای ریشه',
        duration: '۱۵ دقیقه',
        contentFA: 'چاکرای ریشه یا موولادهارا در پایه ستون فقرات قرار دارد. این چاکرا با احساس امنیت، ثبات و ارتباط با زمین مرتبط است. رنگ آن قرمز و عنصر مرتبطش خاک است.',
      },
      {
        id: 'l-3',
        titleFA: 'تعادل انرژی',
        duration: '۱۸ دقیقه',
        contentFA: 'برای تعادل چاکراها می‌توان از روش‌های مختلفی استفاده کرد: مدیتیشن، یوگا، کریستال درمانی و تنفس عمیق. هر روش به شیوه‌ای متفاوت به باز شدن و تعادل مراکز انرژی کمک می‌کند.',
      },
    ],
    tags: ['چاکرا', 'انرژی', 'مبتدی'],
  },
  {
    id: 'edu-2',
    slug: 'crystal-healing',
    titleFA: 'کریستال درمانی',
    description: 'Healing with crystals',
    descriptionFA: 'استفاده از کریستال‌ها برای درمان و تعادل انرژی',
    thumbnail: '/images/tahririye/educational-card.webp',
    lessons: [
      {
        id: 'l-4',
        titleFA: 'انتخاب کریستال مناسب',
        duration: '۱۰ دقیقه',
        contentFA: 'انتخاب کریستال درمانی باید با توجه به نیاز انرژی شما انجام شود. آمتیست برای آرامش و خواب، کوارتز رز برای عشق و مهربانی، و کوارتز شفاف برای وضوح ذهن مناسب هستند.',
      },
    ],
    tags: ['کریستال', 'درمان', 'انرژی'],
  },
  {
    id: 'edu-3',
    slug: 'meditation-guide',
    titleFA: 'راهنمای مدیتیشن',
    description: 'Complete meditation guide',
    descriptionFA: 'راهنمای کامل مدیتیشن برای مبتدیان تا پیشرفته',
    thumbnail: '/images/tahririye/educational-card.webp',
    lessons: [
      {
        id: 'l-5',
        titleFA: 'شروع مدیتیشن',
        duration: '۸ دقیقه',
        contentFA: 'مدیتیشن نیاز به تمرین منظم دارد. با ۵ دقیقه در روز شروع کنید. در یک مکان آرام بنشینید، چشمان خود را ببندید و روی تنفس تمرکز کنید.',
      },
    ],
    tags: ['مدیتیشن', 'آرامش', 'تمرین'],
  },
]

export const MOCK_TAHRIRIYE_BOOKS: TahririyeBook[] = [
  {
    id: 'book-1',
    slug: 'power-of-now',
    titleFA: 'قدرت حال',
    authorFA: 'اکهارت تله',
    cover: '/images/tahririye/books-card.webp',
    summaryFA: 'این کتاب راهنمای عملی برای زندگی در لحظه حال است. اکهارت تله در این کتاب نشان می‌دهد که چگونه با رها کردن افکار گذشته و آینده، به آرامش عمیق دست یابیم.',
    buyLink: 'https://ketabrah.ir',
    genre: 'Spirituality',
    genreFA: 'معنویت',
    rating: 4.8,
  },
  {
    id: 'book-2',
    slug: 'alchemist',
    titleFA: 'کیمیاگر',
    authorFA: 'پائولو کوئیلو',
    cover: '/images/tahririye/books-card.webp',
    summaryFA: 'داستان سانتیاگو، چوپان جوانی که در جستجوی گنج به سفری معنوی می‌رود. کوئیلو در این رمان پیام می‌دهد که وقتی چیزی را با تمام وجود بخواهید، کل هستی برای تحقق آن تلاش می‌کند.',
    buyLink: 'https://ketabrah.ir',
    genre: 'Fiction',
    genreFA: 'داستان',
    rating: 4.7,
  },
  {
    id: 'book-3',
    slug: 'healing-crystals',
    titleFA: 'درمان با کریستال',
    authorFA: 'جودی هال',
    cover: '/images/tahririye/books-card.webp',
    summaryFA: 'راهنمای جامع کریستال درمانی که خواص درمانی بیش از ۲۰۰ کریستال را توضیح می‌دهد. این کتاب مرجع اصلی کریستال تراپیست‌های حرفه‌ای در سراسر جهان است.',
    buyLink: 'https://ketabrah.ir',
    genre: 'Healing',
    genreFA: 'درمان',
    rating: 4.6,
  },
]

export const MOCK_TAHRIRIYE_ARTICLES: TahririyeArticle[] = [
  {
    id: 'art-1',
    slug: 'energy-centers',
    titleFA: 'مراکز انرژی در بدن انسان',
    authorFA: 'دکتر مریم رضایی',
    date: '۱۴۰۳/۰۲/۱۵',
    thumbnail: '/images/tahririye/articles-card.webp',
    contentFA: `مراکز انرژی یا چاکراها از دیرباز در فلسفه هندی و آیورودا مطرح بوده‌اند. این مراکز انرژتیک در نقاط خاصی از بدن قرار دارند و با اندام‌ها و سیستم‌های مختلف بدن در ارتباط هستند.

تحقیقات مدرن نشان می‌دهد که این نقاط با گره‌های عصبی و غدد درون‌ریز بدن همخوانی دارند. برای مثال، چاکرای تاج با غده صنوبری و چاکرای گلو با تیروئید مرتبط است.

برای تعادل این مراکز انرژی می‌توان از روش‌های مختلفی استفاده کرد. مدیتیشن منظم، تغذیه سالم، ورزش و استفاده از کریستال‌های مناسب همگی در این زمینه موثر هستند.

مهم‌ترین نکته این است که تعادل انرژی یک فرآیند تدریجی است و نیاز به صبر و تمرین مداوم دارد.`,
    tags: ['چاکرا', 'انرژی', 'سلامت'],
    readTimeFA: '۵ دقیقه',
  },
  {
    id: 'art-2',
    slug: 'crystal-science',
    titleFA: 'علم پشت کریستال درمانی',
    authorFA: 'پروفسور علی محمدی',
    date: '۱۴۰۳/۰۳/۰۱',
    thumbnail: '/images/tahririye/articles-card.webp',
    contentFA: `کریستال‌ها از نظر علمی ساختارهای منظم اتمی هستند که خواص فیزیکی منحصربه‌فردی دارند. اثر پیزوالکتریک در کوارتز، که در ساعت‌های کوارتزی استفاده می‌شود، نمونه‌ای از خواص واقعی کریستال‌هاست.

در کریستال درمانی، باور بر این است که این ساختارهای منظم می‌توانند با میدان‌های انرژتیک بدن تعامل داشته باشند. هرچند شواهد علمی قطعی در این زمینه محدود است، اما تجربیات بسیاری از افراد نشان‌دهنده اثرات مثبت است.

مهم‌ترین عامل در کریستال درمانی، قصد و نیت درمانگر است. تمرکز ذهنی و باور به فرآیند درمان نقش مهمی در نتایج دارد.`,
    tags: ['کریستال', 'علم', 'درمان'],
    readTimeFA: '۷ دقیقه',
  },
]

export const MOCK_TAHRIRIYE_POEMS: TahririyePoem[] = [
  {
    id: 'poem-1',
    slug: 'rumi-love',
    titleFA: 'نی‌نامه',
    poetFA: 'مولانا جلال‌الدین رومی',
    era: 'Classical',
    eraFA: 'کلاسیک',
    lines: [
      'بشنو این نی چون شکایت می‌کند',
      'از جدایی‌ها حکایت می‌کند',
      'کز نیستان تا مرا ببریده‌اند',
      'در نفیرم مرد و زن نالیده‌اند',
      'سینه خواهم شرحه شرحه از فراق',
      'تا بگویم شرح درد اشتیاق',
    ],
    backgroundGradient: 'linear-gradient(135deg, #0d0d2b 0%, #1a0a2e 50%, #0d0d2b 100%)',
  },
  {
    id: 'poem-2',
    slug: 'hafez-wine',
    titleFA: 'غزل می',
    poetFA: 'خواجه حافظ شیرازی',
    era: 'Classical',
    eraFA: 'کلاسیک',
    lines: [
      'الا یا ایها الساقی ادر کاساً و ناولها',
      'که عشق آسان نمود اول ولی افتاد مشکل‌ها',
      'به بوی نافه‌ای کاخر صبا زان طره بگشاید',
      'ز تاب جعد مشکینش چه خون افتاد در دل‌ها',
    ],
    backgroundGradient: 'linear-gradient(135deg, #1a0d0d 0%, #2d1a00 50%, #1a0d0d 100%)',
  },
  {
    id: 'poem-3',
    slug: 'khayyam-moment',
    titleFA: 'رباعی لحظه',
    poetFA: 'عمر خیام',
    era: 'Classical',
    eraFA: 'کلاسیک',
    lines: [
      'می‌خور که ز دل کثرت و قلت ببرد',
      'وندیشه هفتاد و دو ملت ببرد',
      'پرهیز مکن ز کیمیایی که از او',
      'یک جرعه خوری هزار علت ببرد',
    ],
    backgroundGradient: 'linear-gradient(135deg, #0a1a0a 0%, #0d2b1a 50%, #0a1a0a 100%)',
  },
]

// --- Blog Mock Data ---

export interface BlogCategory {
  id: string
  slug: string
  labelFA: string
  accentColor: string
}

export interface BlogPost {
  id: string
  slug: string
  titleFA: string
  summaryFA: string
  contentFA: string
  thumbnail: string
  authorFA: string
  authorAvatar: string
  date: string
  readTimeFA: string
  category: string
  categoryFA: string
  accentColor: string
  tags: string[]
  related: string[]
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'all',        slug: 'all',        labelFA: 'همه',          accentColor: 'var(--gold-accent)' },
  { id: 'energy',     slug: 'energy',     labelFA: 'انرژی',        accentColor: 'var(--chakra-crown)' },
  { id: 'crystals',   slug: 'crystals',   labelFA: 'کریستال',      accentColor: 'var(--chakra-throat)' },
  { id: 'meditation', slug: 'meditation', labelFA: 'مدیتیشن',      accentColor: 'var(--chakra-third)' },
  { id: 'lifestyle',  slug: 'lifestyle',  labelFA: 'سبک زندگی',    accentColor: 'var(--chakra-heart)' },
  { id: 'spiritual',  slug: 'spiritual',  labelFA: 'معنویت',       accentColor: 'var(--chakra-sacral)' },
]

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'power-of-amethyst',
    titleFA: 'قدرت شفابخش آمتیست و تأثیر آن بر چاکرای تاج',
    summaryFA: 'آمتیست یکی از قدرتمندترین کریستال‌های معنوی است که از دیرباز برای آرامش ذهن، تقویت شهود و ارتباط با انرژی‌های بالاتر استفاده می‌شده است.',
    contentFA: `آمتیست با رنگ بنفش دلنشین خود، یکی از محبوب‌ترین کریستال‌های معنوی در سراسر جهان است. این سنگ قیمتی از خانواده کوارتز بوده و رنگ بنفش آن ناشی از وجود آهن و تابش اشعه گاما در طول تشکیل آن است.

در سنت‌های معنوی مختلف، آمتیست به عنوان سنگ معنویت و آگاهی شناخته می‌شود. یونانیان باستان باور داشتند که این سنگ از مستی جلوگیری می‌کند و ذهن را شفاف نگه می‌دارد. در سنت بودایی، آمتیست با مدیتیشن و آرامش ذهن مرتبط است.

از نظر چاکرا درمانی، آمتیست با چاکرای تاج (Crown Chakra) و چاکرای چشم سوم (Third Eye Chakra) در ارتباط است. این دو چاکرا مراکز شهود، خرد و ارتباط با آگاهی برتر هستند.

برای استفاده از آمتیست در مدیتیشن، آن را در دست چپ خود بگیرید یا روی پیشانی قرار دهید. نفس عمیق بکشید و تصور کنید نور بنفش از سنگ به سمت چاکرای تاج شما جریان می‌یابد.

نگهداری از آمتیست نیاز به دقت دارد. این سنگ در برابر نور مستقیم خورشید حساس است و ممکن است رنگ خود را از دست بدهد. برای تمیز کردن آن از آب خنک استفاده کنید و برای شارژ مجدد آن را زیر نور ماه قرار دهید.`,
    thumbnail: '/images/products/stones/amethyst.webp',
    authorFA: 'سارا احمدی',
    authorAvatar: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۳/۱۵',
    readTimeFA: '۶ دقیقه',
    category: 'crystals',
    categoryFA: 'کریستال',
    accentColor: 'var(--chakra-crown)',
    tags: ['آمتیست', 'چاکرا', 'کریستال درمانی', 'مدیتیشن'],
    related: ['healing-crystals-guide', 'chakra-meditation'],
  },
  {
    id: 'blog-2',
    slug: 'healing-crystals-guide',
    titleFA: 'راهنمای جامع کریستال درمانی برای مبتدیان',
    summaryFA: 'اگر تازه وارد دنیای کریستال درمانی شده‌اید، این راهنما همه چیزهایی که باید بدانید را به زبان ساده توضیح می‌دهد.',
    contentFA: `کریستال درمانی یک روش سنتی است که از هزاران سال پیش در فرهنگ‌های مختلف استفاده می‌شده است. امروزه این روش دوباره محبوبیت زیادی پیدا کرده و بسیاری از افراد برای بهبود سلامت جسمی و روحی خود از آن بهره می‌گیرند.

اولین قدم در کریستال درمانی، انتخاب کریستال مناسب است. هر کریستال خواص و انرژی منحصربه‌فردی دارد. برخی کریستال‌های مناسب برای مبتدیان عبارتند از: کوارتز شفاف برای تقویت انرژی، آمتیست برای آرامش، کوارتز رز برای عشق و مهربانی، و سنگ سیاه تورمالین برای محافظت.

پس از انتخاب کریستال، باید آن را پاکسازی کنید. روش‌های مختلفی برای این کار وجود دارد: قرار دادن زیر نور ماه، دفن کردن در خاک، استفاده از دود سفید (ماهور)، یا قرار دادن در کنار کریستال سلنیت.

برای استفاده روزانه از کریستال‌ها می‌توانید آن‌ها را با خود حمل کنید، در محیط خانه قرار دهید، یا در مدیتیشن از آن‌ها استفاده کنید.`,
    thumbnail: '/images/products/stones/rose-quartz.webp',
    authorFA: 'دکتر مریم رضایی',
    authorAvatar: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۲/۲۸',
    readTimeFA: '۸ دقیقه',
    category: 'crystals',
    categoryFA: 'کریستال',
    accentColor: 'var(--chakra-throat)',
    tags: ['کریستال', 'مبتدی', 'راهنما', 'درمان'],
    related: ['power-of-amethyst', 'chakra-meditation'],
  },
  {
    id: 'blog-3',
    slug: 'chakra-meditation',
    titleFA: 'مدیتیشن چاکرا: سفری به درون برای تعادل انرژی',
    summaryFA: 'مدیتیشن چاکرا یکی از عمیق‌ترین روش‌های کار با انرژی بدن است. در این مقاله یاد می‌گیریم چگونه با تمرکز بر هر چاکرا، انرژی بدن خود را متعادل کنیم.',
    contentFA: `مدیتیشن چاکرا یک تمرین قدرتمند است که به ما کمک می‌کند با مراکز انرژی بدن خود ارتباط برقرار کنیم. این تمرین ریشه در سنت‌های یوگی هندی دارد و هزاران سال است که توسط معنوی‌گرایان سراسر جهان استفاده می‌شود.

برای شروع مدیتیشن چاکرا، در یک مکان آرام و راحت بنشینید. ستون فقرات خود را صاف نگه دارید و چشمان خود را ببندید. چند نفس عمیق بکشید تا ذهنتان آرام شود.

از چاکرای ریشه در پایه ستون فقرات شروع کنید. تصور کنید نور قرمزی در این نقطه می‌درخشد. با هر نفس، این نور روشن‌تر و قوی‌تر می‌شود. احساس ثبات و امنیت کنید.

به آرامی به سمت بالا حرکت کنید و هر چاکرا را با رنگ مربوطه تجسم کنید: چاکرای ناف (نارنجی)، چاکرای شمسی (زرد)، چاکرای قلب (سبز)، چاکرای گلو (آبی)، چاکرای چشم سوم (بنفش)، و چاکرای تاج (سفید یا طلایی).`,
    thumbnail: '/images/tahririye/educational-card.webp',
    authorFA: 'استاد رضا کریمی',
    authorAvatar: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۳/۰۵',
    readTimeFA: '۱۰ دقیقه',
    category: 'meditation',
    categoryFA: 'مدیتیشن',
    accentColor: 'var(--chakra-third)',
    tags: ['مدیتیشن', 'چاکرا', 'انرژی', 'تعادل'],
    related: ['power-of-amethyst', 'morning-energy-ritual'],
  },
  {
    id: 'blog-4',
    slug: 'morning-energy-ritual',
    titleFA: 'آیین صبحگاهی برای شارژ انرژی روزانه',
    summaryFA: 'یک روتین صبحگاهی قدرتمند می‌تواند انرژی کل روز شما را متحول کند. در این مقاله پنج تمرین ساده اما موثر برای شروع روز با انرژی بالا معرفی می‌کنیم.',
    contentFA: `صبح‌ها بهترین زمان برای تنظیم انرژی روزانه هستند. ذهن در این ساعات هنوز تازه است و پذیرای تمرین‌های انرژتیک می‌باشد.

اولین کار پس از بیدار شدن، نوشیدن یک لیوان آب با چند قطره آب لیمو است. این کار سیستم گوارش را فعال می‌کند و انرژی جسمی را تقویت می‌نماید.

سپس پنج دقیقه مدیتیشن تنفسی انجام دهید. روی یک صندلی یا روی زمین بنشینید، چشمان خود را ببندید و فقط بر تنفس خود تمرکز کنید.

قدم سوم، گرفتن کریستال مورد علاقه‌تان در دست است. قصد روز خود را برای آن بیان کنید. این کار ذهن را روی هدف روزانه متمرکز می‌کند.

سپس چند حرکت کششی ساده انجام دهید تا انرژی در بدن جریان یابد. نیازی به تمرین سنگین نیست، چند حرکت ساده کافی است.

در نهایت، سه چیزی که برای آن‌ها سپاسگزار هستید را در ذهن مرور کنید. این تمرین ذهنیت مثبت را در طول روز حفظ می‌کند.`,
    thumbnail: '/images/tahririye/educational-card.webp',
    authorFA: 'لیلا حسینی',
    authorAvatar: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۳/۲۰',
    readTimeFA: '۵ دقیقه',
    category: 'lifestyle',
    categoryFA: 'سبک زندگی',
    accentColor: 'var(--chakra-solar)',
    tags: ['روتین صبح', 'انرژی', 'سبک زندگی'],
    related: ['chakra-meditation', 'healing-crystals-guide'],
  },
  {
    id: 'blog-5',
    slug: 'candle-ritual',
    titleFA: 'آیین شمع: نور آوردن به زندگی با قدرت شمع‌های مقدس',
    summaryFA: 'شمع‌ها از دیرباز در آیین‌های معنوی نقش مهمی داشته‌اند. نور شمع نماد روشنایی، امید و ارتباط با عالم بالاست.',
    contentFA: `شمع درمانی یا Candle Therapy یکی از قدیمی‌ترین روش‌های معنوی است که در فرهنگ‌های مختلف جهان استفاده می‌شده است. از معابد مصر باستان تا کلیساهای قرون وسطی، از معابد بودایی تا خانه‌های ایرانی، شمع همیشه نماد نور، امید و ارتباط با قدرت‌های برتر بوده است.

در آیین شمع، رنگ شمع اهمیت زیادی دارد. شمع‌های بنفش برای معنویت و ارتباط با آگاهی برتر، شمع‌های سبز برای سلامت و فراوانی، شمع‌های قرمز برای عشق و انرژی، و شمع‌های سفید برای پاکسازی و حفاظت استفاده می‌شوند.

برای انجام یک آیین ساده شمع، ابتدا محیط را آرام کنید. موسیقی ملایم پخش کنید و گوشی خود را کنار بگذارید. شمع را روشن کنید و چند لحظه به شعله آن خیره شوید.

نفس عمیق بکشید و قصد خود را در ذهن مجسم کنید. تصور کنید نور شمع این قصد را با خود به عالم بالا می‌برد.`,
    thumbnail: '/images/products/candles/amethyst-dream.webp',
    authorFA: 'سارا احمدی',
    authorAvatar: '/images/products/stones/amethyst.webp',
    date: '۱۴۰۳/۰۴/۰۱',
    readTimeFA: '۷ دقیقه',
    category: 'spiritual',
    categoryFA: 'معنویت',
    accentColor: 'var(--chakra-sacral)',
    tags: ['شمع', 'آیین', 'معنویت', 'انرژی'],
    related: ['morning-energy-ritual', 'chakra-meditation'],
  },
]

// API hooks (connect when backend is ready)
// export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
//   const url = category
//     ? `${process.env.NEXT_PUBLIC_MEDUSA_URL}/blog/posts?category=${category}`
//     : `${process.env.NEXT_PUBLIC_MEDUSA_URL}/blog/posts`
//   const res = await fetch(url)
//   return res.json()
// }
// export async function fetchBlogPost(slug: string): Promise<BlogPost> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/blog/posts/${slug}`)
//   return res.json()
// }
