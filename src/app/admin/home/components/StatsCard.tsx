import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger';
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatProps> = ({ title, value, icon, color, change, trend }) => {
    // Map color to CSS variable
    const colorVar = `var(--${color})`;

    // Get trend color
    const getTrendColor = () => {
        if (trend === 'up') return 'var(--success)';
        if (trend === 'down') return 'var(--danger)';
        return 'var(--muted)';
    };

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'var(--light)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 6px var(--shadow)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px var(--shadow)'
                    }
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="subtitle2" color="var(--muted)">
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ my: 1, fontWeight: 'bold', color: 'var(--foreground)' }}>
                            {value}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            {trend === 'up' ? (
                                <TrendingUpIcon fontSize="small" sx={{ color: 'var(--success)' }} />
                            ) : trend === 'down' ? (
                                <TrendingDownIcon fontSize="small" sx={{ color: 'var(--danger)' }} />
                            ) : null}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: getTrendColor(),
                                    fontWeight: 'medium'
                                }}
                            >
                                {change}
                            </Typography>
                            <Typography variant="body2" color="var(--muted)">
                                since last month
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colorVar,
                                opacity: 0.15,
                                zIndex: 0
                            },
                            '& svg': {
                                position: 'relative',
                                zIndex: 1,
                                color: colorVar,
                                fontSize: 24
                            }
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