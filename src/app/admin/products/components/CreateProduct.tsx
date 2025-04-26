import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Box, Button, Card, CardMedia, Grid, MenuItem, Paper, TextField, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import {toast} from 'react-toastify';
import {Category} from "@/context/CategoriesContext";
import {Product} from "@/context/ProductContext";

// Define the validation schema with Zod
const ProductSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be between 2 and 50 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must not exceed 500 characters'),
    image: z.string().url('Please enter a valid URL'),
    price: z.string().min(0, 'Price must be a positive number'),
    priceBeforeDiscount: z.string().min(0, 'Price must be a positive number').optional(),
    category: z.string().nonempty('Category is required'),
    createdAt: z.string(),
    updatedAt: z.string(),
});

type ProductFormData = z.infer<typeof ProductSchema>;

interface CreateProductProps {
    categories: Category[];
    onUpdate: (updatedProduct: Product) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({categories, onUpdate}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        watch,
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: '',
            priceBeforeDiscount: '',
            category: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        mode: 'onChange',
    });

    const watchImage = watch('image');

    useEffect(() => {
        setPreviewImage(watchImage);
    }, [watchImage]);

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Product created successfully!');
                onUpdate(responseData);
                reset();
                setPreviewImage('');
            } else {
                throw new Error(responseData.error || 'Failed to create Product');
            }
        } catch (error) {
            console.error('Error creating Product:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred while creating the Product');
        } finally {
            setIsSubmitting(false);
        }
    };

   return (
    <Paper sx={{
        p: {xs: 3, sm: 4, md: 5},
        maxWidth: '12000px',
        width: '100%',
        mx: 'auto',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: '0 8px 24px var(--shadow)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
    }}>
        {/* Decorative accent bar at the top */}
        <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'
        }} />

        <Typography 
            variant="h4" 
            sx={{
                mb: {xs: 3, md: 4}, 
                fontWeight: 700, 
                color: 'var(--foreground)',
                position: 'relative',
                display: 'inline-block',
                pb: 1,
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '3px',
                    backgroundColor: 'var(--primary)'
                }
            }}
        >
            Create New Product
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={{xs: 3, md: 5}}>
                <Grid item xs={12} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography 
                        variant="h6" 
                        sx={{
                            mb: 2, 
                            alignSelf: 'flex-start', 
                            color: 'var(--foreground)',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <ImageIcon fontSize="small" sx={{ color: 'var(--primary)' }} />
                        Product Image
                    </Typography>

                    <Card sx={{
                        width: '100%',
                        height: {xs: '250px', sm: '300px', md: '350px'},
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'var(--hover)',
                        border: '2px dashed var(--border)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: 'var(--primary)',
                            boxShadow: '0 4px 12px var(--shadow)'
                        }
                    }}>
                        {previewImage ? (
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <CardMedia 
                                    component="img" 
                                    sx={{
                                        height: '100%', 
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                    image={previewImage} 
                                    alt="Product preview"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = '/broken-image.jpg';
                                    }}
                                />
                            </Box>
                        ) : (
                            <Box sx={{
                                textAlign: 'center', 
                                p: 3,
                                backgroundColor: 'var(--hover)',
                                borderRadius: '12px',
                                width: '80%'
                            }}>
                                <ImageIcon
                                    sx={{
                                        fontSize: {xs: 50, sm: 60, md: 70}, 
                                        color: 'var(--muted)',
                                        mb: 2
                                    }}
                                />
                                <Typography sx={{color: 'var(--muted)', fontWeight: 500}}>
                                    No image preview available
                                </Typography>
                                <Typography variant="caption" sx={{color: 'var(--muted)', display: 'block', mt: 1}}>
                                    Enter a valid image URL below
                                </Typography>
                            </Box>
                        )}
                    </Card>

                    <Typography 
                        variant="body2" 
                        sx={{
                            color: 'var(--muted)', 
                            mt: 1, 
                            textAlign: 'center',
                            p: 1,
                            borderRadius: '8px',
                            bgcolor: 'var(--hover)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        Enter a valid image URL in the form to update the preview
                    </Typography>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Box sx={{
                        p: {xs: 2, md: 3},
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        bgcolor: 'var(--hover)',
                        height: '100%'
                    }}>
                        <Typography 
                            variant="h6" 
                            sx={{
                                mb: 3, 
                                color: 'var(--foreground)',
                                fontWeight: 600,
                                borderBottom: '1px solid var(--border)',
                                pb: 1
                            }}
                        >
                            Product Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Controller name="name" control={control} render={({field}) => (
                                    <TextField 
                                        {...field} 
                                        label="Product Name" 
                                        fullWidth 
                                        error={!!errors.name}
                                        helperText={errors.name?.message} 
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                padding: '14px 16px'
                                            }
                                        }}
                                    />
                                )}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Controller name="description" control={control} render={({field}) => (
                                    <TextField 
                                        {...field} 
                                        label="Product Description" 
                                        fullWidth 
                                        multiline 
                                        rows={4}
                                        error={!!errors.description} 
                                        helperText={errors.description?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                lineHeight: 1.6
                                            }
                                        }}
                                    />
                                )}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Controller name="image" control={control} render={({field}) => (
                                    <TextField 
                                        {...field} 
                                        label="Image URL" 
                                        fullWidth 
                                        error={!!errors.image}
                                        helperText={errors.image?.message} 
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                padding: '14px 16px'
                                            }
                                        }}
                                    />
                                )}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller name="price" control={control} render={({field}) => (
                                    <TextField 
                                        {...field} 
                                        label="Price" 
                                        type="number" 
                                        fullWidth
                                        error={!!errors.price} 
                                        helperText={errors.price?.message} 
                                        InputProps={{
                                            startAdornment: (
                                                <Typography sx={{ color: 'var(--muted)', mr: 1 }}>$</Typography>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                padding: '14px 16px'
                                            }
                                        }}
                                    />
                                )}/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller name="priceBeforeDiscount" control={control} render={({field}) => (
                                    <TextField 
                                        {...field} 
                                        label="Price Before Discount (optional)" 
                                        type="number"
                                        fullWidth 
                                        error={!!errors.priceBeforeDiscount}
                                        helperText={errors.priceBeforeDiscount?.message} 
                                        InputProps={{
                                            startAdornment: (
                                                <Typography sx={{ color: 'var(--muted)', mr: 1 }}>$</Typography>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                padding: '14px 16px'
                                            }
                                        }}
                                    />
                                )}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Controller name="category" control={control} render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Category"
                                        fullWidth
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--muted)'},
                                            '& .MuiInputBase-input': {
                                                color: 'var(--foreground)',
                                                padding: '14px 16px'
                                            },
                                            '& .MuiMenuItem-root': {
                                                color: 'var(--foreground)'
                                            }
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}/>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isValid || isSubmitting}
                                startIcon={<SaveIcon />}
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    color: 'var(--light)',
                                    fontWeight: 600,
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 10px var(--shadow)',
                                    '&:hover': {
                                        bgcolor: 'var(--primary)',
                                        filter: 'brightness(1.1)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 15px var(--shadow)'
                                    },
                                    '&:disabled': {
                                        bgcolor: 'var(--muted)',
                                        color: 'var(--light)',
                                        opacity: 0.7
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Product'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    </Paper>
);
};

export default CreateProduct;