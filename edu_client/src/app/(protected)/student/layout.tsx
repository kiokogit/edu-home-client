import StudentDashboardNav from "@/components/StudentSideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
        <main className="flex-1">
        
      <StudentDashboardNav >
        {children}
      </StudentDashboardNav>
      
      </main>
    </div>
  );
}
