import { getAreaLevel, getGeneralLevel } from "@/lib/diagnostic/scoring";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { DiagnosticArea } from "@/types/diagnostic";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DIAGNOSTIC_AREAS = new Set<DiagnosticArea>([
  "discipline",
  "principles",
  "relationships",
  "health",
  "work_money",
]);

function parsePrimaryAreas(value: unknown): DiagnosticArea[] {
  return Array.isArray(value)
    ? value.filter(
        (area): area is DiagnosticArea =>
          typeof area === "string" && DIAGNOSTIC_AREAS.has(area as DiagnosticArea),
      )
    : [];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!UUID_PATTERN.test(id)) {
      return Response.json({ error: "Resultado inválido." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: row, error: diagnosticError } = await supabase
      .from("diagnostics")
      .select(
        "id,user_id,discipline,principles,relationships,health,work_money,total,primary_areas,created_at",
      )
      .eq("id", id)
      .maybeSingle();

    if (diagnosticError) throw diagnosticError;

    if (!row) {
      return Response.json({ error: "Resultado não encontrado." }, { status: 404 });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("name")
      .eq("id", row.user_id)
      .single();

    if (userError) throw userError;

    const areas = {
      discipline: row.discipline,
      principles: row.principles,
      relationships: row.relationships,
      health: row.health,
      work_money: row.work_money,
    };

    return Response.json({
      id: row.id,
      name: user.name,
      areas,
      total: row.total,
      primaryAreas: parsePrimaryAreas(row.primary_areas),
      areaLevels: {
        discipline: getAreaLevel(row.discipline),
        principles: getAreaLevel(row.principles),
        relationships: getAreaLevel(row.relationships),
        health: getAreaLevel(row.health),
        work_money: getAreaLevel(row.work_money),
      },
      generalLevel: getGeneralLevel(row.total),
      createdAt: row.created_at,
    });
  } catch {
    return Response.json(
      { error: "Não foi possível carregar este resultado agora." },
      { status: 500 },
    );
  }
}
