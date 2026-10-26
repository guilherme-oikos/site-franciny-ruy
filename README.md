# Site Franciny Ruy, Psicóloga

Página única em Next.js (App Router) com exportação estática e Tailwind CSS.
`npm run build` gera a pasta `out/`, pronta para a Vercel ou qualquer hospedagem estática.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera out/
```

## Onde trocar cada coisa

| O quê | Arquivo |
|---|---|
| Domínio, endereço, CEP, coordenadas, WhatsApp, e-mail, Instagram, horário, convênio | `src/site.config.ts` |
| Textos do Sobre, mitos, passos, Atendo e Não atendo, perguntas frequentes | `src/conteudo.ts` |
| Título e descrição da página (SEO) | `src/app/layout.tsx` |
| Dados estruturados (JSON-LD) | `src/components/DadosEstruturados.tsx` (lê os dois arquivos acima) |
| Cores, raios e animações | `src/app/globals.css` (tokens copiados da identidade) |

Tudo marcado com `PENDENTE` ou `RASCUNHO` no código precisa de confirmação antes de publicar:

```bash
grep -rn "PENDENTE\|RASCUNHO" src
```

## Imagens

- `scripts/imagens.mjs` gera as fotos em WebP (480, 720 e 960 px) e os balões, a partir das pastas `FOTOS` e `IDENTIDADE VISUAL` do cliente. Para trocar ou acrescentar uma foto (por exemplo, do consultório), ponha o arquivo em `FOTOS`, inclua no `mapa` do script e rode `node scripts/imagens.mjs`.
- `scripts/og-e-icones.mjs` gera a imagem de compartilhamento (`public/og.jpg`) e os ícones. Precisa de internet só para as fontes.

## Conferência

```bash
npm run build
node scripts/capturas.mjs   # capturas em capturas/, desktop e celular, com e sem movimento reduzido
```

Se o Playwright não encontrar o navegador, rode `npx playwright install chromium` ou aponte `CHROME_PATH` para um `chrome.exe`.

## Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, importe o repositório. Ela reconhece o Next.js e publica a exportação estática.
3. Em Settings > Domains, ligue o domínio e troque `url` em `src/site.config.ts` pelo endereço final.

## Escolhas

- Fontes pelo `next/font`: ficam hospedadas no próprio site, com `display: swap`, sem pedido ao Google.
- O mapa do Google só carrega quando a pessoa clica em "Ver o mapa aqui". Não há rastreador de terceiros.
- Toda a animação é CSS, sem biblioteca: títulos entrando palavra a palavra, fios da moldura do hero, faixa de temas (com botão de pausa), abertura dos mitos e menu. Com `prefers-reduced-motion`, fica só o essencial, sem deslocamento.
- Os balões (Como funciona) usam uma barra de arrastar com máscara SVG sobre o PNG original, que nunca é recolorido. O desenho só é baixado quando a seção chega perto da tela.
- A linha que acompanha a rolagem (`FioRolagem.tsx`) nasce do fio terracota do hero e termina no botão do fechamento.
- Os veios de madeira do fundo são um SVG estático gerado por `node scripts/veios.mjs`.
- A schema.org não tem tipo "Psicólogo"; o negócio usa `MedicalBusiness` com `additionalType` da Wikidata (psicólogo, Q212980; psicoterapia, Q183257). `Psychiatric` diria que ela é psiquiatra.
