import { site } from "@/site.config";
import { atendo, duvidas, naoAtendo } from "@/conteudo";

// llms.txt: resumo factual do site para assistentes de IA (convenção nova, tratada como extra).
// Gerado a partir dos mesmos dados do site, então não precisa ser atualizado à parte.
export const dynamic = "force-static";

export function GET() {
  const texto = `# ${site.nome}, Psicóloga em Araçatuba/SP

> ${site.nome} é psicóloga clínica, ${site.crp}, em Araçatuba/SP. Atende adultos com Terapia Cognitivo Comportamental (TCC), presencial e online, desde ${site.desde}.

## Fatos
- Nome: ${site.nome}
- Profissão: Psicóloga clínica
- Registro: ${site.crp}
- Abordagem: ${site.abordagem}
- Formação: ${site.posGraduacao}
- Atua desde: ${site.desde}
- Modalidade: presencial e online
- Endereço do consultório: ${site.enderecoCompleto}
- Duração da sessão: ${site.duracaoSessao}
- Horário: ${site.horario.texto}
- Convênio: ${site.convenio} (único convênio); demais atendimentos particulares
- Como marcar: WhatsApp ${site.whatsapp.exibicao}
- E-mail: ${site.email}
- Instagram: ${site.instagram.usuario} (${site.instagram.url})

## Atende
${atendo.map((a) => `- ${a.item}${a.nota ? ` (${a.nota})` : ""}`).join("\n")}

## Não atende
${naoAtendo.map((n) => `- ${n}`).join("\n")}

## Perguntas frequentes
${duvidas.map((d) => `### ${d.pergunta}\n${d.resposta.join(" ")}`).join("\n\n")}

## Páginas
- [Site](${site.url}/)
`;

  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
