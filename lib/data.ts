export interface ResultEntry {
  name: string;
  service: string;
  before?: string;
  after: string;
  testimonial: string;
}

// Placeholders only — replace name, service, images and testimonial with
// real client data and photos. Do not ship invented names or quotes.
export const results: ResultEntry[] = [
  {
    name: "Cliente 01",
    service: "Alisamento Orgânico",
    before: "/images/clientes/cliente-01-antes.jpg",
    after: "/images/clientes/cliente-01-depois.jpg",
    testimonial: "Depoimento da cliente aqui.",
  },
  {
    name: "Cliente 02",
    service: "Tratamento Capilar",
    before: "/images/clientes/cliente-02-antes.jpg",
    after: "/images/clientes/cliente-02-depois.jpg",
    testimonial: "Depoimento da cliente aqui.",
  },
  {
    name: "Cliente 03",
    service: "Alisamento Orgânico",
    after: "/images/clientes/cliente-03-depois.jpg",
    testimonial: "Depoimento da cliente aqui.",
  },
];

export interface CoursePillar {
  title: string;
  description: string;
}

export const coursePillars: CoursePillar[] = [
  {
    title: "Alisamentos",
    description: "Aprendizado e aperfeiçoamento de técnicas profissionais.",
  },
  {
    title: "Tratamentos",
    description: "Conhecimentos para cuidados e tratamentos dos fios.",
  },
  {
    title: "Técnica",
    description: "Aprimoramento da execução e acabamento dos procedimentos.",
  },
  {
    title: "Prática",
    description: "Conteúdo voltado para aplicação prática.",
  },
];

export interface FutureCourse {
  title: string;
  description: string;
}

// Empty on purpose — populate as new turmas/cursos are announced.
export const futureCourses: FutureCourse[] = [];
