import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router"

export default function NotFound() {
    const navigate = useNavigate();
    return <div className="flex flex-col items-center justify-center min-h-screen">

        <h1 className="text-6xl font-bold text-brand">404</h1>
        <p className="text-xl mt-4 text-brand">Page Not Found</p>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Button className="mt-4 text-white bg-brand hover:bg-brand-dark cursor-pointer" onClick={() => navigate("/")}>Back to Home</Button>
    </div>
}