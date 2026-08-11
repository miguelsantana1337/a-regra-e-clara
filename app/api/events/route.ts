import { getDb } from "@/db";
import { events } from "@/db/schema";
import { ensureDatabase } from "@/db/runtime";
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/lib/analytics/events";

type EventPayload = {
  name?: AnalyticsEventName;
  sessionId?: string;
  diagnosticId?: string;
  properties?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EventPayload;
    const name = payload.name;
    const sessionId = payload.sessionId?.trim().slice(0, 128) ?? "";

    if (!name || !ANALYTICS_EVENTS.includes(name) || !sessionId) {
      return Response.json({ error: "Evento inválido." }, { status: 400 });
    }

    const properties = JSON.stringify(payload.properties ?? {});
    if (properties.length > 4000) {
      return Response.json({ error: "Propriedades excedem o limite." }, { status: 400 });
    }

    await ensureDatabase();
    const db = getDb();
    await db.insert(events).values({
      id: crypto.randomUUID(),
      sessionId,
      diagnosticId: payload.diagnosticId?.slice(0, 80) ?? null,
      name,
      properties,
    });

    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Não foi possível registrar o evento." }, { status: 400 });
  }
}
