import { Store, Product, Category, Craftsman, PlatformSettings, NotificationItem, VipPlan, VipSubscriptionRequest } from '../types';

export const VIP_PLANS: VipPlan[] = [
  {
    id: 'silver',
    name: 'باقة VIP الفضية',
    price: 2500,
    period: 'شهرياً (1 شهر)',
    badge: 'VIP فضي',
    color: '#94a3b8',
    bgGradient: 'from-slate-800 to-slate-900',
    borderGlow: 'border-slate-600/50 shadow-slate-500/10',
    features: [
      'شارة متجر / حرفي موثق VIP',
      'أسبقية في نتائج البحث والتصنيفات',
      'إشعار المتابعين بالمنتجات الجديدة',
      'دعم فني عبر الواتساب والبريد'
    ]
  },
  {
    id: 'gold',
    name: 'باقة VIP الذهبية',
    price: 5900,
    period: 'فصلي (3 أشهر)',
    badge: 'VIP ذهبي ★',
    color: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-slate-900 to-slate-900',
    borderGlow: 'border-amber-500/50 shadow-amber-500/20',
    popular: true,
    features: [
      'ظهور مباشر ومثبت في الصفحة الأولى للمنصة',
      'صدارة نتائج البحث في الولاية والتصنيف',
      'شارة ذهبية متوهجة VIP Gold للمحل / الحرفي',
      'إرسال إشعارات فورية (Push Notification) لعملاء الولاية',
      'لوحة تحليلات وإحصاءات متقدمة للزيارات والطلبات',
      'أولوية معالجة الشحنات والدعم الفني 24/7'
    ]
  },
  {
    id: 'diamond',
    name: 'باقة VIP الماسية الملكية',
    price: 9900,
    period: 'نصف سنوي (6 أشهر)',
    badge: 'VIP ماسي 👑',
    color: '#00d4c8',
    bgGradient: 'from-teal-950/40 via-cyan-950/30 to-slate-900',
    borderGlow: 'border-[#00d4c8]/60 shadow-[0_0_30px_rgba(0,212,200,0.25)]',
    features: [
      'تثبيت دائم في صدارة البنر الرئيسي للموقع',
      'المرتبة الأولى المطلقة في كافة محركات البحث داخل المنصة',
      'شارة VIP الماسية الملكية المشعة 👑',
      'إشعارات ترويجية أسبوعية لجميع مستخدمي المنصة بالجزائر',
      'ترويج تسويقي مجاني عبر قنوات المنصة الرسمية',
      'مدير حساب مخصص وتسهيلات دفع بنكية خاصة'
    ]
  }
];

