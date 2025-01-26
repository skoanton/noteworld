import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

type AdminRouteProps = {
    children: React.ReactNode;
}


interface TokenPayload {
    exp: number;
    role: string;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const token = localStorage.getItem("token");
    const role = "ADMIN";
    if (!token) {
        return <Navigate to="/" replace />;
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
        localStorage.removeItem("token");
        return <Navigate to="/" replace />;
    }

    try {
        // Dekoda token
        const decodedToken = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;

        // Kontrollera om token har gått ut
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            return <Navigate to="/" replace />;
        }

        // Kontrollera roller om roller skickats med
        if (role && !role.includes(decodedToken.role)) {
            return <Navigate to="/dashboard" replace />; // Omdirigera vid obehörighet
        }

        return <>{children}</>;
    } catch (error) {
        console.error("Token decoding failed:", error);
        localStorage.removeItem("token");
        return <Navigate to="/" replace />;
    }
}
