# Funil V2

1. Visitante chega a `/diagnostico` com os parâmetros UTM preservados.
2. Inicia sem informar dados pessoais.
3. Responde uma pergunta por tela; o progresso temporário fica no dispositivo.
4. Ao concluir a pergunta 10, vê “Seu resultado está pronto”.
5. Informa nome, WhatsApp e e-mail. Consentimento de marketing é opcional e explícito.
6. O servidor valida as 10 respostas, normaliza cada área para 0–20, calcula o resultado e salva somente os dados agregados.
7. A pessoa vê resultado geral, cinco pontuações, área ou áreas prioritárias, regra e três ações.
8. A continuação opcional apresenta o Método A Regra é Clara em três movimentos por R$ 27.
9. A integração de checkout só poderá liberar acesso depois de webhook de pagamento confirmado.

## Estados

`LANDING_VIEWED → QUIZ_STARTED → QUIZ_COMPLETED → LEAD_SUBMITTED → RESULT_VIEWED → OFFER_VIEWED → CHECKOUT_STARTED → PURCHASED`

O MVP atual cobre até `OFFER_VIEWED` e registra o clique de interesse no checkout. `CHECKOUT_STARTED` e `PURCHASED` ficam bloqueados até a conexão do provedor oficial.
