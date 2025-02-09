import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { Type } from '../../types/type';

interface CartTableProps {
    cartItems: Type[];
    handleIncreaseQuantity: (id: string) => void;
    handleDecreaseQuantity: (id: string) => void;
    deleteProduct: (id: string) => void;
}

const CartTable: React.FC<CartTableProps> = ({
                                                 cartItems,
                                                 handleIncreaseQuantity,
                                                 handleDecreaseQuantity,
                                                 deleteProduct,
                                             }) => {
    return (
        <TableContainer component={Paper} elevation={3}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Product</TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold", padding: "16px" }}>Quantity</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", padding: "16px" }}>Price</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", padding: "16px" }}>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((cartItem) => (
                        <TableRow key={cartItem.id}>
                            <TableCell component="th" scope="row" sx={{ padding: "16px" }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src={cartItem.image}
                                        alt={cartItem.name}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 16,
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <div>
                                        <div className="font-semibold">{cartItem.name}</div>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                marginTop: 1,
                                            }}
                                        >
                                            <IoCloseOutline
                                                style={{
                                                    cursor: "pointer",
                                                    marginLeft: 8,
                                                }}
                                                onClick={() => deleteProduct(cartItem.id)}
                                            />
                                            <span>Remove</span>
                                        </Box>
                                    </div>
                                </Box>
                            </TableCell>
                            <TableCell align="center" sx={{ padding: "16px" }}>
                                <div className="flex items-center justify-center border border-gray-300 rounded-md bg-white w-20">
                                    <button
                                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                                        className="text-lg font-bold text-gray-700 px-3 py-1 hover:bg-gray-200 rounded-l-md"
                                    >
                                        -
                                    </button>
                                    <span className="text-base font-medium text-gray-800">
                    {cartItem.quantity}
                  </span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                                        className="text-lg font-bold text-gray-700 px-3 py-1 hover:bg-gray-200 rounded-r-md"
                                    >
                                        +
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell align="right" sx={{ padding: "16px" }}>
                                {cartItem.price}
                            </TableCell>
                            <TableCell align="right" sx={{ padding: "16px" }}>
                                {cartItem.price * cartItem.quantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartTable;