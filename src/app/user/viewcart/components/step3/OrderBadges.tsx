import React from 'react';
import Badge from "@mui/material/Badge";

interface CartItem {
    id: string;
    image: string;
    name: string;
    quantity: number;
}

interface OrderBadgesProps {
    cartItems: CartItem[];
}

const OrderBadges: React.FC<OrderBadgesProps> = ({ cartItems }) => (
    <div className="pt-5 flex justify-center gap-4">
        {cartItems.map((item) => (
            <Badge
                key={item.id}
                badgeContent={item.quantity}
                color="primary"
                overlap="circular"
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-2xl"
                    width={80}
                    height={80}
                />
            </Badge>
        ))}
    </div>
);

export default OrderBadges;