import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import AppImage from "@/components/common/ui/AppImage";
import { motion } from 'framer-motion';
import Rating from "@mui/material/Rating";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import CountDown from "@/components/common/user/CountDown";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSession } from "next-auth/react";
import { useCart } from "@/context/AddToCartContext";

import { Product } from '@/context/ProductContext';

interface ProductDetailsProps {
    product: Product | null;
    categoryId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, categoryId }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const { addToCart, toggleFavorite, updateRating, cart, checkUserSignin } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = useCallback(() => {
        if (userId && product) {
            addToCart(userId, product._id);
        } else {
            checkUserSignin();
        }
    }, [userId, addToCart, checkUserSignin, product]);

    const handleFavoriteToggle = useCallback(() => {
        if (userId && product) {
            toggleFavorite(userId, product._id);
        } else {
            checkUserSignin();
        }
    }, [userId, product, toggleFavorite, checkUserSignin]);

    const cartItem = useMemo(() => product ? cart.find(item => item.productId === product._id) : undefined, [cart, product]);

    const handleRatingChange = useCallback((event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        if (newValue !== null && userId && product) {
            updateRating(userId, product._id, newValue);
        } else {
            checkUserSignin();
        }
    }, [userId, product, updateRating, checkUserSignin]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

    if (!product) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ borderRadius: '16px', boxShadow: '0 4px 20px var(--shadow)', border: '1px solid var(--border)' }}>
            <Link href={`/user/categories/${categoryId}`} passHref>
                <Button
                    component="a"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        marginBottom: '0.5rem',
                        marginTop: '1.5rem',
                        marginLeft: '1.5rem',
                        textTransform: 'none',
                        color: 'var(--foreground)',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Back to Categories
                </Button>
            </Link>
            <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--background)',
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AppImage
                                src={product?.image}
                                alt={product?.name || 'Product Image'}
                                ratio="1/1"
                                priority
                                sizes="(max-width: 900px) 100vw, 50vw"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px var(--shadow)',
                                }}
                            />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '1.5rem' }}>
                                <Grid item>
                                    <Rating
                                        name="simple-controlled"
                                        value={cartItem?.rating ?? null}
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "var(--rating-color)",
                                                border: "1px solid var(--rating-border-color)",
                                            },
                                            "& .MuiRating-iconEmpty": {
                                                color: "var(--rating-unselected-color)",
                                            },
                                        }}
                                        onChange={handleRatingChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" fontWeight="bold">
                                        11 Reviews
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ marginBottom: '1.5rem' }}>
                                {product.description}
                            </Typography>

                            <Grid container spacing={2} alignItems="baseline" sx={{ marginBottom: '1.5rem' }}>
                                <Grid item>
                                    <Typography variant="h5" fontWeight="bold">
                                        ${product.price}
                                    </Typography>
                                </Grid>
                                {product.PriceBeforeDiscount && (
                                    <Grid item>
                                        <Typography variant="body1" style={{ textDecoration: 'line-through' }}>
                                            ${product.PriceBeforeDiscount}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>

                            <Box sx={{ marginBottom: '2rem' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Offer Expires in:
                                </Typography>
                                <CountDown />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <Box display="flex" alignItems="center" gap={6}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        border={1}
                                        borderColor="var(--foreground)"
                                        borderRadius={1}
                                        bgcolor="var(--background)"
                                        sx={{ height: '32px' }}
                                    >
                                        <Button
                                            onClick={handleDecrement}
                                            sx={{
                                                minWidth: '32px',
                                                height: '32px',
                                                p: 0,
                                                color: 'var(--foreground)'
                                            }}
                                        >
                                            -
                                        </Button>
                                        <Typography
                                            component="span"
                                            px={1.5}
                                            sx={{
                                                lineHeight: '32px',
                                                color: 'var(--foreground)',
                                                borderLeft: '1px solid var(--foreground)',
                                                borderRight: '1px solid var(--foreground)',
                                            }}
                                        >
                                            {quantity}
                                        </Typography>
                                        <Button
                                            onClick={handleIncrement}
                                            sx={{
                                                minWidth: '32px',
                                                height: '32px',
                                                p: 0,
                                                color: 'var(--foreground)'
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Box>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleFavoriteToggle}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 0,
                                            color: 'var(--foreground)'
                                        }}
                                    >
                                        {cartItem?.isFavourite ? (
                                            <FaHeart size={16} className="text-red-500" />
                                        ) : (
                                            <FaRegHeart size={16} />
                                        )}
                                        <Typography component="span" ml={0.5} variant="body2">
                                            Wishlist
                                        </Typography>
                                    </motion.button>
                                </Box>

                                <Box sx={{ padding: '14px' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'var(--foreground)',
                                            color: 'var(--background)',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Add to Cart
                                    </motion.button>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDetails;