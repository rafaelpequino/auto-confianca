'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Veiculo {
  codVeiculo: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  km: number;
  cambio: string;
  combustivel: string;
  cor: string;
  portas: number;
  placa: string;
  descricao: string;
  caracteristicas: string[];
  fotos: string[];
}

export default function VeiculoDetalheClient({ veiculo }: { veiculo: Veiculo }) {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  const handleWhatsApp = () => {
    const mensagem = `Olá! Vi o ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano} no site e gostaria de mais informações.`;
    const url = `https://wa.me/5511947479403?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const abrirModal = () => {
    setModalAberto(true);
    document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
    setModalAberto(false);
    document.body.style.overflow = 'auto';
  };

  // Adiciona listener para tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalAberto) {
        fecharModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalAberto]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modal de Fotos */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            onClick={fecharModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10 cursor-pointer"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="max-w-6xl w-full">
            <div className="relative">
              <img
                src={veiculo.fotos[fotoAtual]}
                alt={`${veiculo.marca} ${veiculo.modelo}`}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />

              {/* Navegação no modal */}
              {veiculo.fotos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setFotoAtual((prev) =>
                        prev === 0 ? veiculo.fotos.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full shadow-xl transition cursor-pointer"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setFotoAtual((prev) =>
                        prev === veiculo.fotos.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full shadow-xl transition cursor-pointer"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Contador no modal */}
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-lg font-semibold">
                {fotoAtual + 1} / {veiculo.fotos.length}
              </div>
            </div>

            {/* Miniaturas no modal */}
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mt-4">
              {veiculo.fotos.map((foto, index) => (
                <button
                  key={index}
                  onClick={() => setFotoAtual(index)}
                  className={`relative h-16 rounded-lg overflow-hidden cursor-pointer ${
                    fotoAtual === index
                      ? 'ring-4 ring-blue-500'
                      : 'opacity-60 hover:opacity-100'
                  } transition`}
                >
                  <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header com navegação */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/veiculos"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Fotos e Galeria */}
          <div className="lg:col-span-2">
            {/* Foto Principal */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="relative h-96 bg-gray-50 cursor-pointer" onClick={abrirModal}>
                <img
                  src={veiculo.fotos[fotoAtual]}
                  alt={`${veiculo.marca} ${veiculo.modelo}`}
                  className="w-full h-full object-contain"
                />
                
                {/* Navegação de fotos */}
                {veiculo.fotos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFotoAtual((prev) =>
                          prev === 0 ? veiculo.fotos.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-lg transition z-10 cursor-pointer"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFotoAtual((prev) =>
                          prev === veiculo.fotos.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-lg transition z-10 cursor-pointer"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
                {/* Contador de fotos */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {fotoAtual + 1} / {veiculo.fotos.length}
                </div>
              </div>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {veiculo.fotos.map((foto, index) => (
                <button
                  key={index}
                  onClick={() => setFotoAtual(index)}
                  className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                    fotoAtual === index
                      ? 'ring-4 ring-blue-600'
                      : 'opacity-70 hover:opacity-100'
                  } transition`}
                >
                  <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descrição
              </h2>
              <p className="text-gray-700 leading-relaxed">{veiculo.descricao}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Características
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {veiculo.caracteristicas.map((caracteristica, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Informações e Contato */}
          <div className="lg:col-span-1">
            {/* Card de Informações Principais */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-4">
              {/* Título */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                  {veiculo.marca}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {veiculo.modelo}
                </h1>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {veiculo.ano}
                </div>
              </div>

              {/* Preço */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Preço</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatarPreco(veiculo.preco)}
                </p>
              </div>

              {/* Especificações */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Quilometragem
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.km.toLocaleString('pt-BR')} km
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Câmbio
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.cambio}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Combustível
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.combustivel}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    Cor
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.cor}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    Portas
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.portas}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Placa
                  </span>
                  <span className="font-semibold text-gray-900">
                    {veiculo.placa}
                  </span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Entre em contato
                </button>
              </div>

              {/* Aviso */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">💡 Dica:</span> Agende uma
                  visita para conhecer o veículo pessoalmente e fazer um test
                  drive!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
