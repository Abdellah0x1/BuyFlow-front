import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SellerSideBar } from "./SellerSideBar";
import { Spinner } from "../Common/Spinner";

export default function SellerLayout() {
    const user = useAuthStore(state => state.user);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const hasCheckedAuth = useAuthStore(state => state.hasCheckedAuth);

    if (!hasCheckedAuth) {
        return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>;
    }

    if (!isAuthenticated || (!user?.roles?.includes('ROLE_SELLER') && !user?.roles?.includes("SELLER"))) {
        return <Navigate to="/" replace />;
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
