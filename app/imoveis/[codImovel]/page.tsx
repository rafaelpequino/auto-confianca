import imoveisData from '@/data/imoveis.json';
import ImovelDetalheClient from './ImovelDetalheClient';

interface Imovel {
  codImovel: string;
  nome: string;
  localizacao: string;
  endereco: string;
  telefone: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  fotosPrincipais: string[];
  apartamentos: any[];
  areasComuns: any[];
  diferenciais: any[];
  videoUrl: string;
  localidades: any[];
}

export function generateStaticParams() {
  return imoveisData.map((imovel) => ({
    codImovel: imovel.codImovel,
  }));
}

export default async function ImovelDetalhePage({
  params,
}: {
  params: Promise<{ codImovel: string }>;
}) {
  const { codImovel } = await params;
  const imovel = imoveisData.find(
    (i) => i.codImovel === codImovel
  ) as Imovel | undefined;

  if (!imovel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Empreendimento não encontrado
          </h1>
          <a
            href="/imoveis"
            className="text-blue-600 hover:underline font-semibold"
          >
            ← Voltar para o catálogo
          </a>
        </div>
      </div>
    );
  }

  return <ImovelDetalheClient imovel={imovel} />;
}
