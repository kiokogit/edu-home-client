import { Outlet } from 'react-router-dom'
import StudentDashboardNav from '@/components/StudentSideBar'
import { HeaderTitleProvider } from '@/contexts/HeaderTitleContext'

export default function StudentLayout() {
  return (
    <HeaderTitleProvider>
      <StudentDashboardNav>
        <Outlet />
      </StudentDashboardNav>
    </HeaderTitleProvider>
  )
}
