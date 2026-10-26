// Moldura do hero: três fios nas cores do desenho dos balões (taupe, terracota e papel) saem de um
// emaranhado no canto de baixo da foto, sobem pela lateral e cruzam o topo em ordem, terminando em
// três bolinhas. É a mesma ideia da seção Como funciona, contada sem palavras.
// O fio terracota continua como a linha que acompanha a rolagem (FioRolagem.tsx), a partir de #ponta-fio.
// Linhas desenhadas, não o arquivo dos balões: a regra de uma ilustração dos balões por peça continua.
// Coordenadas: viewBox 132x165, com a foto ocupando de (18, 18.6) a (118, 151.7).
const fios = [
  {
    cor: "var(--taupe)",
    d: "M30 150c-14 4-20-8-10-14s20 4 12 12-22 2-16-10 22-6 18 6c-2 6-10 6-12 0C8 128 6 118 6 100L6 18Q6 6 18 6L122 6",
    ponta: 6,
  },
  {
    cor: "var(--terracota)",
    d: "M26 146c10-12 22-2 14 8s-24 0-18-12 26-4 20 8c-3 5-9 4-10-2C11 126 10 116 10 100L10 20Q10 10 20 10L122 10",
    ponta: 10,
  },
  {
    cor: "var(--papel)",
    d: "M34 154c-8-10 4-22 14-14s0 22-12 16-6-26 6-20c6 3 5 10 0 12C16 130 14 118 14 100L14 22Q14 14 22 14L122 14",
    ponta: 14,
  },
];

// Os fios se desenham só com CSS, já na primeira pintura (sem esperar o JavaScript carregar):
// ver .fios-hero em globals.css.
export function FiosHero() {
  return (
    <svg
      viewBox="0 0 132 165"
      preserveAspectRatio="none"
      aria-hidden
      className="fios-hero pointer-events-none absolute top-[-14%] left-[-18%] h-[124%] w-[132%] overflow-visible"
    >
      {fios.map((f, i) => (
        <path
          key={f.cor}
          className="fio"
          d={f.d}
          pathLength={1}
          fill="none"
          stroke={f.cor}
          strokeOpacity={i === 2 ? 0.8 : 1}
          // espessura em unidades do viewBox (0,6 dá ~2,4px no desktop e ~1,6px no celular).
          // Não usar vector-effect="non-scaling-stroke": com pathLength={1}, o Chrome aplica o
          // tracejado em pixels de tela e o fio aparece quebrado.
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ ["--i" as string]: i }}
        />
      ))}
      {fios.map((f, i) => (
        <circle
          key={f.cor}
          id={i === 1 ? "ponta-fio" : undefined}
          className="ponta"
          cx="124"
          cy={f.ponta}
          r="1.7"
          fill={f.cor}
        />
      ))}
    </svg>
  );
}
