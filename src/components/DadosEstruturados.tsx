import { site } from "@/site.config";
import { duvidas } from "@/conteudo";

// JSON-LD para Google e respostas de IA.
// A schema.org não tem um tipo "Psicólogo". "Psychiatric" diria que ela é psiquiatra, então o
// negócio usa MedicalBusiness com additionalType apontando para "psicólogo" (Q212980) e
// "psicoterapia" (Q183257) na Wikidata.
export function DadosEstruturados() {
  const id = (frag: string) => `${site.url}/#${frag}`;

  const endereco = {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    addressCountry: site.endereco.pais,
    // bairro não tem campo próprio na schema.org; vai junto com a rua no texto visível
    ...(site.endereco.cep ? { postalCode: site.endereco.cep } : {}),
  };

  const grafo = [
    {
      "@type": "WebSite",
      "@id": id("site"),
      url: site.url,
      name: `${site.nome}, Psicóloga`,
      inLanguage: "pt-BR",
      publisher: { "@id": id("franciny") },
    },
    {
      "@type": "Person",
      "@id": id("franciny"),
      name: site.nome,
      jobTitle: "Psicóloga clínica",
      description: `Psicóloga clínica em Araçatuba/SP, ${site.crp}. Atende adultos com Terapia Cognitivo Comportamental (TCC), presencial e online, desde ${site.desde}.`,
      image: `${site.url}/img/franciny-ruy-hero-960.webp`,
      url: site.url,
      email: `mailto:${site.email}`,
      telephone: site.telefoneE164,
      worksFor: { "@id": id("consultorio") },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Registro profissional",
          name: site.crp,
          recognizedBy: { "@type": "Organization", name: "Conselho Regional de Psicologia de São Paulo (CRP 06)" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Pós-graduação",
          name: "Pós-graduação em Terapia Cognitivo Comportamental",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "FAVENI Faculdade Venda Nova do Imigrante" },
        },
      ],
      knowsAbout: [
        "Terapia Cognitivo Comportamental",
        "Ansiedade",
        "Crises de ansiedade",
        "Relações na família e no trabalho",
        "Transtornos afetivos",
        "Transtornos de personalidade",
        "Padrões de pensamento e crenças",
        "Saúde mental da mulher",
      ],
      sameAs: [site.instagram.url, site.perfilGoogle],
    },
    {
      "@type": "MedicalBusiness",
      "@id": id("consultorio"),
      additionalType: ["https://www.wikidata.org/wiki/Q212980", "https://www.wikidata.org/wiki/Q183257"],
      name: `${site.nome} Psicóloga`,
      description: `Psicoterapia para adultos com Terapia Cognitivo Comportamental (TCC), presencial em Araçatuba/SP e online. Sessões com ${site.duracaoSessao}. Convênio: Apas; demais atendimentos particulares.`,
      url: site.url,
      image: `${site.url}/img/franciny-ruy-hero-960.webp`,
      telephone: site.telefoneE164,
      email: site.email,
      address: endereco,
      ...(site.geo
        ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }
        : {}),
      hasMap: site.perfilGoogle,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: site.horario.dias.map((d) => `https://schema.org/${d}`),
          opens: site.horario.abre,
          closes: site.horario.fecha,
        },
      ],
      areaServed: [
        { "@type": "City", name: "Araçatuba", containedInPlace: { "@type": "State", name: "São Paulo" } },
        { "@type": "VirtualLocation", name: "Atendimento online" },
      ],
      availableService: [
        {
          "@type": "MedicalTherapy",
          name: "Psicoterapia presencial com TCC",
          description: `Sessão individual para adultos no consultório em Araçatuba, ${site.duracaoSessao}.`,
        },
        {
          "@type": "MedicalTherapy",
          name: "Psicoterapia online com TCC",
          description: `Sessão individual online para adultos, ${site.duracaoSessao}.`,
        },
      ],
      paymentAccepted: "Particular, convênio Apas",
      founder: { "@id": id("franciny") },
      employee: { "@id": id("franciny") },
      sameAs: [site.instagram.url, site.perfilGoogle],
    },
    {
      "@type": "FAQPage",
      "@id": id("duvidas"),
      mainEntity: duvidas.map((d) => ({
        "@type": "Question",
        name: d.pergunta,
        acceptedAnswer: { "@type": "Answer", text: d.resposta.join(" ") },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": grafo };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
