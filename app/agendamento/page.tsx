import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AgendamentoForm from "./AgendamentoForm";

export const dynamic = "force-dynamic";

export default async function AgendamentoPage({
  searchParams,
}: {
  searchParams: { servico?: string };
}) {
  const servicos = await prisma.servico.findMany({
    orderBy: [{ nome: "asc" }],
  });

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto max-w-2xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-wide text-wine"
          >
            Ateliê Fio &amp; Ouro
          </Link>
          <Link href="/" className="text-sm text-ink/60 hover:text-wine">
            ← Voltar
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-14">
        <p className="font-display italic text-gold text-lg mb-2">
          Reserve seu horário
        </p>
        <h1 className="font-display text-4xl text-wine-dark mb-8">
          Agendamento
        </h1>

        <AgendamentoForm
          servicoInicial={searchParams.servico}
          servicosIniciais={servicos}
        />
      </section>
    </main>
  );
}
