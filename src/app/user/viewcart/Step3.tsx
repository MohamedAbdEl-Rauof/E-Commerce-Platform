import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import {useSession} from "next-auth/react";

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
}

type Order = {
    paymentMethod: {
        method: string;
    };
    shoppingandTotal: {
        Total: string;
    };
    createdAt: string;
    orderCode: string;
};

const Step3: React.FC<StepProps> = ({cartItems}) => {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [order, setOrder] = useState<Order[] | null>(null);

    console.log("cart ya raouuuuuuuuuuuuf", cartItems);

    useEffect(() => {
        if (!userId) {
            console.warn("User ID is not available. Skipping order fetch.");
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders?userId=${userId}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Failed to fetch order data: ${errorDetails}`);
                }

                const data = await response.json();
                setOrder(data);
                console.log("Order data:", data);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [userId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const firstOrder = order[0]; // Safely access the first order

    return (
        <div className="mx-auto mt-24 mb-14 text-center max-w-7xl px-4">
            {/* Container for the thank you message and order info */}
            <div className="border border-gray-200 rounded-lg shadow-lg p-7">
                {/* Thank You message */}
                <div className="mb-8">
                    <p className="text-gray-500 text-xl">Thank You! 🎉</p>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Your order has been received
                    </h1>
                </div>

                {/* Order Badge (with image) */}
                <div className="pt-5 flex justify-center gap-4">
                    {cartItems.map((item) => (
                        <Badge
                            key={item.id}
                            badgeContent={item.quantity}
                            color="primary"
                            overlap="circular"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded-2xl"
                                width={80}
                                height={80}
                            />
                        </Badge>
                    ))}
                </div>

                <div className="mt-10 mb-10 justify-center flex space-x-24">
                    <div className="text-left font-bold">
                        <h1 className="text-gray-500 text-xl">Order Code:</h1>
                        <h1 className="text-gray-500 text-xl">Date:</h1>
                        <h1 className="text-gray-500 text-xl">Total:</h1>
                        <h1 className="text-gray-500 text-xl">Payment Method:</h1>
                    </div>
                    <div className="text-left">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {firstOrder.orderCode}
                        </h1>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {new Date(firstOrder.createdAt).toLocaleDateString()}
                        </h1>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {firstOrder.shoppingandTotal.Total}
                        </h1>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {firstOrder.paymentMethod.method}
                        </h1>
                    </div>
                </div>

                {/* Optional button for going back to shopping or viewing more details */}
                <div className="mt-8">
                    <Button
                        variant="contained"
                        color="primary"
                        className="w-full sm:w-auto rounded-xl"
                    >
                        Purchase History
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Step3;
