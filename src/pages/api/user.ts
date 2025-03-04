import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("e-commerce");

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
            const {id, firstName, username, email, phone} = req.body;

            // Ensure the user ID is provided
            if (!id) {
                return res.status(400).json({error: "User ID is required"});
            }

            // Log the ID and its conversion to ObjectId
            console.log("Incoming ID:", id);
            console.log("Converted ObjectId:", new ObjectId(id));

            // Ensure the ID is a valid MongoDB ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({error: "Invalid User ID"});
            }

            // Check if the user exists by ID before updating
            const existingUser = await db
                .collection("users")
                .findOne({_id: new ObjectId(id)});
            if (!existingUser) {
                return res.status(404).json({error: "User not found"});
            }

            // Check if a user with the same email exists, but exclude the current user
            const existingEmail = await db.collection("users").findOne({email});
            if (existingEmail && existingEmail._id.toString() !== id) {
                return res
                    .status(409)
                    .json({error: "A user with this email already exists"});
            }

            // Check if a user with the same phone number exists, but exclude the current user
            const existingPhone = await db.collection("users").findOne({phone});
            if (existingPhone && existingPhone._id.toString() !== id) {
                return res
                    .status(409)
                    .json({error: "A user with this phone number already exists"});
            }

            // Proceed to update the user
            const updatedUser = await db.collection("users").findOneAndUpdate(
                {_id: new ObjectId(id)},
                {
                    $set: {
                        name: firstName,
                        username,
                        email,
                        phone,
                    },
                },
                {returnDocument: "after"},
            );

            if (!updatedUser?.value) {
                return res.status(404).json({error: "User not found"});
            }

            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser.value,
            });
        } catch (error) {
            console.error(error);
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
