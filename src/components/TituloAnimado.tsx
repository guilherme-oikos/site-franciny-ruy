import type { ElementType } from "react";

export type Parte = { texto: string; leve?: boolean };

// Título com mistura de peso (700 + 300). Parado, sem animação: o efeito palavra a palavra
// foi retirado a pedido do Guilherme (29/10/2026). O nome do arquivo ficou para não mexer nos imports.
export function TituloAnimado({
  partes,
  as: Tag = "h2",
  className = "",
  corLeve = "text-terracota-escura",
  id,
}: {
  partes: Parte[];
  as?: ElementType;
  className?: string;
  corLeve?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      {partes.map((p, pi) => (
        <span key={pi} className={p.leve ? `peso-leve ${corLeve}` : undefined}>
          {p.texto}
        </span>
      ))}
    </Tag>
  );
}
