import imoveisData from '@/data/imoveis.json'
import QuaddraLorenaClient from './QuaddraLorenaClient'

export default function QuaddraLorenaPage() {
  const imovel = imoveisData.find((i) => i.codImovel === 'quaddra-lorena')

  if (!imovel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Empreendimento não encontrado.</p>
      </div>
    )
  }

  return <QuaddraLorenaClient imovel={imovel as any} />
}
