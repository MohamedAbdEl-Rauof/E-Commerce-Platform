"use client";
import React from "react";
import {Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";

interface CartHeaderProps {
    closeCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({closeCart}) => (
    <div className="flex justify-between items-center pl-4 pt-3">
        <Typography component="div" className="text-2xl">
            Cart
        </Typography>
        <IoMdClose
            onClick={closeCart}
            className="text-2xl text-gray-600 cursor-pointer mr-4"
        />
    </div>
);

export default CartHeader;