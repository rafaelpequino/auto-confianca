'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DetailItem {
  n: number
  label: string
}

interface Apartamento {
  titulo: string
  subtitulo: string
  imagemPlanta: string
  detalhes: DetailItem[]
}

interface AreaComum {
  imagemPlanta: string
  detalhes: DetailItem[]
}

interface Diferencial {
  titulo: string
  descricao: string
}

interface Localidade {
  titulo: string
  info: string
  img: string
}

interface Imovel {
  codImovel: string
  nome: string
  localizacao: string
  endereco: string
  telefone: string
  descricaoCurta: string
  descricaoCompleta: string
  fotosPrincipais: string[]
  apartamentos: Apartamento[]
  areasComuns: AreaComum[]
  diferenciais: Diferencial[]
  videoUrl: string
  localidades: Localidade[]
}

export default function QuaddraLorenaClient({ imovel }: { imovel: Imovel }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [indexLocais, setIndexLocais] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const closeModal = useCallback(() => setSelectedImage(null), [])

  useEffect(() => {
    if (selectedImage) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [selectedImage])

  useEffect(() => {
    if (!selectedImage) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage, closeModal])

  const goLocais = (dir: -1 | 1) => {
    const next = Math.min(
      Math.max(indexLocais + dir, 0),
      imovel.localidades.length - 1
    )
    setIndexLocais(next)
    const el = viewportRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card="true"]')
    const w = card?.offsetWidth ?? el.clientWidth
    el.scrollTo({ left: next * (w + 16), behavior: 'smooth' })
  }

  return (
    <main className="font-sans text-triu-dark">

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${imovel.fotosPrincipais[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-white font-[350] max-w-lg">
            <p className="text-[11px] md:text-xs tracking-[0.4em] font-medium mb-3 uppercase opacity-80">
              Por Aflalo &amp; Gasperini · Yuny
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold leading-none mb-4">
              {imovel.nome}
            </h1>
            <p className="text-[13px] md:text-sm tracking-[0.35em] font-medium mb-6 uppercase">
              APTO
            </p>
            <ul className="space-y-1 text-[13px] md:text-sm tracking-wide">
              <li>{imovel.descricaoCurta}</li>
              <li>Depósito + Private Space Office</li>
              <li>56 unidades exclusivas | Jardins, SP</li>
            </ul>
          </div>
        </div>

        {/* Botão WhatsApp fixo */}
        <Link
          href={`https://wa.me/55${imovel.telefone}`}
          target="_blank"
          className="fixed bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 text-xs md:text-sm font-medium px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          Fale com um consultor
        </Link>
      </section>

      {/* ─── PROJETO ────────────────────────────────────────────────────── */}
      <section id="project" className="relative scroll-mt-24 bg-[#EEEEE1] text-center">
        <div className="pointer-events-none absolute left-4 top-6 z-20 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          PROJETO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-extrabold uppercase text-gray-900 sm:text-2xl md:text-3xl">
            O novo ícone de luxo no coração dos Jardins
          </h2>

          <p className="mx-auto max-w-2xl text-sm text-gray-700 sm:text-base">
            {imovel.descricaoCompleta}
          </p>

          {/* Destaques em linha */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            {[
              { n: '56', label: 'Unidades\nexclusivas' },
              { n: '5.414m²', label: 'Maior terreno\ndo Jardins' },
              { n: '4', label: 'Suítes em\ncada unidade' },
            ].map(({ n, label }) => (
              <div key={n} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{n}</p>
                <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-wide text-gray-600 whitespace-pre-line">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-12 flex justify-center">
            <Image
              src={imovel.fotosPrincipais[1]}
              alt="Fachada do Quaddra Lorena"
              width={600}
              height={900}
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 720px"
              className="h-auto max-w-full object-contain"
            />
          </div>

          <div className="relative mt-12 w-full overflow-hidden">
            <h3
              aria-hidden
              className="select-none text-[clamp(3rem,10vw,10rem)] font-thin tracking-tight text-white"
            >
              QUADDRA LORENA
            </h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="mb-2 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:text-xs">
                Em um dos endereços mais valorizados da cidade
              </p>
              <p className="text-sm font-semibold uppercase text-gray-900 sm:text-base">
                {imovel.endereco}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCALIZAÇÃO ────────────────────────────────────────────────── */}
      <section id="location" className="relative bg-[#f4f4ea]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          LOCALIZAÇÃO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Tudo o que você precisa a poucos passos
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            No <span className="font-semibold">coração dos Jardins</span>, cercado pelas melhores
            escolas, restaurantes e parques de São Paulo,{' '}
            <span className="font-semibold">com fácil acesso</span> à Avenida Paulista e ao metrô
          </p>

          <div className="relative w-full overflow-hidden rounded-none">
            <Image
              src={imovel.fotosPrincipais[2]}
              alt="Vista aérea da região dos Jardins"
              width={1920}
              height={820}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-base font-extrabold uppercase text-gray-900">
              Agende sua visita – (11) 94747-9403
            </h3>
            <p className="mt-1 text-xs text-gray-700 sm:text-sm">
              {imovel.localizacao}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-700 sm:text-base">
              Ideal para famílias que buscam um{' '}
              <span className="font-semibold">lar de alto padrão</span> e para quem deseja{' '}
              <span className="font-semibold">investir</span> em um dos mercados mais valorizados de São Paulo
            </p>
          </div>

          {/* Carrossel de locais */}
          <div className="relative mt-10">
            <button
              onClick={() => goLocais(-1)}
              aria-label="Anterior"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goLocais(1)}
              aria-label="Próximo"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none md:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={viewportRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
            >
              {imovel.localidades.map((local) => (
                <article
                  key={local.titulo}
                  data-card="true"
                  className="min-w-[85%] snap-center md:min-w-0"
                >
                  <div className="aspect-[4/4] w-full overflow-hidden border border-gray-200 bg-white">
                    <Image
                      src={local.img}
                      alt={local.titulo}
                      width={800}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-800">{local.titulo}</h4>
                    <p className="text-xs font-semibold text-gray-700">{local.info}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ÁREAS COMUNS ───────────────────────────────────────────────── */}
      <section id="common-areas" className="relative bg-[#EEEEE1]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          ÁREAS COMUNS
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            High Wellness – um conceito único de bem-estar
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Áreas de <span className="font-semibold">lazer e saúde</span> pensadas para quem exige o{' '}
            <span className="font-semibold">melhor</span> em cada detalhe do seu cotidiano
          </p>

          <div className="space-y-14">
            {imovel.areasComuns.map((area, i) => {
              const reversed = i % 2 === 1
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 gap-8 md:grid-cols-5 items-start md:items-center ${
                    reversed
                      ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
                      : ''
                  }`}
                >
                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(area.imagemPlanta)}
                      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-none border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/30"
                      aria-label="Ampliar imagem das áreas comuns"
                    >
                      <Image
                        src={area.imagemPlanta}
                        alt="Áreas comuns do Quaddra Lorena"
                        width={1600}
                        height={1100}
                        priority={i === 0}
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="h-auto w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </button>
                    <p className="mt-2 text-center text-xs text-gray-600">Clique para ampliar</p>
                  </div>

                  <div className={`md:col-span-2 ${reversed ? 'md:pr-6' : 'md:pl-6'}`}>
                    <ol className="space-y-4">
                      {area.detalhes.map((d) => (
                        <li key={d.n} className="flex items-start gap-3">
                          <span className="mt-[2px] inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-sm bg-gray-900 px-2 text-[11px] font-extrabold leading-none text-white">
                            {d.n}.
                          </span>
                          <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-900 sm:text-sm">
                            {d.label}
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

      {/* ─── APARTAMENTOS ───────────────────────────────────────────────── */}
      <section id="apartments" className="relative bg-[#f4f4ea]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          APARTAMENTO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Plantas pensadas para um viver extraordinário
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Tipologias que combinam{' '}
            <span className="font-semibold">amplitude</span>,{' '}
            <span className="font-semibold">funcionalidade</span> e{' '}
            <span className="font-semibold">sofisticação</span> em cada metro quadrado
          </p>

          <div className="space-y-14">
            {imovel.apartamentos.map((apt, i) => {
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
                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(apt.imagemPlanta)}
                      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-none border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/30"
                      aria-label="Ampliar planta"
                    >
                      <Image
                        src={apt.imagemPlanta}
                        alt={`Planta do apartamento ${apt.titulo}`}
                        width={1600}
                        height={1100}
                        priority={i === 0}
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="h-auto w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </button>
                    <p className="mt-2 text-center text-xs text-gray-600">Clique para ampliar</p>
                  </div>

                  <div className={`md:col-span-2 ${reversed ? 'md:pr-6' : 'md:pl-6'}`}>
                    <h3 className="mb-3 text-base font-bold uppercase text-gray-900 sm:text-lg">
                      {apt.titulo}
                    </h3>
                    <p className="mb-6 text-sm text-gray-700 sm:text-base">{apt.subtitulo}</p>
                    <ol className="space-y-4">
                      {apt.detalhes.map((d) => (
                        <li key={d.n} className="flex items-start gap-3">
                          <span className="mt-[2px] inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-sm bg-gray-900 px-2 text-[11px] font-extrabold leading-none text-white">
                            {d.n}.
                          </span>
                          <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-900 sm:text-sm">
                            {d.label}
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

        {/* Modal zoom */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Imagem ampliada"
                width={2200}
                height={1500}
                className="h-auto w-full rounded shadow-lg"
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

      {/* ─── DIFERENCIAIS ───────────────────────────────────────────────── */}
      <section id="differences" className="relative bg-[#EEEEE1]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          DIFERENCIAIS
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Exclusividade em cada detalhe
          </h2>
          <p className="mx-auto mb-10 max-w-4xl text-center text-sm text-gray-700 sm:text-base">
            Um empreendimento que redefine o conceito de{' '}
            <span className="font-semibold">luxo</span> e{' '}
            <span className="font-semibold">bem-estar</span> em São Paulo
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {imovel.diferenciais.map(({ titulo, descricao }, i) => (
              <article
                key={i}
                className="group h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                  {titulo}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">{descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VÍDEO (opcional) ───────────────────────────────────────────── */}
      {imovel.videoUrl && (
        <section id="video" className="relative bg-[#f4f4ea]">
          <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
            VÍDEO
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
              Viva a experiência por dentro
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
              Assista ao vídeo oficial e conheça os espaços e o estilo de vida do empreendimento.
            </p>

            <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
              <div className="relative w-full overflow-hidden rounded-xl">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={imovel.videoUrl}
                    title="Vídeo do Quaddra Lorena"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA FINAL ──────────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-2 text-[10px] uppercase tracking-[.3em] text-gray-400">
            Início das obras · Março 2026
          </p>
          <h2 className="mb-4 text-2xl font-extrabold uppercase sm:text-3xl">
            Garanta a sua unidade
          </h2>
          <p className="mb-8 text-sm text-gray-300 sm:text-base">
            Apenas 56 unidades disponíveis. Entre em contato com nosso consultor exclusivo e agende uma
            visita ao apartamento decorado.
          </p>
          <Link
            href={`https://wa.me/55${imovel.telefone}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-8 py-4 text-sm font-bold uppercase tracking-wide shadow-lg hover:bg-gray-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Falar com consultor
          </Link>
        </div>
      </section>

    </main>
  )
}
