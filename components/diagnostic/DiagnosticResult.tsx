"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AREA_ORDER, AREAS } from "@/content/diagnostic/areas";
import { AREA_RESULTS, GENERAL_RESULTS } from "@/content/diagnostic/results";
import { AREA_RULES } from "@/content/diagnostic/rules";
import { trackEvent } from "@/lib/analytics/client";
import type {
  AreaScores,
  DiagnosticArea,
  DiagnosticLevel,
  GeneralLevel,
} from "@/types/diagnostic";
import { BrandHeader } from "@/components/site/BrandHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProductOffer } from "@/components/offer/ProductOffer";

type ResultData = {
  id: string;
  name: string;
  areas: AreaScores;
  total: number;
  primaryAreas: DiagnosticArea[];
  areaLevels: Record<DiagnosticArea, DiagnosticLevel>;
  generalLevel: GeneralLevel;
};

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function areaNames(areas: DiagnosticArea[]) {
  const names = areas.map((area) => AREAS[area].shortName);
  if (names.length <= 1) return names[0] ?? "uma área";
  return `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`;
}

function priorityHeading(
  areas: DiagnosticArea[],
  areaLevels: Record<DiagnosticArea, DiagnosticLevel>,
) {
  const allStable = areas.every((area) => areaLevels[area] === "in_order");

  if (allStable && areas.length === 5) {
    return "SUAS CINCO ÁREAS ESTÃO EQUILIBRADAS NESTE NÍVEL";
  }
  if (allStable && areas.length === 1) {
    return "SUA ÁREA COM MAIOR ESPAÇO PARA APERFEIÇOAR É";
  }
  if (allStable) {
    return `SUAS ${areas.length} ÁREAS COM MAIOR ESPAÇO PARA APERFEIÇOAR SÃO`;
  }
  if (areas.length === 1) return "SUA PRINCIPAL ÁREA DE ATENÇÃO HOJE É";
  if (areas.length === 2) return "HOJE EXISTEM DUAS ÁREAS PEDINDO SUA ATENÇÃO";
  return `HOJE EXISTEM ${areas.length} ÁREAS PEDINDO SUA ATENÇÃO`;
}

export function DiagnosticResult({ id }: { id: string }) {
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void fetch(`/api/diagnostics/${encodeURIComponent(id)}`)
      .then(async (response) => {
        const data = (await response.json()) as ResultData & { error?: string };
        if (!response.ok) throw new Error(data.error ?? "Resultado não encontrado.");
        if (!active) return;
        setResult(data);
        trackEvent(
          "result_viewed",
          { total_score: data.total, primary_area: data.primaryAreas },
          data.id,
        );
      })
      .catch((caught) => {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Resultado não encontrado.");
        }
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <main className="result-state">
        <div>
          <span className="result-state__code">404</span>
          <h1>NÃO CONSEGUIMOS ABRIR ESTE RESULTADO.</h1>
          <p>{error}</p>
          <Link className="text-link" href="/diagnostico">REFAZER O DIAGNÓSTICO →</Link>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="result-state" aria-live="polite">
        <div className="result-loader" aria-hidden="true" />
        <p>ORGANIZANDO SUA LEITURA...</p>
      </main>
    );
  }

  const general = GENERAL_RESULTS[result.generalLevel];

  return (
    <main className="result-shell">
      <div className="result-hero">
        <BrandHeader quiet />
        <div className="result-hero__grid">
          <div className="result-hero__copy">
            <p className="eyebrow"><span /> SEU DIAGNÓSTICO</p>
            <h1>{firstName(result.name).toUpperCase()},<br />SEU RESULTADO FOI</h1>
            <p className="result-classification">{general.label.toUpperCase()}</p>
          </div>
          <div className="total-score" aria-label={`${result.total} pontos de 100`}>
            <strong>{result.total}</strong><span>/100</span>
          </div>
        </div>
        <div className="result-general-copy">
          <h2>{general.title}</h2>
          <p>{general.interpretation}</p>
        </div>
      </div>

      <section className="scores-section" aria-labelledby="scores-title">
        <div className="section-heading section-heading--scores">
          <p className="eyebrow eyebrow--dark"><span /> SUAS CINCO ÁREAS</p>
          <h2 id="scores-title">A VIDA COMO ELA ESTÁ HOJE.</h2>
        </div>
        <div className="score-list">
          {AREA_ORDER.map((area) => {
            const copy = AREA_RESULTS[area][result.areaLevels[area]];
            const percentage = result.areas[area] * 5;
            return (
              <article className="score-row" key={area}>
                <div className="score-row__label">
                  <span>{AREAS[area].number}</span>
                  <strong>{AREAS[area].name}</strong>
                  <em>{copy.label}</em>
                </div>
                <div className="score-row__visual">
                  <div className="score-bar" aria-label={`${AREAS[area].name}: ${percentage}%`}>
                    <span style={{ width: `${percentage}%` }} />
                  </div>
                  <strong>{percentage}%</strong>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="priority-section" aria-labelledby="priority-title">
        <div className="priority-heading">
          <p>{priorityHeading(result.primaryAreas, result.areaLevels)}</p>
          <h2 id="priority-title">{areaNames(result.primaryAreas).toUpperCase()}.</h2>
        </div>

        <div className="priority-grid">
          {result.primaryAreas.map((area) => {
            const copy = AREA_RESULTS[area][result.areaLevels[area]];
            return (
              <article className="priority-card" key={area}>
                <div className="priority-card__number">{AREAS[area].number}</div>
                <p className="priority-card__area">{AREAS[area].name.toUpperCase()}</p>
                <h3>{copy.title}</h3>
                <p className="priority-card__interpretation">{copy.interpretation}</p>
                <div className="rule-block">
                  <span>A REGRA QUE VOCÊ PRECISA APLICAR</span>
                  <blockquote>{AREA_RULES[area]}</blockquote>
                </div>
                <div className="actions-block">
                  <span>COMECE POR AQUI</span>
                  <ol>
                    {copy.actions.map((action, index) => (
                      <li key={action}><span>0{index + 1}</span><p>{action}</p></li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ProductOffer diagnosticId={result.id} />

      <div className="result-actions">
        <Link href="/diagnostico">REFAZER DIAGNÓSTICO</Link>
        <button type="button" onClick={() => window.print()}>SALVAR RESULTADO</button>
      </div>
      <SiteFooter />
    </main>
  );
}
