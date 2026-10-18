export default function Loader({ text = 'Analyzing repository...' }) {
  return (
    <div
      className="flex items-center justify-center gap-3 p-12 text-gray-600"
      role="status"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
      <span>{text}</span>
    </div>
  )
}