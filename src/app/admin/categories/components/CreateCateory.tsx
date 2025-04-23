import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Card, CardMedia, Grid, Paper, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import { toast } from 'react-toastify';

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

const CreateCategory: React.FC<CreateCategoryProps> = ({ categories, onUpdate }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [nameExists, setNameExists] = useState(false);
    const [imageExists, setImageExists] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
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
                headers: { 'Content-Type': 'application/json' },
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
                p: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1200px',
                width: '100%',
                mx: 'auto',
                backgroundColor: 'var(--light)',
                color: 'var(--foreground)',
                boxShadow: '0 8px 24px var(--shadow)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
            }}
            elevation={3}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: { xs: 3, md: 4 },
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    borderBottom: '2px solid var(--primary)',
                    pb: 1,
                    display: 'inline-block'
                }}
            >
                Create New Category
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                alignSelf: 'flex-start',
                                color: 'var(--foreground)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                '&::before': {
                                    content: '""',
                                    display: 'inline-block',
                                    width: '4px',
                                    height: '24px',
                                    backgroundColor: 'var(--primary)',
                                    marginRight: '8px',
                                    borderRadius: '2px'
                                }
                            }}
                        >
                            Category Image
                        </Typography>

                        <Card
                            sx={{
                                width: '100%',
                                height: { xs: '250px', sm: '300px', md: '350px' },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'var(--background)',
                                border: '2px dashed var(--border)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                mb: 2,
                                transition: 'all 0.3s ease',
                                boxShadow: 'inset 0 0 10px var(--shadow)',
                                '&:hover': {
                                    borderColor: 'var(--primary)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'inset 0 0 15px var(--shadow), 0 5px 15px var(--shadow)',
                                },
                            }}
                        >
                            {previewImage ? (
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
                                    alt="Category preview"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = '/broken-image.jpg';
                                    }}
                                />
                            ) : (
                                <Box sx={{ textAlign: 'center', p: 3 }}>
                                    <ImageIcon
                                        sx={{
                                            fontSize: { xs: 50, sm: 60, md: 70 },
                                            color: 'var(--muted)',
                                            opacity: 0.7
                                        }}
                                    />
                                    <Typography sx={{ color: 'var(--foreground)', mt: 2, fontWeight: 500 }}>
                                        No image preview available
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
                                fontStyle: 'italic',
                                backgroundColor: 'var(--hover)',
                                p: 1,
                                borderRadius: '4px',
                                width: '100%'
                            }}
                        >
                            Enter a valid image URL in the form to update the preview
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{ p: { xs: 0, md: 2 } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3,
                                    color: 'var(--foreground)',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '&::before': {
                                        content: '""',
                                        display: 'inline-block',
                                        width: '4px',
                                        height: '24px',
                                        backgroundColor: 'var(--secondary)',
                                        marginRight: '8px',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
                                Category Details
                            </Typography>

                            <Grid container spacing={3} className="scroll-container">
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Category Name"
                                                fullWidth
                                                error={!!errors.name || nameExists}
                                                helperText={errors.name?.message || (nameExists ? 'This category name already exists' : '')}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                            borderWidth: '1.5px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'var(--accent)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'var(--primary)',
                                                            borderWidth: '2px',
                                                        },
                                                        backgroundColor: 'var(--light)',
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--foreground)',
                                                        fontWeight: 500,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--foreground)',
                                                        padding: '14px 16px',
                                                    },
                                                    '& .MuiFormHelperText-root': {
                                                        fontWeight: 500,
                                                        color: errors.name || nameExists ? 'var(--danger)' : 'var(--muted)',
                                                    },
                                                    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--danger) !important',
                                                    },
                                                    '& .Mui-error.MuiFormLabel-root': {
                                                        color: 'var(--danger) !important',
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
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Image URL"
                                                fullWidth
                                                error={!!errors.image || imageExists}
                                                helperText={errors.image?.message || (imageExists ? 'This image URL is already in use' : '')}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPreviewImage(e.target.value);
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                            borderWidth: '1.5px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'var(--accent)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'var(--primary)',
                                                            borderWidth: '2px',
                                                        },
                                                        backgroundColor: 'var(--light)',
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--foreground)',
                                                        fontWeight: 500,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--foreground)',
                                                        padding: '14px 16px',
                                                    },
                                                    '& .MuiFormHelperText-root': {
                                                        fontWeight: 500,
                                                        color: errors.image || imageExists ? 'var(--danger)' : 'var(--muted)',
                                                    },
                                                    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--danger) !important',
                                                    },
                                                    '& .Mui-error.MuiFormLabel-root': {
                                                        color: 'var(--danger) !important',
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
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Created At"
                                                fullWidth
                                                disabled
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                            borderWidth: '1.5px',
                                                        },
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--muted)',
                                                        fontWeight: 500,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#ffcc00', /* Bright gold/yellow for high visibility */
                                                        padding: '14px 16px',
                                                        fontWeight: 700, /* Extra bold */
                                                        textShadow: '0 0 2px rgba(0,0,0,0.5)', /* Stronger text shadow */
                                                        letterSpacing: '0.5px', /* Slightly increase letter spacing */
                                                    },
                                                }}
                                                InputProps={{
                                                    style: { 
                                                        backgroundColor: '#333344', /* Dark blue-gray background that works in both modes */
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="updatedAt"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Updated At"
                                                fullWidth
                                                disabled
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                            borderWidth: '1.5px',
                                                        },
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--muted)',
                                                        fontWeight: 500,
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#ffcc00', /* Bright gold/yellow for high visibility */
                                                        padding: '14px 16px',
                                                        fontWeight: 700, /* Extra bold */
                                                        textShadow: '0 0 2px rgba(0,0,0,0.5)', /* Stronger text shadow */
                                                        letterSpacing: '0.5px', /* Slightly increase letter spacing */
                                                    },
                                                }}
                                                InputProps={{
                                                    style: { 
                                                        backgroundColor: '#333344', /* Dark blue-gray background that works in both modes */
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        disabled={!isValid || isSubmitting || nameExists || imageExists}
                                        sx={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--light)',
                                            fontWeight: 600,
                                            py: 1.5,
                                            px: 4,
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 10px var(--shadow)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'var(--accent)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 15px var(--shadow)',
                                            },
                                            '&:disabled': {
                                                backgroundColor: 'var(--muted)',
                                                color: 'var(--light)',
                                                opacity: 0.7,
                                            },
                                            width: { xs: '100%', sm: 'auto' },
                                            minWidth: '180px',
                                        }}
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Category'}
                                    </Button>

                                    {(nameExists || imageExists) && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'var(--danger)',
                                                mt: 2,
                                                p: 1.5,
                                                borderRadius: '4px',
                                                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                                                border: '1px solid var(--danger)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {nameExists && imageExists
                                                ? 'Both category name and image URL already exist.'
                                                : nameExists
                                                    ? 'Please use a unique category name.'
                                                    : 'Please use a unique image URL.'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper >
    );
};

export default CreateCategory;