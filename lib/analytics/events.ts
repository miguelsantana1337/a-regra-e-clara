export const ANALYTICS_EVENTS = [
  "landing_viewed",
  "quiz_cta_clicked",
  "quiz_started",
  "quiz_question_answered",
  "quiz_completed",
  "lead_form_viewed",
  "quiz_abandoned",
  "lead_submitted",
  "result_viewed",
  "offer_viewed",
  "checkout_clicked",
  "purchase_completed",
  // Legado V1: mantido para preservar a leitura dos eventos já gravados.
  "diagnostic_landing_view",
  "diagnostic_started",
  "diagnostic_question_answered",
  "diagnostic_completed",
  "lead_captured",
  "checkout_started",
  "member_area_viewed",
  "asset_downloaded",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];
