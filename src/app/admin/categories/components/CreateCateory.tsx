import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Box, Button, Card, CardMedia, Grid, Paper, TextField, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import {toast} from 'react-toastify';

// Define the validation schema with Zod
const categorySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be between 2 and 50 characters'),
    image: z.string().url('Please enter a valid URL'),
    createdAt: z.string(),
    updatedAt: z.string(),
});

type UpdatedCategory = {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    productCount: number;
    error: string | null;
};

type CategoryFormData = z.infer<typeof categorySchema>;

interface CreateCategoryProps {
    categories?: Array<{
        _id: string;
        name: string;
        image: string;
        productCount: number;
        createdAt: string | Date;
    }>;
    onUpdate: (updatedCategory: UpdatedCategory) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({categories, onUpdate}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [nameExists, setNameExists] = useState(false);
    const [imageExists, setImageExists] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        watch,
        reset,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            image: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        mode: 'onChange',
    });

    const watchName = watch('name');
    const watchImage = watch('image');

    useEffect(() => {
        if (categories) {
            setNameExists(categories.some(category => category.name.toLowerCase() === watchName.toLowerCase()));
            setImageExists(categories.some(category => category.image === watchImage));
        }
    }, [watchName, watchImage, categories]);

    const onSubmit = async (data: CategoryFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Category created successfully!');
                onUpdate(responseData);
                reset();
                setPreviewImage('');
            } else {
                throw new Error(responseData.error || 'Failed to create category');
            }
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred while creating the category');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Paper
            sx={{
                p: {xs: 2, sm: 3, md: 4},
                maxWidth: '1200px',
                width: '100%',
                mx: 'auto',
                backgroundColor: 'var(--background-paper)',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 12px var(--shadow)',
                borderRadius: '12px',
            }}
        >
            <Typography variant="h4" sx={{mb: {xs: 3, md: 4}, fontWeight: 600, color: 'var(--text-primary)'}}>
                Create New Category
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{xs: 2, md: 4}}>
                    <Grid item xs={12} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h6" sx={{mb: 2, alignSelf: 'flex-start', color: 'var(--text-secondary)'}}>
                            Category Image
                        </Typography>

                        <Card
                            sx={{
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
                                '&:hover': {
                                    borderColor: 'var(--primary)',
                                },
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
                                                        color: 'var(--text-secondary)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--text-primary)',
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
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPreviewImage(e.target.value);
                                                }}
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
                                                        color: 'var(--text-secondary)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--text-primary)',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="createdAt"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Created At"
                                                fullWidth
                                                disabled
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--text-disabled)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--text-disabled)',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="updatedAt"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Updated At"
                                                fullWidth
                                                disabled
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--text-disabled)',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--text-disabled)',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {(nameExists || imageExists) && (
                                    <Grid item xs={12}>
                                        <Typography color="error" sx={{mt: 1}}>
                                            {nameExists ? 'Category name already exists. ' : ''}
                                            {imageExists ? 'Image URL already in use.' : ''}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{mt: {xs: 3, md: 4}, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon/>}
                        disabled={isSubmitting || !isValid || nameExists || imageExists}
                        sx={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--text-on-primary)',
                            '&:hover': {backgroundColor: 'var(--primary-dark)'},
                            '&:disabled': {backgroundColor: 'var(--disabled)'},
                            px: {xs: 3, sm: 4},
                            py: {xs: 1, sm: 1.5},
                        }}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Category'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default CreateCategory;