'use client'
import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react'
import { useCallback } from 'react'

type NavItem = { label: string; href: string }

const navItems: NavItem[] = [
    { label: 'PROJETO', href: '#project' },
    { label: 'LOCALIZAÇÃO', href: '#location' },
    { label: 'ÁREAS COMUNS', href: '#common-areas' },
    { label: 'APARTAMENTO', href: '#apartments' },
    { label: 'DIFERENCIAIS', href: '#differences' },
    { label: 'ASSISTA AO VÍDEO', href: '#video' },
]

export default function CFooter() {
    const year = new Date().getFullYear()

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith('#')) return
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) {
            const headerHeight = 80
            const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - headerHeight + 4
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }, [])

    const scrollTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <footer className="bg-neutral-900 text-white">
            {/* topo do footer */}
            <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Logo + descrição curta */}
                    <div className="space-y-5">
                        <a href="#project" onClick={(e) => handleNavClick(e, '#project')} aria-label="Início">
                            <Image
                                src="/img/logo-triu-white.png"
                                alt="TRIU 1722"
                                width={120}
                                height={40}
                                className="h-auto w-auto max-w-[120px]"
                                priority={false}
                            />
                        </a>
                        <p className="text-sm text-white/70">
                            Um residencial pensado para elevar o cotidiano com conforto, praticidade e elegância.
                        </p>

                        {/* Redes sociais */}
                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="rounded-lg border border-white/15 p-2 text-white/80 transition hover:text-white hover:border-white/30"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="rounded-lg border border-white/15 p-2 text-white/80 transition hover:text-white hover:border-white/30"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="rounded-lg border border-white/15 p-2 text-white/80 transition hover:text-white hover:border-white/30"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navegação */}
                    <nav className="md:col-span-1">
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                            Navegue
                        </h3>
                        <ul className="space-y-3 text-[11px] tracking-[0.12em] font-medium">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="relative inline-block uppercase text-white/90 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white/80 after:transition-[width] after:duration-300 hover:after:w-full"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contato */}
                    <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                            Contato
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-white/90">
                                <MapPin className="mt-0.5 h-5 w-5 text-white/70" />
                                <span>R. Barão do Triunfo, 1722 - Campo Belo, São Paulo - SP, 04602-006</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/90">
                                <Phone className="mt-0.5 h-5 w-5 text-white/70" />
                                <a href="tel:+5511947479403" className="hover:underline">
                                    (11) 94747-9403
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-white/90">
                                <Mail className="mt-0.5 h-5 w-5 text-white/70" />
                                <a href="mailto:lsho21@gmail.com" className="hover:underline">
                                    lsho21@gmail.com
                                </a>
                            </li>
                        </ul>

                        {/* Botão topo */}
                        <button
                            onClick={scrollTop}
                            className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:border-white/30"
                        >
                            <ArrowUp className="h-4 w-4" />
                            Voltar ao topo
                        </button>
                    </div>
                </div>
            </div>

            {/* linha / direitos */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/60">
                        © {year} Todos os direitos reservados.
                    </p>
                    <p className="text-xs text-white/60">
                        Imagens meramente ilustrativas. Sujeito a alterações sem aviso prévio.
                    </p>
                </div>
            </div>
        </footer>
    )
}
