import React from 'react';
import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion';

interface PriceRange {
    label: string;
    range: string;
    min: number;
    max: number | null;
}

interface FiltersSidebarProps {
    priceRanges: PriceRange[];
    selectedPriceRange: string;
    onFilterChange: (value: string) => void;
    onClose: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
                                                           priceRanges,
                                                           selectedPriceRange,
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
            aria-label="Price Range Filter"
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon fontSize="medium" sx={{ color: 'var(--foreground)' }} />
                    <Typography variant="h6" component="h2" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>Price Range</Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{ display: { xs: 'block', lg: 'none' }, color: 'var(--foreground)' }}
                    aria-label="Close filters"
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box component="section" >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Box sx={{bgcolor: 'var(--background)'}}>
                            <RadioGroup
                                value={selectedPriceRange}
                                onChange={(e) => onFilterChange(e.target.value)}
                            >
                                {priceRanges.map((range) => (
                                    <motion.div key={range.range} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                                                '&:hover': {
                                                    bgcolor: selectedPriceRange === range.range ? 'var(--primary-light)' : 'var(--hover)',
                                                },
                                                transition: 'background-color 0.3s, color 0.3s',
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </RadioGroup>
                        </Box>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default FiltersSidebar;