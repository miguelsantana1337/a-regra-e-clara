import type { Metadata } from "next";
import { DiagnosticQuiz } from "@/components/diagnostic/DiagnosticQuiz";

export const metadata: Metadata = {
  title: "Seu diagnóstico",
  description: "Responda 10 perguntas e descubra qual área precisa de atenção primeiro.",
};

export default function DiagnosticQuizPage() {
  return <DiagnosticQuiz />;
}
