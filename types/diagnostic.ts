export type DiagnosticArea =
  | "discipline"
  | "principles"
  | "relationships"
  | "health"
  | "work_money";

export type DiagnosticLevel = "attention" | "unstable" | "in_order";

export type GeneralLevel = "asking_attention" | "needs_adjustments" | "good_structure";

export type Question = {
  id: string;
  area: DiagnosticArea;
  text: string;
  order: number;
};

export type Answer = {
  questionId: string;
  value: number;
};

export type AreaScores = Record<DiagnosticArea, number>;

export type DiagnosticScore = {
  areas: AreaScores;
  total: number;
  primaryAreas: DiagnosticArea[];
  areaLevels: Record<DiagnosticArea, DiagnosticLevel>;
  generalLevel: GeneralLevel;
};

export type UtmData = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};
