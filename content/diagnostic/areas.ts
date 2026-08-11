import type { DiagnosticArea } from "@/types/diagnostic";

export type AreaDefinition = {
  id: DiagnosticArea;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  number: string;
};

export const AREA_ORDER: DiagnosticArea[] = [
  "discipline",
  "principles",
  "relationships",
  "health",
  "work_money",
];

export const AREAS: Record<DiagnosticArea, AreaDefinition> = {
  discipline: {
    id: "discipline",
    name: "Disciplina & Responsabilidade",
    shortName: "Disciplina",
    eyebrow: "Palavra, constância e execução",
    description:
      "Como você transforma intenção em compromisso e assume responsabilidade pelo que depende de você.",
    number: "01",
  },
  principles: {
    id: "principles",
    name: "Fé & Princípios",
    shortName: "Fé & Princípios",
    eyebrow: "Coerência, reflexão e sabedoria",
    description:
      "Quanto seus princípios aparecem nas suas decisões e na maneira como você vive.",
    number: "02",
  },
  relationships: {
    id: "relationships",
    name: "Relacionamentos & Família",
    shortName: "Relacionamentos",
    eyebrow: "Presença, diálogo e prioridade",
    description:
      "Como você protege, cuida e participa das relações que sustentam sua vida.",
    number: "03",
  },
  health: {
    id: "health",
    name: "Corpo & Saúde",
    shortName: "Corpo & Saúde",
    eyebrow: "Rotina, energia e cuidados básicos",
    description:
      "Como o cuidado com seu corpo aparece na sua rotina, sem qualquer avaliação médica.",
    number: "04",
  },
  work_money: {
    id: "work_money",
    name: "Trabalho & Dinheiro",
    shortName: "Trabalho & Dinheiro",
    eyebrow: "Planejamento, entrega e consciência",
    description:
      "Como você organiza responsabilidades profissionais e decisões financeiras do dia a dia.",
    number: "05",
  },
};
