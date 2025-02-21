export interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    PriceBeforeDiscount?: string;
    description?: string;
}

export interface FilterState {
    priceRange: string;
    sortBy: string;
    view: "grid" | "large" | "split" | "list";
    search: string;
    categoryId: string;
}

export interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}