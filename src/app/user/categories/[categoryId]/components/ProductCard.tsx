import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
import Rating from "@mui/material/Rating";
import {useSession} from "next-auth/react";
import {useCart} from "@/context/AddToCartContext";
import Image from "next/image";
import Link from 'next/link';

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        image: string;
        price: number;
        PriceBeforeDiscount?: string;
        rating?: number;
        isNew?: boolean;
        discount?: number;
    };
    categoryId: string;
    isList: boolean;
    isFavorite: boolean;
    onFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, categoryId, isList, isFavorite, onFavorite}) => {
    const {data: session} = useSession();
    const {addToCart, checkUserSignin} = useCart();
    const userId = session?.user?.id;

    const handleAddToCart = () => {
        if (session && session.user && userId) {
            addToCart(userId, product._id);
        } else {
            checkUserSignin();
        }
    };

    const handleFavoriteToggle = () => {
        onFavorite(product._id);
    };

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
            '&:hover': {
                boxShadow: '0 8px 16px var(--shadow)',
                transform: 'translateY(-4px)',
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                },
                '& .add-to-cart': {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
            },
        }}>
            <Box sx={{position: 'relative', width: isList ? '33%' : '100%', overflow: 'hidden'}}>
                <CardMedia
                    component="div"
                    sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        transition: 'transform 0.3s ease-in-out',
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </CardMedia>
                <Link href={`/user/categories/${categoryId}/${product._id}`} passHref>
                    <IconButton
                        component="a"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: 'white',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                bgcolor: 'var(--hover)',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <InfoIcon/>
                    </IconButton>
                </Link>
                <IconButton
                    onClick={handleFavoriteToggle}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'white',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            bgcolor: 'var(--hover)',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon sx={{color: 'var(--danger)'}}/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </IconButton>
                {product.isNew && (
                    <Chip
                        label="New"
                        sx={{
                            position: 'absolute',
                            top: 40,
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
                            top: product.isNew ? 72 : 40,
                            left: 8,
                            bgcolor: 'var(--danger)',
                            color: 'var(--text-on-image)',
                        }}
                        size="small"
                    />
                )}
            </Box>
            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2}}>
                <Typography variant="h6" component="h3" gutterBottom noWrap sx={{fontWeight: 'bold'}}>
                    {product.name}
                </Typography>
                <Rating
                    name="simple-controlled"
                    // value={cartItem?.rating ?? null}
                    sx={{
                        "& .MuiRating-iconFilled": {
                            color: "var(--rating-color)",
                            border: "1px solid var(--rating-border-color)",
                        },
                        "& .MuiRating-iconEmpty": {
                            color: "var(--rating-unselected-color)",
                        },
                    }}
                    // onChange={(event, newValue) => {
                    //     if (newValue !== null && userId) {
                    //         updateRating(userId, item._id, newValue);
                    //     } else {
                    //         checkUserSignin();
                    //     }
                    // }}
                />
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                    <Typography variant="h6" component="span" sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    {product.PriceBeforeDiscount && (
                        <Typography variant="body2" sx={{textDecoration: 'line-through', color: 'var(--muted)'}}>
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