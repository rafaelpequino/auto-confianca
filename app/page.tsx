import Link from 'next/link'
import { ArrowUpRight, Building2, CarFront, Check, Phone, Sparkles } from 'lucide-react'

const destinations = [
  {
    href: '/veiculos',
    eyebrow: 'Mobilidade',
    title: 'Veículos',
    description: 'Seminovos escolhidos para acompanhar a próxima fase da sua vida.',
    icon: CarFront,
    accent: 'bg-[#e76f51] text-[#fff7ed] hover:bg-[#d85d40]',
    number: '01',
  },
  {
    href: '/imoveis',
    eyebrow: 'Patrimônio',
    title: 'Imóveis',
    description: 'Endereços e empreendimentos para você viver, investir e pertencer.',
    icon: Building2,
    accent: 'bg-[#d8a84e] text-[#1b2938] hover:bg-[#c99539]',
    number: '02',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f1e8] text-[#172536]">
      <header className="relative z-10 mx-auto flex max-w-[1440px] flex-row items-center justify-between gap-2 px-5 py-5 sm:gap-4 sm:px-10 sm:py-6 lg:px-16">
        <Link href="/" className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3" aria-label="Auto Confiança, início">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#172536] text-xs font-bold tracking-[-0.08em] text-[#f6f1e8] sm:h-11 sm:w-11 sm:text-sm">
            AC
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#f6f1e8] bg-[#e76f51]" />
          </span>
          <span>
            <span className="block text-[8px] uppercase tracking-[0.28em] text-[#718095] max-[399px]:hidden sm:text-[9px] sm:tracking-[0.34em]">Escolhas que realizam</span>
            <span className="block text-[15px] font-bold tracking-[-0.04em] text-[#172536] sm:text-lg">Auto Confiança</span>
          </span>
        </Link>

        <a
          href="https://wa.me/5511947479403"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[9px] font-semibold leading-tight text-[#172536] transition-colors hover:text-[#e76f51] sm:gap-2 sm:text-xs"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#41a875] sm:hidden" strokeWidth={2} />
          <span className="hidden h-2 w-2 rounded-full bg-[#41a875] shadow-[0_0_0_4px_rgba(65,168,117,0.12)] sm:block" />
          <span className="hidden sm:inline">Fale com a gente</span>
          <span>(11) 94747-9403</span>
        </a>
      </header>

      <section className="relative mx-auto max-w-[1440px] px-6 pb-14 pt-12 sm:px-10 sm:pb-20 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-[#d8a84e]/30 sm:h-96 sm:w-96" />
        <div className="absolute right-8 top-44 h-3 w-3 rounded-full bg-[#e76f51]" />

        <div className="relative max-w-4xl">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#718095] sm:text-xs">
            <Sparkles className="h-4 w-4 text-[#d8a84e]" strokeWidth={1.8} />
            Confie no seu próximo passo
          </p>
          <h1 className="max-w-4xl text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[0.9] tracking-[-0.075em] text-[#172536]">
            O que você sonha,
            <span className="block text-[#e76f51]">a gente realiza.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-rel1axed text-[#58687a] sm:text-lg">
            Escolhas importantes ficam mais leves quando você encontra quem entende o seu momento.
          </p>
        </div>

        <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
          {destinations.map(({ href, eyebrow, title, description, icon: Icon, accent, number }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#172536]/10 bg-[#172536] p-7 text-[#f6f1e8] transition-transform duration-300 hover:-translate-y-2 sm:min-h-[310px] sm:p-10"
            >
              <span className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[20px] border-[#f6f1e8]/[0.06] transition-transform duration-500 group-hover:scale-110" />
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f6f1e8]/20 bg-[#f6f1e8]/10">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-[#f6f1e8]/45">{number}</span>
              </div>
              <div className="relative mt-10 max-w-md pr-14 sm:pr-20">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#d8a84e]">{eyebrow}</p>
                <h2 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl">{title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#f6f1e8]/65">{description}</p>
              </div>
              <span className={`absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full transition-colors sm:bottom-10 sm:right-10 ${accent}`}>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#172536]/10 bg-[#eee5d8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16">
          <p className="max-w-xl text-sm leading-relaxed text-[#58687a]">
            <span className="font-semibold text-[#172536]">Decida com tranquilidade.</span>{' '}
            Seu sonho merece informação, cuidado e alguém do seu lado.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#718095]">
            {['Atendimento próximo', 'Escolhas seguras', 'Sonhos possíveis'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#41a875]" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[10px] uppercase tracking-[0.16em] text-[#718095] sm:px-10 lg:px-16">
        <span>Auto Confiança</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}
