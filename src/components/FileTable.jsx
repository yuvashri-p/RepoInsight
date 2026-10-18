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
  const detailLink = (path) => `/file?path=${encodeURIComponent(path)}`

  if (files.length === 0) {
    return (
      <p className="bg-white rounded-lg shadow p-6 text-gray-500">
        No files match this filter.
      </p>
    )
  }

  return (
    <>
      {/* Mobile: sort controls + cards */}
      <div className="md:hidden space-y-3">
        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="border rounded px-2 py-1 text-sm bg-white flex-1"
          >
            <option value="riskScore">Sort by score</option>
            <option value="path">Sort by name</option>
          </select>
          <button
            onClick={() => setAsc(!asc)}
            className="border rounded px-3 py-1 text-sm bg-white"
          >
            {asc ? 'Ascending ▲' : 'Descending ▼'}
          </button>
        </div>

        <ul className="space-y-3">
          {sorted.map((f) => (
            <li key={f.path} className="bg-white rounded-lg shadow p-3">
              <Link
                to={detailLink(f.path)}
                className="text-blue-600 break-all text-sm hover:underline"
              >
                {f.path}
              </Link>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-sm">Score: {f.riskScore}</span>
                <RiskBadge level={f.riskLevel} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tablet and desktop: table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort('path')}>
                File{arrow('path')}
              </th>
              <th
                className="p-3 cursor-pointer whitespace-nowrap"
                onClick={() => toggleSort('riskScore')}
              >
                Potential risk score{arrow('riskScore')}
              </th>
              <th className="p-3">Level</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f) => (
              <tr key={f.path} className="border-t hover:bg-gray-50">
                <td className="p-3 max-w-lg">
                  <Link
                    to={detailLink(f.path)}
                    className="text-blue-600 hover:underline break-all"
                    title={f.path}
                  >
                    {f.path}
                  </Link>
                </td>
                <td className="p-3 font-mono">{f.riskScore}</td>
                <td className="p-3">
                  <RiskBadge level={f.riskLevel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}