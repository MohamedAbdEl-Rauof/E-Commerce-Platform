import React, { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

interface Props {
    userId: string;
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
        cardNumber: string;
        expirationDate: string;
        cvc: string;
    };
    items: Array<{
        productId: string;
        quantity: number;
        total: number;
        price: number;
    }>;
    date: string;
    orderCode: string;
    status: string;
}

const ViewOrder: React.FC<Props> = ({ userId }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/ordersAllAddress?userId=${userId}`);
                const data = await response.json();
                console.log('Fetched order:', data);
                if (data && data.length > 0) {
                    setOrder(data[0]);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [userId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!order) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box component="img" src="/no-data.svg" alt="No order" sx={{ width: 150, height: 150, opacity: 0.7 }} />
                <Typography variant="h6" color="var(--muted)">No order found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 4 },
                    width: '100%',
                    borderRadius: '16px',
                    backgroundColor: 'var(--background)',
                    border: '1px solid rgba(var(--primary-rgb), 0.1)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: 'var(--foreground)',
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                    >
                        Order Summary
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                            color: 'var(--primary)',
                            py: 0.75,
                            px: 2,
                            borderRadius: '20px',
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}
                    >
                        {order.status}
                    </Box>
                </Box>

                <Divider sx={{
                    my: 3,
                    borderColor: 'var(--foreground)'
                }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <InfoItem label="Order Code" value={order.orderCode} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <InfoItem label="Date" value={new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <InfoItem label="User ID" value={order.userId} />
                    </Grid>

                    <SectionHeader title="Customer Information" icon="👤" />

                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Name" value={`${order.contactInfo.firstName} ${order.contactInfo.lastName}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Email" value={order.contactInfo.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Phone" value={order.contactInfo.phone} />
                    </Grid>

                    <SectionHeader title="Shipping Address" icon="📍" />

                    <Grid item xs={12}>
                        <InfoItem
                            label="Address"
                            value={`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}
                        />
                    </Grid>

                    <SectionHeader title="Items Ordered" icon="📦" />

                    <Grid item xs={12}>
                        <TableContainer sx={{
                            borderRadius: '12px',
                            border: '1px solid rgba(var(--primary-rgb), 0.1)',
                            overflow: 'hidden',
                            mb: 2
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}>
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: 'var(--foreground)',
                                            py: 2
                                        }}>
                                            Product ID
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 600,
                                            color: 'var(--foreground)',
                                            py: 2
                                        }}>
                                            Quantity
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 600,
                                            color: 'var(--foreground)',
                                            py: 2
                                        }}>
                                            Price
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 600,
                                            color: 'var(--foreground)',
                                            py: 2
                                        }}>
                                            Total
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: 'rgba(var(--primary-rgb), 0.02)'
                                                },
                                                '&:last-child td, &:last-child th': {
                                                    borderBottom: 0
                                                }
                                            }}
                                        >
                                            <TableCell sx={{
                                                color: 'var(--primary)',
                                                fontWeight: 500,
                                                borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)'
                                            }}>
                                                {item.productId}
                                            </TableCell>
                                            <TableCell align="right" sx={{
                                                borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)'
                                            }}>
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell align="right" sx={{
                                                borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)'
                                            }}>
                                                ${item.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right" sx={{
                                                fontWeight: 600,
                                                color: 'var(--secondary)',
                                                borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)'
                                            }}>
                                                ${item.total.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow sx={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}>
                                        <TableCell colSpan={3} align="right" sx={{ fontWeight: 700 }}>
                                            Order Total:
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 700,
                                            color: 'var(--primary)',
                                            fontSize: '1.1rem'
                                        }}>
                                            ${order.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <SectionHeader title="Payment Information" icon="💳" />

                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Payment Method" value={order.paymentMethod.method} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Card Number"
                            value={`**** **** **** ${order.paymentMethod.cardNumber.slice(-4)}`}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

const InfoItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
            variant="subtitle2"
            sx={{
                color: 'var(--muted)',
                fontWeight: 500,
                fontSize: '0.875rem'
            }}
        >
            {label}:
        </Typography>
        <Typography
            variant="body1"
            sx={{
                background: 'rgba(var(--primary-rgb), 0.08)',
                p: 1.5,
                borderRadius: '8px',
                fontWeight: 500,
                color: 'var(--foreground)',
                border: '1px solid rgba(var(--primary-rgb), 0.1)',
                fontSize: '0.95rem',
                wordBreak: 'break-word'
            }}
        >
            {value}
        </Typography>
    </Box>
);

const SectionHeader: React.FC<{ title: string, icon?: string }> = ({ title, icon }) => (
    <Grid item xs={12}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: 3,
            mb: 1
        }}>
            {icon && (
                <Box sx={{
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </Box>
            )}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '2px'
                    }
                }}
            >
                {title}
            </Typography>
        </Box>
        <Divider sx={{
            mb: 3,
            mt: 3,
            borderColor: 'var(--foreground)'
        }} />
    </Grid>
);

export default ViewOrder;