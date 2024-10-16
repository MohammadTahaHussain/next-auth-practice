// /api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        maxAge: 1 * 24 * 60 * 60, // 1 day
        updateAge: 24 * 60 * 60, // 24 hours
    },

    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id; // Example: Add user ID to session
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Example: Add user ID to token
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }; // Export authOptions for use in other files
