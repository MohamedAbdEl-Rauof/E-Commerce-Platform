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
import EditIcon from '@mui/icons-material/Edit';
import LabelIcon from '@mui/icons-material/Label';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


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
            p: {xs: 3, sm: 4, md: 5},
            maxWidth: '12000px',
            width: '100%',
            mx: 'auto',
            backgroundColor: 'var(--light)',
            color: 'var(--foreground)',
            boxShadow: '0 8px 24px var(--shadow)',
            borderRadius: '16px',
            transition: 'all 0.3s ease'
        }}>
            <Typography 
                variant="h4" 
                sx={{
                    mb: {xs: 3, md: 4}, 
                    fontWeight: 700, 
                    color: 'var(--foreground)',
                    borderBottom: '2px solid var(--primary)',
                    pb: 2,
                    display: 'inline-block'
                }}
            >
                Edit Product: {watchName || selectedProduct?.name || ''}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{xs: 3, md: 5}}>
                    <Grid item xs={12} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography 
                            variant="h6" 
                            sx={{
                                mb: 2, 
                                alignSelf: 'flex-start', 
                                color: 'var(--muted)',
                                fontWeight: 600
                            }}
                        >
                            Product Image
                        </Typography>

                        <Card sx={{
                            width: '100%',
                            height: {xs: '250px', sm: '300px', md: '350px'},
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--background)',
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
                                <CardMedia 
                                    component="img" 
                                    sx={{
                                        height: '100%', 
                                        objectFit: 'contain',
                                        padding: 2
                                    }}
                                    image={previewImage} 
                                    alt="Product preview"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = '/broken-image.jpg';
                                    }}
                                />
                            ) : (
                                <Box sx={{
                                    textAlign: 'center', 
                                    p: 3,
                                    backgroundColor: 'var(--hover)',
                                    borderRadius: '8px',
                                    width: '80%'
                                }}>
                                    <ImageIcon
                                        sx={{
                                            fontSize: {xs: 50, sm: 60, md: 70}, 
                                            color: 'var(--muted)',
                                            mb: 2
                                        }}
                                    />
                                    <Typography 
                                        sx={{
                                            color: 'var(--muted)', 
                                            fontWeight: 500
                                        }}
                                    >
                                        No image preview available
                                    </Typography>
                                </Box>
                            )}
                        </Card>

                        <Typography 
                            variant="body2" 
                            sx={{
                                color: 'var(--muted)', 
                                mt: 2, 
                                textAlign: 'center',
                                backgroundColor: 'var(--info-light)',
                                p: 2,
                                borderRadius: '8px',
                                width: '100%'
                            }}
                        >
                            <InfoIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                            Enter a valid image URL in the form to update the preview
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{
                            p: {xs: 0, md: 2},
                            backgroundColor: 'var(--background)',
                            borderRadius: '16px',
                            height: '100%'
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{
                                    mb: 3, 
                                    color: 'var(--muted)',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <EditIcon sx={{ mr: 1 }} /> Product Details
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Name field */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <LabelIcon sx={{ fontSize: 16, mr: 1 }} /> Product Name
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    placeholder="Enter product name"
                                                    fullWidth
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
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
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <DescriptionIcon sx={{ fontSize: 16, mr: 1 }} /> Product Description
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    placeholder="Enter product description"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    error={!!errors.description}
                                                    helperText={errors.description?.message}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
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
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <ImageIcon sx={{ fontSize: 16, mr: 1 }} /> Image URL
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    placeholder="Enter image URL"
                                                    fullWidth
                                                    error={!!errors.image}
                                                    helperText={errors.image?.message}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
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
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <AttachMoneyIcon sx={{ fontSize: 16, mr: 1 }} /> Price
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    placeholder="Enter price"
                                                    type="text"
                                                    fullWidth
                                                    error={!!errors.price}
                                                    helperText={errors.price?.message}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
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
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <LocalOfferIcon sx={{ fontSize: 16, mr: 1 }} /> Price Before Discount
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    placeholder="Enter price before discount"
                                                    type="text"
                                                    fullWidth
                                                    error={!!errors.priceBeforeDiscount}
                                                    helperText={errors.priceBeforeDiscount?.message}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Category field */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="categoryId"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <CategoryIcon sx={{ fontSize: 16, mr: 1 }} /> Category
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    select
                                                    variant="outlined"
                                                    placeholder="Select category"
                                                    fullWidth
                                                    error={!!errors.categoryId}
                                                    helperText={errors.categoryId?.message}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
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
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="createdAt"
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: 1, 
                                                        color: 'var(--muted)',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <CalendarTodayIcon sx={{ fontSize: 16, mr: 1 }} /> Created At
                                                </Typography>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    type="datetime-local"
                                                    fullWidth
                                                    error={!!errors.createdAt}
                                                    helperText={errors.createdAt?.message}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: 'var(--light)',
                                                            borderRadius: '8px',
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--primary)',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            color: 'var(--foreground)',
                                                            padding: '14px 16px',
                                                        },
                                                        '& .MuiFormHelperText-root': {
                                                            marginLeft: '4px',
                                                            fontWeight: 500
                                                        }
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>

                                {/* Action buttons */}
                                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        onClick={onBack}
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        sx={{
                                            borderColor: 'var(--muted)',
                                            color: 'var(--muted)',
                                            borderRadius: '8px',
                                            padding: '10px 20px',
                                            '&:hover': {
                                                borderColor: 'var(--primary)',
                                                color: 'var(--primary)',
                                                backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                            },
                                        }}
                                    >
                                        Back to Products
                                    </Button>
                                    
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        disabled={isSubmitting}
                                        sx={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--text-on-image)',
                                            borderRadius: '8px',
                                            padding: '10px 24px',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 10px rgba(var(--primary-rgb), 0.3)',
                                            '&:hover': {
                                                backgroundColor: 'var(--primary-dark)',
                                                boxShadow: '0 6px 15px rgba(var(--primary-rgb), 0.4)',
                                            },
                                            '&:disabled': {
                                                backgroundColor: 'var(--muted)',
                                                color: 'var(--light)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                                Updating...
                                            </>
                                        ) : 'Update Product'}
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

export default EditProduct;