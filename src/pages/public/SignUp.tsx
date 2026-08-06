import { FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, type ChangeEvent } from "react";
import type { SingUpPayload } from "@/types";
import { Spinner } from "@/components/Common/Spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { singUpRequest } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";


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
            console.log("sign up data ", signUpData)
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
        <div className="flex items-center justify-center min-h-screen">

            <form onSubmit={handleSubmit} className="shadow-md space-y-6 p-4  border border-gray-200 min-w-sm min-h-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Welcome to <span className="font-bold text-brand">BuyFlow</span></h1>
                <FieldSet>
                    <Label>Username</Label>
                    <Input value={signUpData.username} onChange={(e: ChangeEvent<HTMLInputElement>) => setSignUpData({ ...signUpData, username: e.target.value })} className={`border border-gray-200 p-6 ${error?.username ? "border-red-500" : ""}`} placeholder="Enter username" name="username" />
                    {error?.username && <p className="text-red-500 text-sm">{error.username}</p>}
                </FieldSet>
                <FieldSet>
                    <Label>Role</Label>
                    <Select value={signUpData.roles[0]} onValueChange={(value) => setSignUpData({ ...signUpData, roles: [value as string] })}>
                        <SelectTrigger className="w-full p-6 ">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                        </SelectContent>
                    </Select>
                </FieldSet>
                <FieldSet>
                    <Label>Email</Label>
                    <Input value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} className={`border border-gray-200 p-6 ${error?.email ? "border-red-500" : ""}`} placeholder="Enter email" name="email" type="email" />
                    {error?.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </FieldSet>
                <FieldSet>
                    <Label>Password</Label>
                    <Input value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} className={`border p-6 border-gray-200  ${error?.password ? "border-red-500" : ""}`} placeholder="Enter password" name="password" type="password" />
                    {error?.password && <p className="text-red-500 text-sm">{error.password}</p>}
                </FieldSet>
                <Button disabled={isSubmitting} className="w-full text-white p-6 bg-brand hover:bg-brand-dark cursor-pointer" type="submit">
                    {isSubmitting ? <Spinner /> : "Sign Up"}
                </Button>
            </form>
        </div>
    )
}
