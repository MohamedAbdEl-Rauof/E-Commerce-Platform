"use client";

import React, {useMemo, useState} from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {FilterList, GridView, ViewModule, ViewStream, ViewWeek} from "@mui/icons-material";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    PriceBeforeDiscount?: string;
    description?: string;
}

interface ProductListProps {
    products: Product[];
    categoryName: string;
}

interface FilterState {
    priceRange: string;
    sortBy: string;
    view: "grid" | "large" | "split" | "list";
    search: string;
}

interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

const PRICE_RANGES: PriceRange[] = [
    {label: "All Price", range: "all", min: 0, max: null},
    {label: "$0.00 - $99.99", range: "0-99.99", min: 0, max: 99.99},
    {label: "$100.00 - $199.99", range: "100-199.99", min: 100, max: 199.99},
    {label: "$200.00 - $299.99", range: "200-299.99", min: 200, max: 299.99},
    {label: "$300.00 - $399.99", range: "300-399.99", min: 300, max: 399.99},
    {label: "$400.00+", range: "400", min: 400, max: null},
];

const SORT_OPTIONS = [
    {value: "featured", label: "Featured"},
    {value: "price-asc", label: "Price: Low to High"},
    {value: "price-desc", label: "Price: High to Low"},
    {value: "name-asc", label: "Name: A to Z"},
    {value: "name-desc", label: "Name: Z to A"},
];

const VIEW_OPTIONS = [
    {icon: GridView, label: "Grid View", value: "grid"},
    {icon: ViewModule, label: "Large Grid View", value: "large"},
    {icon: ViewStream, label: "Split View", value: "split"},
    {icon: ViewWeek, label: "List View", value: "list"},
] as const;

const ProductList: React.FC<ProductListProps> = ({products, categoryName}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: "all",
        sortBy: "featured",
        view: "grid",
        search: "",
    });

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.priceRange !== "all") {
            const range = PRICE_RANGES.find((r) => r.range === filters.priceRange);
            if (range) {
                result = result.filter((product) => {
                    if (range.max === null) return product.price >= range.min;
                    return product.price >= range.min && product.price <= range.max;
                });
            }
        }

        switch (filters.sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        return result;
    }, [products, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({...prev, [key]: value}));
    };

    if (!products || products.length === 0) {
        return <Typography>No products found in this category.</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Banner/>
            <Box sx={{mb: 4}}>
                <SearchBar
                    value={filters.search}
                    onChange={(value) => handleFilterChange("search", value)}
                />
            </Box>

            <Grid container spacing={4}>
                {/* Mobile Filters */}
                <Drawer
                    anchor="left"
                    open={isMobileFiltersOpen}
                    onClose={() => setIsMobileFiltersOpen(false)}
                >
                    <Box sx={{width: 250, p: 2}}>
                        <Button
                            onClick={() => setIsMobileFiltersOpen(false)}
                            sx={{mb: 2}}
                        >
                            Close Filters
                        </Button>
                        <FiltersSidebar
                            priceRanges={PRICE_RANGES}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClose={() => setIsMobileFiltersOpen(false)}
                        />
                    </Box>
                </Drawer>

                {/* Desktop Filters */}
                {!isMobile && (
                    <Grid item xs={12} lg={3}>
                        <FiltersSidebar
                            priceRanges={PRICE_RANGES}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClose={() => {
                            }}
                        />
                    </Grid>
                )}

                <Grid item xs={12} lg={isMobile ? 12 : 9}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                        {isMobile && (
                            <Button
                                startIcon={<FilterList/>}
                                onClick={() => setIsMobileFiltersOpen(true)}
                                variant="outlined"
                            >
                                Filters
                            </Button>
                        )}

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, ml: 'auto'}}>
                            <FormControl size="small">
                                <Select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange("sortBy", e.target.value as string)}
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box>
                                {VIEW_OPTIONS.map((option) => (
                                    <IconButton
                                        key={option.value}
                                        onClick={() => handleFilterChange("view", option.value)}
                                        color={filters.view === option.value ? "primary" : "default"}
                                        title={option.label}
                                    >
                                        <option.icon/>
                                    </IconButton>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <ProductGrid
                        products={filteredProducts}
                        view={filters.view}
                        categoryName={categoryName}
                    />

                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductList;