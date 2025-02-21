import React from 'react';
import {Box, IconButton} from '@mui/material';
import {ViewOption} from './constants';

interface ViewToggleProps {
    view: string;
    onChange: (value: string) => void;
    options: readonly ViewOption[];
}

const ViewToggle: React.FC<ViewToggleProps> = ({view, onChange, options}) => {
    return (
        <Box sx={{display: 'flex', gap: 1}}>
            {options.map((option) => (
                <IconButton
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    color={view === option.value ? "primary" : "default"}
                    title={option.label}
                    sx={{
                        color: view === option.value ? 'var(--primary)' : 'var(--foreground)',
                        backgroundColor: 'var(--light)',
                        '&:hover': {
                            backgroundColor: 'var(--hover)',
                        },
                    }}
                >
                    <option.icon/>
                </IconButton>
            ))}
        </Box>
    );
};

export default ViewToggle;