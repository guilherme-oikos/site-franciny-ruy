"use client";

import { useEffect, useState } from "react";
import { linkWhatsApp, menu, site } from "@/site.config";
import { Seta } from "./ui";

// Barra de informações + menu em pílulas (a seção ativa fica preenchida em terracota).
// Ao rolar, o menu vira uma cápsula flutuante. No celular, vira um painel simples.
export function Topo() {
  const [ativa, setAtiva] = useState<string>("");
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    const secoes = menu
      .map((m) => document.getElementById(m.id))
      .filter((s): s is HTMLElement => Boolean(s));
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => obs.observe(s));
    const topo = document.getElementById("inicio");
    const obsTopo = new IntersectionObserver(([e]) => e.isIntersecting && setAtiva(""), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (topo) obsTopo.observe(topo);

    return () => {
      window.removeEventListener("scroll", aoRolar);
      obs.disconnect();
      obsTopo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  return (
    <>
      <div className="faixa-escura bg-marrom text-papel/85">
        <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[13px] leading-5 font-medium sm:justify-between sm:py-0 md:px-8">
          <p className="hidden sm:block">Araçatuba/SP · Presencial e online</p>
          {/* No celular o número sai daqui: o WhatsApp já está na pílula do topo fixo, logo abaixo. */}
          <p className="flex flex-wrap items-center justify-center gap-x-5">
            <span className="sm:hidden">Araçatuba/SP · Presencial e online</span>
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="hidden min-h-11 items-center underline-offset-4 hover:underline sm:inline-flex">
              WhatsApp {site.whatsapp.exibicao}
            </a>
          </p>
        </div>
      </div>

      <header
        className={`faixa-escura sticky top-0 z-50 px-2 pt-2 transition-colors duration-300 motion-reduce:transition-none md:px-4 ${
          rolou ? "" : "bg-marrom"
        }`}
      >
        <div
          className={`mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-1.5 rounded-full pr-2 pl-3 transition-[background-color,box-shadow] min-[360px]:gap-2 min-[360px]:pl-5 sm:gap-4 duration-300 motion-reduce:transition-none md:pl-6 ${
            rolou ? "bg-marrom/92 shadow-none ring-1 ring-papel/12 backdrop-blur-md" : "bg-marrom"
          }`}
        >
          <a href="#inicio" className="flex flex-col leading-none text-papel" aria-label={`${site.nome}, início`}>
            <span className="assinatura text-[24px] leading-[30px] min-[360px]:text-[28px]">{site.nome}</span>
            <span className="text-[11px] leading-4 font-medium whitespace-nowrap text-papel/80 min-[360px]:text-[12px]">Psicóloga - {site.crp}</span>
          </a>

          <nav aria-label="Seções" className="hidden lg:block">
            <ul className="flex items-center gap-1.5">
              {menu.map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    aria-current={ativa === m.id ? "location" : undefined}
                    className={`block rounded-full px-4 py-2 text-[15px] font-medium text-papel ring-1 transition-colors duration-300 hover:ring-papel/40 ${
                      ativa === m.id ? "bg-terracota ring-terracota" : "ring-papel/15"
                    }`}
                  >
                    {m.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* O WhatsApp fica no topo fixo também no celular: é a única ação do site.
              Abaixo de 640px a pílula perde a seta e o "Menu" vira só o ícone, para caber ao lado do nome. */}
          <div className="flex items-center gap-1.5 min-[360px]:gap-2">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-papel pr-3 pl-3 text-[14px] font-semibold text-marrom transition-colors hover:bg-terracota hover:text-papel min-[360px]:pr-4 min-[360px]:pl-4 min-[360px]:text-[15px] sm:py-1 sm:pr-1"
            >
              WhatsApp
              <span className="hidden size-9 place-items-center rounded-full bg-terracota text-papel transition-all duration-300 group-hover:rotate-45 group-hover:bg-papel group-hover:text-terracota sm:grid">
                <Seta className="size-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-celular"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-papel ring-1 ring-papel/30 sm:px-4 lg:hidden"
            >
              <span aria-hidden className="flex w-4 flex-col gap-1">
                <span className={`h-0.5 rounded bg-current transition-transform ${aberto ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-0.5 rounded bg-current transition-transform ${aberto ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
              <span className="sr-only sm:not-sr-only">{aberto ? "Fechar" : "Menu"}</span>
            </button>
          </div>
        </div>

        <div
          id="menu-celular"
          hidden={!aberto}
          className="mx-auto mt-2 max-w-[1240px] rounded-[var(--radius-lg)] bg-marrom p-4 ring-1 ring-papel/15 lg:hidden"
        >
          <nav aria-label="Seções">
            <ul className="grid gap-2">
              {menu.map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    onClick={() => setAberto(false)}
                    aria-current={ativa === m.id ? "location" : undefined}
                    className={`flex min-h-12 items-center rounded-full px-5 text-[17px] font-medium ring-1 ring-papel/15 ${
                      ativa === m.id ? "bg-terracota text-papel" : "text-papel"
                    }`}
                  >
                    {m.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener"
            className="mt-3 flex min-h-12 items-center justify-between rounded-full bg-papel py-1 pr-1 pl-5 text-[17px] font-semibold text-marrom"
          >
            Chamar no WhatsApp
            <span className="grid size-10 place-items-center rounded-full bg-terracota text-papel">
              <Seta className="size-4" />
            </span>
          </a>
        </div>
      </header>
    </>
  );
}
