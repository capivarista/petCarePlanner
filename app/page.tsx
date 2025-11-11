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
            <div className="screen">
                <div className="login-header">
                    <div className="paw" />
                    <div className="login-title">Pet Care Planner</div>
                </div>

                <form className="card col" onSubmit={handleLogin} style={{gap:12}}>
                    <Input placeholder="Username" />
                    <Input type="password" placeholder="Your password" />
                    <button className="btn primary block" type="submit">LOGIN</button>
                    <div className="row" style={{justifyContent:"space-between", color:"var(--muted)", fontSize:12}}>
                        <span>não tem conta? <strong>criar</strong></span>
                        <span>• • •</span>
                    </div>
                </form>
            </div>
            <div className="bottom-bar" />
        </>
    );
}
