'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import {toast} from "react-toastify";

interface SliderImage {
    id: number;
    url: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
    sliderId: string;
}

interface SliderItem {
    _id: string;
    images: SliderImage[];
}

interface Props {
    onEdit: (image: SliderImage) => void;
    updateTrigger: number;
}

const SliderTable: React.FC<Props> = ({onEdit, updateTrigger}) => {
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/slidersection');
            const data: SliderItem[] = await response.json();
            const allImages = data.flatMap(item => item.images.map(image => ({
                ...image,
                sliderId: item._id
            })));
            setSliderImages(allImages);
        } catch (error) {
            console.error('Error fetching slider items:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData, updateTrigger]);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/slidersection?id=${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                toast.success('Slider image deleted successfully');
                await fetchData();
            } else {
                console.error('Failed to delete image:', data.error);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleDeleteClick = (id: string) => {
        setImageToDelete(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (imageToDelete) {
            await handleDelete(imageToDelete);
            setOpenDialog(false);
            setImageToDelete(null);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setImageToDelete(null);
    };

    const noImages = sliderImages.length === 0;

    return (
        <>
            <TableContainer 
                component={Paper} 
                sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--background)',
                    border: '1px solid rgba(var(--primary-rgb), 0.1)',
                    mb: 4
                }}
            >
                <Table sx={{minWidth: 650}} aria-label="slider items table">
                    <TableHead>
                        <TableRow sx={{ 
                            backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                            '& th': {
                                borderBottom: '2px solid rgba(var(--primary-rgb), 0.2)'
                            }
                        }}>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Image</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Alt Text</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Created At</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Updated At</TableCell>
                            <TableCell sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                color: 'var(--foreground)',
                                py: 2.5
                            }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {noImages ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        gap: 2,
                                        py: 4
                                    }}>
                                        <Box component="img" 
                                            src="/no-data.svg" 
                                            alt="No images" 
                                            sx={{ width: 120, height: 120, opacity: 0.7 }} 
                                        />
                                        <Typography variant="h6" color="var(--muted)">
                                            No slider images found
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sliderImages.map((image) => (
                                <TableRow 
                                    key={`${image.sliderId}-${image.id}`}
                                    sx={{ 
                                        '&:nth-of-type(odd)': { 
                                            backgroundColor: 'rgba(var(--primary-rgb), 0.02)' 
                                        },
                                        '&:hover': { 
                                            backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                            transition: 'background-color 0.2s ease'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <TableCell sx={{ py: 2 }}>
                                        <Box 
                                            sx={{ 
                                                position: 'relative',
                                                width: 80,
                                                height: 60,
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '1px solid rgba(var(--primary-rgb), 0.1)',
                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                                            }}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt}
                                                fill
                                                sizes="80px"
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: 'var(--foreground)',
                                        fontWeight: 500
                                    }}>
                                        {image.alt || <Typography variant="body2" color="var(--muted)" sx={{ fontStyle: 'italic' }}>No alt text</Typography>}
                                    </TableCell>
                                    <TableCell sx={{ color: 'var(--muted)' }}>
                                        {new Date(image.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell sx={{ color: 'var(--muted)' }}>
                                        {new Date(image.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title="Edit image" arrow>
                                                <IconButton 
                                                    aria-label="edit" 
                                                    size="small"
                                                    onClick={() => onEdit(image)}
                                                    sx={{
                                                        backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                                        color: 'var(--primary)',
                                                        width: 36,
                                                        height: 36,
                                                        '&:hover': {
                                                            backgroundColor: 'var(--primary)',
                                                            color: 'var(--text-on-image)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 8px rgba(var(--primary-rgb), 0.3)'
                                                        },
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <EditIcon fontSize="small"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete image" arrow>
                                                <IconButton 
                                                    aria-label="delete" 
                                                    size="small"
                                                    onClick={() => handleDeleteClick(`${image.sliderId}-${image.id}`)}
                                                    sx={{
                                                        color: 'var(--danger)',
                                                        bgcolor: 'color-mix(in srgb, var(--danger) 10%, transparent)',
                                                        '&:hover': {
                                                            bgcolor: 'var(--danger-light)',
                                                            transform: 'translateY(-2px)'
                                                        },
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 5px var(--shadow)'
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small"/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        backgroundColor: 'var(--background)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(var(--primary-rgb), 0.1)',
                        width: { xs: '90%', sm: '450px' },
                        maxWidth: '500px',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle 
                    sx={{ 
                        backgroundColor: 'rgba(var(--error-rgb), 0.05)',
                        color: 'var(--foreground)',
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        py: 2.5,
                        px: 3,
                        borderBottom: '1px solid rgba(var(--error-rgb), 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                    }}
                >
                    <Box 
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(var(--error-rgb), 0.1)',
                            color: 'var(--error)',
                            width: 36,
                            height: 36,
                            borderRadius: '50%'
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </Box>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent sx={{ p: 3, pt: 3 }}>
                    <DialogContentText sx={{ color: 'var(--muted)' }}>
                        Are you sure you want to delete this slider image? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ 
                    p: 2.5, 
                    borderTop: '1px solid rgba(var(--primary-rgb), 0.1)',
                    gap: 1.5,
                    justifyContent: 'flex-end'
                }}>
                    <Button 
                        onClick={handleCloseDialog} 
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            py: 1.2,
                            px: 3.5,
                            minWidth: '100px',
                            borderColor: 'var(--border)',
                            color: 'var(--foreground)',
                            fontWeight: 500,
                            letterSpacing: '0.3px',
                            boxShadow: 'none',
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
                        onClick={handleConfirmDelete} 
                        variant="contained"
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            py: 1.2,
                            px: 3.5,
                            minWidth: '100px',
                            backgroundColor: 'var(--danger, #f44336)',
                            color: 'white',
                            fontWeight: 600,
                            letterSpacing: '0.3px',
                            border: '1px solid transparent',
                            boxShadow: '0 2px 6px rgba(244, 67, 54, 0.25)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                                opacity: 0.6,
                                zIndex: 1,
                            },
                            '&:hover': {
                                backgroundColor: 'var(--danger-dark, #d32f2f)',
                                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
                                transform: 'translateY(-1px)'
                            },
                            '&:active': {
                                backgroundColor: 'var(--danger-darker, #b71c1c)',
                                boxShadow: '0 1px 3px rgba(244, 67, 54, 0.5)',
                                transform: 'translateY(1px)'
                            },
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default SliderTable;