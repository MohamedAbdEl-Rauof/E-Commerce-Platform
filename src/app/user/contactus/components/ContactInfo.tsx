import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import {FaRegAddressCard} from "react-icons/fa6";
import {CiPhone} from "react-icons/ci";
import {MdOutlineEmail} from "react-icons/md";
import {useTheme} from 'next-themes';

const ContactInfo = () => {
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    const contactItems = [
        {icon: <FaRegAddressCard/>, title: "ADDRESS", content: "234 Arish Haram, Giza, Egypt"},
        {icon: <CiPhone/>, title: "Contact Us", content: "+20 15 538 59825"},
        {icon: <MdOutlineEmail/>, title: "Email", content: "mohamedabdelrauof112@gmail.com"},
    ];

    return (
        <Box sx={{mt: 10, width: '100%'}}>
            <Grid container spacing={4} justifyContent="center">
                {contactItems.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                bgcolor: 'var(--background)',
                                color: 'var(--foreground)',
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                border: '1px solid var(--border)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 20px var(--shadow)',
                                    borderColor: 'var(--primary)',
                                }
                            }}
                        >
                            <Box sx={{
                                fontSize: '3rem', 
                                color: 'var(--primary)', 
                                mb: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                }
                            }}>
                                {item.icon}
                            </Box>
                            <Typography 
                                variant="h6" 
                                component="h2" 
                                gutterBottom 
                                color="inherit"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                color="inherit" 
                                sx={{
                                    opacity: 0.8,
                                    fontWeight: 400
                                }}
                            >
                                {item.content}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ContactInfo;