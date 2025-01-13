"use client";
import React, {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {IoFilter} from "react-icons/io5";
import {FaEquals, FaHeart, FaPause, FaRegHeart, FaSearch, FaTh, FaThLarge,} from "react-icons/fa";
import Rating from "@mui/material/Rating";
import {AnimatePresence, motion} from "framer-motion";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useCart} from "@/context/AddToCartContext";


// Types
interface Category {
    _id: string;
    name: string;
}

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

interface FilterState {
    categoryId: string;
    priceRange: string;
    sortBy: string;
    view: "grid" | "large" | "split" | "list";
    search: string;
}

interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

// Constants
const PRICE_RANGES: PriceRange[] = [
    {label: "All Price", range: "all", min: 0, max: null},
    {label: "$0.00 - $99.99", range: "0-99.99", min: 0, max: 99.99},
    {label: "$100.00 - $199.99", range: "100-199.99", min: 100, max: 199.99},
    {label: "$200.00 - $299.99", range: "200-299.99", min: 200, max: 299.99},
    {label: "$300.00 - $399.99", range: "300-399.99", min: 300, max: 399.99},
    {label: "$400.00+", range: "400", min: 400, max: null},
];

const SORT_OPTIONS = [
    {value: "featured", label: "Featured"},
    {value: "price-asc", label: "Price: Low to High"},
    {value: "price-desc", label: "Price: High to Low"},
    {value: "name-asc", label: "Name: A to Z"},
    {value: "name-desc", label: "Name: Z to A"},
];

const VIEW_OPTIONS = [
    {icon: FaTh, label: "Grid View", value: "grid"},
    {icon: FaThLarge, label: "Large Grid View", value: "large"},
    {icon: FaPause, label: "Split View", value: "split"},
    {icon: FaEquals, label: "List View", value: "list"},
] as const;


