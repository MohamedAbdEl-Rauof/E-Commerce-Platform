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
                maxWidth: '12000px',
                width: '100%',
                mx: 'auto',
                backgroundColor: 'var(--light)',
                color: 'var(--foreground)',
                boxShadow: '0 8px 24px var(--shadow)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                }
            }}
            elevation={0}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4,
                position: 'relative'
            }}>
                <Button
                    startIcon={<TbArrowLeft size={18} />}
                    onClick={onBack}
                    variant="outlined"
                    size="small"
                    sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--primary-light)',
                        borderRadius: '8px',
                        px: 2,
                        py: 0.75,
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: 'var(--primary-light)',
                            borderColor: 'var(--primary)',
                            transform: 'translateX(-4px)',
                            boxShadow: '0 4px 10px var(--shadow)'
                        }
                    }}
                >
                    Back to Categories
                </Button>
                
                {selectedCategory && (
                    <Chip
                        label={`ID: ${selectedCategory._id.substring(0, 8)}...`}
                        size="small"
                        sx={{
                            bgcolor: 'var(--hover)',
                            color: 'var(--muted)',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            height: 24,
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                )}
            </Box>

            {!selectedCategory ? (
                <Box sx={{ 
                    p: 5, 
                    textAlign: 'center',
                    bgcolor: 'var(--background)',
                    borderRadius: 2
                }}>
                    <Typography variant="h6" color="var(--muted)">
                        Category not found
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {/* Left section - Category Image */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Card
                            elevation={0}
                            sx={{
                                height: '55%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'var(--background)',
                                borderRadius: 3,
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px var(--shadow)',
                                    transform: 'translateY(-4px)'
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image={selectedCategory.image || '/placeholder-image.jpg'}
                                    alt={selectedCategory.name}
                                    sx={{
                                        height: 320,
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box sx={{ 
                                    position: 'absolute', 
                                    bottom: 0, 
                                    left: 0, 
                                    right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                                    p: 2,
                                    pt: 4
                                }}>
                                    <Typography 
                                        variant="h5" 
                                        component="h2" 
                                        sx={{ 
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        {selectedCategory.name}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ 
                                p: 3, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 2,
                                flexGrow: 1
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <Chip
                                        label={`${selectedCategory.productCount || 0} Products`}
                                        sx={{
                                            bgcolor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                                            color: 'var(--primary)',
                                            fontWeight: 'bold',
                                            border: '1px solid var(--primary-light)',
                                            boxShadow: '0 2px 6px var(--shadow)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                bgcolor: 'color-mix(in srgb, var(--primary) 25%, transparent)'
                                            }
                                        }}
                                    />
                                    
                                    <Chip
                                        label={new Date(selectedCategory.updatedAt).toLocaleDateString()}
                                        size="small"
                                        sx={{
                                            bgcolor: 'var(--hover)',
                                            color: 'var(--muted)',
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                </Box>
                                
                                <Divider sx={{ my: 1, borderColor: 'var(--border)' }} />
                                
                                <Typography
                                    variant="body2"
                                    sx={{ 
                                        color: 'var(--muted)',
                                        textAlign: 'center',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    Category created on {new Date(selectedCategory.createdAt).toLocaleDateString()} at {new Date(selectedCategory.createdAt).toLocaleTimeString()}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Right section - Category Information */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                                height: '100%'
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    bgcolor: 'var(--background)',
                                    borderRadius: 3,
                                    border: '1px solid var(--border)',
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
                                    variant="h5"
                                    component="h1"
                                    gutterBottom
                                    sx={{
                                        color: 'var(--foreground)',
                                        fontWeight: 'bold',
                                        pl: 1,
                                        borderBottom: '1px solid var(--border)',
                                        pb: 1,
                                        mb: 3
                                    }}
                                >
                                    Category Details
                                </Typography>

                                <Stack spacing={3}>
                                    <Box sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        p: 2,
                                        bgcolor: 'color-mix(in srgb, var(--background) 95%, var(--primary))',
                                        borderRadius: 2,
                                        border: '1px solid var(--border)'
                                    }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: 'var(--primary)',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Category Name
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ 
                                                color: 'var(--foreground)',
                                                fontWeight: 'medium'
                                            }}
                                        >
                                            {selectedCategory.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        p: 2,
                                        bgcolor: 'color-mix(in srgb, var(--background) 95%, var(--primary))',
                                        borderRadius: 2,
                                        border: '1px solid var(--border)'
                                    }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: 'var(--primary)',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Category ID
                                        </Typography>
                                        <Box sx={{
                                            bgcolor: 'var(--hover)',
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: '1px dashed var(--border)',
                                            overflowX: 'auto'
                                        }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'var(--foreground)',
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.9rem',
                                                    wordBreak: 'break-all'
                                                }}
                                            >
                                                {selectedCategory._id}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ 
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                p: 2,
                                                height: '100%',
                                                bgcolor: 'color-mix(in srgb, var(--background) 95%, var(--info))',
                                                borderRadius: 2,
                                                border: '1px solid var(--border)'
                                            }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: 'var(--info)',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Created At
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'var(--foreground)' }}
                                                >
                                                    {new Date(selectedCategory.createdAt).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ 
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                p: 2,
                                                height: '100%',
                                                bgcolor: 'color-mix(in srgb, var(--background) 95%, var(--success))',
                                                borderRadius: 2,
                                                border: '1px solid var(--border)'
                                            }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: 'var(--success)',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Last Updated
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'var(--foreground)' }}
                                                >
                                                    {new Date(selectedCategory.updatedAt).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    bgcolor: 'var(--background)',
                                    borderRadius: 3,
                                    border: '1px solid var(--border)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    flexGrow: 1
                                }}
                            >
                                <Box sx={{ 
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    bgcolor: 'var(--warning)'
                                }} />
                                
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        color: 'var(--foreground)',
                                        fontWeight: 'bold',
                                        pl: 1,
                                        borderBottom: '1px solid var(--border)',
                                        pb: 1,
                                        mb: 3
                                    }}
                                >
                                    Products Statistics
                                </Typography>

                                <Box sx={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}>
                                    <Box sx={{
                                        p: 2,
                                        bgcolor: 'color-mix(in srgb, var(--background) 95%, var(--warning))',
                                        borderRadius: 2,
                                        border: '1px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color: 'var(--foreground)',
                                                fontWeight: 'medium'
                                            }}
                                        >
                                            Total Products
                                        </Typography>
                                        <Chip
                                            label={selectedCategory.productCount || 0}
                                            sx={{
                                                bgcolor: 'var(--warning)',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                minWidth: '60px'
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{
                                        mt: 2,
                                        p: 3,
                                        bgcolor: 'var(--hover)',
                                        borderRadius: 2,
                                        border: '1px dashed var(--border)',
                                        textAlign: 'center'
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'var(--muted)',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            {selectedCategory.productCount > 0 
                                                ? `This category contains ${selectedCategory.productCount} products. You can manage these products from the Products section.`
                                                : `This category doesn't have any products yet. You can add products to this category from the Products section.`
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            <Button
                                variant="contained"
                                onClick={() => onBack()}
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    color: 'white',
                                    borderRadius: 2,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 12px var(--shadow)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'var(--primary-dark)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px var(--shadow)'
                                    }
                                }}
                            >
                                Return to Categories List
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

ViewCategory.displayName = 'ViewCategory';
export default ViewCategory;