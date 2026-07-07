import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = body?.username?.toString().trim();
  const password = body?.password?.toString().trim();

  const expectedUsername = process.env.ADMIN_USERNAME?.trim() || "usuario";
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim() || "corte123";

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ erro: "Credenciais inválidas." }, { status: 400 });
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ erro: "Usuário ou senha incorretos." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  return setSessionCookie(res, {
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  });
}
