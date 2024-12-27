import React from 'react';
import {Typography} from '@mui/material';

interface CartSummaryProps {
    // calculateSubtotal: () => number;
}

const CartSummary: React.FC<CartSummaryProps> = (/*{ calculateSubtotal }*/) => (
    <div>
        <div className="p-2 sm:p-3 flex justify-between">
            <Typography component="div" className="text-sm sm:text-base">
                Subtotal
            </Typography>
            <Typography component="div" className="text-sm sm:text-base">
                {/*$ {calculateSubtotal().toFixed(2)}*/}
            </Typography>
        </div>
        <div className="p-2 sm:p-3 flex justify-between">
            <Typography component="div" className="font-bold text-sm sm:text-base">
                Total
            </Typography>
            <Typography component="div" className="text-sm sm:text-base">
                {/*$ {calculateSubtotal().toFixed(2)}*/}
            </Typography>
        </div>
    </div>
);

export default CartSummary;