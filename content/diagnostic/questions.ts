import type { Question } from "@/types/diagnostic";

export const QUESTIONS: Question[] = [
  {
    id: "discipline-commitments",
    area: "discipline",
    order: 1,
    text: "Quando assumo um compromisso comigo, costumo cumpri-lo mesmo quando estou sem vontade.",
  },
  {
    id: "discipline-priorities",
    area: "discipline",
    order: 2,
    text: "Defino minhas prioridades e protejo tempo para executá-las.",
  },
  {
    id: "principles-decisions",
    area: "principles",
    order: 3,
    text: "Levo meus princípios em conta antes de tomar decisões importantes.",
  },
  {
    id: "principles-coherence",
    area: "principles",
    order: 4,
    text: "Procuro agir de modo coerente com aquilo em que digo acreditar.",
  },
  {
    id: "relationships-presence",
    area: "relationships",
    order: 5,
    text: "Quando estou com as pessoas importantes para mim, ofereço presença e atenção de verdade.",
  },
  {
    id: "relationships-dialogue",
    area: "relationships",
    order: 6,
    text: "Tenho conversas honestas sobre o que precisa ser dito, com respeito e clareza.",
  },
  {
    id: "health-movement",
    area: "health",
    order: 7,
    text: "Mantenho alguma rotina de movimento ou atividade física compatível com minha realidade.",
  },
  {
    id: "health-sleep",
    area: "health",
    order: 8,
    text: "Protejo um horário de sono que me ajuda a recuperar energia.",
  },
  {
    id: "work-planning",
    area: "work_money",
    order: 9,
    text: "Planejo minhas responsabilidades profissionais antes que elas se tornem urgentes.",
  },
  {
    id: "money-visibility",
    area: "work_money",
    order: 10,
    text: "Acompanho o que entra e o que sai para tomar decisões financeiras conscientes.",
  },
];

export const ANSWER_OPTIONS = [
  { label: "Nunca", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Às vezes", value: 2 },
  { label: "Frequentemente", value: 3 },
  { label: "Quase sempre", value: 4 },
] as const;
