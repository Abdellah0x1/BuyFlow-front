import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SellerSideBar } from "./SellerSideBar";
import { Spinner } from "../Common/Spinner";
import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotificationStore";
import { Button } from "../ui/button";

import { useNotificationsStore } from "@/store/notificationStore";

export default function SellerLayout() {
    const user = useAuthStore(state => state.user);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const hasCheckedAuth = useAuthStore(state => state.hasCheckedAuth);
    const { notifications, unreadCount, markAllRead } = useNotificationsStore();
    useNotifications()

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
                    <header className="h-16 flex justify-between items-center gap-4 border-b bg-white/50 backdrop-blur-sm px-6 sticky top-0 z-10">
                        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-1  text-xs">
                                            {unreadCount}
                                        </span>
                                    )}
                                    <Bell className="relative cursor-pointer text-slate-500 hover:text-slate-900" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-58 bg-white"  >
                                    <DropdownMenuGroup className="flex flex-col gap-2 justify-center">
                                        <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
                                        {unreadCount > 0 && <Button variant={"ghost"} className="text-xs justify-end bg-none hover:bg-transparent text-end text-brand cursor-pointer" onClick={() => markAllRead()}>Read All</Button>}
                                        {notifications.length > 0 ? notifications.map(notif => <DropdownMenuLabel key={notif.id} className="p-2 border-b border-gray-200">
                                            {notif.message}
                                            <span className="block font-bold text-xs text-end"> {new Date(notif.createdAt).toLocaleDateString()}</span>
                                        </DropdownMenuLabel>) : <p className=" text-muted-foreground">No notifications found</p>}

                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
