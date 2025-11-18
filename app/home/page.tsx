// app/home/page.tsx
"use client";
import { useMemo, useReducer, useState, useEffect } from "react";
import Header from "@/components/Header";
import DonationCard from "@/components/DonationCard";
import { DONATIONS, ALL_TAGS } from "@/data/donations";

interface FilterState {
    search: string;
    activeTags: string[];
}

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular carregamento de dados
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredDonations = useMemo(() => {
        const query = search.trim().toLowerCase();
        return DONATIONS.filter((donation) => {
            const matchesText =
                !query ||
                donation.name.toLowerCase().includes(query) ||
                donation.description.toLowerCase().includes(query) ||
                donation.tags.some((tag) => tag.toLowerCase().includes(query));

            const matchesTags =
                activeTags.length === 0 ||
                activeTags.every((tag) => donation.tags.includes(tag));

            return matchesText && matchesTags;
        });
    }, [search, activeTags]);

    if (isLoading) {
        return (
            <>
                <Header title="Pet Care Planner" subtitle="Carregando..." />
                <div className="screen">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="card">
                            <div className="skeleton" style={{ height: '200px' }} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <Header
                title="Pet Care Planner"
                subtitle="Acompanhe e doe com transparência"
            />

            <div className="screen">
                <div className="card">
                    <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h2 className="section-title">Olá, Rafael 👋</h2>
                            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
                                Veja as campanhas em destaque e personalize sua ajuda.
                            </p>
                        </div>

                        <div className="pill">
                            💎 92 pts
                        </div>
                    </div>

                    <div className="row" style={{ gap: 12, alignItems: "center", marginTop: 16 }}>
                        <input
                            className="input"
                            placeholder="🔍 Buscar por causa, tag ou cidade..."
                            value={search}
                            onChange={(e) => dispatch({ type: "search", value: e.target.value })}
                        />

                        <button
                            className="btn small outline"
                            type="button"
                            onClick={() => setIsFilterOpen(true)}
                        >
                            Filtrar
                        </button>
                    </div>

                    {activeTags.length > 0 && (
                        <div className="chip-group" style={{ marginTop: 12 }}>
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
                                style={{ fontSize: 12 }}
                            >
                                limpar
                            </button>
                        </div>
                    )}
                </div>

                <div className="stack">
                    {filteredDonations.length > 0 ? (
                        filteredDonations.map((donation) => (
                            <DonationCard key={donation.id} donation={donation} />
                        ))
                    ) : (
                        <div className="card" style={{ textAlign: "center", padding: 40 }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🐕</div>
                            <h3 style={{ color: "var(--muted)", marginBottom: 8 }}>
                                Nenhuma campanha encontrada
                            </h3>
                            <p style={{ color: "var(--muted)", fontSize: 14 }}>
                                Tente ajustar os filtros ou termos de busca
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Filtros */}
            {isFilterOpen && (
                <div
                    className="filter-backdrop"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="filter-sheet"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h3 className="section-title">Filtrar campanhas</h3>
                                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                                    Selecione as tags para refinar
                                </p>
                            </div>

                            <button
                                className="btn small"
                                type="button"
                                onClick={() => dispatch({ type: "clearTags" })}
                            >
                                Limpar
                            </button>
                        </div>

                        <div className="tag-grid">
                            {ALL_TAGS.map((tag) => {
                                const isActive = activeTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        className={`filter-tag ${isActive ? 'active' : ''}`}
                                        onClick={() => dispatch({ type: "toggleTag", tag })}
                                    >
                                        <span>#{tag}</span>
                                        {isActive && <span>✓</span>}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className="btn primary"
                            type="button"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}