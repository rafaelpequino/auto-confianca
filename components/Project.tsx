import Image from 'next/image'

export default function Location() {
    return (
        <section
            id="project"
            className="relative scroll-mt-24 bg-[#EEEEE1] text-center"
        >
            {/* rótulo no canto superior esquerdo */}
            <div className="pointer-events-none absolute left-4 top-6 z-20 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
                PROJETO
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* título principal */}
                <h2 className="mb-6 text-xl font-extrabold uppercase text-gray-900 sm:text-2xl md:text-3xl">
                    Localização estratégica para viver com mais conveniência
                </h2>

                <p className="mx-auto max-w-2xl text-sm text-gray-700 sm:text-base">
                    Entre o charme da <span className="font-semibold">tradição</span> e a energia da{' '}
                    <span className="font-semibold">modernidade</span>, o Triu 1722 se destaca como um
                    ícone de <span className="font-semibold">exclusividade</span>
                </p>

                {/* imagem única do prédio */}
                <div className="relative mt-12 flex justify-center">
                    <Image
                        src="/img/empreendimento/02.jpg"
                        alt="Fachada do Triu 1722"
                        width={500}
                        height={1080}
                        priority
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 720px"
                        className="h-auto max-w-full object-contain"
                    />
                </div>

                {/* bloco com watermark em linha */}
                <div className="relative mt-12 w-full overflow-hidden">
                    {/* watermark em linha, maior e branco */}
                    <h3
                        aria-hidden
                        className="select-none text-[clamp(4rem,12vw,12rem)] font-thin tracking-tight text-white"
                    >
                        TRIU 1722
                    </h3>

                    {/* textos centralizados sobre a linha */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="mb-2 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:text-xs">
                            Em uma das ruas mais famosas do Campo Belo
                        </p>
                        <p className="text-sm font-semibold uppercase text-gray-900 sm:text-base">
                            Esquina da Rua Barão do Triunfo com a Demóstenes
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
