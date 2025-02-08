import React, {useState} from 'react';
import {Box, IconButton, InputAdornment, TextField, useTheme} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleClear = () => {
        onChange('');
    };

    return (
        <Box sx={{mt: 4, mb: 4}}>
            <Box sx={{maxWidth: 'md', mx: 'auto'}}>
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
                                <SearchIcon color="action"/>
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
                                    <CloseIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '28px',
                            backgroundColor: theme.palette.background.paper,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: isFocused ? theme.palette.primary.main : 'transparent',
                                borderWidth: isFocused ? 2 : 1,
                            },
                            pl: 2,
                            pr: 1,
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            py: 1.5,
                            fontSize: '1rem',
                        },
                        '& .MuiInputBase-root': {
                            boxShadow: isFocused
                                ? `0 0 0 4px ${theme.palette.primary.main}33`
                                : '0 2px 5px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default SearchBar;