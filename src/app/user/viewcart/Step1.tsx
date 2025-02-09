import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import CartTable from './components/step1/CartTable';
import CartSummary from './components/step1/CartSummary';
import { Type } from './types/type';

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
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    );

    setChanges((prevChanges) => {
      const newChanges = new Map(prevChanges);
      const item = cartItems.find((item) => item.id === id);
      if (item) {
        newChanges.set(id, { ...item, quantity: item.quantity + 1 });
      }
      return newChanges;
    });
  };

  const handleDecreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
    );

    setChanges((prevChanges) => {
      const newChanges = new Map(prevChanges);
      const item = cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        newChanges.set(id, { ...item, quantity: item.quantity - 1 });
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

  const refreshCart = async () => {
    if (!userId) {
      Swal.fire('Error', 'User not authenticated', 'error');
      return;
    }

    try {
      const response = await fetch(`/api/cart/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(changes)),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      const updatedCart = await response.json();
      setCartItems(updatedCart);
      setChanges(new Map());
      Swal.fire('Success', 'Cart updated successfully', 'success');
    } catch (error) {
      console.error('Error updating cart:', error);
      Swal.fire('Error', 'Failed to update cart', 'error');
    }
  };

  return (
      <div className="flex flex-col md:flex-row gap-8">
        <Box sx={{ flex: 1 }}>
          <CartTable
              cartItems={cartItems}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              deleteProduct={deleteProduct}
          />
          <Button
              variant="contained"
              color="primary"
              onClick={refreshCart}
              sx={{ mt: 2 }}
              disabled={changes.size === 0}
          >
            Refresh Cart
          </Button>
        </Box>
        <CartSummary
            cartItems={cartItems}
            selectedShipping={selectedShipping}
            handleSelectShipping={handleSelectShipping}
            total={total}
            handleCheckout={handleCheckout}
        />
      </div>
  );
};

export default Step1;