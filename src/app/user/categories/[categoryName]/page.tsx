"use client";

import React from 'react';
import {useProduct} from '@/context/ProductContext';
import {useCategories} from '@/context/CategoriesContext';
import ProductList from './components/ProductList';

const CategoryProductsPage = ({params}: { params: Promise<{ categoryName: string }> }) => {
    const {categoryName} = React.use(params);
    const {products, loading: productsLoading, error: productsError} = useProduct();
    const {categories, loading: categoriesLoading, error: categoriesError} = useCategories();

    console.log('Rendering CategoryProductsPage with products:', products);
    console.log('Rendering CategoryProductsPage with categories:', categories);

    if (productsLoading || categoriesLoading) return <div>Loading...</div>;
    if (productsError || categoriesError) return <div>Error: {productsError || categoriesError}</div>;

    const category = categories.find(cat => cat.name === decodeURIComponent(categoryName));
    if (!category) return <div>Category not found</div>;

    const categoryProducts = products.filter(product => product.categoryId === category._id);

    console.log('categoryProducts:', categoryProducts);

    return <ProductList products={categoryProducts} categoryName={categoryName}/>;
};

export default CategoryProductsPage;