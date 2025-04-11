import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Change Order Status</DialogTitle>
            <DialogContent>
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderAction;