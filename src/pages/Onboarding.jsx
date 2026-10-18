
import ReactMarkdown from 'react-markdown'
import useAnalysis from '../api/useAnalysis'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'

export default function Onboarding() {
  const { data, loading, error, reload } = useAnalysis()

  if (loading) {
    return <Loader text="Preparing onboarding guide..." />
  }

  if (error) {
    return <ErrorBox message={error} onRetry={reload} />
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-1">
        Onboarding guide
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        AI-generated overview of {data.repo}. It may contain
        inaccuracies, so verify against the code.
      </p>

      <div className="bg-white rounded-lg shadow p-6 space-y-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded">
        <ReactMarkdown>
          {data.onboardingGuide}
        </ReactMarkdown>
      </div>
    </div>
  )
}
