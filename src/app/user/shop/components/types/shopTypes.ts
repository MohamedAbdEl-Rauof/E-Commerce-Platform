import { ReactElement } from 'react';
import { SvgIconProps } from '@mui/material';

export interface Category {
    _id: string;
    name: string;
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    PriceBeforeDiscount?: string;
    rating?: number;
    isNew?: boolean;
    discount?: number;
}

export interface FilterState {
    categoryId: string;
    priceRange: string;
    sortBy: string;
    view: "grid" | "large" | "split" | "list";
    search: string;
}

export interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

export interface SortOption {
    value: string;
    label: string;
}

export interface ViewOption {
    icon: React.ComponentType<SvgIconProps>;
    label: string;
    value: "grid" | "large" | "split" | "list";
}