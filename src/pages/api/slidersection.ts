import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = clientPromise;
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);

    if (req.method == "GET") {
        try {
            const sliderSections = await db.collection("slider-section").find().toArray();
            res.status(200).json(sliderSections);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error fetching slider sections"});
        }
    }
}
