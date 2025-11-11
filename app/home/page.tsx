// app/home/page.tsx
"use client";
import Header from "@/components/Header";
import DonationCard, { Donation } from "@/components/DonationCard";
import { useMemo, useState } from "react";

const DATA: Donation[] = [
    {
        id: "1",
        name: "Patas Felizes",
        description: "Campanha emergencial para abrigar 12 gatos resgatados das ruas. Precisamos de ração, consultas e castração.",
        tags: ["gatos", "castração", "ração"],
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=420&q=80",
        goal: "R$ 3.500 até 25/11",
        impact: "Sua doação financia kits de higiene e vacinação para os novos resgates.",
    },
    {
        id: "2",
        name: "Dog Friends Brasil",
        description: "Estamos vacinando 25 cães recém acolhidos. Cada contribuição cobre parte das vacinas e transporte.",
        tags: ["vacina", "transporte", "cães"],
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=420&q=80",
        goal: "R$ 5.200 em andamento",
        impact: "Já vacinamos 11 cães graças aos doadores.",
    },
    {
        id: "3",
        name: "Lar Temporário Aurora",
        description: "Precisamos ampliar o lar temporário para receber animais idosos com conforto e fisioterapia.",
        tags: ["idosos", "infraestrutura"],
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=420&q=80",
        goal: "R$ 7.800 faltando 8 dias",
        impact: "Doadores recebem boletim semanal com o avanço das obras.",
    },
];

export default function Home() {
    const [filter, setFilter] = useState<string>("");

    const filtered = useMemo(() => {
        if(!filter) return DATA;
        const search = filter.toLowerCase();
        return DATA.filter(d =>
            d.tags.some(t => t.toLowerCase().includes(search)) ||
            d.name.toLowerCase().includes(search) ||
            d.description.toLowerCase().includes(search)
        );
    }, [filter]);

    return (
        <>
            <Header title="Pet Care Planner" subtitle="Acompanhe e doe com transparência" />
            <div className="screen">
                <div className="card" style={{display:"grid", gap:14}}>
                    <div className="row" style={{justifyContent:"space-between", alignItems:"flex-start"}}>
                        <div>
                            <div className="section-title">Olá, Rafael 👋</div>
                            <div style={{color:"var(--muted)", fontSize:13}}>Veja as campanhas em destaque e personalize sua ajuda.</div>
                        </div>
                        <span className="pill" style={{background:"rgba(255,255,255,.65)", fontSize:11}}>Saldo de impacto 92 pts</span>
                    </div>
                    <div className="row" style={{gap:12}}>
                        <input className="input" placeholder="Buscar por causa ou cidade" onChange={(e)=>setFilter(e.target.value)} />
                        <button className="icon-btn" type="button" aria-label="Filtrar">🔍</button>
                    </div>
                    <div className="chip-group">
                        {[
                            { label: "💧 higiene" },
                            { label: "💊 remédios" },
                            { label: "🍖 ração" },
                            { label: "🏥 cirurgias" },
                        ].map(({label}) => (
                            <button
                                key={label}
                                type="button"
                                className="btn small"
                                style={{padding:"6px 14px", fontSize:12}}
                                onClick={() => setFilter(label.replace(/[^a-zç]+/gi, "").toLowerCase())}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="stack">
                    {filtered.map(d => <DonationCard key={d.id} d={d} />)}
                </div>
            </div>
        </>
    );
}
