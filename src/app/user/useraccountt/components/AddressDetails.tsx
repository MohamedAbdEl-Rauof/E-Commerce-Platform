"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Card,
    Chip,
    Divider,
    Grid,
    Paper,
    Tooltip,
    Typography,
    CircularProgress
} from "@mui/material";
import {
    CalendarTodayOutlined,
    HomeOutlined,
    LocationCityOutlined,
    LocationOffOutlined,
    LocationOnOutlined,
    LocalShippingOutlined,
    PublicOutlined
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";


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

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: "100%",
    backgroundColor: "var(--card-bg)",
    color: "var(--card-text)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
}));


export default function AddressDetails() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();
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
            <StyledCard sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh'
            }}>
                <CircularProgress size={60} sx={{ color: 'var(--primary)' }} />
                <Typography sx={{ mt: 3, color: 'var(--muted)' }}>
                    Loading addresses...
                </Typography>
            </StyledCard>

        );
    }

    return (
        <StyledCard>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" sx={{
                    color: "var(--heading)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <LocationOnOutlined sx={{ color: "var(--primary)" }} />
                    My Addresses
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <Grid item xs={12} md={6} key={order._id}>
                            <StyledPaper sx={{
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'var(--shadow-lg)',
                                }
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 2
                                }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{
                                            color: "var(--primary)",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <LocalShippingOutlined fontSize="small" />
                                        Order: {order.orderCode}
                                    </Typography>
                                    <Chip
                                        size="small"
                                        sx={{
                                            bgcolor: 'var(--primary-light)',
                                            color: 'var(--primary-dark)',
                                            fontWeight: 500
                                        }}
                                    />
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{
                                    mt: 2,
                                    pl: 1,
                                    borderLeft: '2px solid var(--primary-light)'
                                }}>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <HomeOutlined sx={{ color: 'var(--primary)' }} />
                                        <Typography sx={{ fontWeight: 500 }}>{order.shippingAddress.street}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <LocationCityOutlined sx={{ color: 'var(--primary)' }} />
                                        <Typography>
                                            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                            {order.shippingAddress.zipCode}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <PublicOutlined sx={{ color: 'var(--primary)' }} />
                                        <Typography>{order.shippingAddress.country}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Tooltip title="Order placed on">
                                        <Typography variant="caption" sx={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarTodayOutlined fontSize="small" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                            </StyledPaper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 6,
                            bgcolor: 'var(--card-bg)',
                            borderRadius: 2,
                            border: '1px dashed var(--border)'
                        }}>
                            <LocationOffOutlined sx={{ fontSize: 60, color: 'var(--muted)', mb: 2 }} />
                            <Typography sx={{ color: "var(--muted)", fontWeight: 500, mb: 1 }}>
                                No addresses found
                            </Typography>
                            <Typography variant="body2" sx={{ color: "var(--muted)" }}>
                                Complete an order to save your shipping address
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </StyledCard>
    );

}