export const ANALYTICS_EVENTS = [
  "diagnostic_landing_view",
  "diagnostic_started",
  "diagnostic_question_answered",
  "diagnostic_completed",
  "lead_captured",
  "result_viewed",
  "offer_viewed",
  "checkout_clicked",
  "checkout_started",
  "purchase_completed",
  "member_area_viewed",
  "asset_downloaded",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];
