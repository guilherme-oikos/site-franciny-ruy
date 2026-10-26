"use client";

import { useEffect, useRef, useState } from "react";
import { ideiasTcc } from "@/conteudo";

// Ilustração dos balões (PNG original, sem recolorir, girar nem recortar) com uma barra de arrastar.
// Arrastando do embaraçado para o em ordem, cada terço da barra desenha um dos três fios, acende a
// bolinha dele e troca a ideia mostrada embaixo. No fim, o balão organizado aparece inteiro.
// Tudo é máscara sobre o mesmo desenho: o que aparece são sempre os pixels originais.
// Por baixo fica o desenho inteiro bem apagado, para a pessoa ver para onde está indo.
// Sem JS, o desenho aparece completo (num <noscript>) e as três ideias ficam em lista (globals.css).
// Desempenho: o desenho só é baixado quando a seção chega perto da tela, e no celular vem a versão
// de 720px (90KB) em vez da de 1200px (190KB). Assim ele não disputa banda com a foto do hero.

// Coordenadas no viewBox 2000x835 (o desenho tem 2396x1000).
const fios = [
  "M630 318C760 400 900 452 1050 456S1300 440 1350 362",
  "M640 338C780 440 950 482 1150 486S1405 470 1480 438",
  "M640 356C760 482 950 582 1200 590S1500 566 1580 494",
];
// Bolinhas do balão organizado, na ordem das ideias: taupe, terracota e verde.
const bolinhas = [
  { cx: 1361, cy: 300 },
  { cx: 1606, cy: 236 },
  { cx: 1556, cy: 431 },
];

const limitar = (v: number) => Math.min(1, Math.max(0, v));

export function Baloes() {
  const [valor, setValor] = useState(0);
  const [arrastando, setArrastando] = useState(false);
  const [desenho, setDesenho] = useState<string>();
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setDesenho(innerWidth < 768 ? "/img/baloes-brasilidade-720.webp" : "/img/baloes-brasilidade-1200.webp");
        obs.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const p = valor / 100;
  const ativa = Math.min(ideiasTcc.length - 1, Math.floor(valor / 33.34));
  // quanto de cada fio já foi desenhado (cada um ocupa um terço da barra)
  const trecho = fios.map((_, i) => limitar(p * 3 - i));
  // o contorno do balão organizado vai aparecendo durante o último fio
  const contorno = limitar((p - 2 / 3) * 3);
  // no fim da barra o desenho fica "em ordem": o rótulo confirma e as três bolinhas acendem
  // em sequência, uma vez (halo em .acende, globals.css). Voltando a barra, tudo volta.
  const emOrdem = valor >= 100;

  return (
    <div ref={raiz} className="desembaraca" data-arrastando={arrastando || undefined} data-em-ordem={emOrdem || undefined}>
      <svg
        viewBox="0 0 2000 835"
        role="img"
        aria-label="Ilustração de dois balões de pensamento ligados por fios: no primeiro, linhas embaraçadas; no segundo, três bolinhas separadas e em ordem."
        className="mx-auto block h-auto w-full max-w-[820px]"
      >
        <defs>
          <mask id="mascara-baloes" maskUnits="userSpaceOnUse" x="0" y="0" width="2000" height="835">
            <rect x="0" y="0" width="830" height="835" fill="#fff" />
            <rect data-m x="1120" y="0" width="880" height="835" fill="#fff" style={{ opacity: contorno }} />
            {fios.map((d, i) => (
              <path
                key={d}
                data-m
                d={d}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth="64"
                strokeLinecap="round"
                strokeDasharray="1"
                style={{ strokeDashoffset: 1 - trecho[i] }}
              />
            ))}
            {bolinhas.map((b, i) => (
              <circle
                key={i}
                data-m
                cx={b.cx}
                cy={b.cy}
                r="100"
                fill="#fff"
                style={{ opacity: limitar((trecho[i] - 0.75) * 4) }}
              />
            ))}
          </mask>
        </defs>
        {desenho && <image href={desenho} width="2000" height="835" preserveAspectRatio="none" opacity="0.14" />}
        {desenho && (
          <image href={desenho} width="2000" height="835" preserveAspectRatio="none" mask="url(#mascara-baloes)" />
        )}
        {/* halos por cima das bolinhas: não pintam o desenho, só acendem em volta dele */}
        <g aria-hidden>
          {bolinhas.map((b, i) => (
            <circle
              key={i}
              className="acende"
              cx={b.cx}
              cy={b.cy}
              r="78"
              fill="none"
              strokeWidth="6"
              stroke={ideiasTcc[i].cor}
              style={{ ["--i" as string]: i }}
            />
          ))}
        </g>
      </svg>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/baloes-brasilidade-720.webp" alt="" width={720} height={300} className="mx-auto block h-auto w-full max-w-[820px]" />
      </noscript>

      <div className="desembaraca-controle mt-6 md:mt-8">
        <label
          htmlFor="arraste-baloes"
          className={`legenda block text-center transition-colors ${emOrdem ? "font-semibold text-terracota-escura" : "text-marrom-suave"}`}
        >
          {emOrdem ? "Em ordem. Aos poucos, é assim." : "Arraste para desembaraçar"}
        </label>
        <div className="relative mx-auto mt-2 max-w-[560px]">
          {/* trilho e parte preenchida desenhados por fora: o input fica transparente por cima */}
          <div aria-hidden className="absolute inset-x-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-marrom/15">
            <div className="h-full rounded-full bg-terracota" style={{ width: `${valor}%` }} />
          </div>
          <input
            id="arraste-baloes"
            type="range"
            min={0}
            max={100}
            step={1}
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            onPointerDown={() => setArrastando(true)}
            onPointerUp={() => setArrastando(false)}
            onPointerCancel={() => setArrastando(false)}
            aria-valuetext={`${ativa + 1} de ${ideiasTcc.length}: ${ideiasTcc[ativa].titulo}`}
            className="arraste relative block w-full"
          />
        </div>
      </div>

      {/* as três ideias ficam sempre à mostra (quem não arrasta lê tudo); a da posição da barra
          ganha destaque. Cada cartão inteiro é tocável e leva a barra até o fim do seu fio
          (o botão fica no título e o ::after dele cobre o cartão). Sem JS, viram lista comum. */}
      <ul className="desembaraca-ideias mx-auto mt-6 grid max-w-[560px] gap-2 md:mt-8 md:max-w-none md:grid-cols-3 md:gap-4">
        {ideiasTcc.map((ideia, i) => (
          <li
            key={ideia.titulo}
            data-ativa={ativa === i || undefined}
            className="relative rounded-[var(--radius-md)] p-4 md:p-5"
          >
            <h3 className="font-display text-[21px] leading-7 font-bold tracking-[-0.01em] md:text-[22px]">
              <button
                type="button"
                onClick={() => setValor(Math.round(((i + 1) / ideiasTcc.length) * 100))}
                aria-pressed={ativa === i}
                className="flex items-center gap-3 text-left after:absolute after:inset-0 after:rounded-[var(--radius-md)] after:content-[''] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-terracota-escura"
              >
                <span aria-hidden className="bolinha size-3 shrink-0 rounded-full" style={{ background: ideia.cor }} />
                {ideia.titulo}
              </button>
            </h3>
            <p className="mt-2 text-[17px] leading-7 text-marrom-suave">{ideia.texto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
