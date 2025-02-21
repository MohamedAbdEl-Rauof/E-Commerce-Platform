import {GridView, ViewModule, ViewStream} from "@mui/icons-material";
import {PriceRange} from "./types";

export const PRICE_RANGES: PriceRange[] = [
    {label: "All Price", range: "all", min: 0, max: null},
    {label: "$0.00 - $99.99", range: "0-99.99", min: 0, max: 99.99},
    {label: "$100.00 - $199.99", range: "100-199.99", min: 100, max: 199.99},
    {label: "$200.00 - $299.99", range: "200-299.99", min: 200, max: 299.99},
    {label: "$300.00 - $399.99", range: "300-399.99", min: 300, max: 399.99},
    {label: "$400.00+", range: "400", min: 400, max: null},
];

export const SORT_OPTIONS = [
    {value: "featured", label: "Featured"},
    {value: "price-asc", label: "Price: Low to High"},
    {value: "price-desc", label: "Price: High to Low"},
    {value: "name-asc", label: "Name: A to Z"},
    {value: "name-desc", label: "Name: Z to A"},
];

export const VIEW_OPTIONS = [
    {icon: ViewModule, label: "Grid View", value: "grid"},
    {icon: ViewStream, label: "Split View", value: "split"},
    {icon: GridView, label: "Large Grid View", value: "large"},
] as const;


export type ViewOption = typeof VIEW_OPTIONS[number];