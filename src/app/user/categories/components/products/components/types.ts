export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    priceBeforeDiscount?: number;
    isNew?: boolean;
    discount?: number;
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

export type ViewOption = 'grid' | 'large' | 'split' | 'list';