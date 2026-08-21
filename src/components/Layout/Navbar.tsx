import { Link } from "react-router";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Hexagon, Menu, X, User } from "lucide-react";
import LoginModal from "../modals/loginModal";
import { useAuthStore } from "../../store/authStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingCartDrawer } from "../Common/ShoppingCartDrawer";
import ErrorBoundary from "../Common/ErrorBoundary";

export function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    // Close mobile menu on route change / resize
    useEffect(() => {
        const close = () => setIsMobileMenuOpen(false);
        window.addEventListener("resize", close);
        return () => window.removeEventListener("resize", close);
    }, []);

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-surface-black">
            <div className="mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px]">

                {/* Left: Mobile toggle + Logo */}
                <div className="flex items-center gap-4">
                    {isMobile && (
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <Hexagon className="h-5 w-5" />
                        <span className="hidden sm:block text-nav-link font-medium tracking-tight">BuyFlow</span>
                    </Link>
                </div>

                {/* Center: Desktop nav links */}
                {!isMobile && (
                    <nav className="flex items-center gap-6">
                        <Link to="/products" className="text-nav-link text-white/80 hover:text-white transition-colors">
                            Products
                        </Link>
                        <Link to="/about" className="text-nav-link text-white/80 hover:text-white transition-colors">
                            About
                        </Link>
                    </nav>
                )}

                {/* Right: Cart + User actions */}
                <div className="flex items-center gap-3">
                    <ShoppingCartDrawer />

                    {!isMobile && (
                        isAuthenticated ? (
                            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/15">
                                <Link
                                    to={user?.roles?.includes("ROLE_SELLER") ? "/seller" : "/profile"}
                                    className="text-nav-link font-medium flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
                                >
                                    <User size={14} />
                                    {user?.username}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-nav-link text-white/60 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="ml-2 pl-3 border-l border-white/15">
                                <ErrorBoundary>
                                    <LoginModal />
                                </ErrorBoundary>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMobile && isMobileMenuOpen && (
                <div className="absolute left-0 top-11 w-full bg-surface-black border-t border-white/10 p-5 flex flex-col gap-4 animate-[fadeInUp_0.15s_ease-out]">
                    <nav className="flex flex-col gap-4">
                        <Link
                            to="/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-body-apple text-white/80 hover:text-white transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-body-apple text-white/80 hover:text-white transition-colors"
                        >
                            About
                        </Link>
                    </nav>
                    <div className="h-px bg-white/10" />
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                            <Link
                                to={user?.roles?.includes("ROLE_SELLER") ? "/seller" : "/profile"}
                                className="flex items-center gap-2 text-white/90"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <User size={16} /> {user?.username}
                            </Link>
                            <button
                                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                className="text-left text-white/60 hover:text-white text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ErrorBoundary>
                            <LoginModal />
                        </ErrorBoundary>
                    )}
                </div>
            )}
        </header>
    );
}
