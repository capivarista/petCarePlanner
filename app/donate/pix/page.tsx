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
            <Header title="Doar (PIX)" backHref="/donate" />
            <div className="screen">
                <div className="card col">
                    <div className="pet-img" style={{height:120}}>🏦</div>
                    <Input label="Nome" value={name} onChange={e=>setName(e.target.value)} />
                    <Input label="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
                    <Input label="Número de telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
                    <label className="row" style={{gap:8}}>
                        <input type="checkbox" checked={ok} onChange={e=>setOk(e.target.checked)} />
                        <span className="label">termos e condições</span>
                    </label>
                    <label className="row" style={{gap:8}}>
                        <input type="checkbox" />
                        <span className="label">restrições</span>
                    </label>
                    <div className="row" style={{justifyContent:"flex-end"}}>
                        <Link
                            className={`btn cta small ${!ok ? "hidden":""}`}
                            href={`/donate/pix/qr?ngo=${encodeURIComponent(ngo)}&p=${payload}`}
                        >DOAR</Link>
                        {!ok && <span className="label">marque os termos para continuar</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
