// Todos os dados da Franciny ficam aqui. Troque neste arquivo e o site inteiro acompanha
// (textos, links do WhatsApp, JSON-LD, sitemap, robots e Open Graph).

export const site = {
  // PENDENTE: domínio ainda não registrado. Troque aqui quando ela escolher (sem barra no fim).
  url: "https://www.francinyruy.com.br",

  nome: "Franciny Ruy",
  profissao: "Psicóloga",
  crp: "CRP 06/149635",
  abordagem: "Terapia Cognitivo Comportamental (TCC)",
  desde: 2019,
  posGraduacao: "Pós-graduação em Terapia Cognitivo Comportamental (FAVENI)",
  duracaoSessao: "média de 50 minutos",

  // NAP: escreva exatamente igual no Instagram e no Perfil da Empresa no Google.
  endereco: {
    rua: "Rua Ipiranga, 337",
    bairro: "Jardim Nova Yorque",
    cidade: "Araçatuba",
    uf: "SP",
    pais: "BR",
    // PENDENTE: CEP não informado. Preencha para o JSON-LD (formato 00000-000).
    cep: "",
  },
  enderecoCompleto: "Rua Ipiranga, 337, Jardim Nova Yorque, Araçatuba/SP",

  // PENDENTE: coordenadas do pin do Perfil da Empresa no Google. O link curto pede captcha
  // para ser lido por robô, então não consegui conferir. Preencha com o pin real (não estime).
  geo: null as null | { lat: number; lng: number },

  whatsapp: {
    // PENDENTE: confirmar se este continua sendo o número caso ela abra o WhatsApp Business.
    numero: "5518996372616",
    exibicao: "(18) 99637-2616",
  },
  telefoneE164: "+55-18-99637-2616",
  email: "franciny_ruy@hotmail.com",
  instagram: {
    usuario: "@psi.francinyruy",
    url: "https://www.instagram.com/psi.francinyruy/",
  },

  // Link de compartilhamento do Perfil da Empresa no Google, enviado pelo Guilherme em 23/10/2026.
  // Se conseguir o link longo do Maps (maps.google.com/?cid=...), ele é melhor para o sameAs.
  perfilGoogle: "https://share.google/aKUHhOAUVhJOFzO75",

  // PENDENTE: horário provisório, confirmar com ela.
  horario: {
    texto: "Segunda a sexta, das 08h às 18h",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "08:00",
    fecha: "18:00",
  },

  convenio: "Apas",
} as const;

export function linkWhatsApp(mensagem = "Olá, Franciny. Vim pelo site e gostaria de marcar uma conversa.") {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const mapa = {
  embed: `https://www.google.com/maps?q=${encodeURIComponent(
    `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}`,
  )}&output=embed`,
  abrir: site.perfilGoogle,
};

export const menu = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "mitos", rotulo: "Mitos" },
  { id: "como-funciona", rotulo: "Como funciona" },
  { id: "atendimento", rotulo: "Atendimento" },
  { id: "duvidas", rotulo: "Dúvidas" },
] as const;
