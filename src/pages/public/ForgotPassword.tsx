import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Common/Spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true)

        if (email.length === 0) {
            setError("Email is required");
            setIsSubmitting(false)
            return
        }

        if (!email.includes("@")) {
            setError("Invalid email");
            setIsSubmitting(false);
            return
        }
        toast.success("Reset Link sent successfully, please check your email")
        navigate("/")
    }
    return <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="shadow-md p-6 min-w-sm border border-zinc-200 rounded-md space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
            <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" className={`p-2 ${error ? "border-red-500" : ""}`} />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="flex flex-col gap-3 mt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-brand text-white cursor-pointer py-6  tranasition-all duration-300 hover:bg-brand-dark">{isSubmitting ? <Spinner /> : "Send Reset Link"}</Button>
                <Button type="button" disabled={isSubmitting} onClick={() => navigate("/")} className="w-full text-center bg-gray-100 py-6 text-gray-800 transition-all duration-300 hover:bg-gray-200 cursor-pointer rounded-xl">Cancel</Button>
            </div>
        </form>
    </div>
}