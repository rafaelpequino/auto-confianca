'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  DoorOpen,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Phone,
  Settings2,
  X,
} from 'lucide-react';

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

const specificationIcons = [Gauge, Settings2, Fuel, Palette, DoorOpen, CircleHelp];

export default function VeiculoDetalheClient({ veiculo }: { veiculo: Veiculo }) {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const formatarPreco = (preco: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);

  const fotoAnterior = () =>
    setFotoAtual((foto) => (foto === 0 ? veiculo.fotos.length - 1 : foto - 1));

  const proximaFoto = () =>
    setFotoAtual((foto) => (foto === veiculo.fotos.length - 1 ? 0 : foto + 1));

  const handleWhatsApp = () => {
    const mensagem = `Olá! Vi o ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano} no site e gostaria de mais informações.`;
    window.open(`https://wa.me/5511947479403?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  useEffect(() => {
    if (!modalAberto) return;
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalAberto(false);
      if (event.key === 'ArrowLeft') fotoAnterior();
      if (event.key === 'ArrowRight') proximaFoto();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = overflowOriginal;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [modalAberto]);

  const especificacoes = [
    { label: 'Quilometragem', value: `${veiculo.km.toLocaleString('pt-BR')} km` },
    { label: 'Câmbio', value: veiculo.cambio },
    { label: 'Combustível', value: veiculo.combustivel },
    { label: 'Cor', value: veiculo.cor },
    { label: 'Portas', value: String(veiculo.portas) },
    { label: 'Placa', value: veiculo.placa },
  ];

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#172536]">
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172536]/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Galeria ampliada" onClick={() => setModalAberto(false)}>
          <button type="button" onClick={() => setModalAberto(false)} aria-label="Fechar galeria" className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f6f1e8] text-[#172536] transition-colors hover:bg-[#e76f51] hover:text-white"><X className="h-5 w-5" /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); fotoAnterior(); }} aria-label="Foto anterior" className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#f6f1e8] text-[#172536] transition-colors hover:bg-[#e76f51] hover:text-white sm:left-8"><ChevronLeft className="h-6 w-6" /></button>
          <div className="relative flex max-h-[90vh] max-w-6xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
            <img src={veiculo.fotos[fotoAtual]} alt={`${veiculo.marca} ${veiculo.modelo}`} className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f6f1e8]/70">{fotoAtual + 1} / {veiculo.fotos.length}</p>
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); proximaFoto(); }} aria-label="Próxima foto" className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#f6f1e8] text-[#172536] transition-colors hover:bg-[#e76f51] hover:text-white sm:right-8"><ChevronRight className="h-6 w-6" /></button>
        </div>
      )}

      <header className="border-b border-[#f6f1e8]/10 bg-[#172536] text-[#f6f1e8]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:px-10 sm:py-5 lg:px-16">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Auto Confiança, início">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f1e8] text-[11px] font-bold tracking-[-0.08em] text-[#172536]">
              AC
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#172536] bg-[#e76f51]" />
            </span>
            <span className="text-sm font-bold tracking-[-0.04em]">Auto Confiança</span>
          </Link>
          <a href="https://wa.me/5511947479403" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#f6f1e8]/75 transition-colors hover:text-[#f6f1e8] sm:text-xs">
            <Phone className="h-3.5 w-3.5 text-[#41a875]" strokeWidth={2} />
            <span className="hidden sm:inline">Atendimento próximo</span>
            <span className="hidden md:inline">(11) 94747-9403</span>
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-8 sm:px-10 sm:pt-12 lg:px-16">
        <Link href="/veiculos" className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#172536] transition-colors hover:text-[#e76f51] sm:text-xs"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Voltar para </span>veículos</Link>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] lg:items-start lg:gap-12">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#e9e2d7] shadow-[0_22px_50px_rgba(23,37,54,0.12)] sm:aspect-[16/10]">
              <img src={veiculo.fotos[fotoAtual]} alt={`${veiculo.marca} ${veiculo.modelo}`} className="h-full w-full object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-[#172536] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6f1e8]">{veiculo.ano}</span>
              <button type="button" onClick={fotoAnterior} aria-label="Foto anterior" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#fffdf9]/90 text-[#172536] shadow-lg transition-colors hover:bg-[#e76f51] hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={proximaFoto} aria-label="Próxima foto" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#fffdf9]/90 text-[#172536] shadow-lg transition-colors hover:bg-[#e76f51] hover:text-white"><ChevronRight className="h-5 w-5" /></button>
              <button type="button" onClick={() => setModalAberto(true)} className="absolute bottom-5 right-5 cursor-pointer rounded-full bg-[#fffdf9]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#172536] transition-colors hover:bg-[#e76f51] hover:text-white">Ampliar fotos</button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {veiculo.fotos.map((foto, index) => <button key={foto} type="button" onClick={() => setFotoAtual(index)} aria-label={`Ver foto ${index + 1}`} className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${fotoAtual === index ? 'border-[#e76f51] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}><img src={foto} alt="" className="h-full w-full object-cover" /></button>)}
            </div>

            <div className="mt-10 border-t border-[#172536]/10 pt-8">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Sobre este veículo</p>
              <h2 className="text-2xl font-bold tracking-[-0.05em] sm:text-3xl">Uma escolha para seguir em frente</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#58687a] sm:text-base">{veiculo.descricao}</p>
            </div>

            <div className="mt-10 border-t border-[#172536]/10 pt-8">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Detalhes</p>
              <h2 className="text-2xl font-bold tracking-[-0.05em] sm:text-3xl">O que ele oferece</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{veiculo.caracteristicas.map((caracteristica) => <div key={caracteristica} className="flex items-start gap-3 rounded-xl border border-[#172536]/10 bg-[#fffdf9] p-4 text-sm text-[#58687a]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#41a875]" strokeWidth={2.5} /><span>{caracteristica}</span></div>)}</div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[1.75rem] bg-[#172536] p-6 text-[#f6f1e8] shadow-[0_22px_50px_rgba(23,37,54,0.16)] sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e76f51]">{veiculo.marca}</p>
              <h1 className="mt-2 text-4xl font-bold leading-none tracking-[-0.06em] sm:text-5xl">{veiculo.modelo}</h1>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f6f1e8]/50">A partir de</p>
              <p className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#f6f1e8]">{formatarPreco(veiculo.preco)}</p>
              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-[#f6f1e8]/15 py-6">{especificacoes.map(({ label, value }, index) => { const Icon = specificationIcons[index]; return <div key={label} className="min-w-0"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#f6f1e8]/45"><Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />{label}</div><p className="mt-1 truncate text-sm font-semibold text-[#f6f1e8]">{value}</p></div>; })}</div>
              <button type="button" onClick={handleWhatsApp} className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#41a875] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-[#348c60]"><MessageCircle className="h-5 w-5" />Tenho interesse</button>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#f6f1e8]/55"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[#d8a84e]" />Fale com um consultor para confirmar disponibilidade e agendar uma visita.</p>
            </div>
            <Link href="/veiculos" className="group mt-4 flex items-center justify-between rounded-xl border border-[#172536]/15 bg-[#fffdf9] px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#e76f51] hover:text-[#e76f51]">Ver outros veículos<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </aside>
        </div>
      </section>

      <footer className="border-t border-[#172536]/10 bg-[#eee5d8]"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718095] sm:px-10 lg:px-16"><Link href="/" className="transition-colors hover:text-[#e76f51]">Auto Confiança</Link><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
