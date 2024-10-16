import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import nodemailer from "nodemailer";

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        EmailProvider({
            server: {
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
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
            session.user.id = user.id; // Optionally add user ID to session
            return session;
        },
    },
});

export { handler as GET, handler as POST };
