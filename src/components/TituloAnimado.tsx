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
  animado = true,
}: {
  partes: Parte[];
  as?: ElementType;
  className?: string;
  corLeve?: string;
  id?: string;
  // false: o título aparece parado, sem o efeito palavra a palavra (ex.: Dúvidas)
  animado?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animado) return;
    // Dispara pela posição do título na tela, a cada rolagem. O IntersectionObserver antigo, com margem
    // para fora da tela, soltava a animação antes de o título aparecer e falhava em seções no iPhone.
    // O título que já ficou para trás (ex.: link do menu) também é liberado (top menor que o limite).
    let agendado = false;
    const checa = () => {
      agendado = false;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visivel");
        window.removeEventListener("scroll", agenda);
        window.removeEventListener("resize", agenda);
      }
    };
    const agenda = () => {
      if (!agendado) {
        agendado = true;
        requestAnimationFrame(checa);
      }
    };
    window.addEventListener("scroll", agenda, { passive: true });
    window.addEventListener("resize", agenda);
    checa();
    return () => {
      window.removeEventListener("scroll", agenda);
      window.removeEventListener("resize", agenda);
    };
  }, [animado]);

  const completo = partes.map((p) => p.texto).join("");
  let i = 0;

  if (!animado) {
    return (
      <Tag id={id} className={className}>
        {partes.map((p, pi) => (
          <span key={pi} className={p.leve ? `peso-leve ${corLeve}` : undefined}>
            {p.texto}
          </span>
        ))}
      </Tag>
    );
  }

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
