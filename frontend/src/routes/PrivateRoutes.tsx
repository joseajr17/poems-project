import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router"

export function PrivateRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}