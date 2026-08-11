import { AREA_ORDER } from "@/content/diagnostic/areas";
import { QUESTIONS } from "@/content/diagnostic/questions";
import type {
  Answer,
  AreaScores,
  DiagnosticArea,
  DiagnosticLevel,
  DiagnosticScore,
  GeneralLevel,
} from "@/types/diagnostic";

export function getAreaLevel(score: number): DiagnosticLevel {
  if (score <= 7) return "attention";
  if (score <= 14) return "unstable";
  return "in_order";
}

export function getGeneralLevel(score: number): GeneralLevel {
  if (score <= 39) return "asking_attention";
  if (score <= 69) return "needs_adjustments";
  return "good_structure";
}

export function scoreDiagnostic(answers: Answer[]): DiagnosticScore {
  const expectedIds = new Set(QUESTIONS.map((question) => question.id));
  const answerMap = new Map<string, number>();

  for (const answer of answers) {
    if (!expectedIds.has(answer.questionId)) {
      throw new Error("Resposta associada a uma pergunta desconhecida.");
    }
    if (!Number.isInteger(answer.value) || answer.value < 0 || answer.value > 4) {
      throw new Error("Cada resposta precisa ter um valor inteiro entre 0 e 4.");
    }
    if (answerMap.has(answer.questionId)) {
      throw new Error("Uma pergunta foi respondida mais de uma vez.");
    }
    answerMap.set(answer.questionId, answer.value);
  }

  if (answerMap.size !== QUESTIONS.length) {
    throw new Error("Responda as 25 perguntas para concluir o diagnóstico.");
  }

  const areas = Object.fromEntries(
    AREA_ORDER.map((area) => [area, 0]),
  ) as AreaScores;

  for (const question of QUESTIONS) {
    areas[question.area] += answerMap.get(question.id) ?? 0;
  }

  const total = AREA_ORDER.reduce((sum, area) => sum + areas[area], 0);
  const lowestScore = Math.min(...AREA_ORDER.map((area) => areas[area]));
  const primaryAreas = AREA_ORDER.filter((area) => areas[area] === lowestScore);
  const areaLevels = Object.fromEntries(
    AREA_ORDER.map((area) => [area, getAreaLevel(areas[area])]),
  ) as Record<DiagnosticArea, DiagnosticLevel>;

  return {
    areas,
    total,
    primaryAreas,
    areaLevels,
    generalLevel: getGeneralLevel(total),
  };
}
