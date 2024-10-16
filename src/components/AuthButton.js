// Inside your component
"use client"; // This must be a client component
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession(); // Destructure status

  // Log session and status for debugging
  console.log("Session:", session);
  console.log("Status:", status);

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while session is being fetched
  }

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("github")}>Sign in with GitHub</button>;
}
