// components/DonationCard.tsx
"use client";
import Link from "next/link";
import { Donation } from "@/types/donation";

export default function DonationCard({ d }: { d: Donation }) {
  const imageStyle = d.image ? { backgroundImage: `url(${d.image})` } : undefined;

  return (
    <div className="card pet-card">
      <div className="pet-img" style={imageStyle}>
        {!d.image && <span>{d.name.slice(0, 1)}</span>}
      </div>

      <div className="col" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="col" style={{ gap: 6 }}>
            <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{d.name}</div>
            <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.4 }}>
              {d.description}
            </div>
            <div className="tags" style={{ marginTop: 2 }}>
              {d.tags.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          </div>

          <div className="col" style={{ gap: 8, alignItems: "flex-end" }}>
            {d.owner && (
              <Link href={`/ngo/${d.owner.id}`} className="link profile-link">
                Ver perfil
              </Link>
            )}
            <Link
              href={`/donate?ngo=${encodeURIComponent(d.name)}`}
              className="btn cta small"
              style={{ alignSelf: "flex-end", whiteSpace: "nowrap" }}
            >
              Doar agora
            </Link>
          </div>
        </div>

        {(d.goal || d.impact) && (
          <div className="floating-card" style={{ padding: "12px 14px", gap: 6 }}>
            {d.goal && <div style={{ fontWeight: 600, fontSize: 13 }}>Meta: {d.goal}</div>}
            {d.impact && <div style={{ fontSize: 12, color: "var(--muted)" }}>{d.impact}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
