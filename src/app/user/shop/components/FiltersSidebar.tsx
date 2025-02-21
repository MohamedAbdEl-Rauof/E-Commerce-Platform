import React from 'react';
import {Box} from '@mui/material';
import FilterSection from "./FilterSection";

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
        <Box
            component="aside"
            sx={{
                position: 'sticky',
                top: 4,
                p: 3,
                borderRadius: 2,
                boxShadow: 'var(--shadow)',
                transition: 'background-color 0.3s, color 0.3s',
                bgcolor: 'var(--background)',
                color: 'var(--foreground)',
                width: '100%',
                maxWidth: '300px',
                border: '1px solid var(--muted)',
            }}
            aria-label="Filters"
        >
            <FilterSection
                title="Categories"
                value={filters.categoryId}
                onChange={(value) => onFilterChange("categoryId", value)}
                options={categories.map((category) => ({
                    id: category._id,
                    label: category.name,
                }))}
            />

            <FilterSection
                title="Price Range"
                value={filters.priceRange}
                onChange={(value) => onFilterChange("priceRange", value)}
                options={priceRanges.map((range) => ({
                    id: range.range,
                    label: range.label,
                }))}
            />
        </Box>
    );
};

export default FiltersSidebar;
