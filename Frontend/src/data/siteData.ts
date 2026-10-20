export type Property = {
  id: number;
  title: string;
  location: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: string;
  status: "متاح" | "محجوز" | "مباع";
  purpose: "للبيع" | "للإيجار";
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  yearBuilt: number;
  parking: number;
  projectId?: number;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "فيلا فاخرة في حي النرجس",
    location: "حي النرجس، الرياض",
    city: "الرياض",
    price: 3500000,
    beds: 5,
    baths: 4,
    area: 450,
    type: "فيلا",
    status: "متاح",
    purpose: "للبيع",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    ],
    description:
      "فيلا فاخرة بتصميم عصري في أرقى أحياء الرياض، تتميز بمساحات واسعة وتشطيبات راقية مع حديقة خاصة ومسبح، إطلالات بانورامية وموقع استراتيجي قريب من جميع الخدمات.",
    features: ["مسبح خاص", "حديقة منسقة", "مصعد", "نظام أمان ذكي", "غرفة سائق", "غرفة خادمة", "مجلس رجال", "مجلس نساء"],
    yearBuilt: 2024,
    parking: 3,
    projectId: 1,
  },
  {
    id: 2,
    title: "شقة مودرن في حي الروضة",
    location: "حي الروضة، جدة",
    city: "جدة",
    price: 850000,
    beds: 3,
    baths: 2,
    area: 180,
    type: "شقة",
    status: "متاح",
    purpose: "للبيع",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
    ],
    description: "شقة عصرية بإطلالة بحرية في أرقى أحياء جدة، تشطيبات سوبر لوكس مع جميع الخدمات.",
    features: ["إطلالة بحرية", "مكيفات سبليت", "مطبخ راكب", "صالة جيم", "بوابة أمنية"],
    yearBuilt: 2023,
    parking: 2,
    projectId: 2,
  },
  {
    id: 3,
    title: "بنتهاوس على الواجهة البحرية",
    location: "كورنيش الدمام، الدمام",
    city: "الدمام",
    price: 5200000,
    beds: 4,
    baths: 5,
    area: 380,
    type: "بنتهاوس",
    status: "متاح",
    purpose: "للبيع",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
    ],
    description: "بنتهاوس استثنائي بإطلالة بانورامية على الخليج العربي مع تراس خاص ومسبح.",
    features: ["مسبح خاص على السطح", "تراس بانورامي", "جاكوزي", "نظام منزل ذكي", "مدخل خاص"],
    yearBuilt: 2024,
    parking: 4,
  },
  {
    id: 4,
    title: "شقة استوديو في العليا",
    location: "حي العليا، الرياض",
    city: "الرياض",
    price: 420000,
    beds: 1,
    baths: 1,
    area: 65,
    type: "شقة",
    status: "متاح",
    purpose: "للبيع",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop"],
    description: "استوديو مفروش بالكامل في قلب العاصمة، مثالي للاستثمار أو السكن.",
    features: ["مفروش بالكامل", "إنترنت عالي السرعة", "موقع مركزي", "جيم مشترك"],
    yearBuilt: 2022,
    parking: 1,
  },
  {
    id: 5,
    title: "فيلا دوبلكس في الشفا",
    location: "حي الشفا، الرياض",
    city: "الرياض",
    price: 2800000,
    beds: 6,
    baths: 5,
    area: 520,
    type: "فيلا",
    status: "متاح",
    purpose: "للبيع",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    ],
    description: "فيلا دوبلكس واسعة بتصميم كلاسيكي معاصر، مناسبة للعائلات الكبيرة.",
    features: ["حديقة كبيرة", "مسبح خارجي", "ملحق خارجي", "مجالس منفصلة", "مطبخ تحضيري"],
    yearBuilt: 2023,
    parking: 4,
  },
  {
    id: 6,
    title: "مكتب تجاري في الملقا",
    location: "حي الملقا، الرياض",
    city: "الرياض",
    price: 1200000,
    beds: 0,
    baths: 2,
    area: 200,
    type: "مكتب",
    status: "متاح",
    purpose: "للإيجار",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop"],
    description: "مكتب تجاري راقي بموقع استراتيجي مع جميع الخدمات والمواقف.",
    features: ["استقبال", "قاعة اجتماعات", "مواقف خاصة", "أمن 24/7"],
    yearBuilt: 2023,
    parking: 5,
  },
];

export type Project = {
  id: number;
  name: string;
  location: string;
  developer: string;
  status: "قيد الإنشاء" | "مكتمل" | "للبيع";
  units: number;
  startPrice: number;
  deliveryDate: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  progress: number;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "كمبوند النرجس الذهبي",
    location: "حي النرجس، الرياض",
    developer: "شركة عقاري للتطوير",
    status: "قيد الإنشاء",
    units: 120,
    startPrice: 1800000,
    deliveryDate: "Q4 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    ],
    description: "مجمع سكني فاخر يضم 120 فيلا وشقة بتصاميم عصرية، يوفر بيئة سكنية متكاملة بأعلى معايير الجودة.",
    amenities: ["نادي صحي", "مسابح", "حدائق", "مدارس", "مسجد", "مولات تجارية", "أمن 24/7"],
    progress: 65,
  },
  {
    id: 2,
    name: "أبراج الواجهة البحرية",
    location: "كورنيش جدة، جدة",
    developer: "مجموعة البحر للتطوير",
    status: "للبيع",
    units: 280,
    startPrice: 950000,
    deliveryDate: "Q2 2025",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    ],
    description: "أبراج سكنية فاخرة بإطلالات بحرية خلابة، توفر أسلوب حياة استثنائي.",
    amenities: ["شاطئ خاص", "مارينا", "مطاعم", "سبا", "نادي يخوت"],
    progress: 100,
  },
  {
    id: 3,
    name: "ريف الشرقية",
    location: "حي الشاطئ، الدمام",
    developer: "شركة الخليج العقارية",
    status: "قيد الإنشاء",
    units: 85,
    startPrice: 2200000,
    deliveryDate: "Q3 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"],
    description: "مشروع سكني متميز بتصميم معماري فريد يجمع بين الأصالة والحداثة.",
    amenities: ["نادي رياضي", "مسبح أولمبي", "ملاعب", "حضانة", "مساحات خضراء"],
    progress: 40,
  },
];

export const formatPrice = (n: number) => new Intl.NumberFormat("ar-SA").format(n);
