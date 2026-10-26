import { situacoes, termosTecnicos } from "@/conteudo";
import { Baloes } from "./Baloes";
import { TituloAnimado } from "./TituloAnimado";
import { linkWhatsApp } from "@/site.config";
import { BotaoSeta, Etiqueta } from "./ui";

// Uma ideia só: o pensamento embaraçado que se organiza. Os balões, com a barra de arrastar,
// explicam o que a TCC faz; "Com quem eu trabalho" vem depois, igual no celular e no desktop.
// Os limites do atendimento ficam só na resposta "Quem você atende?" das Dúvidas.
export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-linho py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Etiqueta>Como funciona</Etiqueta>
            <TituloAnimado
              className="titulo-2 mt-5"
              partes={[
                { texto: "Como a TCC trabalha a ansiedade e " },
                { texto: "os padrões de pensamento", leve: true },
              ]}
            />
          </div>
          <div className="space-y-4 text-[18px] leading-[30px]">
            <p>
              A TCC, Terapia Cognitivo Comportamental, parte de uma ideia simples: o jeito como a gente
              interpreta uma situação influencia o que sente e o que faz.
            </p>
            <p className="text-marrom-suave">
              Na terapia, a gente identifica esses pensamentos, olha se eles fazem sentido e procura formas
              mais úteis de responder. É assim que dá para entender por que a ansiedade cresce até virar crise,
              e o que fazer antes disso.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-lg)] bg-papel px-5 pt-8 pb-8 md:mt-16 md:px-14 md:pt-14 md:pb-12">
          <Baloes />
        </div>

        <div className="mt-16 rounded-[var(--radius-lg)] bg-verde-mata p-7 text-papel md:mt-24 md:grid md:grid-cols-[0.75fr_1.25fr] md:gap-12 md:p-12 lg:gap-20 lg:p-16">
          <div>
            <h3 className="font-display text-[28px] leading-[34px] font-bold md:text-[clamp(34px,3.6vw,48px)] md:leading-[1.08] md:tracking-[-0.02em]">
              Com quem eu <span className="peso-leve">trabalho</span>
            </h3>
            <p className="mt-4 max-w-[34ch] text-[17px] leading-7 text-papel/85 md:mt-5 md:text-[18px]">
              Adultos, a partir de 18 anos, no consultório em Araçatuba ou online. Talvez você se reconheça em
              alguma destas situações:
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <ul>
              {situacoes.map((s) => (
                <li
                  key={s}
                  className="border-t border-papel/20 py-4 font-display text-[19px] leading-7 font-semibold md:py-5 md:text-[21px]"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="border-t border-papel/20 pt-5 text-[15px] leading-6 text-papel/80">
              <span className="font-semibold text-papel">Em termos técnicos:</span> {termosTecnicos.join(" · ")}.
            </p>
            {/* convite logo depois de a pessoa se reconhecer (diferente da chamada do rodapé) */}
            <div className="mt-8 border-t border-papel/20 pt-8">
              <p className="max-w-[40ch] text-[18px] leading-7 font-semibold">
                Se alguma dessas situações parece com o que você vive, dá para começar por aí. Um oi já basta.
              </p>
              <BotaoSeta href={linkWhatsApp()} className="mt-5">
                Chamar no WhatsApp
              </BotaoSeta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
