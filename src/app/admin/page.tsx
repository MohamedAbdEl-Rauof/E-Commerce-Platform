'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/home');
    }, [router]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Typography variant="h6">Loading Admin Dashboard...</Typography>
            <CircularProgress/>
        </Box>
    );
}