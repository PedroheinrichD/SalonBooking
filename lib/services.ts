export type Servico = {
  id: string;
  nome: string;
  duracaoMin: number;
  preco: number;
  descricao: string;
};

export const servicos: Servico[] = [
  {
    id: "corte-feminino",
    nome: "Corte Feminino",
    duracaoMin: 60,
    preco: 80,
    descricao: "Corte personalizado com finalização em escova.",
  },
  {
    id: "corte-masculino",
    nome: "Corte Masculino",
    duracaoMin: 40,
    preco: 50,
    descricao: "Corte na tesoura ou máquina, com acabamento na navalha.",
  },
  {
    id: "coloracao",
    nome: "Coloração",
    duracaoMin: 120,
    preco: 180,
    descricao: "Coloração completa com produtos de tratamento.",
  },
  {
    id: "escova-progressiva",
    nome: "Escova Progressiva",
    duracaoMin: 150,
    preco: 220,
    descricao: "Alisamento e alinhamento dos fios.",
  },
  {
    id: "manicure",
    nome: "Manicure",
    duracaoMin: 45,
    preco: 40,
    descricao: "Cuidado completo para as unhas das mãos.",
  },
  {
    id: "pedicure",
    nome: "Pedicure",
    duracaoMin: 45,
    preco: 45,
    descricao: "Cuidado completo para as unhas dos pés.",
  },
  {
    id: "design-sobrancelhas",
    nome: "Design de Sobrancelhas",
    duracaoMin: 30,
    preco: 35,
    descricao: "Modelagem com pinça ou linha.",
  },
  {
    id: "maquiagem",
    nome: "Maquiagem",
    duracaoMin: 60,
    preco: 120,
    descricao: "Maquiagem profissional para eventos.",
  },
];

// Horários de funcionamento disponíveis para agendamento
export const horariosDisponiveis = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