const ProductCard = ({product, isList, onFavorite, isFavorite}: any) => {

    const {data: session} = useSession();
    const router = useRouter();
    const [favorite, setFavorite] = useState<Record<string, boolean>>({}); // Use an object to track favorites by productId
    const {addToCart, toggleFavorite, updateRating, cart, checkUserSignin} = useCart();
    const userId = session.user.id;


    // Handle add to cart click
    const handleAddToCart = (productId: string, quantity: number, isFavourite: boolean) => {
        if (session && session.user) {
            addToCart(userId, productId)
        } else {
            checkUserSignin();
        }
    };

    // Toggle favorite status and add to cart
    const handleFavoriteAndCart = () => {

        toggleFavorite(userId, product._id);

    };


    return (
        <motion.div
            transition={{duration: 0.3}}
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
                <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    onClick={handleFavoriteAndCart}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    {/* Display the heart icon based on favorite status */}
                    {favorite[product._id] ? (
                        <FaHeart className="text-red-500"/>
                    ) : (
                        <FaRegHeart/>
                    )}
                </motion.button>
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
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                </h3>
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
                <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    className="mt-4 w-full bg-black text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={() => handleAddToCart(product._id, 1, false)}

                >
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
};

const Shop = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        categoryId: "all",
        priceRange: "all",
        sortBy: "featured",
        view: "grid",
        search: "",
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    fetch("/api/categories"),
                    fetch("/api/products"),
                ]);

                const categoriesData = await categoriesRes.json();
                const productsData = await productsRes.json();

                setCategories([{_id: "all", name: "All Rooms"}, ...categoriesData]);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);


    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Apply search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm),
            );
        }

        // Apply category filter
        if (filters.categoryId !== "all") {
            result = result.filter(
                (product) => product.categoryId === filters.categoryId,
            );
        }

        // Apply price filter
        if (filters.priceRange !== "all") {
            const range = PRICE_RANGES.find((r) => r.range === filters.priceRange);
            if (range) {
                result = result.filter((product) => {
                    if (range.max === null) return product.price >= range.min;
                    return product.price >= range.min && product.price <= range.max;
                });
            }
        }

        // Apply sorting
        switch (filters.sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        return result;
    }, [products, filters]);

    const toggleFavorite = (productId: string) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) {
                next.delete(productId);
            } else {
                next.add(productId);
            }
            return next;
        });
    };

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({...prev, [key]: value}));
    };

    const getGridClasses = () => {
        switch (filters.view) {
            case "large":
                return "grid-cols-1 lg:grid-cols-2 gap-8";
            case "split":
                return "grid-cols-1 lg:grid-cols-2 gap-6";
            case "list":
                return "grid-cols-1 gap-4";
            default:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
        }
    };


    return (
        <div className="min-h-screen ">
            <div className="w-[90%] mx-auto ">
                {/* Banner */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="mt-14 relative h-[400px] rounded-xl overflow-hidden"
                >
                    <Image
                        src="/images/Shop/Paste Image (1).jpg"
                        alt="Shop Banner"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="transform hover:scale-105 transition-transform duration-700"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center">
                        <motion.nav
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            className="flex items-center space-x-2 text-white mb-4"
                        >
                            <Link href="/" className="hover:text-gray-200 transition">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-300">Shop</span>
                        </motion.nav>
                        <motion.h1
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
                        >
                            Shop Page
                        </motion.h1>
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="text-gray-200 text-center max-w-2xl px-4"
                        >
                            Let's design the place you always imagined.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <div className="mt-8 mb-6">
                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Mobile Filters Button */}
                    <button
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="lg:hidden flex items-center justify-center space-x-2 w-full py-2 bg-black text-white rounded-lg"
                    >
                        <IoFilter/>
                        <span>Filters</span>
                    </button>

                    {/* Filters Sidebar */}
                    <AnimatePresence>
                        {(isMobileFiltersOpen || window.innerWidth >= 1024) && (
                            <motion.aside
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                className="lg:col-span-1 fixed lg:static inset-0 bg-white lg:bg-transparent z-50 lg:z-auto"
                            >
                                <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <IoFilter className="text-xl"/>
                                            <h2 className="text-lg font-semibold">Filters</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsMobileFiltersOpen(false)}
                                            className="lg:hidden text-gray-500"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Categories */}
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-4">Categories</h3>
                                        <div className="space-y-2">
                                            {categories.map((category) => (
                                                <motion.button
                                                    key={category._id}
                                                    whileHover={{x: 4}}
                                                    onClick={() =>
                                                        handleFilterChange("categoryId", category._id)
                                                    }
                                                    className={`block w-full text-left px-2 py-1.5 rounded transition ${
                                                        filters.categoryId === category._id
                                                            ? "bg-black text-white"
                                                            : "hover:bg-gray-100"
                                                    }`}
                                                >
                                                    {category.name}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Ranges */}
                                    <div className="mb-8">
                                        <h3 className="font-semibold mb-4">Price Range</h3>
                                        <div className="space-y-2">
                                            {PRICE_RANGES.map((range) => (
                                                <label
                                                    key={range.range}
                                                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        checked={filters.priceRange === range.range}
                                                        onChange={() =>
                                                            handleFilterChange("priceRange", range.range)
                                                        }
                                                        className="form-radio text-black"
                                                    />
                                                    <span>{range.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Controls */}
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4"
                        >
                            <div className="flex items-center space-x-4">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                    className="form-select rounded border-gray-200 focus:ring-black/20"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center space-x-2">
                                {VIEW_OPTIONS.map(({icon: Icon, label, value}) => (
                                    <motion.button
                                        key={value}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        onClick={() => handleFilterChange("view", value)}
                                        className={`p-2 rounded transition ${
                                            filters.view === value
                                                ? "bg-black text-white"
                                                : "text-gray-500 hover:bg-gray-100"
                                        }`}
                                        title={label}
                                    >
                                        <Icon/>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Products */}
                        <div className={`grid ${getGridClasses()}`}>
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        isList={filters.view === "list"}
                                        onFavorite={toggleFavorite}
                                        isFavorite={favorites.has(product._id)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="text-center py-12 bg-white rounded-lg"
                            >
                                <p className="text-gray-500">
                                    No products found matching your criteria
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shop;
