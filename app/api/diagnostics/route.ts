import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { diagnostics, events, users } from "@/db/schema";
import { ensureDatabase } from "@/db/runtime";
import { scoreDiagnostic } from "@/lib/diagnostic/scoring";
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
    await ensureDatabase();
    const db = getDb();

    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const userId = existingUser?.id ?? crypto.randomUUID();

    if (existingUser) {
      await db
        .update(users)
        .set({
          name,
          whatsapp,
          marketingConsent: Boolean(payload.lead?.consent),
          updatedAt: new Date().toISOString(),
        })
        .where(eq(users.id, userId));
    } else {
      await db.insert(users).values({
        id: userId,
        name,
        email,
        whatsapp,
        marketingConsent: Boolean(payload.lead?.consent),
      });
    }

    const diagnosticId = crypto.randomUUID();
    await db.insert(diagnostics).values({
      id: diagnosticId,
      userId,
      discipline: score.areas.discipline,
      principles: score.areas.principles,
      relationships: score.areas.relationships,
      health: score.areas.health,
      workMoney: score.areas.work_money,
      total: score.total,
      primaryAreas: JSON.stringify(score.primaryAreas),
      generalLevel: score.generalLevel,
      utmSource: optionalText(payload.utm?.source),
      utmMedium: optionalText(payload.utm?.medium),
      utmCampaign: optionalText(payload.utm?.campaign),
      utmContent: optionalText(payload.utm?.content),
      utmTerm: optionalText(payload.utm?.term),
    });

    await db.insert(events).values([
      {
        id: crypto.randomUUID(),
        sessionId,
        userId,
        diagnosticId,
        name: "diagnostic_completed",
        properties: JSON.stringify({
          total_score: score.total,
          primary_area: score.primaryAreas,
        }),
      },
      {
        id: crypto.randomUUID(),
        sessionId,
        userId,
        diagnosticId,
        name: "lead_captured",
        properties: JSON.stringify({
          marketing_consent: Boolean(payload.lead?.consent),
          source: payload.utm?.source ?? null,
          campaign: payload.utm?.campaign ?? null,
        }),
      },
    ]);

    return Response.json(
      {
        id: diagnosticId,
        total: score.total,
        primaryAreas: score.primaryAreas,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Não foi possível salvar seu diagnóstico.";
    return Response.json({ error: message }, { status: 400 });
  }
}
