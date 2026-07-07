import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  try {
    const servico = await prisma.servico.update({
      where: { id: params.id },
      data: {
        nome: body.nome ? String(body.nome).trim() : undefined,
        duracaoMin: typeof body.duracaoMin === "number" ? Number(body.duracaoMin) : undefined,
        preco: typeof body.preco === "number" ? Number(body.preco) : undefined,
        descricao: body.descricao !== undefined ? String(body.descricao).trim() : undefined,
      },
    });

    return NextResponse.json({ servico });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { erro: "Já existe um serviço com esse nome." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { erro: "Serviço não encontrado." },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.servico.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { erro: "Serviço não encontrado." },
      { status: 404 }
    );
  }
}
