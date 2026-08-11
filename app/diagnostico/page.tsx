import type { Metadata } from "next";
import { AREA_ORDER, AREAS } from "@/content/diagnostic/areas";
import { LandingStart } from "@/components/diagnostic/LandingStart";
import { BrandHeader } from "@/components/site/BrandHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Diagnóstico",
  description:
    "Descubra qual área da sua vida pede atenção primeiro em um diagnóstico gratuito de três minutos.",
};

export default function DiagnosticLandingPage() {
  return (
    <main className="landing-shell">
      <BrandHeader />

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> DIAGNÓSTICO GRATUITO · 3 MINUTOS</p>
          <h1>
            QUAL ÁREA DA SUA VIDA ESTÁ MAIS <em>FORA DE ORDEM</em> HOJE?
          </h1>
          <p className="hero-lead">
            Responda 25 perguntas e descubra onde você precisa agir primeiro —
            e qual regra precisa parar de quebrar.
          </p>
          <LandingStart />
          <div className="hero-trust" aria-label="Informações do diagnóstico">
            <span>25 perguntas</span>
            <span>Resultado personalizado</span>
            <span>Sem criar conta</span>
          </div>
        </div>

        <aside className="hero-manifesto" aria-label="Manifesto">
          <span className="hero-manifesto__number">01</span>
          <div>
            <p>A vida não sai do lugar de uma vez.</p>
            <strong>Ela sai uma escolha por vez.</strong>
          </div>
          <span className="hero-manifesto__stamp">A.R.É.C.</span>
        </aside>
      </section>

      <section className="areas-section" aria-labelledby="areas-title">
        <div className="section-heading">
          <p className="eyebrow"><span /> CINCO ÁREAS. UMA PRIORIDADE.</p>
          <h2 id="areas-title">O DIAGNÓSTICO OLHA PARA A VIDA COMO UM TODO.</h2>
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

      <section className="method-section">
        <div className="method-quote">
          <span className="method-quote__mark">“</span>
          <blockquote>
            CLAREZA NÃO RESOLVE A VIDA. MAS MOSTRA ONDE A RESPONSABILIDADE COMEÇA.
          </blockquote>
        </div>
        <ol className="method-steps">
          <li><span>01</span><div><strong>RESPONDA COM HONESTIDADE</strong><p>Não existe resposta certa. Existe a sua rotina real.</p></div></li>
          <li><span>02</span><div><strong>ENXERGUE O TODO</strong><p>Receba suas cinco pontuações, sem rótulos ou julgamento.</p></div></li>
          <li><span>03</span><div><strong>COMECE POR UMA REGRA</strong><p>Saia com uma prioridade e três ações simples.</p></div></li>
        </ol>
      </section>

      <section className="closing-cta">
        <p>VOCÊ NÃO PRECISA ARRUMAR TUDO HOJE.</p>
        <h2>PRECISA SABER POR ONDE COMEÇAR.</h2>
        <LandingStart />
      </section>

      <SiteFooter />
    </main>
  );
}
