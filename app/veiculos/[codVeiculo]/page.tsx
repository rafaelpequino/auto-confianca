import Link from 'next/link';
import veiculosData from '@/data/veiculo.json';
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

const veiculos = veiculosData as Veiculo[];

export const dynamicParams = false;

export function generateStaticParams() {
  return veiculos.length > 0
    ? veiculos.map((veiculo) => ({ codVeiculo: veiculo.codVeiculo }))
    : [{ codVeiculo: '__indisponivel__' }];
}

export default async function VeiculoDetalhePage({
  params,
}: {
  params: Promise<{ codVeiculo: string }>;
}) {
  const { codVeiculo } = await params;
  const veiculo = veiculos.find(
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
