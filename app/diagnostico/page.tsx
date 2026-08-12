import type { Metadata } from "next";
import { AREA_ORDER, AREAS } from "@/content/diagnostic/areas";
import { LandingStart } from "@/components/diagnostic/LandingStart";
import { BrandHeader } from "@/components/site/BrandHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Diagnóstico",
  description:
    "Descubra em cerca de 90 segundos qual área da sua vida precisa de atenção primeiro e receba três ações práticas.",
};

const METHOD_PHASES = [
  {
    number: "01",
    title: "Clareza",
    copy: "Você responde 10 perguntas sobre sua rotina real, sem resposta certa ou julgamento.",
  },
  {
    number: "02",
    title: "Prioridade",
    copy: "O resultado mostra suas cinco áreas e revela qual delas pede atenção primeiro.",
  },
  {
    number: "03",
    title: "Ação",
    copy: "Você recebe uma regra e três ações simples para começar ainda hoje.",
  },
];

export default function DiagnosticLandingPage() {
  return (
    <main className="landing-shell landing-shell--v2">
      <BrandHeader />

      <section className="hero-section hero-section--v2">
        <div className="hero-copy">
          <p className="eyebrow"><span /> DIAGNÓSTICO PRÁTICO · 10 PERGUNTAS · CERCA DE 90 SEGUNDOS</p>
          <h1>
            VOCÊ SABE O QUE PRECISA MUDAR. <em>DESCUBRA POR ONDE COMEÇAR.</em>
          </h1>
          <p className="hero-lead">
            Identifique a área da sua vida que mais está travando sua constância
            e receba uma regra com três ações para começar hoje.
          </p>
          <LandingStart location="hero" />
          <div className="hero-trust" aria-label="Informações do diagnóstico">
            <span>Gratuito</span>
            <span>Resultado personalizado</span>
            <span>Sem diagnóstico médico</span>
          </div>
        </div>

        <aside className="result-preview" aria-label="Exemplo do resultado recebido">
          <div className="result-preview__top">
            <span>EXEMPLO DE RESULTADO</span>
            <span>64/100</span>
          </div>
          <div className="result-preview__body">
            <p>SUA PRIORIDADE AGORA</p>
            <h2>DISCIPLINA</h2>
            <div className="result-preview__bar"><span /></div>
            <blockquote>“Compromisso não depende de vontade.”</blockquote>
          </div>
          <div className="result-preview__footer">
            <span>5 áreas analisadas</span>
            <span>3 próximos passos</span>
          </div>
        </aside>
      </section>

      <section className="tension-section" aria-labelledby="tension-title">
        <p className="eyebrow eyebrow--dark"><span /> O PROBLEMA NÃO É FALTA DE INFORMAÇÃO</p>
        <div className="tension-section__grid">
          <h2 id="tension-title">INTENÇÃO SEM PRIORIDADE VIRA MAIS UMA SEMANA NO AUTOMÁTICO.</h2>
          <div>
            <p>
              Você tenta organizar tudo ao mesmo tempo. O urgente ocupa o dia,
              o importante fica para depois e a sensação de atraso continua.
            </p>
            <strong>O primeiro passo não é fazer mais. É escolher melhor onde agir.</strong>
          </div>
        </div>
      </section>

      <section className="v2-method" aria-labelledby="method-title">
        <div className="section-heading">
          <p className="eyebrow"><span /> COMEÇO, MEIO E PRÓXIMO PASSO</p>
          <h2 id="method-title">EM CERCA DE 90 SEGUNDOS, VOCÊ SAI DO “PRECISO MUDAR” PARA “VOU COMEÇAR AQUI”.</h2>
        </div>
        <ol className="v2-method__grid">
          {METHOD_PHASES.map((phase) => (
            <li key={phase.number}>
              <span>{phase.number}</span>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="areas-section" aria-labelledby="areas-title">
        <div className="section-heading">
          <p className="eyebrow"><span /> CINCO ÁREAS. UMA PRIORIDADE.</p>
          <h2 id="areas-title">UMA LEITURA PRÁTICA DA VIDA QUE VOCÊ ESTÁ LEVANDO HOJE.</h2>
        </div>
        <div className="areas-grid">
          {AREA_ORDER.map((area) => (
            <article className="area-card" key={area}>
              <div className="area-card__top">
                <span>{AREAS[area].number}</span>
                <span aria-hidden="true">↘</span>
              </div>
              <h3>{AREAS[area].name}</h3>
              <p>{AREAS[area].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-teaser" aria-labelledby="product-teaser-title">
        <div>
          <p className="eyebrow eyebrow--dark"><span /> DEPOIS DO RESULTADO</p>
          <h2 id="product-teaser-title">O DIAGNÓSTICO MOSTRA ONDE. O MÉTODO AJUDA A EXECUTAR.</h2>
        </div>
        <div className="product-teaser__phases">
          <article><span>CLAREZA</span><p>Check-up da Vida e leitura do diagnóstico.</p></article>
          <article><span>DIREÇÃO</span><p>31 Regras Para a Vida Real e Plano 31.</p></article>
          <article><span>EXECUÇÃO</span><p>Planner, Desafio 7 Dias e 31 Cards verticais.</p></article>
        </div>
        <p className="product-teaser__note">
          A continuação é opcional e aparece com transparência depois do resultado gratuito.
        </p>
      </section>

      <section className="closing-cta closing-cta--v2">
        <p>VOCÊ NÃO PRECISA RESOLVER TUDO HOJE.</p>
        <h2>PRECISA ESCOLHER O PRIMEIRO MOVIMENTO.</h2>
        <LandingStart location="closing" />
      </section>

      <SiteFooter />
    </main>
  );
}
