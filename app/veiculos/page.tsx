'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  CarFront,
  Check,
  CircleX,
  Fuel,
  Gauge,
  Palette,
  Search,
  Settings2,
  SlidersHorizontal,
} from 'lucide-react';
import veiculosData from '@/data/veiculo.json';

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
  fotos: string[];
}

const featureIcons = [Gauge, Settings2, Fuel, Palette];

export default function VeiculosPage() {
  const [veiculos] = useState<Veiculo[]>(veiculosData);
  const [filtroMarca, setFiltroMarca] = useState<string>('');
  const [filtroPreco, setFiltroPreco] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const marcas = Array.from(new Set(veiculos.map((v) => v.marca))).sort();

  const veiculosFiltrados = veiculos.filter((veiculo) => {
    const matchMarca = !filtroMarca || veiculo.marca === filtroMarca;
    const matchPreco =
      !filtroPreco ||
      (filtroPreco === '50000' && veiculo.preco <= 50000) ||
      (filtroPreco === '100000' && veiculo.preco > 50000 && veiculo.preco <= 100000) ||
      (filtroPreco === '150000' && veiculo.preco > 100000);
    const termo = searchTerm.trim().toLowerCase();
    const matchSearch =
      !termo ||
      veiculo.modelo.toLowerCase().includes(termo) ||
      veiculo.marca.toLowerCase().includes(termo);
    return matchMarca && matchPreco && matchSearch;
  });

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  const limparFiltros = () => {
    setSearchTerm('');
    setFiltroMarca('');
    setFiltroPreco('');
  };

  const possuiFiltros = Boolean(searchTerm || filtroMarca || filtroPreco);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#172536]">
      <section className="relative overflow-hidden bg-[#172536] text-[#f6f1e8]">
        <div className="absolute -right-24 -top-36 h-96 w-96 rounded-full border-[24px] border-[#f6f1e8]/[0.06]" />
        <div className="absolute right-20 top-24 h-3 w-3 rounded-full bg-[#e76f51]" />
        <div className="relative mx-auto max-w-[1440px] px-6 pb-12 pt-7 sm:px-10 sm:pb-16 sm:pt-10 lg:px-16">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Voltar para Auto Confiança">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1e8] text-xs font-bold tracking-[-0.08em] text-[#172536]">
                AC
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#172536] bg-[#e76f51]" />
              </span>
              <span className="text-base font-bold tracking-[-0.04em] sm:text-lg">Auto Confiança</span>
            </Link>
            <a href="https://wa.me/5511947479403" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#f6f1e8]/75 transition-colors hover:text-[#f6f1e8] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#41a875]" />
              Atendimento próximo
            </a>
          </div>
          <div className="mt-14 max-w-3xl sm:mt-20">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d8a84e] sm:text-xs">
              <CarFront className="h-4 w-4" strokeWidth={1.7} />
              Mobilidade para o seu momento
            </p>
            <h1 className="text-5xl font-bold leading-[0.92] tracking-[-0.07em] sm:text-7xl">
              Encontre um carro
              <span className="block text-[#e76f51]">que combina com você.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#f6f1e8]/65 sm:text-base">
              Seminovos selecionados com procedência, cuidado e transparência para você dirigir a próxima conquista.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 sm:py-12 lg:px-16">
        {veiculos.length > 0 && <div className="relative z-10 rounded-[1.75rem] border border-[#172536]/10 bg-[#fffdf9] p-5 shadow-[0_20px_50px_rgba(23,37,54,0.08)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label htmlFor="busca-veiculos" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#172536]">Qual carro você procura?</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#718095]" strokeWidth={1.8} />
                <input id="busca-veiculos" type="search" placeholder="Busque por marca ou modelo" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-14 w-full rounded-xl border border-[#172536]/15 bg-[#f6f1e8] pl-12 pr-4 text-sm text-[#172536] outline-none transition placeholder:text-[#718095] focus:border-[#e76f51] focus:ring-4 focus:ring-[#e76f51]/10" />
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
              <div>
                <label htmlFor="filtro-marca" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#172536]">Marca</label>
                <select id="filtro-marca" value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)} className="h-14 w-full rounded-xl border border-[#172536]/15 bg-[#f6f1e8] px-4 text-sm text-[#172536] outline-none transition focus:border-[#e76f51] focus:ring-4 focus:ring-[#e76f51]/10">
                  <option value="">Todas as marcas</option>
                  {marcas.map((marca) => <option key={marca} value={marca}>{marca}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="filtro-preco" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#172536]">Faixa de preço</label>
                <select id="filtro-preco" value={filtroPreco} onChange={(e) => setFiltroPreco(e.target.value)} className="h-14 w-full rounded-xl border border-[#172536]/15 bg-[#f6f1e8] px-4 text-sm text-[#172536] outline-none transition focus:border-[#e76f51] focus:ring-4 focus:ring-[#e76f51]/10">
                  <option value="">Todos os preços</option>
                  <option value="50000">Até R$ 50.000</option>
                  <option value="100000">R$ 50.000 - R$ 100.000</option>
                  <option value="150000">Acima de R$ 100.000</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-[#172536]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-[#58687a]"><SlidersHorizontal className="h-4 w-4 text-[#e76f51]" strokeWidth={1.8} /><strong className="text-[#172536]">{veiculosFiltrados.length}</strong> {veiculosFiltrados.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}</p>
            {possuiFiltros && <button type="button" onClick={limparFiltros} className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.14em] text-[#e76f51] transition-colors hover:text-[#c94d32] sm:self-auto"><CircleX className="h-4 w-4" strokeWidth={1.8} />Limpar filtros</button>}
          </div>
        </div>}

        <div className="mb-6 mt-12 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Escolha com confiança</p><h2 className="text-2xl font-bold tracking-[-0.05em] sm:text-3xl">Veículos em destaque</h2></div>
          <p className="hidden text-right text-xs text-[#718095] sm:block">Atualizado para você decidir<br />com mais tranquilidade.</p>
        </div>

        {veiculosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {veiculosFiltrados.map((veiculo) => (
              <Link key={veiculo.codVeiculo} href={`/veiculos/${veiculo.codVeiculo}`} className="group block">
                <article className="h-full overflow-hidden rounded-[1.5rem] border border-[#172536]/10 bg-[#fffdf9] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e76f51]/50 hover:shadow-[0_18px_40px_rgba(23,37,54,0.12)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e2d7]">
                    <img src={veiculo.fotos[0]} alt={`${veiculo.marca} ${veiculo.modelo}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#172536] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6f1e8]">{veiculo.ano}</span>
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e76f51] text-[#fff7ed] transition-colors group-hover:bg-[#d85d40]"><ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e76f51]">{veiculo.marca}</p>
                    <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[#172536]">{veiculo.modelo}</h3>
                    <p className="mt-4 text-2xl font-bold tracking-[-0.04em] text-[#172536]">{formatarPreco(veiculo.preco)}</p>
                    <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-[#172536]/10 pt-4 text-xs text-[#58687a]">
                      {[`${veiculo.km.toLocaleString('pt-BR')} km`, veiculo.cambio, veiculo.combustivel, veiculo.cor].map((feature, index) => { const FeatureIcon = featureIcons[index]; return <span key={feature} className="flex min-w-0 items-center gap-2"><FeatureIcon className="h-4 w-4 shrink-0 text-[#718095]" strokeWidth={1.8} /><span className="truncate">{feature}</span></span>; })}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#172536] transition-colors group-hover:text-[#e76f51]">Ver detalhes<ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#172536]/20 bg-[#fffdf9] px-6 py-16 text-center">
            <CarFront className="mx-auto h-10 w-10 text-[#718095]" strokeWidth={1.3} />
            <h2 className="mt-4 text-xl font-bold tracking-[-0.04em]">Nenhum veículo disponível no momento</h2>
          </div>
        )}
      </section>

      <footer className="border-t border-[#172536]/10 bg-[#eee5d8]"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718095] sm:px-10 lg:px-16"><Link href="/" className="transition-colors hover:text-[#e76f51]">Auto Confiança</Link><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
