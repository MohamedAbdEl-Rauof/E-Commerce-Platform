import React from 'react';
import {Grid} from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    PriceBeforeDiscount?: string;
    rating?: number;
    isNew?: boolean;
    discount?: number;
}

interface ProductGridProps {
    products: Product[];
    categoryName: string;
    view: "grid" | "large" | "split" | "list";
}

const ProductGrid: React.FC<ProductGridProps> = ({products, view, categoryName}) => {
    const getGridProps = () => {
        switch (view) {
            case "large":
                return {xs: 12, lg: 6, spacing: 4};
            case "split":
                return {xs: 6, lg: 4, spacing: 3};
            case "list":
                return {xs: 12, spacing: 3};
            default:
                return {xs: 6, md: 4, lg: 3, spacing: 3};
        }
    };

    const gridProps = getGridProps();

    return (
        <Grid container spacing={gridProps.spacing}>
            {products.map((product) => (
                <Grid item key={product._id} xs={gridProps.xs} md={gridProps.md} lg={gridProps.lg}>
                    <ProductCard
                        product={product}
                        isList={view === "list"}
                        categoryName={categoryName}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;