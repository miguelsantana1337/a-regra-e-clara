import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

test("ships the complete diagnostic landing", async () => {
  const [page, landing, areas, layout] = await Promise.all([
    readFile(new URL("../app/diagnostico/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/diagnostic/LandingStart.tsx", import.meta.url), "utf8"),
    readFile(new URL("../content/diagnostic/areas.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  const landingSource = `${page}\n${landing}\n${areas}`;
  assert.match(page, /title:\s*"Diagnóstico"/i);
  assert.match(landingSource, /Qual área da sua vida está mais/i);
  assert.match(landingSource, /Disciplina &amp; Responsabilidade|Disciplina & Responsabilidade/i);
  assert.match(landingSource, /Começar meu diagnóstico/i);
  assert.match(layout, /lang="pt-BR"/);
  assert.doesNotMatch(`${landingSource}\n${layout}`, /codex-preview|react-loading-skeleton/i);
});

test("ships complete diagnostic content and removes the starter preview", async () => {
  const [questions, results, layout, packageJson] = await Promise.all([
    readFile(new URL("../content/diagnostic/questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/diagnostic/results.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/20260811000000_initial_schema.sql", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((questions.match(/id: "/g) ?? []).length, 25);
  assert.equal((results.match(/^ {2}(discipline|principles|relationships|health|work_money): \{$/gm) ?? []).length, 5);
  assert.match(layout, /enable row level security/i);
  assert.match(layout, /create table if not exists public\.diagnostics/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(previewRoot));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
