# Analytics V2

## Eventos ativos

- `landing_viewed`: landing carregada; UTMs e caminho são propriedades.
- `quiz_cta_clicked`: clique no CTA; inclui a posição do CTA.
- `quiz_started`: quiz realmente aberto.
- `quiz_question_answered`: uma pergunta respondida; não inclui o valor da resposta.
- `quiz_completed`: décima pergunta respondida.
- `lead_form_viewed`: formulário pós-quiz exibido.
- `quiz_abandoned`: saída depois de pelo menos uma resposta e antes da conclusão.
- `lead_submitted`: dados validados e resultado agregado persistido.
- `result_viewed`: resultado carregado.
- `offer_viewed`: ao menos 35% da oferta entrou na tela.
- `checkout_clicked`: clique no CTA da oferta.
- `purchase_completed`: pagamento confirmado pelo provedor, quando integrado.

Os nomes V1 (`diagnostic_*` e `lead_captured`) continuam aceitos somente para preservar o histórico. A aplicação V2 não os emite.

## Privacidade

Eventos de pergunta guardam identificador, área e posição, mas nunca o valor respondido. O painel interno usa somente sessões e propriedades agregadas; nome, e-mail e WhatsApp não aparecem nele.

## UTMs

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term` são preservados no fluxo e salvos junto do diagnóstico agregado.

## Painel

`/admin/analytics` exibe os últimos 30 dias e é protegido por HTTP Basic com `ANALYTICS_ADMIN_USER` e `ANALYTICS_ADMIN_PASSWORD`. O painel consolida eventos V1 e V2 por sessão única.

## Métrica norteadora

Receita por diagnóstico concluído = receita confirmada ÷ diagnósticos concluídos.

Enquanto o pagamento não estiver ativo, acompanhar:

- landing → quiz iniciado;
- quiz iniciado → quiz concluído;
- quiz concluído → lead enviado;
- lead enviado → resultado visto;
- resultado visto → oferta vista;
- oferta vista → clique no checkout;
- última pergunta antes do abandono;
- sessões por origem UTM.
