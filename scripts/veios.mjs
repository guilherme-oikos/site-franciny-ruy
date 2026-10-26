// Gera public/img/veios-madeira.svg, o fundo de veios de madeira do Atendimento.
// Fica num arquivo à parte (e não dentro do HTML) para não pesar a página e ficar em cache.
// Uso: node scripts/veios.mjs
import { writeFileSync } from "node:fs";

const L = 1600;
const A = 1200;
const nos = [
  { x: L * 0.78, y: A * 0.3, r: 110 },
  { x: L * 0.16, y: A * 0.72, r: 75 },
];

let paths = "";
for (let y0 = -20, i = 0; y0 < A + 20; y0 += 18 + (i % 3) * 3, i++) {
  let d = "";
  for (let x = -20; x <= L + 20; x += 24) {
    let y = y0 + Math.sin(x / 260 + i * 0.7) * 5 + Math.sin(x / 90 + i) * 1.2;
    for (const n of nos) {
      const dx = (x - n.x) / (n.r * 2.6);
      const dy = y - n.y;
      y += Math.tanh(dy / (n.r * 0.6)) * Math.exp(-dx * dx) * n.r * 0.9 * Math.exp(-(dy * dy) / (n.r * n.r * 4));
    }
    d += `${d ? "L" : "M"}${x} ${Math.round(y)}`;
  }
  paths += `<path d="${d}" stroke-opacity="${i % 5 === 0 ? 0.11 : 0.07}"/>`;
}
for (const n of nos)
  for (const k of [1, 2, 3]) {
    const rx = Math.round(n.r * 0.35 * k);
    const ry = Math.round(n.r * 0.16 * k);
    paths += `<path d="M${Math.round(n.x - rx)} ${Math.round(n.y)}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0" stroke-opacity="0.07"/>`;
  }

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${A}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#fbf6ec" stroke-width="1.1">${paths}</svg>`;
writeFileSync(new URL("../public/img/veios-madeira.svg", import.meta.url), svg);
console.log("veios-madeira.svg:", Math.round(svg.length / 1024), "KB");
