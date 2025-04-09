"use client"
import React, {useState} from 'react';
import {IconButton} from '@mui/material';
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
        <div>
            <h1 className="text-center">Slider Section</h1>
            <SliderTable onEdit={handleEdit} updateTrigger={updateTrigger}/>
            <IconButton aria-label="add" size="small" onClick={handleAdd}>
                <AddIcon fontSize="inherit"/>
            </IconButton>
            {showCreateOrEdit && (
                <CreateOrEdit
                    image={editingImage}
                    onClose={handleCloseCreateOrEdit}
                    triggerUpdate={triggerUpdate}
                />
            )}
        </div>
    );
}

export default SliderSection;