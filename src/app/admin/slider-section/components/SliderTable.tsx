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
    TableRow
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


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="slider items table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Alt Text</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sliderImages.map((image) => (
                            <TableRow key={`${image.sliderId}-${image.id}`}>
                                <TableCell>
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        width={50}
                                        height={50}
                                        style={{objectFit: 'cover'}}
                                    />
                                </TableCell>
                                <TableCell>{image.alt}</TableCell>
                                <TableCell>{new Date(image.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(image.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" size="small"
                                                onClick={() => onEdit(image)}
                                    >
                                        <EditIcon fontSize="inherit"/>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small"
                                                onClick={() => handleDeleteClick(`${image.sliderId}-${image.id}`)}
                                    >
                                        <DeleteIcon fontSize="inherit"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this image? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

export default SliderTable;