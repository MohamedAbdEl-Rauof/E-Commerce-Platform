"use client";
import React from "react";
import {Box, Button, List, ListItem, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useCart} from "@/context/AddToCartContext";
import {useSession} from "next-auth/react";

const CartDrawer = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const {
        cart,
        closeCart,
        addToCart,
        decrementFromCart,
        deleteItem,
        toggleFavorite,
        // calculateSubtotal,
        checkUserSignin,
    } = useCart();

    const handleCheckout = () => {
        router.push("/pages/ViewCart");
    };

    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "350px",
                },
                maxWidth: "350px",
            }}
            role="presentation"
            className="flex flex-col h-full"
        >
            <List className="flex-grow">
                <ListItem disablePadding className="block">
                    <div className="flex justify-between items-center pl-4 pt-3">
                        <Typography component="div" className="text-2xl">
                            Cart
                        </Typography>
                        <IoMdClose
                            onClick={closeCart}
                            className="text-2xl text-gray-600 cursor-pointer mr-4"
                        />
                    </div>
                    {cart
                        .filter((item) => item.quantity > 0 || item.isFavourite)
                        .map((item) => (
                            <Typography
                                component="div"
                                className="pl-4 pt-6 text-2xl"
                                key={item.productId}
                            >
                                <div
                                    className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-gray-50 rounded-md shadow-md mx-2">
                                    {/* Image */}
                                    <div className="flex justify-center sm:justify-start">
                                        <img
                                            // src={item.image}
                                            alt="img"
                                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-300"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col flex-1 space-y-1 sm:space-y-2">
                                        <div className="flex justify-between items-start sm:items-center w-full">
                                            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                                                {/*{item.name || "Product"}*/}
                                            </p>

                                            {/* Price, Delete Icon, and Heart Icon */}
                                            <div
                                                className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 pt-0 mt-0">
                                                {/* Price as Block */}
                                                <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-800 font-semibold block">
                                                    ${item.price || "0.00"}
                                                </p>

                                                {/* Delete Icon as Block */}
                                                <IoMdClose
                                                    onClick={() => deleteItem(item.id)}
                                                    className="text-lg text-gray-600 cursor-pointer block"
                                                />

                                                {/* Heart Icon as Block */}
                                                <div className="flex flex-col items-center block">
                                                    {item.isFavourite ? (
                                                        <FaHeart
                                                            className="text-red-500 cursor-pointer text-sm sm:text-base block"
                                                            onClick={() => toggleFavorite(item.id)}
                                                        />
                                                    ) : (
                                                        item.quantity > 0 && (
                                                            <FaRegHeart
                                                                className="text-gray-500 cursor-pointer text-sm sm:text-base block"
                                                                onClick={() => toggleFavorite(item.id)}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Adjustment */}
                                        <div
                                            className="flex items-center border border-gray-300 rounded-md bg-white w-full sm:w-[42%]">
                                            <button
                                                onClick={() => {
                                                    if (userId) {
                                                        decrementFromCart(userId, item._id)
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
                                                        addToCart(userId, item._id)
                                                    } else {
                                                        checkUserSignin();
                                                    }
                                                }}
                                                className="w-12 h-10 text-lg font-bold text-gray-700 hover:bg-gray-200 focus:ring-gray-300 rounded-r-md flex justify-center items-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        ))}
                </ListItem>
            </List>

            <div className="mt-auto p-3 sm:p-4">
                <div className="p-2 sm:p-3 flex justify-between">
                    <Typography component="div" className="text-sm sm:text-base">
                        Subtotal/Header/components/CartDrawer
                    </Typography>
                    <Typography component="div" className="text-sm sm:text-base">
                        {/*$ {calculateSubtotal().toFixed(2)}*/}
                    </Typography>
                </div>

                <div className="p-2 sm:p-3 flex justify-between">
                    <Typography
                        component="div"
                        className="font-bold text-sm sm:text-base"
                    >
                        Total
                    </Typography>
                    <Typography component="div" className="text-sm sm:text-base">
                        {/*$ {calculateSubtotal().toFixed(2)}*/}
                    </Typography>
                </div>
                <Button
                    sx={{
                        width: "90%",
                        mx: "5%",
                        fontSize: {
                            xs: "0.875rem",
                            sm: "1rem",
                        },
                    }}
                    variant="contained"
                    className="bg-black hover:bg-gray-800"
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
                <div className="text-center mt-3">
                    <Link href="/pages/ViewCart">
                        <button className="text-black text-xs sm:text-sm font-semibold">
                            <u className="text-black text-xs sm:text-sm font-semibold text-center">
                                View Cart
                            </u>
                        </button>
                    </Link>
                </div>
            </div>
        </Box>
    );
};

export default CartDrawer;
