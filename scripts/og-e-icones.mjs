// Gera public/og.jpg (1200x630), src/app/icon.png, src/app/apple-icon.png e src/app/favicon.ico.
// Uso: node scripts/og-e-icones.mjs
// Precisa de internet (carrega as fontes do Google só aqui, na geração) e do Chromium do Playwright.
// Se o Playwright não achar o navegador, aponte CHROME_PATH para um chrome.exe.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const fontes =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;700&family=Dancing+Script:wght@600&family=Figtree:wght@500&display=block";
const foto = readFileSync(path.resolve("public/img/franciny-ruy-hero-960.webp")).toString("base64");

const og = `<!doctype html><html><head><link rel="stylesheet" href="${fontes}"><style>
  body{margin:0;width:1200px;height:630px;background:#3b2a20;color:#fbf6ec;font-family:Figtree;overflow:hidden;position:relative}
  .linhas{position:absolute;inset:0;display:grid;grid-template-columns:repeat(6,1fr)}
  .linhas span{border-left:1px solid rgba(251,246,236,.09)}
  .txt{position:absolute;left:72px;top:92px;width:700px}
  .crp{font-size:22px;opacity:.8;font-weight:500}
  .nome{font-family:'Dancing Script';font-weight:600;font-size:132px;line-height:1.05;margin-top:22px}
  .prof{font-family:'Bricolage Grotesque';font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:21px;margin-top:10px}
  .frase{font-family:'Bricolage Grotesque';font-size:40px;line-height:1.12;margin-top:46px;letter-spacing:-.02em}
  .frase b{font-weight:700}.frase i{font-style:normal;font-weight:300}
  .arco{position:absolute;right:72px;top:70px;width:330px;height:490px;border-radius:999px 999px 28px 28px;overflow:hidden}
  .arco img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;transform:scale(1.06)}
  .contorno{position:absolute;right:56px;top:54px;width:330px;height:490px;border-radius:999px 999px 28px 28px;border:1px solid rgba(251,246,236,.25)}
</style></head><body><div class="linhas"><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div class="txt"><div class="crp">Terapia Cognitivo Comportamental · CRP 06/149635</div>
<div class="nome">Franciny Ruy</div><div class="prof">Psicóloga em Araçatuba e online</div>
<div class="frase"><b>Terapia para adultos,</b> <i>com conversa direta e sem julgamento.</i></div></div>
<div class="contorno"></div><div class="arco"><img src="data:image/webp;base64,${foto}"></div></body></html>`;

const icone = `<!doctype html><html><head><link rel="stylesheet" href="${fontes}"><style>
  body{margin:0;width:512px;height:512px;display:grid;place-items:center;background:transparent}
  div{width:512px;height:512px;border-radius:50%;background:#b4552f;color:#fbf6ec;display:grid;place-items:center;
      font-family:'Dancing Script';font-weight:600;font-size:250px;line-height:1;padding-bottom:20px;box-sizing:border-box}
</style></head><body><div>Fr</div></body></html>`;

const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

const p1 = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p1.setContent(og, { waitUntil: "networkidle" });
await p1.evaluate(() => document.fonts.ready);
await p1.screenshot({ path: "public/og.jpg", type: "jpeg", quality: 85 });

const p2 = await b.newPage({ viewport: { width: 512, height: 512 } });
await p2.setContent(icone, { waitUntil: "networkidle" });
await p2.evaluate(() => document.fonts.ready);
const png512 = await p2.screenshot({ omitBackground: true });
await b.close();

const sharp = (await import("sharp")).default;
await sharp(png512).resize(192).png().toFile("src/app/icon.png");
// ícone da Apple sem transparência, com fundo terracota
await sharp(png512).resize(180).flatten({ background: "#b4552f" }).png().toFile("src/app/apple-icon.png");

// favicon.ico com um PNG de 48px embutido (formato aceito por todos os navegadores atuais)
const png48 = await sharp(png512).resize(48).png().toBuffer();
const cab = Buffer.alloc(22);
cab.writeUInt16LE(0, 0);
cab.writeUInt16LE(1, 2);
cab.writeUInt16LE(1, 4);
cab.writeUInt8(48, 6);
cab.writeUInt8(48, 7);
cab.writeUInt8(0, 8);
cab.writeUInt8(0, 9);
cab.writeUInt16LE(1, 10);
cab.writeUInt16LE(32, 12);
cab.writeUInt32LE(png48.length, 14);
cab.writeUInt32LE(22, 18);
writeFileSync("src/app/favicon.ico", Buffer.concat([cab, png48]));

console.log("ok");
