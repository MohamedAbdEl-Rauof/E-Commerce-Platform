import { SvgIconProps } from '@mui/material';
import { GridView, ViewModule, ViewStream, ViewWeek } from "@mui/icons-material";

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
    value: "grid" | "large" | "split" ;
}

export const PRICE_RANGES: PriceRange[] = [
    { label: "All Price", range: "all", min: 0, max: null },
    { label: "$0.00 - $99.99", range: "0-99.99", min: 0, max: 99.99 },
    { label: "$100.00 - $199.99", range: "100-199.99", min: 100, max: 199.99 },
    { label: "$200.00 - $299.99", range: "200-299.99", min: 200, max: 299.99 },
    { label: "$300.00 - $399.99", range: "300-399.99", min: 300, max: 399.99 },
    { label: "$400.00+", range: "400", min: 400, max: null },
];

export const SORT_OPTIONS: SortOption[] = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

export const VIEW_OPTIONS: ViewOption[] = [
    { icon: ViewModule, label: "Grid View", value: "grid" },
    { icon: ViewStream, label: "Split View", value: "split" },
    { icon: GridView, label: "Large Grid View", value: "large" },
];