import { useState } from 'react'
import { Link } from 'react-router-dom'
import RiskBadge from './RiskBadge'

export default function FileTable({ files }) {
  const [sortKey, setSortKey] = useState('riskScore')
  const [asc, setAsc] = useState(false)

  const sorted = [...files].sort((a, b) => {
    const x = a[sortKey]
    const y = b[sortKey]
    const result = typeof x === 'string' ? x.localeCompare(y) : x - y
    return asc ? result : -result
  })

  function toggleSort(key) {
    if (key === sortKey) setAsc(!asc)
    else {
      setSortKey(key)
      setAsc(false)
    }
  }

  const arrow = (key) => (key === sortKey ? (asc ? ' ▲' : ' ▼') : '')

  if (files.length === 0) {
    return <p className="bg-white rounded-lg shadow p-6 text-gray-500">No files match this filter.</p>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 cursor-pointer" onClick={() => toggleSort('path')}>
              File{arrow('path')}
            </th>
            <th className="p-3 cursor-pointer whitespace-nowrap" onClick={() => toggleSort('riskScore')}>
              Potential risk score{arrow('riskScore')}
            </th>
            <th className="p-3">Level</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((f) => (
            <tr key={f.path} className="border-t hover:bg-gray-50">
              <td className="p-3 max-w-xs md:max-w-lg">
                <Link
                  to={`/file?path=${encodeURIComponent(f.path)}`}
                  className="text-blue-600 hover:underline break-all"
                  title={f.path}
                >
                  {f.path}
                </Link>
              </td>
              <td className="p-3 font-mono">{f.riskScore}</td>
              <td className="p-3"><RiskBadge level={f.riskLevel} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}