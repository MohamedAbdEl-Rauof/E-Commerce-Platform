import React, {useState} from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import Image from 'next/image';
import {motion} from 'framer-motion';
import Rating from "@mui/material/Rating";
import {FaHeart} from 'react-icons/fa';
import CountDown from "@/components/common/user/CountDown";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProductDetailsProps {
    product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        PriceBeforeDiscount?: string;
        image: string;
        rating?: number;
        category: string;
    };
    categoryId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product, categoryId}) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

    const toggleFavorite = (productId: string) => {
        // Implement toggle favorite logic here
        console.log(`Toggling favorite for product ${productId}`);
    };

    if (!product) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }


    return (
        <Box>
            <Link href={`/user/categories/${categoryId}`} passHref>
                <Button
                    component="a"
                    startIcon={<ArrowBackIcon/>}
                    sx={{
                        marginBottom: '2rem',
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
            <Box sx={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>


                <Grid
                    container
                    spacing={4}
                    sx={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--background)',
                    }}
                > <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '75%', // 4:3 aspect ratio
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Image
                                src={product?.image || '/placeholder-image.jpg'}
                                alt={product?.name || 'Product Image'}
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    </motion.div>
                </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            <Grid container spacing={2} alignItems="center" sx={{marginBottom: '1.5rem'}}>
                                <Grid item>
                                    <Rating
                                        name="simple-controlled"
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                                color: "var(--rating-color)",
                                                border: "1px solid var(--rating-border-color)",
                                            },
                                            "& .MuiRating-iconEmpty": {
                                                color: "var(--rating-unselected-color)",
                                            },
                                        }}
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
                            <Typography variant="body1" paragraph sx={{marginBottom: '1.5rem'}}>
                                {product.description}
                            </Typography>

                            <Grid container spacing={2} alignItems="baseline" sx={{marginBottom: '1.5rem'}}>
                                <Grid item>
                                    <Typography variant="h5" fontWeight="bold">
                                        ${product.price}
                                    </Typography>
                                </Grid>
                                {product.PriceBeforeDiscount && (
                                    <Grid item>
                                        <Typography variant="body1" color="text.secondary"
                                                    style={{textDecoration: 'line-through'}}>
                                            ${product.PriceBeforeDiscount}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>

                            <Box sx={{marginBottom: '2rem'}}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Offer Expires in:
                                </Typography>
                                <CountDown/>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                                <Box display="flex" alignItems="center" gap={6}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        border={1}
                                        borderColor="var(--foreground)"
                                        borderRadius={1}
                                        bgcolor="var(--background)"
                                        sx={{height: '32px'}}
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
                                            px={1.5}
                                            borderX={1}
                                            borderColor="var(--foreground)"
                                            sx={{
                                                lineHeight: '32px',
                                                color: 'var(--foreground)'
                                            }}
                                        >
                                            {quantity}
                                        </Typography>
                                        <Button
                                            onClick={handleIncrement}
                                            sx={{
                                                minWidth: '32px',
                                                height: '100px',
                                                p: 0,
                                                color: 'var(--foreground)'
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Box>
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => toggleFavorite(product._id)}
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
                                        <FaHeart size={16}/>
                                        <Typography component="span" ml={0.5} variant="body2">
                                            Wishlist
                                        </Typography>
                                    </motion.button>
                                </Box>

                                <Box sx={{padding: '14px'}}>
                                    <motion.button
                                        whileHover={{scale: 1.02}}
                                        whileTap={{scale: 0.98}}
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