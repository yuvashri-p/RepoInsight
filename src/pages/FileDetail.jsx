
import { useSearchParams, useNavigate } from 'react-router-dom'
import { analysis } from '../mock/analysis'
import RiskBadge from '../components/RiskBadge'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function FileDetail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const path = searchParams.get('path')
  const file = analysis.files.find(item => item.path === path)

  if (!file) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">File not found</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Dashboard
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="break-all text-sm text-gray-500">{file.path}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-bold">File Risk Details</h1>
            <RiskBadge level={file.riskLevel} />
          </div>

          <p className="mt-3 text-lg">
            Risk Score: <strong>{file.riskScore}/100</strong>
          </p>
        </div>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Why is this file flagged?</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            {file.reasons.map(reason => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Churn History</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={file.churnHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Code Ownership</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={file.ownership} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="author" />
                <Tooltip />
                <Bar dataKey="percent" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Frequently Co-changed Files</h2>
          {file.coChanged.length > 0 ? (
            <ul className="space-y-3">
              {file.coChanged.map(item => (
                <li
                  key={item}
                  className="break-all rounded-lg bg-gray-50 p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No co-changed files in this sample data.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
