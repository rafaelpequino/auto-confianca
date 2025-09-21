'use client'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

type Detail = { n: number; label: string }
type ApartmentPlan = {
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  items: Detail[]
}

const PLAN_1: Detail[] = [
  { n: 1, label: '2 suítes' },
  { n: 2, label: 'Lavabo' },
  { n: 3, label: 'Sala de estar e jantar integradas' },
  { n: 4, label: 'Cozinha integrada' },
  { n: 5, label: 'Terraço gourmet' },
]

const PLAN_2: Detail[] = [
  { n: 1, label: '2 suítes' },
  { n: 2, label: 'Lavabo' },
  { n: 3, label: 'Sala integrada ao terraço gourmet' },
  { n: 4, label: 'Cozinha com ilha' },
  { n: 5, label: 'Ampla varanda social' },
]

const PLANS: ApartmentPlan[] = [
  {
    imageSrc: '/img/empreendimento/planta01.jpg', // ajuste o caminho
    imageAlt: 'Planta de 69m² com terraço gourmet',
    title: '2 suítes | 69 m²',
    subtitle: 'com terraço gourmet',
    items: PLAN_1,
  },
  {
    imageSrc: '/img/empreendimento/planta02.jpg', // ajuste o caminho
    imageAlt: 'Planta de 69m² com sala integrada e terraço gourmet',
    title: '2 suítes | 69 m²',
    subtitle: 'com sala integrada e terraço gourmet',
    items: PLAN_2,
  },
]

export default function Apartments() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const closeModal = useCallback(() => setSelectedImage(null), [])

  // trava/destrava o scroll do body quando o modal abre/fecha
  useEffect(() => {
    if (selectedImage) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [selectedImage])

  // fecha com tecla ESC (opcional, mas útil)
  useEffect(() => {
    if (!selectedImage) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage, closeModal])

  return (
    <section id="apartments" className="relative bg-[#f4f4ea]">
      {/* selo no topo/esquerda */}
      <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
        APARTAMENTO
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        {/* título e subtítulo */}
        <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
          O lar ideal para cada estilo de vida
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
          Duas opções de plantas cuidadosamente planejadas para oferecer{' '}
          <span className="font-semibold">conforto</span>,{' '}
          <span className="font-semibold">funcionalidade</span> e{' '}
          <span className="font-semibold">bem-estar</span>.
        </p>

        {/* blocos das plantas */}
        <div className="space-y-14">
          {PLANS.map((plan, i) => {
            const reversed = i % 2 === 1
            return (
              <div
                key={i}
                className={`grid grid-cols-1 items-start gap-8 md:grid-cols-5 md:items-center ${
                  reversed
                    ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
                    : ''
                }`}
              >
                {/* imagem */}
                <div className="md:col-span-3">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(plan.imageSrc)}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-none border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/30"
                    aria-label="Ampliar planta"
                  >
                    <Image
                      src={plan.imageSrc}
                      alt={plan.imageAlt}
                      width={1600}
                      height={1100}
                      priority={i === 0}
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="h-auto w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                  <p className="mt-2 text-center text-xs text-gray-600">
                    Clique para ampliar
                  </p>
                </div>

                {/* lista numerada */}
                <div className={`md:col-span-2 ${reversed ? 'md:pr-6' : 'md:pl-6'}`}>
                  <h3 className="mb-3 text-base font-bold uppercase text-gray-900 sm:text-lg">
                    {plan.title}
                  </h3>
                  <p className="mb-6 text-sm text-gray-700 sm:text-base">
                    {plan.subtitle}
                  </p>
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

      {/* Modal para ampliar imagem */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal} // fecha clicando no overlay
        >
          {/* stopPropagation evita fechar ao clicar no conteúdo */}
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Planta ampliada"
              width={2200}
              height={1500}
              className="h-auto w-full rounded shadow-lg"
              // permitir zoom por gesto do navegador (pinch / Ctrl + +)
            />
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gray-900 shadow hover:bg-white"
              aria-label="Fechar modal"
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
