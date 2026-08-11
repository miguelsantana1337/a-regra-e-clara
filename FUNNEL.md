# Funil do MVP

1. Visitante chega a `/diagnostico` com os parâmetros UTM preservados.
2. Inicia sem informar dados pessoais.
3. Responde uma pergunta por tela; o progresso temporário fica no dispositivo.
4. Ao concluir a pergunta 25, vê “Seu diagnóstico está pronto”.
5. Informa nome, WhatsApp e e-mail. Consentimento de marketing é opcional e explícito.
6. O servidor valida as 25 respostas, calcula o resultado e salva somente os dados agregados.
7. A pessoa vê resultado geral, cinco pontuações, área ou áreas prioritárias, regra e três ações.
8. A oferta do Kit é exibida por R$ 27.
9. A integração de checkout só poderá liberar acesso depois de webhook de pagamento confirmado.

## Estados

`NOT_STARTED → IN_PROGRESS → COMPLETED → LEAD_CAPTURED → RESULT_VIEWED → CHECKOUT_STARTED → PURCHASED`

O MVP atual cobre até `RESULT_VIEWED` e registra o interesse em checkout. `CHECKOUT_STARTED` e `PURCHASED` ficam bloqueados até a conexão do provedor oficial.
