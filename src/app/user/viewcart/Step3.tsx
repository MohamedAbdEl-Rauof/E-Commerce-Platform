import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import {useSession} from "next-auth/react";
import ThankYouMessage from "./components/step3/ThankYouMessage";
import OrderBadges from "./components/step3/OrderBadges";
import OrderDetails from "./components/step3/OrderDetails";

interface CartItem {
    id: string;
    image: string;
    name: string;
    price: number;
    isFavourite: boolean;
    quantity: number;
}

interface StepProps {
    cartItems: CartItem[];
}

type Order = {
    paymentMethod: {
        method: string;
    };
    shoppingandTotal: {
        Total: string;
    };
    createdAt: string;
    orderCode: string;
};

const Step3: React.FC<StepProps> = ({cartItems}) => {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [order, setOrder] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrder = async () => {
        if (!userId) {
            console.warn("User ID is not available. Skipping order fetch.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`/api/orders?userId=${userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Failed to fetch order data: ${errorDetails}`);
            }

            const data = await response.json();
            setOrder(data);
            console.log("Order data:", data);
        } catch (error) {
            console.error("Error fetching order:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [userId]);

    const handleRefresh = () => {
        fetchOrder();
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (!order || order.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="text.secondary">No order found.</Typography>
            </Box>
        );
    }

    const firstOrder = order[0];

    return (
        <Box sx={{maxWidth: 'lg', mx: 'auto', mt: 6, mb: 4, px: 2}}>
            <Paper elevation={3} sx={{p: 4, borderRadius: 2, bgcolor: 'var(--light)'}}>
                <ThankYouMessage/>
                <OrderBadges cartItems={cartItems}/>
                <OrderDetails order={firstOrder}/>
                <Box sx={{mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: 2,
                            bgcolor: 'var(--primary)',
                            '&:hover': {bgcolor: 'var(--hover)'}
                        }}
                    >
                        Purchase History
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleRefresh}
                        sx={{
                            borderRadius: 2,
                            borderColor: 'var(--primary)',
                            color: 'var(--primary)',
                            '&:hover': {borderColor: 'var(--hover)', color: 'var(--hover)'}
                        }}
                    >
                        Refresh Order
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Step3;