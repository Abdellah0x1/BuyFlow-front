import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router"

export default function NotFound() {
    const navigate = useNavigate();
    return <div className="flex flex-col items-center justify-center min-h-screen bg-canvas gap-4">
        <h1 className="text-hero-display text-ink">404</h1>
        <p className="text-lead text-ink-muted-48">Page Not Found</p>
        <p className="text-body-apple text-ink-muted-48 max-w-sm text-center">The page you are looking for doesn't exist or has been moved.</p>
        <button
            className="mt-4 inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white text-body-apple rounded-full px-7 py-3 transition-all duration-200 active-scale"
            onClick={() => navigate("/")}
        >
            <ArrowLeft size={16} />
            Back to Home
        </button>
    </div>
}