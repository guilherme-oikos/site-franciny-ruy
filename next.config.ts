import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // site estático: `npm run build` gera a pasta `out/`, pronta para a Vercel ou qualquer hospedagem
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
