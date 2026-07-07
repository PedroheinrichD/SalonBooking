import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/agendamentos/:id  body: { status: "CONFIRMADO" | "CANCELADO" | "PENDENTE" }
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => null);
  const status = body?.status;

  if (!["PENDENTE", "CONFIRMADO", "CANCELADO"].includes(status)) {
    return NextResponse.json({ erro: "Status inválido." }, { status: 400 });
  }

  try {
    const agendamento = await prisma.agendamento.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json({ agendamento });
  } catch {
    return NextResponse.json(
      { erro: "Agendamento não encontrado." },
      { status: 404 }
    );
  }
}

// DELETE /api/agendamentos/:id -> remove o registro definitivamente
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.agendamento.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { erro: "Agendamento não encontrado." },
      { status: 404 }
    );
  }
}
