import React from 'react';
import {Grid} from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
    _id: string;
}

interface ProductListProps {
    products: Product[];
    categoryName: string;
}

const ProductList: React.FC<ProductListProps> = ({products, categoryName}) => {
    console.log('Rendering ProductList with', products);

    if (!products || products.length === 0) {
        return <p>No products found in this category.</p>;
    }

    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} categoryName={categoryName}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;