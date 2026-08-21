import { FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect, type ChangeEvent } from "react";
import type { SingUpPayload } from "@/types";
import { Spinner } from "@/components/Common/Spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { singUpRequest } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { Hexagon } from "lucide-react";


export default function SignUp() {
    const [signUpData, setSignUpData] = useState<SingUpPayload>({
        username: "",
        email: "",
        password: "",
        roles: ["user"]
    })
    const [error, setError] = useState<{ username?: string, email?: string, password?: string } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setIsSubmitting(true)

        if (signUpData.username.length < 3) {
            setError({ username: "Username must be at least 3 characters long" })
            setIsSubmitting(false)
            return
        }
        if (signUpData.password.length < 8) {
            setError({ password: "Password must be at least 8 characters long" })
            setIsSubmitting(false)
            return
        }

        try {
            const res = await singUpRequest(signUpData);
            if (res.success) {
                setError(null)
                setIsSubmitting(false)
                setSignUpData({
                    username: "",
                    email: "",
                    password: "",
                    roles: ["user"]
                })
                login({ email: res.data.email, roles: res.data.roles, username: res.data.username })
                toast.success("Account created successfully")
                navigate("/")
            } else if (!res.success && res.error) {
                toast.error(res.error)
                setIsSubmitting(false)
            }
        } catch {
            toast.error("Something went wrong please try again")
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-canvas-parchment">
            <form onSubmit={handleSubmit} className="space-y-5 p-8 bg-canvas border border-hairline rounded-[18px] w-full max-w-md mx-4">

                {/* Logo + Title */}
                <div className="text-center mb-2">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Hexagon className="h-6 w-6 text-brand" />
                    </div>
                    <h1 className="text-tagline text-ink">Create your account</h1>
                    <p className="text-caption-apple text-ink-muted-48 mt-1">Join BuyFlow today</p>
                </div>

                <FieldSet>
                    <Label className="text-caption-strong text-ink-muted-80">Username</Label>
                    <Input
                        value={signUpData.username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSignUpData({ ...signUpData, username: e.target.value })}
                        className={`rounded-[11px] border-hairline h-11 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 ${error?.username ? "border-red-400" : ""}`}
                        placeholder="Enter username"
                        name="username"
                    />
                    {error?.username && <p className="text-red-500 text-caption-apple">{error.username}</p>}
                </FieldSet>

                <FieldSet>
                    <Label className="text-caption-strong text-ink-muted-80">Role</Label>
                    <Select value={signUpData.roles[0]} onValueChange={(value) => setSignUpData({ ...signUpData, roles: [value as string] })}>
                        <SelectTrigger className="w-full rounded-[11px] border-hairline h-11 text-body-apple">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                        </SelectContent>
                    </Select>
                </FieldSet>

                <FieldSet>
                    <Label className="text-caption-strong text-ink-muted-80">Email</Label>
                    <Input
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className={`rounded-[11px] border-hairline h-11 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 ${error?.email ? "border-red-400" : ""}`}
                        placeholder="Enter email"
                        name="email"
                        type="email"
                    />
                    {error?.email && <p className="text-red-500 text-caption-apple">{error.email}</p>}
                </FieldSet>

                <FieldSet>
                    <Label className="text-caption-strong text-ink-muted-80">Password</Label>
                    <Input
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className={`rounded-[11px] border-hairline h-11 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 ${error?.password ? "border-red-400" : ""}`}
                        placeholder="Enter password"
                        name="password"
                        type="password"
                    />
                    {error?.password && <p className="text-red-500 text-caption-apple">{error.password}</p>}
                </FieldSet>

                <button
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-light text-white text-body-apple rounded-full h-11 mt-2 transition-all duration-200 active-scale disabled:opacity-50"
                    type="submit"
                >
                    {isSubmitting ? <Spinner /> : "Sign Up"}
                </button>

                <p className="text-center text-caption-apple text-ink-muted-48">
                    Already have an account?{" "}
                    <Link to="/" className="text-brand hover:text-brand-light transition-colors">Log in</Link>
                </p>
            </form>
        </div>
    )
}
