import React from 'react';
import {Box, Button} from '@mui/material';
import {FilterList} from "@mui/icons-material";
import SortSelect from './SortSelect';
import ViewToggle from './ViewToggle';
import {ViewOption} from "./constants";


interface FilterBarProps {
    filters: {
        sortBy: string;
        view: string;
    };
    onFilterChange: (key: string, value: string) => void;
    isMobile: boolean;
    setIsMobileFiltersOpen: (open: boolean) => void;
    sortOptions: { value: string; label: string }[];
    viewOptions: readonly ViewOption[];

}

const FilterBar: React.FC<FilterBarProps> = ({
                                                 filters,
                                                 onFilterChange,
                                                 isMobile,
                                                 setIsMobileFiltersOpen,
                                                 sortOptions,
                                                 viewOptions
                                             }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            justifyContent: 'space-between',
            alignItems: {xs: 'stretch', sm: 'center'},
            mb: 3,
            gap: 2
        }}>
            {isMobile && (
                <Button
                    startIcon={<FilterList/>}
                    onClick={() => setIsMobileFiltersOpen(true)}
                    variant="outlined"
                    fullWidth
                    sx={{mb: {xs: 2, sm: 0}}}
                >
                    Filters
                </Button>
            )}

            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                alignItems: 'center',
                gap: 2,
                width: {xs: '100%', sm: 'auto'}
            }}>
                <SortSelect
                    value={filters.sortBy}
                    onChange={(value) => onFilterChange("sortBy", value)}
                    options={sortOptions}
                />

                <ViewToggle
                    view={filters.view}
                    onChange={(value) => onFilterChange("view", value)}
                    options={viewOptions}
                />
            </Box>
        </Box>
    );
};

export default FilterBar;