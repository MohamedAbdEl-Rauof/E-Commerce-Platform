export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isFavourite: boolean;
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