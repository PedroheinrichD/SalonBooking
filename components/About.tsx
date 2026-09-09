import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container about-grid">
        <Reveal>
          <p className="about-tag">
            Beleza, técnica e cuidado em cada detalhe.
          </p>

          <dl className="about-details">
            <div>
              <dt>Nome</dt>
              <dd>Ellen Gardelin</dd>
            </div>
            <div>
              <dt>Atuação</dt>
              <dd>Atendimentos e Cursos</dd>
            </div>
            <div>
              <dt>Localização</dt>
              <dd>R. Prof. Salvador Mangini - Parque das Laranjeiras, Itápolis - SP</dd>
            </div>
            <div>
              <dt>Especialidade</dt>
              <dd>Alisamentos Orgânicos</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} className="about-copy">
          <h3>Formação Profissional em Cabeleireira</h3>
          <p className="body-copy">
            Ellen Gardelin atua com alisamentos orgânicos e tratamentos
            capilares, oferecendo atendimento personalizado e técnica
            profissional para valorizar a beleza e a saúde dos fios.
          </p>
          <p className="body-copy">
            Seu trabalho une experiência, cuidado e precisão para
            proporcionar resultados alinhados, brilhantes e naturais.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
