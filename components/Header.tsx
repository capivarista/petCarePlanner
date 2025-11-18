// components/Header.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
    title?: string;
    subtitle?: string;
    backHref?: string;
    showProfile?: boolean;
}

export default function Header({
                                   title = "Pet Care Planner",
                                   subtitle,
                                   backHref,
                                   showProfile = true
                               }: HeaderProps) {
    const router = useRouter();

    return (
        <div className="topbar">
            <div className="header-left">
                {backHref ? (
                    <Link className="icon-btn" href={backHref} aria-label="Voltar">
                        ←
                    </Link>
                ) : (
                    <button
                        className="icon-btn"
                        onClick={() => router.refresh()}
                        aria-label="Atualizar"
                    >
                        ⟳
                    </button>
                )}
            </div>

            <div className="title">
                <span>🐾 {title}</span>
                {subtitle && <span className="subtitle">{subtitle}</span>}
            </div>

            <div className="header-right">
                {showProfile && (
                    <Link href="/profile" className="icon-btn" aria-label="Perfil">
                        👤
                    </Link>
                )}
            </div>
        </div>
    );
}