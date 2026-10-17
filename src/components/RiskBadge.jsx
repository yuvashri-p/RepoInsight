
export default function RiskBadge({ level }) {
  const styles = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700',
  }

  const color = styles[level?.toLowerCase()] || styles.low

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}>
      {level || 'Low'}
    </span>
  )
}
