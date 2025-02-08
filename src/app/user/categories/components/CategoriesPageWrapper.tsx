"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const CategoriesPageClient = dynamic(() => import('./CategoriesPageClient'), {
    ssr: false
});

const CategoriesPageWrapper: React.FC = () => {
    return <CategoriesPageClient/>;
};

export default CategoriesPageWrapper;