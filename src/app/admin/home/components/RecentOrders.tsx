import React from 'react';
import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface Order {
    _id: string;
    orderCode: string;
    date: string;
    status: string;
    total: number;
    items?: Array<{ productId: string; quantity: number; total: number }>;
}

interface RecentOrdersProps {
    orders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
    const getStatusInfo = (status: string) => {
        switch (status.toLowerCase()) {
            case 'shipped':
                return {
                    color: 'var(--success)',
                    bgColor: 'var(--success)',
                    icon: <LocalShippingIcon fontSize="small" />
                };
            case 'completed':
                return {
                    color: 'var(--accent)',
                    bgColor: 'var(--accent)',
                    icon: <CheckCircleIcon fontSize="small" />
                };
            case 'cancelled':
                return {
                    color: 'var(--danger)',
                    bgColor: 'var(--danger)',
                    icon: <CancelIcon fontSize="small" />
                };
            case 'pending':
                return {
                    color: 'var(--warning)',
                    bgColor: 'var(--warning)',
                    icon: <PendingIcon fontSize="small" />
                };
            default:
                return {
                    color: 'var(--warning)',
                    bgColor: 'var(--warning)',
                    icon: <PendingIcon fontSize="small" />
                };
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: 'var(--light)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px var(--shadow)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'var(--foreground)',
                    mb: 2,
                    pb: 1,
                    borderBottom: '1px solid var(--border)'
                }}
            >
                Recent Orders
            </Typography>
            <TableContainer sx={{ flexGrow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'var(--muted)', fontWeight: 'bold' }}>Order ID</TableCell>
                            <TableCell sx={{ color: 'var(--muted)', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: 'var(--muted)', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell align="right" sx={{ color: 'var(--muted)', fontWeight: 'bold' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                const { color, bgColor, icon } = getStatusInfo(order.status);
                                return (
                                    <TableRow
                                        key={order._id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'var(--hover)'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ color: 'var(--foreground)' }}>
                                            {order.orderCode}
                                        </TableCell>
                                        <TableCell sx={{ color: 'var(--foreground)' }}>
                                            {order.date}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={icon}
                                                label={order.status}
                                                size="small"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    backgroundColor: `${bgColor}15`,
                                                    color: color,
                                                    fontWeight: 'medium',
                                                    border: `1px solid ${bgColor}30`
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            color: 'var(--foreground)',
                                            fontWeight: 'bold'
                                        }}>
                                            ${order.items ?
                                                order.items.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2) :
                                                order.total.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'var(--muted)' }}>
                                    No recent orders found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RecentOrders;