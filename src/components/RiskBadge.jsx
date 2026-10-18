const STYLES = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-red-100 text-red-800',
}

export default function RiskBadge({ level }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${STYLES[level] || 'bg-gray-100 text-gray-800'}`}>
      {level}
    </span>
  )
}