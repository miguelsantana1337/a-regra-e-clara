import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/lib/analytics/events";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type EventPayload = {
  name?: AnalyticsEventName;
  sessionId?: string;
  diagnosticId?: string;
  properties?: Record<string, unknown>;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EventPayload;
    const name = payload.name;
    const sessionId = payload.sessionId?.trim().slice(0, 128) ?? "";

    if (!name || !ANALYTICS_EVENTS.includes(name) || !sessionId) {
      return Response.json({ error: "Evento inválido." }, { status: 400 });
    }

    const properties = payload.properties ?? {};
    if (JSON.stringify(properties).length > 4000) {
      return Response.json({ error: "Propriedades excedem o limite." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const diagnosticId = UUID_PATTERN.test(payload.diagnosticId ?? "")
      ? payload.diagnosticId
      : null;
    const { error } = await supabase.from("events").insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      diagnostic_id: diagnosticId,
      name,
      properties,
    });
    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Falha ao registrar evento", error);
    return Response.json({ error: "Não foi possível registrar o evento." }, { status: 500 });
  }
}
