import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardMedia, Grid, Paper, TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

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

const CreateOrEdit: React.FC<CreateOrEditProps> = ({ image, onClose, triggerUpdate }) => {
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
                ? JSON.stringify({ id: image.id, url, alt })
                : JSON.stringify({ url, alt });

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
            p: { xs: 3, sm: 4, md: 5 },
            maxWidth: '1200px',
            width: '100%',
            mx: 'auto',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            boxShadow: '0 8px 24px rgba(var(--shadow-rgb), 0.12)',
            borderRadius: '16px',
            border: '1px solid rgba(var(--primary-rgb), 0.08)',
            overflow: 'hidden'
        }}>
            <Typography
                variant="h4"
                sx={{
                    mb: { xs: 3, md: 4 },
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: '60px',
                        height: '4px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '2px'
                    }
                }}
            >
                {image ? 'Edit Slider Image' : 'Create New Slider Image'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                alignSelf: 'flex-start',
                                color: 'var(--foreground)',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    width: '4px',
                                    height: '18px',
                                    backgroundColor: 'var(--primary)',
                                    borderRadius: '2px'
                                }
                            }}
                        >
                            Image Preview
                        </Typography>

                        <Card sx={{
                            width: '100%',
                            height: { xs: '250px', sm: '300px', md: '350px' },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--card-bg, rgba(var(--primary-rgb), 0.03))',
                            border: '2px dashed rgba(var(--primary-rgb), 0.2)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 2,
                            transition: 'all 0.3s ease',
                            boxShadow: url ? '0 4px 20px rgba(var(--shadow-rgb), 0.1)' : 'none',
                            '&:hover': {
                                borderColor: 'var(--primary)',
                                boxShadow: '0 6px 24px rgba(var(--shadow-rgb), 0.15)'
                            }
                        }}>
                            {url ? (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.02)'
                                        }
                                    }}
                                    image={url}
                                    alt={alt}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = '/broken-image.jpg';
                                    }}
                                />
                            ) : (
                                <Box sx={{
                                    textAlign: 'center',
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    width: '100%'
                                }}>
                                    <Box sx={{
                                        backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                                        borderRadius: '50%',
                                        width: { xs: 80, sm: 100 },
                                        height: { xs: 80, sm: 100 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2
                                    }}>
                                        <ImageIcon
                                            sx={{
                                                fontSize: { xs: 40, sm: 50 },
                                                color: 'var(--primary)'
                                            }}
                                        />
                                    </Box>
                                    <Typography sx={{
                                        color: 'var(--muted)',
                                        fontWeight: 500,
                                        fontSize: '1rem'
                                    }}>
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
                                backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                py: 1.5,
                                px: 2,
                                borderRadius: '8px',
                                border: '1px solid rgba(var(--primary-rgb), 0.1)'
                            }}
                        >
                            Enter a valid image URL in the form to update the preview
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{
                            p: { xs: 0, md: 3 },
                            backgroundColor: { xs: 'transparent', md: 'rgba(var(--primary-rgb), 0.02)' },
                            borderRadius: '12px',
                            border: { xs: 'none', md: '1px solid rgba(var(--primary-rgb), 0.08)' }
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3,
                                    color: 'var(--foreground)',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        width: '4px',
                                        height: '18px',
                                        backgroundColor: 'var(--primary)',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
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
                                                borderRadius: '10px',
                                                backgroundColor: 'var(--input-bg, rgba(255, 255, 255, 0.05))',
                                                '& fieldset': { borderColor: 'rgba(var(--primary-rgb), 0.2)' },
                                                '&:hover fieldset': { borderColor: 'var(--primary)' },
                                                '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                                                '& input': {
                                                    padding: '14px 16px',
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'var(--muted)',
                                                '&.Mui-focused': {
                                                    color: 'var(--primary)'
                                                }
                                            },
                                            '& .MuiInputBase-input': { color: 'var(--foreground)' },
                                            '& .MuiFormHelperText-root': {
                                                color: 'var(--error)',
                                                marginLeft: 0,
                                                marginTop: '8px',
                                                fontWeight: 500
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
                                                borderRadius: '10px',
                                                backgroundColor: 'var(--input-bg, rgba(255, 255, 255, 0.05))',
                                                '& fieldset': { borderColor: 'rgba(var(--primary-rgb), 0.2)' },
                                                '&:hover fieldset': { borderColor: 'var(--primary)' },
                                                '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                                                '& input': {
                                                    padding: '14px 16px',
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'var(--muted)',
                                                '&.Mui-focused': {
                                                    color: 'var(--primary)'
                                                }
                                            },
                                            '& .MuiInputBase-input': { color: 'var(--foreground)' }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                        mt: 3,
                                        pt: 3,
                                        borderTop: '1px solid rgba(var(--primary-rgb), 0.1)'
                                    }}>
                                        <Button
                                            onClick={onClose}
                                            variant="outlined"
                                            sx={{
                                                color: 'var(--foreground)',
                                                borderColor: 'rgba(var(--primary-rgb), 0.3)',
                                                borderRadius: '10px',
                                                textTransform: 'none',
                                                py: 1.2,
                                                px: 3,
                                                fontWeight: 500,
                                                '&:hover': {
                                                    borderColor: 'var(--primary)',
                                                    backgroundColor: 'rgba(var(--primary-rgb), 0.04)',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 3px 8px rgba(var(--shadow-rgb), 0.08)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon sx={{ fontSize: '1.2rem' }} />}
                                            disabled={isSubmitDisabled}
                                            sx={{
                                                backgroundColor: '#2563eb', // Reliable blue color
                                                color: '#ffffff',
                                                borderRadius: '10px',
                                                textTransform: 'none',
                                                py: 1.2,
                                                px: 3,
                                                fontWeight: 600,
                                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                                                    opacity: 0.7,
                                                    zIndex: 1,
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#1d4ed8', // Darker blue on hover
                                                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
                                                    transform: 'translateY(-2px)',
                                                },
                                                '&:active': {
                                                    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.25)',
                                                    transform: 'translateY(1px)',
                                                    backgroundColor: '#1e40af', // Even darker on active
                                                },
                                                '&.Mui-disabled': {
                                                    backgroundColor: 'rgba(37, 99, 235, 0.4)',
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    boxShadow: 'none'
                                                },
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                // Light mode specific adjustments
                                                '@media (prefers-color-scheme: light)': {
                                                    backgroundColor: '#2563eb',
                                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.2)',
                                                    '&:hover': {
                                                        backgroundColor: '#1d4ed8',
                                                        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)',
                                                    },
                                                    '&:active': {
                                                        backgroundColor: '#1e40af',
                                                        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.2)',
                                                    },
                                                    '&.Mui-disabled': {
                                                        backgroundColor: 'rgba(37, 99, 235, 0.5)',
                                                        color: 'rgba(255, 255, 255, 0.9)',
                                                    }
                                                }
                                            }}
                                        >
                                            {image ? 'Update Image' : 'Create Image'}
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