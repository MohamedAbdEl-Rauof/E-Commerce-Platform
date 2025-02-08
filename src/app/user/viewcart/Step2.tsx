import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {ListItemButton, ListItemText, TextField, Typography,} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {CiCreditCard1} from "react-icons/ci";
import {Button} from "flowbite-react";
import {useSession} from "next-auth/react";
import {Controller, useForm} from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";
import {custom, object, pipe, string} from "valibot";
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
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    // Handle payment method selection
    const handleSelect = (method: string) => {
        setPaymentMethod(method);
        console.log("Selected Payment Method:", method);
    };

    const shippingDescription =
        selectedShipping === 1
            ? "free"
            : selectedShipping === 2
                ? "Express"
                : selectedShipping === 3
                    ? "Pickup"
                    : "Unknown";

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

    const handleIncreaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item,
            ),
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
                    : item,
            ),
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

    // Save changes to the database
    const saveChanges = async () => {
        if (changes.size === 0) return;
        try {
            for (const [productId, item] of changes.entries()) {
                await fetch("/api/addtocart", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
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

    const calculateSubtotal = (cartItems: CartItem[]) => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
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

    const transformedItems = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
    }));

    const onSubmit = async (data: UserData) => {
        console.log(
            "Form submitted with data:",
            data,
            userId,
            transformedItems,
            paymentMethod,
        );

        // Calculate subtotal dynamically based on cartItems
        const subtotal = calculateSubtotal(cartItems);

        // Dynamic shipping cost calculation based on selected shipping method
        let shippingCost = 0;
        if (selectedShipping === 2) {
            shippingCost = 15.0;
        } else if (selectedShipping === 3) {
            shippingCost = -(subtotal * 0.21); // Assuming this is a discount or fee logic
        }

        const total = subtotal + shippingCost; // Final total after adding shipping cost

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
                cardNumber: data.cardNumber, // Optional, based on payment method
                expirationDate: data.expirationDate, // Optional
                cvc: data.cvc, // Optional
            },
            items: cartItems.map((item) => ({
                productId: item.id, // MongoDB ObjectId as a string
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
            })),
            shoppingandTotal: {
                shippingType: shippingDescription,
                subTotal: subtotal.toFixed(2), // Ensures it's a string with 2 decimal places
                Total: total.toFixed(2), // Ensures it's a string with 2 decimal places
            },
            createdAt: new Date().toLocaleString(), // Format the date to your needs
        };

        console.log("the shape of data ya Roauoooooooooooooooof", orderData);
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Unknown error occurred");
            }

            // Parse the response to get the order code and other details
            const responseData = await response.json();
            const {orderCode} = responseData;

            // Show success alert with the order code
            Swal.fire({
                title: "Success!",
                text: `Order placed successfully! Order Code: ${orderCode}`,
                icon: "success",
                timer: 1500,
            }).then(() => {
                handleCheckout(); // Proceed to next step after successful order placement
            });

            // Optionally reset the form after successful submission
            reset();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            console.error(errorMessage);
            // Show error alert
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mx-auto mt-24 mb-14">
                {/* Main container with flex layout */}
                <Box display="flex" gap={4} flexDirection={{xs: "column", md: "row"}}>
                    <Box flex="1" display="flex" flexDirection="column" gap={4}>
                        {/* Contact Information */}
                        <Box
                            sx={{
                                padding: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                                Contact Information
                            </Typography>
                            <Box sx={{mt: 4}}>
                                <Box
                                    display="flex"
                                    flexDirection={{xs: "column", sm: "row"}}
                                    gap={2}
                                    mb={3}
                                >
                                    {/* First Name */}
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="first-name"
                                                label="First Name"
                                                variant="outlined"
                                                error={!!errors["firstName"]}
                                                helperText={errors["firstName"]?.message}
                                            />
                                        )}
                                    />
                                    {/* Last Name */}
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="last-name"
                                                label="Last Name"
                                                variant="outlined"
                                                error={!!errors["lastName"]}
                                                helperText={errors["lastName"]?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="phone-number"
                                                label="Phone Number"
                                                variant="outlined"
                                                error={!!errors["phoneNumber"]}
                                                helperText={errors["phoneNumber"]?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="emailAddress"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="email-address"
                                                label="Email Address"
                                                variant="outlined"
                                                error={!!errors["emailAddress"]}
                                                helperText={errors["emailAddress"]?.message}
                                            />
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Shipping Address */}
                        <Box
                            sx={{
                                padding: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                                Shipping Address
                            </Typography>
                            <Box sx={{mt: 4}}>
                                <Controller
                                    name="streetAddress"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="street-address"
                                            label="Street Address"
                                            variant="outlined"
                                            error={!!errors["streetAddress"]}
                                            helperText={errors["streetAddress"]?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="country"
                                            label="Country"
                                            variant="outlined"
                                            sx={{mt: 2}}
                                            error={!!errors["country"]}
                                            helperText={errors["country"]?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            id="city"
                                            label="Town / City"
                                            variant="outlined"
                                            sx={{mt: 2}}
                                            error={!!errors["city"]}
                                            helperText={errors["city"]?.message}
                                        />
                                    )}
                                />
                                <Box
                                    display="flex"
                                    flexDirection={{xs: "column", sm: "row"}}
                                    gap={2}
                                    mt={2}
                                >
                                    <Controller
                                        name="state"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="state"
                                                label="State"
                                                variant="outlined"
                                                error={!!errors["state"]}
                                                helperText={errors["state"]?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="zipCode"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                id="zip-code"
                                                label="Zip Code"
                                                variant="outlined"
                                                error={!!errors["zipCode"]}
                                                helperText={errors["zipCode"]?.message}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                                    <Checkbox/>
                                    <Typography component="label" sx={{ml: 1}}>
                                        Use a different billing address (optional)
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Payment Method */}
                        <Box
                            sx={{
                                padding: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                                Payment Method
                            </Typography>
                            <Box sx={{mt: 4, borderBottom: "1px solid #e0e0e0", pb: 1}}>
                                {/* Credit Card Option */}
                                <ListItemButton
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        padding: "8px",
                                    }}
                                    onClick={() => handleSelect("credit-card")}
                                >
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon/>}
                                        checkedIcon={<CheckCircleIcon/>}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <ListItemText primary="Pay By Card Credit"/>
                                        <CiCreditCard1 style={{fontSize: 24}}/>
                                    </Box>
                                </ListItemButton>

                                {/* PayPal Option */}
                                <ListItemButton
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        padding: "8px",
                                    }}
                                    onClick={() => handleSelect("paypal")}
                                >
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon/>}
                                        checkedIcon={<CheckCircleIcon/>}
                                    />
                                    <ListItemText primary="PayPal"/>
                                </ListItemButton>
                            </Box>

                            {/* Conditional rendering based on payment method */}
                            <Box sx={{mt: 2}}>
                                {paymentMethod === "credit-card" && (
                                    <Box>
                                        <Controller
                                            name="cardNumber"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    id="card-number"
                                                    label="Card Number"
                                                    variant="outlined"
                                                    error={!!errors["cardNumber"]}
                                                    helperText={errors["cardNumber"]?.message}
                                                />
                                            )}
                                        />

                                        <Box
                                            display="flex"
                                            flexDirection={{xs: "column", sm: "row"}}
                                            gap={2}
                                            mt={2}
                                        >
                                            <Controller
                                                name="expirationDate"
                                                control={control}
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        id="expiration-date"
                                                        label="Expiration Date"
                                                        variant="outlined"
                                                        error={!!errors["expirationDate"]}
                                                        helperText={errors["expirationDate"]?.message}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name="cvc"
                                                control={control}
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        id="cvc"
                                                        label="CVC"
                                                        variant="outlined"
                                                        error={!!errors["cvc"]}
                                                        helperText={errors["cvc"]?.message}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                )}

                                {paymentMethod === "paypal" && (
                                    <Typography variant="body1" sx={{mt: 2}}>
                                        Please log in to your PayPal account to complete the
                                        payment.
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-black text-white hover:bg-gray-800"
                        >
                            Place Order
                        </Button>
                    </Box>

                    {/* Order Summary */}
                    <Box flex="1" maxWidth={600}>
                        <Box
                            sx={{
                                padding: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                boxShadow: 3,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography component="div" className="text-2xl font-bold mb-4">
                                Order Summary
                            </Typography>
                            {/* Cart Items */}
                            {cartItems.map((cartItem) => (
                                <Box
                                    key={cartItem.id}
                                    className="relative flex items-center space-x-6 p-4 bg-gray-50 rounded-md shadow-md"
                                >
                                    <img
                                        src={cartItem.image}
                                        alt="img"
                                        className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                    />
                                    <Box className="flex flex-col flex-1 space-y-2">
                                        <Typography
                                            variant="body1"
                                            className="text-base font-semibold text-gray-800"
                                        >
                                            Product Name
                                        </Typography>
                                        <Box
                                            className="flex items-center border border-gray-300 rounded-md bg-white w-20">
                                            <div
                                                className="flex items-center justify-center border border-gray-300 rounded-md bg-white w-20">
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
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        className="absolute top-2 right-0 text-right text-base font-semibold text-gray-800"
                                    >
                                        ${cartItem.price}
                                    </Typography>
                                </Box>
                            ))}

                            {/* Footer */}
                            <Box mt={4} px={2}>
                                <Box className="p-3 flex justify-between">
                                    <Typography className="text-base">Shipping</Typography>
                                    <Typography className="text-base">
                                        {shippingDescription}
                                    </Typography>
                                </Box>
                                <Box className="p-3 flex justify-between">
                                    <Typography className="text-base">Subtotal</Typography>
                                    <Typography variant="subtitle1">
                                        {calculateSubtotal(cartItems).toFixed(2)}
                                    </Typography>{" "}
                                </Box>
                                <Box className="p-3 flex justify-between font-bold text-base">
                                    <Typography className="font-bold text-xl">Total</Typography>
                                    <Typography className="font-bold text-xl">
                                        ${total.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        </form>
    );
};

export default Step2;
