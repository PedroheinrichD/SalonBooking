import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/agendamentos            -> lista todos os agendamentos (painel admin)
// GET /api/agendamentos?data=...   -> lista horários já ocupados naquela data (formulário)
export async function GET(req: NextRequest) {
  const data = req.nextUrl.searchParams.get("data");

  if (data) {
    const ocupados = await prisma.agendamento.findMany({
      where: { data, status: "PENDENTE" },
      select: { horario: true },
    });

    const horariosOcupados = Array.from(
      new Set(ocupados.map((o: { horario: string }) => o.horario))
    );

    return NextResponse.json({ horariosOcupados });
  }

  const agendamentos = await prisma.agendamento.findMany({
    orderBy: [{ data: "asc" }, { horario: "asc" }],
  });
  return NextResponse.json({ agendamentos });
}

// POST /api/agendamentos -> cria um novo agendamento
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const { nome, telefone, servico, preco, data, horario } = body;

  if (!nome || !telefone || !servico || !data || !horario) {
    return NextResponse.json(
      { erro: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const jaExiste = await prisma.agendamento.findFirst({
      where: {
        data: String(data),
        horario: String(horario),
        status: "PENDENTE",
      },
    });

    if (jaExiste) {
      return NextResponse.json(
        { erro: "Este horário já está reservado." },
        { status: 409 }
      );
    }

    const agendamento = await prisma.agendamento.create({
      data: {
        nome: String(nome).trim(),
        telefone: String(telefone).trim(),
        servico: String(servico),
        preco: Number(preco) || 0,
        data: String(data),
        horario: String(horario),
      },
    });
    return NextResponse.json({ agendamento }, { status: 201 });
  } catch (e: any) {
    // Violação de unicidade (data + horario) => horário já reservado
    if (e?.code === "P2002") {
      return NextResponse.json(
        { erro: "Este horário já está reservado." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { erro: "Erro ao salvar o agendamento." },
      { status: 500 }
    );
  }
}
