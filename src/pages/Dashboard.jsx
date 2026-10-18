import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAnalysis from '../api/useAnalysis'
import RiskDistribution from '../components/RiskDistribution'
import FileTable from '../components/FileTable'
import RiskBadge from '../components/RiskBadge'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const { data, loading, error, reload } = useAnalysis()
  const [level, setLevel] = useState('all')

  if (loading) return <Loader />
  if (error) return <ErrorBox message={error} onRetry={reload} />
  if (!data || data.files.length === 0) {
    return (
      <ErrorBox message="No analyzable files were found for this repository." />
    )
  }

  const files = data.files
  const visible = level === 'all' ? files : files.filter((f) => f.riskLevel === level)
  const highCount = files.filter((f) => f.riskLevel === 'high').length
  const avg = Math.round(files.reduce((s, f) => s + f.riskScore, 0) / files.length)
  const top3 = [...files].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold break-all">{data.repo}</h1>
          <p className="text-sm text-gray-500">
            Scores show potential areas of concern, not guaranteed bugs.
          </p>
        </div>
        <Link
          to="/onboarding"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          View onboarding guide →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          <StatCard label="Files analyzed" value={files.length} />
          <StatCard label="High-risk files" value={highCount} />
          <StatCard label="Average risk score" value={avg} />
        </div>
        <div className="lg:col-span-2">
          <RiskDistribution files={files} activeLevel={level} onSelect={setLevel} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Review these first</h2>
        <ul className="divide-y">
          {top3.map((f) => (
            <li key={f.path} className="py-2 flex items-center justify-between gap-3">
              <Link
                to={`/file?path=${encodeURIComponent(f.path)}`}
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {f.path}
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-sm">{f.riskScore}</span>
                <RiskBadge level={f.riskLevel} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border rounded px-3 py-2 bg-white w-full sm:w-auto"
        >
          <option value="all">All risk levels</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <span className="text-sm text-gray-500">
          Showing {visible.length} of {files.length} files
        </span>
      </div>

      <FileTable files={visible} />
    </div>
  )
}