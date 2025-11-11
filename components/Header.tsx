// components/Header.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({
                                   title = "Pet Care Planner",
                                   backHref,
                               }: { title?: string; backHref?: string }) {
    const r = useRouter();
    return (
        <div className="topbar">
            {backHref ? (
                <Link className="icon-btn" href={backHref} aria-label="Voltar">←</Link>
            ) : (
                <button className="icon-btn" onClick={() => r.refresh()} aria-label="Atualizar">⟳</button>
            )}
            <div className="title">🐾 {title}</div>
            <Link href="/profile" className="icon-btn" aria-label="Perfil">⚙️</Link>
        </div>
    );
}
