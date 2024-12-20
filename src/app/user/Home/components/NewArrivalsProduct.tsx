import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FaArrowRight, FaHeart, FaRegHeart} from "react-icons/fa";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import {toast} from "react-toastify";
import Link from "next/link";
import {addToCart} from "@/app/utils/addToCartButtonFunc";


interface Product {
    _id: string;
    image: string;
    name: string;
    price: string;
    PriceBeforeDiscount: string;
    createdAt: Date;
}

interface AddToCart {
    userId: string;
    productId: string;
    quantity: number;
    isFavourite: boolean;
}

interface Favourite {
    userId: string;
    productId: string;
    isFavourite: boolean;
}

const NewArrivalsProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [favorite, setFavorite] = useState(new Array(10).fill(false)); // Default to 10 items
    const {data: session} = useSession();
    const router = useRouter();

    // Fetch products from API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                // Sort products by 'createdAt' and limit to 10 most recent products
                const sortedProducts = data.sort(
                    (a: Product, b: Product) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );
                const recentProducts = sortedProducts.slice(0, 10);

                setProducts(recentProducts);
                setFavorite(new Array(recentProducts.length).fill(false));
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, []);


    // Handle add to cart click
    const handleAddToCart = (
        productId: string,
        quantity: number,
        isFavourite: boolean,
    ) => {
        if (session && session.user) {
            const userId = session.user.id;
            addToCart({userId, productId, quantity, isFavourite, router});
        } else {
            Swal.fire({
                title: "Please Log In",
                text: "You need to be logged in to add to the cart.",
                icon: "warning",
                confirmButtonText: "Go to Login",
            }).then(() => {
                router.push("/Signin");
            });
        }
    };

    return (
        <div className="mt-14 w-[90%] mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">New Arrivals</h1>
                </div>
                <div>
                    <u className="flex items-center text-black font-bold cursor-pointer hover:underline">
                        <Link href="/pages/Categories"> More Products</Link>
                        <FaArrowRight className="ml-1 transform transition-transform duration-300 hover:translate-x-1"/>
                    </u>
                </div>
            </div>
            <div className="mt-7 mb-36 flex justify-center">
                <div className="relative w-full overflow-x-auto scroll-container">
                    <div className="flex gap-6 justify-start items-stretch">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <div key={item._id} className="relative flex-shrink-0 w-64">
                                    <div className="group relative">
                                        {/* Category Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-52 object-cover rounded-md shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                                        />

                                        <div
                                            onClick={() => {
                                                const index = products.findIndex(
                                                    (product) => product._id === item._id,
                                                );
                                                const newFav = [...favorite];
                                                newFav[index] = !newFav[index];

                                                setFavorite(newFav);

                                                const isFavourite = newFav[index];
                                                handleAddToCart(item._id, 0, isFavourite);
                                            }}
                                            className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        >
                                            {favorite[
                                                products.findIndex(
                                                    (product) => product._id === item._id,
                                                )
                                                ] ? (
                                                <FaHeart className="text-red-500"/>
                                            ) : (
                                                <FaRegHeart/>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(item._id, 1, false)}
                                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-semibold"
                                        >
                                            Add to Cart
                                        </button>

                                        {/* Labels */}
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
                                        {/* Rating Section */}
                                        <Box sx={{"& > legend": {mt: 2}}}>
                                            <Rating
                                                name="no-value"
                                                value={null}
                                                sx={{
                                                    "& .MuiRating-iconFilled": {
                                                        color: "black", // Color for filled stars
                                                    },
                                                }}
                                            />
                                        </Box>

                                        {/* Category Name */}
                                        <p className="mt-2 font-semibold text-left">{item.name}</p>

                                        {/* Price and Discount Section */}
                                        <div className="flex gap-3 mt-2 text-left">
                                            <p className="font-bold">${item.price}</p>
                                            {item.PriceBeforeDiscount && (
                                                <del className="text-gray-500">
                                                    ${item.PriceBeforeDiscount}
                                                </del>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivalsProduct;
