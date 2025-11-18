// app/ngo/[id]/page.tsx
"use client";
import Header from "@/components/Header";
import DonationCard from "@/components/DonationCard";
import { DONATIONS } from "@/data/donations";

interface NgoPageProps {
    params: {
        id: string;
    };
}

export default function NgoPage({ params }: NgoPageProps) {
    const donation = DONATIONS.find(d => d.id === params.id);

    if (!donation) {
        return (
            <>
                <Header title="ONG Não Encontrada" backHref="/home" />
                <div className="screen">
                    <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😔</div>
                        <h3 style={{ color: "var(--muted)", marginBottom: "8px" }}>
                            ONG não encontrada
                        </h3>
                        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
                            A instituição que você está procurando não existe ou foi removida.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header title={donation.name} subtitle="Perfil da ONG" backHref="/home" />
            <div className="screen">
                <div className="card">
                    <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h2 className="section-title">Sobre a instituição</h2>
                            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px" }}>
                                {donation.description}
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <h3 className="section-title" style={{ marginBottom: "12px" }}>Campanha em destaque</h3>
                        <DonationCard donation={donation} />
                    </div>
                </div>

                <div className="card">
                    <h3 className="section-title" style={{ marginBottom: "16px" }}>Informações de contato</h3>
                    <div className="col" style={{ gap: "12px" }}>
                        <div>
                            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "4px" }}>
                                Email
                            </div>
                            <div style={{ fontWeight: "600" }}>
                                contato@{donation.name.toLowerCase().replace(/\s+/g, '')}.org
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "4px" }}>
                                Telefone
                            </div>
                            <div style={{ fontWeight: "600" }}>
                                (11) 9XXXX-XXXX
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "4px" }}>
                                Localização
                            </div>
                            <div style={{ fontWeight: "600" }}>
                                São Paulo, SP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}