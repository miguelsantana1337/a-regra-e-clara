import type { Question } from "@/types/diagnostic";

export const QUESTIONS: Question[] = [
  {
    id: "discipline-commitments",
    area: "discipline",
    order: 1,
    text: "Quando assumo um compromisso comigo, costumo cumpri-lo mesmo quando estou sem vontade.",
  },
  {
    id: "discipline-start",
    area: "discipline",
    order: 2,
    text: "Consigo começar o que precisa ser feito sem esperar o momento perfeito.",
  },
  {
    id: "discipline-consistency",
    area: "discipline",
    order: 3,
    text: "Mantenho constância nas tarefas importantes, inclusive quando o entusiasmo passa.",
  },
  {
    id: "discipline-priorities",
    area: "discipline",
    order: 4,
    text: "Defino minhas prioridades e protejo tempo para executá-las.",
  },
  {
    id: "discipline-responsibility",
    area: "discipline",
    order: 5,
    text: "Assumo minha parte nos resultados sem transferir para os outros aquilo que depende de mim.",
  },
  {
    id: "principles-reflection",
    area: "principles",
    order: 6,
    text: "Reservo tempo para refletir sobre a direção que estou dando à minha vida.",
  },
  {
    id: "principles-decisions",
    area: "principles",
    order: 7,
    text: "Levo meus princípios em conta antes de tomar decisões importantes.",
  },
  {
    id: "principles-wisdom",
    area: "principles",
    order: 8,
    text: "Busco sabedoria e boas referências quando não sei qual caminho seguir.",
  },
  {
    id: "principles-coherence",
    area: "principles",
    order: 9,
    text: "Procuro agir de modo coerente com aquilo em que digo acreditar.",
  },
  {
    id: "principles-review",
    area: "principles",
    order: 10,
    text: "Reviso minhas atitudes e corrijo a rota quando percebo que me afastei dos meus princípios.",
  },
  {
    id: "relationships-presence",
    area: "relationships",
    order: 11,
    text: "Quando estou com as pessoas importantes para mim, ofereço presença e atenção de verdade.",
  },
  {
    id: "relationships-dialogue",
    area: "relationships",
    order: 12,
    text: "Tenho conversas honestas sobre o que precisa ser dito, com respeito e clareza.",
  },
  {
    id: "relationships-care",
    area: "relationships",
    order: 13,
    text: "Demonstro cuidado pelas pessoas que amo por meio de atitudes concretas.",
  },
  {
    id: "relationships-conflict",
    area: "relationships",
    order: 14,
    text: "Busco resolver conflitos sem acumular silêncio, distância ou ressentimento.",
  },
  {
    id: "relationships-priority",
    area: "relationships",
    order: 15,
    text: "Protejo espaço na minha agenda para a família e para os relacionamentos que são prioridade.",
  },
  {
    id: "health-movement",
    area: "health",
    order: 16,
    text: "Mantenho alguma rotina de movimento ou atividade física compatível com minha realidade.",
  },
  {
    id: "health-sleep",
    area: "health",
    order: 17,
    text: "Protejo um horário de sono que me ajuda a recuperar energia.",
  },
  {
    id: "health-food",
    area: "health",
    order: 18,
    text: "Faço escolhas de alimentação com intenção na maior parte da semana.",
  },
  {
    id: "health-care",
    area: "health",
    order: 19,
    text: "Dou atenção aos cuidados básicos do meu corpo antes que eles virem urgência.",
  },
  {
    id: "health-return",
    area: "health",
    order: 20,
    text: "Quando saio da rotina, consigo retomar meus cuidados sem abandonar tudo.",
  },
  {
    id: "work-planning",
    area: "work_money",
    order: 21,
    text: "Planejo minhas responsabilidades profissionais antes que elas se tornem urgentes.",
  },
  {
    id: "work-delivery",
    area: "work_money",
    order: 22,
    text: "Cumpro prazos e combinados profissionais com consistência.",
  },
  {
    id: "money-visibility",
    area: "work_money",
    order: 23,
    text: "Acompanho o que entra e o que sai para tomar decisões financeiras conscientes.",
  },
  {
    id: "money-consumption",
    area: "work_money",
    order: 24,
    text: "Antes de comprar, avalio se a escolha faz sentido para minhas prioridades.",
  },
  {
    id: "work-focus",
    area: "work_money",
    order: 25,
    text: "Consigo avançar no trabalho mais importante sem deixar que toda distração mude meu foco.",
  },
];

export const ANSWER_OPTIONS = [
  { label: "Nunca", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Às vezes", value: 2 },
  { label: "Frequentemente", value: 3 },
  { label: "Quase sempre", value: 4 },
] as const;
