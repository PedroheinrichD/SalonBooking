"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Cursos", href: "#cursos" },
  { label: "Contato", href: "#contato" },
];

const WHATSAPP_AGENDAR =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="header-mark">
            Ellen Gardelin
          </a>

          <nav className="nav-desktop" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="link-underline">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_AGENDAR}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary header-cta"
          >
            Agendar
          </a>

          <button
            type="button"
            className={`header-burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_AGENDAR}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={closeMenu}
        >
          Agendar horário
        </a>
      </div>
    </>
  );
}
