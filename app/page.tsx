// app/page.tsx
import Welcome from '@/components/Welcome'
import Project from '@/components/Project'
import Location from '@/components/Location'
import CommonAreas from '@/components/CommonAreas'

export default function Page() {
  return (
    <main className="font-sans text-triu-dark">
      <Welcome />
      <Project />
      <Location />
      <CommonAreas />

      <section id="video" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Assista ao Vídeo</h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
            {/* substitua pelo seu player/iframe */}
          </div>
        </div>
      </section>

      <section id="contato" className="scroll-mt-24 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Fale com um consultor</h2>
          <p className="max-w-2xl opacity-90">
            Coloque aqui seu formulário de contato ou link para WhatsApp.
          </p>
        </div>
      </section>
    </main>
  )
}

/** Shell simples para manter padding/estrutura enquanto você trabalha o conteúdo real */
function SectionShell({
  title,
  bg = 'default',
}: {
  title: string
  bg?: 'default' | 'muted'
}) {
  return (
    <div
      className={[
        'mx-auto max-w-7xl px-4 py-20 sm:px-6',
        bg === 'muted' ? '' : '',
      ].join(' ')}
    >
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="max-w-2xl text-base text-gray-600">
        Conteúdo da seção “{title}”. Substitua pelo conteúdo real do seu protótipo.
      </p>
    </div>
  )
}
