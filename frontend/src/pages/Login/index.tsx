import { Link, Navigate } from "react-router";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { formSchema, FormData } from "../../components/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/authContext";
import { SignInProps } from "@/components/interfaces/SignInProps";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, isAuthenticated } = useContext(AuthContext);

    const { handleSubmit, register, formState, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });

    async function handleSignIn(data: SignInProps) {
        try {
            await signIn({ login: data.login, password: data.password });

            reset();
        } catch (signInError) {
            console.error("Erro ao logar:", signInError);

        }
    }

    if (isAuthenticated) {
        return <Navigate to='/adminArea' />
    } else {

        return (
            <div className="max-w-sm mx-auto my-auto p-8 w-1/2 sm:bg-white shadow-lg rounded-xl border border-gray-400 text-black font-sans">

                <div className="flex items-center justify-center py-2">
                    
                    <h2 className="text-2xl font-semibold text-center mb-4 sm:hidden">{"Login"}</h2>
                    <h2 className="text-2xl font-semibold text-center mb-4 hidden sm:inline">{"Login para Administrador"}</h2>
                    
                </div>

                

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(handleSignIn)} noValidate >

                    <div className="flex flex-col gap-4">
                        <div>
                            <Label className="block font-medium">Nome de usuário</Label>
                            <Input
                                type="text"
                                placeholder="Nome de usuário"
                                {...register('login')}
                            />
                            {formState.errors.login?.message && (
                                <span className="text-red-500 text-xs">{formState.errors.login.message}</span>
                            )}
                        </div>

                        <div>
                            <Label className="block font-medium">Senha</Label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                {...register('password')}
                            />
                            {formState.errors.password?.message && (
                                <span className="text-red-500 text-xs">{formState.errors.password.message}</span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="showPassword"
                                checked={showPassword}
                                onCheckedChange={(value) => setShowPassword(!!value)}
                            />
                            <label
                                htmlFor="showPassword"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Mostrar senha
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-500/90 cursor-pointer"
                        >
                            Entrar
                        </Button>

                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <Button asChild className="bg-transparent text-black hover:bg-gray-200 border border-gray-300 rounded-3xl p-2">
                        <Link to="/">Voltar</Link>
                    </Button>
                </div>
            </div>
        );
    }
}


