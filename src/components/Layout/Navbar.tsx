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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = useIsMobile();


    console.log("user : ", user)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper to determine navbar background style based on scroll
    const navBackground = isScrolled
        ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
        : "bg-transparent";

    return (
        <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-300 ${navBackground}`}>
            <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* 1. Left side: Mobile Menu Toggle & Logo */}
                <div className="flex items-center gap-4">
                    {isMobile && (
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-black"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight ">
                        <Hexagon className="h-6 w-6 text-brand " />
                        <span className="hidden sm:block text-brand">BuyFlow</span>
                    </Link>
                </div>

                {/* 2. Middle: Desktop Navigation & Search */}
                {!isMobile && (
                    <div className="flex flex-1 items-center justify-center gap-8 px-8">
                        <nav className="flex gap-6 text-sm font-medium text-gray-600">
                            <Link to="/products" className="hover:text-black transition-colors">Products</Link>
                            <Link to="/categories" className="hover:text-black transition-colors">Categories</Link>
                            <Link to="/deals" className="hover:text-black transition-colors">Deals</Link>
                        </nav>
                    </div>
                )}

                {/* 3. Right side: Actions (Cart, Profile) */}
                <div className="flex items-center gap-4">

                    {/* <Link to={isAuthenticated ? "/cart" : "/login"} className="relative text-gray-600 hover:text-black">
                        
                    </Link> */}
                    <ShoppingCartDrawer />

                    {!isMobile && (
                        isAuthenticated ? (
                            <div className="flex items-center gap-4 ml-4 border-l pl-4">
                                <Link to={user?.roles?.includes("ROLE_SELLER") ? "/seller" : "/profile"} className="text-sm font-medium flex items-center gap-2 bg-brand/90 px-2 py-1 rounded-full text-white cursor-pointer hover:bg-brand-light">
                                    <User size={18} />
                                    {user?.username}
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <div className="ml-4 border-l pl-4">
                                <ErrorBoundary>
                                    <LoginModal />
                                </ErrorBoundary>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobile && isMobileMenuOpen && (
                <div className="absolute left-0 top-16 w-full bg-white border-b shadow-lg p-4 flex flex-col gap-4">
                    <nav className="flex flex-col gap-4 text-base font-medium text-gray-700">
                        <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                        <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
                        <Link to="/deals" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
                    </nav>
                    <hr className="border-gray-100" />
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-4">
                            <Link to={user?.roles?.includes("ROLE_SELLER") ? " / seller" : " / profile"} className="flex items - center gap - 2"><User size={18} /> {user?.username}</Link>
                            <Button variant="outline" className="w-full justify-center" onClick={logout} > Logout</Button>
                        </div>
                    ) : (
                        <ErrorBoundary>
                            <LoginModal />
                        </ErrorBoundary>
                    )}
                </div>
            )
            }
        </header >
    );
}
