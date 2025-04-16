import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

interface UpdateUserData {
    name: string;
    username: string;
    email: string;
    phone: string;
    image?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "POST") {
        try {
            const {name, username, email, phone, password} = req.body;

            // Check if a user with the same email exists
            const existingEmail = await db.collection("users").findOne({email});
            if (existingEmail) {
                return res
                    .status(409)
                    .json({error: "A user with this email already exists"});
            }

            // Check if a user with the same phone number exists
            const existingPhone = await db.collection("users").findOne({phone});
            if (existingPhone) {
                return res
                    .status(409)
                    .json({error: "A user with this phone number already exists"});
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

            // If no duplicates are found, proceed to create a new user
            const newUser = {
                name,
                username,
                email,
                phone,
                password: hashedPassword,
            };

            const result = await db.collection("users").insertOne(newUser);

            res
                .status(201)
                .json({message: "User created", userId: result.insertedId});
        } catch (e) {
            console.error(e);
            res.status(500).json({error: "Error creating user"});
        }
    } else if (req.method === "PUT") {
        try {
            const {userId} = req.query;
            const {id: bodyId, name, username, email, phone, image} = req.body;
            // Use userId from query params if available, otherwise use id from body
            const id = userId || bodyId;

            // Ensure the ID is provided
            if (!id) {
                return res.status(400).json({error: "User ID is required"});
            }

            // Ensure the ID is a valid MongoDB ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({error: "Invalid User ID"});
            }

            // Find the user by ID
            const existingUser = await db.collection("users").findOne({_id: new ObjectId(id as string)});
            if (!existingUser) {
                return res.status(404).json({error: "User not found"});
            }

            // Check if a user with the same email exists, but exclude the current user
            const existingEmail = await db.collection("users").findOne({email, _id: {$ne: new ObjectId(id as string)}});
            if (existingEmail) {
                return res.status(409).json({error: "A user with this email already exists"});
            }

            // Check if a user with the same phone number exists, but exclude the current user
            const existingPhone = await db.collection("users").findOne({phone, _id: {$ne: new ObjectId(id as string)}});
            if (existingPhone) {
                return res.status(409).json({error: "A user with this phone number already exists"});
            }

            const updateObject: UpdateUserData = {
                name,
                username,
                email,
                phone,
            };

            if (image) {
                updateObject.image = image;
            }

            const updatedUser = await db.collection("users").findOneAndUpdate(
                {_id: new ObjectId(id as string)},
                {$set: updateObject},
                {returnDocument: "after"}
            );
            
            if (!updatedUser) {
                return res.status(404).json({error: "User not found after update"});
            }

            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Error in PUT method:", error);
            res.status(500).json({error: "Error updating user data"});
        }
    } else if (req.method === "GET") {
        try {
            const {id} = req.query;

            if (id) {
                const user = await db
                    .collection("users")
                    .findOne({_id: new ObjectId(id as string)});
                if (!user) {
                    return res.status(404).json({error: "User not found"});
                }
                return res.status(200).json(user);
            }

            const users = await db.collection("users").find({}).toArray();
            res.status(200).json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({error: "Error fetching users"});
        }
    } else {
        res.setHeader("Allow", ["POST", "PUT", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
