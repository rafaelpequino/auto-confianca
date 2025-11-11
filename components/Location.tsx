'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Spot = {
  title: string
  info: string
  img: string
}

const SPOTS: Spot[] = [
  {
    title: 'Shopping Ibirapuera',
    info: 'Carro • 1,3km • 4min',
    img: '/img/locais/shopping.jpg',
  },
  {
    title: 'Metrô Eucaliptos',
    info: 'Carro • 2,7km • 7min',
    img: '/img/locais/eucaliptos.jpg',
  },
  {
    title: 'Aeroporto de Congonhas',
    info: 'A pé • 1km • 12min',
    img: '/img/locais/congonhas.jpg',
  },
]

export default function Location() {
  // para o mobile: carrossel por scroll programático
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(index + dir, 0), SPOTS.length - 1)
    setIndex(next)
    const el = viewportRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card="true"]')
    const w = card?.offsetWidth ?? el.clientWidth
    el.scrollTo({ left: next * (w + 16), behavior: 'smooth' }) // 16 = gap em px (md:gap-8)
  }

  return (
    <section id="location" className="relative bg-[#f4f4ea]">
      {/* selo no topo/esquerda */}
      <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
        LOCALIZAÇÃO
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        {/* título e subtítulo */}
        <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
          A união da arquitetura com a comodidade
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
          Um bairro <span className="font-semibold">completo</span> com escolas, comércios,
          restaurantes e repleto de <span className="font-semibold">vias de acesso</span>{' '}
          para aliar suas tarefas diárias a um{' '}
          <span className="font-semibold">passeio único</span>
        </p>

        {/* imagem panorâmica */}
        <div className="relative w-full overflow-hidden rounded-none">
          <Image
            src="/img/empreendimento/03.jpg"
            alt="Panorâmica de Campo Belo com pontos de referência"
            width={1920}
            height={820}
            priority
            sizes="100vw"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* VISITE NOSSO STAND */}
        <div className="mt-12 text-center">
          <h3 className="text-base font-extrabold uppercase text-gray-900">Utilize o Whatsapp (11) 94747-9403 para marcar o café e saborear essa oportunidade</h3>
          <p className="mt-1 text-xs text-gray-700 sm:text-sm">
            Rua Barão do Triunfo, 1722 – Campo Belo, São Paulo – SP, 04602-006
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-700 sm:text-base">
            Pensado para todas as ocasiões; para casais que buscam um <span className="font-semibold">lar</span>,
            perfeito para quem deseja <span className="font-semibold">investir</span> com segurança e sólido
            como patrimônio
          </p>
        </div>

        {/* Carrossel / Grade */}
        <div className="relative mt-10">
          {/* setas – visíveis só no mobile */}
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-triu-green md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-triu-green md:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* viewport */}
          <div
            ref={viewportRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
          >
            {SPOTS.map((s, i) => (
              <article
                key={s.title}
                data-card="true"
                className="min-w-[85%] snap-center md:min-w-0"
              >
                <div className="aspect-[4/4] w-full overflow-hidden border border-gray-200 bg-white">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-800">{s.title}</h4>
                  <p className="text-xs font-semibold text-gray-700">{s.info}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
