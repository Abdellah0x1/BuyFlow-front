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

    //layout for seller dashboard to catain : seller infos , products, charts, orders , payments and stuff 
    return <div>
        <SidebarProvider>
            <SellerSideBar />
            <SidebarTrigger />
            <main className="w-full flex-1 bg-gray-100 px-10 py-15 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </SidebarProvider>
    </div>
}