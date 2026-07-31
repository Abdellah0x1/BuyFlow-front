import { useAuthStore } from "@/store/authStore"
import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SellerSideBar } from "./SellerSideBar";

export default function SellerLayout() {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();

    if (!user?.roles?.includes('ROLE_SELLER') && !user?.roles?.includes("SELLER")) {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            <SidebarProvider>
                <SellerSideBar />
                <main className="flex-1 flex flex-col w-full h-screen overflow-hidden">
                    <header className="h-16 flex items-center gap-4 border-b bg-white/50 backdrop-blur-sm px-6 sticky top-0 z-10">
                        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
                    </header>
                    <div className="flex-1 overflow-auto p-6 md:p-10">
                        <div className="mx-auto max-w-7xl">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}