'use client'

export default function Video() {
    return (
        <section id="video" className="relative bg-[#f4f4ea]">
            {/* selo no topo/esquerda */}
            <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
                VÍDEO
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* título e subtítulo no padrão dos demais */}
                <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
                    Viva a experiência por dentro
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
                    Assista ao vídeo oficial e conheça os espaços, diferenciais e o estilo de vida do empreendimento.
                </p>

                {/* card com player responsivo */}
                <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
                    <div className="relative w-full overflow-hidden rounded-xl">
                        {/* wrapper para manter proporção 16:9 */}
                        <div className="aspect-video w-full">
                            <iframe
                                className="h-full w-full"
                                src="https://www.youtube-nocookie.com/embed/G6cnz3cTQgU?autoplay=0&rel=0&modestbranding=1&playsinline=1"
                                title="Vídeo do empreendimento"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* link de fallback/acessibilidade */}
                <p className="mt-3 text-center text-xs text-gray-600">
                    Problemas para reproduzir?{' '}
                    <a
                        href="https://www.youtube.com/watch?v=G6cnz3cTQgU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline hover:no-underline"
                    >
                        Assista no YouTube
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}
