import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Box, Button, Card, CardMedia, Grid, MenuItem, Paper, TextField, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import {toast} from 'react-toastify';

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
    categories: Array<{
        _id: string;
        name: string;
    }>;
    onUpdate: (updatedProduct: ProductFormData & { _id: string }) => void;
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
            p: {xs: 2, sm: 3, md: 4},
            maxWidth: '1200px',
            width: '100%',
            mx: 'auto',
            backgroundColor: 'var(--background-paper)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 12px var(--shadow)',
            borderRadius: '12px'
        }}>
            <Typography variant="h4" sx={{mb: {xs: 3, md: 4}, fontWeight: 600, color: 'var(--text-primary)'}}>
                Create New Product
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{xs: 2, md: 4}}>
                    <Grid item xs={12} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h6" sx={{mb: 2, alignSelf: 'flex-start', color: 'var(--text-secondary)'}}>
                            Product Image
                        </Typography>

                        <Card sx={{
                            width: '100%',
                            height: {xs: '250px', sm: '300px', md: '350px'},
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--background-default)',
                            border: '2px dashed var(--border)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {borderColor: 'var(--primary)'}
                        }}>
                            {previewImage ? (
                                <CardMedia component="img" sx={{height: '100%', objectFit: 'contain'}}
                                           image={previewImage} alt="Product preview"
                                           onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                               e.currentTarget.src = '/broken-image.jpg';
                                           }}/>
                            ) : (
                                <Box sx={{textAlign: 'center', p: 3}}>
                                    <ImageIcon
                                        sx={{fontSize: {xs: 40, sm: 50, md: 60}, color: 'var(--text-disabled)'}}/>
                                    <Typography sx={{color: 'var(--text-disabled)', mt: 1}}>
                                        No image preview available
                                    </Typography>
                                </Box>
                            )}
                        </Card>

                        <Typography variant="body2" sx={{color: 'var(--text-secondary)', mt: 1, textAlign: 'center'}}>
                            Enter a valid image URL in the form to update the preview
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{p: {xs: 0, md: 2}}}>
                            <Typography variant="h6" sx={{mb: 3, color: 'var(--text-secondary)'}}>
                                Product Details
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Controller name="name" control={control} render={({field}) => (
                                        <TextField {...field} label="Product Name" fullWidth error={!!errors.name}
                                                   helperText={errors.name?.message} sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                        }}/>
                                    )}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller name="description" control={control} render={({field}) => (
                                        <TextField {...field} label="Product Description" fullWidth multiline rows={4}
                                                   error={!!errors.description} helperText={errors.description?.message}
                                                   sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                           '& fieldset': {borderColor: 'var(--border)'},
                                                           '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                           '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                                       },
                                                       '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                                       '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                                   }}/>
                                    )}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller name="image" control={control} render={({field}) => (
                                        <TextField {...field} label="Image URL" fullWidth error={!!errors.image}
                                                   helperText={errors.image?.message} sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                        }}/>
                                    )}/>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller name="price" control={control} render={({field}) => (
                                        <TextField {...field} label="Price" type="number" fullWidth
                                                   error={!!errors.price} helperText={errors.price?.message} sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                        }}/>
                                    )}/>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller name="priceBeforeDiscount" control={control} render={({field}) => (
                                        <TextField {...field} label="Price Before Discount (optional)" type="number"
                                                   fullWidth error={!!errors.priceBeforeDiscount}
                                                   helperText={errors.priceBeforeDiscount?.message} sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                        }}/>
                                    )}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller name="category" control={control} render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Related Category"
                                            fullWidth
                                            error={!!errors.category}
                                            helperText={errors.category?.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {borderColor: 'var(--border)'},
                                                    '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                    '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                                },
                                                '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                                '& .MuiInputBase-input': {color: 'var(--text-primary)'}
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

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                        disabled={!isValid || isSubmitting}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--text-primary)',
                                            '&:hover': {
                                                backgroundColor: 'var(--primary-dark)',
                                            },
                                            '&:disabled': {
                                                backgroundColor: 'var(--disabled)',
                                                color: 'var(--text-disabled)',
                                            },
                                        }}
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Product'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default CreateProduct;