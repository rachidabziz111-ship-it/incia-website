export type Locale = 'ar' | 'en' | 'fr'

export const locales: Locale[] = ['ar', 'en', 'fr']
export const defaultLocale: Locale = 'ar'
export const rtlLocales: Locale[] = ['ar']

const ar = {
  dir: 'rtl' as const,
  nav: {
    home: 'الرئيسية',
    lab: 'مختبراتنا',
    catalog: 'الكتالوج',
    contact: 'تواصل',
    clinic: 'العيادة',
    startBrand: 'ابدأ براندك',
    mobileWholesale: 'كتالوج منتجات الجملة',
    mobileClinic: 'زيارة العيادة الطبية',
    mobileStart: 'ابدأ مشروع براندك الآن',
    forIndividuals: 'للعناية الفردية',
    forBrands: 'للتجار وأصحاب العلامات',
  },
  announcement: 'حلول B2B حصرية للعيادات والصيدليات والموزعين المعتمدين',
  hero: {
    slides: [
      {
        eyebrow: 'حلول B2B للمحترفين',
        headline: 'حوّل شغفك إلى إمبراطورية تجميلية',
        accent: 'بلمسة صيدلانية موثوقة',
        sub: 'مختبرات INCIA تمنحك المفتاح: تركيبات طبية حصرية جاهزة لحمل اسمك. نحن نصنع الجودة، وأنت تصنع التاريخ.',
      },
      {
        eyebrow: 'تركيبات طبية حصرية',
        headline: 'منتجات جاهزة لحمل',
        accent: 'اسم علامتك التجارية',
        sub: 'أكثر من 180 تركيبة صيدلانية مختبَرة سريرياً، تستعد لحمل اسمك وغزو الأسواق.',
      },
      {
        eyebrow: 'شراكة استراتيجية',
        headline: 'من المختبر إلى السوق',
        accent: 'بضمان الجودة والاعتماد',
        sub: '6 اعتمادات دولية، لوجستيك محكم، وفريق دعم يرافقك من الفكرة حتى الرف.',
      },
    ],
    cta1: 'ابدأ مشروع براندك',
    cta2: 'استكشف الكتالوج',
    stats: [
      { num: '+180', label: 'تركيبة طبية' },
      { num: '+12', label: 'سنة خبرة' },
      { num: '6', label: 'اعتمادات دولية' },
    ],
  },
  marquee: 'مختبرات INCIA — قوتنا العلمية ونجاح علامتك التجارية ✦ ابتكار صيدلاني موثوق يُجسّد رؤيتك الخاصة ✦ من الفكرة إلى الرفوف: نصنع الجودة تحت اسمك ✦',
  valueProps: {
    eyebrow: 'لماذا INCIA',
    title: 'الجودة الصيدلانية — أساس ثقة عملائك',
    items: [
      { title: 'تركيبات طبية معتمدة', desc: 'كل منتج مُطوَّر بمعايير صيدلانية عالمية مع شهادات جاهزة للتسويق.' },
      { title: 'Private Label كامل', desc: 'ضع اسمك وتصميمك على أي منتج من كتالوجنا بكميات منافسة.' },
      { title: 'تسليم سريع وشراكة طويلة', desc: 'لوجستيك محكم وفريق دعم متخصص يرافقك من الطلب حتى السوق.' },
    ],
  },
  featured: {
    eyebrow: 'كتالوج الجملة',
    title: 'روائع التجميل الطبي الجاهزة للتخصيص',
    sub: 'تركيبات حصرية جاهزة لحمل اسم علامتك التجارية وغزو الأسواق.',
    cta: 'استكشف الكتالوج الكامل',
    empty: 'لا توجد تركيبات حالياً — أضفها عبر Sanity Studio.',
  },
  certs: {
    eyebrow: 'اعتمادات رسمية',
    title: 'اعتمادات تضمن مصداقية براندك',
    sub: 'منتجاتنا حائزة على تراخيص من أبرز المؤسسات الوطنية والدولية.',
  },
  footer: {
    desc: 'شريكك الاستراتيجي لابتكار وتصنيع مستحضرات التجميل الطبية بمعايير صيدلانية عالمية.',
    quickLinks: 'روابط الوصول السريع',
    links: [
      { href: '/products', label: 'كتالوج المنتجات' },
      { href: '/wholesale', label: 'ابدأ علامتك التجارية' },
      { href: '/about', label: 'من نحن' },
      { href: '/contact', label: 'طلب استشارة' },
    ],
    contact: 'قنوات التواصل',
    follow: 'تابع مسيرتنا',
    rights: 'جميع الحقوق محفوظة.',
    tagline: 'نُصنّع نجاحك',
  },
  products: {
    announcement: 'توصيل مجاني للطلبات فوق 2000 درهم · منتجات طبية معتمدة · INCIA Medical',
    title: 'كتالوج المنتجات',
    sub: 'مجموعة INCIA الطبية — للعيادات والصيدليات والموزعين',
    count: 'منتج',
    backHome: 'الرئيسية',
    moq: 'الحد الأدنى',
    unit: 'درهم / وحدة',
    add: 'أضف',
    added: 'تمت',
    wholesale: {
      tag: 'برنامج الشراء بالجملة',
      title: 'أسعار خاصة للعيادات والصيدليات',
      sub: 'شروط مميزة وأولوية في التوريد للشركاء المعتمدين.',
      cta: 'اكتشف عروض الجملة ←',
    },
    empty: {
      title: 'لا توجد منتجات حالياً',
      sub: 'أضف المنتجات من لوحة تحكم Sanity ليتم عرضها هنا.',
    },
  },
}

