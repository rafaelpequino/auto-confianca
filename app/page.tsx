import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-gray-100">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-1">Bem-vindo à</p>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Auto Confiança</h1>
        </div>
        <a
          href="https://wa.me/5511947479403"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:border-gray-500 hover:text-gray-900 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          (11) 94747-9403
        </a>
      </header>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-gray-400">
          O que você está procurando?
        </p>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Encontre o que é seu.
        </h2>
        <p className="mb-16 max-w-xl text-sm text-gray-500 sm:text-base">
          Veículos seminovos selecionados e empreendimentos imobiliários exclusivos,
          tudo em um só lugar.
        </p>

        {/* ─── CARDS ──────────────────────────────────────────────────── */}
        <div className="grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Card Veículos */}
          <Link href="/veiculos" className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1">
            <div className="p-8 flex flex-col items-start text-left h-full min-h-[260px]">
              {/* Ícone */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors border border-gray-200 group-hover:border-blue-200">
                <svg className="h-7 w-7 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10h14M7 14h.01M17 14h.01" />
                </svg>
              </div>

              <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-gray-400">Catálogo</p>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Veículos</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Seminovos selecionados com qualidade e procedência. Encontre o carro ideal para o seu estilo.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                Ver catálogo
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Detalhe decorativo */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors" />
          </Link>

          {/* Card Imóveis */}
          <Link href="/imoveis" className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-50 transition-all duration-300 hover:-translate-y-1">
            <div className="p-8 flex flex-col items-start text-left h-full min-h-[260px]">
              {/* Ícone */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-amber-50 transition-colors border border-gray-200 group-hover:border-amber-200">
                <svg className="h-7 w-7 text-gray-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>

              <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-gray-400">Catálogo</p>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Imóveis</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Empreendimentos exclusivos de alto padrão. Do Triu 1722 ao Quaddra Lorena, invista com segurança.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
                Ver catálogo
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Detalhe decorativo */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors" />
          </Link>

        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="px-6 py-6 text-center md:px-12 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          © {new Date().getFullYear()} Auto Confiança · Todos os direitos reservados
        </p>
      </footer>

    </main>
  )
}
