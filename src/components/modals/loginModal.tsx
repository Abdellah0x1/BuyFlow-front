import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
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
        } catch {
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="text-nav-link text-white/80 hover:text-white transition-colors">
                    Login
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-in fade-in" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-canvas rounded-[18px] border border-hairline p-8 w-[90vw] max-w-md z-50 animate-in fade-in zoom-in-95 duration-200">

                    <Dialog.Title className="text-tagline text-ink">Welcome back</Dialog.Title>
                    <Dialog.Description className="text-caption-apple text-ink-muted-48 mt-1 mb-6">
                        Enter your credentials to access your account.
                    </Dialog.Description>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error &&
                            <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-[11px] text-caption-apple">{error}</div>
                        }
                        <div className="space-y-2">
                            <label className="text-caption-strong text-ink-muted-80" htmlFor="email">Email</label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="name@example.com"
                                required
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="rounded-[11px] border-hairline h-11 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 focus-visible:border-brand/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-caption-strong text-ink-muted-80" htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="rounded-[11px] border-hairline h-11 text-body-apple text-ink focus-visible:ring-1 focus-visible:ring-brand/40 focus-visible:border-brand/30"
                            />
                        </div>
                        <Link to="/forgot-password" onClick={() => setOpen(false)} className="text-caption-apple text-brand hover:text-brand-light flex justify-end transition-colors">Forgot your password?</Link>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-brand hover:bg-brand-light text-white text-body-apple rounded-full h-11 mt-2 transition-all duration-200 active-scale disabled:opacity-50"
                        >
                            {isSubmitting ? <Spinner /> : "Log in"}
                        </button>
                        <Link
                            to="/signup"
                            onClick={() => setOpen(false)}
                            className="text-body-apple text-brand text-center hover:text-brand-light transition-colors"
                        >
                            Create an account
                        </Link>
                    </form>

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 text-ink-muted-48 hover:text-ink transition-colors p-1.5 rounded-full hover:bg-canvas-parchment" aria-label="Close">
                            <X className="w-4 h-4" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default LoginModal;
