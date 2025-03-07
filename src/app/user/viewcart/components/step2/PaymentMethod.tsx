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
import {UserData} from "../../types/type";
import {CheckCircle, CreditCard, PaymentOutlined, RadioButtonUnchecked} from "@mui/icons-material";

interface PaymentMethodProps {
    control: Control<UserData>;
    errors: FieldErrors<UserData>;
    trigger: UseFormTrigger<UserData>;
    handleSelect: (method: 'credit-card' | 'paypal') => void;
    setValue: UseFormSetValue<UserData>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
                                                         control,
                                                         errors,
                                                         trigger,
                                                         handleSelect,
                                                         setValue,
                                                     }) => {
    const [selectedMethod, setSelectedMethod] = useState<'credit-card' | 'paypal' | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMethodSelect = (method: 'credit-card' | 'paypal') => {
        setSelectedMethod(method);
        handleSelect(method);
        setValue('paymentMethod', method);

        if (method === 'paypal') {
            setValue('cardNumber', '', {shouldValidate: false});
            setValue('expirationDate', '', {shouldValidate: false});
            setValue('cvc', '', {shouldValidate: false});
        }

        trigger('paymentMethod');
    };

    useEffect(() => {
        if (selectedMethod) {
            trigger("paymentMethod");
            if (selectedMethod === 'paypal') {
                setValue('cardNumber', '', {shouldValidate: false});
                setValue('expirationDate', '', {shouldValidate: false});
                setValue('cvc', '', {shouldValidate: false});
            }
        }
    }, [selectedMethod, trigger, setValue]);

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
                                        rules={{required: "Card number is required"}}
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
                                            rules={{required: "Expiration date is required"}}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="Expiration Date"
                                                    margin="normal"
                                                    error={!!errors.expirationDate}
                                                    helperText={errors.expirationDate?.message}
                                                    onBlur={() => trigger("expirationDate")}
                                                    sx={inputStyle}
                                                    fullWidth={isMobile}
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