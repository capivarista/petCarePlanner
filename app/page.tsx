// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function Login() {
    const router = useRouter();

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        localStorage.setItem("pcp_auth", "ok");
        router.push("/home");
    }

    return (
        <>
            <div className="topbar" />
            <div className="screen" style={{paddingTop: 36}}>
                <div className="login-header">
                    <div className="paw" aria-hidden>🐾</div>
                    <div>
                        <div className="login-title">Pet Care Planner</div>
                        <p className="login-subtitle">Cuide de ONGs e resgates com poucos toques.</p>
                    </div>
                </div>

                <form className="login-card" onSubmit={handleLogin}>
                    <div className="col">
                        <Input placeholder="Email ou usuário" aria-label="Email ou usuário" />
                        <Input type="password" placeholder="Sua senha" aria-label="Senha" />
                    </div>
                    <button className="btn primary block" type="submit">Entrar e ajudar</button>
                    <div className="login-footer">
                        <span>É novo aqui? <strong>Crie agora</strong></span>
                        <span style={{letterSpacing:4}}>• • •</span>
                    </div>
                </form>
            </div>
            <div className="bottom-bar">
                <div className="pill">🌟 Destaque do dia: +34 pets resgatados</div>
            </div>
        </>
    );
}
