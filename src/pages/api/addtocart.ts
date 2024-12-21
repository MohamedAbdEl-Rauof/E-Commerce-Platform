import clientPromise from '@/lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {ObjectId} from 'mongodb';

interface CartItem {
    productId: ObjectId;
    quantity: number;
    isFavourite: boolean;
    rating: number;
}

interface Cart {
    userId: ObjectId;
    info: CartItem[];
}

// this api can insert new or update on old one
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === 'POST') {
        const {userId, productId, quantity, isFavourite, rating} = req.body;

        if (!userId || !ObjectId.isValid(userId)) {
            return res.status(401).json({message: "Unauthorized or invalid user ID"});
        }

        if (!productId || !ObjectId.isValid(productId)) {
            return res.status(400).json({message: "Invalid product ID"});
        }

        try {
            const cartCollection = db.collection<Cart>("cart");
            const cart = await cartCollection.findOne({userId: new ObjectId(userId)});

            if (!cart) {
                const newCart: Cart = {
                    userId: new ObjectId(userId),
                    info: [
                        {
                            productId: new ObjectId(productId),
                            quantity,
                            isFavourite,
                            rating,
                        },
                    ],
                };

                await cartCollection.insertOne(newCart);
                return res.status(200).json({message: "Product added to the cart successfully"});
            } else {
                const existingProductIndex = cart.info.findIndex(
                    (item: CartItem) => item.productId.toString() === productId
                );

                if (existingProductIndex !== -1) {
                    await cartCollection.updateOne(
                        {_id: cart._id},
                        {
                            $inc: {[`info.${existingProductIndex}.quantity`]: quantity},
                            $set: {
                                [`info.${existingProductIndex}.isFavourite`]: isFavourite,
                                [`info.${existingProductIndex}.rating`]: rating,
                            },
                        }
                    );
                } else {
                    await cartCollection.updateOne(
                        {_id: cart._id},
                        {
                            $push: {
                                info: {
                                    productId: new ObjectId(productId),
                                    quantity,
                                    isFavourite,
                                    rating,
                                } as CartItem,
                            },
                        }
                    );
                }
            }

            res.status(200).json({message: "Product added to cart successfully"});
        } catch (error) {
            console.error("Error adding to cart:", error);
            res.status(500).json({message: "An error occurred while adding to cart"});
        }
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}