import { SignIn } from "@clerk/nextjs";

export function Login() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignIn routing="hash" />
        </div>
    )
}