export const INITIAL_VIP_REQUESTS: VipSubscriptionRequest[] = [
  {
    id: 'VIP-REQ-101',
    entityType: 'store',
    entityId: 1,
    name: 'محل الأناقة الفاخرة',
    phone: '0777946398',
    email: 'anaka@fenk.dz',
    wilaya: '57 - المغير',
    planId: 'diamond',
    planName: 'باقة VIP الماسية الملكية',
    price: 9900,
    paymentMethod: 'baridimob',
    transactionRef: 'BM-2026-984321',
    receiptNote: 'تم تحويل المبلغ عبر تطبيق بريدي موب، الإيصال مرفق بالرقم المرجعي',
    date: '2026-08-19 14:30',
    status: 'approved',
    reviewedAt: '2026-08-19 15:00'
  },
  {
    id: 'VIP-REQ-102',
    entityType: 'craftsman',
    entityId: 1,
    name: 'أحمد بن علي (مقاول معتمد)',
    phone: '0777946398',
    email: 'ahmed.benaali@fenk.dz',
    wilaya: '57 - المغير',
    planId: 'gold',
    planName: 'باقة VIP الذهبية',
    price: 5900,
    paymentMethod: 'ccp',
    transactionRef: 'CCP-DZ-874211',
    receiptNote: 'تم الدفع في مكتب بريد المغير، وصل رقم 44321',
    date: '2026-08-19 16:15',
    status: 'approved',
    reviewedAt: '2026-08-19 16:30'
  },
  {
    id: 'VIP-REQ-103',
    entityType: 'store',
    entityId: 3,
    name: 'بيت الجمال والعطور',
    phone: '0661234567',
    email: 'beauty@fenk.dz',
    wilaya: '31 - وهران',
    planId: 'gold',
    planName: 'باقة VIP الذهبية',
    price: 5900,
    paymentMethod: 'baridimob',
    transactionRef: 'BM-992140',
    receiptNote: 'طلب اشتراك جديد لباقة VIP الذهبية لدعم مبيعات العطور في وهران',
    date: '2026-08-19 17:45',
    status: 'pending'
  },
  {
    id: 'VIP-REQ-104',
    entityType: 'craftsman',
    entityId: 2,
    name: 'ياسين بلقاسم (كهربائي)',
    phone: '0550987654',
    email: 'yassine.elec@fenk.dz',
    wilaya: '16 - الجزائر العاصمة',
    planId: 'silver',
    planName: 'باقة VIP الفضية',
    price: 2500,
    paymentMethod: 'baridimob',
    transactionRef: 'BM-112345',
    receiptNote: 'تحويل بريدي موب لتفعيل الظهور المميز في الجزائر العاصمة',
    date: '2026-08-19 18:20',
    status: 'pending'
  }
];

