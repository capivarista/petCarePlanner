// components/Header.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({
                                   title = "Pet Care Planner",
                                   subtitle,
                                   backHref,
                               }: { title?: string; subtitle?: string; backHref?: string }) {
    const r = useRouter();
    return (
        <div className="topbar">
            {backHref ? (
                <Link className="icon-btn" href={backHref} aria-label="Voltar">←</Link>
            ) : (
                <button className="icon-btn" onClick={() => r.refresh()} aria-label="Atualizar">⟳</button>
            )}
            <div className="title">
                <span role="img" aria-hidden>🐾</span>
                <div style={{display:"grid", lineHeight:1}}>
                    <span>{title}</span>
                    {subtitle && <span style={{fontSize:10, fontWeight:500, color:"rgba(13,27,66,.65)"}}>{subtitle}</span>}
                </div>
            </div>
            <Link href="/profile" className="icon-btn" aria-label="Perfil">⚙️</Link>
        </div>
    );
}
