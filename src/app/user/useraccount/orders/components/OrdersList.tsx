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
import {styled} from "@mui/material/styles";


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

const StyledCard = styled(Card)(({theme}) => ({
    padding: theme.spacing(4),
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
}));

const StyledTable = styled(Table)(({theme}) => ({
    "& .MuiTableCell-head": {
        backgroundColor: "var(--card-bg)",
        color: "var(--heading)",
        fontWeight: "bold",
    },
    "& .MuiTableCell-body": {
        color: "var(--foreground)",
    },
    "& .MuiTableRow-root": {
        "&:nth-of-type(odd)": {
            backgroundColor: "var(--card-bg)",
        },
        "&:hover": {
            backgroundColor: "var(--hover-bg)",
        },
    },
}));


const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "delivered":
            return "var(--success)";
        case "processing":
            return "var(--warning)";
        case "cancelled":
            return "var(--error)";
        default:
            return "var(--muted)";
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

    if (isLoading) {
        return (
            <StyledCard sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400}}>
                <CircularProgress sx={{color: "var(--primary)"}}/>
            </StyledCard>
        );
    }

    return (
        <StyledCard>
            <Typography variant="h5" sx={{mb: 4, color: "var(--heading)"}}>
                My Orders
            </Typography>

            <TableContainer>
                <StyledTable>
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
                                    <Chip
                                        label="Processing"
                                        sx={{
                                            backgroundColor: getStatusColor("processing"),
                                            color: "var(--background)",
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                                <TableCell>{order.shoppingandTotal.shippingType}</TableCell>
                                <TableCell>{formatCurrency(order.shoppingandTotal.Total)}</TableCell>
                                <TableCell>{order.paymentMethod.method}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </StyledCard>
    );
}