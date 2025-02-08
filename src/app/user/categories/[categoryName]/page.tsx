"use client";

import React from 'react';
import {useProduct} from '@/context/ProductContext';
import {useCategories} from '@/context/CategoriesContext';
import ProductList from './components/ProductList';
import {useParams} from 'next/navigation';

const CategoryProductsPage = () => {
    const params = useParams();
    const {products, loading: productsLoading, error: productsError} = useProduct();
    const {categories, loading: categoriesLoading, error: categoriesError} = useCategories();

    console.log("params:", params);

    if (!params) {
        return <div>Error: No parameters found</div>;
    }

    const categoryName = Array.isArray(params.categoryName)
        ? params.categoryName[0]
        : params.categoryName || '';

    console.log("categoryName:", categoryName);

    const decodedCategoryName = decodeURIComponent(categoryName);
    console.log("decoded categoryName:", decodedCategoryName);

    if (productsLoading || categoriesLoading) return <div>Loading...</div>;
    if (productsError || categoriesError) return <div>Error: {productsError || categoriesError}</div>;

    const category = categories.find(cat => cat.name === decodedCategoryName);
    if (!category) return <div>Category not found</div>;

    const categoryProducts = products.filter(product => product.categoryId === category._id);

    console.log('categoryProducts:', categoryProducts);

    return <ProductList products={categoryProducts} categoryName={decodedCategoryName}/>;
};

export default CategoryProductsPage;