import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import ThankYouMessage from "./components/step3/ThankYouMessage";
import OrderBadges from "./components/step3/OrderBadges";
import OrderDetails from "./components/step3/OrderDetails";

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

const Step3: React.FC<StepProps> = ({ cartItems, setCartItems }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const [order, setOrder] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async () => {
    if (!userId) {
      console.warn("User ID is not available. Skipping order fetch.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [userId]);

  const handleRefresh = () => {
    fetchOrder();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order || order.length === 0) {
    return <div>No order found.</div>;
  }

  const firstOrder = order[0];

  return (
      <div className="mx-auto mt-24 mb-14 text-center max-w-7xl px-4">
        <div className="border border-gray-200 rounded-lg shadow-lg p-7">
          <ThankYouMessage />
          <OrderBadges cartItems={cartItems} />
          <OrderDetails order={firstOrder} />
          <div className="mt-8 space-x-4">
            <Button
                variant="contained"
                color="primary"
                className="w-full sm:w-auto rounded-xl"
            >
              Purchase History
            </Button>
            <Button
                variant="outlined"
                color="primary"
                className="w-full sm:w-auto rounded-xl"
                onClick={handleRefresh}
            >
              Refresh Order
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Step3;