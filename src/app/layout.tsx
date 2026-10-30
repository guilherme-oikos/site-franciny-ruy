import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Dancing_Script, Figtree } from "next/font/google";
import { site } from "@/site.config";
import { DadosEstruturados } from "@/components/DadosEstruturados";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

const titulo = `${site.nome} | Psicóloga em Araçatuba`;
const descricao =
  "Psicóloga clínica em Araçatuba/SP, CRP 06/149635. Terapia Cognitivo Comportamental (TCC) para adultos, presencial e online. Atende APAS. Fale no WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  authors: [{ name: site.nome }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: `${site.nome}, Psicóloga`,
    title: titulo,
    description: descricao,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Franciny Ruy, psicóloga em Araçatuba, sorrindo, de colete terracota",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3b2a20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script do <head> acrescenta a classe "js" antes de o React carregar
    <html lang="pt-BR" suppressHydrationWarning className={`${bricolage.variable} ${figtree.variable} ${dancing.variable}`}>
      <head>
        {/* Marca que o JS está ativo: só então os títulos começam escondidos para animar */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <DadosEstruturados />
      </head>
      <body>{children}</body>
    </html>
  );
}
