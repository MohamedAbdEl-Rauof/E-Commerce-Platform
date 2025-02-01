// categories / components/products/page.tsx
"use client";

import React, {useMemo, useState} from 'react';
import {Box, Grid, TextField} from '@mui/material';
import {Search} from '@mui/icons-material';
import {useCategories} from "@/context/CategoriesContext";
import {useProduct} from "@/context/ProductContext";
import {useRouter} from 'next/navigation';
import {useSession} from "next-auth/react";
import Swal from "sweetalert2";
import PriceFilter from './components/PriceFilter';
import ProductGrid from './components/ProductGrid';
import LoadMoreButton from './components/LoadMoreButton';
import {PriceRange, ViewOption} from './components/types';

// Constants
const PRICE_RANGES: PriceRange[] = [
    {label: "All Price", range: "all", min: 0, max: null},
    {label: "$0.00 - $99.99", range: "0-99.99", min: 0, max: 99.99},
    {label: "$100.00 - $199.99", range: "100-199.99", min: 100, max: 199.99},
    {label: "$200.00 - $299.99", range: "200-299.99", min: 200, max: 299.99},
    {label: "$300.00 - $399.99", range: "300-399.99", min: 300, max: 399.99},
    {label: "$400.00+", range: "400", min: 400, max: null},
];

const PRODUCTS_PER_PAGE = 9;

const Products: React.FC<{ categoryName: string }> = ({categoryName}) => {
    const {categories} = useCategories();
    const {products} = useProduct();
    const router = useRouter();
    const {data: session} = useSession();

    const [filters, setFilters] = useState({
        priceRange: 'all',
        view: 'grid' as ViewOption,
        search: '',
    });
    const [favorite, setFavorite] = useState<Record<string, boolean>>({});
    const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);

    const category = categories.find(cat => cat.name === categoryName);

    const filteredProducts = useMemo(() => {
        if (!category) return [];

        let result = products.filter(product => product.categoryId === category._id);

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.priceRange !== 'all') {
            const range = PRICE_RANGES.find((r) => r.range === filters.priceRange);
            if (range) {
                result = result.filter((product) => {
                    if (range.max === null) return product.price >= range.min;
                    return product.price >= range.min && product.price <= range.max;
                });
            }
        }

        return result;
    }, [filters, products, category]);

    const loadMore = () => {
        setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE);
    };

    const onShowDetails = (productId: string) => {
        const product = products.find(p => p._id === productId);
        if (product) {
            const encodedName = encodeURIComponent(product.name);
            const encodedId = encodeURIComponent(productId);
            router.push(`/user/categories/${categoryName}/products?id=${encodedId}&name=${encodedName}`);
        } else {
            console.error('Product not found');
        }
    };

    const handleAddToCart = (productId: string, quantity: number, isFavourite: boolean) => {
        if (session && session.user) {
            // Implement your addToCart logic here
            console.log('Adding to cart:', {productId, quantity, isFavourite});
        } else {
            Swal.fire({
                title: "Please Log In",
                text: "You need to be logged in to add to the cart.",
                icon: "warning",
                confirmButtonText: "Go to Login",
            }).then(() => {
                router.push("/Signin");
            });
        }
    };

    const handleFavoriteAndCart = (productId: string) => {
        const newFav = {...favorite};
        newFav[productId] = !newFav[productId];
        setFavorite(newFav);

        const isFavourite = newFav[productId];
        handleAddToCart(productId, 0, isFavourite);
    };

    const hasMore = visibleProducts < filteredProducts.length;
    const visibleProductsList = filteredProducts.slice(0, visibleProducts);

    if (!category) {
        return <div variant="h6" color="error">Category not found</div>;
    }

    return (
        <Box sx={{width: '90%', margin: '0 auto', paddingTop: 3}}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                InputProps={{
                    startAdornment: <Search/>,
                }}
                sx={{mb: 4}}
            />

            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <PriceFilter
                        priceRange={filters.priceRange}
                        onChange={(value) => setFilters({...filters, priceRange: value})}
                        priceRanges={PRICE_RANGES}
                    />
                </Grid>

                <Grid item xs={12} md={9}>
                    <ProductGrid
                        products={visibleProductsList}
                        view={filters.view}
                        favorite={favorite}
                        onAddToCart={handleAddToCart}
                        onFavoriteAndCart={handleFavoriteAndCart}
                        onShowDetails={onShowDetails}
                    />

                    {hasMore && (
                        <LoadMoreButton onClick={loadMore}/>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Products;