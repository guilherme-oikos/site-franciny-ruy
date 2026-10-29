import { linkWhatsApp } from "@/site.config";
import { duvidas } from "@/conteudo";
import { TituloAnimado } from "./TituloAnimado";
import { Etiqueta, Folha } from "./ui";

// Perguntas frequentes em <details>: abre e fecha sem JS e o texto fica no HTML.
// O mesmo conteúdo alimenta o JSON-LD FAQPage (src/components/DadosEstruturados.tsx).
export function Duvidas() {
  return (
    <section id="duvidas" className="relative overflow-hidden bg-linho py-20 md:py-28">
      <Folha cor="var(--terracota)" className="pointer-events-none absolute bottom-10 left-8 hidden w-32 rotate-[-28deg] lg:block" />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Etiqueta>Dúvidas</Etiqueta>
          <TituloAnimado
            className="titulo-2 mt-5"
            partes={[{ texto: "Perguntas comuns antes da " }, { texto: "primeira sessão", leve: true }]}
          />
          <div className="mt-6">
            {/* sem botão aqui: o convite com o botão vem logo depois, no fechamento do rodapé */}
            <p className="max-w-[30ch] text-[17px] leading-7 text-marrom-suave">
              Ficou alguma dúvida que não está aqui?{" "}
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener"
                className="font-semibold text-terracota-escura underline underline-offset-4"
              >
                Me chama no WhatsApp
              </a>
              .
            </p>
          </div>
        </div>

        {/* RASCUNHO: respostas para a Franciny aprovar (src/conteudo.ts) */}
        <div className="divide-y divide-marrom/15 border-y border-marrom/15">
          {duvidas.map((d) => (
            <details key={d.pergunta} className="group">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <h3 className="font-display text-[20px] leading-[26px] font-bold md:text-[22px] md:leading-7">
                  {d.pergunta}
                </h3>
                <span
                  aria-hidden
                  className="sinal-mais grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-marrom/25 transition-transform duration-300 group-open:bg-terracota group-open:text-papel group-open:ring-terracota"
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="space-y-4 pb-7 text-[17px] leading-7 md:pr-16">
                {d.resposta.map((p, i) => (
                  <p key={p} className={i === 0 ? "" : "text-marrom-suave"}>
                    {p}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
