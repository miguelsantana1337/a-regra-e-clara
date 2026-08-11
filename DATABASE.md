# Dados do MVP

O banco é PostgreSQL no Supabase. A estrutura versionada está em
`supabase/migrations/20260811000000_initial_schema.sql`. Todas as tabelas têm
RLS habilitado e não possuem políticas públicas; a aplicação grava e lê apenas
por rotas de servidor autenticadas com `SUPABASE_SECRET_KEY`.

## `users`

Nome, e-mail único, WhatsApp, consentimento de marketing e datas de criação/atualização.

## `diagnostics`

Usuário, cinco pontuações agregadas, total, áreas prioritárias, nível geral, UTMs e data. Respostas individuais não são persistidas.

## `products`

Slug, nome, preço em centavos e status ativo.

## `purchases`

Usuário, produto, provedor, referência externa, valor, status e data de pagamento.

## `entitlements`

Usuário, produto e acesso ativo. Só pode ser criado depois de confirmação confiável do pagamento.

## `events`

Sessão, usuário opcional, diagnóstico opcional, nome do evento, propriedades em JSON e data.

## Privacidade

- Guardar somente o necessário para entregar resultado, mensurar o funil e operar a compra.
- Não persistir as 25 respostas individuais neste MVP.
- Consentimento de marketing não pode ser presumido.
- Definir política de retenção e canal de exclusão antes do lançamento comercial.
