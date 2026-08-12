import type { Metadata } from "next";
import Link from "next/link";
import { AREA_ORDER, AREAS } from "@/content/diagnostic/areas";
import { LandingStart } from "@/components/diagnostic/LandingStart";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "Diagnóstico",
  description:
    "Em 10 perguntas, descubra qual área da sua vida pede atenção primeiro e receba três ações práticas.",
};

const JOURNEY = [
  {
    cue: "Você responde",
    title: "Olhe para a vida como ela está.",
    copy: "São 10 perguntas diretas sobre escolhas, presença, constância e responsabilidade.",
  },
  {
    cue: "O resultado organiza",
    title: "Enxergue o que pede atenção.",
    copy: "As cinco áreas são comparadas para mostrar onde existe mais espaço de ajuste agora.",
  },
  {
    cue: "Você começa",
    title: "Leve uma decisão para o dia.",
    copy: "Você recebe uma regra e três atitudes possíveis para sair da intenção e entrar em movimento.",
  },
];

export default function DiagnosticLandingPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/diagnostico" className={styles.wordmark} aria-label="A Regra é Clara — início">
          A REGRA <em>É CLARA.</em>
        </Link>
        <span>Diagnóstico gratuito</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Para quem cansou de saber e não fazer.</p>
          <h1>
            Você não precisa{" "}
            <em>mudar tudo.</em>{" "}
            <span>Precisa saber o que vem primeiro.</span>
          </h1>
          <p className={styles.heroLead}>
            Em 10 perguntas, descubra qual área da sua vida pede atenção agora
            e receba uma regra prática para começar.
          </p>
          <LandingStart location="hero" className={styles.primaryCta} />
          <p className={styles.heroNote}>
            Gratuito <i /> cerca de 90 segundos <i /> sem criar conta
          </p>
        </div>

        <aside className={styles.heroAside} aria-label="Manifesto A Regra é Clara">
          <span className={styles.asideKicker}>Antes de começar</span>
          <blockquote>
            “A vida não muda quando você entende tudo. Muda quando uma escolha
            deixa de ser intenção e vira compromisso.”
          </blockquote>
          <div className={styles.asideMark} aria-hidden="true">
            <span>comece</span>
            <strong>aqui</strong>
          </div>
          <p>Sem rótulo. Sem julgamento. Apenas um ponto de partida honesto.</p>
        </aside>
      </section>

      <section className={styles.tensionSection} aria-labelledby="tension-title">
        <div className={styles.tensionStatement}>
          <p>Talvez não falte força.</p>
          <h2 id="tension-title">
            Você já sabe <em>muita coisa.</em>
            <span>Só não sabe onde colocar sua energia primeiro.</span>
          </h2>
        </div>
        <div className={styles.tensionBody}>
          <p>
            Você promete que vai retomar a rotina. Estar mais presente. Cuidar do
            corpo. Organizar o trabalho. Cumprir a própria palavra.
          </p>
          <p>
            Quando tudo pede atenção ao mesmo tempo, até uma boa intenção perde
            força. O diagnóstico existe para separar o urgente do importante.
          </p>
          <blockquote>
            <span>Uma regra para levar:</span>
            Fazer tudo de uma vez também é uma forma de não começar.
          </blockquote>
        </div>
      </section>

      <section className={styles.areasSection} aria-labelledby="areas-title">
        <div className={styles.areasHeading}>
          <p>O que será observado</p>
          <h2 id="areas-title">Cinco partes da mesma vida.</h2>
          <span>
            Não é um teste de personalidade. É uma leitura das escolhas que já
            aparecem na sua rotina.
          </span>
        </div>

        <div className={styles.areaList}>
          {AREA_ORDER.map((area) => (
            <article className={styles.areaRow} key={area}>
              <span>{AREAS[area].number}</span>
              <h3>{AREAS[area].name}</h3>
              <p>{AREAS[area].description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.journeySection} aria-labelledby="journey-title">
        <div className={styles.journeyIntro}>
          <p>Leva menos de dois minutos.</p>
          <h2 id="journey-title">Mas a pergunta é sobre a vida real.</h2>
        </div>
        <div className={styles.journeyFlow}>
          {JOURNEY.map((step) => (
            <article key={step.cue}>
              <span>{step.cue}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.outcomeSection} aria-labelledby="outcome-title">
        <div className={styles.outcomeCopy}>
          <p>Ao terminar</p>
          <h2 id="outcome-title">Você não recebe mais informação.</h2>
          <h2><em>Recebe direção.</em></h2>
          <p className={styles.outcomeLead}>
            O resultado mostra a área que pede atenção primeiro e transforma essa
            leitura em um começo possível para hoje.
          </p>
        </div>
        <div className={styles.outcomeWords} aria-label="O resultado inclui uma prioridade, uma regra e três ações">
          <span>uma</span>
          <strong>prioridade</strong>
          <span>uma</span>
          <strong>regra</strong>
          <span>três</span>
          <strong>ações</strong>
        </div>
      </section>

      <section className={styles.offerSection} aria-labelledby="offer-title">
        <div className={styles.bookObject} aria-hidden="true">
          <div className={styles.bookSpine}>A REGRA É CLARA</div>
          <div className={styles.bookCover}>
            <span>um método para a vida real</span>
            <strong>A regra<br />é clara.</strong>
            <p>Clareza para escolher.<br />Estrutura para continuar.</p>
          </div>
        </div>

        <div className={styles.offerCopy}>
          <p>O que estamos oferecendo</p>
          <h2 id="offer-title">Primeiro, clareza. Depois, se fizer sentido, método.</h2>
          <p>
            O diagnóstico e o resultado são gratuitos. Depois deles, você poderá
            conhecer o <strong>Método A Regra é Clara</strong>: uma continuação
            prática para transformar sua prioridade em rotina.
          </p>
          <div className={styles.offerPath}>
            <span>clareza</span><i aria-hidden="true">—</i>
            <span>direção</span><i aria-hidden="true">—</i>
            <span>execução</span>
          </div>
          <p className={styles.offerPrice}>
            Continuação opcional · R$ 27 · apresentada somente após seu resultado
          </p>
        </div>
      </section>

      <section className={styles.closingSection}>
        <p>Se tudo parece importante, escolha o que organiza o resto.</p>
        <h2>Qual parte da sua vida está pedindo uma decisão?</h2>
        <LandingStart location="closing" className={styles.closingCta} />
        <span>10 perguntas · resultado gratuito · sem criar conta</span>
      </section>

      <footer className={styles.footer}>
        <strong>A REGRA É CLARA.</strong>
        <p>
          Um instrumento de reflexão pessoal. Não substitui orientação médica,
          psicológica, jurídica ou financeira.
        </p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
