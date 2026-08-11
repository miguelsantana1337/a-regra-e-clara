import type {
  DiagnosticArea,
  DiagnosticLevel,
  GeneralLevel,
} from "@/types/diagnostic";

export type ResultCopy = {
  label: string;
  title: string;
  interpretation: string;
  actions: [string, string, string];
};

export const GENERAL_RESULTS: Record<
  GeneralLevel,
  Omit<ResultCopy, "actions">
> = {
  asking_attention: {
    label: "Vida pedindo atenção",
    title: "Você não precisa colocar tudo em ordem hoje. Precisa escolher por onde começar.",
    interpretation:
      "Sua pontuação mostra que várias áreas podem estar disputando a mesma energia. Este resultado não define quem você é: ele revela onde pequenas decisões repetidas podem devolver direção à sua rotina.",
  },
  needs_adjustments: {
    label: "Precisa de ajustes",
    title: "Existe uma base. O que falta é transformar intenção em constância.",
    interpretation:
      "Você já sustenta partes importantes da vida, mas alguns pontos ainda dependem demais do humor, da urgência ou do tempo que sobra. Ajustar uma área por vez pode produzir um efeito maior do que tentar reformar tudo de uma vez.",
  },
  good_structure: {
    label: "Boa estrutura",
    title: "Você construiu uma base consistente. Agora proteja o que funciona.",
    interpretation:
      "Seu resultado indica boas práticas em diferentes áreas. Isso não significa que tudo esteja resolvido, mas que você tem estrutura para corrigir pontos específicos sem perder a direção do conjunto.",
  },
};

export const AREA_RESULTS: Record<
  DiagnosticArea,
  Record<DiagnosticLevel, ResultCopy>
