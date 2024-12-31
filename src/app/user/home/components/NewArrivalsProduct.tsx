import React, {useEffect, useState} from "react";
import {FaArrowRight, FaHeart, FaRegHeart} from "react-icons/fa";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useProduct, Product } from "@/context/ProductContext";
import Image from "next/image";
import Head from "next/head";
import NewArrivalsProductLoading from "@/components/userUiLoading/Home/NewArrivalsProductLoading";
import {useCart} from "@/context/AddToCartContext";
import {useSession} from 'next-auth/react';
import {useTheme} from "next-themes"

const NewArrivalsProduct = () => {
    const {products, loading, error} = useProduct();
    const {addToCart, toggleFavorite, updateRating, cart, checkUserSignin} = useCart();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const {theme} = useTheme()

    useEffect(() => {
        if (products.length > 0) {
            const sortedProducts = products.sort(
                (a: Product, b: Product) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            const recentProducts = sortedProducts.slice(0, 10);
            setFilteredProducts(recentProducts);
        }
    }, [products]);

    const getCartItem = (productId: string) => {
        return cart.find(item => item.productId === productId);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {loading ? (
                <NewArrivalsProductLoading/>
            ) : (
                <>
                    <Head>
                        <title>New Arrivals</title>
                        <meta name="description" content="Check out the latest arrivals in our store."/>
                    </Head>
                    <div className="mt-14">
                        <header className="flex justify-between items-center">
                            <h1 className="text-4xl font-bold">New Arrivals</h1>
                            <u className="flex items-center text-black font-bold cursor-pointer hover:underline">
                                <Link href="ظuser/Categories"> More Products</Link>
                                <FaArrowRight
                                    className="ml-1 transform transition-transform duration-300 hover:translate-x-1"/>
                            </u>

                        </header>
                        <main className="mt-7 mb-36 flex justify-center">
                            <div className="relative w-full overflow-x-auto scroll-container">
                                <div className="flex gap-6 justify-start items-stretch">
                                    {filteredProducts.map((item) => {
                                        const cartItem = getCartItem(item._id);
                                        return (
                                            <article key={item._id} className="relative flex-shrink-0 w-64">
                                                <div className="group relative">
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="object-cover rounded-md shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <button
                                                        aria-label="Toggle Favorite"
                                                        className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                        onClick={() => {
                                                            if (userId) {
                                                                toggleFavorite(userId, item._id);
                                                            } else {
                                                                checkUserSignin();
                                                            }
                                                        }}
                                                    >
                                                        {cartItem?.isFavourite ? (
                                                            <FaHeart className="text-red-500"/>
                                                        ) : (
                                                            <FaRegHeart/>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (userId) {
                                                                addToCart(userId, item._id)
                                                            } else {
                                                                checkUserSignin();
                                                            }
                                                        }}
                                                        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-semibold ${
                                                            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                                                        }`}>
                                                        Add to Cart
                                                    </button>
                                                    <div className="absolute top-2 left-2">
                                                        <p className="text-black bg-white px-2 py-1 rounded-md text-sm font-semibold">
                                                            New
                                                        </p>
                                                        <p className="text-white bg-green-500 px-2 mt-1 rounded-md text-sm font-semibold">
                                                            -50%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 mb-3">
                                                    <Box sx={{"& > legend": {mt: 2}}}>
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={cartItem?.rating ?? null}
                                                            sx={{
                                                                "& .MuiRating-iconFilled": {
                                                                    color: "var(--rating-color)",
                                                                    border: "1px solid var(--rating-border-color)",
                                                                },
                                                                "& .MuiRating-iconEmpty": {
                                                                    color: "var(--rating-unselected-color)",
                                                                },
                                                            }}
                                                            onChange={(event, newValue) => {
                                                                if (newValue !== null && userId) {
                                                                    updateRating(userId, item._id, newValue);
                                                                } else {
                                                                    checkUserSignin();
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <p className="mt-2 font-semibold text-left">{item.name}</p>
                                                    <div className="flex gap-3 mt-2 text-left">
                                                        <p className="font-bold">${item.price}</p>
                                                        {item.PriceBeforeDiscount && (
                                                            <del className="text-gray-500">
                                                                ${item.PriceBeforeDiscount}
                                                            </del>
                                                        )}
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            )}
        </>
    );
};

export default React.memo(NewArrivalsProduct);