import { Outlet, Link, useLocation } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";
import { Spinner } from "@/components/Common/Spinner";
import { User, ShoppingBag, MapPin, ArrowLeft, ChevronRight } from "lucide-react";

export default function ProfileLayout() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
    const location = useLocation();

    if (!hasCheckedAuth) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const navLinks = [
        {
            to: "/profile",
            label: "Profile Info",
            icon: <User className="h-4 w-4" />,
            isActive: location.pathname === "/profile" || location.pathname === "/profile/",
        },
        {
            to: "/profile/orders",
            label: "My Orders",
            icon: <ShoppingBag className="h-4 w-4" />,
            isActive: location.pathname.includes("/profile/orders"),
        },
        {
            to: "/profile/address",
            label: "Addresses",
            icon: <MapPin className="h-4 w-4" />,
            isActive: location.pathname.includes("/profile/address"),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Top bar */}
            <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center gap-3">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-brand"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            Back to shop
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-sm font-semibold text-slate-800">My Account</span>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8 flex items-center gap-4">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Welcome, <span className="text-brand">{user?.username}</span>
                        </h1>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar — desktop: vertical, mobile: horizontal tabs */}

                    {/* Desktop sidebar */}
                    <aside className="hidden md:block md:w-64 shrink-0">
                        <nav className="sticky top-24 space-y-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                                        ${link.isActive
                                            ? "bg-brand/10 text-brand shadow-sm"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        {link.icon}
                                        {link.label}
                                    </span>
                                    {link.isActive && <ChevronRight className="h-4 w-4 text-brand/60" />}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Mobile horizontal tabs */}
                    <div className="md:hidden overflow-x-auto -mx-4 px-4">
                        <nav className="flex gap-2 pb-2 min-w-max">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200
                                        ${link.isActive
                                            ? "bg-brand text-white shadow-md shadow-brand/25"
                                            : "bg-white text-slate-600 border border-gray-200 hover:border-brand/30 hover:text-brand"
                                        }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Main content */}
                    <main className="flex-1 min-w-0">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
