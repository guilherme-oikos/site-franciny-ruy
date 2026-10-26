import type { ReactNode } from "react";

type Tom = "claro" | "escuro";

// Nome da seção, aberto por um fio curto: um nó pequeno que se desfaz numa linha reta até a bolinha.
// É a moldura do hero (emaranhado que vira ordem) em miniatura. Linha desenhada, não o arquivo dos balões.
export function Etiqueta({ children, tom = "claro" }: { children: ReactNode; tom?: Tom }) {
  const claro = tom === "claro";
  return (
    <p
      className={`inline-flex items-center gap-3 text-[13px] leading-5 font-semibold tracking-[0.14em] uppercase ${
        claro ? "text-marrom" : "text-papel"
      }`}
    >
      <svg viewBox="0 0 44 12" fill="none" aria-hidden className="h-3 w-11 shrink-0 overflow-visible">
        <path
          d="M1 9.5C5 9.5 11 7 11 3.5 11 1 7.5 1 7.5 4 7.5 7 12 6 16 6L37 6"
          stroke={claro ? "var(--terracota)" : "var(--papel)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40.5" cy="6" r="2" fill={claro ? "var(--terracota)" : "var(--papel)"} />
      </svg>
      {children}
    </p>
  );
}

export function Seta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Botão em pílula com círculo de seta. "papel" vai sobre fundos escuros, "marrom" sobre linho.
// No hover a pílula inverte (como no Garden Eight).
export function BotaoSeta({
  href,
  children,
  variante = "papel",
  className = "",
  externo = true,
  id,
}: {
  href: string;
  children: ReactNode;
  variante?: "papel" | "marrom" | "contorno-claro";
  className?: string;
  externo?: boolean;
  id?: string;
}) {
  const estilos = {
    papel: "bg-papel text-marrom hover:bg-terracota hover:text-papel",
    marrom: "bg-marrom text-papel hover:bg-verde-mata",
    "contorno-claro": "text-papel ring-1 ring-papel/50 hover:bg-papel hover:text-marrom",
  }[variante];
  const circulo = {
    papel: "bg-terracota text-papel group-hover:bg-papel group-hover:text-terracota",
    marrom: "bg-papel text-marrom",
    "contorno-claro": "bg-papel text-marrom group-hover:bg-marrom group-hover:text-papel",
  }[variante];

  return (
    <a
      id={id}
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener" } : {})}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[16px] font-semibold transition-colors duration-300 ${estilos} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`grid size-9 place-items-center rounded-full transition-all duration-300 group-hover:rotate-45 ${circulo}`}
      >
        <Seta className="size-4" />
      </span>
    </a>
  );
}

// Folha simples de duas curvas, como pede o guia (uma cor por peça)
export function Folha({ className = "", cor = "var(--verde-folha)" }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" aria-hidden className={className}>
      <path d="M60 192C14 150 10 70 60 8c50 62 46 142 0 184Z" stroke={cor} strokeWidth="2" />
      <path d="M60 30v162" stroke={cor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Foto responsiva em WebP já gerada em 480, 720 e 960 px (ver scripts/imagens.mjs)
export function Foto({
  nome,
  alt,
  sizes,
  className = "",
  prioridade = false,
  posicao = "50% 30%",
}: {
  nome: string;
  alt: string;
  sizes: string;
  className?: string;
  prioridade?: boolean;
  posicao?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/img/${nome}-720.webp`}
      srcSet={`/img/${nome}-480.webp 480w, /img/${nome}-720.webp 720w, /img/${nome}-960.webp 960w`}
      sizes={sizes}
      width={960}
      height={1280}
      alt={alt}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : "auto"}
      decoding={prioridade ? "sync" : "async"}
      style={{ objectPosition: posicao }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
