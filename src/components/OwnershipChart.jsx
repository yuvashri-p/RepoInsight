import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function OwnershipChart({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Ownership %</h2>
      {!data || data.length === 0 ? (
        <p className="text-sm text-gray-500">No ownership data available.</p>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" domain={[0, 100]} unit="%" />
              <YAxis type="category" dataKey="author" width={70} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="percent" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}