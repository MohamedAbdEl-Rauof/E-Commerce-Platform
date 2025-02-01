import React from 'react';
import {IoFilter} from 'react-icons/io5';
import {AnimatePresence, motion} from 'framer-motion';

interface Category {
    _id: string;
    name: string;
}

interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

interface FiltersSidebarProps {
    categories: Category[];
    priceRanges: PriceRange[];
    filters: {
        categoryId: string;
        priceRange: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClose: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
                                                           categories,
                                                           priceRanges,
                                                           filters,
                                                           onFilterChange,
                                                           onClose,
                                                       }) => {

    return (
        <aside
            className="sticky top-4 p-6 rounded-lg shadow-sm transition-colors duration-300"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
            aria-label="Filters"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <IoFilter className="text-xl" aria-hidden="true"/>
                    <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden text-current"
                    aria-label="Close filters"
                >
                    ×
                </button>
            </div>
            <section className="mb-8">
                <h3 className="font-semibold mb-4">Categories</h3>
                <AnimatePresence>
                    <motion.div
                        className="space-y-2"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category._id}
                                onClick={() => onFilterChange("categoryId", category._id)}
                                className={`block w-full text-left px-2 py-1.5 rounded transition-colors duration-300`}
                                style={{
                                    backgroundColor: filters.categoryId === category._id ? 'var(--primary)' : 'transparent',
                                    color: filters.categoryId === category._id ? 'var(--background)' : 'var(--foreground)',
                                }}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>
            <section className="mb-8">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <AnimatePresence>
                    <motion.div
                        className="space-y-2"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {priceRanges.map((range) => (
                            <motion.label
                                key={range.range}
                                className="flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors duration-300"
                                style={{
                                    backgroundColor: filters.priceRange === range.range ? 'var(--secondary)' : 'transparent',
                                    color: filters.priceRange === range.range ? 'var(--background)' : 'var(--foreground)',
                                }}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    checked={filters.priceRange === range.range}
                                    onChange={() => onFilterChange("priceRange", range.range)}
                                    className="form-radio"
                                    style={{color: 'var(--primary)'}}
                                />
                                <span>{range.label}</span>
                            </motion.label>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>
        </aside>
    );
};

export default FiltersSidebar;