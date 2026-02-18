import Link from 'next/link';
import veiculosData from '@/data/veiculos.json';
import VeiculoDetalheClient from './VeiculoDetalheClient';

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

export function generateStaticParams() {
  return veiculosData.map((veiculo) => ({
    codVeiculo: veiculo.codVeiculo,
  }));
}

export default async function VeiculoDetalhePage({
  params,
}: {
  params: Promise<{ codVeiculo: string }>;
}) {
  const { codVeiculo } = await params;
  const veiculo = veiculosData.find(
    (v) => v.codVeiculo === codVeiculo
  ) as Veiculo | undefined;

  if (!veiculo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Veículo não encontrado
          </h1>
          <Link
            href="/veiculos"
            className="text-blue-600 hover:underline font-semibold"
          >
            ← Voltar para o catálogo
          </Link>
        </div>
      </div>
    );
  }

  return <VeiculoDetalheClient veiculo={veiculo} />;
}
