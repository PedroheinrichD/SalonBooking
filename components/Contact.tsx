import Reveal from "@/components/Reveal";

const WHATSAPP_AGENDAR =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";
const WHATSAPP_CURSOS =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos.";

export default function Contact() {
  return (
    <section id="contato" className="section contact-section">
      <div className="container contact-inner">
        <Reveal>
          <h2 className="contact-title">
            Seu próximo resultado começa aqui.
          </h2>
          <p className="body-copy" style={{ marginTop: "1.4rem" }}>
            Agende seu atendimento ou entre em contato para conhecer os
            cursos e descobrir a melhor opção para você.
          </p>
          <div className="contact-actions">
            <a
              href={WHATSAPP_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Agendar pelo WhatsApp
            </a>
            <a
              href={WHATSAPP_CURSOS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Conhecer os cursos
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="contact-meta">
            <div className="contact-meta-item">
              <dt>Localização</dt>
              <dd>R. Prof. Salvador Mangini - Parque das Laranjeiras, Itápolis - SP</dd>
            </div>
            <div className="contact-meta-item">
              <dt>WhatsApp</dt>
              <dd>+55 16 99962-0073</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
