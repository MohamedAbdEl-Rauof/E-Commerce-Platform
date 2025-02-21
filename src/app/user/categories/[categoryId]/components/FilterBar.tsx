import React from 'react';
import {Box, Button, Grid} from '@mui/material';
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
            flexDirection: 'column',
            gap: 2,
            mb: 3,
        }}>
            {isMobile && (
                <Button
                    startIcon={<FilterList/>}
                    onClick={() => setIsMobileFiltersOpen(true)}
                    variant="outlined"
                    fullWidth
                >
                    Filters
                </Button>
            )}

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={5} sm={6} md={4} lg={3}>
                    <SortSelect
                        value={filters.sortBy}
                        onChange={(value) => onFilterChange("sortBy", value)}
                        options={sortOptions}
                    />
                </Grid>
                <Grid item xs={5} sm={6} md={8} lg={9}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: {xs: 'flex-start', sm: 'flex-end'},
                        width: '100%',
                    }}>
                        <ViewToggle
                            view={filters.view}
                            onChange={(value) => onFilterChange("view", value)}
                            options={viewOptions}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterBar;