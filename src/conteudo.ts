// Textos longos do site. Os mitos, o "Sobre" e as respostas das dúvidas são RASCUNHO:
// a Franciny precisa ler e aprovar antes de publicar.
// Regras: frases curtas, sem travessão, sem promessa de cura ou resultado, sem depoimento.

import { site } from "./site.config";

// Faixa que desliza abaixo do hero. Rótulo solto não tem contexto: nada que soe como público
// exclusivo ("40 anos ou mais") nem como terapia de casal ("Relacionamentos").
export const temas = [
  "Ansiedade",
  "Crises de ansiedade",
  "Padrões e crenças",
  "Relações na família e no trabalho",
  "Saúde da mulher",
  "Transtornos afetivos",
  "Online",
];

// RASCUNHO: texto do "Sobre" para a Franciny revisar.
export const sobre = [
  `Sou a Franciny, psicóloga clínica desde ${site.desde}. Atendo adultos em Araçatuba, no consultório e online, com a Terapia Cognitivo Comportamental, a TCC.`,
  "Gosto de explicar como as coisas funcionam: por que a ansiedade vai crescendo até virar crise, como um pensamento aparece no comportamento, de onde vêm as regras que a gente segue sem perceber. Quando a pessoa enxerga o próprio padrão, a conversa muda, porque passa a ter algo concreto para trabalhar.",
  "Na sessão, a conversa é direta e sem julgamento. Ninguém chega sabendo o que dizer, e não é preciso estar “muito mal” para começar.",
  "Tenho um carinho especial por dois públicos. Pessoas de 40, 50 anos ou mais, que carregam crenças e regras de uma vida inteira e querem olhar para elas de outro jeito, pensando nos anos que ainda vêm. E mulheres, porque saúde feminina e saúde mental andam juntas e merecem ser conversadas juntas.",
];

// RASCUNHO: respostas aos mitos para a Franciny revisar.
export const mitos = [
  {
    mito: "Meu caso não é nem de psicólogo, já é de psiquiatra.",
    resposta: [
      "Psicólogo e psiquiatra não disputam o mesmo caso. O psiquiatra é médico: avalia o quadro e, quando precisa, receita remédio. Na terapia, a gente trabalha pensamentos, emoções e comportamentos ao longo das sessões.",
      "Muita gente faz os dois acompanhamentos ao mesmo tempo, e um não exclui o outro. Se eu perceber que o seu caso pede uma avaliação psiquiátrica, eu falo com você e a gente conversa sobre isso.",
    ],
  },
  {
    mito: "Terapia é para pessoas fracas ou que já estão muito mal.",
    resposta: [
      "Procurar terapia é uma forma de cuidar de si, como ir ao médico antes de a dor ficar grande. Dá para começar porque a ansiedade está atrapalhando o trabalho, porque um relacionamento anda pesado ou porque você quer entender por que reage sempre do mesmo jeito.",
      "Não existe um nível mínimo de sofrimento para merecer ajuda.",
    ],
  },
  {
    mito: "Vou fazer uma sessão: ou a psicóloga me cura ou eu deixo ela doida.",
    resposta: [
      "Pode ficar em paz: ninguém deixa a psicóloga doida. E a terapia também não se resolve numa sessão só.",
      "O primeiro encontro serve para a gente se conhecer, entender o que te trouxe e combinar como vai ser. Depois, o trabalho acontece aos poucos, de sessão em sessão, no seu ritmo.",
    ],
  },
];

// Como funciona: as três ideias que acompanham a barra de arrastar dos balões.
// Cada uma acende um dos três fios do desenho (a cor é a da bolinha ao lado da frase).
export const ideiasTcc = [
  {
    titulo: "Perceber o padrão",
    texto:
      "Primeiro, a gente nota o pensamento que volta sempre nas mesmas situações, como aquele que aparece antes de a ansiedade subir.",
    cor: "var(--taupe)",
  },
  {
    titulo: "Entender de onde ele vem",
    texto: "Depois, a gente olha para as crenças e as regras por trás dele, muitas vezes aprendidas há muito tempo.",
    cor: "var(--terracota)",
  },
  {
    titulo: "Responder de outro jeito",
    texto: "Aos poucos, você experimenta formas mais úteis de pensar e de agir nessas situações, no seu ritmo.",
    cor: "var(--verde-mata)",
  },
];

// Com quem eu trabalho: situações do dia a dia em destaque e os termos técnicos embaixo.
// Cada situação corresponde a um item de `atendo`; não acrescente nada que ela não atenda.
export const situacoes = [
  "A ansiedade que aparece antes do trabalho, de uma conversa difícil ou do nada, às vezes até virar crise.",
  "Relações que andam pesadas, na família ou no trabalho.",
  "Um humor que vive lá embaixo ou que muda muito.",
  "Jeitos de reagir que se repetem, sem você entender de onde vêm.",
  "Questões da saúde da mulher que mexem com o emocional.",
  "Chegar aos 40, 50 anos querendo olhar de outro jeito para as regras de uma vida inteira.",
];

export const termosTecnicos = [
  "ansiedade e crises de ansiedade",
  "transtornos afetivos, como a depressão",
  "transtornos de personalidade",
  "padrões de pensamento e crenças",
  "saúde da mulher",
  "adultos de 40 anos ou mais",
];

