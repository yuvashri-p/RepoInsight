
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InputPage() {
  const [repoUrl, setRepoUrl] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const pattern = /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/

    if (!pattern.test(repoUrl.trim())) {
      setError('Enter a valid GitHub repository URL.')
      return
    }

    setError('')
    navigate(`/dashboard?repo=${encodeURIComponent(repoUrl.trim())}`)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-3 text-3xl font-bold text-blue-600">
          RepoInsight
        </h1>

        <p className="mb-6 text-gray-600">
          Discover potentially risky files in a GitHub repository.
        </p>

        <label className="mb-2 block font-medium" htmlFor="repoUrl">
          GitHub Repository URL
        </label>

        <input
          id="repoUrl"
          type="url"
          value={repoUrl}
          onChange={e => setRepoUrl(e.target.value)}
          placeholder="https://github.com/owner/repository"
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
        />

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Analyze Repository
        </button>
      </form>
    </main>
  )
}
