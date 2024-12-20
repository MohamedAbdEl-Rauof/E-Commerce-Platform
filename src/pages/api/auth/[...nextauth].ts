import NextAuth, {AuthOptions, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import {JWT} from "next-auth/jwt";


interface CustomUser extends User {
    role: string;
    id: string;
}

interface CustomJWT extends JWT {
    role: string;
    id: string;
}

interface CustomSession extends Session {
    user: {
        role: string;
        id: string;
    } & Session["user"];
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const client = await clientPromise;
                await client.connect();
                const db = client.db(process.env.MONGODB_DB);
                const user = await db.collection("users").findOne({email: credentials.email});

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.email === process.env.ADMIN_EMAIL ? "admin" : "user",
                } as CustomUser;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                const customUser = user as CustomUser;
                token.role = customUser.role;
                token.id = customUser.id;
            }
            return token as CustomJWT;
        },
        async session({session, token}) {
            const customSession = session as CustomSession;
            if (customSession?.user) {
                customSession.user.role = (token as CustomJWT).role;
                customSession.user.id = (token as CustomJWT).id;
            }
            return customSession;
        },
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);