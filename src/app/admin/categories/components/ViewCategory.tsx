'use client';

import React from 'react';
import { Box, Button, Card, CardMedia, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { TbArrowLeft } from 'react-icons/tb';
import { Category } from '@/context/CategoriesContext';

interface ViewCategoryProps {
    categoryId: string | undefined;
    categories?: Category[];
    onBack: () => void;
}

const ViewCategory: React.FC<ViewCategoryProps> = ({
    categoryId,
    categories,
    onBack,
}) => {

    const selectedCategory = categories?.find((category) => category._id === categoryId);

    return (
        <Paper
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                width: '100%',
                mx: 'auto',
                backgroundColor: 'var(--light)',
                color: 'var(--foreground)',
                boxShadow: '0 8px 24px var(--shadow)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
            }}
            elevation={3}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Button
                    startIcon={<TbArrowLeft />}
                    onClick={onBack}
                    sx={{
                        color: 'var(--primary)',
                        '&:hover': {
                            bgcolor: 'var(--hover)',
                        }
                    }}
                >
                    Back to Categories
                </Button>
            </Box>

            <Grid container spacing={4}>
                {/* Left section - Category Image */}
                <Grid item xs={12} md={5} lg={4}>
                    <Card
                        elevation={2}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'var(--background)',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={selectedCategory?.image}
                            alt={selectedCategory?.name}
                            sx={{
                                height: 300,
                                objectFit: 'cover',
                                borderBottom: '1px solid',
                                borderColor: 'var(--border)'
                            }}
                        />

                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Chip
                                label={`${selectedCategory?.productCount} Products`}
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    color: 'var(--light)',
                                    fontWeight: 'medium'
                                }}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* Right section - Category Information */}
                <Grid item xs={12} md={7} lg={8}>
                    <Box
                        sx={{
                            p: 3,
                            bgcolor: 'var(--background)',
                            borderRadius: 2,
                            height: '100%'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 'bold'
                            }}
                        >
                            {selectedCategory?.name}
                        </Typography>

                        <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />

                        <Stack spacing={3}>
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: 'var(--muted)',
                                        mb: 1
                                    }}
                                >
                                    Description
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'var(--foreground)' }}
                                >
                                    {`This category contains ${selectedCategory?.productCount} related products.`}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: 'var(--muted)',
                                        mb: 1
                                    }}
                                >
                                    Category ID
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--foreground)',
                                        bgcolor: 'var(--hover)',
                                        p: 1,
                                        borderRadius: 1,
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {selectedCategory?._id}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: 'var(--muted)',
                                            mb: 1
                                        }}
                                    >
                                        Created At
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'var(--foreground)' }}
                                    >
                                        {selectedCategory?.createdAt ? new Date(selectedCategory?.createdAt).toLocaleString() : 'N/A'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: 'var(--muted)',
                                            mb: 1
                                        }}
                                    >
                                        Last Updated
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'var(--foreground)' }}
                                    >
                                        {selectedCategory?.updatedAt ? new Date(selectedCategory?.updatedAt).toLocaleString() : 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

ViewCategory.displayName = 'ViewCategory';
export default ViewCategory;