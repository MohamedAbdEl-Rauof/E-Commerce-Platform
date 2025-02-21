"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, pipe, custom } from "valibot";
import Swal from "sweetalert2";
import  ContactInformation  from "./components/step2/ContactInformation";
import  OrderSummary  from "./components/step2/OrderSummary";
import  ShippingAddress  from "./components/step2/ShippingAddress";
import  PaymentMethod  from "./components/step2/PaymentMethod";

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
  selectedShipping: number;
  handleCheckout: () => void;
}

type UserData = {
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
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
// Schema
const schema = object({
  firstName: pipe(
    string(),
    custom(
      (value) => (value as string).trim() !== "",
      "First Name is required",
    ),
    custom(
      (value) => /^[A-Za-z\s]+$/.test(value as string),
      "First Name must not contain numbers or special characters",
    ),
  ),
  lastName: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "Last Name is required"),
    custom(
      (value) => /^[A-Za-z\s]+$/.test(value as string),
      "Last Name must not contain numbers or special characters",
    ),
  ),
  phoneNumber: pipe(
    string(),
    custom(
      (value) => (value as string).trim() !== "",
      "Phone Number is required",
    ),
    custom(
      (value) => /^\+?[0-9]{10,14}$/.test(value as string),
      "Please enter a valid phone number",
    ),
  ),
  emailAddress: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "Email is required"),
    custom(
      (value) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value as string),
      "Please enter a valid email address",
    ),
  ),
  streetAddress: pipe(
    string(),
    custom(
      (value) => (value as string).trim() !== "",
      "Street Address is required",
    ),
  ),
  country: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "Country is required"),
  ),
  city: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "City is required"),
  ),
  state: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "State is required"),
  ),
  zipCode: pipe(
    string(),
    custom((value) => (value as string).trim() !== "", "Zip Code is required"),
  ),
  cardNumber: pipe(
    string(),
    custom(
      (value) => /^\d{16}$/.test(value as string),
      "Invalid card number - must be 16 digits",
    ),
  ),
  expirationDate: pipe(
    string(),
    custom(
      (value) => (value as string).trim() !== "",
      "Expiration Date is required",
    ),
  ),
  cvc: pipe(
    string(),
    custom(
      (value) => /^\d{3}$/.test(value as string),
      "Invalid CVC - must be 3 digits",
    ),
  ),
});

const Step2: React.FC<StepProps> = ({
                                      cartItems,
                                      setCartItems,
                                      selectedShipping,
                                      handleCheckout,
                                    }) => {
  const [total, setTotal] = useState<number>(0);
  const [changes, setChanges] = useState<Map<string, CartItem>>(new Map());
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Handle payment method selection
  const handleSelect = (method: string) => {
    setPaymentMethod(method);
    console.log("Selected Payment Method:", method);
  };

  // Update total on cartItems or selectedShipping change
  useEffect(() => {
    const subtotal = calculateSubtotal(cartItems);
    let shippingCost = 0;

    if (selectedShipping === 2) {
      shippingCost = 15.0;
    } else if (selectedShipping === 3) {
      shippingCost = -(subtotal * 0.21);
    }

    setTotal(subtotal + shippingCost);
  }, [cartItems, selectedShipping]);

  const calculateSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UserData>({
    resolver: valibotResolver(schema),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      streetAddress: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  const onSubmit = async (data: UserData) => {
    const subtotal = calculateSubtotal(cartItems);
    let shippingCost = 0;
    if (selectedShipping === 2) {
      shippingCost = 15.0;
    } else if (selectedShipping === 3) {
      shippingCost = -(subtotal * 0.21);
    }

    const total = subtotal + shippingCost;

    const shippingDescription =
        selectedShipping === 1
            ? "free"
            : selectedShipping === 2
                ? "Express"
                : selectedShipping === 3
                    ? "Pickup"
                    : "Unknown";

    const orderData = {
      userId: userId,
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        email: data.emailAddress,
      },
      shippingAddress: {
        street: data.streetAddress,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
      paymentMethod: {
        method: paymentMethod,
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        cvc: data.cvc,
      },
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      shoppingandTotal: {
        shippingType: shippingDescription,
        subTotal: subtotal.toFixed(2),
        Total: total.toFixed(2),
      },
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

      // Show success message
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form and cart
      reset();
      setCartItems([]);
      handleCheckout();
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ContactInformation control={control} errors={errors} />
              <ShippingAddress control={control} errors={errors} />
              <PaymentMethod control={control} errors={errors} handleSelect={handleSelect} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <OrderSummary
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  selectedShipping={selectedShipping}
                  total={total}
              />
            </Box>
          </Box>
          <Button
              type="submit"
              disabled={!isValid}
              className="mt-4 w-full"
          >
            Place Order
          </Button>
        </form>
      </Box>
  );
};

export default Step2;
