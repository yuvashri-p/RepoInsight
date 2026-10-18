
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const colors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
}

export default function RiskDistribution({
  files,
  activeLevel,
  onSelect,
}) {
  const data = ['low', 'medium', 'high'].map(level => ({
    level,
    count: files.filter(
      file => file.riskLevel === level
    ).length,
  }))

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Risk Distribution
      </h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="level" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar
              dataKey="count"
              name="Files"
              cursor="pointer"
              onClick={item => {
                const level = item?.level
                if (level) {
                  onSelect(
                    activeLevel === level ? 'all' : level
                  )
                }
              }}
            >
              {data.map(item => (
                <Cell
                  key={item.level}
                  fill={colors[item.level]}
                  opacity={
                    activeLevel === 'all' ||
                    activeLevel === item.level
                      ? 1
                      : 0.4
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Click a bar to filter the table. Click again to clear.
      </p>
    </section>
  )
}
