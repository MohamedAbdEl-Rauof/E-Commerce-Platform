import React, {useEffect, useState} from "react";
import {Box, Checkbox, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import {Control, Controller, FieldErrors, UseFormSetValue, UseFormTrigger} from "react-hook-form";
import {UserData} from "../../types/type";
import {CheckCircle, CreditCard, RadioButtonUnchecked} from "@mui/icons-material";

interface PaymentMethodProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
    trigger: UseFormTrigger<UserData>;
    handleSelect: (method: 'credit-card' | 'paypal') => void;
    setValue: UseFormSetValue<UserData>;
    paymentMethod: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
                                                         control,
                                                         errors,
                                                         trigger,
                                                         handleSelect,
                                                         setValue,
                                                         paymentMethod
                                                     }) => {
    const [selectedMethod, setSelectedMethod] = useState<'credit-card' | 'paypal' | null>(null);

    const handleMethodSelect = (method: 'credit-card' | 'paypal') => {
        setSelectedMethod(method);
        handleSelect(method);
        setValue('paymentMethod', method);

        if (method === 'paypal') {
            // Clear credit card fields if PayPal is selected
            setValue('cardNumber', '', {shouldValidate: false});
            setValue('expirationDate', '', {shouldValidate: false});
            setValue('cvc', '', {shouldValidate: false});
        }

        // Trigger validation after setting the payment method
        trigger('paymentMethod');
    };

    useEffect(() => {
        if (selectedMethod) {
            trigger("paymentMethod");
            if (selectedMethod === 'paypal') {
                // Clear any existing errors for credit card fields
                setValue('cardNumber', '', {shouldValidate: false});
                setValue('expirationDate', '', {shouldValidate: false});
                setValue('cvc', '', {shouldValidate: false});
            }
        }
    }, [selectedMethod, trigger, setValue]);

    return (
        <Box sx={{padding: 3, border: "1px solid #e0e0e0", borderRadius: 2, boxShadow: 3, backgroundColor: "#fff"}}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Payment Method
            </Typography>
            <Box sx={{mt: 4, borderBottom: "1px solid #e0e0e0", pb: 1}}>
                <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{required: "Please select a payment method"}}
                    render={({field}) => (
                        <>
                            {/* Credit Card Option */}
                            <ListItemButton
                                sx={{border: "1px solid #e0e0e0", borderRadius: "8px", padding: "8px", mb: 2}}
                                onClick={() => handleMethodSelect("credit-card")}
                            >
                                <Checkbox
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircle/>}
                                    checked={field.value === "credit-card"}
                                />
                                <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                    <ListItemText primary="Pay By Credit Card"/>
                                    <CreditCard style={{fontSize: 24}}/>
                                </Box>
                            </ListItemButton>

                            {field.value === "credit-card" && (
                                <Box sx={{mt: 2, mb: 2}}>
                                    <Controller
                                        name="cardNumber"
                                        control={control}
                                        rules={{required: "Card number is required"}}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Card Number"
                                                fullWidth
                                                margin="normal"
                                                error={!!errors.cardNumber}
                                                helperText={errors.cardNumber?.message}
                                            />
                                        )}
                                    />
                                    <Box sx={{display: 'flex', gap: 2}}>
                                        <Controller
                                            name="expirationDate"
                                            control={control}
                                            rules={{required: "Expiration date is required"}}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="Expiration Date"
                                                    margin="normal"
                                                    error={!!errors.expirationDate}
                                                    helperText={errors.expirationDate?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="cvc"
                                            control={control}
                                            rules={{required: "CVC is required"}}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="CVC"
                                                    margin="normal"
                                                    error={!!errors.cvc}
                                                    helperText={errors.cvc?.message}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Box>
                            )}

                            {/* PayPal Option */}
                            <ListItemButton
                                sx={{border: "1px solid #e0e0e0", borderRadius: "8px", padding: "8px"}}
                                onClick={() => handleMethodSelect("paypal")}
                            >
                                <Checkbox
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircle/>}
                                    checked={field.value === "paypal"}
                                />
                                <ListItemText primary="PayPal"/>
                            </ListItemButton>
                        </>
                    )}
                />
            </Box>
            {errors.paymentMethod && (
                <Typography color="error" variant="caption" sx={{mt: 1}}>
                    {errors.paymentMethod.message}
                </Typography>
            )}
        </Box>
    );
};

export default PaymentMethod;