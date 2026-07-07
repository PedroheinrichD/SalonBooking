import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const servicos = await prisma.servico.findMany({
    orderBy: [{ nome: "asc" }],
  });

  return NextResponse.json({ servicos });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const { nome, duracaoMin, preco, descricao } = body;

  if (!nome || typeof duracaoMin !== "number" || typeof preco !== "number") {
    return NextResponse.json(
      { erro: "Nome, duração e preço são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const servico = await prisma.servico.create({
      data: {
        nome: String(nome).trim(),
        duracaoMin: Number(duracaoMin),
        preco: Number(preco),
        descricao: String(descricao ?? "").trim(),
      },
    });

    return NextResponse.json({ servico }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { erro: "Já existe um serviço com esse nome." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { erro: "Erro ao criar o serviço." },
      { status: 500 }
    );
  }
}
