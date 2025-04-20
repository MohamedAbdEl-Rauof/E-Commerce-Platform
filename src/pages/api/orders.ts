import {ObjectId} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../lib/mongodb";

interface OrderItem {
    productId: ObjectId;
    quantity: number;
    price: number;
    total: number;
}

interface ShoppingAndTotal {
    shippingType: string;
    subTotal: string;
    Total: string;
}

interface Order {
    userId: ObjectId;
    contactInfo: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    paymentMethod: {
        method: string;
        cardNumber?: string;
        expirationDate?: string;
        cvc?: string;
    };
    items: OrderItem[];
    shoppingandTotal: ShoppingAndTotal;
    createdAt: Date;
    orderCode: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);


    if (req.method === "POST") {
        const {
            userId,
            contactInfo,
            shippingAddress,
            paymentMethod,
            items,
            shoppingandTotal,
        } = req.body;

        if (!userId || !ObjectId.isValid(userId)) {
            return res.status(400).json({message: "Invalid user ID"});
        }

        if (
            !contactInfo ||
            !shippingAddress ||
            !paymentMethod ||
            !items ||
            !shoppingandTotal ||
            !Array.isArray(items)
        ) {
            return res.status(400).json({message: "Missing required fields"});
        }

        try {
            const orderCollection = db.collection<Order>("orders");

            // Create a unique order code
            const orderCode = "ORDER-" + Math.floor(Math.random() * 1000000);

            // Format the order data to be inserted into the database
            const newOrder: Order = {
                userId: new ObjectId(userId),
                contactInfo,
                shippingAddress,
                paymentMethod,
                items: items.map((item: any) => ({
                    productId: new ObjectId(item.productId),
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                })),
                shoppingandTotal,
                createdAt: new Date(),
                orderCode,
            };

            // Insert the new order into the database
            await orderCollection.insertOne(newOrder);

            return res
                .status(201)
                .json({message: "Order placed successfully", orderCode});
        } catch (error) {
            console.error("Error placing order:", error);
            return res
                .status(500)
                .json({message: "An error occurred while placing the order"});
        }
    } else if (req.method === "GET") {
        const {userId} = req.query;

        if (!userId || !ObjectId.isValid(userId as string)) {
            return res.status(400).json({message: "Invalid user ID"});
        }

        try {
            const orderCollection = db.collection<Order>("orders");

            // Get the time for one minute ago
            const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

            // Fetch orders by userId and createdAt within the last minute
            const orders = await orderCollection
                .find({
                    userId: new ObjectId(userId as string),
                    createdAt: {$gte: oneMinuteAgo}, // Ensure correct type comparison
                })
                .toArray();

            if (orders.length === 0) {
                return res
                    .status(404)
                    .json({message: "No recent orders found for this user"});
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            return res
                .status(500)
                .json({message: "An error occurred while fetching orders"});
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        return res
            .status(405)
            .json({message: `Method ${req.method} Not Allowed`});
    }
};
