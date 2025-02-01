import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    // Add other product properties here
}

interface ProductCardProps {
    product: Product;
    categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({product, categoryName}) => {
    console.log('Rendering ProductCard with', product);

    if (!product) {
        return null;
    }

    return (
        <Link href={`/user/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(product.name)}`}
              passHref>
            <Card sx={{cursor: 'pointer'}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ID: {product._id}
                    </Typography>
                    <Typography color="text.secondary">
                        Category: {categoryName}
                    </Typography>
                    {/* Add more product details here */}
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;