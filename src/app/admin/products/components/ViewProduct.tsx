import React, {useEffect} from "react";
import {Product} from "@/context/ProductContext";
import {Category} from "@/context/CategoriesContext";
import {Box, Button, Card, CardMedia, Chip, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
import {TbArrowLeft} from 'react-icons/tb';

interface ViewProductProps {
    productId: string | null
    onBack: () => void;
    products: Product[];
    categories: Category[];
}

const ViewProduct: React.FC<ViewProductProps> = ({productId, onBack, products, categories}) => {

    const ProductData = products?.find((product) => product._id === productId);
    console.log("Product Data:", ProductData);
    const selectedCategory = categories?.find((category => category._id === ProductData?.categoryId));
    console.log("Selected Category:", selectedCategory);

    useEffect(() => {
        if (productId) {
            // Fetch product data here
            console.log("Fetching data for viewing product:", productId);
        }
    }, [productId]);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: 'var(--light)',
                color: 'var(--foreground)',
                width: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Button
                    startIcon={<TbArrowLeft size={20}/>}
                    onClick={onBack}
                    sx={{
                        color: 'var(--primary)',
                        fontWeight: 'bold',
                        '&:hover': {
                            bgcolor: 'var(--hover)',
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    Back to Products
                </Button>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', color: 'var(--primary)'}}>
                    Product Details
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left section - Product Image */}
                <Grid item xs={12} md={5} lg={4}>
                    <Card
                        elevation={2}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'var(--background)',
                            borderRadius: 3,
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={ProductData?.image}
                            alt={ProductData?.name}
                            sx={{
                                height: 350,
                                objectFit: 'cover',
                                borderBottom: '1px solid',
                                borderColor: 'var(--border)'
                            }}
                        />
                        <Box sx={{p: 2, textAlign: 'center'}}>
                            <Chip
                                label={`${selectedCategory?.name} Category`}
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    color: 'var(--light)',
                                    fontWeight: 'medium',
                                    fontSize: '0.9rem',
                                    py: 0.5
                                }}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* Right section - Product Information */}
                <Grid item xs={12} md={7} lg={8}>
                    <Box
                        sx={{
                            p: 3,
                            bgcolor: 'var(--background)',
                            borderRadius: 3,
                            height: '100%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 'bold',
                                mb: 2
                            }}
                        >
                            {ProductData?.name}
                        </Typography>

                        <Divider sx={{my: 2, borderColor: 'var(--border)'}}/>

                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="subtitle1" sx={{color: 'var(--muted)', mb: 1, fontWeight: 'bold'}}>
                                    Description
                                </Typography>
                                <Typography variant="body1" sx={{color: 'var(--foreground)', lineHeight: 1.6}}>
                                    {ProductData?.description}
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{bgcolor: 'var(--hover)', p: 2, borderRadius: 2}}>
                                        <Typography variant="subtitle1"
                                                    sx={{color: 'var(--muted)', mb: 1, fontWeight: 'bold'}}>
                                            Current Price
                                        </Typography>
                                        <Typography variant="h5" sx={{color: 'var(--primary)', fontWeight: 'bold'}}>
                                            ${ProductData?.price}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{bgcolor: 'var(--hover)', p: 2, borderRadius: 2}}>
                                        <Typography variant="subtitle1"
                                                    sx={{color: 'var(--muted)', mb: 1, fontWeight: 'bold'}}>
                                            Price Before Discount
                                        </Typography>
                                        <Typography variant="h5"
                                                    sx={{color: 'var(--foreground)', textDecoration: 'line-through'}}>
                                            ${ProductData?.PriceBeforeDiscount || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"
                                                sx={{color: 'var(--muted)', mb: 1, fontWeight: 'bold'}}>
                                        Created At
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'var(--foreground)'}}>
                                        {ProductData?.createdAt ? new Date(ProductData.createdAt).toLocaleString() : 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"
                                                sx={{color: 'var(--muted)', mb: 1, fontWeight: 'bold'}}>
                                        Last Updated
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'var(--foreground)'}}>
                                        {ProductData?.updatedAt ? new Date(ProductData.updatedAt).toLocaleString() : 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}


ViewProduct.displayName = 'ViewProduct';
export default ViewProduct;


