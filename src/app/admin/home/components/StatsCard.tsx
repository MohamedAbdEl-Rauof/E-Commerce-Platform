import React from 'react';
import {Box, Grid, Paper, Stack, Typography} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatProps> = ({title, value, icon, color, change, trend}) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
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
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{my: 1, fontWeight: 'bold'}}>
                            {value}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            {trend === 'up' ? (
                                <TrendingUpIcon fontSize="small" sx={{color: 'success.main'}}/>
                            ) : (
                                <TrendingDownIcon fontSize="small" sx={{color: 'error.main'}}/>
                            )}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: trend === 'up' ? 'success.main' : 'error.main',
                                    fontWeight: 'medium'
                                }}
                            >
                                {change}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                since last month
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: `${color}15`,
                            p: 1.5,
                            borderRadius: 2
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </Paper>
        </Grid>
    );
};

export default StatsCard;