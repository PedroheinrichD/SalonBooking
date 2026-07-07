"use client";

import { useEffect, useState } from "react";

type Status = "PENDENTE" | "CONFIRMADO" | "CANCELADO";

type Agendamento = {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  preco: number;
  data: string;
  horario: string;
  status: Status;
};

type Servico = {
  id: string;
  nome: string;
  duracaoMin: number;
  preco: number;
  descricao: string;
};

type ServicoForm = {
  nome: string;
  duracaoMin: string;
  preco: string;
  descricao: string;
};

const filtros: { label: string; valor: Status | "TODOS" }[] = [
  { label: "Todos", valor: "TODOS" },
  { label: "Pendentes", valor: "PENDENTE" },
  { label: "Atendidos", valor: "CONFIRMADO" },
  { label: "Cancelados", valor: "CANCELADO" },
];

const badgeCor: Record<Status, string> = {
  PENDENTE: "bg-gold/15 text-[#8A6A1E]",
  CONFIRMADO: "bg-emerald-100 text-emerald-700",
  CANCELADO: "bg-ink/10 text-ink/40",
};

const servicoInicial: ServicoForm = {
  nome: "",
  duracaoMin: "60",
  preco: "80",
  descricao: "",
};

export default function AdminList() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<Status | "TODOS">("TODOS");
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [removendoId, setRemovendoId] = useState<string | null>(null);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregandoServicos, setCarregandoServicos] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<ServicoForm>(servicoInicial);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erroServico, setErroServico] = useState<string | null>(null);

  async function carregarAgendamentos() {
    setCarregando(true);
    try {
      const res = await fetch("/api/agendamentos");
      const json = await res.json();
      setAgendamentos(json.agendamentos ?? []);
    } finally {
      setCarregando(false);
    }
  }

  async function carregarServicos() {
    setCarregandoServicos(true);
    try {
      const res = await fetch("/api/servicos");
      const json = await res.json();
      setServicos(json.servicos ?? []);
    } finally {
      setCarregandoServicos(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos();
    carregarServicos();
  }, []);

  async function atualizarStatus(id: string, status: Status) {
    setAtualizandoId(id);
    try {
      await fetch(`/api/agendamentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } finally {
      setAtualizandoId(null);
    }
  }

  function resetarFormulario() {
    setForm(servicoInicial);
    setEditandoId(null);
    setErroServico(null);
    setMensagem(null);
  }

  function editarServico(servico: Servico) {
    setEditandoId(servico.id);
    setForm({
      nome: servico.nome,
      duracaoMin: String(servico.duracaoMin),
      preco: String(servico.preco),
      descricao: servico.descricao,
    });
    setErroServico(null);
    setMensagem(null);
  }

  async function salvarServico(e: React.FormEvent) {
    e.preventDefault();
    setErroServico(null);
    setMensagem(null);

    const duracaoMin = Number(form.duracaoMin);
    const preco = Number(form.preco);

    if (!form.nome.trim() || !Number.isFinite(duracaoMin) || !Number.isFinite(preco)) {
      setErroServico("Preencha nome, duração e preço corretamente.");
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      duracaoMin,
      preco,
      descricao: form.descricao.trim(),
    };

    const method = editandoId ? "PATCH" : "POST";
    const url = editandoId ? `/api/servicos/${editandoId}` : "/api/servicos";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setErroServico(json?.erro ?? "Não foi possível salvar o serviço.");
        return;
      }

      const servicoSalvo = json.servico as Servico;
      setServicos((prev) => {
        if (editandoId) {
          return prev.map((s) => (s.id === editandoId ? servicoSalvo : s));
        }
        return [...prev, servicoSalvo];
      });
      resetarFormulario();
      setMensagem(editandoId ? "Serviço atualizado." : "Serviço adicionado.");
    } catch {
      setErroServico("Falha ao salvar o serviço. Tente novamente.");
    }
  }

  async function removerServico(id: string) {
    try {
      const res = await fetch(`/api/servicos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setErroServico("Não foi possível remover o serviço.");
        return;
      }
      setServicos((prev) => prev.filter((s) => s.id !== id));
      setMensagem("Serviço removido.");
      if (editandoId === id) {
        resetarFormulario();
      }
    } catch {
      setErroServico("Falha ao remover o serviço.");
    }
  }

  async function removerAgendamento(id: string) {
    setRemovendoId(id);
    try {
      const res = await fetch(`/api/agendamentos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setMensagem("Não foi possível excluir o agendamento.");
        return;
      }
      setAgendamentos((prev) => prev.filter((a) => a.id !== id));
      setMensagem("Agendamento excluído.");
    } finally {
      setRemovendoId(null);
    }
  }

  const lista =
    filtro === "TODOS"
      ? agendamentos
      : agendamentos.filter((a) => a.status === filtro);

  return (
    <div className="space-y-8">
      <section className="border border-line rounded-ticket p-6 bg-surface/70">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-2xl text-wine-dark">Gerenciar serviços</h2>
            <p className="text-sm text-ink/60 mt-1">
              Adicione, edite ou remova os serviços disponíveis no catálogo.
            </p>
          </div>
          <button
            type="button"
            onClick={resetarFormulario}
            className="text-sm px-3 py-2 rounded-ticket border border-line text-ink/60 hover:border-wine/40"
          >
            {editandoId ? "Cancelar edição" : "Limpar"}
          </button>
        </div>

        {(mensagem || erroServico) && (
          <div
            className={`mb-4 rounded-ticket border px-3 py-2 text-sm ${
              erroServico
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-emerald-300 bg-emerald-50 text-emerald-700"
            }`}
          >
            {erroServico ?? mensagem}
          </div>
        )}

        <form onSubmit={salvarServico} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink/70 mb-1.5">
              Nome do serviço
            </label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
              placeholder="Ex.: Corte Feminino"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">
              Duração (minutos)
            </label>
            <input
              type="number"
              min="15"
              step="5"
              value={form.duracaoMin}
              onChange={(e) => setForm({ ...form, duracaoMin: e.target.value })}
              className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">
              Preço (R$)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
              className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink/70 mb-1.5">
              Descrição
            </label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={3}
              className="w-full rounded-ticket border border-line bg-bg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
              placeholder="Descreva o que inclui o serviço"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-ticket bg-wine px-4 py-2.5 text-sm font-medium text-bg hover:bg-wine-dark"
            >
              {editandoId ? "Salvar alterações" : "Adicionar serviço"}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {carregandoServicos && (
            <p className="text-sm text-ink/50">Carregando serviços...</p>
          )}

          {!carregandoServicos && servicos.length === 0 && (
            <p className="text-sm text-ink/50 border border-line rounded-ticket px-4 py-4">
              Nenhum serviço cadastrado ainda.
            </p>
          )}

          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-ticket border border-line bg-bg px-4 py-3"
            >
              <div>
                <p className="font-medium text-ink">{servico.nome}</p>
                <p className="text-sm text-ink/60">
                  {servico.duracaoMin} min • R$ {servico.preco} • {servico.descricao}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => editarServico(servico)}
                  className="text-sm rounded-ticket border border-line px-3 py-1.5 text-ink/70 hover:border-wine/40"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => removerServico(servico.id)}
                  className="text-sm rounded-ticket border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filtros.map((f) => (
          <button
            key={f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`text-sm px-4 py-1.5 rounded-ticket border transition-colors ${
              filtro === f.valor
                ? "bg-wine text-bg border-wine"
                : "border-line text-ink/60 hover:border-wine/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {carregando && (
        <p className="text-sm text-ink/50">Carregando agendamentos...</p>
      )}

      {!carregando && lista.length === 0 && (
        <p className="text-sm text-ink/50 border border-line rounded-ticket px-6 py-10 text-center">
          Nenhum agendamento por aqui ainda.
        </p>
      )}

      <div className="space-y-3">
        {lista.map((a) => (
          <div
            key={a.id}
            className="border border-line rounded-ticket px-5 py-4 flex flex-wrap items-center gap-4 bg-surface"
          >
            <div className="flex-1 min-w-[180px]">
              <p className="font-medium text-ink">{a.nome}</p>
              <p className="text-xs text-ink/50">{a.telefone}</p>
            </div>

            <div className="min-w-[140px]">
              <p className="text-sm text-ink">{a.servico}</p>
              <p className="text-xs text-ink/50">R$ {a.preco}</p>
            </div>

            <div className="min-w-[120px] text-sm text-ink/70">
              {a.data.split("-").reverse().join("/")} às {a.horario}
            </div>

            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeCor[a.status]}`}
            >
              {a.status === "CONFIRMADO" ? "Atendido" : a.status.charAt(0) + a.status.slice(1).toLowerCase()}
            </span>

            <div className="flex gap-2 ml-auto">
              <button
                disabled={a.status === "CONFIRMADO" || atualizandoId === a.id}
                onClick={() => atualizarStatus(a.id, "CONFIRMADO")}
                className="text-xs font-medium px-3 py-1.5 rounded-ticket border border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-emerald-700 transition-colors"
              >
                Marcar como atendido
              </button>
              <button
                disabled={a.status === "CANCELADO" || atualizandoId === a.id}
                onClick={() => atualizarStatus(a.id, "CANCELADO")}
                className="text-xs font-medium px-3 py-1.5 rounded-ticket border border-ink/20 text-ink/50 hover:bg-ink/5 disabled:opacity-40 transition-colors"
              >
                Cancelar
              </button>
              <button
                disabled={removendoId === a.id}
                onClick={() => removerAgendamento(a.id)}
                className="text-xs font-medium px-3 py-1.5 rounded-ticket border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors"
              >
                {removendoId === a.id ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
