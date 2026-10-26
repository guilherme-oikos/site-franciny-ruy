"use client";

import { useEffect, useRef, type ElementType } from "react";

export type Parte = { texto: string; leve?: boolean };

// Título com mistura de peso (700 + 300) que entra palavra a palavra, de leve, ao chegar na tela.
// Era letra a letra: em rolagem rápida o título aparecia pela metade ("At", "P"). Por palavra,
// com o gatilho um pouco antes da tela e o atraso limitado, ele está inteiro quando a pessoa lê.
// O texto completo fica no aria-label; as palavras soltas ficam escondidas do leitor de tela.
export function TituloAnimado({
  partes,
  as: Tag = "h2",
  className = "",
  corLeve = "text-terracota-escura",
  id,
}: {
  partes: Parte[];
  as?: ElementType;
  className?: string;
  corLeve?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        // também libera o título que já ficou para trás (ex.: quem chega por um link do menu)
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          el.classList.add("visivel");
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const completo = partes.map((p) => p.texto).join("");
  let i = 0;

  return (
    <Tag ref={ref} id={id} aria-label={completo} className={`titulo-anima ${className}`}>
      {partes.map((p, pi) => (
        <span key={pi} aria-hidden className={p.leve ? `peso-leve ${corLeve}` : undefined}>
          {p.texto.split(/(\s+)/).map((pedaco, wi) =>
            /^\s+$/.test(pedaco) ? (
              " "
            ) : (
              <span key={wi} className="palavra" style={{ ["--i" as string]: Math.min(i++, 8) }}>
                {pedaco}
              </span>
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
