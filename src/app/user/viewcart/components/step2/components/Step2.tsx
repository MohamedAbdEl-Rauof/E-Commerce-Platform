"use client";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { schema } from "./validationSchema";
import ContactInformation from "./ContactInformation";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import { UserData } from "./UserData";
import { CartItem } from "../../types";

interface StepProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedShipping: number;
    handleCheckout: () => void;
}

const Step2: React.FC<StepProps> = ({
                                        cartItems,
                                        setCartItems,
                                        selectedShipping,
                                        handleCheckout
                                    }) => {
    const [total, setTotal] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<UserData>({
        resolver: valibotResolver(schema),
        mode: "all",
    });

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

    const onSubmit = async () => {
        // Form submission logic here (as in the original component)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto mt-24 mb-14">
                <Box display="flex" gap={4} flexDirection={{xs: "column", md: "row"}}>
                    <Box flex="1" display="flex" flexDirection="column" gap={4}>
                        <ContactInformation control={control} errors={errors}/>
                        <ShippingAddress control={control} errors={errors}/>
                        <PaymentMethod
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            control={control}
                            errors={errors}
                        />
                    </Box>
                    <OrderSummary
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        total={total}
                        selectedShipping={selectedShipping}
                    />
                </Box>
            </div>
            {/* Submit button */}
            <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Place Order
            </Button>
        </form>
    );
};

export default Step2;