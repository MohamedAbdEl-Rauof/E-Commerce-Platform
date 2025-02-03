import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Typography} from '@mui/material';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';
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
    categoryName: string;
    isList: boolean;
    isFavorite: boolean;
    onFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, categoryName, isList, isFavorite, onFavorite}) => {
    const {data: session} = useSession();
    const {addToCart, checkUserSignin} = useCart();
    const userId = session?.user?.id;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (session && session.user && userId) {
            addToCart(userId, product._id);
        } else {
            checkUserSignin();
        }
    };

    const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onFavorite(product._id);
    };

    if (!product) {
        return null;
    }

    return (
        <Card sx={{
            display: isList ? 'flex' : 'block',
            height: '100%',
            transition: 'all 0.3s',
            textDecoration: 'none',
            color: 'inherit',
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
                <Link href={`/user/categories/${(categoryName)}/${encodeURIComponent(product.name)}`}
                      passHref>
                    <IconButton
                        component="a"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: 'background.paper',
                            '&:hover': {bgcolor: 'background.paper'},
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
                        sx={{position: 'absolute', top: 40, left: 8}}
                    />
                )}
                {product.discount && (
                    <Chip
                        label={`-${product.discount}%`}
                        color="error"
                        size="small"
                        sx={{position: 'absolute', top: product.isNew ? 72 : 40, left: 8}}
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
                    onClick={handleAddToCart}
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