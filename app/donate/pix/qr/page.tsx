// app/donate/pix/qr/page.tsx
"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PixQR(){
    const sp = useSearchParams();
    const ngo = sp.get("ngo") ?? "Save Cat";
    const raw = sp.get("p");
    const info = raw ? JSON.parse(decodeURIComponent(raw)) : null;

    return (
        <>
            <Header title="PIX" subtitle="Finalize sua doação" backHref="/donate/pix" />
            <div className="screen">
                <div className="card col" style={{gap:16}}>
                    <div className="section-title">Escaneie com o aplicativo do banco</div>
                    <div className="qr-box">
                        <div className="qr-placeholder" aria-hidden />
                    </div>
                    <div className="floating-card" style={{display:"grid", gap:8}}>
                        <div style={{fontWeight:600, fontSize:13}}>Destinatário: {ngo}</div>
                        <div style={{fontSize:12, color:"var(--muted)", lineHeight:1.5}}>
                            Copie o código PIX caso prefira colar manualmente: <strong>0002010102122685PIXDOE{ngo.slice(0,3).toUpperCase()}5204000053039865802BR5920ONG PET CARE6009Uberlandia6304ABCD</strong>
                        </div>
                        {info && (
                            <div style={{fontSize:12, color:"var(--muted)"}}>
                                Doador: <strong>{info.name || "—"}</strong> • CPF: {info.cpf || "—"} • Tel: {info.phone || "—"}
                            </div>
                        )}
                    </div>
                    <div className="row" style={{justifyContent:"space-between"}}>
                        <span style={{fontSize:11, color:"var(--muted)"}}>Após o pagamento você será direcionado para acompanhar o recibo.</span>
                        <Link href="/home" className="btn cta small">Concluído</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
