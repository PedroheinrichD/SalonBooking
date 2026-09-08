const WHATSAPP =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";
const INSTAGRAM = "https://www.instagram.com/ellengardelinhair/";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <p className="footer-mark">Ellen Gardelin</p>
            <p className="footer-tag">Atendimentos &amp; Cursos — Itápolis — SP</p>
          </div>

          <nav className="footer-links" aria-label="Redes e contato">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              WhatsApp
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Ellen Gardelin. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
