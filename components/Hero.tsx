"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollVideo } from "@/hooks/useScrollVideo";

const WHATSAPP_AGENDAR =
  "https://wa.me/5516999620073?text=Ol%C3%A1%20Ellen%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { progress } = useScrollVideo(stageRef, videoRef);

  // Reveal shortly after mount so the hero is never a bare video (mobile
  // lands at scroll 0, and ScrollTrigger can init late there). Scrolling
  // past the first slice keeps it visible.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 350);
    return () => clearTimeout(t);
  }, []);
  const copyVisible = revealed || progress > 0.015;

  return (
    <section id="top" className="hero-stage" ref={stageRef}>
      <div className="hero-sticky">
        <video
          ref={videoRef}
          className="hero-video"
          src="/videos/ellen-cabelo.mp4"
          poster="/images/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-scrim" />

        <div className="hero-content">
          <div className={`hero-copy ${copyVisible ? "is-visible" : ""}`}>
            <p className="hero-kicker">ITÁPOLIS — SP</p>
            <h1 className="hero-title">Ellen Gardelin</h1>
            <p className="hero-subtitle">
              Alisamentos &amp; Tratamentos Capilares
            </p>
            <p className="hero-meta">
              <span>Especialista em Alisamentos Orgânicos</span>
              <span>Atendimentos e Cursos</span>
            </p>
            <div className="hero-actions">
              <a
                href={WHATSAPP_AGENDAR}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-on-dark"
              >
                Agendar horário
              </a>
              <a href="#cursos" className="btn btn-ghost btn-on-dark">
                Conhecer os cursos
              </a>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Role para explorar</span>
          <span
            className="hero-scroll-cue-line"
            style={{ ["--cue-y" as string]: `${-100 + progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
