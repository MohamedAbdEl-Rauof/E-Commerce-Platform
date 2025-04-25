import React from "react";
import { Product } from "@/context/ProductContext";
import { Category } from "@/context/CategoriesContext";
import { Box, Button, Card, CardMedia, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { TbArrowLeft } from 'react-icons/tb';

interface ViewProductProps {
    productId: string | null
    onBack: () => void;
    products: Product[];
    categories: Category[];
}

const ViewProduct: React.FC<ViewProductProps> = ({ productId, onBack, products, categories }) => {

    const ProductData = products?.find((product) => product._id === productId);

    const selectedCategory = categories?.find((category => category._id === ProductData?.categoryId));

    // Format date function
    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return 'N/A';
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                bgcolor: 'var(--background)',
                color: 'var(--foreground)',
                width: '100%',
                border: '1px solid var(--border)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative accent bar at top */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--info) 100%)'
                }}
            />

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                mb: 4,
                mt: 1
            }}>
                <Box>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            color: 'var(--foreground)',
                            fontSize: { xs: '1.5rem', sm: '2rem' },
                            position: 'relative',
                            display: 'inline-block',
                            mb: 1
                        }}
                    >
                        Product Details
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -4,
                                left: 0,
                                width: '40%',
                                height: '3px',
                                bgcolor: 'var(--primary)'
                            }}
                        />
                    </Typography>

                    {ProductData && (
                        <Chip
                            label={ProductData._id.substring(0, 8) + '...'}
                            size="small"
                            sx={{
                                bgcolor: 'var(--hover)',
                                color: 'var(--muted)',
                                fontFamily: 'monospace',
                                fontSize: '0.7rem',
                                height: 24
                            }}
                        />
                    )}
                </Box>

                <Button
                    startIcon={<TbArrowLeft size={18} />}
                    onClick={onBack}
                    variant="outlined"
                    sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--border)',
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        '&:hover': {
                            bgcolor: 'var(--hover)',
                            transform: 'translateX(-4px)',
                            borderColor: 'var(--primary)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Back to Products
                </Button>
            </Box>

            {!ProductData ? (
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        bgcolor: 'var(--hover)',
                        borderRadius: 2,
                        border: '1px dashed var(--border)'
                    }}
                >
                    <Typography variant="h6" color="var(--muted)">
                        Product not found
                    </Typography>
                    <Typography variant="body2" color="var(--muted)" sx={{ mt: 1 }}>
                        The product you're looking for doesn't exist or has been removed.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {/* Left section - Product Image */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Box sx={{ position: 'sticky', top: 20 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'transparent',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid var(--border)',
                                    position: 'relative'
                                }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        image={ProductData.image || '/placeholder-product.jpg'}
                                        alt={ProductData.name || 'Product Image'}
                                        sx={{
                                            height: { xs: 280, sm: 320, md: 380 },
                                            objectFit: 'cover',
                                        }}
                                    />

                                    {/* Gradient overlay */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '30%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                                            }}
                                        >
                                            {ProductData.name}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: '1px solid var(--border)'
                                }}>
                                    <Chip
                                        label={selectedCategory?.name || 'Uncategorized'}
                                        sx={{
                                            bgcolor: 'var(--primary)',
                                            color: 'white',
                                            fontWeight: 'medium',
                                            fontSize: '0.8rem'
                                        }}
                                        size="small"
                                    />

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        bgcolor: ProductData.PriceBeforeDiscount ? 'var(--success-light)' : 'transparent',
                                        p: ProductData.PriceBeforeDiscount ? 0.5 : 0,
                                        px: ProductData.PriceBeforeDiscount ? 1 : 0,
                                        borderRadius: 1
                                    }}>
                                        {ProductData.PriceBeforeDiscount && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'var(--success)',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                SALE
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Card>

                            {/* Price card */}
                            <Card
                                elevation={0}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    border: '1px solid var(--border)',
                                    borderRadius: 3,
                                    bgcolor: 'var(--background)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    bgcolor: 'var(--primary)'
                                }} />

                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: 'var(--muted)',
                                        mb: 1,
                                        fontWeight: 'bold',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        pl: 1
                                    }}
                                >
                                    Pricing Information
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: 1.5,
                                    pl: 1
                                }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: 'var(--foreground)',
                                            fontWeight: 'bold',
                                            lineHeight: 1
                                        }}
                                    >
                                        ${ProductData.price || '0.00'}
                                    </Typography>

                                    {ProductData.PriceBeforeDiscount && (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'var(--muted)',
                                                textDecoration: 'line-through',
                                                fontWeight: 'medium'
                                            }}
                                        >
                                            ${ProductData.PriceBeforeDiscount}
                                        </Typography>
                                    )}

                                    {ProductData.PriceBeforeDiscount && (
                                        <Chip
                                            label={`${Math.round((1 - (ProductData.price || 0) / (ProductData.PriceBeforeDiscount || 1)) * 100)}% OFF`}
                                            size="small"
                                            sx={{
                                                bgcolor: 'var(--success-light)',
                                                color: 'var(--success)',
                                                fontWeight: 'bold',
                                                fontSize: '0.7rem',
                                                height: 20
                                            }}
                                        />
                                    )}
                                </Box>
                            </Card>
                        </Box>
                    </Grid>

                    {/* Right section - Product Information */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3
                            }}
                        >
                            {/* Main info card */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    bgcolor: 'var(--background)',
                                    borderRadius: 3,
                                    border: '1px solid var(--border)',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    bgcolor: 'var(--info)'
                                }} />

                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        color: 'var(--foreground)',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        fontSize: { xs: '1.3rem', sm: '1.5rem' }
                                    }}
                                >
                                    Product Information
                                </Typography>

                                <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />

                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: 'var(--info)',
                                            mb: 1,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        Description
                                    </Typography>
                                    <Box
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 2,
                                            bgcolor: 'var(--hover)',
                                            border: '1px solid var(--border)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                bottom: 0,
                                                width: '4px',
                                                bgcolor: 'var(--info)',
                                                opacity: 0.7
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'var(--foreground)',
                                                lineHeight: 1.7,
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            {ProductData.description || 'No description available for this product.'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Grid container spacing={3} sx={{ mt: 1 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                border: '1px solid var(--border)',
                                                bgcolor: 'color-mix(in srgb, var(--background) 97%, var(--info))',
                                                height: '100%',
                                                transition: 'transform 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-3px)'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: 'var(--info)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    mb: 1
                                                }}
                                            >
                                                Created At
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'var(--foreground)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    fontWeight: 'medium'
                                                }}
                                            >
                                                {formatDate(ProductData.createdAt)}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                border: '1px solid var(--border)',
                                                bgcolor: 'color-mix(in srgb, var(--background) 97%, var(--success))',
                                                height: '100%',
                                                transition: 'transform 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-3px)'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: 'var(--success)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    mb: 1
                                                }}
                                            >
                                                Last Updated
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'var(--foreground)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    fontWeight: 'medium'
                                                }}
                                            >
                                                {formatDate(ProductData.updatedAt)}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Additional details card */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    bgcolor: 'var(--background)',
                                    borderRadius: 3,
                                    border: '1px solid var(--border)',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    bgcolor: 'var(--warning)'
                                }} />

                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        color: 'var(--foreground)',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        fontSize: { xs: '1.3rem', sm: '1.5rem' }
                                    }}
                                >
                                    Technical Details
                                </Typography>

                                <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px dashed var(--border)',
                                            bgcolor: 'var(--hover)'
                                        }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: 'var(--muted)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}
                                            >
                                                Product ID
                                            </Typography>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: 1,
                                                bgcolor: 'var(--background)',
                                                border: '1px solid var(--border)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--foreground)',
                                                        fontSize: '0.85rem',
                                                        fontFamily: 'monospace',
                                                        wordBreak: 'break-all'
                                                    }}
                                                >
                                                    {ProductData._id}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px dashed var(--border)',
                                            bgcolor: 'var(--hover)'
                                        }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: 'var(--muted)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}
                                            >
                                                Category ID
                                            </Typography>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: 1,
                                                bgcolor: 'var(--background)',
                                                border: '1px solid var(--border)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--foreground)',
                                                        fontSize: '0.85rem',
                                                        fontFamily: 'monospace',
                                                        wordBreak: 'break-all'
                                                    }}
                                                >
                                                    {ProductData.categoryId || 'No category assigned'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
}

ViewProduct.displayName = 'ViewProduct';
export default ViewProduct;