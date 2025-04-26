"use client"
import {
    Chip,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {TbEdit, TbEye} from "react-icons/tb";
import OrderAction from "./OrderAction";
import {toast} from "react-toastify";
import {Box, Typography} from "@mui/material";

interface OrderItem {
    productId: string;
    quantity: number;
    total: number;
    price: number;
}

interface ApiOrder {
    _id: string;
    userId: string;
    orderCode: string;
    contactInfo: {
        firstName: string;
        lastName: string;
    };
    shippingAddress: {
        street: string;
        city: string;
    };
    items: OrderItem[];
    date: string;
    status: string;
}

interface FormattedOrder {
    _id: string;
    orderCode: string;
    userId: string;
    customerName: string;
    contact: string;
    totalAmount: number;
    date: string;
    status: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = React.useState<FormattedOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = React.useState<FormattedOrder | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/ordersAllAddress?userId=*');
                const data: ApiOrder[] = await response.json();
                const formattedOrders: FormattedOrder[] = data.map(order => ({
                    _id: order._id,
                    userId: order.userId,
                    orderCode: order.orderCode,
                    customerName: `${order.contactInfo.firstName} ${order.contactInfo.lastName}`,
                    contact: `${order.shippingAddress.street}, ${order.shippingAddress.city}`,
                    totalAmount: order.items.reduce((sum, item) => sum + item.total, 0),
                    date: new Date(order.date).toLocaleDateString(),
                    status: order.status
                }));
                setOrders(formattedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleActionClick = (order: FormattedOrder) => {
        setSelectedOrder(order);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/ordersAllAddress?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: newStatus}),
            });

            if (response.ok) {
                // Update the local state
                setOrders(orders.map(order =>
                    order._id === orderId ? {...order, status: newStatus} : order
                ));
                toast.success('Order status updated successfully');
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    const getStatusColor = (status: string): { bg: string, text: string } => {
        if (!status) {
            return {bg: '#ffebee', text: '#c62828'}; 
        }

        switch (status.toLowerCase()) {
            case 'delivered':
                return {bg: '#d8f3dc', text: '#2d6a4f'};
            case 'processing':
                return {bg: '#caf0f8', text: '#0077b6'};
            case 'shipped':
                return {bg: '#ede7f6', text: '#5e35b1'};
            case 'pending':
                return {bg: '#fff3e0', text: '#e65100'};
            default:
                return {bg: '#ffebee', text: '#c62828'};
        }
    };

    const handleView = (id: string) => {
        router.push(`/admin/orders/view/${id}`);
    }

    return (
        <>
            <TableContainer 
                component={Paper} 
                sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--background)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
            >
                <Table sx={{minWidth: 650}} aria-label="orders table">
                    <TableHead>
                        <TableRow sx={{ 
                            backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                            '& th': {
                                borderBottom: '2px solid rgba(var(--primary-rgb), 0.2)'
                            }
                        }}>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Order Code</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Customer Name</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Contact</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Total Amount</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Date</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Status</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow 
                                key={order.orderCode}
                                sx={{ 
                                    '&:nth-of-type(odd)': { 
                                        backgroundColor: 'rgba(var(--primary-rgb), 0.02)' 
                                    },
                                    '&:hover': { 
                                        backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                        transition: 'background-color 0.2s ease'
                                    },
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <TableCell sx={{ 
                                    fontWeight: 600, 
                                    color: 'var(--primary)',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    {order.orderCode}
                                </TableCell>
                                <TableCell sx={{ 
                                    color: 'var(--foreground)',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    {order.customerName}
                                </TableCell>
                                <TableCell sx={{ 
                                    color: 'var(--foreground)',
                                    fontSize: '0.875rem',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    {order.contact}
                                </TableCell>
                                <TableCell sx={{ 
                                    fontWeight: 600, 
                                    color: 'var(--secondary)',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    ${order.totalAmount.toFixed(2)}
                                </TableCell>
                                <TableCell sx={{ 
                                    color: 'var(--foreground)',
                                    fontSize: '0.875rem',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    {order.date}
                                </TableCell>
                                <TableCell sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(order.status).bg,
                                            color: getStatusColor(order.status).text,
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            px: 1,
                                            borderRadius: '6px',
                                            height: '24px',
                                            '& .MuiChip-label': {
                                                px: 1,
                                            },
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="View details" arrow placement="top">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleView(order.userId)}
                                                sx={{
                                                    color: 'var(--primary)',
                                                    backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                                    width: '32px',
                                                    height: '32px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--primary)',
                                                        color: 'var(--text-on-image)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 8px rgba(var(--primary-rgb), 0.3)'
                                                    },
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <TbEye size={18}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Order Action" arrow placement="top">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleActionClick(order)}
                                                sx={{
                                                    color: 'var(--secondary)',
                                                    backgroundColor: 'rgba(var(--secondary-rgb), 0.1)',
                                                    width: '32px',
                                                    height: '32px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--secondary)',
                                                        color: 'var(--text-on-image)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 8px rgba(var(--secondary-rgb), 0.3)'
                                                    },
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <TbEdit size={18}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        gap: 2,
                                        color: 'var(--foreground)',
                                        opacity: 0.7
                                    }}>
                                        <Box component="img" src="/empty-orders.svg" alt="No orders" sx={{ width: 120, height: 120 }} />
                                        <Typography variant="h6">No orders found</Typography>
                                        <Typography variant="body2">Orders will appear here once customers place them</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedOrder && (
                <OrderAction
                    open={!!selectedOrder}
                    onClose={handleCloseDialog}
                    orderId={selectedOrder._id}
                    currentStatus={selectedOrder.status}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    )
}

export default OrderList