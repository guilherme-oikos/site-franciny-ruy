"use client";

import { useEffect, useRef, useState } from "react";

// Botão de pausa da faixa de temas (WCAG 2.2.2: movimento que dura mais de 5s precisa de pausa).
// A faixa também para sozinha quando sai da tela. Com movimento reduzido ela já fica parada,
// então o botão nem aparece (regra em globals.css).
export function PausaTemas() {
  const ref = useRef<HTMLButtonElement>(null);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const faixa = ref.current?.closest(".faixa-arcos");
    if (!faixa) return;
    faixa.toggleAttribute("data-pausado", pausado);
    const obs = new IntersectionObserver(([e]) => faixa.toggleAttribute("data-fora", !e.isIntersecting));
    obs.observe(faixa);
    return () => obs.disconnect();
  }, [pausado]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setPausado((v) => !v)}
      aria-pressed={pausado}
      aria-label={pausado ? "Continuar a faixa de temas" : "Pausar a faixa de temas"}
      className="pausa-temas absolute top-1/2 right-3 z-[3] grid -translate-y-1/2 size-11 place-items-center rounded-full bg-marrom text-papel ring-1 ring-papel/30 transition-colors hover:ring-papel/60 md:right-6"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        {pausado ? (
          <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
        ) : (
          <path d="M4.5 2.5v11M11.5 2.5v11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
