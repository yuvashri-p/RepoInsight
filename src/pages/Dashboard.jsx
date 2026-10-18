import { useEffect, useState } from 'react'
import { getAnalysis } from '../api/client'
import RiskDistribution from '../components/RiskDistribution'
import FileTable from '../components/FileTable'

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [level, setLevel] = useState('all')

  useEffect(() => {
    getAnalysis().then(setData)
  }, [])

  if (!data) return <p className="p-6">Loading...</p>

  const files = data.files
  const visible = level === 'all' ? files : files.filter((f) => f.riskLevel === level)
  const highCount = files.filter((f) => f.riskLevel === 'high').length
  const avg = files.length
    ? Math.round(files.reduce((sum, f) => sum + f.riskScore, 0) / files.length)
    : 0

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold break-all">{data.repo}</h1>
        <p className="text-sm text-gray-500">
          Scores show potential areas of concern, not guaranteed bugs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Files analyzed" value={files.length} />
        <StatCard label="High-risk files" value={highCount} />
        <StatCard label="Average risk score" value={avg} />
      </div>

      <RiskDistribution files={files} activeLevel={level} onSelect={setLevel} />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="border rounded px-3 py-2 bg-white"
      >
        <option value="all">All risk levels</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <FileTable files={visible} />
    </div>
  )
}