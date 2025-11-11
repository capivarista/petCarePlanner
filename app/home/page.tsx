// app/home/page.tsx
"use client";

import Header from "../../components/Header";
import DonationCard from "../../components/DonationCard";
import { DONATIONS, ALL_TAGS } from "../../data/donations";
import { useMemo, useReducer, useState } from "react";

type FilterState = { search: string; activeTags: string[] };
type FilterAction =
    | { type: "search"; value: string }
    | { type: "toggleTag"; tag: string }
    | { type: "clearTags" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case "search":
            return { ...state, search: action.value };
        case "toggleTag": {
            const exists = state.activeTags.includes(action.tag);
            const next = exists
                ? state.activeTags.filter((t) => t !== action.tag)
                : [...state.activeTags, action.tag];
            return { ...state, activeTags: next };
        }
        case "clearTags":
            return { ...state, activeTags: [] };
        default:
            return state;
    }
}

export default function Home() {
    const [{ search, activeTags }, dispatch] = useReducer(filterReducer, {
        search: "",
        activeTags: [],
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return DONATIONS.filter((d) => {
            const matchesText =
                !q ||
                d.name.toLowerCase().includes(q) ||
                d.description.toLowerCase().includes(q) ||
                d.tags.some((t) => t.toLowerCase().includes(q));
            const matchesTags =
                activeTags.length === 0 || activeTags.every((t) => d.tags.includes(t));
            return matchesText && matchesTags;
        });
    }, [search, activeTags]);

    return (
        <>
            {/* Header fica fora da .screen e gruda no topo do .phone-frame */}
            <Header title="Pet Care Planner" subtitle="Acompanhe e doe com transparência" />

            <div className="screen">
                <div className="card" style={{ display: "grid", gap: 14 }}>
                    <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div className="section-title">Olá, Rafael 👋</div>
                            <div style={{ color: "var(--muted)", fontSize: 13 }}>
                                Veja as campanhas em destaque e personalize sua ajuda.
                            </div>
                        </div>
                        <span className="pill" style={{ background: "rgba(255,255,255,.65)", fontSize: 11 }}>
              Saldo de impacto 92 pts
            </span>
                    </div>

                    <div className="row" style={{ gap: 12, alignItems: "center" }}>
                        <input
                            className="input"
                            placeholder="Buscar por causa, tag ou cidade"
                            value={search}
                            onChange={(e) => dispatch({ type: "search", value: e.target.value })}
                        />
                        <button
                            className="btn small outline"
                            type="button"
                            onClick={() => setIsFilterOpen((s) => !s)}
                        >
                            Filtrar
                        </button>
                    </div>

                    {activeTags.length > 0 && (
                        <div className="chip-group active" aria-live="polite">
                            {activeTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    className="chip is-active"
                                    onClick={() => dispatch({ type: "toggleTag", tag })}
                                >
                                    #{tag}
                                </button>
                            ))}
                            <button
                                className="link muted"
                                type="button"
                                onClick={() => dispatch({ type: "clearTags" })}
                            >
                                limpar filtros
                            </button>
                        </div>
                    )}
                </div>

                <div className="stack" style={{ paddingBottom: 32 }}>
                    {filtered.map((d) => (
                        <DonationCard key={d.id} d={d} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="card" style={{ textAlign: "center", color: "var(--muted)" }}>
                            Nenhuma campanha encontrada para os filtros selecionados.
                        </div>
                    )}
                </div>
            </div>

            {isFilterOpen && (
                <div className="filter-backdrop" role="presentation" onClick={() => setIsFilterOpen(false)}>
                    <div
                        className="filter-sheet"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filtrar campanhas por tags"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div className="section-title" style={{ marginBottom: 4 }}>
                                    Filtrar campanhas
                                </div>
                                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Selecione uma ou mais tags para refinar os resultados
                </span>
                            </div>
                            <button className="btn small" type="button" onClick={() => dispatch({ type: "clearTags" })}>
                                Limpar
                            </button>
                        </div>

                        <div className="tag-grid" role="list">
                            {ALL_TAGS.map((tag) => {
                                const active = activeTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        role="listitem"
                                        type="button"
                                        className={`filter-tag ${active ? "active" : ""}`}
                                        onClick={() => dispatch({ type: "toggleTag", tag })}
                                    >
                                        <span>#{tag}</span>
                                        {active && <span aria-hidden>✓</span>}
                                    </button>
                                );
                            })}
                        </div>

                        <button className="btn primary" type="button" onClick={() => setIsFilterOpen(false)}>
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
