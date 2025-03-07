"use client";

import React from 'react';
import { useProduct } from '@/context/ProductContext';
import ProductList from './components/ProductList';

const CategoryProductsPage = ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = params;
    const { products, loading: productsLoading, error: productsError } = useProduct();

    if (productsLoading) return <div>Loading...</div>;
    if (productsError) return <div>Error: {productsError}</div>;

    const categoryProducts = products.filter(product => product.categoryId === categoryId);


    return <ProductList products={categoryProducts} categoryId={categoryId} />;
};

export default CategoryProductsPage;