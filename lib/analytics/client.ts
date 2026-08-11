import type { AnalyticsEventName } from "@/lib/analytics/events";
import type { UtmData } from "@/types/diagnostic";

const SESSION_KEY = "arc_diagnostic_session";

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, created);
  return created;
}

export function captureUtm(): UtmData {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
  };
}

export function trackEvent(
  name: AnalyticsEventName,
  properties: Record<string, unknown> = {},
  diagnosticId?: string,
): void {
  if (typeof window === "undefined") return;
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      sessionId: getSessionId(),
      diagnosticId,
      properties,
    }),
    keepalive: true,
  }).catch(() => undefined);
}
