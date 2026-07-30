import { Outlet } from "react-router";
import { Navbar } from "../../components/Layout/Navbar";
import { Footer } from "../../components/Layout/Footer";

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Navbar />
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}