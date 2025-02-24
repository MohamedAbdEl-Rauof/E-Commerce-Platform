"use client";
import React, {useEffect, useState} from "react";
import {Box, Button, Container, Grid, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";
import Swal from "sweetalert2";
import ContactInformation from "./components/step2/ContactInformation";
import OrderSummary from "./components/step2/OrderSummary";
import ShippingAddress from "./components/step2/ShippingAddress";
import PaymentMethod from "./components/step2/PaymentMethod";
import {CartItem, StepProps, UserData} from "./types/type";
import {schema} from "./schema/validationSchema";

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    backgroundColor: 'var(--background-paper)',
    color: 'var(--text-primary)',
}));

const StyledButton = styled(Button)(({theme}) => ({
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
                                        setCartItems,
                                        selectedShipping,
                                        handleCheckout,
                                    }) => {
    const [total, setTotal] = useState<number>(0);
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState(false);


    // Handle payment method selection
    const handleSelect = (method: string) => {
        setPaymentMethod(method);
        console.log("Selected Payment Method:", method);
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
        formState: {errors, isValid},
        reset,
    } = useForm<UserData>({
        resolver: valibotResolver(schema),
        mode: "all",
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
        },
    });

    useEffect(() => {
        // Check if the form is valid
        const isValidForm = isValid && cartItems.length > 0;
        setIsFormValid(isValidForm);
    }, [isValid, cartItems]);

    const onSubmit = async (data: UserData) => {
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create order");
            }

            const result = await response.json();
            console.log("Order created successfully:", result);

            // Show success message
            Swal.fire({
                title: "Order Placed!",
                text: "Your order has been successfully placed.",
                icon: "success",
                confirmButtonText: "OK",
            });

            // Reset form and cart
            reset();
            setCartItems([]);
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
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{mt: 4, mb: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Checkout
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <StyledPaper elevation={3}>
                                <ContactInformation control={control} errors={errors}/>
                                <ShippingAddress control={control} errors={errors}/>
                                <PaymentMethod control={control} errors={errors} handleSelect={handleSelect}/>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StyledPaper elevation={3}>
                                <OrderSummary
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                    selectedShipping={selectedShipping}
                                    total={total}
                                />
                            </StyledPaper>
                        </Grid>
                    </Grid>

                    <StyledButton
                        variant="contained"
                        fullWidth
                        disabled={!isFormValid}
                        onClick={isFormValid ? handleCheckout : undefined}
                    >
                        Place Order
                    </StyledButton>
                </form>
            </Box>
        </Container>
    );
};

export default Step2;
