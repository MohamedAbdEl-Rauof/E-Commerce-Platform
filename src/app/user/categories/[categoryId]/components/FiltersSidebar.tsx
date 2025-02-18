import React from 'react';
import {Box, Chip, Divider, IconButton, Radio, RadioGroup, Typography, useTheme} from '@mui/material';
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
    categories?: Category[];
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
    const theme = useTheme();

    return (
        <Box
            component="aside"
            sx={{
                width: '100%',
                maxWidth: 280,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
            }}
        >
            <Box sx={{p: 2, bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <FilterListIcon fontSize="small"/>
                        <Typography variant="h6" component="h2">Filters</Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            display: {xs: 'block', lg: 'none'},
                            color: 'inherit',
                            '&:hover': {bgcolor: 'primary.dark'}
                        }}
                        aria-label="Close filters"
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </Box>

            <Divider/>

            <Box sx={{p: 2}}>
                <Typography variant="subtitle2" sx={{mb: 2, fontWeight: 'bold'}}>Price Range</Typography>
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
                                    <Chip
                                        icon={<Radio
                                            checked={filters.priceRange === range.range}
                                            sx={{
                                                '&.Mui-checked': {color: 'primary.main'},
                                                '& .MuiSvgIcon-root': {fontSize: 20}
                                            }}
                                        />}
                                        label={range.label}
                                        onClick={() => onFilterChange("priceRange", range.range)}
                                        sx={{
                                            width: '100%',
                                            justifyContent: 'flex-start',
                                            my: 0.5,
                                            py: 1.5,
                                            bgcolor: filters.priceRange === range.range ? 'primary.light' : 'background.default',
                                            color: filters.priceRange === range.range ? 'primary.main' : 'text.primary',
                                            '&:hover': {
                                                bgcolor: filters.priceRange === range.range ? 'primary.light' : 'action.hover',
                                            },
                                            transition: theme.transitions.create(['background-color', 'box-shadow']),
                                            boxShadow: filters.priceRange === range.range ? 1 : 0,
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