import {ObjectId} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const orderCollection = db.collection("orders");

    if (req.method === "GET") {
        const {userId} = req.query;

        try {
            // Check if the userId is a special value to fetch all orders
            if (userId === '*') {
                const allOrders = await orderCollection.find({}).toArray();

                if (allOrders.length === 0) {
                    return res.status(404).json({message: "No orders found"});
                }

                return res.status(200).json(allOrders);
            }

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
    } else if (req.method === "PUT") {
        const {orderId} = req.query;
        const {status} = req.body;

        if (!orderId || !ObjectId.isValid(orderId as string)) {
            return res.status(400).json({message: "Invalid order ID"});
        }
        if (!status || typeof status !== "string") {
            return res.status(400).json({message: "Status is required"});
        }

        try {
            const result = await orderCollection.updateOne(
                {_id: new ObjectId(orderId as string)},
                {$set: {status: status}}
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({message: "Order not found"});
            }

            if (result.modifiedCount === 0) {
                return res.status(200).json({message: "No changes made to the order"});
            }

            // Fetch the updated order
            const updatedOrder = await orderCollection.findOne({_id: new ObjectId(orderId as string)});

            return res.status(200).json({
                message: "Order status updated successfully",
                order: updatedOrder
            });
        } catch (error) {
            console.error("Error updating order:", error);
            return res
                .status(500)
                .json({message: "An error occurred while updating the order"});
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        return res
            .status(405)
            .json({message: `Method ${req.method} Not Allowed`});
    }
};

export default handler;
