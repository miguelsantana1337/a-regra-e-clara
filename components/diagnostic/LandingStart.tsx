"use client";

import { useEffect } from "react";
import { captureUtm, getSessionId, trackEvent } from "@/lib/analytics/client";

export function LandingStart() {
  useEffect(() => {
    const utm = captureUtm();
    getSessionId();
    trackEvent("diagnostic_landing_view", utm);
  }, []);

  function startDiagnostic() {
    const query = window.location.search;
    trackEvent("diagnostic_started", captureUtm());
    window.location.assign(`/diagnostico/quiz${query}`);
  }

  return (
    <button className="primary-cta" type="button" onClick={startDiagnostic}>
      <span>COMEÇAR MEU DIAGNÓSTICO</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
