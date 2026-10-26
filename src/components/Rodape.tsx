import { linkWhatsApp, mapa, menu, site } from "@/site.config";
import { BotaoSeta } from "./ui";

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="faixa-verde relative overflow-hidden bg-verde-mata text-papel">
      {/* Fechamento: o convite final da página, no mesmo padrão do último slide do carrossel
          (verde-mata, chamada, assinatura e CRP). No celular o botão ocupa a largura toda. */}
      <div className="relative mx-auto max-w-[1240px] px-4 pt-20 md:px-8 md:pt-24">
        <div className="md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <h2 className="titulo-2 max-w-[18ch]">Se alguma coisa aqui fez sentido para você, me chama.</h2>
            <p className="mt-4 max-w-[40ch] text-[18px] leading-7 text-papel/85">
              Um oi já basta. Não precisa explicar tudo na primeira mensagem.
            </p>
          </div>
          <BotaoSeta id="fim-do-fio" href={linkWhatsApp()} className="mt-8 w-full shrink-0 justify-between md:mt-0 md:w-auto">
            Chamar no WhatsApp
          </BotaoSeta>
        </div>
        <div className="mt-12 border-b border-papel/20 pb-12 md:pb-16">
          <p className="assinatura text-[44px] leading-[48px]">{site.nome}</p>
          <p className="legenda mt-2">Psicóloga - {site.crp}</p>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 pt-12 pb-10 md:grid-cols-[1.3fr_0.7fr_1fr] md:gap-10 md:px-8 md:pt-16">
        <div>
          {/* frase de fato, curta e fácil de citar (GEO) */}
          <p className="max-w-[38ch] text-[16px] leading-[26px] text-papel/90">
            Franciny Ruy é psicóloga clínica em Araçatuba/SP, {site.crp}. Atende adultos com Terapia Cognitivo
            Comportamental (TCC), presencial e online, desde {site.desde}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="legenda text-papel/75">Navegação</p>
          <ul className="mt-4 grid gap-1">
            {menu.map((m) => (
              <li key={m.id}>
                <a href={`#${m.id}`} className="inline-block py-2.5 text-[16px] hover:underline hover:underline-offset-4">
                  {m.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="legenda text-papel/75">Contato</p>
          <ul className="mt-4 grid gap-1 text-[16px] leading-6">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener" className="inline-block py-2.5 hover:underline hover:underline-offset-4">
                WhatsApp {site.whatsapp.exibicao}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-block py-2.5 break-all hover:underline hover:underline-offset-4">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener" className="inline-block py-2.5 hover:underline hover:underline-offset-4">
                Instagram {site.instagram.usuario}
              </a>
            </li>
            <li>
              <a href={mapa.abrir} target="_blank" rel="noopener" className="inline-block py-2.5 hover:underline hover:underline-offset-4">
                <address className="not-italic">{site.enderecoCompleto}</address>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 pb-10 md:px-8 md:pb-12">
        <p className="max-w-[62ch] border-t border-papel/20 pt-6 text-[15px] leading-6 text-papel/85">
          Se você está em crise ou pensando em se machucar, ligue <a href="tel:188" className="-mx-2.5 -my-2.5 inline-block px-2.5 py-2.5 font-semibold underline underline-offset-4">188</a>,
          o CVV. A ligação é gratuita e o atendimento funciona 24 horas.
        </p>
        <div className="legenda mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 text-papel/75">
          <p>
            © {ano} {site.nome}. Psicóloga - {site.crp}.
          </p>
          <p>Site feito pela OIKOS Inteligência Digital</p>
        </div>
      </div>
    </footer>
  );
}
