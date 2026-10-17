
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAnalysis } from '../api/client'
import FileTable from '../components/FileTable'

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const repoUrl = searchParams.get('repo') || ''
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('high')

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        setLoading(true)
        setError('')
        const result = await getAnalysis(repoUrl)
        if (active) setData(result)
      } catch {
        if (active) setError('Unable to load repository analysis.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [repoUrl])

  if (loading) {
    return <p className="p-8 text-gray-600">Analyzing repository...</p>
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>
  }

  const files = (data?.files || [])
    .filter(file => filter === 'all' || file.riskLevel === filter)
    .sort((a, b) =>
      sortOrder === 'high'
        ? b.riskScore - a.riskScore
        : a.riskScore - b.riskScore
    )

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-600">
          RepoInsight Dashboard
        </h1>

        <p className="mt-2 break-all text-gray-600">
          Repository: {data?.repo}
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-gray-500">Total Files</p>
            <p className="mt-2 text-3xl font-bold">{data?.files?.length || 0}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-gray-500">High Risk Files</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {data?.files?.filter(file => file.riskLevel === 'high').length || 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-gray-500">Medium Risk Files</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {data?.files?.filter(file => file.riskLevel === 'medium').length || 0}
            </p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
  <h2 className="text-xl font-semibold">File Risk Analysis</h2>

  <button
    onClick={() => window.location.href = '/onboarding'}
    className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
  >
    Onboarding Guide
  </button>
</div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="rounded-lg border bg-white p-2"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>

            <button
              onClick={() =>
                setSortOrder(sortOrder === 'high' ? 'low' : 'high')
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Sort: {sortOrder === 'high' ? 'Highest First' : 'Lowest First'}
            </button>
          </div>
        </div>

        <FileTable files={files} />
      </div>
    </main>
  )
}
