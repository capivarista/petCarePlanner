// app/donate/page.tsx
"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function DonateInner() {
    const ngo = useSearchParams().get("ngo") ?? "Instituição";
    return (
        <>
            <Header title="Doação" subtitle={ngo} backHref="/home" />
            <div className="screen">
                <div className="card" style={{ display: "grid", gap: 14 }}>
                    <div
                        className="pet-img"
                        style={{
                            height: 140,
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=420&q=80)",
                        }}
                    />
                    <div className="section-title">Resumo da campanha</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                        Sua contribuição ajuda a manter o abrigo com alimentação especial,
                        vacinas e itens de higiene. Veja abaixo as opções de pagamento
                        disponíveis e escolha a melhor para você.
                    </div>
                    <div className="chip-group">
                        <span className="tag">#transparência</span>
                        <span className="tag">#relatórios mensais</span>
                        <span className="tag">#parcerias clínicas</span>
                    </div>
                </div>

                <div className="card" style={{ display: "grid", gap: 16 }}>
                    <div className="section-title">Escolha a forma de pagamento</div>
                    <div className="grid2">
                        <Link className="btn green" href={`/donate/pix?ngo=${encodeURIComponent(ngo)}`}>
                            PIX imediato
                        </Link>
                        <button className="btn" type="button">Cartão crédito</button>
                        <button className="btn yellow" type="button">Boleto</button>
                        <button className="btn" type="button">Transferência</button>
                    </div>

                    <div className="floating-card" style={{ display: "grid", gap: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Rastreamento inteligente</div>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>
                            Após a doação, acompanhe recibos e prestações de contas diretamente pelo app.
                        </div>
                        <div className="row" style={{ justifyContent: "flex-end" }}>
                            <Link href={`/donate/pix?ngo=${encodeURIComponent(ngo)}`} className="btn cta small">
                                Doar agora ➜
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function DonatePage() {
    return (
        <Suspense fallback={<div className="screen"><div className="card">Carregando…</div></div>}>
            <DonateInner />
        </Suspense>
    );
}
