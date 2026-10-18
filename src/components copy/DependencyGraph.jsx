import { useEffect, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' })

const shortName = (p) => p.split('/').pop().replace(/"/g, '')
let counter = 0

export default function DependencyGraph({ file }) {
  const [svg, setSvg] = useState('')

  useEffect(() => {
    if (!file.coChanged || file.coChanged.length === 0) {
      setSvg('')
      return
    }

    const lines = ['graph LR', `  F0["${shortName(file.path)}"]:::main`]
    file.coChanged.forEach((p, i) => {
      lines.push(`  F${i + 1}["${shortName(p)}"]`)
      lines.push(`  F0 --- F${i + 1}`)
    })
    lines.push('  classDef main fill:#fee2e2,stroke:#ef4444,stroke-width:2px')

    mermaid
      .render(`graph-${counter++}`, lines.join('\n'))
      .then(({ svg }) => setSvg(svg))
      .catch(() => setSvg(''))
  }, [file])

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Files that often change together</h2>
      {svg ? (
        <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p className="text-sm text-gray-500">No co-changed files found.</p>
      )}
    </div>
  )
}