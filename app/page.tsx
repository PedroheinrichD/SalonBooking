import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const servicos = await prisma.servico.findMany({
    orderBy: [{ nome: "asc" }],
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(138,61,87,0.08),_transparent_35%),linear-gradient(135deg,_#fcf9f4_0%,_#f8f1e8_100%)]">
      <header className="border-b border-line/70 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-2xl tracking-[0.2em] text-wine">
            Ateliê Fio &amp; Ouro
          </span>

          <div className="flex items-center">
            <nav className="hidden items-center gap-8 text-sm text-ink/70 sm:flex">
              <a href="#servicos" className="transition-colors hover:text-wine">
                Serviços
              </a>
              <Link href="/admin" className="transition-colors hover:text-wine">
                Painel Admin
              </Link>
            </nav>

            <details className="relative sm:hidden">
              <summary className="flex cursor-pointer list-none flex-col gap-1.5 rounded-full border border-line/70 p-2 text-wine">
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
              </summary>
              <div className="absolute right-0 top-full mt-3 flex min-w-[180px] flex-col gap-2 rounded-ticket border border-line bg-white p-3 shadow-lg">
                <a href="#servicos" className="text-sm text-ink/70 transition-colors hover:text-wine">
                  Serviços
                </a>
                <Link href="/admin" className="text-sm text-ink/70 transition-colors hover:text-wine">
                  Painel Admin
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 font-serif text-lg italic text-gold">
            Seu ritual de beleza começa com um horário reservado
          </p>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-wine-dark sm:text-5xl lg:text-6xl">
            Elegância, cuidado e presença em cada atendimento.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
            Escolha o serviço, o dia e o horário — nós cuidamos do resto com
            acolhimento, técnica e atenção aos detalhes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/agendamento"
              className="rounded-ticket bg-wine px-8 py-3.5 font-medium text-bg transition-colors hover:bg-wine-dark"
            >
              Agendar horário
            </Link>
            <a
              href="#servicos"
              className="rounded-ticket border border-line px-8 py-3.5 font-medium text-ink/70 transition-colors hover:border-wine/40 hover:text-wine"
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="ticket border border-line bg-surface/90 p-8 shadow-[0_10px_40px_rgba(88,42,57,0.08)]">
          <p className="font-serif text-xl text-wine-dark">Experiência personalizada</p>
          <ul className="mt-5 space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-gold">✦</span>
              <span>Atendimento acolhedor e com atenção aos detalhes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-gold">✦</span>
              <span>Agendamento simples, rápido e com confirmação prática.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-gold">✦</span>
              <span>Serviços pensados para realçar sua beleza e rotina.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-serif text-lg italic text-gold">Nossos serviços</p>
            <h2 className="font-serif text-3xl text-wine-dark">Especialidades em destaque</h2>
          </div>
          <span className="text-sm text-ink/50">{servicos.length} opções disponíveis</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="ticket border border-line bg-surface/90 px-6 py-6 pb-8 shadow-[0_8px_24px_rgba(88,42,57,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-ink">{servico.nome}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {servico.descricao}
                  </p>
                </div>
                <span className="shrink-0 font-serif text-2xl text-gold">
                  R$ {servico.preco}
                </span>
              </div>
              <div className="divider-stitch mt-5 flex items-center justify-between pt-3 text-xs text-ink/50">
                <span>~ {servico.duracaoMin} min</span>
                <Link
                  href={`/agendamento?servico=${servico.id}`}
                  className="font-medium text-wine transition-colors hover:text-wine-dark"
                >
                  Agendar este →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line/70 bg-white/70">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs uppercase tracking-[0.2em] text-ink/40">
          Ateliê Fio &amp; Ouro — Agendamentos online
        </div>
      </footer>
    </main>
  );
}
