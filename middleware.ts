import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

const protectedPaths = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const isProtectedAgendamentoApi =
    pathname.startsWith("/api/agendamentos") &&
    !["GET", "POST"].includes(req.method);

  const isProtectedServicoApi =
    pathname.startsWith("/api/servicos") && req.method !== "GET";

  if (!isProtectedPath && !isProtectedAgendamentoApi && !isProtectedServicoApi) {
    return NextResponse.next();
  }

  const session = await getSessionFromRequest(req);
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/agendamentos/:path*", "/api/servicos/:path*"],
};
