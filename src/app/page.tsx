import { Topo } from "@/components/Topo";
import { FaixaTemas, Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { Mitos } from "@/components/Mitos";
import { ComoFunciona } from "@/components/ComoFunciona";
import { Atendimento } from "@/components/Atendimento";
import { Duvidas } from "@/components/Duvidas";
import { Rodape } from "@/components/Rodape";
import { FioRolagem } from "@/components/FioRolagem";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-papel px-4 py-2 font-semibold text-marrom focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Topo />
      <main id="conteudo">
        <Hero />
        <FaixaTemas />
        <Sobre />
        <Mitos />
        <ComoFunciona />
        <Atendimento />
        <Duvidas />
      </main>
      <Rodape />
      <FioRolagem />
    </>
  );
}
