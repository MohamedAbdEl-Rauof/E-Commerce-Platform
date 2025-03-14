import clientPromise from '../../lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {ObjectId} from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "GET") {
        try {
            // Get all categories
            const categories = await db.collection('categories').find().toArray();

            // Get all products to count by category
            const products = await db.collection('products').find({}).toArray();

            // Create a map to count products by category with proper typing
            const productCountByCategory: Record<string, number> = {};

            products.forEach(product => {
                const categoryId = product.categoryId;
                if (categoryId) {
                    // Convert ObjectId to string if needed
                    const categoryIdStr = typeof categoryId === 'object' && categoryId instanceof ObjectId ?
                        categoryId.toString() : String(categoryId);

                    if (!productCountByCategory[categoryIdStr]) {
                        productCountByCategory[categoryIdStr] = 0;
                    }
                    productCountByCategory[categoryIdStr]++;
                }
            });

            // Add product count to each category
            const categoriesWithProductCount = categories.map(category => {
                const categoryId = category._id.toString();
                return {
                    ...category,
                    productCount: productCountByCategory[categoryId] || 0
                };
            });

            res.status(200).json(categoriesWithProductCount);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error fetching categories"});
        }
    } else if (req.method === "POST") {
        try {
            const {name, image} = req.body;

            if (!name || !image) {
                return res.status(400).json({error: "Name and image are required"});
            }

            const newCategory = {
                name,
                image,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const result = await db.collection('categories').insertOne(newCategory);
            res.status(201).json({
                _id: result.insertedId,
                ...newCategory,
                productCount: 0
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error creating category"});
        }
    }
}