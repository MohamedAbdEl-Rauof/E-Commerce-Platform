import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';

interface Order {
    _id: string;
    orderCode: string;
    date: string;
    status: string;
    total: number;
}

interface RecentOrdersProps {
    orders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({orders}) => {
    return (
        <Paper elevation={3} sx={{p: 2}}>
            <Typography variant="h6" gutterBottom>
                Recent Orders
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.orderCode}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                  <span style={{
                                      textTransform: 'capitalize',
                                      color: order.status === 'shipped' ? 'green' : 'orange'
                                  }}>
                                    {order.status}
                                  </span>
                                </TableCell>
                                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RecentOrders;