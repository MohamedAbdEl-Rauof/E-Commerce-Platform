import React from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import Rating from "@mui/material/Rating";
import {useSession} from "next-auth/react";
import {useCart} from "@/context/AddToCartContext";

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    PriceBeforeDiscount?: string;
    rating?: number;
    isNew?: boolean;
    discount?: number;
}

interface ProductCardProps {
    product: Product;
    isList: boolean;
    isFavorite: boolean;
    onFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, isList, isFavorite, onFavorite}) => {
    const {data: session} = useSession();
    const {addToCart, checkUserSignin} = useCart();
    const userId = session?.user?.id;

    const handleAddToCart = (productId: string) => {
        if (session && session.user && userId) {
            addToCart(userId, productId);
        } else {
            checkUserSignin();
        }
    };

    const handleFavoriteToggle = () => {
        onFavorite(product._id);
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-sm overflow-hidden group transform transition-all duration-300 hover:shadow-xl ${
                isList ? "flex gap-6" : ""
            }`}
        >
            <div className={`relative ${isList ? "w-1/3" : "w-full"}`}>
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <button
                    onClick={handleFavoriteToggle}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    {isFavorite ? (
                        <FaHeart className="text-red-500"/>
                    ) : (
                        <FaRegHeart/>
                    )}
                </button>
                {product.isNew && (
                    <span
                        className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                        New
                    </span>
                )}
                {product.discount && (
                    <span
                        className="absolute top-14 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <div className="p-4 flex-1">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="mb-2">
                    <Rating
                        value={product.rating || 0}
                        readOnly
                        size="small"
                        sx={{color: "black"}}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    {product.PriceBeforeDiscount && (
                        <span className="text-gray-400 line-through">
                            ${product.PriceBeforeDiscount}
                        </span>
                    )}
                </div>
                <button
                    className="mt-4 w-full bg-black text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={() => handleAddToCart(product._id)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;