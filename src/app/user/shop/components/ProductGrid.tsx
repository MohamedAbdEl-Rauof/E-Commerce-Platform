import React from 'react';
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
    view: string;
    favorites: Set<string>;
    toggleFavorite: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({products, view, favorites, toggleFavorite}) => {
    const getGridClasses = () => {
        switch (view) {
            case "large":
                return "grid-cols-1 lg:grid-cols-2 gap-8";
            case "split":
                return "grid-cols-2 lg:grid-cols-3 gap-6";
            case "list":
                return "grid-cols-1 gap-6";
            default:
                return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
        }
    };

    return (
        <div className={`grid ${getGridClasses()}`}>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    isList={view === "list"}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.has(product._id)}
                />
            ))}
        </div>
    );
};

export default ProductGrid;