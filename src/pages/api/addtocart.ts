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
                            quantity: quantity !== undefined ? Math.max(0, quantity) : 0,
                            isFavourite: isFavourite ?? false,
                            rating: rating ?? 0,
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
                    const updates: Partial<CartItem> = {};
                    if (quantity !== undefined) {
                        updates.quantity = Math.max(0, cart.info[existingProductIndex].quantity + quantity);
                    }
                    if (isFavourite !== undefined) {
                        updates.isFavourite = isFavourite;
                    }
                    if (rating !== undefined) {
                        updates.rating = rating;
                    }

                    await cartCollection.updateOne(
                        {_id: cart._id},
                        {
                            $set: {
                                [`info.${existingProductIndex}`]: {
                                    ...cart.info[existingProductIndex],
                                    ...updates,
                                },
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
                                    quantity: quantity !== undefined ? Math.max(0, quantity) : 0,
                                    isFavourite: isFavourite ?? false,
                                    rating: rating ?? 0,
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
    } else if (req.method === 'GET') {
        const {userId} = req.query;

        if (!userId || !ObjectId.isValid(userId as string)) {
            return res.status(401).json({message: "Unauthorized or invalid user ID"});
        }

        try {
            const cart = await db.collection('cart').findOne({userId: new ObjectId(userId as string)});

            if (!cart) {
                return res.status(404).json({message: "Cart not found"});
            }

            res.status(200).json(cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({message: "An error occurred while fetching the cart"});
        }
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}