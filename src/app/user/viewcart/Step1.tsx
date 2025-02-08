import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { IoCloseOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  isFavourite: boolean;
  quantity: number;
}

interface StepProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleCheckout: () => void;
  selectedShipping: number;
  setSelectedShipping: React.Dispatch<React.SetStateAction<number>>;
}

const label = { inputProps: { "aria-label": "check circle" } };

const Step1: React.FC<StepProps> = ({
  cartItems,
  setCartItems,
  handleCheckout,
  selectedShipping,
  setSelectedShipping,
}) => {
  const [total, setTotal] = useState<number>(0);
  const [changes, setChanges] = useState<Map<string, CartItem>>(new Map());
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Calculate Subtotal
  const calculateSubtotal = (cartItems: CartItem[]) => {
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
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
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
          : item,
      ),
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

  // Save changes to the database
  const saveChanges = async () => {
    if (changes.size === 0) return;
    try {
      for (const [productId, item] of changes.entries()) {
        await fetch("/api/addtocart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            productId,
            quantity: item.quantity,
          }),
        });
      }
      setChanges(new Map());
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveChanges();
    }, 5000);

    return () => clearInterval(interval);
  }, [changes]);

  // Save on unmount
  useEffect(() => {
    return () => {
      saveChanges();
    };
  }, []);

  // delte item from DB
  const deleteProduct = async (productId: string) => {
    try {
      // Remove the product from the cart state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId),
      );

      // Send DELETE request to remove the item from the database
      await fetch("/api/addtocart", {
        method: "DELETE",
        body: JSON.stringify({ userId, productId }),
        headers: { "Content-Type": "application/json" },
      });

      // Show a success notification
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted Done",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(
        "Item deleted from database and removed from cart successfully",
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="mt-10 mb-14 flex justify-between w-auto mx-auto">
      {/* Table Section */}
      <Box sx={{ flex: 1, marginRight: 4 }}>
        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>
                  Product
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", padding: "16px" }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", padding: "16px" }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", padding: "16px" }}
                >
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem) => (
                <TableRow key={cartItem.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "16px" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        style={{
                          width: 50,
                          height: 50,
                          marginRight: 16,
                          borderRadius: "5px",
                        }}
                      />
                      <div>
                        <div className="font-semibold">{cartItem.name}</div>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginTop: 1,
                          }}
                        >
                          <IoCloseOutline
                            style={{
                              cursor: "pointer",
                              marginLeft: 8,
                            }}
                            onClick={() => deleteProduct(cartItem.id)}
                          />
                          <span>Remove</span>
                        </Box>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "16px" }}>
                    <div className="flex items-center justify-center border border-gray-300 rounded-md bg-white w-20">
                      <button
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                        className="text-lg font-bold text-gray-700 px-3 py-1 hover:bg-gray-200 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="text-base font-medium text-gray-800">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                        className="text-lg font-bold text-gray-700 px-3 py-1 hover:bg-gray-200 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "16px" }}>
                    {cartItem.price}
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "16px" }}>
                    {cartItem.price * cartItem.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Cart Summary Section */}
      <Box
        sx={{
          width: 400,
          padding: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          Cart Summary
        </Typography>

        {/* Shipping Options */}
        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <ListItemButton onClick={() => handleSelectShipping(1)}>
            <Checkbox
              {...label}
              checked={selectedShipping === 1}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemText primary="Free Shipping" />
              <ListItemText primary="$0.00" sx={{ textAlign: "right" }} />
            </Box>
          </ListItemButton>
        </Box>

        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <ListItemButton onClick={() => handleSelectShipping(2)}>
            <Checkbox
              {...label}
              checked={selectedShipping === 2}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemText primary="Express Shipping" />
              <ListItemText primary="+ $15.00" sx={{ textAlign: "right" }} />
            </Box>
          </ListItemButton>
        </Box>

        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <ListItemButton onClick={() => handleSelectShipping(3)}>
            <Checkbox
              {...label}
              checked={selectedShipping === 3}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemText primary="Pickup" />
              <ListItemText primary="- %21.00" sx={{ textAlign: "right" }} />
            </Box>
          </ListItemButton>
        </Box>

        {/* Summary */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="subtitle1">Subtotal</Typography>
          <Typography variant="subtitle1">
            {calculateSubtotal(cartItems).toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            mt: 1,
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>{" "}
          {/* Display the total correctly */}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </div>
  );
};

export default Step1;
