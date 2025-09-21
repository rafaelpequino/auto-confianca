'use client'
import Image from 'next/image'

type Amenity = { n: number; label: string }
type Plan = {
    imageSrc: string
    imageAlt: string
    items: Amenity[]
}

const AMENITIES_1: Amenity[] = [
    { n: 1, label: 'Guarita blindada' },
    { n: 2, label: 'Espaço delivery' },
    { n: 3, label: 'Hall social' },
    { n: 4, label: 'Coworking' },
    { n: 5, label: 'Fitness térreo' },
    { n: 6, label: 'Espaço gourmet' },
    { n: 7, label: 'Brinquedoteca' },
    { n: 8, label: 'Bicicletário com oficina' },
    { n: 9, label: 'Mini-market' },
    { n: 10, label: 'Pet place' },
]

// TODO: substitua os labels abaixo pelos itens exatamente como estão na segunda planta
const AMENITIES_2: Amenity[] = [
    { n: 1, label: 'Solarium' },
    { n: 2, label: 'Piscina Climatizada' },
    { n: 3, label: 'Deck Molhado' },
    { n: 4, label: 'Fitness Rooftop' },
    { n: 5, label: 'Espaço Wellness' },
    { n: 6, label: 'Sala de Massagem' },
    { n: 7, label: 'Hidromassagem' }
]

const PLANS: Plan[] = [
    {
        imageSrc: '/img/empreendimento/05.jpg', // ajuste o caminho
        imageAlt: 'Planta das áreas comuns com numeração de ambientes',
        items: AMENITIES_1,
    },
    {
        imageSrc: '/img/empreendimento/06.jpg', // ajuste o caminho da segunda planta
        imageAlt: 'Planta complementar das áreas comuns com numeração de ambientes',
        items: AMENITIES_2,
    },
]

export default function CommonAreas() {
    return (
        <section id="common-areas" className="relative bg-[#f4f4ea]">
            {/* selo no topo/esquerda */}
            <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
                ÁREAS COMUNS
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* título e subtítulo */}
                <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
                    Momentos que se tornam memórias
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
                    Áreas comuns planejadas para <span className="font-semibold">relaxar</span>, receber{' '}
                    <span className="font-semibold">amigos</span> e viver momentos únicos com conforto e{' '}
                    <span className="font-semibold">elegância</span>
                </p>

                {/* blocos das plantas */}
                <div className="space-y-14">
                    {PLANS.map((plan, i) => {
                        const reversed = i % 2 === 1 // segunda planta alterna layout
                        return (
                            <div
                                key={i}
                                className={`grid grid-cols-1 gap-8 md:grid-cols-5 items-start md:items-center ${reversed ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
                                    }`}
                            >
                                {/* imagem */}
                                <div className="md:col-span-3">
                                    <div className="relative w-full overflow-hidden rounded-none border border-gray-200">
                                        <Image
                                            src={plan.imageSrc}
                                            alt={plan.imageAlt}
                                            width={1600}
                                            height={1100}
                                            priority={i === 0}
                                            sizes="(min-width: 768px) 60vw, 100vw"
                                            className="h-auto w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* lista numerada */}
                                <div className={`md:col-span-2 ${reversed ? 'md:pr-6' : 'md:pl-6'}`}>
                                    <ol className="space-y-4">
                                        {plan.items.map((a) => (
                                            <li key={a.n} className="flex items-start gap-3">
                                                <span className="mt-[2px] inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-sm bg-gray-900 px-2 text-[11px] font-extrabold leading-none text-white">
                                                    {a.n}.
                                                </span>
                                                <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-900 sm:text-sm">
                                                    {a.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
