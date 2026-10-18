import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import InputPage from './pages/InputPage'
import Dashboard from './pages/Dashboard'
import FileDetail from './pages/FileDetail'
import Onboarding from './pages/Onboarding'

function NotFound() {
  return (
    <div className="text-center p-16">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
        Go to home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/file" element={<FileDetail />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-gray-400 py-4">
        RepoInsight · Final year project
      </footer>
    </div>
  )
}