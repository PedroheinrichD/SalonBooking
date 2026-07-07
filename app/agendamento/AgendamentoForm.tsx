"use client";

import { useEffect, useMemo, useState } from "react";
import { horariosDisponiveis } from "@/lib/services";

type Servico = {
  id: string;
  nome: string;
  duracaoMin: number;
  preco: number;
  descricao: string;
};

type Props = {
  servicoInicial?: string;
  servicosIniciais?: Servico[];
};

function hojeISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

function formatarData(dataISO: string) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function AgendamentoForm({ servicoInicial, servicosIniciais = [] }: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicos, setServicos] = useState<Servico[]>(servicosIniciais);
  const [servicoId, setServicoId] = useState(
    servicoInicial && servicosIniciais.some((s) => s.id === servicoInicial)
      ? servicoInicial
      : servicosIniciais[0]?.id ?? ""
  );
  const [data, setData] = useState(hojeISO());
  const [horario, setHorario] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState<null | {
    nome: string;
    servico: string;
    data: string;
    horario: string;
  }>(null);

  const servicoAtual = useMemo(
    () => servicos.find((s) => s.id === servicoId),
    [servicoId, servicos]
  );

  const minData = hojeISO();

  useEffect(() => {
    let cancelado = false;
    fetch("/api/servicos")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelado) {
          const lista = (json.servicos ?? []) as Servico[];
          setServicos(lista);
          if (lista.length > 0 && !lista.some((s) => s.id === servicoId)) {
            setServicoId(lista[0].id);
          }
        }
      })
      .catch(() => {
        if (!cancelado) setServicos(servicosIniciais);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  // Busca horários já ocupados sempre que a data selecionada mudar
  useEffect(() => {
    if (!data) {
      setHorariosOcupados([]);
      return;
    }
    let cancelado = false;
    setCarregandoHorarios(true);
    fetch(`/api/agendamentos?data=${data}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelado) setHorariosOcupados(json.horariosOcupados ?? []);
      })
      .catch(() => {
        if (!cancelado) setHorariosOcupados([]);
      })
      .finally(() => {
        if (!cancelado) setCarregandoHorarios(false);
      });
    return () => {
      cancelado = true;
    };
  }, [data]);

  function formatarTelefone(valor: string) {
    const digitos = valor.replace(/\D/g, "").slice(0, 11);
    if (digitos.length <= 2) return digitos;
    if (digitos.length <= 7)
      return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(
      7
    )}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim() || !telefone.trim() || !data || !horario) {
      setErro("Preencha todos os campos antes de salvar.");
      return;
    }

    if (!servicoAtual) {
      setErro("Nenhum serviço disponível no momento. Cadastre um serviço para continuar.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          servico: servicoAtual.nome,
          preco: servicoAtual.preco,
          data,
          horario,
        }),
      });

      if (res.status === 409) {
        setErro("Esse horário acabou de ser reservado. Escolha outro.");
        setHorariosOcupados((prev) => [...prev, horario]);
        return;
      }
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setErro(json?.erro ?? "Não foi possível salvar o agendamento.");
        return;
      }

      setConfirmado({ nome: nome.trim(), servico: servicoAtual.nome, data, horario });
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (confirmado) {
    return (
      <div className="ticket bg-surface border border-line px-8 py-10 text-center">
        <p className="font-display italic text-gold text-lg mb-1">
          Tudo certo, {confirmado.nome.split(" ")[0]}!
        </p>
        <h2 className="font-display text-3xl text-wine-dark mb-6">
          Agendamento recebido
        </h2>
        <dl className="text-left max-w-xs mx-auto space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink/50">Serviço</dt>
            <dd className="text-ink font-medium">{confirmado.servico}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/50">Data</dt>
            <dd className="text-ink font-medium">
              {confirmado.data.split("-").reverse().join("/")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/50">Horário</dt>
            <dd className="text-ink font-medium">{confirmado.horario}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-ink/50">
          Seu horário está como pendente até a confirmação do salão.
        </p>
        <button
          onClick={() => {
            setConfirmado(null);
            setNome("");
            setTelefone("");
            setData(hojeISO());
            setHorario("");
          }}
          className="mt-6 text-wine text-sm font-medium hover:text-wine-dark"
        >
          Fazer novo agendamento
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1.5">
          Nome completo
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Maria da Silva"
          className="w-full rounded-ticket border border-line bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1.5">
          Telefone
        </label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
          placeholder="(19) 99999-9999"
          className="w-full rounded-ticket border border-line bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70 mb-1.5">
          Serviço
        </label>
        {servicos.length === 0 ? (
          <p className="rounded-ticket border border-line bg-surface px-4 py-3 text-sm text-ink/60">
            Nenhum serviço disponível no momento. Cadastre um serviço no painel admin.
          </p>
        ) : (
          <select
            value={servicoId}
            onChange={(e) => setServicoId(e.target.value)}
            className="w-full rounded-ticket border border-line bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine"
          >
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} — R$ {s.preco}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">
            Data
          </label>
          <div className="rounded-ticket border border-wine/20 bg-gradient-to-br from-wine/5 to-gold/10 p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/50">
              <span>Escolha a data</span>
              <span className="text-wine">{data ? formatarData(data) : ""}</span>
            </div>
            <input
              type="date"
              value={data}
              min={minData}
              onChange={(e) => {
                setData(e.target.value);
                setHorario("");
              }}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink shadow-sm focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/40"
              required
            />
            <p className="mt-2 text-xs text-ink/60">
              A data atual já vem selecionada para facilitar o agendamento.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1.5">
            Horário
          </label>
          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            disabled={!data || carregandoHorarios}
            className="w-full rounded-ticket border border-line bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40 focus:border-wine disabled:opacity-50"
            required
          >
            <option value="" disabled>
              {!data
                ? "Escolha a data"
                : carregandoHorarios
                ? "Carregando..."
                : "Selecione"}
            </option>
            {horariosDisponiveis.map((h) => (
              <option key={h} value={h} disabled={horariosOcupados.includes(h)}>
                {h} {horariosOcupados.includes(h) ? "(indisponível)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {erro && (
        <p className="text-sm text-wine bg-wine/5 border border-wine/20 rounded-ticket px-4 py-2.5">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || servicos.length === 0}
        className="w-full bg-wine hover:bg-wine-dark disabled:opacity-60 text-bg font-medium px-8 py-3.5 rounded-ticket transition-colors"
      >
        {enviando ? "Salvando..." : "Salvar agendamento"}
      </button>
    </form>
  );
}
