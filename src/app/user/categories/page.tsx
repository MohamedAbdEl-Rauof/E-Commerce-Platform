"use client";

import React from 'react';
import {useCategories} from '@/context/CategoriesContext';
import CategoryList from './components/CategoryList';


const CategoriesPage = () => {
    const {categories, loading, error} = useCategories();

    if (loading) return;
    if (error) return;

    return <CategoryList categories={categories}/>;
};

export default CategoriesPage;