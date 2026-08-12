import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

test("ships the complete diagnostic landing", async () => {
  const [page, landingStyles, landing, areas, layout, socialImage] = await Promise.all([
    readFile(new URL("../app/diagnostico/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/diagnostico/landing.module.css", import.meta.url), "utf8"),
    readFile(new URL("../components/diagnostic/LandingStart.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/diagnostic/areas.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/opengraph-image.tsx", import.meta.url), "utf8"),
  ]);

  const landingSource = `${page}\n${landing}\n${areas}`;
  assert.match(page, /title:\s*"Diagnóstico"/i);
  assert.match(landingSource, /Você não precisa/i);
  assert.match(landingSource, /Precisa saber o que vem primeiro/i);
  assert.match(landingSource, /Disciplina &amp; Responsabilidade|Disciplina & Responsabilidade/i);
  assert.match(landingSource, /Descobrir minha prioridade/i);
  assert.match(page, /landing\.module\.css/);
  assert.match(page, /uma prioridade, uma regra e três ações/i);
  assert.match(landingStyles, /--editorial-rust:\s*#bc5637/i);
  assert.doesNotMatch(landingStyles, /#dfff33/i);
  assert.doesNotMatch(page, /RELATÓRIO DE DIREÇÃO|sheetScore|systemLine|processGrid/);
  assert.match(socialImage, /Precisa saber o/);
  assert.doesNotMatch(socialImage, /63\s*\/\s*100|#dfff33/i);
  assert.match(layout, /lang="pt-BR"/);
  assert.doesNotMatch(`${landingSource}\n${layout}`, /codex-preview|react-loading-skeleton/i);
});

test("ships complete diagnostic content and removes the starter preview", async () => {
  const [questions, results, scoring, layout, packageJson] = await Promise.all([
    readFile(new URL("../content/diagnostic/questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/diagnostic/results.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/diagnostic/scoring.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/20260811000000_initial_schema.sql", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((questions.match(/id: "/g) ?? []).length, 10);
  assert.equal((results.match(/^ {2}(discipline|principles|relationships|health|work_money): \{$/gm) ?? []).length, 5);
  assert.match(scoring, /rawAreas\[area\] \/ maximumRawScore\) \* 20/);
  assert.match(scoring, /QUESTIONS\.length/);
  assert.match(layout, /enable row level security/i);
  assert.match(layout, /create table if not exists public\.diagnostics/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(previewRoot));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

test("ships the V2 event taxonomy and a protected aggregate dashboard", async () => {
  const [events, landing, quiz, diagnosticsRoute, dashboard, proxy] = await Promise.all([
    readFile(new URL("../lib/analytics/events.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/diagnostic/LandingStart.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/diagnostic/DiagnosticQuiz.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/diagnostics/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/analytics/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../proxy.ts", import.meta.url), "utf8"),
  ]);

  for (const eventName of [
    "landing_viewed",
    "quiz_cta_clicked",
    "quiz_started",
    "quiz_completed",
    "lead_submitted",
    "result_viewed",
    "offer_viewed",
    "checkout_clicked",
  ]) {
    assert.match(events, new RegExp(`"${eventName}"`));
  }

  assert.doesNotMatch(`${landing}\n${quiz}`, /trackEvent\("diagnostic_/);
  assert.match(diagnosticsRoute, /name: "lead_submitted"/);
  assert.match(dashboard, /dados agregados/i);
  assert.doesNotMatch(dashboard, /\.from\("users"\)|\.from\("diagnostics"\)/);
  assert.match(proxy, /ANALYTICS_ADMIN_PASSWORD/);
  assert.match(proxy, /WWW-Authenticate/);
});
