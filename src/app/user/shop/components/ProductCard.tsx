import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from "@mui/material/Rating";
import {useSession} from "next-auth/react";
import {useCart} from "@/context/AddToCartContext";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    PriceBeforeDiscount?: string;
    rating?: number;
    isNew?: boolean;
    discount?: number;
}

interface ProductCardProps {
    product: Product;
    isList: boolean;
    isFavorite: boolean;
    onFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, isList, isFavorite, onFavorite}) => {
    const {data: session} = useSession();
    const {addToCart, checkUserSignin} = useCart();
    const userId = session?.user?.id;

    const handleAddToCart = (productId: string) => {
        if (session && session.user && userId) {
            addToCart(userId, productId);
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
            transition: 'all 0.3s',
            '&:hover': {
                boxShadow: 6,
                '& .MuiCardMedia-root': {
                    transform: 'scale(1.1)',
                },
                '& .add-to-cart': {
                    opacity: 1,
                },
            },
        }}>
            <Box sx={{position: 'relative', width: isList ? '33%' : '100%'}}>
                <CardMedia
                    component="div"
                    sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        transition: 'transform 0.3s',
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </CardMedia>
                <IconButton
                    onClick={handleFavoriteToggle}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': {bgcolor: 'background.paper'},
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon color="error"/>
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </IconButton>
                {product.isNew && (
                    <Chip
                        label="New"
                        color="primary"
                        size="small"
                        sx={{position: 'absolute', top: 8, left: 8}}
                    />
                )}
                {product.discount && (
                    <Chip
                        label={`-${product.discount}%`}
                        color="error"
                        size="small"
                        sx={{position: 'absolute', top: 40, left: 8}}
                    />
                )}
            </Box>
            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6" component="h3" gutterBottom noWrap>
                    {product.name}
                </Typography>
                <Rating
                    value={product.rating || 0}
                    readOnly
                    size="small"
                />
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                    <Typography variant="h6" component="span">
                        ${product.price.toFixed(2)}
                    </Typography>
                    {product.PriceBeforeDiscount && (
                        <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                            ${product.PriceBeforeDiscount}
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product._id)}
                    sx={{
                        mt: 'auto',
                        opacity: 0,
                        transition: 'opacity 0.3s',
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