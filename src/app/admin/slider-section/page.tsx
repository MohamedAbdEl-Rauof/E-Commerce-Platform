"use client"
import React, {useState} from 'react';
import {IconButton, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SliderTable from './components/SliderTable';
import CreateOrEdit from './components/CreateOrEdit';

interface SliderImage {
    id: number;
    sliderId: string;
    url: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
}

const SliderSection = () => {
    const [showCreateOrEdit, setShowCreateOrEdit] = useState(false);
    const [editingImage, setEditingImage] = useState<SliderImage | null>(null);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const handleEdit = (image: SliderImage) => {
        setEditingImage(image);
        setShowCreateOrEdit(true);
    }

    const handleAdd = () => {
        setEditingImage(null);
        setShowCreateOrEdit(true);
    }

    const handleCloseCreateOrEdit = () => {
        setShowCreateOrEdit(false);
        setEditingImage(null);
    }

    const triggerUpdate = () => {
        setUpdateTrigger(prev => prev + 1);
    }

    return (
        <Box sx={{ 
            padding: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1400px',
            margin: '0 auto'
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
            }}>
                <Box sx={{ 
                    typography: 'h5', 
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
                        borderRadius: '2px'
                    }
                }}>
                    Slider Management
                </Box>
                <IconButton 
                    aria-label="add" 
                    onClick={handleAdd}
                    sx={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)',
                        '&:hover': {
                            backgroundColor: 'var(--primary-dark)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 15px rgba(37, 99, 235, 0.3)',
                        },
                        '&:active': {
                            transform: 'translateY(0)',
                            boxShadow: '0 2px 5px rgba(37, 99, 235, 0.2)',
                        },
                        transition: 'all 0.2s ease',
                        width: '42px',
                        height: '42px'
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            
            <Box sx={{ 
                backgroundColor: 'var(--background)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
                <SliderTable onEdit={handleEdit} updateTrigger={updateTrigger}/>
            </Box>
            
            {showCreateOrEdit && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    overflow: 'auto'
                }}>
                    <CreateOrEdit
                        image={editingImage}
                        onClose={handleCloseCreateOrEdit}
                        triggerUpdate={triggerUpdate}
                    />
                </Box>
            )}
        </Box>
    );
}

export default SliderSection;