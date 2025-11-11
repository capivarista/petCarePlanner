// app/donate/pix/page.tsx
"use client";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PixForm(){
    const ngo = useSearchParams().get("ngo") ?? "Save Cat";
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [ok, setOk] = useState(false);

    const payload = encodeURIComponent(JSON.stringify({name, cpf, phone, ngo}));

    return (
        <>
            <Header title="PIX" subtitle={ngo} backHref="/donate" />
            <div className="screen">
                <div className="card col">
                    <div className="pet-img" style={{height:140, backgroundImage:"url(https://images.unsplash.com/photo-1521120098171-82430a52d019?auto=format&fit=crop&w=420&q=80)"}} />
                    <div className="section-title">Identifique sua doação</div>
                    <div style={{fontSize:12, color:"var(--muted)"}}>Preencha seus dados para gerar o QR Code personalizado e receber o comprovante por mensagem.</div>
                    <Input label="Nome" value={name} onChange={e=>setName(e.target.value)} />
                    <Input label="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
                    <Input label="Número de telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
                    <label className="row" style={{gap:8, alignItems:"flex-start"}}>
                        <input type="checkbox" checked={ok} onChange={e=>setOk(e.target.checked)} />
                        <span style={{fontSize:12, color:"var(--muted)", lineHeight:1.4}}>Concordo em compartilhar meus dados com a ONG para emissão do recibo.</span>
                    </label>
                    <label className="row" style={{gap:8, alignItems:"flex-start"}}>
                        <input type="checkbox" />
                        <span style={{fontSize:12, color:"var(--muted)", lineHeight:1.4}}>Quero receber atualizações da campanha por WhatsApp.</span>
                    </label>
                    <div className="floating-card" style={{display:"grid", gap:8}}>
                        <div style={{fontWeight:600, fontSize:13}}>Total sugerido: R$ 50,00</div>
                        <div style={{fontSize:12, color:"var(--muted)"}}>Ajuste o valor direto no app do banco após escanear.</div>
                        <div className="row" style={{justifyContent:"space-between", alignItems:"center"}}>
                            {!ok && <span style={{fontSize:11, color:"var(--muted)"}}>Marque os termos para liberar a doação</span>}
                            <Link
                                className={`btn cta small ${!ok ? "hidden":""}`}
                                href={`/donate/pix/qr?ngo=${encodeURIComponent(ngo)}&p=${payload}`}
                            >Gerar QR Code</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
