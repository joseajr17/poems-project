import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { PrivateRoutes } from "./PrivateRoutes";
import { AdminArea } from "@/pages/AdminArea";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminArea" element={<PrivateRoutes />} >
                    <Route index element={<AdminArea />} />
                </Route>
            </Routes>
        </Router>
    );
}