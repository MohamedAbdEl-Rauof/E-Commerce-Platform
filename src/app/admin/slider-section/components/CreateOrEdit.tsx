import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardMedia, Grid, Paper, TextField, Typography} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import {toast} from 'react-toastify';

interface SliderImage {
    id: number;
    sliderId: string;
    url: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
}

interface CreateOrEditProps {
    image: SliderImage | null;
    onClose: () => void;
    triggerUpdate: () => void;
}

const CreateOrEdit: React.FC<CreateOrEditProps> = ({image, onClose, triggerUpdate}) => {
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [isFormModified, setIsFormModified] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(true);

    useEffect(() => {
        if (image) {
            setUrl(image.url);
            setAlt(image.alt);
        } else {
            setUrl('');
            setAlt('');
        }
        setIsFormModified(false);
        setIsUrlValid(true);
    }, [image]);

    const validateUrl = (url: string) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        setIsUrlValid(validateUrl(newUrl));
        setIsFormModified(true);
    };

    const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlt(e.target.value);
        setIsFormModified(true);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = '/api/slidersection';
            const method = image ? 'PUT' : 'POST';
            const body = image
                ? JSON.stringify({id: image.id, url, alt})
                : JSON.stringify({url, alt});

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Failed to ${image ? 'update' : 'create'} slider image`);
            }

            toast.success(`Slider image ${image ? 'updated' : 'created'} successfully`);
            triggerUpdate();
            onClose();
        } catch (error) {
            console.error(`Error ${image ? 'updating' : 'creating'} slider image:`, error);
            let errorMessage = 'An unexpected error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
    };
    const isSubmitDisabled = !isFormModified || !url || !alt || !isUrlValid;

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
                {image ? 'Edit Slider Image' : 'Create New Slider Image'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={{xs: 2, md: 4}}>
                    <Grid item xs={12} md={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h6" sx={{mb: 2, alignSelf: 'flex-start', color: 'var(--text-secondary)'}}>
                            Image Preview
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
                            {url ? (
                                <CardMedia
                                    component="img"
                                    sx={{height: '100%', objectFit: 'contain'}}
                                    image={url}
                                    alt={alt}
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
                                Image Details
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Image URL"
                                        fullWidth
                                        value={url}
                                        onChange={handleUrlChange}
                                        required
                                        error={!isUrlValid}
                                        helperText={!isUrlValid ? "Please enter a valid URL" : ""}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'},
                                            '& .MuiFormHelperText-root': {
                                                color: 'var(--error)',
                                                marginLeft: 0,
                                                marginTop: '8px',
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Alt Text"
                                        fullWidth
                                        value={alt}
                                        onChange={handleAltChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {borderColor: 'var(--border)'},
                                                '&:hover fieldset': {borderColor: 'var(--primary)'},
                                                '&.Mui-focused fieldset': {borderColor: 'var(--primary)'}
                                            },
                                            '& .MuiInputLabel-root': {color: 'var(--text-secondary)'},
                                            '& .MuiInputBase-input': {color: 'var(--text-primary)'}
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2}}>
                                        <Button onClick={onClose} variant="outlined" sx={{
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border)',
                                            '&:hover': {borderColor: 'var(--primary)'}
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon/>}
                                            disabled={isSubmitDisabled}
                                            sx={{
                                                backgroundColor: 'var(--primary)',
                                                color: 'var(--text-primary)',
                                                '&:hover': {
                                                    backgroundColor: 'var(--primary-dark)',
                                                },
                                            }}
                                        >
                                            {image ? 'Update' : 'Create'}
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
}

export default CreateOrEdit;