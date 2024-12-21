import NextAuth, {AuthOptions, DefaultSession, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
        id: string;
    }
}

interface CustomUser extends User {
    id: string;
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
                token.role = (user as CustomUser).role;
                token.id = (user as CustomUser).id;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
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