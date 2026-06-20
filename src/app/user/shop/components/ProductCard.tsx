import React, { useCallback, useMemo } from 'react';
import { Box, Button, Card, CardContent, Chip, IconButton, Typography } from '@mui/material';
import Rating from "@mui/material/Rating";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/AddToCartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product } from "@/context/ProductContext";
import AppImage from "@/components/common/ui/AppImage";

interface ProductCardProps {
    product: Product;
    isList: boolean;
    onFavorite: (productId: string) => void;
    isFavorite?: boolean;
    categoryId?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isList,
    onFavorite,
    isFavorite = false,
    categoryId
}) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const { addToCart, toggleFavorite, updateRating, cart, checkUserSignin } = useCart();

    const handleAddToCart = useCallback(() => {
        if (userId) {
            addToCart(userId, product._id);
        } else {
            checkUserSignin();
        }
    }, [userId, addToCart, checkUserSignin, product._id]);

    const handleFavoriteToggle = useCallback(() => {
        if (userId) {
            toggleFavorite(userId, product._id);
            onFavorite(product._id);
        } else {
            checkUserSignin();
        }
    }, [userId, product._id, toggleFavorite, checkUserSignin, onFavorite]);

    const cartItem = useMemo(() => cart.find(item => item.productId === product._id), [cart, product._id]);

    const handleRatingChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        if (newValue !== null && userId) {
            updateRating(userId, product._id, newValue);
        } else {
            checkUserSignin();
        }
    }, [userId, product._id, updateRating, checkUserSignin]);

    return (
        <Card sx={{
            display: isList ? 'flex' : 'block',
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px var(--shadow)',
            '& .product-media img': {
                transition: 'transform 0.3s ease-in-out',
            },
            '&:hover': {
                boxShadow: '0 8px 16px var(--shadow)',
                transform: 'translateY(-4px)',
                '& .product-media img': {
                    transform: 'scale(1.05)',
                },
                '& .add-to-cart': {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
            },
        }}>
            <Box sx={{ position: 'relative', width: isList ? '33%' : '100%', overflow: 'hidden' }}>
                <AppImage
                    src={product.image}
                    alt={product.name}
                    ratio="1/1"
                    className="product-media"
                    sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 300px"
                />

                <IconButton
                    onClick={handleFavoriteToggle}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'var(--light)',
                        color: 'var(--foreground)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            bgcolor: 'var(--hover)',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    {isFavorite || cartItem?.isFavourite ? (
                        <FaHeart className="text-red-500" />
                    ) : (
                        <FaRegHeart />
                    )}
                </IconButton>

                {product.isNew && (
                    <Chip
                        label="New"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: 'var(--primary)',
                            color: 'var(--text-on-image)',
                        }}
                        size="small"
                    />
                )}
                {product.discount && (
                    <Chip
                        label={`-${product.discount}%`}
                        sx={{
                            position: 'absolute',
                            top: 40,
                            left: 8,
                            bgcolor: 'var(--danger)',
                            color: 'var(--text-on-image)',
                        }}
                        size="small"
                    />
                )}
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    {product.PriceBeforeDiscount && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'var(--muted)' }}>
                            ${product.PriceBeforeDiscount}
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                    sx={{
                        mt: 'auto',
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'all 0.3s ease-in-out',
                        bgcolor: 'var(--foreground)',
                        color: 'var(--background)',
                        '&:hover': {
                            bgcolor: 'var(--muted)',
                            filter: 'brightness(110%)',
                        },
                    }}
                    className="add-to-cart"
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;