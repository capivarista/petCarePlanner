// app/donate/page.tsx
"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Donate() {
    const ngo = useSearchParams().get("ngo") ?? "Instituição";
    return (
        <>
            <Header title="Doar" backHref="/home" />
            <div className="screen">
                <div className="card">
                    <div className="pet-img" style={{height:100}}>🖼️</div>
                    <div className="label" style={{marginTop:10}}>descrição:</div>
                    <div className="input" style="--fake:1">…</div>
                    <div className="label" style={{marginTop:10}}>tags:</div>
                    <div className="tags">
                        <span className="tag">#gatos</span><span className="tag">#ração</span>
                    </div>
                </div>

                <div className="card" style={{marginTop:12}}>
                    <div className="col">
                        <Link className="btn green block" href={`/donate/pix?ngo=${encodeURIComponent(ngo)}`}>PIX</Link>
                        <button className="btn block">CARTÃO</button>
                        <button className="btn yellow block">BOLETO</button>
                    </div>
                    <div className="row" style={{justifyContent:"flex-end", marginTop:10}}>
                        <Link href={`/donate/pix?ngo=${encodeURIComponent(ngo)}`} className="btn cta small">DOAR ➜</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
