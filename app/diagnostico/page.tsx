import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AREA_ORDER, AREAS } from "@/content/diagnostic/areas";
import { LandingStart } from "@/components/diagnostic/LandingStart";
import { BrandHeader } from "@/components/site/BrandHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Diagnóstico",
  description:
    "Descubra em cerca de 90 segundos qual área da sua vida precisa de atenção primeiro e receba três ações práticas.",
};

const METHOD_PHASES = [
  {
    number: "01",
    label: "CLAREZA",
    title: "Observe a rotina real.",
    copy: "Dez perguntas mostram como suas escolhas aparecem na prática — sem resposta certa ou julgamento.",
  },
  {
    number: "02",
    label: "PRIORIDADE",
    title: "Escolha o ponto de alavanca.",
    copy: "O resultado compara as cinco áreas e revela onde uma mudança pode fazer mais diferença agora.",
  },
  {
    number: "03",
    label: "AÇÃO",
    title: "Comece pequeno e concreto.",
    copy: "Você sai com uma regra e três próximos passos possíveis de aplicar na vida que já existe.",
  },
];

const PREVIEW_AREAS = [
  { code: "01", label: "Disciplina", score: 38 },
  { code: "02", label: "Princípios", score: 72 },
  { code: "03", label: "Relacionamentos", score: 68 },
  { code: "04", label: "Corpo & saúde", score: 55 },
  { code: "05", label: "Trabalho & dinheiro", score: 76 },
];

const PRODUCT_PHASES = [
  {
    label: "CLAREZA",
    items: "Check-up da Vida + leitura do diagnóstico",
  },
  {
    label: "DIREÇÃO",
    items: "31 Regras Para a Vida Real + Plano 31",
  },
  {
    label: "EXECUÇÃO",
    items: "Planner + Desafio 7 Dias + 31 Cards",
  },
];

