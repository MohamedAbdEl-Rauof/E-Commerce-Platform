import React from 'react';
import {Box, Button, Card, CardContent, Chip, Rating, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import Link from 'next/link';
import Comments from "./comments/Page";

const StyledCard = styled(Card)(({theme}) => ({
    maxWidth: 1200,
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const ImageWrapper = styled(Box)(({theme}) => ({
    position: 'relative',
    height: 400,
    [theme.breakpoints.down('sm')]: {
        height: 300,
    },
}));

interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    PriceBeforeDiscount?: number;
    rating?: number;
    categoryName: string;
    isNew?: boolean;
    discount?: number;
}

interface ProductDetailsProps {
    product: Product;
    categoryName: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product, categoryName}) => {
    const decodedCategoryName = decodeURIComponent(categoryName);

    console.log("Decoded Category Name:", decodedCategoryName);

    return (
        <StyledCard>
            <Box display="flex" flexDirection={{xs: 'column', md: 'row'}}>
                <ImageWrapper>
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                    {product.isNew && (
                        <Chip
                            label="New"
                            color="primary"
                            size="small"
                            sx={{position: 'absolute', top: 16, left: 16}}
                        />
                    )}
                    {product.discount && (
                        <Chip
                            label={`-${product.discount}%`}
                            color="error"
                            size="small"
                            sx={{position: 'absolute', top: 16, right: 16}}
                        />
                    )}
                </ImageWrapper>
                <CardContent sx={{flex: 1}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Rating value={product.rating || 0} readOnly precision={0.5}/>
                        <Typography variant="body2" color="text.secondary" sx={{ml: 1}}>
                            ({product.rating?.toFixed(1)})
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 2}}>
                        {product.description}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h5" component="span" fontWeight="bold">
                            ${product.price.toFixed(2)}
                        </Typography>
                        {product.PriceBeforeDiscount && typeof product.PriceBeforeDiscount === 'number' && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{textDecoration: 'line-through', ml: 2}}
                            >
                                ${product.PriceBeforeDiscount.toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon/>}
                            component={Link}
                            href={`/user/categories/${(decodedCategoryName)}`}
                        >
                            Back to Category
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<FavoriteBorderIcon/>}
                            color="primary"
                        >
                            Add to Wishlist
                        </Button>
                    </Box>
                </CardContent>
                <Comments/>
            </Box>
        </StyledCard>
    );
};

export default ProductDetails;