// `atendo` e `naoAtendo` não aparecem mais na página (os limites ficam só na resposta
// "Quem você atende?" das Dúvidas), mas continuam no llms.txt, para que respostas de IA
// não indiquem a Franciny para o que ela não atende.
export const atendo = [
  { item: "Adultos, a partir de 18 anos" },
  { item: "Ansiedade e crises de ansiedade", nota: "na vida pessoal, no trabalho e na família" },
  { item: "Relacionamentos" },
  { item: "Transtornos afetivos", nota: "os que mexem com o humor, como a depressão" },
  { item: "Transtornos de personalidade", nota: "jeitos de pensar e de se relacionar que se repetem há muito tempo" },
  { item: "Padrões de pensamento e crenças" },
  { item: "Mulheres e saúde feminina" },
  { item: "Pessoas de 40, 50 anos ou mais" },
];

export const naoAtendo = [
  "Crianças e adolescentes",
  "Dependência química",
  "Transtornos mentais graves, como esquizofrenia",
  "Terapia de casal, que hoje não é o meu foco",
];

// RASCUNHO: respostas para a Franciny revisar. A primeira frase de cada resposta já responde
// a pergunta sozinha (40 a 60 palavras), para trechos em destaque e respostas de IA.
// O mesmo texto vai para o JSON-LD FAQPage, então o que aparece na tela é o que está nos dados.
// As duas primeiras entraram em 26/10/2026 e dependem de a Franciny confirmar como ela conduz
// a primeira sessão. Saíram "Onde fica o consultório?", "Como marcar uma sessão?" e "Como funciona
// a TCC?", que repetiam Atendimento, o botão do WhatsApp e a seção Como funciona.
export const duvidas: { pergunta: string; resposta: string[] }[] = [
  {
    pergunta: "Como é a primeira sessão?",
    resposta: [
      "A primeira sessão serve para a gente se conhecer. Você conta o que te trouxe, no seu tempo, e eu explico como a terapia funciona e como eu trabalho. No fim, a gente combina juntos o formato, presencial ou online, e a frequência das próximas sessões.",
    ],
  },
  {
    pergunta: "E se eu não souber o que falar?",
    resposta: [
      "Não tem problema, é mais comum do que parece. Ninguém chega sabendo o que dizer, e não existe jeito certo de começar. Eu faço perguntas, a gente vai conversando aos poucos e o assunto aparece. Você pode até começar dizendo que não sabe por onde começar.",
    ],
  },
  {
    pergunta: "Quanto dura uma sessão de terapia?",
    resposta: [
      "A sessão dura em média 50 minutos, tanto no consultório em Araçatuba quanto online. Esse tempo dá para conversar com calma sobre o que aconteceu desde o último encontro e trabalhar um ponto de cada vez, sem pressa e sem precisar cortar um assunto no meio.",
      "A frequência das sessões a gente combina junto, na primeira conversa.",
    ],
  },
  {
    pergunta: "Você atende online?",
    resposta: [
      "Sim, eu atendo online, com a mesma abordagem e a mesma duração da sessão presencial, em média 50 minutos. A sessão online funciona bem para quem tem a rotina corrida ou prefere ser atendido de casa, desde que exista um lugar reservado, com privacidade e uma internet estável.",
    ],
  },
  {
    pergunta: "Você atende pelo Apas?",
    resposta: [
      "Sim. O Apas é o único convênio que eu atendo, e os demais atendimentos são particulares. Se você tem Apas, me conte isso logo na primeira mensagem pelo WhatsApp, para a gente já combinar como fica o atendimento pelo seu plano antes de marcar a primeira sessão.",
    ],
  },
  {
    pergunta: "Terapia é só para quem está muito mal?",
    resposta: [
      "Não. Dá para começar terapia em qualquer momento, inclusive quando as coisas parecem só um pouco fora do lugar: uma ansiedade que aparece antes do trabalho, um relacionamento que cansa, uma reação que se repete e você não entende de onde vem. Não existe um nível mínimo de sofrimento para procurar ajuda.",
    ],
  },
  {
    pergunta: "Qual a diferença entre psicólogo e psiquiatra?",
    resposta: [
      "O psiquiatra é médico: avalia o quadro, faz o diagnóstico médico e pode receitar remédio. A psicóloga trabalha com psicoterapia, conversando sobre pensamentos, emoções e comportamentos ao longo das sessões. Os dois cuidados podem andar juntos, e muita gente faz acompanhamento com os dois profissionais ao mesmo tempo.",
      "Um não substitui o outro. Quando faz sentido, eu converso com você sobre procurar também uma avaliação psiquiátrica.",
    ],
  },
  {
    pergunta: "Quem você atende?",
    resposta: [
      "Eu atendo adultos, a partir de 18 anos, com ansiedade, crises de ansiedade, questões de relacionamento e transtornos afetivos e de personalidade. Gosto muito de atender mulheres e pessoas de 40 anos ou mais. Não atendo crianças e adolescentes, dependência química nem transtornos mentais graves, e terapia de casal hoje não é o meu foco.",
    ],
  },
];
