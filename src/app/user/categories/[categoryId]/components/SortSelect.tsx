import React from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange, options }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: 'var(--background)',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 4px 20px var(--shadow)',
                        }
                    }
                }}
                sx={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'var(--hover)',
                        borderColor: 'var(--primary)',
                    },
                    '&.Mui-focused': {
                        borderColor: 'var(--focus)',
                        boxShadow: '0 0 0 2px var(--focus)',
                    },
                    '& .MuiSelect-icon': {
                        color: 'var(--muted)',
                    },
                    transition: 'all 0.2s ease-in-out',
                }}
            >
                <MenuItem value="" disabled sx={{ color: 'var(--muted)' }}>
                    Sort by
                </MenuItem>
                {options.map((option) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                            color: 'var(--foreground)',
                            '&:hover': {
                                backgroundColor: 'var(--hover)',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'var(--primary)',
                                color: 'var(--light)',
                                '&:hover': {
                                    backgroundColor: 'var(--accent)',
                                },
                            },
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortSelect;