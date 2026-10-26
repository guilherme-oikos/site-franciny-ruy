"use client";

import { useId, useState } from "react";
import { mitos } from "@/conteudo";
import { TituloAnimado } from "./TituloAnimado";
import { Etiqueta } from "./ui";

function CartaoMito({ mito, resposta, n }: { mito: string; resposta: string[]; n: number }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  return (
    <li className="rounded-[var(--radius-lg)] bg-papel text-marrom">
      <h3>
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls={id}
          onClick={() => setAberto((v) => !v)}
          className="group flex w-full items-start gap-4 rounded-[var(--radius-lg)] p-6 text-left md:gap-6 md:p-8"
        >
          <span className="legenda mt-1.5 shrink-0 text-terracota-escura">0{n}</span>
          <span className="flex-1">
            <span className="block font-display text-[22px] leading-[28px] font-bold tracking-[-0.01em] md:text-[26px] md:leading-[32px]">
              &ldquo;{mito}&rdquo;
            </span>
            <span className="mt-3 inline-block text-[15px] font-semibold text-terracota-escura underline decoration-terracota-escura/40 underline-offset-4 group-hover:decoration-terracota-escura">
              {aberto ? "Fechar" : "Ver o que eu respondo"}
            </span>
          </span>
          <span
            aria-hidden
            className={`grid size-10 shrink-0 place-items-center rounded-full bg-terracota text-papel transition-transform duration-300 ${
              aberto ? "rotate-45" : ""
            }`}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      {/* a resposta fica sempre no HTML (o Google lê), só a altura abre e fecha, em CSS
          (grid de 0fr para 1fr, ver .resposta-mito em globals.css), sem biblioteca de animação */}
      <div id={id} inert={!aberto} data-aberta={aberto || undefined} className="resposta-mito">
        <div className="overflow-hidden">
        {/* a folha de duas curvas se desenha ao lado do começo da resposta, como uma rubrica dela;
            some quando a resposta fecha (.folha-resposta em globals.css). No desktop o texto
            continua alinhado ao do mito: o recuo desconta a coluna da folha. */}
        <div className="grid grid-cols-[16px_1fr] gap-3 px-6 pb-7 text-[17px] leading-7 md:pr-24 md:pb-9 md:pl-[calc(4.75rem-28px)]">
          <svg viewBox="0 0 120 200" aria-hidden className="folha-resposta mt-1 h-[26px] w-4 overflow-visible" data-aberta={aberto || undefined}>
            <path pathLength={1} d="M60 192C14 150 10 70 60 8c50 62 46 142 0 184Z" />
            <path pathLength={1} d="M60 30v162" />
          </svg>
          <div className="space-y-4">
            {resposta.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        </div>
      </div>
    </li>
  );
}

export function Mitos() {
  return (
      <section id="mitos" className="faixa-terracota bg-terracota py-20 text-papel md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Etiqueta tom="escuro">Mitos sobre terapia</Etiqueta>
            <TituloAnimado
              className="titulo-2 mt-5"
              corLeve="text-papel"
              partes={[{ texto: "Três ideias sobre terapia " }, { texto: "que eu escuto muito", leve: true }]}
            />
            <p className="mt-5 max-w-[34ch] text-[18px] leading-7">
              Elas aparecem antes da primeira sessão e, às vezes, atrasam a decisão de procurar ajuda. Aqui
              está o que eu costumo responder.
            </p>
          </div>

          {/* RASCUNHO: respostas aos mitos para a Franciny aprovar (src/conteudo.ts) */}
          <ul className="grid gap-4 md:gap-5">
            {mitos.map((m, i) => (
              <CartaoMito key={m.mito} mito={m.mito} resposta={m.resposta} n={i + 1} />
            ))}
          </ul>
        </div>
      </section>
  );
}
