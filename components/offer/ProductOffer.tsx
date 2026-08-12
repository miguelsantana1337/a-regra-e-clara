"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/client";

const METHOD_PHASES = [
  {
    number: "01",
    name: "Clareza",
    items: ["Check-up da Vida", "Leitura do seu diagnóstico"],
  },
  {
    number: "02",
    name: "Direção",
    items: ["31 Regras Para a Vida Real", "Plano 31"],
  },
  {
    number: "03",
    name: "Execução",
    items: ["Planner A Regra é Clara", "Desafio 7 Dias", "31 Cards verticais"],
  },
];

export function ProductOffer({ diagnosticId }: { diagnosticId: string }) {
  const [notice, setNotice] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const offerViewedTrackedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || offerViewedTrackedRef.current) return;
        offerViewedTrackedRef.current = true;
        trackEvent(
          "offer_viewed",
          { product: "kit-a-regra-e-clara", price: 27, offer_version: "v2" },
          diagnosticId,
        );
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [diagnosticId]);

  function registerCheckoutIntent() {
    trackEvent(
      "checkout_clicked",
      { product: "kit-a-regra-e-clara", price: 27, offer_version: "v2" },
      diagnosticId,
    );
    setNotice(true);
  }

  return (
    <section ref={sectionRef} className="offer-section offer-section--v2" aria-labelledby="offer-title">
      <div className="offer-intro">
        <p className="eyebrow eyebrow--dark"><span /> O PRÓXIMO PASSO É OPCIONAL</p>
        <h2 id="offer-title">SEU RESULTADO MOSTROU ONDE COMEÇAR. AGORA VOCÊ PODE TRANSFORMAR ISSO EM ROTINA.</h2>
        <p>
          O método A Regra é Clara organiza seis materiais em três movimentos:
          clareza, direção e execução.
        </p>
      </div>

      <div className="offer-card offer-card--method">
        <div className="offer-card__identity">
          <span className="offer-card__edition">MÉTODO / EDIÇÃO 01</span>
          <div className="offer-card__mark">A<br />REGRA<br />É CLARA.</div>
          <p>Um caminho prático para adultos que querem transformar intenção em constância.</p>
        </div>
        <div className="offer-card__details">
          <div className="offer-method" aria-label="Conteúdo organizado em três movimentos">
            {METHOD_PHASES.map((phase) => (
              <article key={phase.number}>
                <span>{phase.number}</span>
                <div>
                  <h3>{phase.name}</h3>
                  <ul>
                    {phase.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="offer-card__purchase">
            <div className="offer-card__price">
              <span>VALOR DE LANÇAMENTO</span>
              <strong><small>R$</small>27</strong>
              <span>PAGAMENTO ÚNICO</span>
            </div>
            <button className="offer-button" type="button" onClick={registerCheckoutIntent}>
              <span>QUERO TRANSFORMAR MEU RESULTADO EM AÇÃO</span><span aria-hidden="true">↗</span>
            </button>
            {notice ? (
              <p className="offer-notice" role="status">
                Interesse registrado. O checkout será liberado quando o provedor oficial estiver conectado.
              </p>
            ) : (
              <p className="offer-card__secure">O CHECKOUT AINDA NÃO ESTÁ CONECTADO. NENHUMA COBRANÇA SERÁ FEITA AGORA.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
