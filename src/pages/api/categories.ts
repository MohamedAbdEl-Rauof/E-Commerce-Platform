import clientPromise from '../../lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {ObjectId} from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const {id} = req.query;

    // Only validate ID for methods that require it
    if ((req.method === 'PUT' || req.method === 'DELETE') && (!id || Array.isArray(id))) {
        return res.status(400).json({error: 'Invalid category ID'});
    }

    if (req.method === "GET") {

        try {
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
    } else if (req.method === 'PUT') {
        try {
            const {name, image, createdAt} = req.body;

            if (!name || !image) {
                return res.status(400).json({error: 'Name and image are required'});
            }

            const updatedCategory = {
                name,
                image,
                createdAt: new Date(createdAt),
                updatedAt: new Date()
            };

            const result = await db.collection('categories').updateOne(
                {_id: new ObjectId(id)},
                {$set: updatedCategory}
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({error: 'Category not found'});
            }

            res.status(200).json({
                _id: id,
                ...updatedCategory
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Error updating category'});
        }
    } else if (req.method === 'DELETE') {
        try {
            // Check if category has products
            const productCount = await db.collection('products').countDocuments({
                categoryId: id
            });

            if (productCount > 0) {
                return res.status(400).json({
                    error: `Cannot delete category with ${productCount} products. Remove or reassign products first.`
                });
            }

            const result = await db.collection('categories').deleteOne({
                _id: new ObjectId(id)
            });

            if (result.deletedCount === 0) {
                return res.status(404).json({error: 'Category not found'});
            }

            res.status(200).json({message: 'Category deleted successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Error deleting category'});
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({error: `Method ${req.method} Not Allowed`});
    }
}