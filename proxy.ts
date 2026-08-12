import { Buffer } from "node:buffer";
import type { NextRequest } from "next/server";

function unauthorized(message = "Acesso restrito.") {
  return new Response(message, {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Analytics A Regra e Clara", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  const user = process.env.ANALYTICS_ADMIN_USER;
  const password = process.env.ANALYTICS_ADMIN_PASSWORD;

  if (!user || !password) {
    return new Response("Painel de analytics ainda não configurado.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const expected = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
  if (request.headers.get("authorization") !== expected) {
    return unauthorized();
  }
}

export const config = {
  matcher: "/admin/analytics/:path*",
};
