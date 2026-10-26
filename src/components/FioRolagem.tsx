"use client";

import { useEffect, useRef } from "react";

// A linha que acompanha a rolagem: continua o fio terracota da moldura do hero (#ponta-fio), desce
// pela margem, troca de lado no respiro entre as seções (só no desktop) e termina no botão do
// fechamento (#fim-do-fio). Nunca passa por cima de texto: fica atrás do conteúdo (ver globals.css).
// A cor muda por faixa para não sumir: terracota sobre o claro e o marrom, papel sobre terracota e verde.
// Com movimento reduzido, a linha aparece inteira e parada, sem o ponto da frente. Sem JS, não aparece.

const NS = "http://www.w3.org/2000/svg";

// terracota só sobre o claro (linho e papel); sobre marrom, terracota e verde, papel.
// (terracota sobre marrom dá 2,8:1 e o fio quase some)
function corDaFaixa(el: Element) {
  const [r = 0, g = 0, b = 0] = getComputedStyle(el).backgroundColor.match(/\d+/g)?.map(Number) ?? [];
  return (r + g + b) / 3 > 200 ? "var(--terracota)" : "var(--papel)";
}

export function FioRolagem() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let caminho: SVGPathElement | null = null;
    let tracos: SVGUseElement[] = [];
    let ponto: SVGCircleElement | null = null;
    let total = 0;
    let amostras: { l: number; x: number; y: number }[] = [];

    function monta() {
      const inicio = document.getElementById("ponta-fio");
      const fim = document.getElementById("fim-do-fio");
      const conteudo = document.querySelector("#sobre .mx-auto");
      if (!svg || !inicio || !fim || !conteudo) return;

      const largura = document.documentElement.clientWidth;
      // altura até o fim do rodapé (e não scrollHeight): o próprio SVG entra no scrollHeight, então
      // quando a página encolhia ele mantinha a altura antiga e sobrava um vão marrom no fim do site
      const rodape = document.querySelector("body > footer");
      const altura = Math.ceil((rodape?.getBoundingClientRect().bottom ?? 0) + scrollY);
      const celular = largura < 1024;
      svg.setAttribute("width", String(largura));
      svg.setAttribute("height", String(altura));
      svg.setAttribute("viewBox", `0 0 ${largura} ${altura}`);
      svg.replaceChildren();

      const y0 = scrollY;
      const caixa = (el: Element) => el.getBoundingClientRect();
      const c = caixa(conteudo);
      // celular: no meio do respiro de 16px, longe do texto; desktop: fora da coluna de conteúdo
      const esq = celular ? 6 : Math.max(10, c.left + 32 - 40);
      const dir = Math.min(largura - 10, c.right - 32 + 40);

      const pi = caixa(inicio);
      const palco = caixa(inicio.closest("svg")!.parentElement!);
      const fora = Math.min(largura - 8, palco.right + (celular ? 14 : 28));
      const pts = [
        { x: pi.left + pi.width / 2, y: pi.top + pi.height / 2 + y0 },
        { x: fora, y: palco.top + palco.height * 0.35 + y0 },
        { x: fora, y: palco.bottom + y0 },
      ];

      const faixas = [...document.querySelectorAll("main > section, body > footer")];
      const ultima = faixas.length - 2;
      faixas.slice(1).forEach((s, i) => {
        const topo = caixa(s).top + y0;
        const h = (s as HTMLElement).offsetHeight;
        // no rodapé o desktop desce pela direita, que é onde fica o botão
        const x = celular || (i % 2 === 0 && i !== ultima) ? esq : dir;
        if (h < 240) {
          pts.push({ x, y: topo + h / 2 });
        } else {
          pts.push({ x, y: topo + 44 });
          pts.push({ x, y: topo + h - 70 });
        }
      });
      // o fio termina dentro do círculo da seta do botão do fechamento: desce até a altura dele
      // e faz a curva para dentro. No celular a curva passa por baixo do botão (que fica por cima).
      pts.pop();
      const circulo = caixa(fim.lastElementChild ?? fim);
      const cx = circulo.left + circulo.width / 2;
      const cy = circulo.top + circulo.height / 2 + y0;
      const lado = pts[pts.length - 1].x;
      pts.push({ x: lado, y: cy - 36 });
      pts.push({ x: cx, y: cy });

      // monta o caminho e, junto, a tabela de pontos (comprimento, x, y) calculada direto das curvas.
      // Antes a tabela vinha de ~2.000 chamadas a getPointAtLength, que percorre o caminho inteiro
      // a cada chamada: a linha demorava quase 1s para aparecer e travava ao abrir um mito.
      let d = `M${pts[0].x} ${pts[0].y}`;
      amostras = [{ l: 0, x: pts[0].x, y: pts[0].y }];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dy = b.y - a.y;
        const c1 = { x: a.x, y: a.y + dy * 0.55 };
        const c2 = { x: b.x, y: b.y - dy * 0.55 };
        d += ` C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.x} ${b.y}`;
        for (let k = 1; k <= 24; k++) {
          const t = k / 24;
          const u = 1 - t;
          const x = u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x;
          const y = u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y;
          const ant = amostras[amostras.length - 1];
          amostras.push({ l: ant.l + Math.hypot(x - ant.x, y - ant.y), x, y });
        }
      }

      const defs = document.createElementNS(NS, "defs");
      caminho = document.createElementNS(NS, "path");
      caminho.id = "trilha-fio";
      caminho.setAttribute("d", d);
      defs.appendChild(caminho);

      const grupos: SVGGElement[] = [];
      faixas.forEach((s, i) => {
        // a faixa de temas tem texto de borda a borda: ali o fio passa "por trás" e some
        if (s.classList.contains("faixa-arcos")) return;
        const r = caixa(s);
        const clip = document.createElementNS(NS, "clipPath");
        clip.id = `faixa-fio-${i}`;
        const ret = document.createElementNS(NS, "rect");
        ret.setAttribute("x", "0");
        ret.setAttribute("y", String(r.top + y0));
        ret.setAttribute("width", String(largura));
        ret.setAttribute("height", String(r.height));
        clip.appendChild(ret);
        defs.appendChild(clip);

        const g = document.createElementNS(NS, "g");
        g.setAttribute("clip-path", `url(#faixa-fio-${i})`);
        g.style.color = corDaFaixa(s);
        const guia = document.createElementNS(NS, "use");
        guia.setAttribute("href", "#trilha-fio");
        guia.setAttribute("class", "fio-guia");
        const traco = document.createElementNS(NS, "use");
        traco.setAttribute("href", "#trilha-fio");
        traco.setAttribute("class", "fio-traco");
        g.append(guia, traco);
        grupos.push(g);
      });
      svg.append(defs, ...grupos);

      // um único getTotalLength, para o tracejado bater com o comprimento que o navegador desenha
      total = caminho.getTotalLength();
      const escala = total / amostras[amostras.length - 1].l;
      amostras.forEach((a) => (a.l *= escala));
      tracos = grupos.map((g) => g.lastChild as SVGUseElement);
      tracos.forEach((t) => (t.style.strokeDasharray = String(total)));

      ponto = document.createElementNS(NS, "circle");
      ponto.setAttribute("class", "fio-ponto");
      ponto.setAttribute("r", celular ? "3" : "5");
      svg.appendChild(ponto);
      atualiza();
    }

    // ponto do caminho na altura y (o caminho só desce): busca na tabela e interpola
    function naAltura(y: number) {
      const ult = amostras.length - 1;
      if (y <= amostras[0].y) return amostras[0];
      if (y >= amostras[ult].y) return amostras[ult];
      let lo = 0;
      let hi = ult;
      while (hi - lo > 1) {
        const meio = (lo + hi) >> 1;
        if (amostras[meio].y < y) lo = meio;
        else hi = meio;
      }
      const a = amostras[lo];
      const b = amostras[hi];
      const t = (y - a.y) / (b.y - a.y || 1);
      return { l: a.l + (b.l - a.l) * t, x: a.x + (b.x - a.x) * t, y };
    }

    function atualiza() {
      if (!caminho || !ponto || !amostras.length) return;
      const p = reduzido ? amostras[amostras.length - 1] : naAltura(scrollY + innerHeight * 0.62);
      const l = p.l;
      tracos.forEach((t) => (t.style.strokeDashoffset = String(total - l)));
      ponto.setAttribute("cx", String(p.x));
      ponto.setAttribute("cy", String(p.y));
      const noFim = l >= total - 4;
      ponto.style.display = reduzido || l < 2 || noFim ? "none" : "";
      if (!reduzido && noFim) chega();
    }

    // chegada: o círculo da seta do botão responde uma única vez (ver .fio-chegou em globals.css).
    // Com movimento reduzido o fio já está inteiro, então a chegada é quando o botão aparece na tela.
    let chegou = false;
    function chega() {
      if (chegou) return;
      chegou = true;
      document.getElementById("fim-do-fio")?.classList.add("fio-chegou");
    }
    const fimDoFio = document.getElementById("fim-do-fio");
    const vista = new IntersectionObserver(([e]) => e.isIntersecting && chega(), { threshold: 1 });
    if (reduzido && fimDoFio) vista.observe(fimDoFio);

    let quadro = 0;
    const agenda = (fn: () => void) => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(fn);
    };
    const aoRolar = () => agenda(atualiza);
    // a altura da página muda quando o menu, um mito ou uma dúvida abre: refaz o caminho, mas
    // 250ms depois (fora do quadro do toque, para não atrasar a resposta: INP) e uma vez só
    let espera = 0;
    const observa = new ResizeObserver(() => {
      clearTimeout(espera);
      espera = window.setTimeout(() => agenda(monta), 250);
    });
    observa.observe(document.body);
    addEventListener("scroll", aoRolar, { passive: true });
    document.fonts?.ready.then(() => agenda(monta));
    monta();

    return () => {
      observa.disconnect();
      vista.disconnect();
      clearTimeout(espera);
      removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return <svg ref={ref} aria-hidden className="fio-rolagem pointer-events-none absolute top-0 left-0 z-[1] overflow-visible" />;
}
