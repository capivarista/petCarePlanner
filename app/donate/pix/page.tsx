// app/donate/pix/page.tsx
"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PixInner() {
    const sp = useSearchParams();
    const ngo = sp.get("ngo") ?? "Instituição";

    return (
        <>
            <Header title="PIX" backHref={`/donate?ngo=${encodeURIComponent(ngo)}`} />
            <div className="screen">
                <div className="card" style={{ display: "grid", gap: 14 }}>
                    <div className="qr-box">
                        <div className="qr-placeholder" />
                    </div>
                </div>

                <div className="card" style={{ display: "grid", gap: 10 }}>
                    <div className="section-title">Informações da instituição</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>
                        Nome: <strong>{ngo}</strong>
                    </div>
                    <Link
                        className="btn cta"
                        href={`/donate/pix/qr?ngo=${encodeURIComponent(ngo)}&p=${encodeURIComponent("123")}`}
                    >
                        Gerar QR dinâmico
                    </Link>
                </div>
            </div>
        </>
    );
}

export default function PixPage() {
    return (
        <Suspense fallback={<div className="screen"><div className="card">Carregando PIX…</div></div>}>
            <PixInner />
        </Suspense>
    );
}
