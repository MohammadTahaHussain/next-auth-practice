import AuthButton from "@/components/AuthButton";
import EmailSignIn from "@/components/EmailSignIn";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <AuthButton />
      <EmailSignIn/>
    </div>
  );
}

export const metadata = {
  title: 'Home'
}