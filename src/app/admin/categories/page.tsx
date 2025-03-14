import React from 'react';
import CategoriesContent from "./components/CategoriesContent";


export const metadata = {
    title: 'Categories Management',
    description: 'Manage product categories',
};

const CategoriesPage = () => {
    return (
        <div>
            <CategoriesContent productId="" editOrView="false"/>
        </div>
    );
}
export default CategoriesPage;