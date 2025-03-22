import clientPromise from '@/lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {ObjectId} from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("products");

    switch (req.method) {
        case 'GET':
            try {
                const products = await collection.find({}).toArray();
                res.status(200).json(products);
            } catch (err) {
                console.error(err);
                res.status(500).json({error: "Error fetching data"});
            }
            break;

        case 'POST':
            try {
                const newProduct = {
                    name: req.body.name,
                    image: req.body.image,
                    price: parseFloat(req.body.price),
                    categoryId: req.body.categoryId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    PriceBeforeDiscount: parseFloat(req.body.PriceBeforeDiscount),
                    description: req.body.description
                };
                const result = await collection.insertOne(newProduct);
                res.status(201).json(result);
            } catch (err) {
                console.error(err);
                res.status(500).json({error: "Error creating product"});
            }
            break;

        case 'PUT':
            try {
                const {id} = req.query;
                if (!id || typeof id !== 'string') {
                    return res.status(400).json({error: "Invalid product ID"});
                }

                const updateData = req.body;
                updateData.updatedAt = new Date();
                updateData.price = parseFloat(updateData.price);
                updateData.PriceBeforeDiscount = parseFloat(updateData.PriceBeforeDiscount);

                const result = await collection.updateOne(
                    {_id: new ObjectId(id)},
                    {$set: updateData}
                );

                if (result.matchedCount === 0) {
                    res.status(404).json({error: "Product not found"});
                } else {
                    res.status(200).json({message: "Product updated successfully"});
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({error: "Error updating product"});
            }
            break;

        case 'DELETE':
            try {
                const {id} = req.query;
                if (!id || typeof id !== 'string') {
                    return res.status(400).json({error: "Invalid product ID"});
                }

                const result = await collection.deleteOne({_id: new ObjectId(id)});

                if (result.deletedCount === 0) {
                    res.status(404).json({error: "Product not found"});
                } else {
                    res.status(200).json({message: "Product deleted successfully"});
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({error: "Error deleting product"});
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}