import React from 'react';
import {Box, Checkbox, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import {Control, Controller, FieldErrors, UseFormTrigger} from 'react-hook-form';
import {UserData} from '../../types/type';

interface ShippingAddressProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
    trigger: UseFormTrigger<UserData>;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({control, errors, trigger}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--border)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--hover)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--focus)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--muted)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--foreground)',
        },
    };

    return (
        <Box
            sx={{
                padding: {xs: 2, sm: 3},
                border: '1px solid var(--border)',
                borderRadius: 2,
                boxShadow: '0 4px 6px var(--shadow)',
                backgroundColor: 'var(--background)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 8px var(--shadow)',
                },
            }}
        >
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2, color: 'var(--foreground)'}}>
                Shipping Address
            </Typography>
            <Box sx={{mt: 3}}>
                <Controller
                    name="streetAddress"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="street-address"
                            label="Street Address"
                            variant="outlined"
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress?.message}
                            onBlur={() => trigger("streetAddress")}
                            sx={{...inputStyle, mb: 2}}
                        />
                    )}
                />
                <Controller
                    name="country"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="country"
                            label="Country"
                            variant="outlined"
                            error={!!errors.country}
                            helperText={errors.country?.message}
                            onBlur={() => trigger("country")}
                            sx={{...inputStyle, mb: 2}}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            fullWidth
                            id="city"
                            label="Town / City"
                            variant="outlined"
                            error={!!errors.city}
                            helperText={errors.city?.message}
                            onBlur={() => trigger("city")}
                            sx={{...inputStyle, mb: 2}}
                        />
                    )}
                />
                <Box
                    display="flex"
                    flexDirection={{xs: 'column', sm: 'row'}}
                    gap={2}
                    mb={2}
                >
                    <Controller
                        name="state"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="state"
                                label="State"
                                variant="outlined"
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                onBlur={() => trigger("state")}
                                sx={inputStyle}
                            />
                        )}
                    />
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="zip-code"
                                label="Zip Code"
                                variant="outlined"
                                error={!!errors.zipCode}
                                helperText={errors.zipCode?.message}
                                onBlur={() => trigger("zipCode")}
                                sx={inputStyle}
                            />
                        )}
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                    <Checkbox sx={{
                        color: 'var(--muted)',
                        '&.Mui-checked': {
                            color: 'var(--primary)',
                        },
                    }}/>
                    <Typography component="label" sx={{ml: 1, color: 'var(--foreground)'}}>
                        Use a different billing address (optional)
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ShippingAddress;