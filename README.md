# A Regra é Clara

MVP mobile-first de um funil de diagnóstico pessoal:

`conteúdo → diagnóstico → captura → resultado → oferta`

## O que está funcionando

- Landing do diagnóstico em `/diagnostico`.
- 25 perguntas, cinco por área, exibidas uma por vez.
- Progresso temporário salvo no dispositivo.
- Captura de nome, WhatsApp, e-mail e consentimento opcional depois da conclusão.
- Pontuação geral e por área, incluindo empates na menor nota.
- Conteúdo dinâmico com 3 resultados gerais e 15 interpretações específicas.
- Persistência de leads, resultados agregados, UTMs e eventos no Supabase.
- Oferta do Kit por R$ 27 com clique de interesse mensurável.

## Limite do MVP

O checkout não simula pagamento. A camada de pagamento está preparada, mas precisa do provedor oficial, do webhook confiável e dos arquivos finais do Kit antes de liberar compra e acesso.

## Fonte de verdade

- `PRODUCT.md`: objetivo e limites.
- `BRAND.md`: voz e identidade.
- `FUNNEL.md`: jornada e estados.
- `ANALYTICS.md`: eventos e métricas.
- `DATABASE.md`: modelo e privacidade.
- `content/diagnostic/`: perguntas, interpretações, áreas e regras.

## Desenvolvimento

O projeto usa Next.js nativo (preset **Next.js** na Vercel) e Supabase. Copie
`.env.example` para `.env.local` e preencha as chaves do projeto. A chave
`SUPABASE_SECRET_KEY` é exclusiva do servidor e nunca deve receber o prefixo
`NEXT_PUBLIC_`.

Antes do primeiro uso, execute no Supabase a migração em
`supabase/migrations/20260811000000_initial_schema.sql`.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```
