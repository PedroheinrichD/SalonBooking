import Reveal from "@/components/Reveal";

const ITEMS = [
  "Especialista em Alisamentos Orgânicos",
  "Atendimento Personalizado",
  "Técnica Profissional",
  "Foco na Saúde dos Fios",
  "Atendimentos e Cursos",
  "Formação Profissional em Cabeleireira",
];

export default function Differentials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Diferenciais</p>
          <p className="lead">Por que escolher Ellen?</p>
        </div>

        <Reveal variant="fade">
          <div className="differentials-grid">
            {ITEMS.map((item) => (
              <div className="differential-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
