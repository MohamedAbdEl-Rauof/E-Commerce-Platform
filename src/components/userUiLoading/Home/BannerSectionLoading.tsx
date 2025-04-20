import React from "react";
import { Box, Container, Paper, Skeleton } from "@mui/material";

const BannerSectionLoading = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    height: { xs: 'auto', md: '400px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px var(--shadow)',
                }}
            >
                {/* Left side - Image placeholder */}
                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'var(--hover)',
                        height: { xs: '200px', md: '100%' },
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="pulse"
                        sx={{ backgroundColor: 'var(--border)' }}
                    />
                </Paper>

                {/* Right side - Content placeholder */}
                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        p: { xs: 3, md: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: 'var(--background)',
                    }}
                >
                    <Box
                        sx={{
                            pl: { xs: 0, md: 4 },
                            textAlign: { xs: 'center', md: 'left' },
                            mx: { xs: 'auto', md: 0 },
                            width: { xs: '100%', md: '83.33%', lg: '66.67%' },
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            height={40}
                            width="100%"
                            animation="pulse"
                            sx={{ mb: 2, backgroundColor: 'var(--border)' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={20}
                            width="100%"
                            animation="pulse"
                            sx={{ mb: 1, backgroundColor: 'var(--border)' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={20}
                            width="100%"
                            animation="pulse"
                            sx={{ mb: 1, backgroundColor: 'var(--border)' }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={20}
                            width="100%"
                            animation="pulse"
                            sx={{ backgroundColor: 'var(--border)' }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default BannerSectionLoading;