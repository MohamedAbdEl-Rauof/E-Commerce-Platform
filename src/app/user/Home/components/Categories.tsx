import React from "react";
import {motion} from "framer-motion";
import {useCategories} from "@/context/CategoriesContext";
import Image from "next/image";
import Link from "next/link";
import CategoriesLoading from "@/components/userUiLoading/Home/CategoriesLoading";


const Categories = () => {
    const {categories, loading, error} = useCategories();

    if (error) {
        return <div>Error: {error}</div>;
    }

    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
    };

    return (
        <div
            className={`mt-14 mb-10 grid gap-4 w-[90%] mx-auto ${
                categories.length <= 3
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
            }`}
        >
            {loading ? (
                <CategoriesLoading/>
            ) : (
                categories.map((category, index) => (
                    <motion.div
                        key={category.id || index}
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        transition={{duration: 0.3}}
                        className="bg-white rounded-lg shadow-sm overflow-hidden group transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative w-full">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                <Image
                                    width={400}
                                    height={400}
                                    priority
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div
                                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <h1 className="text-lg font-bold text-white">{category.name}</h1>
                                <u className="flex items-center mt-1 text-black font-bold cursor-pointer">
                                    <Link href="/pages/Shop">Shop Now</Link>
                                </u>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default Categories;