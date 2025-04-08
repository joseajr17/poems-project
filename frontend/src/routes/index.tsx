import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* Colocar abaixo a rota do Admin */}
                {/* <Route path="/home" element={<PrivateRoutes />} >
                    <Route index element={<Home />} />
                </Route> */}
            </Routes>
        </Router>
    );
}