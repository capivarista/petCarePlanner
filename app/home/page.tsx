// app/home/page.tsx
"use client";
import Header from "@/components/Header";
import DonationCard, { Donation } from "@/components/DonationCard";
import { useMemo, useState } from "react";

const DATA: Donation[] = [
    { id:"1", name:"Save Cat", description:"Temos como objetivo acolher gatos de rua", tags:["gatos"], imgLabel:"🐱" },
    { id:"2", name:"Dog Friends", description:"Resgatamos e tratamos cães abandonados", tags:["vacina","alimentos"], imgLabel:"🐶" },
];

export default function Home() {
    const [filter, setFilter] = useState<string>("");

    const filtered = useMemo(() => {
        if(!filter) return DATA;
        return DATA.filter(d => d.tags.join(" ").includes(filter) || d.name.toLowerCase().includes(filter));
    }, [filter]);

    return (
        <>
            <Header title="Pet Care Planner" />
            <div className="screen">
                <div className="card row" style={{gap:10, alignItems:"center"}}>
                    <input className="input" placeholder="descrição…" onChange={(e)=>setFilter(e.target.value)} />
                    <button className="btn small">🔍</button>
                </div>

                <div className="row" style={{gap:8, marginTop:10, justifyContent:"flex-end"}}>
                    <span className="tag">💧 higiene</span>
                    <span className="tag">💊 remédios</span>
                    <span className="tag">🍖 ração</span>
                </div>

                <div className="stack" style={{marginTop:12}}>
                    {filtered.map(d => <DonationCard key={d.id} d={d} />)}
                </div>
            </div>
        </>
    );
}
