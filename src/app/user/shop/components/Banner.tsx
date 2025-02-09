import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Box, Breadcrumbs, Container, Typography} from '@mui/material';
import {styled} from '@mui/system';

const StyledImage = styled(Image)({
    transform: 'scale(1)',
    transition: 'transform 0.7s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const Banner: React.FC = () => {
    return (
        <Container maxWidth={false} sx={{width: '100%', pt: 8}}>
            <Box
                sx={{
                    position: 'relative',
                    height: 400,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
                aria-labelledby="banner-title"
            >
                <StyledImage
                    src="/images/Paste Image (1).jpg"
                    alt="Elegant interior design showcasing a modern living room"
                    layout="fill"
                    objectFit="cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Container maxWidth="lg">
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Breadcrumbs
                                aria-label="Breadcrumb"
                                sx={{
                                    mb: 2,
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link href="/user" passHref>
                                    <Typography
                                        component="a"
                                        sx={{
                                            color: 'white',
                                            '&:hover': {color: 'grey.200'},
                                            transition: 'color 0.3s',
                                        }}
                                    >
                                        Home
                                    </Typography>
                                </Link>
                                <Typography color="grey.300">Shop</Typography>
                            </Breadcrumbs>
                        </Box>
                        <Typography
                            id="banner-title"
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                mb: 2,
                                fontSize: {xs: '2.5rem', md: '3rem'},
                            }}
                        >
                            Shop Page
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'grey.200',
                                maxWidth: '2xl',
                                px: 2,
                            }}
                        >
                            Let&#39;s design the place you always imagined.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </Container>

    );
};

export default Banner;