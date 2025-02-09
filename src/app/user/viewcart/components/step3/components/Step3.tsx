"use client";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useSession} from "next-auth/react";
import ThankYouMessage from "./ThankYouMessage";
import OrderBadges from "./OrderBadges";
import OrderDetails from "./OrderDetails";
import {CartItem, Order} from "../../types";

interface StepProps {
    cartItems: CartItem[];
}

const Step3: React.FC<StepProps> = ({cartItems}) => {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [order, setOrder] = useState<Order[] | null>(null);

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
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [userId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const firstOrder = order[0];

    return (
        <div className="mx-auto mt-24 mb-14 text-center max-w-7xl px-4">
            <div className="border border-gray-200 rounded-lg shadow-lg p-7">
                <ThankYouMessage/>
                <OrderBadges cartItems={cartItems}/>
                <OrderDetails order={firstOrder}/>
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