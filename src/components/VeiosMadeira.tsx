// Fundo do Atendimento: veios de madeira, como o tampo de uma mesa visto bem de perto
// (o guia pede madeira no consultório; ainda não há foto dele). Linhas onduladas que contornam
// dois nós, em papel com opacidade baixa, paradas.
// O desenho é um SVG estático gerado por scripts/veios.mjs e usado como fundo: fora do HTML,
// a página fica leve e o arquivo vai para o cache. Sem JavaScript.
export function VeiosMadeira() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[url('/img/veios-madeira.svg')] bg-cover bg-center"
    />
  );
}
