"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { captureUtm, getSessionId, trackEvent } from "@/lib/analytics/client";

export function LandingStart({
  location = "landing",
  className = "",
}: {
  location?: string;
  className?: string;
}) {
  const router = useRouter();
  const viewTrackedRef = useRef(false);

  useEffect(() => {
    if (location !== "hero" || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    const utm = captureUtm();
    getSessionId();
    trackEvent("landing_viewed", { ...utm, page_path: "/diagnostico" });
  }, [location]);

  function startDiagnostic() {
    const query = window.location.search;
    trackEvent("quiz_cta_clicked", {
      ...captureUtm(),
      cta_location: location,
    });
    router.push(`/diagnostico/quiz${query}`);
  }

  return (
    <button
      className={`primary-cta${className ? ` ${className}` : ""}`}
      type="button"
      onClick={startDiagnostic}
    >
      <span>DESCOBRIR MINHA PRIORIDADE</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
