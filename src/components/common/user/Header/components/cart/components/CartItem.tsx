"use client";
import React from "react";
import {IoMdClose} from "react-icons/io";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import Image from "next/image";

interface Item {
    productId: string;
    quantity: number;
    _id: string;
    isFavourite: boolean;
    id: string;
    name: string;
    price: number;
    image: string;
}

interface CartItemProps {
    item: Item;
    userId: string;
    deleteItem: (id: string, prod: Item) => void;
    toggleFavorite: (userId: string, productId: string) => void;
    decrementFromCart: (userId: string, itemId: string) => void;
    addToCart: (userId: string, itemId: string) => void;
    checkUserSignin: () => void;
    products: Item[];
}

const CartItem: React.FC<CartItemProps> = ({
                                               item,
                                               userId,
                                               deleteItem,
                                               toggleFavorite,
                                               decrementFromCart,
                                               addToCart,
                                               checkUserSignin,
                                               products,
                                           }) => {

    const product = products.find((p) => p._id === item.productId);

    if (!product) {
        return null;
    }

    console.log("Item quantity:", item.quantity); // Debugging line

    return (
        <div
            className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-gray-50 rounded-md shadow-md mx-2">
            <div className="flex justify-center sm:justify-start">
                <Image
                    width={200}
                    height={200}
                    priority
                    src={product.image}
                    alt="img"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-300"
                />
            </div>
            <div className="flex flex-col flex-1 space-y-1 sm:space-y-2">
                <div className="flex justify-between items-start sm:items-center w-full">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                        {product.name || "Product"}
                    </p>
                    <div
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 pt-0 mt-0">
                        <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-800 font-semibold block">
                            ${product.price || "0.00"}
                        </p>
                        <IoMdClose
                            onClick={() => deleteItem(item.id, product)}
                            className="text-lg text-gray-600 cursor-pointer block"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white w-full sm:w-[42%]">
                        <button
                            onClick={() => {
                                if (userId) {
                                    decrementFromCart(userId, item._id);
                                } else {
                                    checkUserSignin();
                                }
                            }}
                            className="w-12 h-10 text-lg font-bold text-gray-700 hover:bg-gray-200 focus:ring-gray-300 rounded-l-md flex justify-center items-center"
                        >
                            -
                        </button>
                        <p className="text-sm sm:text-base font-medium text-gray-800 flex-grow text-center">
                            {item.quantity}
                        </p>
                        <button
                            onClick={() => {
                                if (userId) {
                                    addToCart(userId, item._id);
                                } else {
                                    checkUserSignin();
                                }
                            }}
                            className="w-12 h-10 text-lg font-bold text-gray-700 hover:bg-gray-200 focus:ring-gray-300 rounded-r-md flex justify-center items-center"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-col items-center pt-3">
                        {item.isFavourite ? (
                            <FaHeart
                                className="text-red-500 cursor-pointer text-sm sm:text-base block"
                                onClick={() => toggleFavorite(userId, item.id)}
                            />
                        ) : (
                            item.quantity > 0 && (
                                <FaRegHeart
                                    className="text-gray-500 cursor-pointer text-sm sm:text-base block"
                                    onClick={() => toggleFavorite(userId, item.id)}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;