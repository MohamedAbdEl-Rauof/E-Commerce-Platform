import React from 'react';
import {Box, TextField, Typography} from '@mui/material';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {UserData} from '../../types/type';

interface ContactInformationProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
}

const ContactInformation: React.FC<ContactInformationProps> = ({control, errors}) => {
    return (
        <Box
            sx={{
                padding: 3,
                border: `1px solid var(--border)`,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "var(--background)",
            }}
        >
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2, color: "var(--text)"}}>
                Contact Information
            </Typography>
            <Box sx={{mt: 4}}>
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
                                sx={{color: "var(--text)"}}
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
                                sx={{color: "var(--text)"}}
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
                                sx={{color: "var(--text)"}}
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
                                sx={{color: "var(--text)"}}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ContactInformation;