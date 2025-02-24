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

export interface CartItem {
    id: string;
    image: string;
    name: string;
    price: number;
    isFavourite: boolean;
    quantity: number;
    productId: string;
}

export interface StepProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedShipping: number;
    handleCheckout: () => void;
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
    password: string;
    expirationDate: string;
    cvc: string;
}