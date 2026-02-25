'use client';

import Link from 'next/link';
import { useState } from 'react';
import imoveisData from '@/data/imoveis.json';

interface Imovel {
  codImovel: string;
  nome: string;
  descricaoCurta: string;
  fotosPrincipais: string[];
}

export default function ImoveisPage() {
  const [imoveis] = useState<Imovel[]>(imoveisData);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const imoveisFiltrados = imoveis.filter((imovel) => {
    return (
      !searchTerm ||
      imovel.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nossos Empreendimentos
          </h1>
          <p className="text-gray-600">
            Conheça as oportunidades imobiliárias exclusivas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de Busca */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <input
            type="text"
            placeholder="Buscar empreendimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400"
          />
          <div className="mt-2 text-sm text-gray-600">
            {imoveisFiltrados.length} empreendimento(s) encontrado(s)
          </div>
        </div>

        {/* Grid de Empreendimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveisFiltrados.map((imovel) => (
            <Link
              key={imovel.codImovel}
              href={`/imoveis/${imovel.codImovel}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Imagem */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={imovel.fotosPrincipais[0]}
                    alt={imovel.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Novo
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  {/* Nome */}
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {imovel.nome}
                    </h3>
                  </div>

                  {/* Descrição */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {imovel.descricaoCurta}
                    </p>
                  </div>

                  {/* Botão Ver Detalhes */}
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-2">
                      Conheça o empreendimento
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
