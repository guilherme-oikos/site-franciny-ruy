import { site } from "@/site.config";
import { sobre } from "@/conteudo";
import { TituloAnimado } from "./TituloAnimado";
import { Etiqueta, Folha, Foto } from "./ui";

const leque = [
  {
    nome: "franciny-ruy-serena",
    alt: "Franciny Ruy, psicóloga, com olhar tranquilo e braços cruzados",
    giro: "-rotate-[7deg] translate-y-6",
    posicao: "50% 25%",
  },
  {
    nome: "franciny-ruy-sorriso",
    alt: "Franciny Ruy, psicóloga clínica em Araçatuba, sorrindo de braços cruzados",
    giro: "z-10",
    posicao: "50% 22%",
  },
  {
    nome: "franciny-ruy-rabo-de-cavalo",
    alt: "Franciny Ruy, psicóloga, sorrindo, com o cabelo preso em rabo de cavalo",
    giro: "rotate-[7deg] translate-y-6",
    posicao: "50% 22%",
  },
];

const fatos = [
  { grande: `Desde ${site.desde}`, texto: "atendendo como psicóloga clínica" },
  { grande: "TCC", texto: "Terapia Cognitivo Comportamental, com pós-graduação na área (FAVENI)" },
  { grande: "Presencial e online", texto: "no consultório em Araçatuba ou de onde você estiver" },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-linho pt-20 pb-24 md:pt-28 md:pb-32">
      <Folha cor="var(--terracota)" className="pointer-events-none absolute top-24 right-10 hidden w-32 rotate-[18deg] lg:block" />
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <Etiqueta>Sobre</Etiqueta>
          <TituloAnimado
            className="titulo-2 mt-5 max-w-[18ch]"
            partes={[{ texto: "Sou a Franciny, " }, { texto: "psicóloga clínica em Araçatuba", leve: true }]}
          />
        </div>

        {/* RASCUNHO: texto do "Sobre" para a Franciny aprovar (src/conteudo.ts) */}
        <div className="mx-auto mt-10 grid max-w-[980px] gap-6 text-[18px] leading-[30px] md:mt-14 md:grid-cols-2 md:gap-x-12">
          <div className="space-y-6">
            <p className="text-[20px] leading-[32px] font-semibold">{sobre[0]}</p>
            <p>{sobre[1]}</p>
          </div>
          <div className="space-y-6">
            <p>{sobre[2]}</p>
            <p>{sobre[3]}</p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[760px] items-start justify-center md:mt-20">
          {leque.map((f, i) => (
            <figure
              key={f.nome}
              className={`relative w-[38%] shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-papel ring-[6px] ring-linho md:w-[34%] ${f.giro} ${
                i === 0 ? "-mr-[7%]" : i === 2 ? "-ml-[7%]" : ""
              }`}
            >
              <div className="aspect-[3/4]">
                <Foto nome={f.nome} alt={f.alt} posicao={f.posicao} sizes="(min-width: 768px) 260px, 38vw" />
              </div>
            </figure>
          ))}
        </div>

        <ul className="mt-20 grid border-y border-marrom/15 md:mt-24 md:grid-cols-3">
          {fatos.map((f, i) => (
            <li
              key={f.grande}
              className={`px-4 py-8 text-center md:px-8 md:py-10 ${
                i > 0 ? "border-t border-marrom/15 md:border-t-0 md:border-l" : ""
              }`}
            >
              <p className="font-display text-[clamp(30px,3.4vw,42px)] leading-[1.1] font-bold tracking-[-0.02em]">
                {f.grande}
              </p>
              <p className="mx-auto mt-3 max-w-[26ch] text-[16px] leading-6 text-marrom-suave">{f.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
