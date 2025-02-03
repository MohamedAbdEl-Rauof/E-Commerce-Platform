import React from 'react';
import {Box, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
    return (
        <Box sx={{mt: 8, mb: 6}}>
            <Box sx={{maxWidth: 'xl', mx: 'auto'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action"/>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '9999px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'grey.200',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'grey.300',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                                borderWidth: '2px',
                            },
                            pl: 2,
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            py: 1.5,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default SearchBar;