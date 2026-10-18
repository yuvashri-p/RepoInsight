import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GITHUB_URL = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/

export default function InputPage() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!GITHUB_URL.test(trimmed)) {
      setError('Enter a valid URL like https://github.com/owner/repo')
      return
    }
    setError('')
    navigate(`/dashboard?repo=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">RepoInsight</h1>
      <p className="mt-3 text-gray-600">
        Paste a GitHub repository to find potentially risky files and get an
        AI-generated onboarding guide.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          className="flex-1 border rounded px-4 py-3 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Analyze
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}