// lib/types.ts
export interface PriceTier {
  id: number;
  minQuantity: number;
  maxQuantity: number | null;
  pricePerUnit: number;
  discountLabel: string | null;
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    activeIngredients: string[]; // JSON array
    productImage: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      } | null;
    };
    galleryImages: {
      data: Array<{ attributes: { url: string } }>;
    };
    category: {
      data: {
        attributes: { name: string; slug: string };
      };
    };
    moq: number;
    priceTiers: PriceTier[];
    useCase: string;
    certifications: string[];
    stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
    featured: boolean;
    seoTitle?: string;
    seoDescription?: string;
  };
}

export interface WhatsAppAgent {
  id: number;
  attributes: {
    phoneNumber: string;
    currentLoad: number;
    maxLoad: number;
    isActive: boolean;
    name: string | null;
  };
}