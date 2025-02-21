"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FilterList } from "@mui/icons-material";
import {
    Box, Button, Container, Drawer, FormControl, Grid, IconButton, MenuItem, Select, Typography, useMediaQuery, useTheme
} from "@mui/material";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import { Category, Product, FilterState, PRICE_RANGES, SORT_OPTIONS, VIEW_OPTIONS } from './types/shopTypes';


const Shop: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        categoryId: "all", priceRange: "all", sortBy: "featured", view: "grid", search: "",
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    fetch("/api/categories"),
                    fetch("/api/products"),
                ]);
                const categoriesData = await categoriesRes.json();
                const productsData = await productsRes.json();
                setCategories([{ _id: "all", name: "All Rooms" }, ...categoriesData]);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter((product) => product.name.toLowerCase().includes(searchTerm));
        }
        if (filters.categoryId !== "all") {
            result = result.filter((product) => product.categoryId === filters.categoryId);
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
            case "price-asc": result.sort((a, b) => a.price - b.price); break;
            case "price-desc": result.sort((a, b) => b.price - a.price); break;
            case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
            case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name)); break;
        }
        return result;
    }, [products, filters]);

    const toggleFavorite = (productId: string) => {
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Container maxWidth={false} sx={{ maxWidth: '2000px', backgroundColor: 'var(--background)', color: 'var(--foreground)', px: { xs: 2, sm: 3, md: 4 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '1750px' }}>
                <Box sx={{width: '100%', pt: 5}}>
                    <Banner />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={2} alignItems="flex-start">
                        {!isMobile && (
                            <Grid item xs={12} md={3} lg={3}>
                                <Box sx={{ position: 'sticky', top: 16, maxHeight: 'calc(100vh - 32px)', overflowY: 'auto' }}>
                                    <FiltersSidebar
                                        categories={categories}
                                        priceRanges={PRICE_RANGES}
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onClose={() => {}}
                                    />
                                </Box>
                            </Grid>
                        )}
                        <Grid item xs={12} md={isMobile ? 12 : 9} lg={isMobile ? 12 : 9}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
                                    {isMobile && (
                                        <Button startIcon={<FilterList />} onClick={() => setIsMobileFiltersOpen(true)} variant="outlined" fullWidth sx={{ mb: { xs: 1, sm: 0 } }}>
                                            Filters
                                        </Button>
                                    )}
                                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                                        <SearchBar value={filters.search} onChange={(value) => handleFilterChange("search", value)} />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    padding: 2,
                                }}>
                                    <FormControl size="small" sx={{
                                        minWidth: 120,
                                        '& .MuiOutlinedInput-root': {
                                            color: 'var(--foreground)',
                                            '& fieldset': {
                                                borderColor: 'var(--border)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'var(--primary)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'var(--focus)',
                                            },
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'var(--foreground)',
                                        },
                                    }}>
                                        <Select
                                            value={filters.sortBy}
                                            onChange={(e) => handleFilterChange("sortBy", e.target.value as string)}
                                            sx={{
                                                backgroundColor: 'var(--light)',
                                                '&:hover': {
                                                    backgroundColor: 'var(--hover)',
                                                },
                                            }}
                                        >
                                            {SORT_OPTIONS.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {VIEW_OPTIONS.map((option) => (
                                            <IconButton
                                                key={option.value}
                                                onClick={() => handleFilterChange("view", option.value)}
                                                color={filters.view === option.value ? "primary" : "default"}
                                                title={option.label}
                                                sx={{
                                                    color: filters.view === option.value ? 'var(--primary)' : 'var(--foreground)',
                                                    backgroundColor: 'var(--light)',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover)',
                                                    },
                                                }}
                                            >
                                                <option.icon />
                                            </IconButton>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            {isLoading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <ProductGrid
                                    products={filteredProducts}
                                    view={filters.view}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Drawer anchor="left" open={isMobileFiltersOpen} onClose={() => setIsMobileFiltersOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Button onClick={() => setIsMobileFiltersOpen(false)} sx={{ mb: 2 }}>Close Filters</Button>
                    <FiltersSidebar
                        categories={categories}
                        priceRanges={PRICE_RANGES}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClose={() => setIsMobileFiltersOpen(false)}
                    />
                </Box>
            </Drawer>
        </Container>
    );
};

export default Shop;