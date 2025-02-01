import React from 'react';
import {Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {PriceRange} from './types';

interface PriceFilterProps {
    priceRange: string;
    onChange: (value: string) => void;
    priceRanges: PriceRange[];
}

const PriceFilter: React.FC<PriceFilterProps> = ({priceRange, onChange, priceRanges}) => {
    return (
        <Card>
            <CardContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Price Range</FormLabel>
                    <RadioGroup
                        value={priceRange}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        {priceRanges.map((range) => (
                            <FormControlLabel
                                key={range.range}
                                value={range.range}
                                control={<Radio/>}
                                label={range.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default PriceFilter;