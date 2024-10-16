// /api/user/[id]/route.js

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req, { params }) {
    const session = await getServerSession({ req, ...authOptions }); // Ensure you pass req as an object

    if (!session) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userData = await db.collection("users").findOne({ email: session.user.email });

    if (!userData) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(userData), { status: 200 });
}
