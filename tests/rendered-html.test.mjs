import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render(pathname = "/diagnostico") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the diagnostic landing", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Diagnóstico \| A Regra é Clara<\/title>/i);
  assert.match(html, /Qual área da sua vida está mais/i);
  assert.match(html, /Disciplina &amp; Responsabilidade/i);
  assert.match(html, /Começar meu diagnóstico/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("ships complete diagnostic content and removes the starter preview", async () => {
  const [questions, results, layout, packageJson] = await Promise.all([
    readFile(new URL("../content/diagnostic/questions.ts", import.meta.url), "utf8"),
    readFile(new URL("../content/diagnostic/results.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((questions.match(/id: "/g) ?? []).length, 25);
  assert.equal((results.match(/^ {2}(discipline|principles|relationships|health|work_money): \{$/gm) ?? []).length, 5);
  assert.match(layout, /lang="pt-BR"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(previewRoot));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
