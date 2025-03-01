export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    isFavourite: boolean;
    name: string;
    price: number;
    image: string;
    rating: number;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    // ... other properties
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