export interface Type {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description?: string;
    sku?: string;
    category?: string;
    brand?: string;
    variantId?: string;
    variantName?: string;
    maxQuantity?: number;
}

export interface UserData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    streetAddress: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    cardNumber: string;
    expirationDate: string;
    cvc: string;
    password: string;
}

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isFavourite?: boolean;
}