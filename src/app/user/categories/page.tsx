// categories / page.tsx
"use client";
import React from 'react';
import {useTheme} from 'next-themes';
import CategoryBanner from './components/CategoryBanner';
import CategoryList from './components/CategoryList';
import {useSearchParams} from 'next/navigation';
import Products from './components/products/page';
import ProductDetails from '../../components/products/components/productDetails/page';

export default function CategoriesPage() {
    const {theme, systemTheme} = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('name');

    const renderContent = () => {
        if (categoryName) {
            return <Products categoryName={categoryName}/>;
        }
        return (
            <>
                <CategoryBanner/>
                <CategoryList/>
            </>
        );
    };

    return (
        <div className={`min-h-screen ${currentTheme === 'dark' ? 'dark' : ''}`}>
            {renderContent()}
        </div>
    );
}

export default function ProductPage() {
    return <ProductDetails/>;
}