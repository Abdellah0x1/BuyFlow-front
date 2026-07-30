import { Sidebar, SidebarContent, SidebarTrigger, SidebarGroup } from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore";
import { Link, useLocation } from "react-router"
import { Button } from "@/components/ui/button"


export function SellerSideBar() {
    const path = useLocation();
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)

    const navLinks = [
        { to: "/seller", name: "Dashboard", isActive: path.pathname == "/seller" },
        { to: "orders", name: "Orders", isActive: path.pathname.includes("orders") },
        { to: "products", name: "Products", isActive: path.pathname.includes("products") },
        { to: "messages", name: "Messages", isActive: path.pathname.includes("messages") },
    ]

    return <div>
        <Sidebar >
            <SidebarContent className="flex-1 min-h-screen p-2">
                <div className="flex-1">
                    <SidebarTrigger />
                    <div className="p-4 mb-6 border-b border-muted">
                        <div className="text-lg font-medium capitalize flex items-center gap-2">
                            Welcome
                            <span className="text-brand">{user?.username}</span>
                        </div>
                    </div>
                    <SidebarGroup>
                        {navLinks.map((link) => (
                            <SidebarGroup key={link.to} className={`cursor-pointer transition-all duration-300 hover:bg-primary/5 rounded-md p-2 mb-2 ${link.isActive ? "bg-primary/5 border-l-2 border-l-brand" : ""}`}>
                                <Link to={link.to}>{link.name}</Link>
                            </SidebarGroup>
                        ))}

                    </SidebarGroup>
                </div>

                <Button onClick={logout} className="self-end w-full bg-brand text-white transition-all duration-300 hover:bg-brand/80 cursor-pointer">
                    Sign out
                </Button>
            </SidebarContent>
        </Sidebar>
    </div>
}