export const INITIAL_STORES: Store[] = [
  {
    id: 1,
    name: 'محل الأناقة الفاخرة',
    icon: '👕',
    category: 'أزياء',
    rating: 4.9,
    products: 156,
    reviews: 320,
    desc: 'أحدث صيحات الموضة والأزياء العصرية للرجال والنساء بأعلى معايير الجودة والخامات العالمية.',
    phone: '0777946398',
    email: 'anaka@fenk.dz',
    status: 'active',
    code: 'VEND1001',
    bannerColor: 'from-cyan-900/60 to-slate-900',
    featured: true,
    wilaya: '57 - المغير',
    isVip: true,
    vipBadge: 'VIP ماسي 👑',
    vipPlanId: 'diamond',
    vipPriority: 100
  },
  {
    id: 2,
    name: 'تك ستور التقني',
    icon: '💻',
    category: 'إلكترونيات',
    rating: 4.9,
    products: 89,
    reviews: 210,
    desc: 'أحدث الهواتف الذكية، أجهزة الكمبيوتر، الأجهزة اللوحية، وكافة الإكسسوارات التقنية الأصلية مع الضمان.',
    phone: '0550123456',
    email: 'tech@fenk.dz',
    status: 'active',
    code: 'VEND1002',
    bannerColor: 'from-blue-900/60 to-slate-900',
    featured: true,
    wilaya: '16 - الجزائر العاصمة',
    isVip: true,
    vipBadge: 'VIP ذهبي ★',
    vipPlanId: 'gold',
    vipPriority: 90
  },
  {
    id: 3,
    name: 'بيت الجمال والعطور',
    icon: '💄',
    category: 'جمال',
    rating: 4.8,
    products: 234,
    reviews: 450,
    desc: 'منتجات العناية الفائقة بالبشرة والشعر، المكياج الاحترافي وأفخم العطور الشرقية والفرنسية الأصلية 100%.',
    phone: '0661234567',
    email: 'beauty@fenk.dz',
    status: 'active',
    code: 'VEND1003',
    bannerColor: 'from-pink-900/60 to-slate-900',
    featured: true,
    wilaya: '31 - وهران'
  },
  {
    id: 4,
    name: 'سوبر ماركت الواحة',
    icon: '🛒',
    category: 'بقالة',
    rating: 4.7,
    products: 520,
    reviews: 890,
    desc: 'جميع الاحتياجات التموينية المنزلية، خضار وفواكه طازجة، تمور دقلة نور ومنتجات غذائية يومية بجودة فائقة.',
    phone: '0770987654',
    email: 'waha@fenk.dz',
    status: 'active',
    code: 'VEND1004',
    bannerColor: 'from-emerald-900/60 to-slate-900',
    featured: true,
    wilaya: '57 - المغير'
  },
  {
    id: 5,
    name: 'رياضة بلس للأبطال',
    icon: '⚽',
    category: 'رياضة',
    rating: 4.6,
    products: 120,
    reviews: 180,
    desc: 'المعدات الرياضية المتطورة، أجهزة بناء الأجسام، الملابس الرياضية المريحة والأحذية المعتمدة.',
    phone: '0555112233',
    email: 'sport@fenk.dz',
    status: 'active',
    code: 'VEND1005',
    bannerColor: 'from-amber-900/60 to-slate-900',
    featured: false,
    wilaya: '19 - سطيف'
  },
  {
    id: 6,
    name: 'ديكور هوم والمفروشات',
    icon: '🏠',
    category: 'أثاث',
    rating: 4.8,
    products: 78,
    reviews: 150,
    desc: 'أرقى قطع الأثاث المنزلي العصري، إضاءات فاخرة، وسجاد ولوحات فنية لإضفاء لمسة جمالية على بيتك.',
    phone: '0663445566',
    email: 'decor@fenk.dz',
    status: 'active',
    code: 'VEND1006',
    bannerColor: 'from-indigo-900/60 to-slate-900',
    featured: false,
    wilaya: '25 - قسنطينة'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'قميص رجالي كلاسيك فاخر',
    price: 149,
    oldPrice: 199,
    store: 'محل الأناقة الفاخرة',
    storeId: 1,
    icon: '👔',
    badge: 'خصم 25%',
    category: 'أزياء',
    stock: 45,
    desc: 'قميص قطني 100% بتصميم إيطالي عصري ومريح للمناسبات الرسمية واليومية.',
    rating: 4.8
  },
  {
    id: 2,
    name: 'آيفون 16 برو ماكس (256 جيجا)',
    price: 4899,
    oldPrice: 5299,
    store: 'تك ستور التقني',
    storeId: 2,
    icon: '📱',
    badge: 'الأكثر مبيعاً',
    category: 'إلكترونيات',
    stock: 18,
    desc: 'أحدث هواتف أبل مع معالج A18 Pro الجبار ونظام الكاميرات السينمائي المتقدم وتيتانيوم طبيعي.',
    rating: 5.0
  },
  {
    id: 3,
    name: 'سيروم فيتامين سي للنضارة الفورية',
    price: 89,
    oldPrice: 120,
    store: 'بيت الجمال والعطور',
    storeId: 3,
    icon: '🧴',
    badge: 'عرض خاص',
    category: 'جمال',
    stock: 60,
    desc: 'تركيبة غنية بحمض الهيالورونيك ومضادات الأكسدة لتوحيد لون البشرة وإعادة إشراقتها.',
    rating: 4.9
  },
  {
    id: 4,
    name: 'أرز بسمتي عنبر هندي (5 كجم)',
    price: 38,
    oldPrice: 48,
    store: 'سوبر ماركت الواحة',
    storeId: 4,
    icon: '🍚',
    badge: null,
    category: 'بقالة',
    stock: 120,
    desc: 'أرز حبة طويلة معتق برائحة ونكهة زكية استثنائية.',
    rating: 4.7
  },
  {
    id: 5,
    name: 'حذاء رياضي إير ماكس للمشي والجري',
    price: 320,
    oldPrice: 420,
    store: 'رياضة بلس للأبطال',
    storeId: 5,
    icon: '👟',
    badge: 'جديد ومميز',
    category: 'رياضة',
    stock: 25,
    desc: 'توسيد هوائي ممتص للصدمات ونسيج شبكي مسامي فائق الخفة والراحة.',
    rating: 4.7
  },
  {
    id: 6,
    name: 'طاولة قهوة رخامية بتصميم نيو كلاسيك',
    price: 520,
    oldPrice: 699,
    store: 'ديكور هوم والمفروشات',
    storeId: 6,
    icon: '🪑',
    badge: 'تخفيض موسمي',
    category: 'أثاث',
    stock: 12,
    desc: 'سطح رخامي طبيعي مقاوم للحرارة والخدش مع قوائم معدنية مطلية بماء الذهب المطفي.',
    rating: 4.9
  },
  {
    id: 7,
    name: 'فستان سهرة حريري مطرز يدوياً',
    price: 420,
    oldPrice: 580,
    store: 'محل الأناقة الفاخرة',
    storeId: 1,
    icon: '👗',
    badge: 'إصدار محدود',
    category: 'أزياء',
    stock: 8,
    desc: 'خامات حرير ناعمة وقصة ملكية تبرز الجمال والأناقة في المناسبات الكبرى.',
    rating: 4.9
  },
  {
    id: 8,
    name: 'سماعات AirPods Pro الجيل الثاني Type-C',
    price: 799,
    oldPrice: 949,
    store: 'تك ستور التقني',
    storeId: 2,
    icon: '🎧',
    badge: 'الأعلى تقييماً',
    category: 'إلكترونيات',
    stock: 30,
    desc: 'عزل ضوضاء نشط مضاعف، صوت مكاني مخصص وعمر بطارية يصل إلى 30 ساعة.',
    rating: 4.9
  },
  {
    id: 9,
    name: 'باليت مكياج احترافي 24 لون متألق',
    price: 199,
    oldPrice: 280,
    store: 'بيت الجمال والعطور',
    storeId: 3,
    icon: '💄',
    badge: 'مفضل للمحترفين',
    category: 'جمال',
    stock: 40,
    desc: 'ألوان عالية الصبغة وسهلة الدمج تشمل درجات مطفية ولامعة تناسب كل ألوان البشرة.',
    rating: 4.8
  },
  {
    id: 10,
    name: 'زيت زيتون بكر ممتاز معصور على البارد (1 لتر)',
    price: 49,
    oldPrice: 65,
    store: 'سوبر ماركت الواحة',
    storeId: 4,
    icon: '🫒',
    badge: 'عضوي 100%',
    category: 'بقالة',
    stock: 95,
    desc: 'مستخرج من أجود مزارع الجوف بعصرة أولى نقية ذات حموضة أقل من 0.5%.',
    rating: 4.9
  },
  {
    id: 11,
    name: 'طقم أثقال مطاطية قابلة للتعديل (20 كجم)',
    price: 240,
    oldPrice: 310,
    store: 'رياضة بلس للأبطال',
    storeId: 5,
    icon: '🏋️',
    badge: null,
    category: 'رياضة',
    stock: 15,
    desc: 'طقم تمارين منزلي متكامل مع حقيبة حمل وقفل أمان عالي المتانة.',
    rating: 4.6
  },
  {
    id: 12,
    name: 'طقم كنب زاوية مودرن 6 مقاعد',
    price: 2799,
    oldPrice: 3499,
    store: 'ديكور هوم والمفروشات',
    storeId: 6,
    icon: '🛋️',
    badge: 'شحن مجاني',
    category: 'أثاث',
    stock: 5,
    desc: 'إسفنج عالي الكثافة مع قماش كتان معالج ضد البقع والماء وهيكل خشب زان متين.',
    rating: 4.8
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { name: 'الكل', icon: '📦', count: 'الكل' },
  { name: 'أزياء', icon: '👕', count: '156' },
  { name: 'إلكترونيات', icon: '💻', count: '89' },
  { name: 'جمال', icon: '💄', count: '234' },
  { name: 'بقالة', icon: '🛒', count: '520' },
  { name: 'رياضة', icon: '⚽', count: '120' },
  { name: 'أثاث', icon: '🏠', count: '78' }
];

export const INITIAL_CRAFTSMEN: Craftsman[] = [
  {
    id: 1,
    name: 'أحمد بن علي (مقاول معتمد)',
    avatar: '👷‍♂️',
    profession: 'بناء وتشطيب عام',
    city: 'المغير',
    phone: '0777946398',
    whatsapp: '213777946398',
    bio: 'مقاول بناء وتشطيبات عامة معتمد في ولاية المغير والمناطق المجاورة بخبرة تتجاوز 15 عاماً. تنفيذ الفلل والمنازل والترميمات الكبرى بأعلى معايير الإتقان.',
    experience: 15,
    mobility: true,
    rating: 4.9,
    reviews: 142,
    jobs: 365,
    skills: ['بناء عظم', 'تشطيب لوكس', 'ترميم منازل', 'صب خرسانة', 'عوازل مائية وحرارية'],
    gallery: ['🏗️', '🧱', '🏠', '🔨', '🏘️', '🏢'],
    verified: true,
    status: 'active',
    isVip: true,
    vipBadge: 'VIP بلاتيني 👑',
    vipPlanId: 'diamond',
    vipPriority: 100,
    reviewsList: [
      { name: 'كريم الدراجي', avatar: '👤', rating: 5, date: 'قبل يومين', text: 'عمل متقن جداً وأمانة عالية في شراء المواد والتنفيذ. إنجاز المشروع قبل الموعد.' },
      { name: 'فاروق مبروكي', avatar: '👤', rating: 5, date: 'قبل أسبوع', text: 'أبو أحمد قمة في الأخلاق والاحتراف، بنى لي منزلاً عائلياً كاملاً بجودة ممتازة.' },
      { name: 'سليم بلحاج', avatar: '👤', rating: 4, date: 'قبل 3 أسابيع', text: 'شغل نظيف وفريق عمل محترم، دقيق في الملاحظات.' }
    ]
  },
  {
    id: 2,
    name: 'محمد الهواري (فنان الخشب)',
    avatar: '🪚',
    profession: 'نجار وديكورات خشبية',
    city: 'وهران',
    phone: '0550987654',
    whatsapp: '213550987654',
    bio: 'نجار محترف ومصمم ديكورات خشبية وبديل خشب. تفصيل غرف نوم، دواليب مطابخ عصرية، أبواب خشبية وأعمال CNC متطورة.',
    experience: 12,
    mobility: true,
    rating: 4.8,
    reviews: 104,
    jobs: 295,
    skills: ['تفصيل مطابخ', 'غرف نوم مخصصة', 'ديكورات خشبية', 'أبواب وشبابيك', 'تركيب باركيه'],
    gallery: ['🪑', '🚪', '🛏️', '📦', '🪵', '🔧'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'عبدالقادر بوعزة', avatar: '👤', rating: 5, date: 'قبل 3 أيام', text: 'فصّل لي غرفة نوم وخزانة ملابس جدارية بجودة خشب رائعة وتشطيب أروع.' },
      { name: 'ناصر منصوري', avatar: '👤', rating: 5, date: 'قبل 10 أيام', text: 'دقيق في المقاسات وذوق رفيع في اختيار الألوان والتفاصيل.' }
    ]
  },
  {
    id: 3,
    name: 'سعد العاصمي (سباك الطوارئ)',
    avatar: '🔧',
    profession: 'سباك وتمديدات صحية',
    city: 'الجزائر العاصمة',
    phone: '0661456789',
    whatsapp: '213661456789',
    bio: 'فني سباكة وتمديدات صحية وحلول كشف تسربات المياه المعتمدة بالأجهزة الإلكترونية. صيانة وتأسيس شبكات الصرف والمضخات وسخانات المياه.',
    experience: 10,
    mobility: true,
    rating: 4.8,
    reviews: 218,
    jobs: 540,
    skills: ['كشف تسربات', 'تأسيس حمامات', 'صيانة مضخات', 'تركيب فلاتر وسخانات', 'صرف صحي'],
    gallery: ['🚿', '🚽', '🛁', '🔩', '💧', '🚰'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'حمزة زروقي', avatar: '👤', rating: 5, date: 'أمس', text: 'استجاب فوراً في حالة طارئة وحل مشكلة التسرب في وقت قياسي وبسعر معقول.' },
      { name: 'خالد بوزيد', avatar: '👤', rating: 4, date: 'قبل أسبوعين', text: 'شغل ممتاز وفحص شامل لشبكة المياه المنزلية.' }
    ]
  },
  {
    id: 4,
    name: 'رياض القسنطيني (كهربائي معتمد)',
    avatar: '⚡',
    profession: 'كهربائي وتمديدات ذكية',
    city: 'قسنطينة',
    phone: '0771234567',
    whatsapp: '213771234567',
    bio: 'مهندس وتقني كهربائي متخصص في التمديدات المنزلية والصناعية وأنظمة المنزل الذكي Smart Home والإضاءة المخفية LED.',
    experience: 9,
    mobility: true,
    rating: 4.7,
    reviews: 165,
    jobs: 410,
    skills: ['أنظمة منازل ذكية', 'لوحات توزيع', 'إنارة مخفية LED', 'توصيل قواطع', 'صيانة طوارئ'],
    gallery: ['💡', '🔌', '⚡', '🔋', '💻', '📡'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'فؤاد رحماني', avatar: '👤', rating: 5, date: 'قبل 4 أيام', text: 'قام بتركيب شبكة إنارة ذكية وتحكم بالهاتف للمنزل باحترافية تامة.' },
      { name: 'سفيان شريف', avatar: '👤', rating: 5, date: 'قبل أسبوعين', text: 'سرعة ودقة وشهادة ضمان على التمديدات.' }
    ]
  },
  {
    id: 5,
    name: 'عبدالرزاق السطايفي (فنان الدهان)',
    avatar: '🎨',
    profession: 'دهان وديكورات جدارية',
    city: 'سطيف',
    phone: '0555789012',
    whatsapp: '213555789012',
    bio: 'معلم دهانات داخلية وخارجية، بويات حديثة، بديل رخام وبديل خشب، ورق جدران، مع معالجة الرطوبة والتشققات بحرفية تامة.',
    experience: 11,
    mobility: false,
    rating: 4.9,
    reviews: 98,
    jobs: 245,
    skills: ['دهانات عصرية', 'بديل رخام وفوم', 'ورق جدران', 'واجهات بروفايل', 'معالجة رطوبة'],
    gallery: ['🎨', '🖌️', '🏠', '🌈', '🖼️', '🎭'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'طارق قادري', avatar: '👤', rating: 5, date: 'قبل يومين', text: 'تنسيق ألوان بديع جداً وتسليم المكان نظيفاً بدون أي آثار دهان.' }
    ]
  },
  {
    id: 6,
    name: 'بلال الباتني (ورشة حدادة فنية)',
    avatar: '🔨',
    profession: 'حداد وأبواب ليزر',
    city: 'باتنة',
    phone: '0662890123',
    whatsapp: '213662890123',
    bio: 'تصنيع وتركيب أبواب حديد قص ليزر، درابزين ستيل مقاوم، مظلات سيارات، برجولات حدائق وشبابيك حماية بأحدث الموديلات العصرية.',
    experience: 14,
    mobility: true,
    rating: 4.8,
    reviews: 80,
    jobs: 195,
    skills: ['قص ليزر CNC', 'أبواب أمان', 'مظلات وسواتر', 'درابزين درج', 'شبابيك حماية'],
    gallery: ['🚪', '🔒', '⛓️', '🏗️', '⚙️', '🔧'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'عصام بوشارب', avatar: '👤', rating: 5, date: 'قبل 5 أيام', text: 'بوابة المنزل تحفة فنية، لحام متين ودهان فرن ثابت.' }
    ]
  },
  {
    id: 7,
    name: 'سفيان البسكري (معلم بلاط ورخام)',
    avatar: '🧱',
    profession: 'مبلط وجرانيت ورخام',
    city: 'بسكرة',
    phone: '0778654321',
    whatsapp: '213778654321',
    bio: 'تركيب كافة أنواع البورسلان والسيراميك والرخام بالميزان الليزري، قص زوايا 45 درجة، جلي وتلميع الرخام باحترافية عالية.',
    experience: 13,
    mobility: true,
    rating: 4.8,
    reviews: 112,
    jobs: 270,
    skills: ['بورسلان ليزري', 'رخام طبيعي', 'جلي وتلميع', 'عزل مسابح', 'أرضيات إيبوكسي'],
    gallery: ['🧱', '📐', '🏛️', '💎', '🔲', '🔨'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'أيمن عقبي', avatar: '👤', rating: 5, date: 'قبل أسبوع', text: 'ميزان دقيق ومفاصل بلاط متناسقة بدون أي عيوب.' }
    ]
  },
  {
    id: 8,
    name: 'تقي الدين البليدي (خبير التكييف)',
    avatar: '❄️',
    profession: 'فني تكييف وتبريد',
    city: 'البليدة',
    phone: '0558765432',
    whatsapp: '213558765432',
    bio: 'صيانة وتركيب مكيفات الهواء المركزية والسبليت، شحن غاز الفريون الأصلي وتنظيف الوحدات بالمضخات عالية الضغط.',
    experience: 8,
    mobility: true,
    rating: 4.9,
    reviews: 175,
    jobs: 480,
    skills: ['مكيفات سبليت', 'تكييف مركزي', 'شحن فريون', 'تأسيس نحاس', 'تنظيف وغسيل'],
    gallery: ['❄️', '💨', '🌡️', '🔧', '⚙️', '🧊'],
    verified: true,
    status: 'active',
    reviewsList: [
      { name: 'وليد مرابط', avatar: '👤', rating: 5, date: 'أمس', text: 'المكيف رجع يبرد بكفاءة ممتازة بعد الصيانة والغسيل، فني محترم ودقيق.' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'order',
    title: 'طلب جديد #ORD-2026',
    message: 'تم شراء "قميص رجالي كلاسيك" و "سيروم فيتامين سي" بقيمة 3,450 د.ج - العميل: كريم الدراجي (المغير)',
    time: 'منذ دقيقتين',
    read: false,
    data: { orderId: 'ORD-2026', total: 3450 }
  },
  {
    id: 'n-2',
    type: 'service',
    title: 'طلب خدمة جديد من حرفي',
    message: 'استفسار دردشة جديد من العميل "سارة بوزيان" للحرفي أحمد بن علي (بناء وتشطيب - المغير)',
    time: 'منذ 15 دقيقة',
    read: false
  },
  {
    id: 'n-3',
    type: 'info',
    title: 'مرحباً بك في منصة Fenk بالجزائر 🇩🇿!',
    message: 'سوق المتاجر والخدمات والحرفيين يغطي كامل الـ 69 ولاية جزائرية. استمتع بتجربة تسوق متكاملة!',
    time: 'منذ ساعة',
    read: true
  }
];

export const DEFAULT_PLATFORM_SETTINGS: PlatformSettings = {
  platformName: 'Fenk',
  supportEmail: 'kimo26d@gmail.com',
  commissionRate: 5,
  deliveryFee: 400,
  primaryColor: '#00d4c8',
  accentColor: '#ff3366',
  autoApproveStores: false,
  emergencyPhone: '0777946398',
  location: 'ولاية المغير - الجزائر 🇩🇿',
  country: 'الجزائر (الجمهورية الجزائرية الديمقراطية الشعبية)',
  currency: 'د.ج'
};

export const ADMIN_CREDENTIALS = {
  code: 'OWNER-2026',
  password: 'Fenk@Owner2026!'
};
