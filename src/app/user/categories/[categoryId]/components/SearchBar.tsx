import React, { useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChange('');
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'var(--foreground)' }} />
                            </InputAdornment>
                        ),
                        endAdornment: value && (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="clear search"
                                    onClick={handleClear}
                                    edge="end"
                                    size="small"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '9999px',
                            backgroundColor: 'var(--background)',
                            boxShadow: isFocused
                                ? `0 0 0 4px var(--primary-light)`
                                : '0 2px 5px var(--shadow)',
                            transition: 'all 0.3s ease',
                            pl: 2,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--foreground)',
                            opacity: 0.3,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--foreground)',
                            opacity: 0.5,
                        },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                            borderWidth: '2px',
                        },
                        '& .MuiInputBase-input': {
                            py: 1.5,
                            fontSize: '1rem',
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