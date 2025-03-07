import React from 'react';
import {Avatar, Badge, Box} from '@mui/material';

interface OrderBadgesProps {
    cartItems: Array<{
        id: string;
        image: string;
        name: string;
        quantity: number;
    }>;
}

const OrderBadges: React.FC<OrderBadgesProps> = ({cartItems}) => (
    <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, my: 3}}>
        {cartItems.map((item) => (
            <Badge
                key={item.id}
                badgeContent={item.quantity}
                color="primary"
                overlap="circular"
                sx={{
                    '& .MuiBadge-badge': {
                        bgcolor: 'var(--primary)',
                        color: 'var(--light)',
                    }
                }}
            >
                <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{width: 80, height: 80, borderRadius: 2}}
                />
            </Badge>
        ))}
    </Box>
);

export default OrderBadges;