const en = {
  dir: 'ltr' as const,
  nav: {
    home: 'Home',
    lab: 'Our Lab',
    catalog: 'Catalog',
    contact: 'Contact',
    clinic: 'Clinic',
    startBrand: 'Start Your Brand',
    mobileWholesale: 'Wholesale Product Catalog',
    mobileClinic: 'Visit Medical Clinic',
    mobileStart: 'Start Your Brand Project Now',
    forIndividuals: 'Personal Care',
    forBrands: 'Traders & Brand Owners',
  },
  announcement: 'Exclusive B2B solutions for clinics, pharmacies and certified distributors',
  hero: {
    slides: [
      {
        eyebrow: 'B2B Solutions for Professionals',
        headline: 'Transform Your Passion Into a',
        accent: 'Cosmetics Empire',
        sub: 'INCIA Laboratories gives you the key: exclusive medical formulas ready to bear your brand name. We craft the quality, you build the legacy.',
      },
      {
        eyebrow: 'Exclusive Medical Formulas',
        headline: 'Products Ready to Carry',
        accent: 'Your Brand Identity',
        sub: 'Over 180 clinically tested pharmaceutical formulas, ready to bear your name and conquer markets.',
      },
      {
        eyebrow: 'Strategic Partnership',
        headline: 'From Laboratory to Market',
        accent: 'With Full Quality Assurance',
        sub: '6 international certifications, precise logistics, and a dedicated support team from concept to shelf.',
      },
    ],
    cta1: 'Start Your Brand Project',
    cta2: 'Explore Catalog',
    stats: [
      { num: '180+', label: 'Medical Formulas' },
      { num: '12+', label: 'Years Experience' },
      { num: '6', label: 'Certifications' },
    ],
  },
  marquee: "INCIA Laboratories — Our science, your brand's success ✦ Trusted pharmaceutical innovation for your vision ✦ From concept to shelves: quality under your name ✦",
  valueProps: {
    eyebrow: 'Why INCIA',
    title: "Pharmaceutical Quality — The Foundation of Your Brand's Trust",
    items: [
      { title: 'Certified Medical Formulas', desc: 'Every product developed to world pharmaceutical standards with market-ready certifications.' },
      { title: 'Full Private Label', desc: 'Place your name and design on any product in our catalog at competitive quantities.' },
      { title: 'Fast Delivery & Long Partnership', desc: 'Precise logistics and a specialized support team from order placement to market.' },
    ],
  },
  featured: {
    eyebrow: 'Wholesale Catalog',
    title: 'Premium Medical Beauty Ready for Customization',
    sub: 'Exclusive formulas ready to carry your brand name and conquer markets.',
    cta: 'Explore Full Catalog',
    empty: 'No formulas yet — add them via Sanity Studio.',
  },
  certs: {
    eyebrow: 'Official Certifications',
    title: 'Certifications That Validate Your Brand',
    sub: 'Our products hold licenses from leading national and international institutions.',
  },
  footer: {
    desc: 'Your strategic partner for innovating and manufacturing medical cosmetics to world pharmaceutical standards.',
    quickLinks: 'Quick Links',
    links: [
      { href: '/products', label: 'Product Catalog' },
      { href: '/wholesale', label: 'Start Your Brand' },
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Request Consultation' },
    ],
    contact: 'Contact',
    follow: 'Follow Our Journey',
    rights: 'All rights reserved.',
    tagline: 'We manufacture your success',
  },
  products: {
    announcement: 'Free shipping on orders over 2000 MAD · Certified medical products · INCIA Medical',
    title: 'Product Catalog',
    sub: 'INCIA Medical Collection — for Clinics, Pharmacies & Distributors',
    count: 'products',
    backHome: 'Home',
    moq: 'Min. Order',
    unit: 'MAD / unit',
    add: 'Add',
    added: 'Added',
    wholesale: {
      tag: 'Wholesale Program',
      title: 'Special Prices for Clinics & Pharmacies',
      sub: 'Exclusive terms and supply priority for certified partners.',
      cta: 'Discover Wholesale Offers →',
    },
    empty: {
      title: 'No Products Available',
      sub: 'Add products from Sanity dashboard to display them here.',
    },
  },
}

