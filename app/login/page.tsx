"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setErro(json?.erro ?? "Falha ao entrar.");
        return;
      }

      const redirect = searchParams.get("redirect") ?? "/admin";
      router.push(redirect);
      router.refresh();
    } catch {
      setErro("Não foi possível entrar no painel.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-line">
        <div className="mx-auto max-w-2xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-wide text-wine">
            Ateliê Fio &amp; Ouro
          </Link>
          <Link href="/" className="text-sm text-ink/60 hover:text-wine">
            ← Voltar
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-md px-6 py-16">
        <div className="ticket border border-line bg-surface px-8 py-8">
          <p className="font-display italic text-gold text-lg mb-2">Acesso reservado</p>
          <h1 className="font-display text-3xl text-wine-dark mb-6">Login do painel</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Usuário</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40"
                placeholder="usuario"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40"
                placeholder="Sua senha"
                required
              />
            </div>

            {erro && (
              <p className="rounded-ticket border border-wine/20 bg-wine/5 px-3 py-2 text-sm text-wine">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-ticket bg-wine px-4 py-3 text-sm font-medium text-bg hover:bg-wine-dark disabled:opacity-60"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
