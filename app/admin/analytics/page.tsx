import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type EventRow = {
  name: string;
  session_id: string;
  properties: Record<string, unknown> | null;
  created_at: string;
};

type StageDefinition = {
  label: string;
  names: string[];
};

const STAGES: StageDefinition[] = [
  { label: "Landing", names: ["landing_viewed", "diagnostic_landing_view"] },
  { label: "Quiz iniciado", names: ["quiz_started", "diagnostic_started"] },
  { label: "Quiz concluído", names: ["quiz_completed", "diagnostic_completed"] },
  { label: "Lead enviado", names: ["lead_submitted", "lead_captured"] },
  { label: "Resultado visto", names: ["result_viewed"] },
  { label: "Oferta vista", names: ["offer_viewed"] },
  { label: "Clique no checkout", names: ["checkout_clicked"] },
];

function sessionsFor(events: EventRow[], names: string[]) {
  const acceptedNames = new Set(names);
  return new Set(
    events
      .filter((event) => acceptedNames.has(event.name))
      .map((event) => event.session_id),
  );
}

function percentage(value: number, total: number) {
  if (!total) return "—";
  return `${Math.round((value / total) * 100)}%`;
}

function numericProperty(
  properties: Record<string, unknown> | null,
  keys: string[],
) {
  for (const key of keys) {
    const value = properties?.[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return null;
}

function sourceLabel(properties: Record<string, unknown> | null) {
  const source = properties?.source;
  return typeof source === "string" && source.trim() ? source.trim() : "Direto / sem UTM";
}

async function loadAnalytics() {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data, error } = await getSupabaseAdmin()
    .from("events")
    .select("name,session_id,properties,created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(10000);

  if (error) throw error;
  return (data ?? []) as EventRow[];
}

export default async function AnalyticsPage() {
  let events: EventRow[] = [];
  let loadError = "";

  try {
    events = await loadAnalytics();
  } catch (error) {
    console.error("Falha ao carregar painel de analytics", error);
    loadError = "Não foi possível consultar os eventos agora.";
  }

  const stageRows = STAGES.map((stage) => ({
    ...stage,
    sessions: sessionsFor(events, stage.names),
  }));
  const landingSessions = stageRows[0]?.sessions.size ?? 0;
  const allSessions = new Set(events.map((event) => event.session_id)).size;

  const completedSessions = sessionsFor(events, [
    "quiz_completed",
    "diagnostic_completed",
  ]);
  const lastQuestionBySession = new Map<string, number>();

  for (const event of events) {
    if (!["quiz_question_answered", "diagnostic_question_answered", "quiz_abandoned"].includes(event.name)) {
      continue;
    }
    const position = numericProperty(event.properties, [
      "last_question_number",
      "question_number",
      "position",
    ]);
    if (position === null) continue;
    const current = lastQuestionBySession.get(event.session_id) ?? 0;
    lastQuestionBySession.set(event.session_id, Math.max(current, position));
  }

  const abandonment = new Map<number, number>();
  for (const [sessionId, position] of lastQuestionBySession) {
    if (completedSessions.has(sessionId)) continue;
    abandonment.set(position, (abandonment.get(position) ?? 0) + 1);
  }
  const abandonmentRows = [...abandonment.entries()]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, 8);

  const sources = new Map<string, Set<string>>();
  for (const event of events) {
    if (!["landing_viewed", "diagnostic_landing_view"].includes(event.name)) continue;
    const label = sourceLabel(event.properties);
    const sessions = sources.get(label) ?? new Set<string>();
    sessions.add(event.session_id);
    sources.set(label, sessions);
  }
  const sourceRows = [...sources.entries()]
    .map(([source, sessions]) => ({ source, count: sessions.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  return (
    <main className="analytics-shell">
      <header className="analytics-header">
        <div>
          <p>A REGRA É CLARA / V2</p>
          <h1>FUNIL DOS ÚLTIMOS 30 DIAS</h1>
        </div>
        <span>Atualizado em {generatedAt}</span>
      </header>

      {loadError ? <p className="analytics-error" role="alert">{loadError}</p> : null}

      <section className="analytics-kpis" aria-label="Indicadores gerais">
        <article><span>EVENTOS</span><strong>{events.length}</strong></article>
        <article><span>SESSÕES</span><strong>{allSessions}</strong></article>
        <article><span>CONCLUSÃO DO QUIZ</span><strong>{percentage(completedSessions.size, landingSessions)}</strong></article>
        <article><span>CLIQUE / LANDING</span><strong>{percentage(stageRows.at(-1)?.sessions.size ?? 0, landingSessions)}</strong></article>
      </section>

      <section className="analytics-panel" aria-labelledby="funnel-title">
        <div className="analytics-panel__heading">
          <div><span>FUNIL</span><h2 id="funnel-title">Sessões únicas por etapa</h2></div>
          <p>Eventos V1 e V2 são consolidados sem contar a mesma sessão duas vezes.</p>
        </div>
        <div className="analytics-funnel">
          {stageRows.map((stage, index) => {
            const previous = index === 0 ? landingSessions : stageRows[index - 1]?.sessions.size ?? 0;
            return (
              <article key={stage.label}>
                <div><span>0{index + 1}</span><strong>{stage.label}</strong></div>
                <div className="analytics-funnel__values">
                  <strong>{stage.sessions.size}</strong>
                  <span>{index === 0 ? "BASE" : `${percentage(stage.sessions.size, previous)} DA ETAPA ANTERIOR`}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="analytics-columns">
        <section className="analytics-panel" aria-labelledby="abandonment-title">
          <div className="analytics-panel__heading">
            <div><span>ATRITO</span><h2 id="abandonment-title">Última pergunta antes da saída</h2></div>
          </div>
          {abandonmentRows.length ? (
            <ol className="analytics-ranking">
              {abandonmentRows.map(([position, count]) => (
                <li key={position}><span>Pergunta {position}</span><strong>{count} {count === 1 ? "sessão" : "sessões"}</strong></li>
              ))}
            </ol>
          ) : <p className="analytics-empty">Ainda não há abandono identificável no período.</p>}
        </section>

        <section className="analytics-panel" aria-labelledby="sources-title">
          <div className="analytics-panel__heading">
            <div><span>AQUISIÇÃO</span><h2 id="sources-title">Origem das sessões</h2></div>
          </div>
          {sourceRows.length ? (
            <ol className="analytics-ranking">
              {sourceRows.map(({ source, count }) => (
                <li key={source}><span>{source}</span><strong>{count} {count === 1 ? "sessão" : "sessões"}</strong></li>
              ))}
            </ol>
          ) : <p className="analytics-empty">Ainda não há origem registrada no período.</p>}
        </section>
      </div>

      <footer className="analytics-footer">
        Este painel exibe somente dados agregados. Nome, e-mail e WhatsApp não aparecem aqui.
      </footer>
    </main>
  );
}
