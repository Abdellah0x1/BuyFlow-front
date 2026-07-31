import { Sidebar, SidebarContent, SidebarTrigger, SidebarGroup } from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore";
import { Link, useLocation } from "react-router"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, LogOut } from "lucide-react";

export function SellerSideBar() {
    const path = useLocation();
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)

    const navLinks = [
        { to: "/seller", name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, isActive: path.pathname === "/seller" || path.pathname === "/seller/" },
        { to: "/seller/orders", name: "Orders", icon: <ShoppingCart className="h-5 w-5" />, isActive: path.pathname.includes("orders") },
        { to: "/seller/products", name: "Products", icon: <Package className="h-5 w-5" />, isActive: path.pathname.includes("products") },
        { to: "/seller/messages", name: "Messages", icon: <MessageSquare className="h-5 w-5" />, isActive: path.pathname.includes("messages") },
    ]

    return (
        <Sidebar className="border-r border-slate-200 bg-white">
            <SidebarContent className="flex flex-col h-full py-4">
                <div className="px-6 pb-6 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-bold text-xl">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-500">Welcome back</span>
                            <span className="text-base font-bold text-slate-900 capitalize tracking-tight">{user?.username}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-4 space-y-1">
                    {navLinks.map((link) => (
                        <SidebarGroup key={link.to} className="p-0">
                            <Link 
                                to={link.to}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                                    ${link.isActive 
                                        ? "bg-brand/10 text-brand" 
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        </SidebarGroup>
                    ))}
                </div>

                <div className="p-4 mt-auto">
                    <Button 
                        onClick={logout} 
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </Button>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}