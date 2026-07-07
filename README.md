# Ateliê Fio & Ouro — Sistema de Agendamento

Sistema de agendamento para salão de beleza feito com **Next.js (App Router)**,
**React**, **Tailwind CSS** e **Prisma** com banco de dados **SQLite**
(arquivo local, sem precisar instalar nada extra).

## Estrutura

```
Página Inicial (/)              → lista de serviços, preços e botão "Agendar"
Página Agendamento (/agendamento) → nome, telefone, serviço, data, horário
Painel Admin (/admin)           → lista de agendamentos, confirmar / cancelar
```

## Como rodar

Pré-requisitos: Node.js 18+.

```bash
# 1. instalar dependências
npm install

# 2. criar o banco de dados (SQLite) a partir do schema
npx prisma db push

# 3. rodar o projeto
npm run dev
```

Acesse:
- http://localhost:3000 — página inicial
- http://localhost:3000/agendamento — formulário de agendamento
- http://localhost:3000/admin — painel administrativo

> Obs.: nesta sandbox de geração do código não foi possível baixar o engine
> do Prisma (domínio bloqueado), então rode `npm install` e
> `npx prisma db push` no seu computador — é só isso que falta para o
> projeto funcionar 100%.

## Como funciona

- **Serviços e preços** ficam em `lib/services.ts` — edite essa lista para
  adicionar, remover ou reprecificar serviços do salão.
- **Horários de funcionamento** também estão em `lib/services.ts`
  (`horariosDisponiveis`).
- O formulário de agendamento busca em tempo real os horários já ocupados
  no dia escolhido (`GET /api/agendamentos?data=YYYY-MM-DD`) e impede que
  dois clientes marquem o mesmo horário (restrição de unicidade no banco).
- O painel admin lista todos os agendamentos com filtros por status
  (Pendente / Confirmado / Cancelado) e permite confirmar ou cancelar cada
  um com um clique.

## Banco de dados

O schema (`prisma/schema.prisma`) usa SQLite — o banco fica em um único
arquivo (`prisma/dev.db`), sem precisar instalar Postgres/MySQL. Para trocar
de banco no futuro, basta mudar o `provider` e a `DATABASE_URL` no `.env`.

Modelo `Agendamento`:

| Campo    | Tipo                                   |
|----------|-----------------------------------------|
| nome     | texto                                   |
| telefone | texto                                   |
| servico  | texto                                   |
| preco    | número                                  |
| data     | texto (YYYY-MM-DD)                      |
| horario  | texto (HH:mm)                           |
| status   | PENDENTE \| CONFIRMADO \| CANCELADO     |

## Personalização visual

Paleta e tipografia ficam centralizadas em `tailwind.config.ts`
(cores `wine`, `gold`, `ink`, `bg`) e `app/layout.tsx` (fontes Cormorant
Garamond + Manrope). O recorte serrilhado nos cards (`.ticket` em
`app/globals.css`) é o elemento de identidade visual do salão, remetendo a
um canhoto de agendamento.
