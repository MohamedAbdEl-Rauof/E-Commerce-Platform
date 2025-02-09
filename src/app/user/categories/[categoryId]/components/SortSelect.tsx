import React from 'react';
import {FormControl, MenuItem, Select} from '@mui/material';

interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const SortSelect: React.FC<SortSelectProps> = ({value, onChange, options}) => (
    <FormControl size="small" fullWidth sx={{minWidth: 200}}>
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value as string)}
            displayEmpty
        >
            <MenuItem value="" disabled>Sort by</MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default SortSelect;