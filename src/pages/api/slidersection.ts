import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("slider-section");

    if (req.method === "GET") {
        try {
            const sliderSection = await collection.findOne({});
            res.status(200).json(sliderSection ? [sliderSection] : []);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error fetching slider section"});
        }
    } else if (req.method === "POST") {
        try {
            const {url, alt} = req.body;

            if (!url || !alt) {
                return res.status(400).json({error: "URL and alt text are required"});
            }

            // Check if the URL already exists
            const existingImage = await collection.findOne({"images.url": url});
            if (existingImage) {
                return res.status(400).json({error: "An image with this URL already exists"});
            }

            const now = new Date();
            const newImage = {
                id: new ObjectId(),
                url,
                alt,
                createdAt: now,
                updatedAt: now
            };

            const result = await collection.updateOne(
                {},
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    $push: {images: {$each: [newImage]}},
                    $setOnInsert: {createdAt: now},
                    $set: {updatedAt: now}
                },
                {upsert: true}
            );

            if (result.acknowledged) {
                res.status(201).json({
                    message: "Image added to slider section successfully",
                });
            } else {
                throw new Error("Failed to update slider section");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error updating slider section"});
        }
    } else if (req.method === "PUT") {
        try {
            const {id, url, alt} = req.body;

            if (!id || !url || !alt) {
                return res.status(400).json({error: "ID, URL, and alt text are required"});
            }

            const now = new Date();

            const result = await collection.updateOne(
                {"images.id": new ObjectId(id)},
                {
                    $set: {
                        "images.$.url": url,
                        "images.$.alt": alt,
                        "images.$.updatedAt": now,
                        updatedAt: now
                    }
                }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({error: "Image not found"});
            }

            if (result.modifiedCount === 0) {
                return res.status(400).json({error: "No changes were made"});
            }

            res.status(200).json({
                message: "Image updated successfully",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error updating image"});
        }
    } else if (req.method === "DELETE") {
        try {
            const {id} = req.query;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({error: "Valid image ID is required"});
            }

            const [sliderId, imageId] = id.split('-');

            if (!sliderId || !imageId) {
                return res.status(400).json({error: "Invalid ID format"});
            }

            const result = await collection.updateOne(
                {_id: new ObjectId(sliderId)},
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    $pull: {images: {id: new ObjectId(imageId)}},
                    $set: {updatedAt: new Date()}
                }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({error: "Slider section not found"});
            }

            if (result.modifiedCount === 0) {
                return res.status(404).json({error: "Image not found"});
            }

            res.status(200).json({
                message: "Image deleted successfully",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error deleting image"});
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}