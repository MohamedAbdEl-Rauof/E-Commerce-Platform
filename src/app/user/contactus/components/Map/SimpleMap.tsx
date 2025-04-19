import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {FaExpand, FaLayerGroup, FaLocationDot} from 'react-icons/fa6';
import {useTheme} from 'next-themes';

const SimpleMap = () => {
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <Box position="relative" height={400} width="100%" borderRadius={2} boxShadow={3} overflow="hidden">
            {/* Map Background */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: isDarkTheme
                        ? 'linear-gradient(to bottom right, #1A1D1F, #2C3E50)'
                        : 'linear-gradient(to bottom right, #E8EAED, #D1D5DB)', // Improved light mode gradient
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
                            linear-gradient(to right, ${isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px)
                        `, // Improved grid contrast for light mode
                        backgroundSize: '40px 40px',
                    },
                }}
            />

            {/* Location Marker */}
            <Box
                position="absolute"
                left="50%"
                top="50%"
                sx={{
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--primary)',
                    fontSize: '1.875rem',
                    cursor: 'pointer',
                    '&:hover::after': {
                        content: '"3legant Store"',
                        position: 'absolute',
                        top: '-30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: isDarkTheme ? 'var(--dark)' : 'white',
                        color: isDarkTheme ? 'var(--foreground)' : 'var(--dark)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        boxShadow: 'var(--shadow)',
                    },
                }}
            >
                <FaLocationDot/>
            </Box>

            {/* Map Controls */}
            <Box position="absolute" top={16} right={16} 
                 bgcolor={isDarkTheme ? 'var(--dark)' : 'white'}
                 borderRadius={2} boxShadow={1}>
                <IconButton size="small" sx={{color: 'var(--primary)'}}>+</IconButton>
                <IconButton size="small" sx={{color: 'var(--primary)'}}>−</IconButton>
            </Box>

            <Box position="absolute" top={16} left={16} 
                 bgcolor={isDarkTheme ? 'var(--dark)' : 'white'}
                 borderRadius="50%" boxShadow={1}>
                <IconButton size="small" sx={{color: 'var(--primary)'}}><FaLayerGroup/></IconButton>
            </Box>

            <Box position="absolute" bottom={16} right={16} 
                 bgcolor={isDarkTheme ? 'var(--dark)' : 'white'}
                 borderRadius="50%" boxShadow={1}>
                <IconButton size="small" sx={{color: 'var(--primary)'}}><FaExpand/></IconButton>
            </Box>

            <Box position="absolute" bottom={8} left={8}>
                <Typography variant="caption" sx={{
                    color: isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                    backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                }}>
                    © OpenStreetMap contributors
                </Typography>
            </Box>
        </Box>
    );
};

export default SimpleMap;