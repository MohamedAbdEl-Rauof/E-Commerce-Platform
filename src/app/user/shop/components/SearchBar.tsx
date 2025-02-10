import React from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <Box >
            <Box sx={{width :'100%'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'var(--foreground)' }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '9999px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--foreground)',
                                opacity: 0.3,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--foreground)',
                                opacity: 0.5,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--primary)',
                                borderWidth: '2px',
                            },
                            pl: 2,
                            backgroundColor: 'var(--background)',
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            py: 1.5,
                            color: 'var(--foreground)',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'var(--foreground)',
                            opacity: 0.7,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default SearchBar;