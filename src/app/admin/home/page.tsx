'use client';

import React from 'react';
import {Box, Grid, LinearProgress, Paper, Stack, Typography} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function Home() {
    // Sample data for dashboard stats
    const stats = [
        {
            title: 'Total Orders',
            value: '1,254',
            icon: <ShoppingCartIcon sx={{fontSize: 40}} color="primary"/>,
            color: '#4361ee',
            change: '+12%',
            trend: 'up'
        },
        {
            title: 'Total Users',
            value: '3,782',
            icon: <PeopleIcon sx={{fontSize: 40}} color="secondary"/>,
            color: '#3a0ca3',
            change: '+8%',
            trend: 'up'
        },
        {
            title: 'Products',
            value: '854',
            icon: <InventoryIcon sx={{fontSize: 40}} style={{color: '#4cc9f0'}}/>,
            color: '#4cc9f0',
            change: '+5%',
            trend: 'up'
        },
        {
            title: 'Revenue',
            value: '$24,583',
            icon: <AttachMoneyIcon sx={{fontSize: 40}} style={{color: '#4d908e'}}/>,
            color: '#4d908e',
            change: '-3%',
            trend: 'down'
        },
    ];

    // Sample data for top selling products
    const topProducts = [
        {name: 'Wireless Headphones', sales: 342, stock: 120, progress: 75},
        {name: 'Smart Watch', sales: 276, stock: 45, progress: 60},
        {name: 'Laptop Sleeve', sales: 213, stock: 32, progress: 45},
        {name: 'Bluetooth Speaker', sales: 198, stock: 65, progress: 40},
        {name: 'Phone Case', sales: 187, stock: 89, progress: 35},
    ];

    // Sample data for recent orders
    const recentOrders = [
        {id: '#ORD-7895', customer: 'John Doe', date: '2023-06-12', status: 'Delivered', amount: '$125.99'},
        {id: '#ORD-7894', customer: 'Jane Smith', date: '2023-06-11', status: 'Processing', amount: '$89.50'},
        {id: '#ORD-7893', customer: 'Robert Johnson', date: '2023-06-10', status: 'Shipped', amount: '$245.75'},
        {id: '#ORD-7892', customer: 'Emily Davis', date: '2023-06-09', status: 'Delivered', amount: '$54.25'},
        {id: '#ORD-7891', customer: 'Michael Brown', date: '2023-06-08', status: 'Cancelled', amount: '$178.00'},
    ];

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Dashboard Overview
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{mb: 4}}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h4" sx={{my: 1, fontWeight: 'bold'}}>
                                        {stat.value}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        {stat.trend === 'up' ? (
                                            <TrendingUpIcon fontSize="small" sx={{color: 'success.main'}}/>
                                        ) : (
                                            <TrendingDownIcon fontSize="small" sx={{color: 'error.main'}}/>
                                        )}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: stat.trend === 'up' ? 'success.main' : 'error.main',
                                                fontWeight: 'medium'
                                            }}
                                        >
                                            {stat.change}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            since last month
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: `${stat.color}15`,
                                        p: 1.5,
                                        borderRadius: 2
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Main Content Area */}
            <Grid container spacing={3}>
                {/* Top Selling Products */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{p: 3, borderRadius: 2, height: '100%'}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                            Top Selling Products
                        </Typography>
                        <Box>
                            {topProducts.map((product, index) => (
                                <Box key={index} sx={{mb: 2}}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center"
                                           sx={{mb: 1}}>
                                        <Typography variant="body1" fontWeight="medium">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.sales} sales
                                        </Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={product.progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 5,
                                            backgroundColor: '#e9ecef',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: index % 2 === 0 ? '#4361ee' : '#4cc9f0'
                                            }
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary"
                                                sx={{mt: 0.5, display: 'block'}}>
                                        {product.stock} items in stock
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{p: 3, borderRadius: 2, height: '100%'}}>
                        <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                            Recent Orders
                        </Typography>
                        <Box sx={{overflowX: 'auto'}}>
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                <tr style={{borderBottom: '1px solid #e0e0e0'}}>
                                    <th style={{textAlign: 'left', padding: '12px 8px', color: '#637381'}}>Order ID</th>
                                    <th style={{textAlign: 'left', padding: '12px 8px', color: '#637381'}}>Customer</th>
                                    <th style={{textAlign: 'left', padding: '12px 8px', color: '#637381'}}>Date</th>
                                    <th style={{textAlign: 'left', padding: '12px 8px', color: '#637381'}}>Status</th>
                                    <th style={{textAlign: 'right', padding: '12px 8px', color: '#637381'}}>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentOrders.map((order, index) => (
                                    <tr key={index} style={{borderBottom: '1px solid #f5f5f5'}}>
                                        <td style={{padding: '12px 8px'}}>{order.id}</td>
                                        <td style={{padding: '12px 8px'}}>{order.customer}</td>
                                        <td style={{padding: '12px 8px'}}>{order.date}</td>
                                        <td style={{padding: '12px 8px'}}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'medium',
                                                    backgroundColor:
                                                        order.status === 'Delivered' ? '#d8f3dc' :
                                                            order.status === 'Processing' ? '#caf0f8' :
                                                                order.status === 'Shipped' ? '#ede7f6' :
                                                                    '#ffebee',
                                                    color:
                                                        order.status === 'Delivered' ? '#2d6a4f' :
                                                            order.status === 'Processing' ? '#0077b6' :
                                                                order.status === 'Shipped' ? '#5e35b1' :
                                                                    '#c62828'
                                                }}
                                            >
                                                {order.status}
                                            </Box>
                                        </td>
                                        <td style={{padding: '12px 8px', textAlign: 'right'}}>{order.amount}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}