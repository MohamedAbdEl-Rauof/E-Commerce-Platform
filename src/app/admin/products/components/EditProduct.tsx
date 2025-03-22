import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Box, Button, Card, CardMedia, Grid, MenuItem, Paper, TextField, Typography} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import {toast} from 'react-toastify';
import {Product} from "@/context/ProductContext";
import SaveIcon from "@mui/icons-material/Save";
import {parseISO} from 'date-fns';

const formatDateForInput = (date: string | Date): string => {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return d.toISOString().slice(0, 16);
};

const ProductSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be between 2 and 50 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must not exceed 500 characters'),
    image: z.string().url('Please enter a valid URL'),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Price must be a positive number"
    }).transform(Number),
    priceBeforeDiscount: z.string().refine((val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: "Price before discount must be a positive number or empty"
    }).transform((val) => val === '' ? undefined : Number(val)).optional(),
    categoryId: z.string().nonempty('Category is required'),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
});

type ProductFormData = z.infer<typeof ProductSchema>;

interface EditProductProps {
    products: Product[];
    productId: string | null;
    onBack: () => void;
    categories: Array<{ _id: string; name: string; }>;
    onUpdate: (updatedProduct: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({products, productId, onBack, categories, onUpdate}) => {
    const selectedProduct = products?.find((product) => product._id === productId);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(selectedProduct?.image || '');

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        mode: 'onChange',
        defaultValues: {
            ...selectedProduct,
            createdAt: selectedProduct?.createdAt ? formatDateForInput(selectedProduct.createdAt) : formatDateForInput(new Date()),
            categoryId: selectedProduct?.categoryId || '',
        },
    });

    const watchImage = watch('image');
    const watchName = watch('name');

    useEffect(() => {
        if (selectedProduct) {
            reset({
                ...selectedProduct,
                createdAt: formatDateForInput(selectedProduct.createdAt),
                categoryId: selectedProduct.categoryId,
            });
            setPreviewImage(selectedProduct.image);
        }
    }, [selectedProduct, reset]);

    useEffect(() => {
        if (watchImage) {
            setPreviewImage(watchImage);
        }
    }, [watchImage]);

    const onSubmit = async (data: ProductFormData) => {
        if (!productId) return;
        setIsSubmitting(true);
        try {
            const updatedData = {
                ...data,
                createdAt: new Date(data.createdAt).toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const response = await fetch(`/api/products?id=${productId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Product updated successfully!');
                onUpdate({...responseData, _id: productId});
            } else {
                throw new Error(responseData.error || 'Failed to update Product');
            }
        } catch (error) {
            console.error('Error updating Product:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred while updating the Product');
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
                Edit Product: {watchName || selectedProduct?.name || ''}
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
                                {/* Name field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Product Name
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Enter product name"
                                                    fullWidth
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Description field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Product Description
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Enter product description"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    error={!!errors.description}
                                                    helperText={errors.description?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Image URL field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="image"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Image URL
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Enter image URL"
                                                    fullWidth
                                                    error={!!errors.image}
                                                    helperText={errors.image?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Price field */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Price
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Enter price"
                                                    type="text"
                                                    fullWidth
                                                    error={!!errors.price}
                                                    helperText={errors.price?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Price Before Discount field */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="priceBeforeDiscount"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Price Before Discount
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Enter price before discount"
                                                    type="text"
                                                    fullWidth
                                                    error={!!errors.priceBeforeDiscount}
                                                    helperText={errors.priceBeforeDiscount?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Category field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="categoryId"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Related Category
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    select
                                                    variant="filled"
                                                    placeholder="Select category"
                                                    fullWidth
                                                    error={!!errors.categoryId}
                                                    helperText={errors.categoryId?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                >
                                                    {categories.map((category) => (
                                                        <MenuItem key={category._id} value={category._id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Created At field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="createdAt"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography variant="subtitle2"
                                                            sx={{mb: 1, color: 'var(--text-secondary)'}}>
                                                    Created At
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="filled"
                                                    type="datetime-local"
                                                    fullWidth
                                                    InputLabelProps={{shrink: true}}
                                                    error={!!errors.createdAt}
                                                    helperText={errors.createdAt?.message}
                                                    sx={{
                                                        '& .MuiFilledInput-root': {
                                                            backgroundColor: 'var(--background-default)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'var(--background-paper)',
                                                            },
                                                        },
                                                        '& .MuiFilledInput-input': {
                                                            color: 'var(--text-primary)',
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                        <Button
                                            onClick={onBack}
                                            variant="outlined"
                                            sx={{
                                                color: 'var(--text-primary)',
                                                borderColor: 'var(--border)',
                                                '&:hover': {
                                                    borderColor: 'var(--primary)',
                                                    backgroundColor: 'var(--primary-light)',
                                                },
                                            }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon/>}
                                            // disabled={!isValid || isSubmitting}
                                            sx={{
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
                                            {isSubmitting ? 'Updating...' : 'Update Product'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default EditProduct;