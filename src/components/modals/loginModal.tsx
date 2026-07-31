import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { type LoginPayload } from "../../types";
import { LoginRequest } from "@/api/auth";
import { Link } from "react-router";
import { Spinner } from "../Common/Spinner";

const LoginModal = () => {
    const login = useAuthStore((state) => state.login);
    const [open, setOpen] = React.useState(false);
    const [loginData, setLoginData] = useState<LoginPayload>({
        email: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null)


    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        if (!loginData.password || !loginData.email) {
            setError("All fields are required");
            setIsSubmitting(false);
            return;
        }

        if (loginData.password.length < 8) {
            setError("passowrd must contain at least 8 characters")
            setIsSubmitting(false)
            return
        }

        try {
            const res = await LoginRequest(loginData);
            if (res.success) {
                login(res.data);
                setOpen(false);
            } else {
                setError(res.error || "Login failed");
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-brand hover:bg-brand/10 transition-colors">
                    Login
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md z-50 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">

                    <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">Welcome back</Dialog.Title>
                    <Dialog.Description className="text-gray-500 mb-6 text-sm">
                        Enter your credentials to access your account.
                    </Dialog.Description>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error &&
                            <div className="w-full bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-md">{error}</div>
                        }
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="name@example.com"
                                required
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        <Link to="/forgot-password" onClick={() => setOpen(false)} className="text-brand text-sm flex justify-end">Forgot your password ?</Link>
                        <Button disabled={isSubmitting} type="submit" className="w-full bg-brand text-white hover:bg-brand-light mt-4 text-md py-6 rounded-xl">
                            {isSubmitting ? <Spinner /> : "Log in"}
                        </Button>
                        <Link to="/signup" onClick={() => setOpen(false)} className="bg-gray-200 text-center rounded-xl py-3">Sign Up </Link>
                    </form>

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100" aria-label="Close">
                            <X className="w-5 h-5" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default LoginModal;
