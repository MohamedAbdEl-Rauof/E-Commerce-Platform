import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import CartTable from './components/step1/CartTable';
import CartSummary from './components/step1/CartSummary';
import {Type} from './types/type';

interface StepProps {
    cartItems: Type[];
    setCartItems: React.Dispatch<React.SetStateAction<Type[]>>;
    handleCheckout: () => void;
    selectedShipping: number;
    setSelectedShipping: React.Dispatch<React.SetStateAction<number>>;
}

const Step1: React.FC<StepProps> = ({
                                        cartItems,
                                        setCartItems,
                                        handleCheckout,
                                        selectedShipping,
                                        setSelectedShipping,
                                    }) => {
    const [total, setTotal] = useState<number>(0);
    const [changes, setChanges] = useState<Map<string, Type>>(new Map());
    // const {data: session} = useSession();
    // const userId = session?.user?.id;

    // Calculate Subtotal
    const calculateSubtotal = (cartItems: Type[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const handleSelectShipping = (optionId: number) => {
        setSelectedShipping(optionId);
    };

    // Update total on cartItems or selectedShipping change
    useEffect(() => {
        const subtotal = calculateSubtotal(cartItems);
        let shippingCost = 0;

        if (selectedShipping === 2) {
            shippingCost = 15.0; // Express Shipping
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21); // Pickup discount
        }

        setTotal(subtotal + shippingCost);
    }, [cartItems, selectedShipping]);

    const handleIncreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );

        setChanges((prevChanges) => {
            const newChanges = new Map(prevChanges);
            const item = cartItems.find((item) => item.id === id);
            if (item) {
                newChanges.set(id, {...item, quantity: item.quantity + 1});
            }
            return newChanges;
        });
    };

    const handleDecreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1}
                    : item
            )
        );

        setChanges((prevChanges) => {
            const newChanges = new Map(prevChanges);
            const item = cartItems.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                newChanges.set(id, {...item, quantity: item.quantity - 1});
            }
            return newChanges;
        });
    };

    const deleteProduct = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setChanges((prevChanges) => {
            const newChanges = new Map(prevChanges);
            newChanges.delete(id);
            return newChanges;
        });
    };


    return (
        <Box className="flex flex-col md:flex-row gap-8">
            <Box sx={{flex: 1}}>
                <CartTable
                    cartItems={cartItems}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    deleteProduct={deleteProduct}
                />
            </Box>
            <CartSummary
                cartItems={cartItems}
                selectedShipping={selectedShipping}
                handleSelectShipping={handleSelectShipping}
                total={total}
                handleCheckout={handleCheckout}
            />
        </Box>
    );
};

export default Step1;