// app/profile/page.tsx
"use client";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
    nome: string; idade: string; cidade: string;
    telefone: string; sn: string;
};

const EMPTY: Profile = { nome:"Rafael", idade:"18", cidade:"Uberlândia", telefone:"34988******", sn:"1123-1344-6677" };

export default function ProfilePage(){
    const [p, setP] = useState<Profile>(EMPTY);
    const router = useRouter();

    useEffect(()=> {
        const raw = localStorage.getItem("pcp_profile");
        if(raw){
            startTransition(() => {
                setP(JSON.parse(raw));
            });
        }
    },[]);

    function onSave(){
        localStorage.setItem("pcp_profile", JSON.stringify(p));
        alert("Perfil salvo!");
    }
    function onLogout(){
        localStorage.removeItem("pcp_auth");
        router.replace("/");
    }

    return (
        <>
            <Header title="Perfil" subtitle="Mantenha suas informações atualizadas" backHref="/home" />
            <div className="screen">
                <div style={{display:"grid", gap:16, textAlign:"center"}}>
                    <div className="profile-avatar" aria-hidden>👤</div>
                    <div className="upload-badge">
                        <button className="btn small" type="button">enviar imagem</button>
                    </div>
                </div>

                <div className="card col profile-card">
                    <div className="section-title" style={{marginBottom:4}}>Seus dados</div>
                    <div className="kv">
                        <Input label="nome" value={p.nome} onChange={e=>setP({...p, nome:e.target.value})}/>
                        <Input label="idade" value={p.idade} onChange={e=>setP({...p, idade:e.target.value})}/>
                        <Input label="cidade" value={p.cidade} onChange={e=>setP({...p, cidade:e.target.value})}/>
                        <Input label="numero de telefone" value={p.telefone} onChange={e=>setP({...p, telefone:e.target.value})}/>
                        <Input label="s/n identificação" value={p.sn} onChange={e=>setP({...p, sn:e.target.value})}/>
                    </div>

                    <div className="floating-card" style={{display:"grid", gap:6}}>
                        <div style={{fontSize:12, color:"var(--muted)"}}>Use esses dados para agilizar doações e emitir recibos automáticos.</div>
                        <div className="row" style={{justifyContent:"space-between"}}>
                            <button className="btn small" type="button" onClick={onLogout}>sair</button>
                            <button className="btn small primary" type="button" onClick={onSave}>salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
