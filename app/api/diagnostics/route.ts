import { scoreDiagnostic } from "@/lib/diagnostic/scoring";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Answer, UtmData } from "@/types/diagnostic";

type CreateDiagnosticPayload = {
  sessionId?: string;
  lead?: {
    name?: string;
    email?: string;
    whatsapp?: string;
    consent?: boolean;
  };
  answers?: Answer[];
  utm?: UtmData;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function optionalText(value: unknown, maxLength = 180): string | null {
  const cleaned = cleanText(value, maxLength);
  return cleaned || null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateDiagnosticPayload;
    const name = cleanText(payload.lead?.name, 120);
    const email = cleanText(payload.lead?.email, 180).toLowerCase();
    const whatsapp = cleanText(payload.lead?.whatsapp, 32);
    const sessionId = cleanText(payload.sessionId, 128);

    if (name.length < 2) {
      return Response.json({ error: "Informe seu nome." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }
    if (whatsapp.replace(/\D/g, "").length < 10) {
      return Response.json({ error: "Informe um WhatsApp válido com DDD." }, { status: 400 });
    }
    if (!sessionId) {
      return Response.json({ error: "Sessão do diagnóstico inválida." }, { status: 400 });
    }

    const score = scoreDiagnostic(payload.answers ?? []);
    const supabase = getSupabaseAdmin();
    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    const userId = existingUser?.id ?? crypto.randomUUID();

    if (existingUser) {
      const { error } = await supabase
        .from("users")
        .update({
          name,
          whatsapp,
          marketing_consent: Boolean(payload.lead?.consent),
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("users").insert({
        id: userId,
        name,
        email,
        whatsapp,
        marketing_consent: Boolean(payload.lead?.consent),
      });
      if (error) throw error;
    }

    const diagnosticId = crypto.randomUUID();
    const { error: diagnosticError } = await supabase.from("diagnostics").insert({
      id: diagnosticId,
      user_id: userId,
      discipline: score.areas.discipline,
      principles: score.areas.principles,
      relationships: score.areas.relationships,
      health: score.areas.health,
      work_money: score.areas.work_money,
      total: score.total,
      primary_areas: score.primaryAreas,
      general_level: score.generalLevel,
      utm_source: optionalText(payload.utm?.source),
      utm_medium: optionalText(payload.utm?.medium),
      utm_campaign: optionalText(payload.utm?.campaign),
      utm_content: optionalText(payload.utm?.content),
      utm_term: optionalText(payload.utm?.term),
    });
    if (diagnosticError) throw diagnosticError;

    const { error: eventsError } = await supabase.from("events").insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      user_id: userId,
      diagnostic_id: diagnosticId,
      name: "lead_submitted",
      properties: {
        total_score: score.total,
        primary_areas: score.primaryAreas,
        marketing_consent: Boolean(payload.lead?.consent),
        source: payload.utm?.source ?? null,
        campaign: payload.utm?.campaign ?? null,
      },
    });
    if (eventsError) throw eventsError;

    return Response.json(
      {
        id: diagnosticId,
        total: score.total,
        primaryAreas: score.primaryAreas,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Falha ao salvar diagnóstico", error);
    const message = error instanceof Error ? error.message : "";
    const isAnswerError =
      message.startsWith("Resposta") ||
      message.startsWith("Cada resposta") ||
      message.startsWith("Uma pergunta") ||
      message.startsWith("Responda as ");
    return Response.json(
      {
        error: isAnswerError
          ? message
          : "Não foi possível salvar seu diagnóstico agora. Tente novamente.",
      },
      { status: isAnswerError ? 400 : 500 },
    );
  }
}