export default function DiagnosticLandingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.headerFrame}>
        <BrandHeader />
      </div>

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.systemLine} aria-label="Clareza, prioridade e ação">
              <span>CLAREZA</span>
              <i aria-hidden="true" />
              <span>PRIORIDADE</span>
              <i aria-hidden="true" />
              <span>AÇÃO</span>
            </div>

            <p className={styles.kicker}>DIAGNÓSTICO PRÁTICO · 10 PERGUNTAS · 90 SEGUNDOS</p>
            <h1>
              VOCÊ SABE O QUE PRECISA MUDAR.
              <span>DESCUBRA POR ONDE COMEÇAR.</span>
            </h1>
            <p className={styles.heroLead}>
              Identifique a área da sua vida que mais está travando sua constância
              e receba uma regra com três ações para começar hoje.
            </p>

            <LandingStart location="hero" className={styles.primaryCta} />

            <dl className={styles.heroFacts}>
              <div><dt>01</dt><dd>Gratuito</dd></div>
              <div><dt>02</dt><dd>Resultado individual</dd></div>
              <div><dt>03</dt><dd>Sem diagnóstico clínico</dd></div>
            </dl>
          </div>

          <aside className={styles.diagnosticSheet} aria-label="Exemplo do relatório de diagnóstico">
            <div className={styles.sheetClip} aria-hidden="true" />
            <header className={styles.sheetHeader}>
              <div>
                <span>RELATÓRIO DE DIREÇÃO</span>
                <strong>A REGRA É CLARA</strong>
              </div>
              <span>AMOSTRA / 001</span>
            </header>

            <div className={styles.sheetScore}>
              <div><strong>64</strong><span>/100</span></div>
              <p><span>NÍVEL GERAL</span>PRECISA DE AJUSTES</p>
            </div>

            <div className={styles.sheetPriority}>
              <span>PRIORIDADE IDENTIFICADA</span>
              <strong>DISCIPLINA</strong>
              <p>“Compromisso não depende de vontade.”</p>
            </div>

            <div className={styles.sheetAreas}>
              {PREVIEW_AREAS.map((area) => (
                <div key={area.code} className={styles.sheetArea}>
                  <span>{area.code}</span>
                  <strong>{area.label}</strong>
                  <i>
                    <b
                      style={{ "--score": `${area.score}%` } as CSSProperties}
                    />
                  </i>
                  <em>{area.score}%</em>
                </div>
              ))}
            </div>

            <footer className={styles.sheetFooter}>
              <span>SAÍDA DO DIAGNÓSTICO</span>
              <strong>1 PRIORIDADE · 1 REGRA · 3 AÇÕES</strong>
            </footer>
          </aside>
        </div>
      </section>

      <section className={styles.patternSection} aria-labelledby="pattern-title">
        <div className={styles.sectionIndex}>
          <span>01</span>
          <p>O PADRÃO</p>
        </div>
        <div className={styles.patternCopy}>
          <p className={styles.kickerLight}>O PROBLEMA NÃO É FALTA DE INFORMAÇÃO</p>
          <h2 id="pattern-title">INTENÇÃO SEM PRIORIDADE VIRA MAIS UMA SEMANA NO AUTOMÁTICO.</h2>
        </div>
        <div className={styles.patternBoard}>
          <article>
            <span>SEM DIREÇÃO</span>
            <strong>Tudo parece urgente.</strong>
            <p>Você reage ao dia e tenta corrigir cinco áreas ao mesmo tempo.</p>
          </article>
          <div className={styles.patternArrow} aria-hidden="true">→</div>
          <article>
            <span>COM PRIORIDADE</span>
            <strong>Uma decisão organiza a próxima.</strong>
            <p>Você escolhe um ponto de partida e protege o movimento seguinte.</p>
          </article>
        </div>
        <p className={styles.patternRule}>
          <span>REGRA / 001</span>
          O primeiro passo não é fazer mais. É escolher melhor onde agir.
        </p>
      </section>

      <section className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.sectionIndex}>
          <span>02</span>
          <p>O PROCESSO</p>
        </div>
        <div className={styles.processHeading}>
          <p className={styles.kicker}>COMEÇO, MEIO E PRÓXIMO PASSO</p>
          <h2 id="process-title">CLAREZA NÃO É CONTEMPLAÇÃO. É SEQUÊNCIA.</h2>
          <p>Em cerca de 90 segundos, você sai do “preciso mudar” para “vou começar aqui”.</p>
        </div>
        <ol className={styles.processGrid}>
          {METHOD_PHASES.map((phase) => (
            <li key={phase.number}>
              <div className={styles.processNumber}><span>{phase.number}</span><i /></div>
              <p>{phase.label}</p>
              <h3>{phase.title}</h3>
              <span>{phase.copy}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.areasSection} aria-labelledby="areas-title">
        <div className={styles.sectionIndex}>
          <span>03</span>
          <p>O MAPA</p>
        </div>
        <div className={styles.areasHeading}>
          <div>
            <p className={styles.kicker}>CINCO ÁREAS. UMA PRIORIDADE.</p>
            <h2 id="areas-title">A VIDA COMO ELA ESTÁ SENDO VIVIDA — NÃO COMO DEVERIA SER.</h2>
          </div>
          <p>
            O diagnóstico não procura perfeição. Ele compara práticas da sua rotina
            para mostrar onde existe mais espaço de ajuste agora.
          </p>
        </div>
        <div className={styles.areasGrid}>
          {AREA_ORDER.map((area) => (
            <article className={styles.areaCard} key={area}>
              <div className={styles.areaCardTop}>
                <span>ÁREA / {AREAS[area].number}</span>
                <i aria-hidden="true" />
              </div>
              <p>{AREAS[area].eyebrow}</p>
              <h3>{AREAS[area].name}</h3>
              <div className={styles.areaCardFooter}>
                <span>{AREAS[area].description}</span>
                <b aria-hidden="true">↘</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.productSection} aria-labelledby="product-title">
        <div className={styles.sectionIndex}>
          <span>04</span>
          <p>A CONTINUAÇÃO</p>
        </div>
        <div className={styles.productGrid}>
          <div className={styles.methodObject} aria-hidden="true">
            <div className={styles.methodSpine}>MÉTODO / 01</div>
            <div className={styles.methodCover}>
              <span>CLAREZA · DIREÇÃO · EXECUÇÃO</span>
              <strong>A<br />REGRA<br />É CLARA.</strong>
              <p>UM SISTEMA PRÁTICO PARA A VIDA REAL</p>
              <i>EDIÇÃO 01</i>
            </div>
          </div>

          <div className={styles.productCopy}>
            <p className={styles.kickerLight}>DEPOIS DO RESULTADO</p>
            <h2 id="product-title">O DIAGNÓSTICO MOSTRA ONDE. O MÉTODO AJUDA A EXECUTAR.</h2>
            <p className={styles.productLead}>
              Se você quiser continuar, os materiais são organizados como um único
              caminho — não como seis arquivos soltos.
            </p>
            <div className={styles.productPhases}>
              {PRODUCT_PHASES.map((phase, index) => (
                <article key={phase.label}>
                  <span>0{index + 1}</span>
                  <strong>{phase.label}</strong>
                  <p>{phase.items}</p>
                </article>
              ))}
            </div>
            <p className={styles.productNote}>
              A continuação é opcional e aparece com transparência somente depois do resultado gratuito.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.closingRule}>
          <span>REGRA DE SAÍDA / 002</span>
          <i aria-hidden="true" />
          <span>COMECE PELO QUE ORGANIZA O RESTO.</span>
        </div>
        <p>VOCÊ NÃO PRECISA RESOLVER TUDO HOJE.</p>
        <h2>PRECISA ESCOLHER O PRIMEIRO MOVIMENTO.</h2>
        <LandingStart location="closing" className={styles.closingCta} />
        <span className={styles.closingMeta}>10 PERGUNTAS · CERCA DE 90 SEGUNDOS · RESULTADO GRATUITO</span>
      </section>

      <div className={styles.footerFrame}>
        <SiteFooter />
      </div>
    </main>
  );
}
