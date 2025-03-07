import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db("e-commerce");

  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId || !ObjectId.isValid(userId as string)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const orderCollection = db.collection("orders");

      // Fetch all orders for the given userId
      const orders = await orderCollection
        .find({
          userId: new ObjectId(userId as string), // Only filter by userId
        })
        .toArray();

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching orders" });
    }
  } else {
    // Handle other methods if needed
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
};
