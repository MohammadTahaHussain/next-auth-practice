// components/EmailSignIn.js
"use client"; // This must be a client component
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function EmailSignIn() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await signIn("email", {
            email,
            redirect: false,
        });

        if (result.error) {
            console.error("Sign-in error:", result.error); // Log the error to the console
            setError(result.error);
        } else {
            alert("Check your email for the sign-in link!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Sign in with Email</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
