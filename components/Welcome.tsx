import Image from "next/image";
import Link from "next/link";

export const Welcome = () => {
  return (
    <section
      id="welcome"
      className="relative min-h-screen w-full flex items-end overflow-hidden" 
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url(/img/empreendimento/01.jpg)",
        }}
      />
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="text-white font-[350] max-w-md">
          <h2 className="text-[13px] md:text-sm tracking-[0.35em] font-medium mb-4">APTO</h2>
          <p className="text-4xl md:text-5xl font-semibold leading-none mb-6">69 M²</p>
          <ul className="space-y-1 text-[13px] md:text-sm tracking-wide">
            <li>2 Suítes</li>
            <li>Espaço Gourmet</li>
          </ul>
        </div>
      </div>
      {/* Floating WhatsApp style button (mobile & desktop) */}
      <Link
        href="#contato"
        className="fixed bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 text-xs md:text-sm font-medium px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        Fale com um consultor
      </Link>
    </section>
  );
};

export default Welcome;
