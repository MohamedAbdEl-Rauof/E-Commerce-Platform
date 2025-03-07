"use client";
import {Suspense} from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import {Box, Breadcrumbs, Container, Grid, Typography} from '@mui/material';
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import AboutSection from "./AboutSection";

const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <Box height={400} width="100%" display="flex" alignItems="center" justifyContent="center"
             bgcolor="var(--background)">
            Loading Map...
        </Box>
    )
});

const ContactUs = () => {


    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: '1770px',
                mx: 'auto',
                px: {xs: 2, sm: 3, md: 4},
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                    mt: {xs: 3, md: 7},
                    fontWeight: 'bold',
                    color: 'var(--foreground)',
                    fontSize: {xs: '1rem', md: '1.25rem'},
                    '& .MuiTypography-root': {
                        color: 'var(--foreground)',
                    },
                }}
            >
                <Link href="/user/home" passHref>
                    <Typography>Home</Typography>
                </Link>
                <Typography>Contact Us</Typography>
            </Breadcrumbs>

            <Box mt={{xs: 5, md: 7}} maxWidth={{md: '70%'}}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="var(--foreground)">
                    We believe in sustainable decor. We&#39;re passionate about life at home.
                </Typography>
                <Typography variant="body1" color="var(--foreground)" sx={{opacity: 0.7}}>
                    Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic
                    design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to
                    last for generations, faithful to the shapes of each period, with a touch of the present.
                </Typography>
            </Box>

            <AboutSection/>

            <Box mt={7} textAlign="center">
                <Typography variant="h3" component="h2" fontWeight="bold" color="var(--foreground)">
                    Contact Us
                </Typography>
            </Box>

            <ContactInfo/>

            <Grid container spacing={5} mt={10}>
                <Grid item xs={12} md={6}>
                    <ContactForm/>
                </Grid>
                <Grid item xs={12} md={6} sx={{paddingBottom: '50px'}}>
                    <Suspense
                        fallback={
                            <Box height={400} width="100%" display="flex" alignItems="center" justifyContent="center"
                                 bgcolor="var(--background)">
                                Loading Map...
                            </Box>
                        }
                    >
                        <Map/>
                    </Suspense>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;