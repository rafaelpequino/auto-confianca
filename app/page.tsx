// app/page.tsx
import Welcome from '@/components/Welcome'
import Project from '@/components/Project'
import Location from '@/components/Location'
import CommonAreas from '@/components/CommonAreas'
import Apartments from '@/components/Apartments'
import Differences from '@/components/Differences'
import Video from '@/components/Video'

export default function Page() {
  return (
    <main className="font-sans text-triu-dark">
      <Welcome />
      <Project />
      <Location />
      <CommonAreas />
      <Apartments />
      <Differences />
      <Video />
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
