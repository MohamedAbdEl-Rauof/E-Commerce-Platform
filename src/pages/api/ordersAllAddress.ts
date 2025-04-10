import {ObjectId} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("e-commerce");

    if (req.method === "GET") {
        const {userId} = req.query;

        try {
            const orderCollection = db.collection("orders");

            // Check if the userId is a special value to fetch all orders
            if (userId === '*') {
                // Fetch all orders
                const allOrders = await orderCollection.find({}).toArray();

                if (allOrders.length === 0) {
                    return res.status(404).json({message: "No orders found"});
                }

                return res.status(200).json(allOrders);
            }

            // Original behavior for specific userId
            if (!userId || !ObjectId.isValid(userId as string)) {
                return res.status(400).json({message: "Invalid user ID"});
            }

            // Fetch all orders for the given userId
            const orders = await orderCollection
                .find({
                    userId: new ObjectId(userId as string),
                })
                .toArray();

            if (orders.length === 0) {
                return res
                    .status(404)
                    .json({message: "No orders found for this user"});
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            return res
                .status(500)
                .json({message: "An error occurred while fetching orders"});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res
            .status(405)
            .json({message: `Method ${req.method} Not Allowed`});
    }
};