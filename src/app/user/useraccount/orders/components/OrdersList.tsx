// /pages/UserAccount/components/OrdersList.tsx

"use client";

import {useEffect, useState} from "react";
import {
    Card,
    Chip,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {useSession} from "next-auth/react";

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    total: number;
}

interface Order {
    _id: string;
    orderCode: string;
    createdAt: string;
    items: OrderItem[];
    shoppingandTotal: {
        subTotal: string;
        Total: string;
        shippingType: string;
    };
    paymentMethod: {
        method: string;
    };
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "delivered":
            return "success";
        case "processing":
            return "warning";
        case "cancelled":
            return "error";
        default:
            return "default";
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(amount));
};

export default function OrdersList() {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Ensure code involving localStorage runs only in the client
    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            // Safely use localStorage here, if needed
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`/api/ordersAllAddress?userId=${userId}`);
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (isLoading) {
        return (
            <Card sx={{p: 4, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400}}>
                <CircularProgress/>
            </Card>
        );
    }

    return (
        <Card sx={{p: 4}}>
            <Typography variant="h5" sx={{mb: 4}}>
                My Orders
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Code</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Shipping Type</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Payment Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderData.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.orderCode}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Chip label="Processing" color={getStatusColor("processing")} size="small"/>
                                </TableCell>
                                <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                                <TableCell>{order.shoppingandTotal.shippingType}</TableCell>
                                <TableCell>{formatCurrency(order.shoppingandTotal.Total)}</TableCell>
                                <TableCell>{order.paymentMethod.method}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
