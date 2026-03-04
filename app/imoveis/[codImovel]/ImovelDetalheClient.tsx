'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DetailItem {
  n: number;
  label: string;
}

interface Apartamento {
  titulo: string;
  subtitulo: string;
  imagemPlanta: string;
  detalhes: DetailItem[];
}

interface AreaComum {
  imagemPlanta: string;
  detalhes: DetailItem[];
}

interface Diferencial {
  titulo: string;
  descricao: string;
}

interface Localidade {
  titulo: string;
  info: string;
  img: string;
}

interface Imovel {
  codImovel: string;
  nome: string;
  localizacao: string;
  endereco: string;
  telefone: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  fotosPrincipais: string[];
  apartamentos: Apartamento[];
  areasComuns: AreaComum[];
  diferenciais: Diferencial[];
  videoUrl: string;
  localidades: Localidade[];
}

export default function ImovelDetalheClient({ imovel }: { imovel: Imovel }) {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [indexLocais, setIndexLocais] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (selectedImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage, closeModal]);

  const goLocais = (dir: -1 | 1) => {
    const next = Math.min(
      Math.max(indexLocais + dir, 0),
      imovel.localidades.length - 1
    );
    setIndexLocais(next);
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card="true"]');
    const w = card?.offsetWidth ?? el.clientWidth;
    el.scrollTo({ left: next * (w + 16), behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-triu-dark">
      {/* Botão voltar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/imoveis"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para o catálogo
          </Link>
        </div>
      </div>

      {/* WELCOME SECTION */}
      <section className="relative min-h-screen w-full flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${imovel.fotosPrincipais[0]})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-white font-[350] max-w-md">
            <h2 className="text-[13px] md:text-sm tracking-[0.35em] font-medium mb-4">
              {imovel.nome}
            </h2>
            <p className="text-4xl md:text-5xl font-semibold leading-none mb-6">
              {imovel.descricaoCurta}
            </p>
          </div>
        </div>

        <Link
          href={`https://wa.me/55${imovel.telefone}`}
          target="_blank"
          className="fixed bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 text-xs md:text-sm font-medium px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          Fale com um consultor
        </Link>
      </section>

      {/* PROJECT SECTION */}
      <section className="relative scroll-mt-24 bg-[#EEEEE1] text-center">
        <div className="pointer-events-none absolute left-4 top-6 z-20 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          PROJETO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-extrabold uppercase text-gray-900 sm:text-2xl md:text-3xl">
            Localização estratégica para viver com mais conveniência
          </h2>

          <p className="mx-auto max-w-2xl text-sm text-gray-700 sm:text-base">
            {imovel.descricaoCompleta}
          </p>

          <div className="relative mt-12 flex justify-center">
            <Image
              src={imovel.fotosPrincipais[1]}
              alt="Fachada do empreendimento"
              width={500}
              height={1080}
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 720px"
              className="h-auto max-w-full object-contain"
            />
          </div>

          <div className="relative mt-12 w-full overflow-hidden">
            <h3
              aria-hidden
              className="select-none text-[clamp(4rem,12vw,12rem)] font-thin tracking-tight text-white"
            >
              {imovel.nome}
            </h3>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="mb-2 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:text-xs">
                Em um dos melhores endereços da cidade
              </p>
              <p className="text-sm font-semibold uppercase text-gray-900 sm:text-base">
                {imovel.endereco}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="location" className="relative bg-[#f4f4ea]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          LOCALIZAÇÃO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            {imovel.codImovel === 'quaddra-lorena'
              ? 'Um endereço elegante, que transforma suas tarefas diárias em um passeio único.'
              : 'A união da arquitetura com a comodidade'}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Um bairro <span className="font-semibold">completo</span> com
            escolas, comércios, restaurantes e repleto de{' '}
            <span className="font-semibold">vias de acesso</span> para aliar
            suas tarefas diárias a um{' '}
            <span className="font-semibold">passeio único</span>
          </p>

          <div className="relative w-full overflow-hidden rounded-none">
            <Image
              src={imovel.fotosPrincipais[2]}
              alt="Panorâmica do bairro"
              width={1920}
              height={820}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-base font-extrabold uppercase text-gray-900">
            Pensado para proporcionar a você e sua família, o luxo de viver o melhor.
            </h3>
            <p className="mt-1 text-xs text-gray-700 sm:text-sm">
              {imovel.localizacao}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-700 sm:text-base">
              Pensado para todas as ocasiões; para casais que buscam um{' '}
              <span className="font-semibold">lar</span>, perfeito para quem
              deseja <span className="font-semibold">investir</span> com
              segurança e sólido como patrimônio
            </p>
          </div>

          <div className="relative mt-10">
            <button
              onClick={() => goLocais(-1)}
              aria-label="Anterior"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-triu-green md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goLocais(1)}
              aria-label="Próximo"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-2 shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-triu-green md:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={viewportRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
            >
              {imovel.localidades.map((local, i) => (
                <article key={local.titulo} data-card="true" className="min-w-[85%] snap-center md:min-w-0">
                  <div className="aspect-[4/4] w-full overflow-hidden border border-gray-200 bg-white">
                    <Image
                      src={local.img}
                      alt={local.titulo}
                      width={1200}
                      height={1200}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-800">
                      {local.titulo}
                    </h4>
                    <p className="text-xs font-semibold text-gray-700">
                      {local.info}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS SECTION */}
      <section id="apartments" className="relative bg-[#f4f4ea]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          APARTAMENTO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            O lar ideal para cada estilo de vida
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Duas opções de plantas cuidadosamente planejadas para oferecer{' '}
            <span className="font-semibold">conforto</span>,{' '}
            <span className="font-semibold">funcionalidade</span> e{' '}
            <span className="font-semibold">bem-estar</span>.
          </p>

          <div className="space-y-14">
            {imovel.apartamentos.map((apt, i) => {
              const reversed = i % 2 === 1;
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
                    <p className="mt-2 text-center text-xs text-gray-600">
                      Clique para ampliar
                    </p>
                  </div>

                  <div
                    className={`md:col-span-2 ${
                      reversed ? 'md:pr-6' : 'md:pl-6'
                    }`}
                  >
                    <h3 className="mb-3 text-base font-bold uppercase text-gray-900 sm:text-lg">
                      {apt.titulo}
                    </h3>
                    <p className="mb-6 text-sm text-gray-700 sm:text-base">
                      {apt.subtitulo}
                    </p>
                    <ol className="space-y-4">
                      {apt.detalhes.map((detalhe) => (
                        <li
                          key={detalhe.n}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-[2px] inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-sm bg-gray-900 px-2 text-[11px] font-extrabold leading-none text-white">
                            {detalhe.n}.
                          </span>
                          <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-900 sm:text-sm">
                            {detalhe.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
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
                alt="Planta ampliada"
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

      {/* COMMON AREAS SECTION */}
      <section id="common-areas" className="relative bg-[#EEEEE1]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          ÁREAS COMUNS
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Momentos que se tornam memórias
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Áreas comuns planejadas para <span className="font-semibold">relaxar</span>,
            receber <span className="font-semibold">amigos</span> e viver momentos
            únicos com conforto e <span className="font-semibold">elegância</span>
          </p>

          <div className="space-y-14">
            {imovel.areasComuns.map((area, i) => {
              const reversed = i % 2 === 1;
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
                      aria-label="Ampliar planta das áreas comuns"
                    >
                      <Image
                        src={area.imagemPlanta}
                        alt="Áreas comuns"
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

                  <div
                    className={`md:col-span-2 ${
                      reversed ? 'md:pr-6' : 'md:pl-6'
                    }`}
                  >
                    <ol className="space-y-4">
                      {area.detalhes.map((detalhe) => (
                        <li
                          key={detalhe.n}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-[2px] inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-sm bg-gray-900 px-2 text-[11px] font-extrabold leading-none text-white">
                            {detalhe.n}.
                          </span>
                          <span className="text-[13px] font-semibold uppercase tracking-wide text-gray-900 sm:text-sm">
                            {detalhe.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIFFERENCES SECTION */}
      <section id="differences" className="relative bg-[#EEEEE1]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          DIFERENCIAIS
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Detalhes que elevam o seu dia a dia
          </h2>
          <p className="mx-auto mb-10 max-w-4xl text-center text-sm text-gray-700 sm:text-base">
            Diferenciais que combinam{' '}
            <span className="font-semibold">conforto</span>,{' '}
            <span className="font-semibold">praticidade</span> e{' '}
            <span className="font-semibold">bem-estar</span>.
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
                <p className="text-sm leading-relaxed text-gray-700">
                  {descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="video" className="relative bg-[#f4f4ea]">
        <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
          VÍDEO
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
            Viva a experiência por dentro
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-gray-700 sm:text-base">
            Assista ao vídeo oficial e conheça os espaços, diferenciais e o
            estilo de vida do empreendimento.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
            <div className="relative w-full overflow-hidden rounded-xl">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={imovel.videoUrl}
                  title="Vídeo do empreendimento"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

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
    </div>
  );
}

import { useRef } from 'react';
