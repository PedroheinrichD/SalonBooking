import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    index: "01",
    title: "Alisamentos Orgânicos",
    description:
      "Técnicas profissionais para cabelos mais alinhados, leves, brilhantes e com movimento.",
  },
  {
    index: "02",
    title: "Tratamentos Capilares",
    description:
      "Cuidados direcionados às necessidades dos fios, buscando mais força, maciez e vitalidade.",
  },
  {
    index: "03",
    title: "Manutenção e Cuidados",
    description:
      "Orientações para preservar o resultado e manter os fios bem cuidados.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Serviços</p>
          <p className="lead">
            Cuidados profissionais para transformar e valorizar seus
            cabelos.
          </p>
        </div>

        <ul className="services-list">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.index} delay={i * 90}>
              <div className="service-row">
                <span className="service-index">{service.index}</span>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-mark" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
