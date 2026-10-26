import { linkWhatsApp, site } from "@/site.config";
import { temas } from "@/conteudo";
import { BotaoSeta, Foto } from "./ui";
import { FiosHero } from "./FiosHero";
import { VeiosMadeira } from "./VeiosMadeira";

// celular: a foto aparece com ~260px; "220px" faz o navegador escolher o arquivo de 720px em vez do de 960px
// em telas 3x (diferença invisível nesse tamanho, ~10KB a menos na imagem que define o LCP)
const tamanhosFotoHero = "(min-width: 1024px) 400px, (min-width: 640px) 340px, 220px";

export function Hero() {
  return (
    <section id="inicio" className="faixa-escura relative overflow-hidden bg-marrom text-papel">
      {/* mesma textura de veios de madeira do Atendimento (antes: linhas verticais do tema) */}
      <VeiosMadeira />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 pt-10 pb-16 md:px-8 md:pt-16 md:pb-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-10">
        <div>
          {/* H1 único: o nome em letra manuscrita e, logo abaixo, a linha do CRP, como pede o guia. */}
          <h1>
            <span
              className="assinatura hero-entra block text-[clamp(3.6rem,14.5vw,8.6rem)] leading-[1.02] -tracking-[0.01em]"
              style={{ ["--atraso" as string]: "0ms" }}
            >
              {site.nome}
            </span>
            <span
              className="hero-entra mt-3 block text-[15px] leading-5 font-medium text-papel/90 md:text-[16px]"
              style={{ ["--atraso" as string]: "60ms" }}
            >
              Psicóloga - {site.crp}
            </span>
          </h1>

          <p
            className="hero-entra mt-9 max-w-[22ch] font-display text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-0.02em] text-balance"
            style={{ ["--atraso" as string]: "120ms" }}
          >
            <span className="font-bold">Terapia para adultos,</span>{" "}
            <span className="peso-leve">com conversa direta e sem julgamento.</span>
          </p>

          <p
            className="hero-entra mt-5 text-[17px] leading-7 text-papel/85 md:text-[18px] md:leading-[28px]"
            style={{ ["--atraso" as string]: "170ms" }}
          >
            Presencial em Araçatuba ou online.
          </p>

          <div
            className="hero-entra mt-8 flex flex-wrap items-start gap-x-6 gap-y-4"
            style={{ ["--atraso" as string]: "220ms" }}
          >
            <div className="flex flex-col gap-2">
              <BotaoSeta href={linkWhatsApp()}>Chamar no WhatsApp</BotaoSeta>
              <p className="pl-5 text-[15px] leading-5 text-papel/80">Um oi já basta.</p>
            </div>
            <a
              href="#como-funciona"
              className="min-h-12 content-center text-[16px] font-semibold text-papel underline decoration-papel/40 underline-offset-[6px] hover:decoration-papel"
            >
              Como a terapia funciona
            </a>
          </div>
        </div>

        {/* moldura dos fios (FiosHero.tsx); o mt dá espaço aos fios que passam por cima da foto */}
        <div className="relative mx-auto mt-8 w-full max-w-[260px] sm:max-w-[340px] lg:mt-0 lg:mr-0 lg:max-w-[400px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-linho">
            <Foto
              nome="franciny-ruy-hero"
              alt="Franciny Ruy, psicóloga em Araçatuba, sorrindo, de colete terracota, em frente a uma parede clara"
              sizes={tamanhosFotoHero}
              posicao="50% 20%"
              prioridade
            />
          </div>
          <FiosHero />
        </div>
      </div>
    </section>
  );
}

// Fita tipográfica com os temas no fim do hero: palavras grandes alternando peso 700 e 300,
// separadas por uma folhinha terracota, deslizando devagar (para com movimento reduzido).
function FolhaPequena() {
  return (
    <svg viewBox="0 0 20 32" aria-hidden className="h-[0.5em] w-auto shrink-0">
      <path d="M10 31C2 24 1 11 10 1c9 10 8 23 0 30Z" fill="var(--terracota)" />
    </svg>
  );
}

function Tema({ tema, i }: { tema: string; i: number }) {
  return (
    <li className="flex shrink-0 items-center gap-[0.55em] pr-[0.55em]">
      <span className={i % 2 === 0 ? "font-bold" : "peso-leve"}>{tema}</span>
      <FolhaPequena />
    </li>
  );
}

export function FaixaTemas() {
  return (
    <section aria-labelledby="temas-titulo" className="faixa-escura faixa-arcos bg-marrom pb-16 text-papel md:pb-24">
      <h2 id="temas-titulo" className="sr-only">
        Temas que eu atendo
      </h2>
      <div className="overflow-hidden border-y border-papel/15 py-5 md:py-7">
        <div className="trilho font-display text-[34px] leading-[1.1] tracking-[-0.02em] whitespace-nowrap md:text-[56px]">
          {/* duas metades iguais (temas 2x cada) para o deslize de -50% não ter emenda;
              só a primeira lista é lida pelo leitor de tela */}
          <ul className="flex">
            {temas.map((t, i) => (
              <Tema key={t} tema={t} i={i} />
            ))}
          </ul>
          <ul aria-hidden className="flex">
            {temas.map((t, i) => (
              <Tema key={t} tema={t} i={i + temas.length} />
            ))}
          </ul>
          <ul aria-hidden className="flex">
            {[...temas, ...temas].map((t, i) => (
              <Tema key={`${t}-${i}`} tema={t} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
