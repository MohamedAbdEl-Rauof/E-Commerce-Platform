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
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <FilterListIcon fontSize="medium" sx={{ color: 'var(--foreground)' }}/>
                        <Typography variant="h6" component="h2" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>Filters</Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{display: {xs: 'block', lg: 'none'}, color: 'var(--foreground)'}}
                        aria-label="Close filters"
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box component="section" sx={{mb: 4}}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 2, color: 'var(--foreground)'}}>Categories</Typography>
                    <AnimatePresence>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            {categories.map((category) => (
                                <motion.div key={category._id} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                                    <Button
                                        fullWidth
                                        onClick={() => onFilterChange("categoryId", category._id)}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            px: 2,
                                            py: 1,
                                            mb: 1,
                                            borderRadius: 1,
                                            bgcolor: filters.categoryId === category._id ? 'var(--foreground)' : 'transparent',
                                            color: filters.categoryId === category._id ? 'var(--background)' : 'var(--foreground)',
                                            '&:hover': {
                                                bgcolor: filters.categoryId === category._id ? 'var(--foreground)' : 'var(--hover)',
                                            },
                                            transition: 'background-color 0.3s, color 0.3s',
                                        }}
                                    >
                                        {category.name}
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </Box>
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
                                                        color: 'var(--background)',
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

