import React from 'react';
import {Button} from '@mui/material';
import Link from 'next/link';

interface CartActionsProps {
    handleCheckout: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({handleCheckout}) => (
    <div>
        <Button
            sx={{
                width: "90%",
                mx: "5%",
                fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                },
            }}
            variant="contained"
            className="bg-black hover:bg-gray-800"
            onClick={handleCheckout}
        >
            Checkout
        </Button>
        <div className="text-center mt-3">
            <Link href="/pages/ViewCart">
                <button className="text-black text-xs sm:text-sm font-semibold">
                    <u className="text-black text-xs sm:text-sm font-semibold text-center">
                        View Cart
                    </u>
                </button>
            </Link>
        </div>
    </div>
);

export default CartActions;