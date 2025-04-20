'use client';

import React, { useMemo } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StatsCard from './components/StatsCard';
import TopSellingProducts from './components/TopSellingProducts';
import RecentOrders from './components/RecentOrders';
import { format, isValid, parseISO } from 'date-fns';
import { useQueries } from 'react-query';

interface Stat {
    title: string;
    value: string;
    icon: JSX.Element;
    color: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

interface Product {
    name: string;
    price: number;
    createdAt: string;
}

interface Order {
    _id: string;
    orderCode: string;
    date: string;
    status: string;
    amount: string;
    items: Array<{ productId: string; quantity: number; total: number }>;
    total: number;
}

interface User {
    id: string;
    name: string;
    email: string;
}

const initialStats: Stat[] = [
    {
        title: 'Total Orders',
        value: '0',
        icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
        color: 'primary',
        change: 'N/A',
        trend: 'neutral'
    },
    {
        title: 'Total Users',
        value: '0',
        icon: <PeopleIcon sx={{ fontSize: 40 }} />,
        color: 'secondary',
        change: 'N/A',
        trend: 'neutral'
    },
    {
        title: 'Products',
        value: '0',
        icon: <InventoryIcon sx={{ fontSize: 40 }} />,
        color: 'info',
        change: 'N/A',
        trend: 'neutral'
    },
    {
        title: 'Revenue',
        value: '$0',
        icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
        color: 'success',
        change: 'N/A',
        trend: 'neutral'
    },
];

const fetchData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

const calculateChange = (current: number, previous: number): {
    changeText: string;
    trend: 'up' | 'down';
} => {
    if (previous === 0) return { changeText: 'N/A', trend: 'up' };
    const percentChange = ((current - previous) / previous) * 100;
    const trend = current >= previous ? 'up' : 'down';
    return { changeText: `${percentChange.toFixed(2)}%`, trend };
};

const processProducts = (products: Product[]) => {
    return products
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(product => ({
            name: product.name,
            sales: Math.floor(product.price / 10),
            stock: Math.floor(Math.random() * 100) + 20,
            progress: Math.min(Math.floor((Math.floor(product.price / 10) / (Math.floor(product.price / 10) + Math.floor(Math.random() * 100) + 20)) * 100), 100)
        }));
};

const safeFormatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
};

const safeParseAmount = (amount: string | undefined): number => {
    if (!amount) return 0;
    const cleanAmount = amount.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanAmount) || 0;
};

export default function Home() {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const currentMonthStart = now.toISOString().slice(0, 7) + '-01';
    const lastMonthStart = lastMonth.toISOString().slice(0, 7) + '-01';

    const queries = useQueries([
        {
            queryKey: ['currentMonthOrders', currentMonthStart],
            queryFn: () => fetchData<Order[]>(`/api/ordersAllAddress?userId=*&startDate=${currentMonthStart}`),
            refetchInterval: 5 * 60 * 1000
        },
        {
            queryKey: ['lastMonthOrders', lastMonthStart, currentMonthStart],
            queryFn: () => fetchData<Order[]>(`/api/ordersAllAddress?userId=*&startDate=${lastMonthStart}&endDate=${currentMonthStart}`),
            refetchInterval: 5 * 60 * 1000
        },
        {
            queryKey: ['users'],
            queryFn: () => fetchData<User[]>('/api/user'),
            refetchInterval: 5 * 60 * 1000
        },
        {
            queryKey: ['products'],
            queryFn: () => fetchData<Product[]>('/api/products'),
            refetchInterval: 5 * 60 * 1000
        }
    ]);

    const [currentMonthOrdersQuery, lastMonthOrdersQuery, usersQuery, productsQuery] = queries;

    const stats = useMemo(() => {
        if (currentMonthOrdersQuery.data && lastMonthOrdersQuery.data && usersQuery.data && productsQuery.data) {
            const currentMonthOrders = currentMonthOrdersQuery.data;
            const lastMonthOrders = lastMonthOrdersQuery.data;
            const users = usersQuery.data;
            const products = productsQuery.data;

            const currentMonthRevenue = currentMonthOrders.reduce((total, order) => total + safeParseAmount(order.amount), 0);
            const lastMonthRevenue = lastMonthOrders.reduce((total, order) => total + safeParseAmount(order.amount), 0);

            return [
                {
                    ...initialStats[0],
                    value: currentMonthOrders.length.toString(),
                    ...calculateChange(currentMonthOrders.length, lastMonthOrders.length)
                },
                {
                    ...initialStats[1],
                    value: users.length.toString(),
                    ...calculateChange(users.length, parseInt(initialStats[1].value))
                },
                {
                    ...initialStats[2],
                    value: products.length.toString(),
                    ...calculateChange(products.length, parseInt(initialStats[2].value))
                },
                {
                    ...initialStats[3],
                    value: `$${currentMonthRevenue.toFixed(2)}`,
                    ...calculateChange(currentMonthRevenue, lastMonthRevenue)
                }
            ];
        }
        return initialStats;
    }, [currentMonthOrdersQuery.data, lastMonthOrdersQuery.data, usersQuery.data, productsQuery.data]);

    const topProducts = useMemo(() => {
        return productsQuery.data ? processProducts(productsQuery.data) : [];
    }, [productsQuery.data]);

    const recentOrders = useMemo(() => {
        return currentMonthOrdersQuery.data
            ? currentMonthOrdersQuery.data.slice(0, 5).map(order => ({
                ...order,
                date: safeFormatDate(order.date),
                total: safeParseAmount(order.amount)
            }))
            : [];
    }, [currentMonthOrdersQuery.data]);

    const memoizedStatsCards = useMemo(() => (
        stats.map((stat, index) => (
            <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                change={stat.change}
                trend={stat.trend}
            />
        ))
    ), [stats]);

    if (queries.some((query) => query.isLoading)) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (queries.some((query) => query.isError)) {
        return <div>Error loading data</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' , color:'var(--foreground)' }}>Dashboard Overview</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {memoizedStatsCards}
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TopSellingProducts products={topProducts} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RecentOrders orders={recentOrders} />
                </Grid>
            </Grid>
        </Box>
    );
}
