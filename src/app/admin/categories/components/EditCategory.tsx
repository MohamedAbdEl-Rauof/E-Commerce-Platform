import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Box,
    Button,
    Card,
    CardMedia,
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImageIcon from '@mui/icons-material/Image';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';


// Define the validation schema with Zod
const categorySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be between 2 and 50 characters'),
    image: z.string().url('Please enter a valid URL'),
    createdAt: z.any(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type UpdatedCategory = {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    productCount: number;
    error: string | null;
};

interface EditCategoryProps {
    categories?: Array<{
        _id: string;
        name: string;
        image: string;
        productCount: number;
        createdAt: string | Date;
    }>;
    categoryId?: string;
    onBack: () => void;
    onUpdate: (updatedCategory: UpdatedCategory) => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({categories, categoryId, onBack, onUpdate}) => {
    const selectedCategory = categories?.find((category) => category._id === categoryId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(selectedCategory?.image || '');
    const [isLoading, setIsLoading] = useState(true);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isDirty},
        setValue,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: selectedCategory?.name || '',
            image: selectedCategory?.image || '',
            createdAt: selectedCategory?.createdAt ? dayjs(selectedCategory.createdAt) : dayjs(),
        },
    });

    useEffect(() => {
        if (selectedCategory) {
            reset({
                name: selectedCategory.name,
                image: selectedCategory.image,
                createdAt: dayjs(selectedCategory.createdAt),
            });
            setPreviewImage(selectedCategory.image);
        }
        setIsLoading(false);
    }, [selectedCategory, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/categories?id=${categoryId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...data,
                    createdAt: data.createdAt.toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });

            const responseData: UpdatedCategory = await response.json();

            if (response.ok) {
                toast.success('Category updated successfully!');
                onUpdate({
                    ...responseData,
                    productCount: selectedCategory?.productCount || 0,
                });
            } else {
                throw new Error(responseData.error || 'Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred while updating the category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmReset = () => {
        reset({
            name: selectedCategory?.name || '',
            image: selectedCategory?.image || '',
            createdAt: selectedCategory?.createdAt ? dayjs(selectedCategory.createdAt) : dayjs(),
        });
        setPreviewImage(selectedCategory?.image || '');
    };

    const handleImageChange = useCallback((url: string) => {
        setValue('image', url);
        setPreviewImage(url);
    }, [setValue]);

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

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
                        '&:hover': {backgroundColor: 'var(--hover)'},
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
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1200px',
            mx: 'auto',
            backgroundColor: 'var(--card-background, var(--light))',
            color: 'var(--foreground)',
            boxShadow: '0 8px 20px var(--shadow)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle, var(--border))',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
        }}
    >
        <Box 
            sx={{
                mb: 4, 
                display: 'flex', 
                alignItems: 'center',
                pb: 2,
                borderBottom: '1px solid var(--border-subtle, var(--border))'
            }}
        >
            <IconButton
                onClick={onBack}
                sx={{
                    mr: 2,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--primary-light, var(--hover))',
                    '&:hover': {
                        backgroundColor: 'var(--primary-lighter, var(--hover))',
                        transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                }}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography 
                variant="h5" 
                sx={{
                    fontWeight: 700, 
                    color: 'var(--foreground)',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '2px',
                    }
                }}
            >
                Edit Category: <span style={{ color: 'var(--primary)' }}>{selectedCategory.name}</span>
            </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
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
                            '&::before': {
                                content: '""',
                                display: 'inline-block',
                                width: '4px',
                                height: '20px',
                                backgroundColor: 'var(--primary)',
                                marginRight: '8px',
                                borderRadius: '4px',
                            }
                        }}
                    >
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
                            border: '2px dashed var(--border)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 12px var(--shadow)',
                                borderColor: 'var(--primary-light, var(--primary))',
                            }
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
                                        transform: 'scale(1.02)',
                                    }
                                }}
                                image={previewImage}
                                alt="Category preview"
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                    e.currentTarget.src = '/broken-image.jpg';
                                }}
                            />
                        ) : (
                            <Box sx={{textAlign: 'center', p: 3}}>
                                <ImageIcon sx={{fontSize: 80, color: 'var(--muted)'}}/>
                                <Typography sx={{color: 'var(--muted)', mt: 1, fontWeight: 500}}>
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
                            backgroundColor: 'var(--background-subtle, var(--background))',
                            p: 1.5,
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            width: '100%'
                        }}
                    >
                        Enter a valid image URL in the form to update the preview
                    </Typography>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Box 
                        sx={{
                            p: { xs: 2, md: 3 },
                            backgroundColor: 'var(--background-subtle, var(--background))',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                        }}
                    >
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
                                    height: '20px',
                                    backgroundColor: 'var(--primary)',
                                    marginRight: '8px',
                                    borderRadius: '4px',
                                }
                            }}
                        >
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
                                                        borderWidth: '1.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'var(--primary)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'var(--primary)',
                                                        borderWidth: '2px',
                                                    },
                                                    backgroundColor: 'var(--input-background, var(--light))',
                                                    borderRadius: '8px',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'var(--muted)',
                                                    fontWeight: 500,
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'var(--foreground)',
                                                    padding: '14px 16px',
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontWeight: 500,
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
                                                handleImageChange(e.target.value);
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'var(--border)',
                                                        borderWidth: '1.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'var(--primary)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'var(--primary)',
                                                        borderWidth: '2px',
                                                    },
                                                    backgroundColor: 'var(--input-background, var(--light))',
                                                    borderRadius: '8px',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'var(--muted)',
                                                    fontWeight: 500,
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'var(--foreground)',
                                                    padding: '14px 16px',
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontWeight: 500,
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
                                                {...field}
                                                label="Created At"
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        sx: {
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'var(--border)',
                                                                    borderWidth: '1.5px',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'var(--primary)',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'var(--primary)',
                                                                    borderWidth: '2px',
                                                                },
                                                                backgroundColor: 'var(--input-background, var(--light))',
                                                                borderRadius: '8px',
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: 'var(--muted)',
                                                                fontWeight: 500,
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                color: 'var(--foreground)',
                                                                padding: '14px 16px',
                                                            },
                                                            '& .MuiFormHelperText-root': {
                                                                fontWeight: 500,
                                                            },
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'var(--primary)',
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="flex-end" 
                sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: '1px solid var(--border-subtle, var(--border))'
                }}
            >
                <Button
                    startIcon={<RestartAltIcon/>}
                    onClick={confirmReset}
                    disabled={isSubmitting || !isDirty}
                    sx={{
                        color: 'var(--muted)',
                        fontWeight: 600,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'var(--hover)',
                            transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                            color: 'var(--muted-light, var(--muted))',
                            opacity: 0.7,
                        }
                    }}
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    disabled={isSubmitting || !isDirty}
                    sx={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--light)',
                        fontWeight: 600,
                        padding: '10px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px var(--primary-shadow, rgba(0,0,0,0.1))',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'var(--primary-dark)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 15px var(--primary-shadow, rgba(0,0,0,0.15))',
                        },
                        '&:disabled': {
                            backgroundColor: 'var(--primary-light, var(--primary))',
                            opacity: 0.7,
                        }
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <CircularProgress size={20} sx={{ color: 'var(--light)', mr: 1 }} />
                            Saving...
                        </>
                    ) : 'Save Changes'}
                </Button>
            </Stack>
        </form>
    </Paper>
    );
};

export default EditCategory;