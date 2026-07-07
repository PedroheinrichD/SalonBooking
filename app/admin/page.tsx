import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import AdminList from "./AdminList";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/login?redirect=/admin");
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-wide text-wine"
          >
            Ateliê Fio &amp; Ouro
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-ink/60 hover:text-wine">
              ← Voltar ao site
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-ticket border border-line px-3 py-1.5 text-sm text-ink/70 hover:border-wine/40 hover:text-wine"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-display italic text-gold text-lg mb-2">
          Bastidores do salão
        </p>
        <h1 className="font-display text-4xl text-wine-dark mb-10">
          Painel administrativo
        </h1>

        <AdminList />
      </section>
    </main>
  );
}
