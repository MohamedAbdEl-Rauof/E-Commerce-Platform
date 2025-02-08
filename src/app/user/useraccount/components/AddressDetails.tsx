"use client";

import {useEffect, useState} from "react";
import {Box, Card, Grid, Paper, Typography} from "@mui/material";
import {useSession} from "next-auth/react";

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    total: number;
}

interface Order {
    _id: string;
    userId: string;
    contactInfo: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    paymentMethod: {
        method: string;
        cardNumber?: string;
        expirationDate?: string;
        cvc?: string;
    };
    items: OrderItem[];
    shoppingandTotal: {
        shippingType: string;
        subTotal: string;
        Total: string;
    };
    createdAt: string;
    orderCode: string;
}

export default function AddressDetails() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {data: session} = useSession();
    const userId = session?.user?.id || "";

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`/api/ordersAllAddress?userId=${userId}`);
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (isLoading) {
        return (
            <Card sx={{p: 4, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400}}>
                <Typography>Loading addresses...</Typography>
            </Card>
        );
    }

    return (
        <Card sx={{p: 4}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4}}>
                <Typography variant="h5">My Addresses</Typography>
            </Box>

            <Grid container spacing={3}>
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <Grid item xs={12} md={6} key={order._id}>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    Shipping Address for Order: {order.orderCode}
                                </Typography>
                                <Box sx={{mt: 2}}>
                                    <Typography>{order.shippingAddress.street}</Typography>
                                    <Typography>
                                        {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                        {order.shippingAddress.zipCode}
                                    </Typography>
                                    <Typography>{order.shippingAddress.country}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography>No addresses found.</Typography>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
}