"use client";

import { useState } from "react";
import { mapa, site } from "@/site.config";
import { Seta } from "./ui";

// O mapa do Google só carrega quando a pessoa pede: a página fica leve e o Google não recebe
// visita nenhuma sem um clique.
export function Mapa() {
  const [carregar, setCarregar] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-papel text-marrom">
      {carregar ? (
        <iframe
          src={mapa.embed}
          title={`Mapa do consultório: ${site.enderecoCompleto}`}
          className="block h-[380px] w-full md:h-[400px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="relative flex h-[380px] flex-col items-start justify-end gap-5 p-6 md:h-[400px] md:p-10">
          {/* ruas desenhadas à mão, só de enfeite. O pino fica no alto do desenho para não passar
              por cima do endereço no celular, onde o texto quebra em mais linhas. */}
          <svg aria-hidden viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="var(--taupe)" strokeOpacity=".35" strokeWidth="14" strokeLinecap="round">
              <path d="M-20 120C160 140 320 90 520 130S760 170 840 150" />
              <path d="M180 -20C200 120 170 260 230 420" />
              <path d="M560 -20C540 140 600 260 580 420" />
              <path d="M-20 300C200 280 420 320 840 290" />
            </g>
            <circle cx="400" cy="110" r="40" fill="var(--terracota)" fillOpacity=".16" />
            <circle cx="400" cy="110" r="12" fill="var(--terracota)" />
          </svg>
          <div className="relative">
            <p className="font-display text-[22px] leading-7 font-bold">{site.enderecoCompleto}</p>
            <p className="legenda mt-1 text-marrom-suave">Atendimento com horário marcado</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCarregar(true)}
              className="min-h-12 rounded-full bg-marrom px-5 text-[16px] font-semibold text-papel transition-colors hover:bg-verde-mata"
            >
              Ver o mapa aqui
            </button>
            <a
              href={mapa.abrir}
              target="_blank"
              rel="noopener"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[16px] font-semibold ring-1 ring-marrom/30 transition-colors hover:bg-marrom hover:text-papel"
            >
              Abrir no Google Maps
              <Seta className="size-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
