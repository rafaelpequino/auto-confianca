"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "PROJETO", href: "#project" },
  { label: "LOCALIZAÇÃO", href: "#location" },
  { label: "ÁREAS COMUNS", href: "#common-areas" },
  { label: "APARTAMENTO", href: "#apartments" },
  { label: "DIFERENCIAIS", href: "#differences" },
  { label: "ASSISTA AO VÍDEO", href: "#video" },
];

export const CHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o menu se a tela ficar grande
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const headerHeight = 80;
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - headerHeight + 4;
        window.scrollTo({ top, behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 h-20">
        <div className="flex items-center gap-4">
          <a href="#project" className="flex items-center" aria-label="Início">
            <Image
              src={scrolled ? "/img/logo-triu.png" : "/img/logo-triu-white.png"}
              alt="TRIU 1722"
              width={140}
              height={40}
              className="transition-all object-contain h-auto w-auto max-h-12"
              priority
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-[11px] tracking-[0.12em] font-medium">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={clsx(
                "uppercase transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black/80 after:transition-[width] after:duration-300",
                scrolled ? "text-neutral-900" : "text-white",
                "hover:after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden relative w-6 h-6"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span
            className={clsx(
              "absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-all origin-center",
              scrolled ? "text-neutral-900" : "text-white",
              open && "rotate-45"
            )}
          />
          <span
            className={clsx(
              "absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-all origin-center",
              scrolled ? "text-neutral-900" : "text-white",
              open ? "-rotate-45" : "translate-y-2"
            )}
          />
          {!open && (
            <span
              className={clsx(
                "absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-all origin-center",
                scrolled ? "text-neutral-900" : "text-white",
                "-translate-y-2"
              )}
            />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] opacity-100 px-4 pb-8" : "max-h-0 opacity-0 px-4 pb-0",
          scrolled ? "bg-white/95 backdrop-blur" : "bg-neutral-900/95 backdrop-blur"
        )}
      >
        <nav className="flex flex-col gap-4 pt-2 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={clsx(
                "uppercase tracking-wide",
                scrolled ? "text-neutral-900" : "text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default CHeader;
