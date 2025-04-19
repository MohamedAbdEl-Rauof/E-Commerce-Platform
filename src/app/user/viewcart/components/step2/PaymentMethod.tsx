import React, {useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    ListItemButton,
    ListItemText,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Control, Controller, FieldErrors, UseFormSetValue, UseFormTrigger} from "react-hook-form";
import {CheckCircle, CreditCard, PaymentOutlined, RadioButtonUnchecked} from "@mui/icons-material";
import { FormData } from "../../schema/validationSchema";

interface PaymentMethodProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
    trigger: UseFormTrigger<FormData>;
    handleSelect: (method: string) => void;
    setValue: UseFormSetValue<FormData>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    control,
    errors,
    trigger,
    handleSelect,
    setValue,
}) => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMethodSelect = (method: string) => {
        setSelectedMethod(method);
        handleSelect(method);
        setValue('paymentMethod', method);

        if (method === 'paypal') {
            // Clear credit card fields when PayPal is selected
            setValue('cardNumber', '', {shouldValidate: false});
            setValue('expirationDate', '', {shouldValidate: false});
            setValue('cvc', '', {shouldValidate: false});
        }

        // Only trigger validation for the payment method field
        trigger('paymentMethod');
    };

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
        <Box sx={{
            padding: {xs: 2, sm: 3},
            border: '1px solid var(--border)',
            borderRadius: 2,
            boxShadow: '0 4px 6px var(--shadow)',
            backgroundColor: 'var(--background)',
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 6px 8px var(--shadow)',
            },
        }}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2, color: 'var(--foreground)'}}>
                Payment Method
            </Typography>
            <Box sx={{mt: 4, borderBottom: "1px solid var(--border)", pb: 1}}>
                <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{required: "Please select a payment method"}}
                    render={({field}) => (
                        <>
                            <ListItemButton
                                sx={{
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    mb: 2,
                                    '&:hover': {
                                        backgroundColor: 'var(--hover)',
                                    },
                                    backgroundColor: field.value === "credit-card" ? 'var(--hover)' : 'transparent',
                                }}
                                onClick={() => handleMethodSelect("credit-card")}
                            >
                                <Checkbox
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircle/>}
                                    checked={field.value === "credit-card"}
                                    sx={{color: 'var(--primary)'}}
                                />
                                <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                    <ListItemText primary="Pay By Credit Card" sx={{color: 'var(--foreground)'}}/>
                                    <CreditCard sx={{fontSize: 24, color: 'var(--primary)'}}/>
                                </Box>
                            </ListItemButton>

                            {field.value === "credit-card" && (
                                <Box sx={{mt: 2, mb: 2}}>
                                    <Controller
                                        name="cardNumber"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Card Number"
                                                fullWidth
                                                margin="normal"
                                                error={!!errors.cardNumber}
                                                helperText={errors.cardNumber?.message}
                                                onBlur={() => trigger("cardNumber")}
                                                sx={inputStyle}
                                            />
                                        )}
                                    />
                                    <Box sx={{display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row'}}>
                                        <Controller
                                            name="expirationDate"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="Expiration Date (MM/YY)"
                                                    margin="normal"
                                                    error={!!errors.expirationDate}
                                                    helperText={errors.expirationDate?.message}
                                                    onBlur={() => trigger("expirationDate")}
                                                    sx={inputStyle}
                                                    fullWidth={isMobile}
                                                    placeholder="MM/YY"
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="cvc"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="CVC"
                                                    margin="normal"
                                                    error={!!errors.cvc}
                                                    helperText={errors.cvc?.message}
                                                    onBlur={() => trigger("cvc")}
                                                    sx={inputStyle}
                                                    fullWidth={isMobile}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Box>
                            )}

                            <ListItemButton
                                sx={{
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    '&:hover': {
                                        backgroundColor: 'var(--hover)',
                                    },
                                    backgroundColor: field.value === "paypal" ? 'var(--hover)' : 'transparent',
                                }}
                                onClick={() => handleMethodSelect("paypal")}
                            >
                                <Checkbox
                                    icon={<RadioButtonUnchecked/>}
                                    checkedIcon={<CheckCircle/>}
                                    checked={field.value === "paypal"}
                                    sx={{color: 'var(--primary)'}}
                                />
                                <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                    <ListItemText primary="PayPal" sx={{color: 'var(--foreground)'}}/>
                                    <PaymentOutlined sx={{fontSize: 24, color: 'var(--primary)'}}/>
                                </Box>
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