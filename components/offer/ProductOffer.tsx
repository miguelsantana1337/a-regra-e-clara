"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/client";

const DELIVERABLES = [
  "31 Regras Para a Vida Real",
  "Check-up da Vida",
  "Planner A Regra é Clara",
  "Desafio 7 Dias",
  "31 Cards verticais",
  "Plano 31",
];

export function ProductOffer({ diagnosticId }: { diagnosticId: string }) {
  const [notice, setNotice] = useState(false);

  function registerCheckoutIntent() {
    trackEvent(
      "checkout_clicked",
      { product: "kit-a-regra-e-clara", price: 27 },
      diagnosticId,
    );
    setNotice(true);
  }

  return (
    <section className="offer-section" aria-labelledby="offer-title">
      <div className="offer-intro">
        <p className="eyebrow eyebrow--dark"><span /> O PRÓXIMO PASSO</p>
        <h2 id="offer-title">VOCÊ JÁ DESCOBRIU ONDE PRECISA AGIR.</h2>
        <p>Agora precisa transformar percepção em ação.</p>
      </div>

      <div className="offer-card">
        <div className="offer-card__identity">
          <span className="offer-card__edition">KIT / EDIÇÃO 01</span>
          <div className="offer-card__mark">A<br />REGRA<br />É CLARA.</div>
          <p>Ferramentas práticas para começar a colocar sua vida em ordem.</p>
        </div>
        <div className="offer-card__details">
          <div className="offer-card__price">
            <span>VALOR DE LANÇAMENTO</span>
            <strong><small>R$</small>27</strong>
            <span>PAGAMENTO ÚNICO</span>
          </div>
          <ul>
            {DELIVERABLES.map((item) => (
              <li key={item}><span aria-hidden="true">✓</span>{item}</li>
            ))}
          </ul>
          <button className="offer-button" type="button" onClick={registerCheckoutIntent}>
            <span>QUERO COMEÇAR AGORA</span><span aria-hidden="true">↗</span>
          </button>
          {notice ? (
            <p className="offer-notice" role="status">
              Interesse registrado. O checkout será liberado quando o provedor oficial estiver conectado.
            </p>
          ) : (
            <p className="offer-card__secure">ACESSO LIBERADO SOMENTE APÓS PAGAMENTO CONFIRMADO</p>
          )}
        </div>
      </div>
    </section>
  );
}
