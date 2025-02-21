import React from 'react';
import {Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, Typography} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
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
            <Box component="section" sx={{mb: 4}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 2, color: 'var(--foreground)'}}>Price Range</Typography>
                <AnimatePresence>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <RadioGroup
                            value={filters.priceRange}
                            onChange={(e) => onFilterChange("priceRange", e.target.value)}
                        >
                            {priceRanges.map((range) => (
                                <motion.div key={range.range} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                                    <FormControlLabel
                                        value={range.range}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: filters.priceRange === range.range ? 'var(--background)' : 'var(--foreground)',
                                                    '&.Mui-checked': { color: 'var(--background)' },
                                                    '& .MuiSvgIcon-root': { fontSize: 20 }
                                                }}
                                            />
                                        }
                                        label={range.label}
                                        sx={{
                                            width: '100%',
                                            m: 0,
                                            p: 1,
                                            borderRadius: 1,
                                            bgcolor: filters.priceRange === range.range ? 'var(--foreground)' : 'transparent',
                                            color: filters.priceRange === range.range ? 'var(--background)' : 'var(--foreground)',
                                            '&:hover': {
                                                bgcolor: filters.priceRange === range.range ? 'var(--foreground)' : 'var(--hover)',
                                            },
                                            transition: 'background-color 0.3s, color 0.3s',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </RadioGroup>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default FiltersSidebar;
