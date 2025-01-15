"use client";
import React, {useEffect, useMemo, useState} from "react";
import {IoFilter} from "react-icons/io5";
import {FaEquals, FaPause, FaTh, FaThLarge} from "react-icons/fa";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";

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

const Shop: React.FC = () => {
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

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.categoryId !== "all") {
            result = result.filter(
                (product) => product.categoryId === filters.categoryId
            );
        }

        if (filters.priceRange !== "all") {
            const range = PRICE_RANGES.find((r) => r.range === filters.priceRange);
            if (range) {
                result = result.filter((product) => {
                    if (range.max === null) return product.price >= range.min;
                    return product.price >= range.min && product.price <= range.max;
                });
            }
        }

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
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({...prev, [key]: value}));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Banner/>
            <SearchBar
                value={filters.search}
                onChange={(value) => handleFilterChange("search", value)}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Mobile Filters */}
                <div
                    className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-4">
                        <button
                            className="mb-4 text-gray-600"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        >
                            Close Filters
                        </button>
                        <FiltersSidebar
                            categories={categories}
                            priceRanges={PRICE_RANGES}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClose={() => setIsMobileFiltersOpen(false)}
                        />
                    </div>
                </div>

                {/* Desktop Filters */}
                <div className="hidden lg:block lg:w-1/4">
                    <FiltersSidebar
                        categories={categories}
                        priceRanges={PRICE_RANGES}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClose={() => {
                        }}
                    />
                </div>

                <div className="lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            className="lg:hidden flex items-center space-x-2 text-gray-600"
                            onClick={() => setIsMobileFiltersOpen(true)}
                        >
                            <IoFilter/>
                            <span>Filters</span>
                        </button>

                        <div className="flex items-center space-x-4">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                className="border rounded-md px-2 py-1 text-sm"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <div className="flex space-x-2">
                                {VIEW_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleFilterChange("view", option.value)}
                                        className={`p-2 rounded ${
                                            filters.view === option.value
                                                ? "bg-black text-white"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                        title={option.label}
                                    >
                                        <option.icon/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <ProductGrid
                            products={filteredProducts}
                            view={filters.view}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;