const fr = {
  dir: 'ltr' as const,
  nav: {
    home: 'Accueil',
    lab: 'Notre Labo',
    catalog: 'Catalogue',
    contact: 'Contact',
    clinic: 'Clinique',
    startBrand: 'Lancer ma Marque',
    mobileWholesale: 'Catalogue Produits Gros',
    mobileClinic: 'Visiter la Clinique Médicale',
    mobileStart: 'Lancer Mon Projet de Marque',
    forIndividuals: 'Soin Personnel',
    forBrands: 'Commerçants & Marques',
  },
  announcement: 'Solutions B2B exclusives pour cliniques, pharmacies et distributeurs agréés',
  hero: {
    slides: [
      {
        eyebrow: 'Solutions B2B pour Professionnels',
        headline: 'Transformez votre passion en',
        accent: 'Empire Cosmétique',
        sub: "Les laboratoires INCIA vous donnent la clé : des formules médicales exclusives prêtes à porter votre marque. Nous créons la qualité, vous construisez l'héritage.",
      },
      {
        eyebrow: 'Formules Médicales Exclusives',
        headline: 'Produits prêts à porter',
        accent: 'Votre Identité de Marque',
        sub: 'Plus de 180 formules pharmaceutiques testées cliniquement, prêtes à porter votre nom et conquérir les marchés.',
      },
      {
        eyebrow: 'Partenariat Stratégique',
        headline: 'Du laboratoire au marché',
        accent: 'Avec Garantie Qualité',
        sub: "6 certifications internationales, logistique précise et équipe de support dédiée du concept au rayon.",
      },
    ],
    cta1: 'Lancer Mon Projet de Marque',
    cta2: 'Explorer le Catalogue',
    stats: [
      { num: '180+', label: 'Formules médicales' },
      { num: '12+', label: "Ans d'expérience" },
      { num: '6', label: 'Certifications' },
    ],
  },
  marquee: "Laboratoires INCIA — Notre science, le succès de votre marque ✦ Innovation pharmaceutique de confiance pour votre vision ✦ Du concept aux rayons : qualité sous votre nom ✦",
  valueProps: {
    eyebrow: 'Pourquoi INCIA',
    title: 'Qualité pharmaceutique — La base de confiance de votre marque',
    items: [
      { title: 'Formules médicales certifiées', desc: 'Chaque produit développé selon les normes pharmaceutiques mondiales avec certifications prêtes au marché.' },
      { title: 'Private Label complet', desc: 'Apposez votre nom et design sur tout produit de notre catalogue à des quantités compétitives.' },
      { title: 'Livraison rapide & partenariat durable', desc: 'Logistique précise et équipe de support spécialisée de la commande au marché.' },
    ],
  },
  featured: {
    eyebrow: 'Catalogue Gros',
    title: 'Cosmétiques médicaux premium prêts à personnaliser',
    sub: 'Formules exclusives prêtes à porter le nom de votre marque et conquérir les marchés.',
    cta: 'Explorer le Catalogue Complet',
    empty: 'Aucune formule disponible — ajoutez-les via Sanity Studio.',
  },
  certs: {
    eyebrow: 'Certifications Officielles',
    title: 'Des certifications qui valident votre marque',
    sub: 'Nos produits sont certifiés par les principales institutions nationales et internationales.',
  },
  footer: {
    desc: 'Votre partenaire stratégique pour innover et fabriquer des cosmétiques médicaux aux normes pharmaceutiques mondiales.',
    quickLinks: 'Liens Rapides',
    links: [
      { href: '/products', label: 'Catalogue Produits' },
      { href: '/wholesale', label: 'Lancer Votre Marque' },
      { href: '/about', label: 'À Propos' },
      { href: '/contact', label: 'Demander une Consultation' },
    ],
    contact: 'Contact',
    follow: 'Suivez Notre Parcours',
    rights: 'Tous droits réservés.',
    tagline: 'Nous fabriquons votre succès',
  },
  products: {
    announcement: 'Livraison gratuite pour commandes > 2000 MAD · Produits médicaux certifiés · INCIA Medical',
    title: 'Catalogue Produits',
    sub: 'Collection médicale INCIA — pour Cliniques, Pharmacies & Distributeurs',
    count: 'produits',
    backHome: 'Accueil',
    moq: 'Qté min.',
    unit: 'MAD / unité',
    add: 'Ajouter',
    added: 'Ajouté',
    wholesale: {
      tag: 'Programme Grossiste',
      title: 'Prix spéciaux pour Cliniques & Pharmacies',
      sub: "Conditions exclusives et priorité d'approvisionnement pour partenaires certifiés.",
      cta: 'Découvrir les Offres Grossiste →',
    },
    empty: {
      title: 'Aucun produit disponible',
      sub: 'Ajoutez des produits depuis le tableau de bord Sanity pour les afficher ici.',
    },
  },
}

export const translations = { ar, en, fr } as const
export type T = typeof ar
