import Reveal from "@/components/Reveal";
import FallbackImage from "@/components/FallbackImage";
import { coursePillars, futureCourses } from "@/lib/data";

const WHATSAPP_CURSOS =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos.";

export default function Courses() {
  return (
    <section id="cursos" className="section courses-section">
      <div className="container">
        <div className="courses-grid">
          <Reveal variant="scale">
            <div className="courses-media">
              <FallbackImage
                src="/images/curso-ellen.png"
                alt="Ellen Gardelin ministrando curso de alisamento"
                label="Foto do curso em breve"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow courses-eyebrow">Cursos</p>
            <h2>Aprenda com quem entende de alisamentos.</h2>
            <p className="courses-lead" style={{ marginTop: "1.2rem" }}>
              Transforme sua técnica e eleve o nível dos seus resultados.
              Ellen Gardelin oferece cursos voltados para profissionais e
              pessoas que desejam se especializar em alisamentos e
              tratamentos capilares.
            </p>

            <div className="pillars">
              {coursePillars.map((pillar) => (
                <div className="pillar-row" key={pillar.title}>
                  <span className="pillar-title">{pillar.title}</span>
                  <span className="pillar-desc">{pillar.description}</span>
                </div>
              ))}
            </div>

            <div className="courses-cta">
              <a
                href={WHATSAPP_CURSOS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-on-dark"
              >
                Quero conhecer os cursos
              </a>
            </div>

            {futureCourses.length === 0 && (
              <p className="courses-note">
                Novas turmas serão anunciadas em breve.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
