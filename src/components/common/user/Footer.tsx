"use client";
import React from "react";
import { Typography, Grid, Box, Link as MuiLink, Divider, IconButton, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GitHub, LinkedIn, Facebook } from "@mui/icons-material";
import Link from "next/link";

const StyledFooter = styled('footer')(({ theme }) => ({
    width: '100%',
    padding: 0,
    backgroundColor: 'var(--dark)',
    color: 'var(--light)',
}));

const FooterContent = styled(Container)(({ theme }) => ({
    width: '100vw',
    maxWidth: 'none',
    padding: theme.spacing(10, 3, 8),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(10, 8, 8),
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10, 12, 8),
    },
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
    color: 'var(--light)',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
        color: 'var(--focus)',
    },
}));

const Footer = () => {
    return (
        <StyledFooter>
            <FooterContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" flexDirection="column" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                            <Typography variant="h4" component="h1" sx={{ color: 'var(--light)' }}>3𝓵𝓮𝓰𝓪𝓷𝓽</Typography>
                            <Typography variant="body1" sx={{ mt: 1, color: 'var(--muted)' }}>Gift & Decoration Store</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} gap={4}>
                            <Link href="/user" passHref legacyBehavior>
                                <FooterLink>Home</FooterLink>
                            </Link>
                            <Link href="/user/shop" passHref legacyBehavior>
                                <FooterLink>Shop</FooterLink>
                            </Link>
                            <Link href="/user/categories" passHref legacyBehavior>
                                <FooterLink>Categories</FooterLink>
                            </Link>
                            <Link href="/user/contactus" passHref legacyBehavior>
                                <FooterLink>Contact Us</FooterLink>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'var(--border)' }} />

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" align="center" sx={{ textAlign: { sm: 'left' }, color: 'var(--muted)' }}>
                            Copyright © 2025 3legant. All rights reserved
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} gap={2}>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Use</FooterLink>
                        </Box>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" mt={4}>
                    <IconButton href="https://github.com/MohamedAbdEl-Rauof" target="_blank" sx={{ color: 'var(--light)' }}>
                        <GitHub />
                    </IconButton>
                    <IconButton href="https://linkedin.com/in/mohamed-abd-el-raouf-6b5b3b235" target="_blank" sx={{ color: 'var(--light)' }}>
                        <LinkedIn />
                    </IconButton>
                    <IconButton href="https://www.facebook.com/p/mohamed-abd-el-raouf-100040578035349/" target="_blank" sx={{ color: 'var(--light)' }}>
                        <Facebook />
                    </IconButton>
                </Box>
            </FooterContent>
        </StyledFooter>
    );
};

export default Footer;