import { Navigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const user = useAuthStore(state => state.user);

    const isAllowed = user?.roles?.some((role: string) => allowedRoles.includes(role)) || allowedRoles.includes("user");

    if (isAuthenticated && isAllowed) {
        return children;
    }
    return <Navigate to="/" replace />;
}