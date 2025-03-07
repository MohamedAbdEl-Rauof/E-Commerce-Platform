import React from 'react';
import {Box, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import {Control, Controller, FieldErrors, UseFormTrigger} from 'react-hook-form';
import {UserData} from '../../types/type';

interface ContactInformationProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
    trigger: UseFormTrigger<UserData>;
}

const ContactInformation: React.FC<ContactInformationProps> = ({control, errors, trigger}) => {
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
                border: `1px solid var(--border)`,
                borderRadius: 2,
                boxShadow: '0 4px 6px var(--shadow)',
                backgroundColor: "var(--background)",
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 8px var(--shadow)',
                },
            }}
        >
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 3, color: "var(--foreground)"}}>
                Contact Information
            </Typography>
            <Box sx={{mt: 2}}>
                <Box
                    display="flex"
                    flexDirection={{xs: "column", sm: "row"}}
                    gap={2}
                    mb={3}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="first-name"
                                label="First Name"
                                variant="outlined"
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                sx={inputStyle}
                                onBlur={() => trigger("firstName")}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="last-name"
                                label="Last Name"
                                variant="outlined"
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                sx={inputStyle}
                                onBlur={() => trigger("lastName")}
                            />
                        )}
                    />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="phone-number"
                                label="Phone Number"
                                variant="outlined"
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                sx={inputStyle}
                                onBlur={() => trigger("phoneNumber")}
                            />
                        )}
                    />
                    <Controller
                        name="emailAddress"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="email-address"
                                label="Email Address"
                                variant="outlined"
                                error={!!errors.emailAddress}
                                helperText={errors.emailAddress?.message}
                                sx={inputStyle}
                                onBlur={() => trigger("emailAddress")}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ContactInformation;