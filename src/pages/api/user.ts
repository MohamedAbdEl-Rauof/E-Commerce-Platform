import clientPromise from '@/lib/mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);


    if (req.method === 'POST') {
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
    }

}

