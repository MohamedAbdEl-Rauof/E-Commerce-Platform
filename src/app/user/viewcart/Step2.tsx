"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import ContactInformation from "./components/step2/ContactInformation";
import OrderSummary from "./components/step2/OrderSummary";
import ShippingAddress from "./components/step2/ShippingAddress";
import PaymentMethod from "./components/step2/PaymentMethod";
import { CartItem, UserData } from "./types/type";
import { schema, FormData } from "./schema/validationSchema";

interface StepProps {
    cartItems: CartItem[];
    selectedShipping: number;
    handleCheckout: () => void;
    setSelectedShipping: Dispatch<SetStateAction<number>>
    deleteItem: (productId: string) => Promise<void>;
    decrementFromCart: (userId: string, productId: string) => Promise<void>;
    addToCart: (userId: string, productId: string) => Promise<void>;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'var(--background-paper)',
    color: 'var(--text-primary)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    mt: 3,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&:disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
    },
}));

const Step2: React.FC<StepProps> = ({
    cartItems,
    selectedShipping,
    handleCheckout,
    decrementFromCart,
    addToCart,
}) => {
    const [total, setTotal] = useState<number>(0);
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle payment method selection
    const handleSelect = (method: string) => {
        setPaymentMethod(method);
        setValue('paymentMethod', method);
        // Trigger validation after setting the value
        trigger('paymentMethod');
    };

    // Update total on cartItems or selectedShipping change
    useEffect(() => {
        const subtotal = calculateSubtotal(cartItems);
        let shippingCost = 0;

        if (selectedShipping === 2) {
            shippingCost = 15.0;
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21);
        }

        setTotal(subtotal + shippingCost);
    }, [cartItems, selectedShipping]);


    const calculateSubtotal = (cartItems: CartItem[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        trigger,
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailAddress: "",
            streetAddress: "",
            country: "",
            city: "",
            state: "",
            zipCode: "",
            cardNumber: "",
            expirationDate: "",
            cvc: "",
            paymentMethod: "",
        },
    });

    useEffect(() => {
        // Check if the form is valid and if payment method is selected
        const isValidForm = isValid && cartItems.length > 0 && paymentMethod !== "";
        setIsFormValid(isValidForm);
    }, [isValid, cartItems, paymentMethod]);

    const onSubmit = handleSubmit(async (data) => {
        const subtotal = calculateSubtotal(cartItems);
        let shippingCost = 0;
        if (selectedShipping === 2) {
            shippingCost = 15.0;
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21);
        }

        const total = subtotal + shippingCost;

        const shippingDescription =
            selectedShipping === 1
                ? "free"
                : selectedShipping === 2
                    ? "Express"
                    : selectedShipping === 3
                        ? "Pickup"
                        : "Unknown";

        const orderData = {
            userId: userId,
            contactInfo: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phoneNumber,
                email: data.emailAddress,
            },
            shippingAddress: {
                street: data.streetAddress,
                city: data.city,
                state: data.state,
                country: data.country,
                zipCode: data.zipCode,
            },
            paymentMethod: {
                method: paymentMethod,
                cardNumber: data.cardNumber,
                expirationDate: data.expirationDate,
                cvc: data.cvc,
            },
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
            })),
            shoppingandTotal: {
                shippingType: shippingDescription,
                subTotal: subtotal.toFixed(2),
                Total: total.toFixed(2),
            },
            createdAt: new Date().toLocaleString(),
        };

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create order");
            }

            const result = await response.json();

            Swal.fire({
                title: "Order Placed!",
                text: "Your order has been successfully placed.",
                icon: "success",
                confirmButtonText: "OK",
            });

            reset();
            handleCheckout();
        } catch (error) {
            console.error("Error creating order:", error);
            Swal.fire({
                title: "Error",
                text: "There was an error placing your order. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    });

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Checkout
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <StyledPaper elevation={3}>
                                <ContactInformation control={control} errors={errors} trigger={trigger} />
                                <ShippingAddress control={control} errors={errors} trigger={trigger} />
                                <PaymentMethod control={control} errors={errors} handleSelect={handleSelect}
                                    trigger={trigger} setValue={setValue} />
                            </StyledPaper>

                            <Box sx={{ my: 3 }}>
                                <StyledButton
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={!isFormValid}
                                >
                                    Place Order
                                </StyledButton>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StyledPaper elevation={3}>
                                <OrderSummary
                                    cartItems={cartItems}
                                    selectedShipping={selectedShipping}
                                    total={total}
                                    decrementFromCart={decrementFromCart}
                                    addToCart={addToCart}
                                />
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Step2;