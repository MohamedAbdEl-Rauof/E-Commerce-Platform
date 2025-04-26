import React from 'react';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Box,
    Typography,
    Stack
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
            PaperProps={{
                elevation: 3,
                sx: {
                    backgroundColor: 'var(--light)',
                    color: 'var(--foreground)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '480px',
                    border: '1px solid var(--border)'
                }
            }}
        >
            <DialogTitle 
                id="delete-dialog-title"
                sx={{
                    py: 2.5,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    fontWeight: 600,
                    fontSize: '1.25rem'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)', 
                        color: 'var(--danger)',
                        borderRadius: '50%',
                        p: 1,
                        width: 40,
                        height: 40
                    }}
                >
                    <DeleteOutlineIcon />
                </Box>
                Confirm Deletion
            </DialogTitle>
            
            <DialogContent sx={{ pt: 10, pb: 1, px: 3 }}>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'var(--foreground)', 
                        mb: 3,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        mt:2
                    }}
                >
                    Are you sure you want to delete the{' '}
                    <Box component="span" sx={{ fontWeight: 600, color: 'var(--primary)' }}>
                        "{categoryName}"
                    </Box>
                    {' '}{isCategory ? 'category' : 'product'}?
                </Typography>
                
                <Stack spacing={2} sx={{ mb: 2 }}>
                    {isCategory && productCount > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                p: 2,
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                                border: '1px solid rgba(255, 193, 7, 0.2)',
                            }}
                        >
                            <WarningAmberIcon sx={{ color: 'var(--warning)', flexShrink: 0, mt: 0.2 }} />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'var(--foreground)', 
                                    fontWeight: 500,
                                    lineHeight: 1.5
                                }}
                            >
                                This category contains <strong>{productCount}</strong> product{productCount > 1 ? 's' : ''}.
                                Deleting it may affect related data.
                            </Typography>
                        </Box>
                    )}
                    
                    {!isCategory && productCount < 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                p: 2,
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                                border: '1px solid rgba(255, 193, 7, 0.2)',
                            }}
                        >
                            <WarningAmberIcon sx={{ color: 'var(--warning)', flexShrink: 0, mt: 0.2 }} />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'var(--foreground)', 
                                    fontWeight: 500,
                                    lineHeight: 1.5
                                }}
                            >
                                This product contains <strong>{Math.abs(productCount)}</strong> related item{Math.abs(productCount) > 1 ? 's' : ''}.
                                Deleting it may affect related data.
                            </Typography>
                        </Box>
                    )}
                    
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1.5,
                            p: 2,
                            borderRadius: '8px',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)', 
                            border: '1px solid rgba(220, 53, 69, 0.2)',
                        }}
                    >
                        <InfoOutlinedIcon sx={{ color: 'var(--danger)', flexShrink: 0, mt: 0.2 }} />
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'var(--foreground)', 
                                fontWeight: 500,
                                lineHeight: 1.5
                            }}
                        >
                            This action is permanent and cannot be undone. All associated data will be permanently removed.
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>
            
            <DialogActions 
                sx={{ 
                    px: 3, 
                    py: 2.5,
                    borderTop: '1px solid var(--border)',
                    backgroundColor: 'var(--light)', 
                    justifyContent: 'flex-end',
                    gap: 1.5
                }}
            >
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    sx={{
                        color: 'var(--muted)',
                        borderColor: 'var(--border)',
                        backgroundColor: 'transparent',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'var(--hover)',
                            borderColor: 'var(--primary)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm} 
                    autoFocus 
                    variant="contained"
                    startIcon={<DeleteOutlineIcon />}
                    sx={{
                        backgroundColor: 'var(--danger)',
                        color: 'var(--light)',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.25)', 
                        '&:hover': {
                            backgroundColor: 'color-mix(in srgb, var(--danger) 85%, white)',
                            boxShadow: '0 4px 12px rgba(220, 53, 69, 0.35)' 
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;