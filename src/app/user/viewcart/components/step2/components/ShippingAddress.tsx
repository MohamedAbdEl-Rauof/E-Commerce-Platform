import React from "react";
import {Box, TextField, Typography} from "@mui/material";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {UserData} from "./UserData";

interface ShippingAddressProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({control, errors}) => {
    return (
        <Box
            sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Shipping Address
            </Typography>
            <Box sx={{mt: 4}}>
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
                            sx={{mb: 2}}
                        />
                    )}
                />
                <Box display="flex" flexDirection={{xs: "column", sm: "row"}} gap={2} mb={2}>
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
                                label="City"
                                variant="outlined"
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                        )}
                    />
                </Box>
                <Box display="flex" flexDirection={{xs: "column", sm: "row"}} gap={2}>
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
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ShippingAddress;