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
            <Header title="PIX" backHref="/donate/pix" />
            <div className="screen">
                <div className="card col">
                    <div className="qr-box">
                        {/* Placeholder visual de QR; substitua por um gerador real se quiser */}
                        <div className="qr-placeholder" />
                    </div>

                    <div className="card" style={{marginTop:10}}>
                        <div className="col" style={{gap:6}}>
                            <div className="label">informações da instituição</div>
                            <div><strong>Nome:</strong> {ngo}</div>
                            <div><strong>CPF:</strong> 123.456.789-10</div>
                            <div><strong>Data de criação:</strong> 10/10/2024</div>
                            <div><strong>Selo de verificação:</strong> ✅</div>
                            {info && <div className="hr" />}
                            {info && (
                                <div style={{fontSize:13, color:"var(--muted)"}}>
                                    doador: {info.name || "—"} • cpf: {info.cpf || "—"} • tel: {info.phone || "—"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row" style={{justifyContent:"flex-end", marginTop:10}}>
                        <Link href="/home" className="btn cta small">Concluído</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
