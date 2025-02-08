export interface CartItem {
    id: string;
    image: string;
    name: string;
    price: number;
    isFavourite: boolean;
    quantity: number;
}

export type Order = {
    paymentMethod: {
        method: string;
    };
    shoppingandTotal: {
        Total: string;
    };
    createdAt: string;
    orderCode: string;
};