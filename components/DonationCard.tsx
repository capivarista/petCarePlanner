// components/DonationCard.tsx
"use client";
import Link from "next/link";

export type Donation = {
    id: string;
    name: string;
    description: string;
    tags: string[];
    imgLabel?: string;
};

export default function DonationCard({ d }: { d: Donation }) {
    return (
        <div className="card pet-card">
            <div className="pet-img">{d.imgLabel ?? "Sem imagem"}</div>
            <div className="row" style={{justifyContent:"space-between"}}>
                <div>
                    <div style={{fontWeight:700}}>{d.name}</div>
                    <div style={{color:"var(--muted)", fontSize:13, marginTop:6}}>
                        descrição: {d.description}
                    </div>
                    <div className="tags" style={{marginTop:8}}>
                        {d.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                    </div>
                </div>
                <Link href={`/donate?ngo=${encodeURIComponent(d.name)}`} className="btn cta small" style={{alignSelf:"end"}}>
                    DOAR
                </Link>
            </div>
        </div>
    );
}
