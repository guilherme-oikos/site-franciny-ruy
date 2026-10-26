import { linkWhatsApp, site } from "@/site.config";
import { VeiosMadeira } from "./VeiosMadeira";
import { Mapa } from "./Mapa";
import { TituloAnimado } from "./TituloAnimado";
import { Etiqueta, Foto, Seta } from "./ui";

type Linha = {
  titulo: string;
  detalhe: string;
  nota?: string;
  duracao?: string;
  marcar?: string;
};

const linhas: Linha[] = [
  {
    titulo: "Sessão presencial",
    detalhe: site.enderecoCompleto,
    duracao: "Média de 50 min",
    marcar: "Olá, Franciny. Vim pelo site e gostaria de marcar uma sessão presencial.",
  },
  {
    titulo: "Sessão online",
    detalhe: "De onde você estiver, com privacidade e internet estável",
    duracao: "Média de 50 min",
    marcar: "Olá, Franciny. Vim pelo site e gostaria de marcar uma sessão online.",
  },
  {
    titulo: "Horário",
    // PENDENTE: horário provisório, confirmar com ela (src/site.config.ts)
    detalhe: site.horario.texto,
    nota: "Sempre com horário marcado antes",
  },
  {
    titulo: "Convênio",
    detalhe: `${site.convenio}. Os demais atendimentos são particulares.`,
  },
];

export function Atendimento() {
  return (
    <section id="atendimento" className="faixa-escura relative overflow-hidden bg-marrom py-20 text-papel md:py-28">
      <VeiosMadeira />
      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <Etiqueta tom="escuro">Atendimento</Etiqueta>
            <TituloAnimado
              className="titulo-2 mt-5"
              corLeve="text-papel"
              partes={[{ texto: "Atendimento em Araçatuba " }, { texto: "e online", leve: true }]}
            />
            <p className="mt-5 max-w-[46ch] text-[18px] leading-7 text-papel/85">
              Atendo adultos, a partir de 18 anos, no consultório ou online. Para marcar, é só chamar no{" "}
              <a href={linkWhatsApp()} target="_blank" rel="noopener" className="font-semibold text-papel underline underline-offset-4">
                WhatsApp {site.whatsapp.exibicao}
              </a>
              .
            </p>
          </div>
          <div className="w-[150px] shrink-0 self-start overflow-hidden rounded-full ring-1 ring-papel/20 md:w-[190px] md:self-end">
            <div className="aspect-[3/4]">
              <Foto
                nome="franciny-ruy-atendimento"
                alt="Franciny Ruy, psicóloga em Araçatuba, com o cabelo preso e expressão serena"
                sizes="(min-width: 768px) 190px, 150px"
                posicao="50% 20%"
              />
            </div>
          </div>
        </div>

        <ul className="mt-12 overflow-hidden rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--papel)_6%,var(--marrom))] ring-1 ring-papel/12 md:mt-16">
          {linhas.map((l, i) => (
            <li
              key={l.titulo}
              className={`grid gap-x-6 gap-y-2 px-5 py-6 md:grid-cols-[1fr_1.5fr_130px_210px] md:items-center md:px-8 md:py-7 ${
                i > 0 ? "border-t border-papel/12" : ""
              }`}
            >
              <h3 className="font-display text-[22px] leading-7 font-bold">{l.titulo}</h3>
              <p className="text-[17px] leading-7 text-papel/90">
                {l.detalhe}
                {l.nota && <span className="block text-[15px] leading-6 text-papel/70">{l.nota}</span>}
              </p>
              {l.duracao ? <p className="legenda text-papel/80">{l.duracao}</p> : <span className="hidden md:block" />}
              <div className={`md:justify-self-end ${l.marcar ? "" : "hidden md:block"}`}>
                {l.marcar && (
                  <a
                    href={linkWhatsApp(l.marcar)}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Chamar no WhatsApp para ${l.titulo.toLowerCase()}`}
                    className="group mt-2 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold whitespace-nowrap ring-1 ring-papel/50 transition-colors hover:bg-papel hover:text-marrom md:mt-0"
                  >
                    Chamar no WhatsApp
                    <Seta className="size-4 transition-transform group-hover:rotate-45" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 md:mt-8">
          <Mapa />
        </div>
      </div>
    </section>
  );
}
