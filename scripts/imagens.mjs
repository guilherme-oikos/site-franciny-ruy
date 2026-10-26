// Gera as fotos e os balões em WebP para o site.
// Uso: node scripts/imagens.mjs  (lê das pastas FOTOS e IDENTIDADE VISUAL do cliente)
import sharp from "sharp";
import path from "node:path";

const raiz = path.resolve("..", "..");
const fotos = path.join(raiz, "FOTOS");
const saida = path.resolve("public", "img");

// nome no site -> arquivo original
const mapa = {
  "franciny-ruy-hero": "WhatsApp Image 2026-10-23 at 12.59.09.jpeg",
  "franciny-ruy-sorriso": "WhatsApp Image 2026-10-23 at 12.59.09 (2).jpeg",
  "franciny-ruy-rabo-de-cavalo": "WhatsApp Image 2026-10-23 at 12.59.09 (7).jpeg",
  "franciny-ruy-serena": "WhatsApp Image 2026-10-23 at 12.59.09 (1).jpeg",
  "franciny-ruy-risada": "WhatsApp Image 2026-10-23 at 12.59.09 (3).jpeg",
  "franciny-ruy-retrato": "WhatsApp Image 2026-10-23 at 12.59.09 (4).jpeg",
  "franciny-ruy-atendimento": "WhatsApp Image 2026-10-23 at 12.59.09 (6).jpeg",
};

const larguras = [480, 720, 960];

for (const [nome, arquivo] of Object.entries(mapa)) {
  for (const w of larguras) {
    await sharp(path.join(fotos, arquivo))
      .resize({ width: w })
      // aquecimento leve e um pouco de contraste, como pede o guia (sem filtro forte)
      .recomb([
        [1.02, 0, 0],
        [0, 1.0, 0],
        [0, 0, 0.97],
      ])
      .linear(1.04, -4)
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(saida, `${nome}-${w}.webp`));
  }
}

// balões: só converte, sem recolorir
const baloes = path.join(raiz, "IDENTIDADE VISUAL", "assets", "baloes-brasilidade.png");
for (const w of [720, 1200]) {
  await sharp(baloes)
    .resize({ width: w })
    .webp({ quality: 86, alphaQuality: 90, effort: 6 })
    .toFile(path.join(saida, `baloes-brasilidade-${w}.webp`));
}

console.log("ok");
