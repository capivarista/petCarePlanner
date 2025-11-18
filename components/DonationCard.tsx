// components/DonationCard.tsx
"use client";
import Link from "next/link";

export interface Donation {
    id: string;
    name: string;
    description: string;
    image?: string;
    tags: string[];
    goal?: string;
    impact?: string;
    owner?: {
        id: string;
        name: string;
    };
    urgency?: string;
}

interface DonationCardProps {
    donation: Donation;
}

export default function DonationCard({ donation }: DonationCardProps) {
    const {
        name,
        description,
        image,
        tags,
        goal,
        impact,
        owner,
        urgency
    } = donation;

    return (
        <div className="card pet-card">
            <div
                className="pet-img"
                style={{
                    backgroundImage: image ? `url(${image})` : undefined,
                }}
            >
                {!image && (
                    <span style={{
                        fontSize: 48,
                        opacity: 0.8
                    }}>
            🐾
          </span>
                )}

                {urgency && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'var(--red)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        🔥 {urgency}
                    </div>
                )}
            </div>

            <div style={{ padding: '16px' }}>
                <div className="row" style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            marginBottom: "8px",
                            color: "var(--ink)"
                        }}>
                            {name}
                        </h3>
                        <p style={{
                            color: "var(--muted)",
                            fontSize: "14px",
                            lineHeight: 1.4,
                            marginBottom: "12px"
                        }}>
                            {description}
                        </p>
                    </div>

                    {owner && (
                        <Link
                            href={`/ngo/${owner.id}`}
                            className="btn small outline"
                            style={{ flexShrink: 0 }}
                        >
                            Ver ONG
                        </Link>
                    )}
                </div>

                <div className="tags" style={{ marginBottom: "12px" }}>
                    {tags.map((tag) => (
                        <span key={tag} className="tag">
              #{tag}
            </span>
                    ))}
                </div>

                {(goal || impact) && (
                    <div style={{
                        background: "rgba(255,255,255,.6)",
                        padding: "12px 14px",
                        borderRadius: "16px",
                        marginBottom: "16px"
                    }}>
                        {goal && (
                            <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>
                                🎯 {goal}
                            </div>
                        )}
                        {impact && (
                            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                                {impact}
                            </div>
                        )}
                    </div>
                )}

                <Link
                    href={`/donate?ngo=${encodeURIComponent(name)}`}
                    className="btn cta block"
                >
                    Doar Agora
                </Link>
            </div>
        </div>
    );
}