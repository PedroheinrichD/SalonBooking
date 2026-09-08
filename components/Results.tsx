import Reveal from "@/components/Reveal";
import FallbackImage from "@/components/FallbackImage";
import { results } from "@/lib/data";

export default function Results() {
  return (
    <section id="resultados" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Resultados</p>
          <p className="lead">Resultados que falam por si.</p>
        </div>

        <div className="results-list">
          {results.map((result, i) => (
            <Reveal key={result.name} delay={i * 100} className="result-item">
              <div className={`result-media ${result.before ? "" : "single"}`}>
                {result.before && (
                  <div className="result-frame">
                    <FallbackImage
                      src={result.before}
                      alt={`${result.name} — antes do procedimento`}
                      label="Foto de antes em breve"
                    />
                    <span className="result-tag">ANTES</span>
                  </div>
                )}
                <div className="result-frame">
                  <FallbackImage
                    src={result.after}
                    alt={`${result.name} — depois do procedimento`}
                    label="Foto de depois em breve"
                  />
                  <span className="result-tag">DEPOIS</span>
                </div>
              </div>

              <div className="result-info">
                <span className="result-name">{result.name}</span>
                <span className="result-service">{result.service}</span>
                <p className="result-quote">&ldquo;{result.testimonial}&rdquo;</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
