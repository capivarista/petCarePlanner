// app/donate/pix/qr/page.tsx
"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

function PixQRInner() {
    const sp = useSearchParams();
    const ngo = sp.get("ngo") ?? "Instituição";
    const payload = sp.get("p") ?? "";

    return (
        <>
            <Header title="PIX" backHref={`/donate/pix?ngo=${encodeURIComponent(ngo)}`} />
            <div className="screen">
                <div className="card">
                    <div className="section-title">PIX</div>
                    <div className="qr-box" style={{ marginTop: 10 }}>
                        <div className="qr-placeholder" />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                        Payload: <code>{payload || "—"}</code>
                    </div>
                    <button className="btn cta" type="button" style={{ marginTop: 12 }}>
                        Concluído
                    </button>
                </div>
            </div>
        </>
    );
}

export default function PixQRPage() {
    return (
        <Suspense fallback={<div className="screen"><div className="card">Carregando QR…</div></div>}>
            <PixQRInner />
        </Suspense>
    );
}
