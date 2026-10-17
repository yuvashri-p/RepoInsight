import { Routes, Route } from 'react-router-dom'
import InputPage from './pages/InputPage'
import Dashboard from './pages/Dashboard'
import FileDetail from './pages/FileDetail'
import Onboarding from './pages/Onboarding'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/file" element={<FileDetail />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </div>
  )
}