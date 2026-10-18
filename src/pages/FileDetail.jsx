
import { Link, useSearchParams } from 'react-router-dom'
import useAnalysis from '../api/useAnalysis'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import RiskBadge from '../components/RiskBadge'
import ChurnChart from '../components/ChurnChart'
import OwnershipChart from '../components/OwnershipChart'
import DependencyGraph from '../components/DependencyGraph'

export default function FileDetail() {
  const [params] = useSearchParams()
  const path = params.get('path')
  const { data, loading, error, reload } = useAnalysis()

  if (loading) {
    return <Loader text="Loading file details..." />
  }

  if (error) {
    return <ErrorBox message={error} onRetry={reload} />
  }

  const file = data.files.find((f) => f.path === path)

  if (!file) {
    return (
      <div className="p-6">
        <p>File not found.</p>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <Link
        to="/dashboard"
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to dashboard
      </Link>

      <div className="bg-white rounded-lg shadow p-4">
        <h1 className="text-xl font-bold break-all">
          {file.path}
        </h1>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-mono text-lg">
            {file.riskScore}
          </span>
          <RiskBadge level={file.riskLevel} />
        </div>

        <h2 className="font-semibold mt-4 mb-1">
          Why this file was flagged
        </h2>

        <ul className="list-disc pl-5 text-sm text-gray-700">
          {file.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChurnChart data={file.churnHistory} />
        <OwnershipChart data={file.ownership} />
      </div>

      <DependencyGraph file={file} />
    </div>
  )
}
