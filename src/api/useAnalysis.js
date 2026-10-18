import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAnalysis } from './client'

export default function useAnalysis() {
  const [params] = useSearchParams()
  const fromUrl = params.get('repo')

  let repo = fromUrl
  try {
    if (fromUrl) sessionStorage.setItem('repo', fromUrl)
    else repo = sessionStorage.getItem('repo')
  } catch {
    // storage unavailable, ignore
  }

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    getAnalysis(repo)
      .then(setData)
      .catch((e) => setError(e.message || 'Could not load this repository.'))
      .finally(() => setLoading(false))
  }, [repo])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load, repo }
}