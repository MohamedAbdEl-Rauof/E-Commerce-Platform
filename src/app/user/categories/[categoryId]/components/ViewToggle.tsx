import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {ViewOption} from './constants';

interface ViewToggleProps {
    view: string;
    onChange: (value: string) => void;
    options: readonly ViewOption[];
}

const ViewToggle: React.FC<ViewToggleProps> = ({view, onChange, options}) => {
    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, newView) => newView && onChange(newView)}
            aria-label="view"
        >
            {options.map((option) => (
                <ToggleButton key={option.value} value={option.value} aria-label={option.label}>
                    <option.icon/>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default ViewToggle;