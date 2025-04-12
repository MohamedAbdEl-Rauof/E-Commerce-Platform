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
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold text-lg">Order Code</TableCell>
                            <TableCell className="font-bold text-lg">Customer Name</TableCell>
                            <TableCell className="font-bold text-lg">Contact</TableCell>
                            <TableCell className="font-bold text-lg">Total Amount</TableCell>
                            <TableCell className="font-bold text-lg">Date</TableCell>
                            <TableCell className="font-bold text-lg">Status</TableCell>
                            <TableCell className="font-bold text-lg">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderCode}>
                                <TableCell>{order.orderCode}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.contact}</TableCell>
                                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(order.status).bg,
                                            color: getStatusColor(order.status).text,
                                            fontWeight: 'medium',
                                            fontSize: '0.75rem',
                                            px: 1,
                                            '& .MuiChip-label': {
                                                px: 0.5,
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="View details">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleView(order.userId)}
                                                sx={{
                                                    color: 'var(--info)',
                                                    '&:hover': {bgcolor: 'var(--info-light)'}
                                                }}
                                            >
                                                <TbEye/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Order Action">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleActionClick(order)}
                                                sx={{
                                                    color: 'var(--warning)',
                                                    '&:hover': {bgcolor: 'var(--warning-light)'}
                                                }}
                                            >
                                                <TbEdit/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
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