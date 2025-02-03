import React from 'react';
import {Box, FormControlLabel, IconButton, Radio, RadioGroup, Typography} from '@mui/material';
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
                boxShadow: 1,
                transition: 'background-color 0.3s, color 0.3s',
                bgcolor: 'background.paper',
                color: 'text.primary',
            }}
            aria-label="Filters"
        >
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <FilterListIcon fontSize="medium"/>
                    <Typography variant="h6" component="h2">Filters</Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{display: {xs: 'block', lg: 'none'}}}
                    aria-label="Close filters"
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Box component="section" sx={{mb: 4}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 2}}>Price Range</Typography>
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
                                <motion.div key={range.range} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                    <FormControlLabel
                                        value={range.range}
                                        control={<Radio color="primary"/>}
                                        label={range.label}
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            bgcolor: filters.priceRange === range.range ? 'secondary.main' : 'transparent',
                                            color: filters.priceRange === range.range ? 'secondary.contrastText' : 'text.primary',
                                            '&:hover': {
                                                bgcolor: filters.priceRange === range.range ? 'secondary.dark' : 'action.hover',
                                            },
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