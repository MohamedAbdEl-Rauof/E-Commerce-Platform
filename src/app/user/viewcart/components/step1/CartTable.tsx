import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import {Type} from '../../types/type';
import Image from 'next/image';

interface CartTableProps {
    cartItems: Type[];
    handleIncreaseQuantity: (id: string) => void;
    handleDecreaseQuantity: (id: string) => void;
    deleteProduct: (id: string) => void;
}

const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    padding: '16px',
    color: 'var(--foreground)',
    // backgroundColor: 'var(--background)',
});

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: 'var(--hover)',
    },
});

const QuantityButton = styled(IconButton)({
    color: 'var(--foreground)',
    '&:hover': {
        backgroundColor: 'var(--hover)',
    },
    padding: '4px',
});

const QuantityControlBox = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '2px',
    maxWidth: 'fit-content',
});

const CartTable: React.FC<CartTableProps> = ({
                                                 cartItems,
                                                 handleIncreaseQuantity,
                                                 handleDecreaseQuantity,
                                                 deleteProduct,
                                             }) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{backgroundColor: 'var(--background)'}}>
            <Table aria-label="cart table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Subtotal</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((cartItem) => (
                        <StyledTableRow key={cartItem.id}>
                            <TableCell component="th" scope="row" sx={{padding: 2}}>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Image
                                        src={cartItem.image}
                                        alt={cartItem.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            marginRight: 16,
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1"
                                                    sx={{fontWeight: 'bold', color: 'var(--foreground)'}}>
                                            {cartItem.name}
                                        </Typography>
                                        <Button
                                            startIcon={<CloseIcon/>}
                                            onClick={() => deleteProduct(cartItem.id)}
                                            sx={{color: 'var(--danger)', mt: 1}}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell align="center" sx={{padding: '8px'}}>  {/* Added padding */}
                                <QuantityControlBox>
                                    <QuantityButton
                                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                                        size="small"
                                    >
                                        <RemoveIcon fontSize="small"/>
                                    </QuantityButton>
                                    <Typography
                                        sx={{
                                            mx: 1,
                                            color: 'var(--foreground)',
                                            minWidth: '20px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {cartItem.quantity}
                                    </Typography>
                                    <QuantityButton
                                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                                        size="small"
                                    >
                                        <AddIcon fontSize="small"/>
                                    </QuantityButton>
                                </QuantityControlBox>
                            </TableCell>
                            <TableCell align="right" sx={{color: 'var(--foreground)'}}>
                                ${cartItem.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" sx={{color: 'var(--foreground)'}}>
                                ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartTable;