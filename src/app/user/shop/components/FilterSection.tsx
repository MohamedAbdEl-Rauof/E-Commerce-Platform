import React from 'react';
import {Box, FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';

interface FilterOption {
    id: string;
    label: string;
}

interface FilterSectionProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
}

const FilterSection: React.FC<FilterSectionProps> = ({title, value, onChange, options}) => {
    return (
        <Box component="section" sx={{mb: 4}}>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 2, color: 'var(--foreground)'}}>
                {title}
            </Typography>
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <RadioGroup
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        {options.map((option) => (
                            <motion.div key={option.id} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                                <FormControlLabel
                                    value={option.id}
                                    control={
                                        <Radio
                                            sx={{
                                                color: value === option.id ? 'var(--background)' : 'var(--foreground)',
                                                '&.Mui-checked': {color: 'var(--background)'},
                                                '& .MuiSvgIcon-root': {fontSize: 20}
                                            }}
                                        />
                                    }
                                    label={option.label}
                                    sx={{
                                        width: '100%',
                                        m: 0,
                                        p: 1,
                                        borderRadius: 1,
                                        bgcolor: value === option.id ? 'var(--foreground)' : 'transparent',
                                        color: value === option.id ? 'var(--background)' : 'var(--foreground)',
                                        '&:hover': {
                                            bgcolor: value === option.id ? 'var(--foreground)' : 'var(--hover)',
                                        },
                                        transition: 'background-color 0.3s, color 0.3s',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </RadioGroup>
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default FilterSection;