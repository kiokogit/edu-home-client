import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import StudentLayout from './pages/protected/student/StudentLayout'
import Dashboard from './pages/protected/student/Dashboard'
import LessonDetails from './pages/protected/student/LessonDetails'
import Catalogue from './pages/protected/student/Catalogue'
import Assessment from './pages/protected/student/Assessment'
import CatalogueDetails from './pages/protected/student/CatalogueDetails'
import Challenges from './pages/protected/student/Challenges'

const NotFound = () => <div>404 Not Found</div>

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentLayout />}>
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="catalog" element={<Catalogue />} />
           <Route path="catalog/:courseId" element={<CatalogueDetails />} />
           <Route path="catalog/:courseId/learning/:lessonId" element={<LessonDetails />} />
           <Route path="catalog/:courseId/learning/:lessonId/quiz/:quizId" element={<Assessment />} />
           <Route path="challenges" element={<Challenges />} />
           <Route path="challenges/:challengeId" element={<Assessment />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
