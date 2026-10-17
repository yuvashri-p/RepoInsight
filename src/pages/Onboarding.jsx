import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { analysis } from '../mock/analysis'

export default function Onboarding() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <h1 className="mb-3 text-3xl font-bold text-blue-600">
            Repository Onboarding Guide
          </h1>

          <p className="mb-6 text-gray-600">
            Understand the repository structure and learn where to start.
          </p>

          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <h2 className="mb-2 font-semibold text-blue-800">
              Getting Started
            </h2>
            <p className="text-sm text-blue-700">
              Follow the guide below to explore the project and identify
              important files before making changes.
            </p>
          </div>

          <article className="space-y-4 text-gray-700 leading-7">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {children}
                  </h3>
                ),
                li: ({ children }) => (
                  <li className="ml-5 list-disc">{children}</li>
                ),
              }}
            >
              {analysis.onboardingGuide}
            </ReactMarkdown>
          </article>

          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h2 className="font-semibold text-amber-800">
              Important Reminder
            </h2>
            <p className="mt-2 text-sm text-amber-700">
              Risk scores are indicators to help prioritize code review.
              A high score does not necessarily mean that a file contains a bug.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore File Risks
          </button>
        </div>
      </div>
    </main>
  )
}