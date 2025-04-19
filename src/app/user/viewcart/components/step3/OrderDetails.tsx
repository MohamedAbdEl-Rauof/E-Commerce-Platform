import React from 'react';
import {Box, Grid, Skeleton, Typography} from '@mui/material';

interface OrderDetailsProps {
    order: {
        orderCode: string;
        createdAt: string;
        shoppingandTotal: {
            Total: string;
        };
        paymentMethod: {
            method: string;
        };
    } | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {
    const details = [
        {label: 'Order Code:', value: order?.orderCode ?? 'Loading...'},
        {label: 'Date:', value: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Loading...'},
        {label: 'Total:', value: order?.shoppingandTotal?.Total ?? 'Loading...'},
        {label: 'Payment Method:', value: order?.paymentMethod?.method ?? 'Loading...'},
    ];

    return (
        <Box sx={{mt: 4, mb: 4}}>
            <Grid container spacing={2}>
                {details.map((detail, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle1" fontWeight="bold" color="var(--foreground)" textAlign="right">
                                {detail.label}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            {order ? (
                                <Typography variant="subtitle1" color="var(--foreground)"  textAlign="left">
                                    {detail.value}
                                </Typography>
                            ) : (
                                <Skeleton variant="text" width={100}/>
                            )}
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default OrderDetails;