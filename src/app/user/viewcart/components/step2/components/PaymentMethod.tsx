import React from "react";
import {Box, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {CiCreditCard1} from "react-icons/ci";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {UserData} from "./UserData";

interface PaymentMethodProps {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
                                                         paymentMethod,
                                                         setPaymentMethod,
                                                         control,
                                                         errors,
                                                     }) => {
    const handleSelect = (method: string) => {
        setPaymentMethod(method);
    };

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
                Payment Method
            </Typography>
            <ListItemButton
                onClick={() => handleSelect("Credit Card")}
                sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    mb: 2,
                    "&:hover": {backgroundColor: "#f5f5f5"},
                }}
            >
                <Checkbox
                    checked={paymentMethod === "Credit Card"}
                    icon={<RadioButtonUncheckedIcon/>}
                    checkedIcon={<CheckCircleIcon/>}
                />
                <CiCreditCard1 size={24} style={{marginRight: '10px'}}/>
                <ListItemText primary="Credit Card"/>
            </ListItemButton>

            {paymentMethod === "Credit Card" && (
                <Box sx={{mt: 2}}>
                    <Controller
                        name="cardNumber"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                id="card-number"
                                label="Card Number"
                                variant="outlined"
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber?.message}
                                sx={{mb: 2}}
                            />
                        )}
                    />
                    <Box display="flex" gap={2}>
                        <Controller
                            name="expirationDate"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="expiration-date"
                                    label="Expiration Date"
                                    variant="outlined"
                                    error={!!errors.expirationDate}
                                    helperText={errors.expirationDate?.message}
                                />
                            )}
                        />
                        <Controller
                            name="cvc"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    id="cvc"
                                    label="CVC"
                                    variant="outlined"
                                    error={!!errors.cvc}
                                    helperText={errors.cvc?.message}
                                />
                            )}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PaymentMethod;