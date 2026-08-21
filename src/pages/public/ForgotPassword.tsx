import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Common/Spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Hexagon } from "lucide-react";

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
    return <div className="flex items-center justify-center min-h-screen bg-canvas-parchment">
        <form onSubmit={handleSubmit} className="p-8 bg-canvas border border-hairline rounded-[18px] w-full max-w-md mx-4 space-y-5">

            {/* Logo + Title */}
            <div className="text-center mb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Hexagon className="h-6 w-6 text-brand" />
                </div>
                <h1 className="text-tagline text-ink">Forgot Password</h1>
                <p className="text-caption-apple text-ink-muted-48 mt-1">Enter your email to receive a reset link</p>
            </div>

            <div className="space-y-2">
                <Label className="text-caption-strong text-ink-muted-80">Email</Label>
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                    className={`rounded-[11px] border-hairline h-11 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 ${error ? "border-red-400" : ""}`}
                />
                {error && <p className="text-red-500 text-caption-apple">{error}</p>}
            </div>

            <div className="flex flex-col gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-light text-white text-body-apple rounded-full h-11 transition-all duration-200 active-scale disabled:opacity-50"
                >
                    {isSubmitting ? <Spinner /> : "Send Reset Link"}
                </button>
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => navigate("/")}
                    className="w-full rounded-full h-11 border border-hairline text-body-apple text-ink-muted-80 hover:bg-canvas-parchment transition-all duration-200 active-scale"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
}