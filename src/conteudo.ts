// Textos longos do site. Os mitos, o "Sobre" e as respostas das dúvidas são RASCUNHO:
// a Franciny precisa ler e aprovar antes de publicar.
// Regras: frases curtas, sem travessão, sem promessa de cura ou resultado, sem depoimento.

import { site } from "./site.config";

// Faixa que desliza abaixo do hero. Rótulo solto não tem contexto: nada que soe como público
// exclusivo ("40 anos ou mais") nem como terapia de casal ("Relacionamentos").
// Cada tema vem do briefing (23/10/2026) ou do retorno dela (28/10/2026).
export const temas = [
  "Saúde da mulher",
  "Jovens adultos",
  "Ansiedade",
  "Crises de ansiedade",
  "Padrões e crenças",
  "Transtornos afetivos",
  "Transtornos de personalidade",
  "Relações na família e no trabalho",
  "Adultos e idosos",
  "TCC",
  "Online",
];

// Formação, do briefing (3.2) e do retorno dela (graduação). Sem ano: ela não informou.
// `completa` só vai para os dados estruturados e para o llms.txt.
export const formacao = [
  {
    tipo: "Graduação",
    itens: [{ nome: "Psicologia", instituicao: "Fundação Educacional Araçatuba, FAC FEA", completa: "Fundação Educacional Araçatuba (FAC FEA)" }],
  },
  {
    tipo: "Pós-graduação",
    itens: [
      { nome: "Terapia Cognitivo Comportamental (TCC)", instituicao: "FAVENI", completa: "FAVENI Faculdade Venda Nova do Imigrante", destaque: true },
      { nome: "Psicologia do Trânsito", instituicao: "FAMEESP", completa: "FAMEESP Faculdade Metropolitana do Estado de São Paulo" },
    ],
  },
  {
    tipo: "Cursos e capacitações",
    itens: [
      { nome: "Curso de formação em Psicologia do Esporte", instituicao: "CEPPE", completa: "CEPPE Consultoria, Estudo e Pesquisa da Psicologia do Esporte" },
      { nome: "Capacitação em Libras", instituicao: "FAVENI", completa: "FAVENI Faculdade Venda Nova do Imigrante" },
      { nome: "Capacitação em ABA, Análise do Comportamento Aplicada", instituicao: "FAVENI", completa: "FAVENI Faculdade Venda Nova do Imigrante" },
      { nome: "Capacitação em Dependência Química e Qualidade de Vida", instituicao: "FAVENI", completa: "FAVENI Faculdade Venda Nova do Imigrante" },
    ],
  },
];

// RASCUNHO: texto do "Sobre" para a Franciny revisar.
export const sobre = [
  `Sou a Franciny, psicóloga clínica desde ${site.desde}, formada pela Fundação Educacional Araçatuba (FAC FEA). Seguindo a abordagem da Terapia Cognitivo-Comportamental (TCC), atendo adultos acima de 18 anos, tanto online quanto presencial, com consultório em Araçatuba/SP.`,
  "Na minha atuação, gosto de explicar como as coisas funcionam: quando a pessoa me traz o que ela está sentindo naquele momento, eu busco explicar como o sentimento surge a partir de um pensamento, e como isso pode gerar um comportamento. Sem perceber, nós seguimos regras e padrões, e quando identificamos isso, a conversa muda e passa a fluir, pois agora existe algo concreto a se trabalhar.",
  "Quero que você saia de cada sessão entendendo um pouco mais de si. Explico o que está acontecendo, a gente conversa sobre o que fazer com isso e vai acompanhando, ao longo das sessões, o que muda no seu dia a dia.",
  "Uma curiosidade sobre mim dentro da minha atuação é que eu tenho um carinho especial por pessoas com idade acima de 40 anos, pois justamente essas pessoas carregam crenças e regras por uma vida toda, e podem conseguir olhar para elas de outro jeito, modificando todos os anos que ainda virão. Além desse público, gosto de lidar com mulheres, pois a saúde feminina e a saúde mental andam juntas e merecem ser conversadas juntas.",
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
  { item: "Jovens adultos (acima de 18 anos), adultos e idosos" },
  { item: "Ansiedade e crises de ansiedade", nota: "na vida pessoal, no trabalho e na família, inclusive TOC e TAG" },
  { item: "Relacionamentos" },
  { item: "Transtornos afetivos", nota: "os que mexem com o humor, como o transtorno afetivo bipolar e a depressão" },
  { item: "Transtornos de personalidade", nota: "como o transtorno de personalidade limítrofe (Borderline)" },
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
    pergunta: "Você atende pelo APAS?",
    resposta: [
      "Sim. O APAS é o único convênio que eu atendo, e os demais atendimentos são particulares. Se você tem APAS, me conte isso logo na primeira mensagem pelo WhatsApp, para a gente já combinar como fica o atendimento pelo seu plano antes de marcar a primeira sessão.",
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
      "Meu público envolve jovens adultos (acima de 18 anos), adultos e idosos. Tenho experiência no atendimento de transtornos de humor (por exemplo, TAB, o transtorno afetivo bipolar, e depressão e seus níveis), de personalidade (por exemplo, o transtorno de personalidade limítrofe, o Borderline) e de ansiedade (por exemplo, TOC, o transtorno obsessivo compulsivo, e TAG, o transtorno de ansiedade generalizada).",
      "Não atendo crianças e adolescentes, dependência química ou transtornos mentais graves, e terapia de casal hoje não é o meu foco atual.",
    ],
  },
];
