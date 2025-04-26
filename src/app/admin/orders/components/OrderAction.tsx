import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    Box,
    Typography
} from '@mui/material';

interface OrderActionProps {
    open: boolean;
    onClose: () => void;
    orderId: string;
    currentStatus: string;
    onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrderAction: React.FC<OrderActionProps> = ({open, onClose, orderId, currentStatus, onStatusChange}) => {
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleSubmit = () => {
        onStatusChange(orderId, status);
        onClose();
    };

    // Status options with colors and icons
    const statusOptions = [
        { value: "pending", label: "Pending", color: "#e65100", bgColor: "#fff3e0", icon: "⏳" },
        { value: "processing", label: "Processing", color: "#0077b6", bgColor: "#caf0f8", icon: "⚙️" },
        { value: "shipped", label: "Shipped", color: "#5e35b1", bgColor: "#ede7f6", icon: "🚚" },
        { value: "delivered", label: "Delivered", color: "#2d6a4f", bgColor: "#d8f3dc", icon: "✅" },
        { value: "cancelled", label: "Cancelled", color: "#c62828", bgColor: "#ffebee", icon: "❌" }
    ];

    // Get status color based on selected value
    const getStatusStyle = (statusValue: string) => {
        const option = statusOptions.find(opt => opt.value === statusValue);
        return option ? { color: option.color, bgColor: option.bgColor, icon: option.icon } : 
            { color: "var(--foreground)", bgColor: "var(--background)", icon: "🔄" };
    };

    const currentStatusStyle = getStatusStyle(status);

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    backgroundColor: 'var(--background)',
                    width: { xs: '90%', sm: '450px' },
                    maxWidth: '500px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(var(--primary-rgb), 0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                color: 'var(--foreground)',
                fontWeight: 600,
                fontSize: '1.25rem',
                py: 2.5,
                px: 3,
                borderBottom: '1px solid rgba(var(--primary-rgb), 0.1)'
            }}>
                Change Order Status
            </DialogTitle>
            
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3
                }}>
                    <Box sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: currentStatusStyle.bgColor,
                        color: currentStatusStyle.color,
                        fontSize: '1.5rem'
                    }}>
                        {currentStatusStyle.icon}
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 0.5 }}>
                            Current Status
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            color: currentStatusStyle.color,
                            fontWeight: 600
                        }}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Typography>
                    </Box>
                </Box>
                
                <Typography variant="subtitle2" sx={{ 
                    mb: 1.5, 
                    color: 'var(--foreground)',
                    fontWeight: 500
                }}>
                    Select New Status:
                </Typography>
                
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    fullWidth
                    sx={{
                        height: '50px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(var(--primary-rgb), 0.2)',
                            borderRadius: '10px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                            borderWidth: '2px',
                        },
                        '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 1.5
                        },
                        backgroundColor: 'var(--light)'
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: 'var(--background)',
                                borderRadius: '10px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                                border: '1px solid rgba(var(--primary-rgb), 0.1)',
                                mt: 1
                            }
                        }
                    }}
                >
                    {statusOptions.map((option) => (
                        <MenuItem 
                            key={option.value} 
                            value={option.value}
                            sx={{
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)'
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(var(--primary-rgb), 0.15)'
                                    }
                                }
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 1.5
                            }}>
                                <Box sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: option.bgColor,
                                    color: option.color,
                                    fontSize: '1rem'
                                }}>
                                    {option.icon}
                                </Box>
                                <Typography sx={{ 
                                    color: 'var(--foreground)',
                                    fontWeight: status === option.value ? 600 : 400
                                }}>
                                    {option.label}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            
            <DialogActions sx={{ 
                p: 2.5, 
                borderTop: '1px solid rgba(var(--primary-rgb), 0.1)',
                gap: 1
            }}>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        py: 1,
                        px: 3,
                        borderColor: 'rgba(var(--primary-rgb), 0.3)',
                        color: 'var(--foreground)',
                        '&:hover': {
                            borderColor: 'var(--primary)',
                            backgroundColor: 'rgba(var(--primary-rgb), 0.05)'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        py: 1,
                        px: 3,
                        backgroundColor: 'var(--primary)',
                        color: 'var(--text-on-image)',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: 'var(--primary-dark)',
                            boxShadow: '0 4px 12px rgba(var(--primary-rgb), 0.3)'
                        }
                    }}
                >
                    Update Status
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderAction;