import {jwtDecode} from "jwt-decode";

interface TokenPayload {
    userId: number;
    email: string;
    role: string;
    exp: number;
}

export const getRoleFromToken = (): string | null => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found in localStorage");
        return null;
    }

    if (!token.includes(".")) {
        console.error("Invalid token format");
        return null;
    }

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.role; // Returnera rollen
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
