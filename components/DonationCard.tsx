// components/DonationCard.tsx
"use client";
import Link from "next/link";
import { Donation } from "@/types/donation";

interface DonationCardProps {
    donation: Donation;
}

export default function DonationCard({ donation }: DonationCardProps) {
    const {
        id,
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
                    <div className="urgency-badge">
                        🔥 {urgency}
                    </div>
                )}
            </div>

            <div className="card-content">
                <div className="row" style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12
                }}>
                    <div style={{ flex: 1 }}>
                        <h3 className="pet-name">{name}</h3>
                        <p className="pet-description">
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

                <div className="tags">
                    {tags.map((tag) => (
                        <span key={tag} className="tag">
              #{tag}
            </span>
                    ))}
                </div>

                {(goal || impact) && (
                    <div className="campaign-info">
                        {goal && (
                            <div className="goal">
                                <strong>Meta:</strong> {goal}
                            </div>
                        )}
                        {impact && (
                            <div className="impact">
                                {impact}
                            </div>
                        )}
                    </div>
                )}

                <Link
                    href={`/donate?ngo=${encodeURIComponent(name)}`}
                    className="btn cta block"
                    style={{ marginTop: 16 }}
                >
                    Doar Agora
                </Link>
            </div>
        </div>
    );
}