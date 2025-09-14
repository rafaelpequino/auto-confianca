import Welcome from "@/components/Welcome";

const Section = ({ id, title }: { id: string; title: string }) => (
  <section
    id={id}
    className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-white"
  >
    <div className="max-w-3xl w-full">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-neutral-900">
        {title}
      </h2>
      <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
        Conteúdo placeholder para a seção <strong>{title}</strong>. Substitua por
        informações reais do projeto. Esta área foi criada para permitir a
        navegação suave pelos links do header. Cada seção tem um scroll-margin
        ajustado para não ficar escondida atrás do cabeçalho fixo.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <main className="w-full flex flex-col">
      <Welcome />
      <Section id="localizacao" title="Localização" />
      <Section id="areas-comuns" title="Áreas Comuns" />
      <Section id="apartamento" title="Apartamento" />
      <Section id="diferenciais" title="Diferenciais" />
      <Section id="ficha-tecnica" title="Ficha Técnica" />
      <Section id="video" title="Assista ao Vídeo" />
      <Section id="contato" title="Contato" />
      <footer className="py-12 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Projeto TRIU 1722</footer>
    </main>
  );
}

