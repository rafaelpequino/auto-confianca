'use client'
import {
    Paintbrush,
    Utensils,
    Building2,
    PackageCheck,
    ShoppingCart,
    Car,
    ShieldCheck,
    Bike,
} from 'lucide-react'

type DiffItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    desc: string
}

const DIFFERENCES: DiffItem[] = [
    {
        icon: Paintbrush,
        title: 'Acabamentos personalizáveis',
        desc: 'Escolha entre 3 kits de acabamento e deixe tudo com a sua cara.',
    },
    {
        icon: Utensils,
        title: 'Terraço gourmet com carvão',
        desc: 'Todos os apartamentos contam com churrasqueira a carvão integrada.',
    },
    {
        icon: Building2,
        title: 'Rooftop + Espaço Wellness',
        desc: 'Vista panorâmica para relaxar e recarregar as energias.',
    },
    {
        icon: PackageCheck,
        title: 'Espaço Delivery',
        desc: 'Receba encomendas com praticidade e segurança.',
    },
    {
        icon: ShoppingCart,
        title: 'Mini-Market',
        desc: 'Conveniência a poucos passos de casa para o dia a dia.',
    },
    {
        icon: Car,
        title: 'Ponto para carro elétrico',
        desc: 'Infra preparada para recarga de veículos elétricos.',
    },
    {
        icon: ShieldCheck,
        title: 'Segurança inteligente',
        desc: 'Sistemas e controles integrados para sua tranquilidade.',
    },
    {
        icon: Bike,
        title: 'Bicicletário com oficina',
        desc: 'Espaço dedicado com suporte para manutenção das bikes.',
    },
]

export default function Differences() {
    return (
        <section id="differences" className="relative bg-[#EEEEE1]">
            {/* selo no topo/esquerda */}
            <div className="pointer-events-none absolute left-4 top-6 z-10 text-[10px] uppercase tracking-[.25em] text-gray-700 sm:left-6 sm:text-xs">
                DIFERENCIAIS
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* título e subtítulo no mesmo padrão tipográfico dos outros components */}
                <h2 className="mb-3 text-center text-lg font-extrabold uppercase text-gray-900 sm:text-xl">
                    Detalhes que elevam o seu dia a dia
                </h2>
                <p className="mx-auto mb-10 max-w-4xl text-center text-sm text-gray-700 sm:text-base">
                    Diferenciais que combinam <span className="font-semibold">conforto</span>,{' '}
                    <span className="font-semibold">praticidade</span> e{' '}
                    <span className="font-semibold">bem-estar</span>.
                </p>

                {/* grid de cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {DIFFERENCES.map(({ icon: Icon, title, desc }, i) => (
                        <article
                            key={i}
                            className="group h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200/70 bg-gray-50">
                                    <Icon className="h-6 w-6 text-gray-900" strokeWidth={1.75} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                                    {title}
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
