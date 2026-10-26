// Confere o site exportado (pasta out/) em desktop e celular, com e sem movimento reduzido.
// Uso: npm run build && node scripts/capturas.mjs
// Salva as capturas em capturas/ e imprime avisos de quebra horizontal e de imagens sem alt.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const raiz = path.resolve("out");
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const servidor = createServer(async (req, res) => {
  let url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url.endsWith("/")) url += "index.html";
  try {
    const arquivo = await readFile(path.join(raiz, url));
    res.writeHead(200, { "Content-Type": tipos[path.extname(url)] ?? "application/octet-stream" });
    res.end(arquivo);
  } catch {
    res.writeHead(404).end();
  }
}).listen(4173);

await mkdir("capturas", { recursive: true });
const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

const casos = [
  { nome: "desktop", viewport: { width: 1440, height: 900 } },
  { nome: "celular", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { nome: "celular-reduzido", viewport: { width: 390, height: 844 }, isMobile: true, reducedMotion: "reduce" },
  { nome: "desktop-reduzido", viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
];

for (const c of casos) {
  const ctx = await b.newContext({
    viewport: c.viewport,
    isMobile: c.isMobile,
    hasTouch: c.hasTouch,
    deviceScaleFactor: c.deviceScaleFactor ?? 1,
    reducedMotion: c.reducedMotion ?? "no-preference",
  });
  const p = await ctx.newPage();
  const erros = [];
  p.on("pageerror", (e) => erros.push(e.message));
  p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await p.screenshot({ path: `capturas/${c.nome}-topo.png` });

  // rola devagar para disparar as entradas
  const altura = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < altura; y += 500) {
    await p.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await p.waitForTimeout(220);
  }
  await p.waitForTimeout(3600);
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await p.waitForTimeout(400);
  await p.screenshot({ path: `capturas/${c.nome}-inteira.png`, fullPage: true });

  const avisos = await p.evaluate(() => {
    const largura = document.documentElement.clientWidth;
    const fora = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > largura + 1 && !el.closest(".faixa-arcos") && !el.closest("footer");
      })
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
    const semAlt = [...document.querySelectorAll("img")].filter((i) => !i.alt).length;
    const h1 = document.querySelectorAll("h1").length;
    const rolagemHorizontal = document.documentElement.scrollWidth > largura;
    return { fora, semAlt, h1, rolagemHorizontal };
  });
  console.log(c.nome, JSON.stringify(avisos), erros.length ? `ERROS: ${erros.join(" | ")}` : "sem erros");
  await ctx.close();
}

await b.close();
servidor.close();
