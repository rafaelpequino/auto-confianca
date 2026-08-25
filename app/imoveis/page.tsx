'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Building2, Check, CircleX, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import imoveisData from '@/data/imoveis.json';

interface Imovel {
  codImovel: string;
  nome: string;
  localizacao: string;
  descricaoCurta: string;
  fotosPrincipais: string[];
  apartamentos: { titulo: string }[];
}

export default function ImoveisPage() {
  const [imoveis] = useState<Imovel[]>(imoveisData);
  const [searchTerm, setSearchTerm] = useState('');

  const imoveisFiltrados = imoveis.filter((imovel) => {
    const termo = searchTerm.trim().toLowerCase();
    return !termo || imovel.nome.toLowerCase().includes(termo) || imovel.localizacao.toLowerCase().includes(termo);
  });

  const limparBusca = () => setSearchTerm('');

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
              <span className="h-2 w-2 rounded-full bg-[#41a875]" /> Atendimento próximo
            </a>
          </div>
          <div className="mt-14 max-w-3xl sm:mt-20">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d8a84e] sm:text-xs"><Building2 className="h-4 w-4" strokeWidth={1.7} /> Patrimônio para o seu momento</p>
            <h1 className="text-5xl font-bold leading-[0.92] tracking-[-0.07em] sm:text-7xl">Encontre um endereço<br /><span className="text-[#e76f51]">para chamar de seu.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#f6f1e8]/65 sm:text-base">Empreendimentos selecionados para viver melhor, investir com segurança e construir novas histórias.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 sm:py-12 lg:px-16">
        <div className="relative z-10 rounded-[1.75rem] border border-[#172536]/10 bg-[#fffdf9] p-5 shadow-[0_20px_50px_rgba(23,37,54,0.08)] sm:p-7">
          <label htmlFor="busca-imoveis" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#172536]">Qual endereço você procura?</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#718095]" strokeWidth={1.8} />
            <input id="busca-imoveis" type="search" placeholder="Busque por empreendimento ou região" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-14 w-full rounded-xl border border-[#172536]/15 bg-[#f6f1e8] pl-12 pr-4 text-sm text-[#172536] outline-none transition placeholder:text-[#718095] focus:border-[#e76f51] focus:ring-4 focus:ring-[#e76f51]/10" />
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-[#172536]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-[#58687a]"><SlidersHorizontal className="h-4 w-4 text-[#e76f51]" strokeWidth={1.8} /><strong className="text-[#172536]">{imoveisFiltrados.length}</strong> {imoveisFiltrados.length === 1 ? 'empreendimento encontrado' : 'empreendimentos encontrados'}</p>
            {searchTerm && <button type="button" onClick={limparBusca} className="inline-flex cursor-pointer items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.14em] text-[#e76f51] transition-colors hover:text-[#c94d32] sm:self-auto"><CircleX className="h-4 w-4" strokeWidth={1.8} /> Limpar busca</button>}
          </div>
        </div>

        <div className="mb-6 mt-12"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Escolha com confiança</p><h2 className="text-2xl font-bold tracking-[-0.05em] sm:text-3xl">Empreendimentos em destaque</h2></div>

        {imoveisFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {imoveisFiltrados.map((imovel) => (
              <Link key={imovel.codImovel} href={`/imoveis/${imovel.codImovel}`} className="group block">
                <article className="grid h-full overflow-hidden rounded-[1.5rem] border border-[#172536]/10 bg-[#fffdf9] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e76f51]/50 hover:shadow-[0_18px_40px_rgba(23,37,54,0.12)] sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[260px] overflow-hidden bg-[#e9e2d7] sm:min-h-[330px]">
                    <img src={imovel.fotosPrincipais[0]} alt={imovel.nome} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#172536] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6f1e8]">Exclusivo</span>
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e76f51] text-[#fff7ed] transition-colors group-hover:bg-[#d85d40]"><ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e76f51]">Empreendimento</p>
                      <h3 className="mt-2 text-3xl font-bold leading-none tracking-[-0.06em] text-[#172536]">{imovel.nome}</h3>
                      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#58687a]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d8a84e]" strokeWidth={1.8} />{imovel.localizacao}</p>
                      <p className="mt-5 text-sm font-semibold leading-relaxed text-[#172536]">{imovel.descricaoCurta}</p>
                    </div>
                    <div className="mt-8 border-t border-[#172536]/10 pt-5"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#172536] transition-colors group-hover:text-[#e76f51]">Conheça o empreendimento <ArrowUpRight className="h-4 w-4" /></span></div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#172536]/20 bg-[#fffdf9] px-6 py-16 text-center"><Building2 className="mx-auto h-10 w-10 text-[#718095]" strokeWidth={1.3} /><h2 className="mt-4 text-xl font-bold tracking-[-0.04em]">Nenhum empreendimento encontrado</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#58687a]">Tente buscar por outro nome ou região.</p><button type="button" onClick={limparBusca} className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#172536] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#f6f1e8] transition-colors hover:bg-[#e76f51]"><Check className="h-4 w-4" /> Ver todos</button></div>
        )}
      </section>

      <footer className="border-t border-[#172536]/10 bg-[#eee5d8]"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718095] sm:px-10 lg:px-16"><Link href="/" className="transition-colors hover:text-[#e76f51]">Auto Confiança</Link><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