> = {
  discipline: {
    attention: {
      label: "Atenção",
      title: "Sua palavra para você mesmo precisa voltar a ter peso.",
      interpretation:
        "A distância entre decidir e fazer pode estar consumindo sua confiança. O caminho não começa com uma rotina perfeita, mas com um compromisso pequeno que seja cumprido até o fim.",
      actions: [
        "Escolha uma pendência curta e conclua ainda hoje.",
        "Defina uma única prioridade para amanhã e marque um horário para ela.",
        "Durante sete dias, prometa menos e registre tudo o que cumprir.",
      ],
    },
    unstable: {
      label: "Instável",
      title: "Você consegue executar, mas ainda depende demais do momento.",
      interpretation:
        "Há disciplina presente, porém ela oscila quando a rotina aperta ou a motivação baixa. Sua próxima evolução vem de reduzir decisões e proteger poucos compromissos não negociáveis.",
      actions: [
        "Defina três compromissos não negociáveis para esta semana.",
        "Prepare na noite anterior o primeiro passo da tarefa mais importante.",
        "Revise na sexta-feira o que cumpriu e o que precisa ser ajustado.",
      ],
    },
    in_order: {
      label: "Em ordem",
      title: "Sua constância já é uma força. Use-a com direção.",
      interpretation:
        "Você tende a honrar compromissos e executar com regularidade. O cuidado agora é não transformar disciplina em excesso de tarefas: consistência também exige escolher o que não fazer.",
      actions: [
        "Elimine um compromisso que não serve mais às suas prioridades.",
        "Use sua disciplina para fortalecer a área com menor pontuação.",
        "Mantenha uma revisão semanal curta para proteger sua direção.",
      ],
    },
  },
  principles: {
    attention: {
      label: "Atenção",
      title: "Antes de acelerar, recupere a direção.",
      interpretation:
        "Suas decisões podem estar sendo tomadas mais pela pressão do momento do que pelos princípios que você deseja viver. Você não precisa provar sua fé ou suas convicções; precisa criar espaço para ouvi-las novamente.",
      actions: [
        "Reserve dez minutos de silêncio e reflexão nos próximos três dias.",
        "Escreva três princípios que você não quer negociar.",
        "Leve uma decisão pendente a uma pessoa sábia e confiável.",
      ],
    },
    unstable: {
      label: "Instável",
      title: "Você conhece seus princípios. O desafio é consultá-los antes da decisão.",
      interpretation:
        "Existe referência interna, mas ela nem sempre chega a tempo de orientar a prática. Pequenas pausas conscientes podem diminuir a distância entre aquilo em que você acredita e a forma como age.",
      actions: [
        "Antes de uma decisão importante, pergunte qual princípio ela fortalece.",
        "Escolha um momento fixo da semana para revisar sua direção.",
        "Corrija uma atitude recente que não representou bem seus valores.",
      ],
    },
    in_order: {
      label: "Em ordem",
      title: "Seus princípios aparecem na maneira como você vive.",
      interpretation:
        "Você demonstra coerência entre convicção e prática. Continue protegendo momentos de reflexão e cuide para que certezas não eliminem a disposição de ouvir, aprender e corrigir a rota.",
      actions: [
        "Registre uma decisão recente guiada por seus princípios.",
        "Compartilhe uma referência útil com alguém que confia em você.",
        "Reavalie se alguma convicção precisa ser aprofundada, não apenas repetida.",
      ],
    },
  },
  relationships: {
    attention: {
      label: "Atenção",
      title: "As relações importantes não podem receber apenas o tempo que sobra.",
      interpretation:
        "A rotina pode ter empurrado presença, diálogo e cuidado para depois. Reaproximar não exige um grande gesto: exige interromper a distância com uma atitude clara e possível.",
      actions: [
        "Procure hoje uma pessoa importante com atenção inteira, sem fazer outra coisa ao mesmo tempo.",
        "Marque a conversa que você vem adiando e entre nela para construir, não para vencer.",
        "Reserve um bloco da agenda desta semana para família ou relacionamento.",
      ],
    },
    unstable: {
      label: "Instável",
      title: "Existe vínculo, mas a presença pode estar sendo irregular.",
      interpretation:
        "Você cuida das suas relações, porém urgências e distrações ainda podem ocupar o espaço que deveria ser protegido. A estabilidade vem menos de intensidade e mais de presença repetida.",
      actions: [
        "Crie um encontro recorrente sem telas com quem é prioridade.",
        "Pergunte a alguém próximo do que ele mais precisa de você nesta fase.",
        "Resolva uma pequena tensão antes que ela cresça em silêncio.",
      ],
    },
    in_order: {
      label: "Em ordem",
      title: "Você tem construído relações com presença e intenção.",
      interpretation:
        "Sua pontuação indica cuidado consistente com os vínculos importantes. Continue protegendo esse espaço e perceba quem, ao seu redor, pode estar precisando de uma presença que ainda não pediu.",
      actions: [
        "Reconheça em palavras uma atitude de alguém importante para você.",
        "Proteja na agenda o próximo encontro antes que a semana o ocupe.",
        "Use sua estabilidade para acolher uma relação que atravessa uma fase difícil.",
      ],
    },
  },
  health: {
    attention: {
      label: "Atenção",
      title: "Seu corpo não pode continuar recebendo apenas o que sobra.",
      interpretation:
        "Os cuidados básicos podem estar perdendo espaço para outras responsabilidades. Este resultado não é uma avaliação médica: é um convite para devolver ao corpo uma rotina mínima de movimento, descanso e atenção.",
      actions: [
        "Defina três horários possíveis de movimento nesta semana.",
        "Escolha um horário mínimo para encerrar o dia e preparar o sono.",
        "Mude um hábito por vez e procure orientação profissional quando necessário.",
      ],
    },
    unstable: {
      label: "Instável",
      title: "Você se cuida, mas sua rotina ainda perde força quando a semana aperta.",
      interpretation:
        "Há bons movimentos em curso, porém eles podem depender de condições ideais. Uma rotina menor, repetível e adaptada à sua realidade vale mais do que ciclos intensos seguidos de abandono.",
      actions: [
        "Defina sua versão mínima de atividade física para dias cheios.",
        "Prepare com antecedência uma escolha simples de alimentação para a rotina.",
        "Crie um ritual curto para voltar ao plano depois de um dia fora dele.",
      ],
    },
    in_order: {
      label: "Em ordem",
      title: "Cuidar do corpo já faz parte da sua estrutura.",
      interpretation:
        "Você demonstra consistência nos cuidados básicos. O próximo passo é preservar essa base sem rigidez, respeitando limites e buscando avaliação profissional sempre que o corpo sinalizar algo fora do comum.",
      actions: [
        "Mantenha os horários que mais protegem sua energia.",
        "Observe se sua rotina também inclui recuperação, não apenas esforço.",
        "Faça uma revisão dos cuidados preventivos apropriados para você.",
      ],
    },
  },
  work_money: {
    attention: {
      label: "Atenção",
      title: "O que falta organizar pode estar ocupando mais espaço do que o próprio trabalho.",
      interpretation:
        "Prazos, prioridades e decisões financeiras podem estar chegando como urgência. O primeiro avanço não exige uma planilha perfeita: exige tornar visível o que hoje está sendo evitado.",
      actions: [
        "Liste os três compromissos profissionais mais urgentes e defina o próximo passo de cada um.",
        "Anote por sete dias tudo o que entra e tudo o que sai.",
        "Adie por 24 horas uma compra que não estava planejada.",
      ],
    },
    unstable: {
      label: "Instável",
      title: "Você produz e se organiza, mas ainda reage mais do que planeja.",
      interpretation:
        "Existe capacidade de entrega e alguma consciência financeira, porém imprevistos e distrações ainda comandam parte da rotina. Um sistema simples de revisão pode devolver previsibilidade.",
      actions: [
        "Planeje a semana de trabalho antes de abrir mensagens na segunda-feira.",
        "Faça uma revisão financeira de quinze minutos no mesmo dia toda semana.",
        "Defina um critério claro para compras não essenciais.",
      ],
    },
    in_order: {
      label: "Em ordem",
      title: "Você tem clareza para trabalhar e decidir com consciência.",
      interpretation:
        "Sua pontuação indica planejamento, entrega e boa visibilidade das decisões financeiras cotidianas. Proteja esse sistema e use a clareza conquistada para priorizar o que gera valor de longo prazo.",
      actions: [
        "Revise se suas prioridades profissionais ainda refletem seus objetivos.",
        "Automatize ou simplifique uma rotina financeira repetitiva.",
        "Defina o próximo investimento de tempo ou dinheiro que exige preparação.",
      ],
    },
  },
};
