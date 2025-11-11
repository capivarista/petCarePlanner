import Header from "@/components/Header";
import DonationCard from "@/components/DonationCard";
import { DONATIONS } from "@/data/donations";
import { notFound } from "next/navigation";

export default function NgoProfile({ params }: { params: { id: string } }) {
    const donation = DONATIONS.find((item) => item.owner.id === params.id) ?? notFound();

    return (
        <>
            <Header
                title={donation.owner.name}
                subtitle={`Perfil de ${donation.owner.role}`}
                backHref="/home"
            />
            <div className="screen">
                <div className="card col" style={{gap: 16}}>
                    <div className="profile-avatar" aria-hidden>{donation.owner.name.slice(0, 1)}</div>
                    <div className="col" style={{gap: 6, textAlign:"center"}}>
                        <div className="section-title" style={{fontSize:"1.35rem"}}>{donation.owner.name}</div>
                        <span style={{color:"var(--muted)", fontSize:13}}>{donation.owner.role}</span>
                        <span style={{color:"var(--muted)", fontSize:13}}>{donation.owner.location}</span>
                    </div>
                    <p style={{fontSize:14, lineHeight:1.6}}>{donation.owner.bio}</p>
                    {donation.owner.focus && (
                        <div className="floating-card" style={{fontSize:12}}>
                            Foco atual: <strong>{donation.owner.focus}</strong>
                        </div>
                    )}
                    {donation.owner.contact && (
                        <a
                            className="btn primary"
                            href={`https://instagram.com/${donation.owner.contact.replace(/^@/, "")}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Conversar com {donation.owner.name.split(" ")[0]}
                        </a>
                    )}
                </div>

                <div className="col" style={{gap: 12}}>
                    <div className="section-title">Campanha em destaque</div>
                    <DonationCard d={donation} />
                </div>
            </div>
        </>
    );
}
