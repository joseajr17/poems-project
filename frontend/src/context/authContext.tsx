import { SignInProps } from "@/components/interfaces/SignInProps";
import { UserData } from "@/components/interfaces/UserData";
import { api } from "@/services/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface AuthContextType {

    isAuthenticated: boolean;
    user: UserData | null;
    signIn: (data: SignInProps) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        loadingStoreData();
    }, []);

    async function loadingStoreData() {
        const storageUser = localStorage.getItem("@Auth:user");
        const storageToken = localStorage.getItem("@Auth:token");

        if (storageUser && storageToken) {
            setUser(JSON.parse(storageUser));
        }
    }

    async function signIn({ login, password }: SignInProps) {
        try {
            const response = await api.post('api/auth/login', { login, password });

            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUser(response.data.userDTO);
                const { token } = response.data;

                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;

                localStorage.setItem('@Auth:token', token);
                localStorage.setItem('@Auth:user', JSON.stringify(response.data.userDTO));
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("@Auth:user");
        localStorage.removeItem("@Auth:token");
        delete api.defaults.headers.common["Authorization"];
        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                signIn,
                logout


            }}
        >
            {children}
        </AuthContext.Provider>

    );
}