import React, {useEffect, useState} from 'react';
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

const ViewOrder: React.FC<Props> = ({userId}) => {
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
        return <CircularProgress/>;
    }

    if (!order) {
        return <Typography>No order found</Typography>;
    }

    return (
        <Box sx={{p: 3}}>
            <Paper elevation={3} sx={{p: 3, width: '100%'}}>
                <Typography variant="h4" gutterBottom>Order Summary</Typography>
                <Divider sx={{my: 2}}/>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Order Code" value={order.orderCode}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Date" value={new Date(order.date).toLocaleDateString()}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Status" value={order.status}/>
                    </Grid>

                    <SectionHeader title="Customer Information"/>

                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Name" value={`${order.contactInfo.firstName} ${order.contactInfo.lastName}`}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Email" value={order.contactInfo.email}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Phone" value={order.contactInfo.phone}/>
                    </Grid>

                    <SectionHeader title="Shipping Address"/>

                    <Grid item xs={12}>
                        <InfoItem
                            label="Address"
                            value={`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}
                        />
                    </Grid>

                    <SectionHeader title="Items Ordered"/>

                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.productId}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                            <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <SectionHeader title="Payment Information"/>

                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Payment Method" value={order.paymentMethod.method}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoItem label="Card Number"
                                  value={`**** **** **** ${order.paymentMethod.cardNumber.slice(-4)}`}/>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

const InfoItem: React.FC<{ label: string, value: string }> = ({label, value}) => (
    <Box>
        <Typography variant="subtitle2">{label}:</Typography>
        <Typography variant="body1" sx={{
            background: "var(--primary-light)",
            p: 1,
            borderRadius: 1,
            fontWeight: "bold"
        }}>
            {value}
        </Typography>
    </Box>
);

const SectionHeader: React.FC<{ title: string }> = ({title}) => (
    <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{mt: 2}}>{title}</Typography>
        <Divider sx={{mb: 2}}/>
    </Grid>
);

export default ViewOrder;