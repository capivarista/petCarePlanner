// app/home/page.tsx
"use client";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
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
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return DONATIONS.filter((donation) => {
      const matchesText =
        !searchTerm ||
        donation.name.toLowerCase().includes(searchTerm) ||
        donation.description.toLowerCase().includes(searchTerm) ||
        donation.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => donation.tags.includes(tag));

      return matchesText && matchesTags;
    });
  }, [search, activeTags]);

  const visible = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page]
  );

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visible.length < filtered.length) {
          dispatch({ type: "loadMore" });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filtered.length, visible.length]);

  return (
    <>
      <Header title="Pet Care Planner" subtitle="Acompanhe e doe com transparência" />
      <div className="screen">
        <div className="card" style={{ display: "grid", gap: 14, position: "relative" }}>
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
              onClick={() => setIsFilterOpen((prev) => !prev)}
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
          {visible.map((donation) => (
            <DonationCard key={donation.id} d={donation} />
          ))}
          <div ref={loadMoreRef} style={{ height: 1 }} />
          {visible.length === 0 && (
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
            onClick={(event) => event.stopPropagation()}
          >
            <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="section-title" style={{ marginBottom: 4 }}>Filtrar campanhas</div>
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
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    role="listitem"
                    type="button"
                    className={`filter-tag ${isActive ? "active" : ""}`}
                    onClick={() => dispatch({ type: "toggleTag", tag })}
                  >
                    <span>#{tag}</span>
                    {isActive && <span aria-hidden>✓</span>}
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
