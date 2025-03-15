import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Box, Button, Card, CardMedia, Grid, IconButton, Paper, Stack, TextField, Typography} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImageIcon from '@mui/icons-material/Image';
import dayjs from 'dayjs';

// Define the validation schema with Zod
const categorySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    image: z.string().url('Please enter a valid URL'),
    createdAt: z.any(), // Changed to accept dayjs object
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface EditCategoryProps {
    categories?: Array<{
        _id: string;
        name: string;
        image: string;
        createdAt: string | Date;
    }>;
    categoryId?: string;
    onBack: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({categories, categoryId, onBack}) => {
    const selectedCategory = categories?.find((category) => category._id === categoryId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(selectedCategory?.image || '');

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
        setValue,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: selectedCategory?.name || '',
            image: selectedCategory?.image || '',
            createdAt: selectedCategory?.createdAt ? dayjs(selectedCategory.createdAt) : dayjs(),
        },
    });

    const onSubmit = async (data: CategoryFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    createdAt: data.createdAt.toISOString(), // Convert dayjs to ISO string
                    updatedAt: new Date(),
                }),
            });

            if (response.ok) {
                alert('Category updated successfully!');
                onBack();
            } else {
                const errorData = await response.json();
                alert(`Failed to update category: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('An error occurred while updating the category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        reset({
            name: selectedCategory?.name || '',
            image: selectedCategory?.image || '',
            createdAt: selectedCategory?.createdAt ? dayjs(selectedCategory.createdAt) : dayjs(),
        });
        setPreviewImage(selectedCategory?.image || '');
    };

    const handleImageChange = (url: string) => {
        setValue('image', url);
        setPreviewImage(url);
    };

    if (!selectedCategory) {
        return (
            <Box sx={{p: 3}}>
                <Typography variant="h5" sx={{color: 'var(--foreground)'}}>Category not found</Typography>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={onBack}
                    sx={{
                        mt: 2,
                        color: 'var(--primary)',
                        '&:hover': {
                            backgroundColor: 'var(--hover)',
                        }
                    }}
                >
                    Back to Categories
                </Button>
            </Box>
        );
    }

    return (
        <Paper
            sx={{
                p: 3,
                maxWidth: '1200px',
                mx: 'auto',
                backgroundColor: 'var(--light)',
                color: 'var(--foreground)',
                boxShadow: '0 4px 12px var(--shadow)',
                borderRadius: '8px',
            }}
        >
            <Box sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        mr: 2,
                        color: 'var(--primary)',
                        '&:hover': {
                            backgroundColor: 'var(--hover)',
                        }
                    }}
                >
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                    Edit Category: {selectedCategory.name}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    {/* Left Column - Image Preview */}
                    <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2, alignSelf: 'flex-start', color: 'var(--primary)' }}>
                            Category Image
                        </Typography>

                        <Card
                            sx={{
                                width: '100%',
                                height: '350px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'var(--background)',
                                border: '1px dashed var(--border)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                mb: 2
                            }}
                        >
                            {previewImage ? (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                    image={previewImage}
                                    alt="Category preview"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = '/broken-image.jpg';
                                    }}
                                />
                            ) : (
                                <Box sx={{ textAlign: 'center', p: 3 }}>
                                    <ImageIcon sx={{ fontSize: 60, color: 'var(--muted)' }} />
                                    <Typography sx={{ color: 'var(--muted)', mt: 1 }}>
                                        No image preview available
                                    </Typography>
                                </Box>
                            )}
                        </Card>

                        <Typography variant="body2" sx={{ color: 'var(--muted)', mt: 1, textAlign: 'center' }}>
                            Enter a valid image URL in the form to update the preview
                        </Typography>
                    </Grid>

                    {/* Right Column - Form Fields */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ p: { xs: 0, md: 2 } }}>
                            <Typography variant="h6" sx={{ mb: 3, color: 'var(--primary)' }}>
                                Category Details
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Category Name"
                                                fullWidth
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--muted)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--foreground)',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        name="image"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Image URL"
                                                fullWidth
                                                error={!!errors.image}
                                                helperText={errors.image?.message}
                                                onChange={(e) => handleImageChange(e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'var(--primary)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--muted)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--foreground)',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Controller
                                            name="createdAt"
                                            control={control}
                                            render={({field}) => (
                                                <DatePicker
                                                    label="Created At"
                                                    value={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            error: !!errors.createdAt,
                                                            helperText: errors.createdAt?.message,
                                                            sx: {
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: 'var(--border)',
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: 'var(--primary)',
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor:
                                                                        