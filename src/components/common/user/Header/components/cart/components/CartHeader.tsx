import React from "react";
import {Box, IconButton, Typography, useMediaQuery} from "@mui/material";
import {IoMdClose} from "react-icons/io";

interface CartHeaderProps {
    closeCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({closeCart}) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: isSmallScreen ? '8px' : '16px',
                paddingTop: '12px',
                paddingRight: isSmallScreen ? '8px' : '16px',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <Typography variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                Cart
            </Typography>
            <IconButton
                onClick={closeCart}
                sx={{
                    color: 'var(--muted)',
                    '&:hover': {
                        backgroundColor: 'var(--hover)',
                    },
                }}
            >
                <IoMdClose fontSize={isSmallScreen ? 'medium' : 'large'}/>
            </IconButton>
        </Box>
    );
};

export default CartHeader;