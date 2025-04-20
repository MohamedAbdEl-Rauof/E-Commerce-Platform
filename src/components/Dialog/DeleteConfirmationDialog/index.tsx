import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isCategory: boolean;
    productCount: number;
    categoryName: string | undefined;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isCategory,
    productCount,
    categoryName,
}) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {`Are you sure you want to delete the "${categoryName}"`} {isCategory ? 'Category' : 'Product'}
                    <br />
                    {isCategory && productCount > 0 && (
                        `This category contains ${productCount} product${productCount > 1 ? 's' : ''}.`
                    )}
                    {!isCategory && productCount < 0 && (
                        `This Product contains ${productCount} product${productCount > 1 ? 's' : ''}.`
                    )}
                    <br />
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;