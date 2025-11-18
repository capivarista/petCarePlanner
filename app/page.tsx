// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        // Simular autenticação
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem("pcp_auth", "ok");
        router.push("/home");
    }

    return (
        <div className="screen">
            <div className="login-header">
                <div className="paw" aria-hidden>🐾</div>
                <div>
                    <h1 className="login-title">Pet Care Planner</h1>
                    <p className="login-subtitle">Conectando doadores a ONGs de proteção animal</p>
                </div>
            </div>

            <form className="login-card" onSubmit={handleLogin}>
                <div className="col">
                    <Input
                        placeholder="Email ou usuário"
                        aria-label="Email ou usuário"
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Sua senha"
                        aria-label="Senha"
                        required
                    />
                </div>

                <button
                    className={`btn primary block ${isLoading ? 'loading' : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Entrando...' : 'Entrar e ajudar'}
                </button>

                <div className="login-footer">
                    <span>É novo aqui? <strong>Crie agora</strong></span>
                    <span style={{letterSpacing: 4}}>• • •</span>
                </div>
            </form>

            <div className="bottom-bar">
                <div className="pill">🌟 Destaque: +34 pets resgatados esta semana</div>
            </div>
        </div>
    );
}