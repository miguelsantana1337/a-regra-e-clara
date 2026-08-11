import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { diagnostics, users } from "@/db/schema";
import { ensureDatabase } from "@/db/runtime";
import { getAreaLevel, getGeneralLevel } from "@/lib/diagnostic/scoring";
import type { DiagnosticArea } from "@/types/diagnostic";

function parsePrimaryAreas(value: string): DiagnosticArea[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as DiagnosticArea[]) : [];
  } catch {
    return [];
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!id || id.length > 80) {
      return Response.json({ error: "Resultado inválido." }, { status: 400 });
    }

    await ensureDatabase();
    const db = getDb();
    const [row] = await db
      .select({
        id: diagnostics.id,
        name: users.name,
        discipline: diagnostics.discipline,
        principles: diagnostics.principles,
        relationships: diagnostics.relationships,
        health: diagnostics.health,
        workMoney: diagnostics.workMoney,
        total: diagnostics.total,
        primaryAreas: diagnostics.primaryAreas,
        createdAt: diagnostics.createdAt,
      })
      .from(diagnostics)
      .innerJoin(users, eq(users.id, diagnostics.userId))
      .where(eq(diagnostics.id, id))
      .limit(1);

    if (!row) {
      return Response.json({ error: "Resultado não encontrado." }, { status: 404 });
    }

    const areas = {
      discipline: row.discipline,
      principles: row.principles,
      relationships: row.relationships,
      health: row.health,
      work_money: row.workMoney,
    };

    return Response.json({
      id: row.id,
      name: row.name,
      areas,
      total: row.total,
      primaryAreas: parsePrimaryAreas(row.primaryAreas),
      areaLevels: {
        discipline: getAreaLevel(row.discipline),
        principles: getAreaLevel(row.principles),
        relationships: getAreaLevel(row.relationships),
        health: getAreaLevel(row.health),
        work_money: getAreaLevel(row.workMoney),
      },
      generalLevel: getGeneralLevel(row.total),
      createdAt: row.createdAt,
    });
  } catch {
    return Response.json(
      { error: "Não foi possível carregar este resultado agora." },
      { status: 500 },
    );
  }
}
