'use client'
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import {CategoryFormProps} from '../types';
import {useCategories} from "@/context/CategoriesContext";

// Define the shape of the category data from API
interface CategoryResponse {
    _id: string;
    name: string;
    image?: string;
    description?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    productCount?: number;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
                                                       mode = 'create',
                                                       categoryId = '',
                                                       onSave,
                                                       onCancel
                                                   }) => {

    const {categories, loading: categoriesLoading, error: categoriesError} = useCategories();
    console.log("mode:", mode, "categoryId:", categoryId);

    const [category, setCategory] = useState<{
        id: string;
        name: string;
        description: string;
        slug: string;
        image: string;
        createdAt?: string;
        updatedAt?: string;
        productCount?: number;
    }>({
        id: '',
        name: '',
        description: '',
        slug: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(categoriesError || null);
    const [success, setSuccess] = useState<string | null>(null);

    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';

    useEffect(() => {
        if (categoryId && (isEditMode || isViewMode) && categories.length > 0) {
            // Find category from context using _id
            const foundCategory = categories.find(cat => cat._id === categoryId) as CategoryResponse | undefined;

            if (foundCategory) {
                // Map the API response structure to our form structure
                setCategory({
                    id: foundCategory._id,
                    name: foundCategory.name,
                    description: foundCategory.description || '',
                    slug: foundCategory.slug || foundCategory.name.toLowerCase().replace(/\s+/g, '-'),
                    image: foundCategory.image || '',
                    createdAt: foundCategory.createdAt,
                    updatedAt: foundCategory.updatedAt,
                    productCount: foundCategory.productCount
                });
            } else {
                setError('Category not found');
            }
        }
    }, [categoryId, isEditMode, isViewMode, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    };

    const generateSlug = () => {
        if (category.name) {
            const slug = category.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setCategory(prev => ({...prev, slug}));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!category.name || !category.slug) {
            setError('Name and slug are required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Prepare data for API
            const categoryData = {
                name: category.name,
                description: category.description,
                slug: category.slug,
                image: category.image
            };

            if (isEditMode) {
                // Replace with actual API call
                // await fetch(`/api/categories/${categoryId}`, {
                //   method: 'PUT',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(categoryData)
                // });
                setSuccess('Category updated successfully');
            } else {
                // Replace with actual API call
                // const response = await fetch('/api/categories', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(categoryData)
                // });
                // const data = await response.json();
                setSuccess('Category created successfully');
            }

            if (onSave) {
                onSave(category);
            }
        } catch (err) {
            setError(isEditMode ? 'Failed to update category' : 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    if (categoriesLoading && (isEditMode || isViewMode)) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h6">
                    {isViewMode ? 'View Category' : isEditMode ? 'Edit Category' : 'Create New Category'}
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={onCancel}
                    variant="outlined"
                >
                    Back to List
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
            {success && <Alert severity="success" sx={{mb: 2}}>{success}</Alert>}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Category Name"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        disabled={isViewMode}
                        autoFocus={!isViewMode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={category.description}
                        onChange={handleChange}
                        disabled={isViewMode}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="slug"
                        label="Slug"
                        name="slug"
                        value={category.slug}
                        onChange={handleChange}
                        disabled={isViewMode}
                        helperText="URL-friendly version of the name"
                    />
                </Grid>
                <Grid item xs={12} sm={3} sx={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        variant="outlined"
                        onClick={generateSlug}
                        disabled={isViewMode || !category.name}
                        sx={{mt: 2}}
                    >
                        Generate Slug
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="image"
                        label="Image URL"
                        name="image"
                        value={category.image}
                        onChange={handleChange}
                        disabled={isViewMode}
                    />
                </Grid>
                {category.image && (
                    <Grid item xs={12}>
                        <Box sx={{mt: 2, textAlign: 'center'}}>
                            <img
                                src={category.image}
                                alt={category.name}
                                style={{maxWidth: '100%', maxHeight: '200px', objectFit: 'contain'}}
                            />
                        </Box>
                    </Grid>
                )}

                {isViewMode && category.productCount !== undefined && (
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="productCount"
                            label="Product Count"
                            value={category.productCount}
                            disabled
                        />
                    </Grid>
                )}

                {isViewMode && category.createdAt && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="createdAt"
                            label="Created At"
                            value={new Date(category.createdAt).toLocaleString()}
                            disabled
                        />
                    </Grid>
                )}

                {isViewMode && category.updatedAt && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="updatedAt"
                            label="Updated At"
                            value={new Date(category.updatedAt).toLocaleString()}
                            disabled
                        />
                    </Grid>
                )}
            </Grid>

            {!isViewMode && (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    sx={{mt: 3, mb: 2}}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <CircularProgress size={24} sx={{mr: 1}}/>
                            {isEditMode ? 'Updating...' : 'Creating...'}
                        </>
                    ) : (
                        isEditMode ? 'Update Category' : 'Create Category'
                    )}
                </Button>
            )}
        </Box>
    );
};

export default CategoryForm;