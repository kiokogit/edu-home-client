import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/general/LandingPage'
import ProtectedLayout from './ProtectedLayout'
import { useAuth } from './Providers'

const NotFound = () => <div className="text-center text-gray-400 text-sm py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">404 Not Found</div>

function App() {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white font-sans selection:bg-emerald-500/30 ">
    <Routes>
      <Route path="/*" element={ user ? <ProtectedLayout /> : <LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  )
}

export default App


