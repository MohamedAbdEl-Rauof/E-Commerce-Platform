import clientPromise from '../../lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = clientPromise;
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "GET") {
        try {
            const categories = await db.collection('categories').find().toArray();
            res.status(200).json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error fetching categories"});
        }

    }
}