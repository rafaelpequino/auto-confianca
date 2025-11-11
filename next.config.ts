import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",              // 🔑 gera a pasta `out/` com HTML/CSS/JS
  images: {
    unoptimized: true,           // necessário se você usa <Image /> no export
  },
  // trailingSlash: true,        // opcional, útil em hospedagens tipo Hostinger
  // basePath: "/subpasta",      // se o site não estiver na raiz do domínio
};

export default nextConfig;
