'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  MapPin,
  MessageCircle,
  Play,
  X,
} from 'lucide-react';

interface DetailItem { n: number; label: string }
interface Apartamento { titulo: string; subtitulo: string; imagemPlanta: string; detalhes: DetailItem[] }
interface AreaComum { imagemPlanta: string; detalhes: DetailItem[] }
interface Diferencial { titulo: string; descricao: string }
interface Localidade { titulo: string; info: string; img: string }
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
  const [localAtual, setLocalAtual] = useState(0);

  const anterior = () => setFotoAtual((foto) => (foto === 0 ? imovel.fotosPrincipais.length - 1 : foto - 1));
  const proxima = () => setFotoAtual((foto) => (foto === imovel.fotosPrincipais.length - 1 ? 0 : foto + 1));
  const contatoUrl = `https://wa.me/55${imovel.telefone}?text=${encodeURIComponent(`Olá! Vi o ${imovel.nome} no site e gostaria de mais informações.`)}`;
  const isQuaddra = imovel.codImovel === 'quaddra-lorena';

  useEffect(() => {
    if (!selectedImage) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedImage(null); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener('keydown', handleEsc); };
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#172536]">
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172536]/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <div className="relative max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedImage} alt="Imagem ampliada" width={2200} height={1500} className="max-h-[86vh] h-auto w-auto max-w-full rounded-xl object-contain" />
            <button type="button" onClick={() => setSelectedImage(null)} aria-label="Fechar imagem" className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f6f1e8] text-[#172536] transition-colors hover:bg-[#e76f51] hover:text-white"><X className="h-5 w-5" /></button>
          </div>
        </div>
      )}

      <header className="bg-[#172536] text-[#f6f1e8]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:px-10 sm:py-5 lg:px-16">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Auto Confiança, início">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f1e8] text-[11px] font-bold tracking-[-0.08em] text-[#172536]">AC<span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#172536] bg-[#e76f51]" /></span>
            <span className="text-sm font-bold tracking-[-0.04em] sm:text-base">Auto Confiança</span>
          </Link>
          <a href="https://wa.me/5511947479403" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#f6f1e8]/75 transition-colors hover:text-[#f6f1e8] sm:text-xs"><span className="h-2 w-2 rounded-full bg-[#41a875]" /> <span className="hidden sm:inline">Atendimento próximo</span><span>(11) 94747-9403</span></a>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-7 sm:px-10 sm:pt-10 lg:px-16">
        <Link href="/imoveis" className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#172536] transition-colors hover:text-[#e76f51] sm:text-xs"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Voltar para </span>imóveis</Link>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] lg:items-start lg:gap-12">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#e9e2d7] shadow-[0_22px_50px_rgba(23,37,54,0.12)] sm:aspect-[16/10]">
              <Image src={imoveisFotos(imovel)[fotoAtual]} alt={imovel.nome} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-[#172536] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6f1e8]">Exclusivo</span>
              <button type="button" onClick={anterior} aria-label="Foto anterior" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#fffdf9]/90 text-[#172536] shadow-lg transition-colors hover:bg-[#e76f51] hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={proxima} aria-label="Próxima foto" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#fffdf9]/90 text-[#172536] shadow-lg transition-colors hover:bg-[#e76f51] hover:text-white"><ChevronRight className="h-5 w-5" /></button>
              <span className="absolute bottom-5 left-5 rounded-full bg-[#172536]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6f1e8]">{fotoAtual + 1} / {imoveisFotos(imovel).length}</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {imoveisFotos(imovel).map((foto, index) => <button key={foto} type="button" onClick={() => setFotoAtual(index)} aria-label={`Ver foto ${index + 1}`} className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${fotoAtual === index ? 'border-[#e76f51] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}><Image src={foto} alt="" fill sizes="(max-width: 640px) 25vw, 15vw" className="object-cover" /></button>)}
            </div>
            <div className="mt-10 border-t border-[#172536]/10 pt-8"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Sobre o empreendimento</p><h2 className="text-2xl font-bold tracking-[-0.05em] sm:text-3xl">Um endereço para viver o seu próximo capítulo</h2><p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#58687a] sm:text-base">{imovel.descricaoCompleta}</p></div>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[1.75rem] bg-[#172536] p-6 text-[#f6f1e8] shadow-[0_22px_50px_rgba(23,37,54,0.16)] sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e76f51]">{isQuaddra ? 'Alto padrão nos Jardins' : 'Exclusividade no Campo Belo'}</p>
              <h1 className="mt-2 text-4xl font-bold leading-none tracking-[-0.06em] sm:text-5xl">{imovel.nome}</h1>
              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-[#f6f1e8]/65"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d8a84e]" strokeWidth={1.8} />{imovel.localizacao}</p>
              <p className="mt-7 border-y border-[#f6f1e8]/15 py-6 text-lg font-semibold leading-relaxed text-[#f6f1e8]">{imovel.descricaoCurta}</p>
              <div className="mt-6 space-y-3 text-sm text-[#f6f1e8]/75"><p className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#41a875]" />{isQuaddra ? 'Apenas 56 unidades exclusivas' : 'Plantas com terraço gourmet'}</p><p className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#41a875]" />{isQuaddra ? 'Maior terreno do Jardins' : 'Rooftop e áreas de bem-estar'}</p></div>
              <a href={contatoUrl} target="_blank" rel="noopener noreferrer" className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#41a875] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-[#348c60]"><MessageCircle className="h-5 w-5" />Tenho interesse</a>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#f6f1e8]/55"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[#d8a84e]" />Fale com um consultor para conhecer disponibilidade e condições.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#eee5d8]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">O projeto</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-[-0.06em] sm:text-5xl">{isQuaddra ? 'Um novo ícone de luxo no coração dos Jardins.' : 'Arquitetura contemporânea para uma rotina mais leve.'}</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Image src={imovel.fotosPrincipais[1]} alt={`Fachada do ${imovel.nome}`} width={900} height={1200} className="max-h-[620px] w-full object-cover" /><div><p className="max-w-xl text-base leading-relaxed text-[#58687a]">{imovel.descricaoCompleta}</p><p className="mt-6 flex items-start gap-2 text-sm font-semibold leading-relaxed text-[#172536]"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e76f51]" />{imovel.endereco}</p></div></div>
        </div>
      </section>

      <section className="bg-[#f6f1e8]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Localização</p><h2 className="text-3xl font-bold tracking-[-0.06em] sm:text-4xl">Tudo o que você precisa por perto.</h2></div><p className="max-w-sm text-sm leading-relaxed text-[#58687a]">{imovel.localizacao}</p></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{imovel.localidades.map((local, index) => <article key={local.titulo} className={`overflow-hidden rounded-[1.5rem] border bg-[#fffdf9] transition-all ${localAtual === index ? 'border-[#e76f51] shadow-[0_15px_35px_rgba(23,37,54,0.1)]' : 'border-[#172536]/10'}`}><button type="button" onClick={() => setLocalAtual(index)} className="group block w-full cursor-pointer text-left"><div className="relative aspect-[4/3] overflow-hidden"><Image src={local.img} alt={local.titulo} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-5"><h3 className="font-bold text-[#172536]">{local.titulo}</h3><p className="mt-1 text-xs text-[#58687a]">{local.info}</p></div></button></article>)}</div>
          <div className="mt-5 flex gap-2 md:hidden"><button type="button" onClick={() => setLocalAtual((localAtual + imovel.localidades.length - 1) % imovel.localidades.length)} aria-label="Localização anterior" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#172536]/15 bg-[#fffdf9]"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={() => setLocalAtual((localAtual + 1) % imovel.localidades.length)} aria-label="Próxima localização" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#172536]/15 bg-[#fffdf9]"><ChevronRight className="h-4 w-4" /></button></div>
        </div>
      </section>

      <section className="bg-[#172536] text-[#f6f1e8]"><div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Plantas e diferenciais</p><h2 className="text-3xl font-bold tracking-[-0.06em] sm:text-4xl">Pensado para o seu jeito de viver.</h2><div className="mt-10 space-y-12">{imovel.apartamentos.map((apartamento, index) => <div key={apartamento.titulo} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><button type="button" onClick={() => setSelectedImage(apartamento.imagemPlanta)} className={`group relative block w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#f6f1e8]/10 ${index % 2 ? 'lg:order-2' : ''}`} aria-label={`Ampliar planta ${apartamento.titulo}`}><Image src={apartamento.imagemPlanta} alt={`Planta ${apartamento.titulo}`} width={1600} height={1100} className="h-auto w-full bg-[#fffdf9] object-contain transition-transform duration-500 group-hover:scale-[1.02]" /></button><div className={index % 2 ? 'lg:order-1' : ''}><h3 className="text-2xl font-bold">{apartamento.titulo}</h3><p className="mt-3 text-sm leading-relaxed text-[#f6f1e8]/65">{apartamento.subtitulo}</p><ol className="mt-6 space-y-3">{apartamento.detalhes.map((detalhe) => <li key={detalhe.n} className="flex items-start gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e76f51] text-xs font-bold text-white">{detalhe.n}</span><span className="text-[#f6f1e8]/80">{detalhe.label}</span></li>)}</ol></div></div>)}</div><div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{imovel.diferenciais.map((diferencial) => <article key={diferencial.titulo} className="rounded-[1.25rem] border border-[#f6f1e8]/10 bg-[#f6f1e8]/[0.06] p-5"><h3 className="font-bold">{diferencial.titulo}</h3><p className="mt-2 text-sm leading-relaxed text-[#f6f1e8]/60">{diferencial.descricao}</p></article>)}</div></div></section>

      {imovel.videoUrl && <section className="bg-[#eee5d8]"><div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16"><div className="flex items-center gap-3"><Play className="h-5 w-5 text-[#e76f51]" fill="currentColor" /><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8a84e]">Experiência em vídeo</p></div><h2 className="mt-3 text-3xl font-bold tracking-[-0.06em] sm:text-4xl">Conheça por dentro.</h2><div className="mt-8 overflow-hidden rounded-[1.5rem] bg-[#172536] p-2 shadow-[0_18px_40px_rgba(23,37,54,0.12)]"><div className="aspect-video"><iframe className="h-full w-full rounded-xl" src={imovel.videoUrl} title={`Vídeo do ${imovel.nome}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div></div></div></section>}

      <footer className="border-t border-[#172536]/10 bg-[#f6f1e8]"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718095] sm:px-10 lg:px-16"><Link href="/" className="transition-colors hover:text-[#e76f51]">Auto Confiança</Link><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}

function imoveisFotos(imovel: Imovel) {
  return imovel.fotosPrincipais;
}
