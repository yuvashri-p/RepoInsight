import { Link } from 'react-router-dom'

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      <div className="mt-4 flex justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          >
            Try again
          </button>
        )}
        <Link to="/" className="border border-red-300 px-4 py-2 rounded text-sm text-red-800 hover:bg-red-100">
          Enter another repository
        </Link>
      </div>
    </div>
  )
}