"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import Header from "@/components/Header";
import DonationCard from "@/components/DonationCard";
import { ALL_TAGS, DONATIONS } from "@/data/donations";

const PAGE_SIZE = 4;

type FilterState = {
    search: string;
    activeTags: string[];
    page: number;
};

type FilterAction =
    | { type: "search"; value: string }
    | { type: "toggleTag"; tag: string }
    | { type: "clearTags" }
    | { type: "loadMore" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
    case "search":
        return { ...state, search: action.value, page: 1 };
    case "toggleTag": {
        const exists = state.activeTags.includes(action.tag);
        const nextTags = exists
            ? state.activeTags.filter((item) => item !== action.tag)
            : [...state.activeTags, action.tag];
        return { ...state, activeTags: nextTags, page: 1 };
    }
    case "clearTags":
        return { ...state, activeTags: [], page: 1 };
    case "loadMore":
        return { ...state, page: state.page + 1 };
    default:
        return state;
    }
}

export default function Home() {
    const [{ search, activeTags, page }, dispatch] = useReducer(filterReducer, {
        search: "",
        activeTags: [],
        page: 1,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAutoLoading, setIsAutoLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);
    const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const rawSearch = search.trim();
    const normalizedSearch = rawSearch.toLowerCase();

    const filtered = useMemo(() => {
        return DONATIONS.filter((donation) => {
            const matchesText = !normalizedSearch ||
                donation.name.toLowerCase().includes(normalizedSearch) ||
                donation.description.toLowerCase().includes(normalizedSearch) ||
                donation.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

            const matchesTags = activeTags.length === 0 ||
                activeTags.every((tag) => donation.tags.includes(tag));

            return matchesText && matchesTags;
        });
    }, [normalizedSearch, activeTags]);

    const visible = useMemo(
        () => filtered.slice(0, page * PAGE_SIZE),
        [filtered, page]
    );

    const hasMore = visible.length < filtered.length;
    const totalCampaigns = DONATIONS.length;

    const cancelAutoLoading = useCallback(() => {
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
        }
        loadingRef.current = false;
        setIsAutoLoading(false);
    }, []);

    const triggerLoadMore = useCallback(() => {
        if (!hasMore || loadingRef.current) {
            return;
        }
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }
        loadingRef.current = true;
        setIsAutoLoading(true);
        dispatch({ type: "loadMore" });
        loadingTimeoutRef.current = setTimeout(() => {
            loadingRef.current = false;
            setIsAutoLoading(false);
            loadingTimeoutRef.current = null;
        }, 320);
    }, [dispatch, hasMore]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;
        const root = scrollContainerRef.current;
        if (!sentinel || !root) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    triggerLoadMore();
                }
            },
            {
                root,
                rootMargin: "120px 0px 240px",
                threshold: 0.1,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [triggerLoadMore]);

    useEffect(() => () => {
        cancelAutoLoading();
    }, [cancelAutoLoading]);

    const heroStats = useMemo(() => {
        const formattedTotal = totalCampaigns.toLocaleString("pt-BR");
        const formattedVisible = filtered.length.toLocaleString("pt-BR");
        return [
            {
                id: "total",
                label: "Campanhas ativas",
                value: formattedTotal,
                hint: "Organizações verificadas na plataforma",
            },
            {
                id: "match",
                label: "No seu radar",
                value: formattedVisible,
                hint: activeTags.length > 0
                    ? `${activeTags.length} tag(s) aplicada(s)`
                    : "Todos os temas liberados",
            },
            {
                id: "impact",
                label: "Impacto do mês",
                value: "92 pts",
                hint: "Pontuação acumulada das suas doações",
            },
        ];
    }, [activeTags.length, filtered.length, totalCampaigns]);

    const recommendedTags = useMemo(() => {
        const counts = new Map<string, number>();
        DONATIONS.forEach(({ tags }) => {
            tags.forEach((tag) => {
                counts.set(tag, (counts.get(tag) ?? 0) + 1);
            });
        });

        return Array.from(counts.entries())
            .sort((a, b) => {
                if (b[1] === a[1]) {
                    return a[0].localeCompare(b[0]);
                }
                return b[1] - a[1];
            })
            .map(([tag]) => tag)
            .slice(0, 8);
    }, []);

    const hasActiveFilters = activeTags.length > 0 || normalizedSearch.length > 0;

    const filterSummary = useMemo(() => {
        if (activeTags.length > 0 && normalizedSearch.length > 0) {
            return `Mostrando “${rawSearch}” com ${activeTags.length} tag(s)`;
        }
        if (activeTags.length > 0) {
            return `${activeTags.length} tag(s) selecionada(s)`;
        }
        if (normalizedSearch.length > 0) {
            return `Resultados para “${rawSearch}”`;
        }
        return "Explorando todas as campanhas disponíveis";
    }, [activeTags.length, normalizedSearch.length, rawSearch]);

    const handleSearchChange = useCallback((value: string) => {
        cancelAutoLoading();
        dispatch({ type: "search", value });
    }, [cancelAutoLoading, dispatch]);

    const toggleTag = useCallback((tag: string) => {
        cancelAutoLoading();
        dispatch({ type: "toggleTag", tag });
    }, [cancelAutoLoading, dispatch]);

    const clearTagFilters = useCallback(() => {
        cancelAutoLoading();
        dispatch({ type: "clearTags" });
    }, [cancelAutoLoading, dispatch]);

    const openFilterModal = useCallback(() => {
        setIsFilterOpen(true);
    }, []);

    const closeFilterModal = useCallback(() => {
        setIsFilterOpen(false);
    }, []);

    const manualLoadMore = useCallback(() => {
        triggerLoadMore();
    }, [triggerLoadMore]);

    const searchInputId = "home-search";

    return (
        <>
            <Header title="Pet Care Planner" subtitle="Acompanhe e doe com transparência" />
            <main className="screen home-screen" ref={scrollContainerRef}>
                <section className="card home-hero">
                    <div className="home-hero__heading">
                        <div className="home-hero__greeting">
                            <span className="home-hero__eyebrow">Seu painel</span>
                            <h1>Olá, Rafael 👋</h1>
                            <p>
                                Acompanhe campanhas de ONGs confiáveis e personalize seu impacto
                                com base nos temas que você mais apoia.
                            </p>
                        </div>
                        <div className="home-hero__badge">
                            <span className="pill large">Saldo de impacto: <strong>92 pts</strong></span>
                            <button className="btn small ghost" type="button">Ver relatório</button>
                        </div>
                    </div>
                    <div className="home-hero__stats" role="list">
                        {heroStats.map((stat) => (
                            <div key={stat.id} className="home-stat" role="listitem">
                                <span className="home-stat__label">{stat.label}</span>
                                <span className="home-stat__value">{stat.value}</span>
                                <span className="home-stat__hint">{stat.hint}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="card home-controls" aria-labelledby="home-controls-title">
                    <div className="home-controls__header">
                        <div>
                            <div id="home-controls-title" className="section-title">Campanhas em destaque</div>
                            <p className="home-controls__subtitle">Pesquise, filtre por tags e continue de onde parou.</p>
                        </div>
                        <button className="btn small outline" type="button" onClick={openFilterModal}>
                            Filtrar tags
                        </button>
                    </div>

                    <div className="home-controls__search">
                        <label className="label" htmlFor={searchInputId}>Buscar campanhas</label>
                        <div className="search-bar">
                            <span aria-hidden>🔍</span>
                            <input
                                id={searchInputId}
                                className="input"
                                placeholder="Buscar por causa, tag ou cidade"
                                value={search}
                                onChange={(event) => handleSearchChange(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="home-controls__tags" role="list">
                        {recommendedTags.map((tag) => {
                            const isActive = activeTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    role="listitem"
                                    className={`quick-tag ${isActive ? "is-active" : ""}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    #{tag}
                                </button>
                            );
                        })}
                    </div>

                    {hasActiveFilters && (
                        <div className="home-active-filters" aria-live="polite">
                            <span>{filterSummary}</span>
                            <div className="chip-group">
                                {activeTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        className="chip is-active"
                                        onClick={() => toggleTag(tag)}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                                {activeTags.length > 0 && (
                                    <button className="link muted" type="button" onClick={clearTagFilters}>
                                        limpar filtros
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                <section className="stack home-feed" aria-live="polite">
                    {visible.map((donation) => (
                        <DonationCard key={donation.id} d={donation} />
                    ))}

                    {visible.length === 0 && (
                        <div className="card home-empty">
                            Nenhuma campanha encontrada para os filtros selecionados. Tente remover algumas tags
                            ou pesquise por outro termo.
                        </div>
                    )}

                    <div ref={loadMoreRef} className="intersection-sentinel" aria-hidden />

                    {isAutoLoading && visible.length > 0 && (
                        <div className="card home-loader">Carregando mais campanhas…</div>
                    )}

                    {hasMore && !isAutoLoading && (
                        <button className="btn small ghost" type="button" onClick={manualLoadMore}>
                            Carregar mais campanhas
                        </button>
                    )}
                </section>
            </main>

            {isFilterOpen && (
                <div className="filter-backdrop" role="presentation" onClick={closeFilterModal}>
                    <div
                        className="filter-sheet"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filtrar campanhas por tags"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="filter-sheet__header">
                            <div>
                                <div className="section-title">Filtrar campanhas</div>
                                <p>Selecione uma ou mais tags para refinar os resultados do feed.</p>
                            </div>
                            <button className="btn small outline" type="button" onClick={clearTagFilters}>
                                Limpar tudo
                            </button>
                        </div>

                        <div className="tag-grid" role="list">
                            {ALL_TAGS.map((tag) => {
                                const isActive = activeTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        role="listitem"
                                        type="button"
                                        className={`filter-tag ${isActive ? "active" : ""}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        <span>#{tag}</span>
                                        {isActive && <span aria-hidden>✓</span>}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="filter-sheet__footer">
                            <button className="btn small ghost" type="button" onClick={closeFilterModal}>
                                Cancelar
                            </button>
                            <button className="btn primary" type="button" onClick={closeFilterModal}>
                                Aplicar filtros
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
