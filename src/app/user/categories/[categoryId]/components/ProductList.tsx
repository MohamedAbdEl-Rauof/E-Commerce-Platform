"use client";

import React, {useMemo, useState} from "react";
import {Box, Button, Container, Drawer, Grid, Typography, useMediaQuery, useTheme} from '@mui/material';
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import FilterBar from "./FilterBar";
import {FilterState, Product} from "./types";
import {PRICE_RANGES, SORT_OPTIONS, VIEW_OPTIONS} from "./constants";

interface ProductListProps {
    products: Product[];
    categoryId: string;
}

const ProductList: React.FC<ProductListProps> = ({products, categoryId}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: "all",
        sortBy: "featured",
        view: "grid",
        search: "",
        categoryId: "",
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

    const filtersSidebar = (
        <FiltersSidebar
            priceRanges={PRICE_RANGES}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsMobileFiltersOpen(false)}
        />
    );

    return (
        <Container maxWidth={false} sx={{maxWidth: '2000px', py: 4}}>
            <Box sx={{mb: 4, maxWidth: 600, mx: 'auto'}}>
                <SearchBar
                    value={filters.search}
                    onChange={(value) => handleFilterChange("search", value)}
                />
            </Box>

            <Grid container spacing={4}>
                {/* Desktop Filters Sidebar */}
                <Grid item xs={12} lg={3} sx={{display: {xs: 'none', lg: 'block'}}}>
                    {filtersSidebar}
                </Grid>

                {/* Mobile Filters Drawer */}
                <Drawer
                    anchor="left"
                    open={isMobileFiltersOpen}
                    onClose={() => setIsMobileFiltersOpen(false)}
                    sx={{display: {xs: 'block', lg: 'none'}}}
                >
                    <Box sx={{width: 280, p: 3}}>
                        <Button
                            onClick={() => setIsMobileFiltersOpen(false)}
                            variant="outlined"
                            fullWidth
                            sx={{mb: 3}}
                        >
                            Close Filters
                        </Button>
                        {filtersSidebar}
                    </Box>
                </Drawer>

                <Grid item xs={12} lg={9}>
                    <FilterBar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        isMobile={isMobile}
                        setIsMobileFiltersOpen={setIsMobileFiltersOpen}
                        sortOptions={SORT_OPTIONS}
                        viewOptions={VIEW_OPTIONS}
                    />

                    <ProductGrid
                        products={filteredProducts}
                        view={filters.view}
                        categoryId={categoryId}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductList;