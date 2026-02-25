import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",              // 🔑 gera a pasta `out/` com HTML/CSS/JS
  images: {
    unoptimized: true,           // necessário se você usa <Image /> no export
  },
  trailingSlash: true,           // gera index.html dentro de pastas para cada rota
  // basePath: "/subpasta",      // se o site não estiver na raiz do domínio
};

export default nextConfig;
