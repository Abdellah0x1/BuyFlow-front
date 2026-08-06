import { Navigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { Spinner } from "../Common/Spinner";

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const hasCheckedAuth = useAuthStore(state => state.hasCheckedAuth);
    const user = useAuthStore(state => state.user);

    const isAllowed = user?.roles?.some((role: string) => allowedRoles.includes(role)) || allowedRoles.includes("user");

    if (!hasCheckedAuth) {
        return <div className="flex min-h-[40vh] items-center justify-center"><Spinner /></div>;
    }

    if (isAuthenticated && isAllowed) {
        return children;
    }
    return <Navigate to="/" replace />;
}
