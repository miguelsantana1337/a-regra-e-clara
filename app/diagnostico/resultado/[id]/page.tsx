import type { Metadata } from "next";
import { DiagnosticResult } from "@/components/diagnostic/DiagnosticResult";

export const metadata: Metadata = {
  title: "Seu resultado",
  description: "Veja sua pontuação, sua área prioritária e por onde começar.",
  robots: { index: false, follow: false },
};

export default async function DiagnosticResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DiagnosticResult id={id} />;
}
